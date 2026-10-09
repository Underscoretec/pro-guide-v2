import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth/session'
import { verifyCheckoutSignature } from '@/lib/razorpay/client'
import { findOrderByRazorpayOrderId } from '@/lib/orders/payment'

export async function POST(req: Request) {
  const user = await getCurrentUser()
  if (!user) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body ?? {}
  if (
    typeof razorpay_order_id !== 'string' ||
    typeof razorpay_payment_id !== 'string' ||
    typeof razorpay_signature !== 'string'
  ) {
    return NextResponse.json({ success: false, error: 'Missing payment details' }, { status: 400 })
  }

  if (!verifyCheckoutSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    return NextResponse.json({ success: false, error: 'Invalid payment signature' }, { status: 400 })
  }

  const order = await findOrderByRazorpayOrderId(razorpay_order_id)
  const ownerId = typeof order?.user === 'object' ? (order.user as any)?.id : order?.user
  if (!order || String(ownerId) !== String(user.id)) {
    return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 })
  }

  // The signature is valid, but only the webhook marks an order as paid
  // (source of truth), so this route never changes payment status.
  return NextResponse.json({
    success: true,
    order: {
      orderNumber: order.orderNumber,
      paymentStatus: order.paymentStatus,
      totalAmount: order.pricing?.totalAmount,
    },
  })
}
