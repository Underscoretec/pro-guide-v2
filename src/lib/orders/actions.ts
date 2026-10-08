'use server'

import { revalidatePath } from 'next/cache'
import { getPayloadClient } from '@/lib/payload/client'
import { getCurrentUser } from '@/lib/auth/session'
import { clearUserCart } from '@/lib/cart/actions'

export interface OrderItemInput {
  product?: string
  productName: string
  productImage?: string
  sku?: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface AddressInput {
  fullName: string
  phone?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country?: string
}

export interface PricingInput {
  subtotal: number
  discount?: number
  shippingAmount?: number
  taxAmount?: number
  totalAmount: number
  currency?: string
}

export interface CreateOrderParams {
  items: OrderItemInput[]
  shippingAddress: AddressInput
  billingAddress?: AddressInput
  pricing: PricingInput
  paymentMethod?: 'COD' | 'ONLINE' | 'BANK_TRANSFER'
  orderNotes?: string
}

export interface CreateOrderResult {
  success: boolean
  error?: string
  order?: {
    id: number | string
    orderNumber: string
    orderStatus: string
    paymentMethod: string
    paymentStatus: string
    totalAmount: number
    createdAt?: string
  }
}

export async function createOrder(params: CreateOrderParams): Promise<CreateOrderResult> {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: 'Please sign in to place your order.' }
    }

    if (!params.items || params.items.length === 0) {
      return { success: false, error: 'Your cart is empty.' }
    }

    const payload = await getPayloadClient()

    // Generate unique human-readable order number (e.g. ORD-2026-000001)
    const year = new Date().getFullYear()
    const { totalDocs } = await payload.count({
      collection: 'orders',
    })
    const sequence = String(totalDocs + 1).padStart(6, '0')
    const orderNumber = `ORD-${year}-${sequence}`

    const shipping = {
      fullName: params.shippingAddress.fullName,
      phone: params.shippingAddress.phone || user.phoneNumber || '',
      addressLine1: params.shippingAddress.addressLine1,
      addressLine2: params.shippingAddress.addressLine2 || '',
      city: params.shippingAddress.city,
      state: params.shippingAddress.state,
      postalCode: params.shippingAddress.postalCode,
      country: params.shippingAddress.country || 'India',
    }

    const billing = params.billingAddress
      ? {
          fullName: params.billingAddress.fullName,
          phone: params.billingAddress.phone || user.phoneNumber || '',
          addressLine1: params.billingAddress.addressLine1,
          addressLine2: params.billingAddress.addressLine2 || '',
          city: params.billingAddress.city,
          state: params.billingAddress.state,
          postalCode: params.billingAddress.postalCode,
          country: params.billingAddress.country || 'India',
        }
      : shipping

    const paymentRef = `COD-${orderNumber}`

    const createdOrder = await payload.create({
      collection: 'orders',
      data: {
        orderNumber,
        user: user.id,
        items: params.items.map((i) => ({
          product: i.product || '',
          productName: i.productName,
          productImage: i.productImage || '',
          sku: i.sku || `SKU-${i.product || 'item'}`,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
          totalPrice: i.totalPrice,
        })),
        shippingAddress: shipping,
        billingAddress: billing,
        pricing: {
          subtotal: params.pricing.subtotal,
          discount: params.pricing.discount || 0,
          shippingAmount: params.pricing.shippingAmount || 0,
          taxAmount: params.pricing.taxAmount || 0,
          totalAmount: params.pricing.totalAmount,
          currency: params.pricing.currency || 'INR',
        },
        paymentStatus: 'pending',
        orderStatus: 'confirmed',
        payment: paymentRef,
        paymentMethod: params.paymentMethod || 'COD',
        orderNotes: params.orderNotes || '',
      },
      user,
      overrideAccess: true,
    })

    // Clear cart in DB for this user
    await clearUserCart()

    revalidatePath('/profile/orders')
    revalidatePath('/checkout')
    revalidatePath('/cart')

    return {
      success: true,
      order: {
        id: createdOrder.id,
        orderNumber: createdOrder.orderNumber,
        orderStatus: createdOrder.orderStatus,
        paymentMethod: createdOrder.paymentMethod,
        paymentStatus: createdOrder.paymentStatus,
        totalAmount: createdOrder.pricing.totalAmount,
        createdAt: createdOrder.createdAt,
      },
    }
  } catch (error: any) {
    console.error('Failed to create order:', error)
    return {
      success: false,
      error: error?.message || 'Failed to place order. Please try again.',
    }
  }
}

export async function getUserOrders() {
  try {
    const user = await getCurrentUser()
    if (!user) return []

    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'orders',
      where: {
        user: { equals: user.id },
      },
      sort: '-createdAt',
      user,
      overrideAccess: false,
      depth: 1,
      limit: 100,
    })

    return docs
  } catch (error) {
    console.error('Failed to get user orders:', error)
    return []
  }
}
