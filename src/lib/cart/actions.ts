'use server'

import { getPayloadClient } from '@/lib/payload/client'
import { getCurrentUser } from '@/lib/auth/session'
import type { CartItem } from '@/context/CartContext'

export async function getUserCart(): Promise<CartItem[]> {
  try {
    const user = await getCurrentUser()
    if (!user) return []

    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'carts',
      where: {
        user: { equals: user.id },
      },
      overrideAccess: true,
      depth: 0,
      limit: 1,
    })

    if (docs.length === 0 || !docs[0].items) return []

    const cartDoc = docs[0]
    return (cartDoc.items || []).map((item: any) => ({
      id: String(item.productId || item.id),
      name: String(item.name || ''),
      price: Number(item.price) || 0,
      quantity: Math.max(1, Number(item.quantity) || 1),
      imageUrl: String(item.imageUrl || '/images/prod1.jpg'),
      variant: item.variant ? String(item.variant) : undefined,
    }))
  } catch (error) {
    console.error('Failed to get user cart:', error)
    return []
  }
}

export async function syncUserCart(items: CartItem[]): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    if (!user) return false

    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'carts',
      where: {
        user: { equals: user.id },
      },
      overrideAccess: true,
      depth: 0,
      limit: 1,
    })

    const formattedItems = (items || []).map((item) => ({
      productId: item.id,
      name: item.name,
      price: Number(item.price) || 0,
      quantity: Math.max(1, Number(item.quantity) || 1),
      imageUrl: item.imageUrl || '/images/prod1.jpg',
      variant: item.variant || null,
      subtotal: (Number(item.price) || 0) * Math.max(1, Number(item.quantity) || 1),
    }))

    if (docs.length > 0) {
      await payload.update({
        collection: 'carts',
        id: docs[0].id,
        data: {
          items: formattedItems,
        },
        overrideAccess: true,
      })
    } else {
      await payload.create({
        collection: 'carts',
        data: {
          user: user.id,
          items: formattedItems,
        },
        overrideAccess: true,
      })
    }

    return true
  } catch (error) {
    console.error('Failed to sync user cart:', error)
    return false
  }
}

export async function clearUserCart(): Promise<boolean> {
  try {
    const user = await getCurrentUser()
    if (!user) return false

    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'carts',
      where: {
        user: { equals: user.id },
      },
      overrideAccess: true,
      depth: 0,
      limit: 1,
    })

    if (docs.length > 0) {
      await payload.update({
        collection: 'carts',
        id: docs[0].id,
        data: {
          items: [],
        },
        overrideAccess: true,
      })
    }

    return true
  } catch (error) {
    console.error('Failed to clear user cart:', error)
    return false
  }
}
