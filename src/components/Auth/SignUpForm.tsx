'use client'

import React, { useActionState } from 'react'
import Link from 'next/link'
import { signUp, type AuthState } from '@/lib/auth/actions'
import { Field, FormError, primaryButtonClass } from './AuthShell'

export const SignUpForm: React.FC = () => {
  const [state, action, pending] = useActionState<AuthState, FormData>(signUp, {})
  const v = state.values ?? {}
  const e = state.fieldErrors ?? {}

  return (
    <form action={action} className="space-y-6">
      <FormError message={state.error} />

      <fieldset className="space-y-4">
        <legend className="text-[15px] font-bold text-purple mb-3">Your details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field className="sm:col-span-2" label="Full Name" name="fullName" required autoComplete="name" defaultValue={v.fullName} error={e.fullName} />
          <Field label="Email" name="email" type="email" required autoComplete="email" defaultValue={v.email} error={e.email} />
          <Field label="Phone Number" name="phoneNumber" type="tel" inputMode="tel" required autoComplete="tel" placeholder="+91XXXXXXXXXX" defaultValue={v.phoneNumber} error={e.phoneNumber} />
          <Field className="sm:col-span-2" label="Institution / School / College" name="institution" defaultValue={v.institution} error={e.institution} />
          <Field label="Password" name="password" type="password" required autoComplete="new-password" error={e.password} />
          <Field label="Confirm Password" name="confirmPassword" type="password" required autoComplete="new-password" error={e.confirmPassword} />
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-[15px] font-bold text-purple mb-3">Shipping address</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field className="sm:col-span-2" textarea label="Street Address" name="addressLine" required autoComplete="street-address" defaultValue={v.addressLine} error={e.addressLine} />
          <Field label="City" name="city" required autoComplete="address-level2" defaultValue={v.city} error={e.city} />
          <Field label="State / Province" name="state" required autoComplete="address-level1" defaultValue={v.state} error={e.state} />
          <Field label="Postal Code / PIN" name="postalCode" required autoComplete="postal-code" defaultValue={v.postalCode} error={e.postalCode} />
          <Field label="Country" name="country" required autoComplete="country-name" defaultValue={v.country || 'India'} error={e.country} />
        </div>
      </fieldset>

      <button type="submit" disabled={pending} className={primaryButtonClass}>
        {pending ? 'Creating account…' : 'Create Account'}
      </button>
      <p className="text-[13.5px] text-muted text-center">
        Already have an account?{' '}
        <Link href="/sign-in" className="font-semibold text-purple hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
