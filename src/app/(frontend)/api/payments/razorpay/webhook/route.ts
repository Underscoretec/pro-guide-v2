import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { verifyWebhookSignature } from '@/lib/razorpay/client'
import { findOrderByRazorpayOrderId, markOrderFailed, markOrderPaid } from '@/lib/orders/payment'

export async function POST(req: Request) {
  // The signature is computed over the exact raw body, so read it as text first.
  const rawBody = await req.text()
  if (!verifyWebhookSignature(rawBody, req.headers.get('x-razorpay-signature'))) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  let event: any
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  try {
    const type: string = event?.event
    const payment = event?.payload?.payment?.entity
    const rzpOrder = event?.payload?.order?.entity
    const razorpayOrderId: string | undefined = payment?.order_id ?? rzpOrder?.id

    if (!razorpayOrderId || !['payment.captured', 'order.paid', 'payment.failed'].includes(type)) {
      return NextResponse.json({ received: true, ignored: true })
    }

    const order = await findOrderByRazorpayOrderId(razorpayOrderId)
    if (!order) {
      return NextResponse.json({ received: true, ignored: true })
    }

    if (type === 'payment.failed') {
      const reason = payment?.error_description || payment?.error_reason || 'Payment failed'
      await markOrderFailed(order, reason, payment?.id)
    } else {
      const paidPaise = Number(payment?.amount ?? rzpOrder?.amount_paid)
      const expectedPaise = Math.round((order.pricing?.totalAmount ?? 0) * 100)
      if (paidPaise !== expectedPaise) {
        console.error(
          `Razorpay amount mismatch for ${order.orderNumber}: paid ${paidPaise}, expected ${expectedPaise}`,
        )
        await markOrderFailed(order, 'Paid amount does not match order total', payment?.id)
      } else {
        await markOrderPaid(order, payment?.id ?? '')
      }
    }

    revalidatePath('/profile/orders')
    return NextResponse.json({ received: true })
  } catch (error) {
    // Non-2xx makes Razorpay retry, which is what we want for transient failures.
    console.error('Razorpay webhook processing failed:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
