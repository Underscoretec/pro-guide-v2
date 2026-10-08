'use client'

import React, { useActionState, useEffect } from 'react'
import { saveAddress } from '@/lib/profile/actions'
import type { AuthState } from '@/lib/auth/actions'
import { Field, FormError, primaryButtonClass } from '@/components/Auth/AuthShell'

type Address = {
  id: number | string
  addressLine: string
  city: string
  state: string
  postalCode: string
  country: string
}

export const AddressForm: React.FC<{ address?: Address; onDone: () => void }> = ({ address, onDone }) => {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    saveAddress.bind(null, address?.id ?? null),
    {},
  )
  useEffect(() => {
    if (state.values?.saved) onDone()
  }, [state, onDone])

  const v = state.values ?? address ?? {}
  const e = state.fieldErrors ?? {}
  return (
    <form action={action} className="grid gap-4 sm:grid-cols-2 px-6 py-5 bg-card/50">
      <div className="sm:col-span-2">
        <FormError message={state.error} />
      </div>
      <Field className="sm:col-span-2" textarea label="Street Address" name="addressLine" required defaultValue={v.addressLine} error={e.addressLine} />
      <Field label="City" name="city" required defaultValue={v.city} error={e.city} />
      <Field label="State / Province" name="state" required defaultValue={v.state} error={e.state} />
      <Field label="Postal Code / PIN" name="postalCode" required defaultValue={v.postalCode} error={e.postalCode} />
      <Field label="Country" name="country" required defaultValue={v.country || 'India'} />
      <div className="sm:col-span-2 flex gap-3">
        <button type="submit" disabled={pending} className={`${primaryButtonClass} !w-auto px-6`}>
          {pending ? 'Saving…' : 'Save Address'}
        </button>
        <button type="button" onClick={onDone} className="border border-[#C9CDD3] rounded-[5px] px-6 text-[14px] font-semibold text-ink hover:border-purple">
          Cancel
        </button>
      </div>
    </form>
  )
}
