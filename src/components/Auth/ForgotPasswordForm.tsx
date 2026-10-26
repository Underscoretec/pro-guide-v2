'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { requestPasswordReset } from '@/lib/auth/passwordReset'
import type { AuthState } from '@/lib/auth/actions'
import { Field, FormError, primaryButtonClass } from './AuthShell'
import { FiSend } from 'react-icons/fi'

export const ForgotPasswordForm: React.FC = () => {
  const [state, action, pending] = useActionState<AuthState, FormData>(requestPasswordReset, {})
  const e = state.fieldErrors ?? {}

  return (
    <form action={action} className="space-y-4">
      <FormError message={state.error} />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="your.email@example.com"
        defaultValue={state.values?.email}
        error={e.email}
      />
      <button type="submit" disabled={pending} className={primaryButtonClass}>
        <FiSend className="w-4 h-4" />
        <span>{pending ? 'Sending…' : 'Send Reset Code'}</span>
      </button>
      <p className="text-[13.5px] text-muted text-center pt-2">
        Remembered your password?{' '}
        <Link href="/sign-in" className="font-bold text-purple hover:text-purple-d hover:underline">
          Sign In
        </Link>
      </p>
    </form>
  )
}
