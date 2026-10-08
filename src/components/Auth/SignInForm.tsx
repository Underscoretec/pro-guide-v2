'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { signIn, type AuthState } from '@/lib/auth/actions'
import { Field, FormError, primaryButtonClass } from './AuthShell'
import { FiLogIn, FiCheckCircle } from 'react-icons/fi'

export const SignInForm: React.FC<{ justVerified?: boolean }> = ({ justVerified }) => {
  const [state, action, pending] = useActionState<AuthState, FormData>(signIn, {})

  return (
    <form action={action} className="space-y-4">
      {justVerified && !state.error && (
        <div className="bg-green/10 border border-green/30 text-green text-[13.5px] rounded-[6px] px-3.5 py-2.5 flex items-center gap-2">
          <FiCheckCircle className="w-4 h-4 shrink-0" />
          <span>Verification complete. You can now sign in.</span>
        </div>
      )}
      <FormError message={state.error} />
      <Field
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="your.email@example.com"
        defaultValue={state.values?.email}
      />
      <Field
        label="Password"
        name="password"
        type="password"
        required
        autoComplete="current-password"
        placeholder="Enter your password"
      />
      <button type="submit" disabled={pending} className={primaryButtonClass}>
        <FiLogIn className="w-4 h-4" />
        <span>{pending ? 'Signing in…' : 'Sign In'}</span>
      </button>
      <p className="text-[13.5px] text-muted text-center pt-2">
        New to ProGuide?{' '}
        <Link href="/sign-up" className="font-bold text-purple hover:text-purple-d hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  )
}
