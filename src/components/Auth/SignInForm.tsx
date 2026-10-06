'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { signIn, type AuthState } from '@/lib/auth/actions'
import { Field, FormError, primaryButtonClass } from './AuthShell'

export const SignInForm: React.FC<{ justVerified?: boolean }> = ({ justVerified }) => {
  const [state, action, pending] = useActionState<AuthState, FormData>(signIn, {})

  return (
    <form action={action} className="space-y-4">
      {justVerified && !state.error && (
        <div className="bg-green/10 border border-green/30 text-green text-[13.5px] rounded-[5px] px-3 py-2">
          Verification complete. You can now sign in.
        </div>
      )}
      <FormError message={state.error} />
      <Field label="Email" name="email" type="email" required autoComplete="email" defaultValue={state.values?.email} />
      <Field label="Password" name="password" type="password" required autoComplete="current-password" />
      <button type="submit" disabled={pending} className={primaryButtonClass}>
        {pending ? 'Signing in…' : 'Sign In'}
      </button>
      <p className="text-[13.5px] text-muted text-center">
        New to ProGuide?{' '}
        <Link href="/sign-up" className="font-semibold text-purple hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  )
}
