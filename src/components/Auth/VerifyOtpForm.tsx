'use client'

import React, { useActionState, useState, useTransition } from 'react'
import { verifyOtp, resendOtp, type AuthState } from '@/lib/auth/actions'
import { Field, FormError, primaryButtonClass } from './AuthShell'
import { FiCheckCircle, FiRefreshCw } from 'react-icons/fi'

export const VerifyOtpForm: React.FC<{ email: string }> = ({ email }) => {
  const [state, action, pending] = useActionState<AuthState, FormData>(verifyOtp, {})
  const [resent, setResent] = useState(false)
  const [resending, startResend] = useTransition()
  const e = state.fieldErrors ?? {}

  const onResend = () =>
    startResend(async () => {
      await resendOtp(email)
      setResent(true)
    })

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="email" value={email} />
      <FormError message={state.error} />
      <Field label="Email OTP" name="emailOtp" required inputMode="numeric" maxLength={6} autoComplete="one-time-code" placeholder="6-digit code" error={e.emailOtp} />
      <Field label="Phone OTP" name="phoneOtp" required inputMode="numeric" maxLength={6} autoComplete="one-time-code" placeholder="6-digit code" error={e.phoneOtp} />
      <button type="submit" disabled={pending} className={primaryButtonClass}>
        <FiCheckCircle className="w-4 h-4" />
        <span>{pending ? 'Verifying…' : 'Verify & Continue'}</span>
      </button>
      <div className="text-[13.5px] text-muted text-center pt-2">
        <span>Didn’t get a code? </span>
        <button
          type="button"
          onClick={onResend}
          disabled={resending}
          className="font-bold text-purple hover:text-purple-d hover:underline disabled:opacity-60 inline-flex items-center gap-1 cursor-pointer"
        >
          <FiRefreshCw className={`w-3.5 h-3.5 ${resending ? 'animate-spin' : ''}`} />
          <span>{resending ? 'Sending…' : 'Resend OTP'}</span>
        </button>
        {resent && (
          <div className="flex items-center justify-center gap-1.5 text-green text-[13px] font-semibold mt-2">
            <FiCheckCircle className="w-3.5 h-3.5" />
            <span>A new OTP has been sent to your email & phone.</span>
          </div>
        )}
      </div>
    </form>
  )
}
