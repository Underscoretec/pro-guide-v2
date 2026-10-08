import { createHash, randomInt } from 'crypto'

const OTP_LENGTH = 6
const OTP_EXPIRY_MINUTES = 30

function getOtpSecret(): string {
  return process.env.OTP_SECRET || process.env.PAYLOAD_SECRET || 'otp-fallback-secret'
}

export function generateOtp(length = OTP_LENGTH): string {
  const min = 10 ** (length - 1)
  const max = 10 ** length - 1
  return String(randomInt(min, max + 1))
}

export function hashOtp(otp: string): string {
  return createHash('sha256').update(`${otp}:${getOtpSecret()}`).digest('hex')
}

export function verifyOtp(otp: string, storedHash?: string | null): boolean {
  if (!storedHash || !otp) return false
  return hashOtp(otp) === storedHash
}

export function getOtpExpiryDate(minutes = OTP_EXPIRY_MINUTES): string {
  return new Date(Date.now() + minutes * 60 * 1000).toISOString()
}

export function isOtpExpired(expiresAt?: string | null): boolean {
  if (!expiresAt) return true
  return new Date(expiresAt).getTime() < Date.now()
}
