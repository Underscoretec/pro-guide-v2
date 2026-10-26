'use server'

import { redirect } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload/client'
import { sendPasswordResetOtp } from '@/lib/email'
import { generateOtp, getOtpExpiryDate, hashOtp, isOtpExpired, verifyOtp } from '../otp'
import { logger } from '../logger'
import type { AuthState } from './actions'

const OTP_VALID_MINUTES = 10

const str = (fd: FormData, key: string) => String(fd.get(key) ?? '').trim()

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function issuePasswordResetOtp(email: string): Promise<void> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const user = docs[0]
  if (!user) return

  const otp = generateOtp()
  const otpHash = hashOtp(otp)
  const expiresAt = getOtpExpiryDate(OTP_VALID_MINUTES)

  await payload.update({
    collection: 'users',
    id: user.id,
    overrideAccess: true,
    data: {
      passwordResetOtpHash: otpHash,
      passwordResetOtpExpiresAt: expiresAt,
    },
  })

  try {
    await sendPasswordResetOtp(user.email, otp, user.fullName || undefined)
  } catch (err) {
    // Never surface delivery failures to the caller - doing so would reveal account existence
    logger.auth.error('Failed to send password reset OTP via SES', { error: err })
  }
}

export async function requestPasswordReset(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = str(formData, 'email').toLowerCase()
  if (!EMAIL_RE.test(email)) {
    return { fieldErrors: { email: 'Enter a valid email address' }, values: { email } }
  }

  await issuePasswordResetOtp(email)

  redirect(`/reset-password?email=${encodeURIComponent(email)}`)
}

export async function resendPasswordResetOtp(email: string): Promise<void> {
  await issuePasswordResetOtp(email.toLowerCase())
}

export async function resetPassword(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = str(formData, 'email').toLowerCase()
  const otp = str(formData, 'otp')
  const password = String(formData.get('password') ?? '')
  const confirmPassword = String(formData.get('confirmPassword') ?? '')

  if (!email) return { error: 'Missing email. Please start again.' }

  const fieldErrors: Record<string, string> = {}
  if (!otp || !/^\d{6}$/.test(otp)) {
    fieldErrors.otp = 'Enter the 6-digit code sent to your email'
  }
  if (password.length < 8) fieldErrors.password = 'Password must be at least 8 characters'
  if (password !== confirmPassword) fieldErrors.confirmPassword = 'Passwords do not match'
  if (Object.keys(fieldErrors).length) return { fieldErrors }

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const user = docs[0]

  // Deliberately generic errors below - they must not reveal whether the account exists
  if (!user || !user.passwordResetOtpHash || !user.passwordResetOtpExpiresAt) {
    return { fieldErrors: { otp: 'Invalid or expired code. Please request a new one.' } }
  }

  if (isOtpExpired(user.passwordResetOtpExpiresAt)) {
    return { fieldErrors: { otp: 'This code has expired. Please request a new one.' } }
  }

  if (!verifyOtp(otp, user.passwordResetOtpHash)) {
    return { fieldErrors: { otp: 'Invalid code. Please try again.' } }
  }

  await payload.update({
    collection: 'users',
    id: user.id,
    overrideAccess: true,
    data: {
      password,
      passwordResetOtpHash: null,
      passwordResetOtpExpiresAt: null,
    },
  })

  redirect('/sign-in?reset=1')
}
