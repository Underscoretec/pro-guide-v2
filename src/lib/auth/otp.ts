import { createHash } from 'crypto'

// TODO: replace with real OTP generation + email/SMS delivery.
// For now every OTP is hard coded.
export const HARDCODED_OTP = '123456'
export const OTP_TTL_MS = 10 * 60 * 1000

export const hashOtp = (otp: string) => createHash('sha256').update(otp).digest('hex')

export const generateOtp = () => HARDCODED_OTP

export const otpExpiry = () => new Date(Date.now() + OTP_TTL_MS).toISOString()
