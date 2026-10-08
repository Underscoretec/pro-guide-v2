'use client'

import React, { useActionState, useState, useTransition } from 'react'
import { verifyOtp, resendOtp, type AuthState } from '@/lib/auth/actions'
import { Field, FormError, primaryButtonClass } from './AuthShell'

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
        {pending ? 'Verifying…' : 'Verify'}
      </button>
      <p className="text-[13.5px] text-muted text-center">
        Didn’t get a code?{' '}
        <button type="button" onClick={onResend} disabled={resending} className="font-semibold text-purple hover:underline disabled:opacity-60">
          {resending ? 'Sending…' : 'Resend OTP'}
        </button>
        {resent && <span className="block text-green mt-1">A new OTP has been sent.</span>}
      </p>
    </form>
  )
}
