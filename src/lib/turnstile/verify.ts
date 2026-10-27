const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/**
 * Validates a Cloudflare Turnstile token server-side.
 * Without TURNSTILE_SECRET_KEY the check is skipped outside production only.
 */
export const verifyTurnstileToken = async (token?: string | null, remoteIp?: string | null): Promise<boolean> => {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return process.env.NODE_ENV !== 'production'
  if (!token) return false

  try {
    const body = new URLSearchParams({ secret, response: token })
    if (remoteIp) body.set('remoteip', remoteIp)
    const res = await fetch(VERIFY_URL, { method: 'POST', body })
    const result = (await res.json()) as { success?: boolean }
    return result.success === true
  } catch {
    return false
  }
}
