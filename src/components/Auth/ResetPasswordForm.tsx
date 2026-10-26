'use client'

import React, { useActionState, useState, useTransition } from 'react'
import { resetPassword, resendPasswordResetOtp } from '@/lib/auth/passwordReset'
import type { AuthState } from '@/lib/auth/actions'
import { Field, FormError, primaryButtonClass } from './AuthShell'
import { FiLock } from 'react-icons/fi'

export const ResetPasswordForm: React.FC<{ email: string }> = ({ email }) => {
  const [state, action, pending] = useActionState<AuthState, FormData>(resetPassword, {})
  const [resendMessage, setResendMessage] = useState<string | null>(null)
  const [resending, startResend] = useTransition()
  const e = state.fieldErrors ?? {}

  const onResend = () => {
    startResend(async () => {
      await resendPasswordResetOtp(email)
      setResendMessage('If an account exists for this email, a new code has been sent.')
    })
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="email" value={email} />
      <FormError message={state.error} />
      <div>
        <Field
          label="Verification Code"
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
      <Field
        label="New Password"
        name="password"
        type="password"
        required
        autoComplete="new-password"
        placeholder="At least 8 characters"
        error={e.password}
      />
      <Field
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        required
        autoComplete="new-password"
        placeholder="Re-enter new password"
        error={e.confirmPassword}
      />
      <button type="submit" disabled={pending} className={primaryButtonClass}>
        <FiLock className="w-4 h-4" />
        <span>{pending ? 'Resetting…' : 'Reset Password'}</span>
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
        {resendMessage && <p className="text-[12.5px] mt-2 text-green font-medium">{resendMessage}</p>}
      </div>
    </form>
  )
}
