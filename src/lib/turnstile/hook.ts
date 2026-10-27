import { ValidationError, type CollectionBeforeValidateHook } from 'payload'
import { verifyTurnstileToken } from './verify'

/** Rejects public REST creates that don't carry a valid Cloudflare Turnstile token. */
export const verifyTurnstileOnCreate: CollectionBeforeValidateHook = async ({ data, operation, req }) => {
  if (operation !== 'create' || !data) return data
  const token = data.turnstileToken
  delete data.turnstileToken
  // Server-side (local API) creates are trusted
  if (req.payloadAPI === 'local') return data
  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  if (!(await verifyTurnstileToken(token, ip))) {
    throw new ValidationError({
      errors: [{ message: 'Human verification failed. Please retry the Cloudflare check.', path: 'turnstileToken' }],
    })
  }
  return data
}
