import type { Payload } from 'payload'

import { sendEmailVerificationOtp, sendPhoneVerificationOtp } from '@/lib/email'
import { generateOtp, getOtpExpiryDate, hashOtp, isOtpExpired, verifyOtp } from './otp'
import { logger } from './logger'
import { sendMsg91Otp } from './msg91'

export type OtpStep = 'email' | 'phone'

export interface UserOtpRecord {
  email?: string
  fullName?: string | null
  phoneNumber?: string | null
  emailOtpHash?: string | null
  emailOtpExpiresAt?: string | null
  phoneOtpHash?: string | null
  phoneOtpExpiresAt?: string | null
}

export async function issueOtp(
  payload: Payload,
  userId: string | number,
  step: OtpStep,
): Promise<void> {
  const user = (await payload.findByID({
    collection: 'users',
    id: userId,
    overrideAccess: true,
  })) as UserOtpRecord

  if (!user?.email) {
    throw new Error('User email is required to send verification code.')
  }

  const otp = generateOtp()
  const otpHash = hashOtp(otp)
  const expiresAt = getOtpExpiryDate()

  if (step === 'email') {
    await payload.update({
      collection: 'users',
      id: userId,
      overrideAccess: true,
      data: {
        emailOtpHash: otpHash,
        emailOtpExpiresAt: expiresAt,
      },
    })

    logger.auth.info('Issuing email verification OTP', {
      userId,
      to: user.email,
      otp: otp,
      expiresAt,
    })

    try {
      await sendEmailVerificationOtp(user.email, otp, user.fullName || undefined)
    } catch (err) {
      logger.auth.error('Failed to send email verification OTP via SES', { error: err })
      if (process.env.NODE_ENV === 'production') {
        throw err
      }
    }
    return
  }

  // Send Phone OTP flow  
  await payload.update({
    collection: 'users',
    id: userId,
    overrideAccess: true,
    data: {
      phoneOtpHash: otpHash,
      phoneOtpExpiresAt: expiresAt,
    },
  })

  logger.auth.info('Issuing phone verification OTP', {
    userId,
    to: user.email,
    phoneNumber: user.phoneNumber || null,
    otp: otp,
    expiresAt,
  })

  if (process.env.MSG91_AUTH_KEY && process.env.MSG91_TEMPLATE_ID && user.phoneNumber) {
    try {
      await sendMsg91Otp(user.phoneNumber, otp)
    } catch (err) {
      logger.auth.error('Failed to send phone OTP via MSG91, falling back to email.', { error: err })
      try {
        await sendPhoneVerificationOtp(
          user.email,
          otp,
          user.fullName || undefined,
          user.phoneNumber || undefined,
        )
      } catch (fallbackErr) {
        logger.auth.error('Failed to deliver phone OTP via email fallback.', { error: fallbackErr })
        if (process.env.NODE_ENV === 'production') {
          throw err
        }
      }
    }
  } else {
    // Phone OTP is delivered via email if MSG91 is not configured or phone number is missing
    try {
      await sendPhoneVerificationOtp(
        user.email,
        otp,
        user.fullName || undefined,
        user.phoneNumber || undefined,
      )
    } catch (fallbackErr) {
      logger.auth.error('Failed to deliver phone OTP via email.', { error: fallbackErr })
      if (process.env.NODE_ENV === 'production') {
        throw fallbackErr
      }
    }
  }
}

export function validateStoredOtp(user: UserOtpRecord, step: OtpStep, otp: string): string | null {
  const hash = step === 'email' ? user.emailOtpHash : user.phoneOtpHash
  const expiresAt = step === 'email' ? user.emailOtpExpiresAt : user.phoneOtpExpiresAt

  if (!hash || !expiresAt) {
    return 'Verification code has expired. Please request a new code.'
  }

  if (isOtpExpired(expiresAt)) {
    return 'Verification code has expired. Please request a new code.'
  }

  if (!verifyOtp(otp, hash)) {
    return 'Invalid verification code. Please try again.'
  }

  return null
}

export async function clearOtp(
  payload: Payload,
  userId: string | number,
  step: OtpStep,
): Promise<void> {
  const updateData =
    step === 'email'
      ? {
        emailOtpHash: null,
        emailOtpExpiresAt: null,
      }
      : {
        phoneOtpHash: null,
        phoneOtpExpiresAt: null,
      }

  await payload.update({
    collection: 'users',
    id: userId,
    overrideAccess: true,
    data: updateData,
  })
}
