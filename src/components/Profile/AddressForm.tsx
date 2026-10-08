'use client'

import React, { useActionState, useEffect } from 'react'
import { saveAddress } from '@/lib/profile/actions'
import type { AuthState } from '@/lib/auth/actions'
import { Field, FormError, primaryButtonClass } from '@/components/Auth/AuthShell'

import { FiCheck, FiX } from 'react-icons/fi'

export type Address = {
  id: number | string
  addressLine: string
  city: string
  state: string
  postalCode: string
  country: string
  deliveryNotes?: string | null
  isDefault?: boolean | null
}

export const AddressForm: React.FC<{
  address?: Address
  onDone: (newId?: string) => void
  onCancel?: () => void
  className?: string
}> = ({ address, onDone, onCancel, className = '' }) => {
  const [state, action, pending] = useActionState<AuthState, FormData>(
    saveAddress.bind(null, address?.id ?? null),
    {},
  )
  useEffect(() => {
    if (state.values?.saved) onDone(state.values?.newId)
  }, [state, onDone])

  const v = state.values ?? address ?? {}
  const e = state.fieldErrors ?? {}
  return (
    <form action={action} className={`grid gap-4 sm:grid-cols-2 px-6 py-5 bg-card/50 ${className}`}>
      <div className="sm:col-span-2">
        <FormError message={state.error} />
      </div>
      <Field className="sm:col-span-2" textarea label="Street Address" name="addressLine" required defaultValue={v.addressLine} error={e.addressLine} />
      <Field label="City" name="city" required defaultValue={v.city} error={e.city} />
      <Field label="State / Province" name="state" required defaultValue={v.state} error={e.state} />
      <Field label="Postal Code / PIN" name="postalCode" required defaultValue={v.postalCode} error={e.postalCode} />
      <Field label="Country" name="country" required defaultValue={v.country || 'India'} />
      <Field className="sm:col-span-2" textarea label="Delivery Notes / Instructions (optional)" name="deliveryNotes" defaultValue={v.deliveryNotes ?? ''} />
      <div className="sm:col-span-2 flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className={`${primaryButtonClass} !w-auto px-6 inline-flex items-center gap-2`}
        >
          <FiCheck className="w-4 h-4" />
          <span>{pending ? 'Saving…' : 'Save Address'}</span>
        </button>
        <button
          type="button"
          onClick={() => {
            if (onCancel) onCancel()
            else onDone()
          }}
          className="border border-[#C9CDD3] rounded-[6px] px-5 py-[10px] text-[14px] font-semibold text-ink hover:border-purple hover:text-purple hover:bg-white transition-all cursor-pointer inline-flex items-center gap-1.5"
        >
          <FiX className="w-4 h-4" />
          <span>Cancel</span>
        </button>
      </div>
    </form>
  )
}
