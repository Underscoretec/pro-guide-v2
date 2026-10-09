import { getCurrentUser } from '@/lib/auth/session'
import { getPayloadClient } from '@/lib/payload/client'

// Re-export pure helpers
export * from './invoice-template'

/**
 * Server-only: Retrieve order for invoice by ID or Order Number
 */
export async function getOrderForInvoice(idOrNumber: string | number) {
  try {
    const user = await getCurrentUser()
    if (!user) return null

    const payload = await getPayloadClient()
    const isAdmin = ['admin', 'kb_admin'].includes(user.role)

    let order: any = null

    // Try finding by orderNumber first
    const byNumber = await payload.find({
      collection: 'orders',
      where: {
        orderNumber: { equals: String(idOrNumber) },
      },
      depth: 1,
      limit: 1,
    })

    if (byNumber.docs && byNumber.docs.length > 0) {
      order = byNumber.docs[0]
    } else {
      // Try finding by ID
      try {
        order = await payload.findByID({
          collection: 'orders',
          id: idOrNumber,
          depth: 1,
        })
      } catch {
        // ID lookup failed
      }
    }

    if (!order) return null

    // Security check: Must belong to current user unless admin
    const orderUserId = typeof order.user === 'object' ? order.user?.id : order.user
    if (!isAdmin && orderUserId !== user.id) {
      return null
    }

    return order
  } catch (error) {
    console.error('Failed to get order for invoice:', error)
    return null
  }
}
