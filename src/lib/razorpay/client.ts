import crypto from 'crypto'
import Razorpay from 'razorpay'

let cachedClient: Razorpay | null = null

export const getRazorpayKeyId = () => {
  const keyId = process.env.RAZORPAY_KEY_ID
  if (!keyId) throw new Error('RAZORPAY_KEY_ID is not configured.')
  return keyId
}

export const getRazorpayClient = () => {
  if (!cachedClient) {
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keySecret) throw new Error('RAZORPAY_KEY_SECRET is not configured.')
    cachedClient = new Razorpay({ key_id: getRazorpayKeyId(), key_secret: keySecret })
  }
  return cachedClient
}

const safeEqualHex = (expected: string, actual: string) => {
  const a = Buffer.from(expected, 'utf8')
  const b = Buffer.from(actual, 'utf8')
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

const hmacSha256 = (secret: string, data: string) =>
  crypto.createHmac('sha256', secret).update(data).digest('hex')

/** Verifies the signature returned by Razorpay Checkout after a successful payment. */
export const verifyCheckoutSignature = (orderId: string, paymentId: string, signature: string) => {
  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret || !signature) return false
  return safeEqualHex(hmacSha256(secret, `${orderId}|${paymentId}`), signature)
}

/** Verifies the x-razorpay-signature header of a webhook call against the raw request body. */
export const verifyWebhookSignature = (rawBody: string, signature: string | null) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET
  if (!secret || !signature) return false
  return safeEqualHex(hmacSha256(secret, rawBody), signature)
}
