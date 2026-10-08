'use client'

import React, { useActionState, useState, useTransition } from 'react'
import { verifyOtp, resendOtp, type AuthState } from '@/lib/auth/actions'
import type { OtpStep } from '@/lib/authOtp'
import { Field, FormError, primaryButtonClass } from './AuthShell'

interface VerifyOtpFormProps {
  email: string
  step: OtpStep
  phoneNumber?: string
}

export const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({ email, step, phoneNumber }) => {
  const [state, action, pending] = useActionState<AuthState, FormData>(verifyOtp, {})
  const [resent, setResent] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)
  const [resending, startResend] = useTransition()
  const e = state.fieldErrors ?? {}

  const onResend = () => {
    startResend(async () => {
      const res = await resendOtp(email, step)
      if (res.error) {
        setResendMessage(res.error)
        setResent(false)
      } else {
        setResendMessage(
          step === 'email'
            ? 'A new verification code has been sent to your email.'
            : 'A new verification code has been sent to your phone number.',
        )
        setResent(true)
      }
    })
  }

  const isEmail = step === 'email'

  return (
    <div className="space-y-6">
      {/* 2-Step Progress Indicator */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              isEmail
                ? 'bg-purple text-white ring-4 ring-purple/10'
                : 'bg-green text-white'
            }`}
          >
            {isEmail ? '1' : '✓'}
          </span>
          <div className="text-left">
            <p className={`text-xs font-bold ${isEmail ? 'text-purple' : 'text-ink'}`}>
              Step 1: Email
            </p>
            <p className="text-[11px] text-muted">{isEmail ? 'In progress' : 'Verified'}</p>
          </div>
        </div>

        <div className={`h-[2px] flex-1 mx-3 rounded ${!isEmail ? 'bg-green' : 'bg-gray-200'}`} />

        <div className="flex items-center gap-2">
          <span
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              !isEmail
                ? 'bg-purple text-white ring-4 ring-purple/10'
                : 'bg-gray-100 text-muted'
            }`}
          >
            2
          </span>
          <div className="text-left">
            <p className={`text-xs font-bold ${!isEmail ? 'text-purple' : 'text-muted'}`}>
              Step 2: Phone
            </p>
            <p className="text-[11px] text-muted">{!isEmail ? 'In progress' : 'Pending'}</p>
          </div>
        </div>
      </div>

      <form action={action} className="space-y-4">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="step" value={step} />

        <FormError message={state.error} />

        {isEmail ? (
          <div>
            <Field
              label="Email Verification Code"
              name="otp"
              required
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              placeholder="6-digit code"
              error={e.otp}
            />
            <p className="text-[12px] text-muted mt-1.5">
              Code sent to <span className="font-semibold text-ink">{email}</span>. Check your spam folder if it doesn’t arrive shortly.
            </p>
          </div>
        ) : (
          <div>
            <Field
              label="Phone Verification Code"
              name="otp"
              required
              inputMode="numeric"
              maxLength={6}
              autoComplete="one-time-code"
              placeholder="6-digit code"
              error={e.otp}
            />
            <p className="text-[12px] text-muted mt-1.5">
              Code sent to <span className="font-semibold text-ink">{phoneNumber || 'your registered phone number'}</span>.
            </p>
          </div>
        )}

        <button type="submit" disabled={pending} className={primaryButtonClass}>
          {pending
            ? 'Verifying…'
            : isEmail
              ? 'Verify Email & Continue'
              : 'Verify Phone & Complete'}
        </button>

        <div className="text-center pt-2">
          <p className="text-[13.5px] text-muted">
            Didn’t receive the code?{' '}
            <button
              type="button"
              onClick={onResend}
              disabled={resending}
              className="font-semibold text-purple hover:underline disabled:opacity-60"
            >
              {resending ? 'Sending…' : 'Resend Code'}
            </button>
          </p>
          {resendMessage && (
            <p
              className={`text-[12.5px] mt-2 ${
                resent ? 'text-green font-medium' : 'text-red-600'
              }`}
            >
              {resendMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
