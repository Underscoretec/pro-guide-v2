'use server'

import { revalidatePath } from 'next/cache'
import { getPayloadClient } from '@/lib/payload/client'
import { getCurrentUser } from '@/lib/auth/session'
import { clearUserCart } from '@/lib/cart/actions'
import { priceCart } from '@/lib/orders/pricing'
import { getRazorpayClient, getRazorpayKeyId } from '@/lib/razorpay/client'

export interface OrderItemInput {
  /** Product slug or id. Price/name are always re-read from the products collection. */
  product: string
  quantity: number
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

export interface CreateOrderParams {
  items: OrderItemInput[]
  shippingAddress: AddressInput
  billingAddress?: AddressInput
  orderNotes?: string
}

export interface CreateOnlineOrderResult {
  success: boolean
  error?: string
  checkout?: {
    orderNumber: string
    razorpayOrderId: string
    /** Amount in paise */
    amount: number
    currency: string
    keyId: string
  }
}

const normalizeAddress = (addr: AddressInput, fallbackPhone?: string | null) => ({
  fullName: addr.fullName,
  phone: addr.phone || fallbackPhone || '',
  addressLine1: addr.addressLine1,
  addressLine2: addr.addressLine2 || '',
  city: addr.city,
  state: addr.state,
  postalCode: addr.postalCode,
  country: addr.country || 'India',
})

/** Prices the cart server-side and creates the (unpaid) order document. */
async function createOrderDoc(user: any, params: CreateOrderParams) {
  const priced = await priceCart(
    params.items.map((i) => ({ id: i.product, quantity: i.quantity })),
  )
  const payload = await getPayloadClient()

  // Generate unique human-readable order number (e.g. ORD-2026-000001)
  const year = new Date().getFullYear()
  const { totalDocs } = await payload.count({ collection: 'orders' })
  const orderNumber = `ORD-${year}-${String(totalDocs + 1).padStart(6, '0')}`

  const shipping = normalizeAddress(params.shippingAddress, user.phoneNumber)
  const billing = params.billingAddress
    ? normalizeAddress(params.billingAddress, user.phoneNumber)
    : shipping

  const order = await payload.create({
    collection: 'orders',
    data: {
      orderNumber,
      user: user.id,
      items: priced.items,
      shippingAddress: shipping,
      billingAddress: billing,
      pricing: {
        subtotal: priced.subtotal,
        discount: 0,
        shippingAmount: 0,
        taxAmount: priced.taxAmount,
        totalAmount: priced.totalAmount,
        currency: 'INR',
      },
      paymentStatus: 'pending',
      // Becomes 'confirmed' only when the webhook reports a successful payment
      orderStatus: 'pending_payment',
      payment: '',
      paymentMethod: 'ONLINE',
      orderNotes: params.orderNotes || '',
    },
    user,
    overrideAccess: true,
  })

  return { order, priced }
}

/**
 * Creates a pending order plus a Razorpay order for it. The cart is only cleared
 * once payment is confirmed (verify route / webhook).
 */
export async function createOnlineOrder(
  params: CreateOrderParams,
): Promise<CreateOnlineOrderResult> {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return { success: false, error: 'Please sign in to place your order.' }
    }
    if (!params.items || params.items.length === 0) {
      return { success: false, error: 'Your cart is empty.' }
    }

    const { order, priced } = await createOrderDoc(user, params)
    const amount = Math.round(priced.totalAmount * 100)

    const rzpOrder = await getRazorpayClient().orders.create({
      amount,
      currency: 'INR',
      receipt: order.orderNumber,
      notes: { orderNumber: order.orderNumber },
    })

    const payload = await getPayloadClient()
    await payload.update({
      collection: 'orders',
      id: order.id,
      data: { razorpayOrderId: rzpOrder.id, payment: rzpOrder.id },
      overrideAccess: true,
    })

    revalidatePath('/profile/orders')

    return {
      success: true,
      checkout: {
        orderNumber: order.orderNumber,
        razorpayOrderId: rzpOrder.id,
        amount,
        currency: 'INR',
        keyId: getRazorpayKeyId(),
      },
    }
  } catch (error: any) {
    console.error('Failed to create online order:', error)
    return {
      success: false,
      error: error?.message || 'Failed to start payment. Please try again.',
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
