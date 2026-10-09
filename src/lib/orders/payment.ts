import { getPayloadClient } from '@/lib/payload/client'

const userIdOf = (user: unknown) =>
  typeof user === 'object' && user !== null ? (user as { id: number | string }).id : (user as number | string)

export async function findOrderByRazorpayOrderId(razorpayOrderId: string) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'orders',
    where: { razorpayOrderId: { equals: razorpayOrderId } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  return docs[0] ?? null
}

async function clearCartForUser(userId: number | string) {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'carts',
      where: { user: { equals: userId } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    if (docs[0]) {
      await payload.update({
        collection: 'carts',
        id: docs[0].id,
        data: { items: [] },
        overrideAccess: true,
      })
    }
  } catch (error) {
    console.error('Failed to clear cart after payment:', error)
  }
}

/** Idempotently marks an order as paid (used by both the verify route and the webhook). */
export async function markOrderPaid(order: any, razorpayPaymentId: string) {
  if (order.paymentStatus === 'paid') return order

  const payload = await getPayloadClient()
  const updated = await payload.update({
    collection: 'orders',
    id: order.id,
    data: {
      paymentStatus: 'paid',
      orderStatus: 'confirmed',
      razorpayPaymentId,
      payment: razorpayPaymentId,
      paymentFailureReason: '',
    },
    overrideAccess: true,
  })
  await clearCartForUser(userIdOf(order.user))
  return updated
}

/** Marks an order as failed unless it has already been paid. */
export async function markOrderFailed(order: any, reason: string, razorpayPaymentId?: string) {
  if (order.paymentStatus === 'paid') return order

  const payload = await getPayloadClient()
  return payload.update({
    collection: 'orders',
    id: order.id,
    data: {
      paymentStatus: 'failed',
      paymentFailureReason: reason.slice(0, 500),
      ...(razorpayPaymentId ? { razorpayPaymentId } : {}),
    },
    overrideAccess: true,
  })
}
