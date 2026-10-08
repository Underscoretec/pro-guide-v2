'use client'

import React, { useState, useTransition } from 'react'
import { removeAddress, setDefaultAddress } from '@/lib/profile/actions'
import { AddressForm } from './AddressForm'

type Address = {
  id: number | string
  addressLine: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault?: boolean | null
}

export const AddressList: React.FC<{ addresses: Address[]; fullName: string; phone: string }> = ({
  addresses,
  fullName,
  phone,
}) => {
  const [editing, setEditing] = useState<number | string | 'new' | null>(null)
  const [pending, start] = useTransition()
  const close = React.useCallback(() => setEditing(null), [])

  return (
    <div className="bg-white rounded-[6px] shadow-sm">
      <div className="flex items-center justify-between px-8 py-5 border-b border-line">
        <h1 className="text-[20px] text-ink">Saved Address</h1>
        <button type="button" onClick={() => setEditing('new')} className="text-orange-d text-[14px] hover:underline">
          + Add New Address
        </button>
      </div>

      {editing === 'new' && <AddressForm onDone={close} />}

      {addresses.length === 0 && editing !== 'new' && (
        <p className="px-8 py-8 text-[14px] text-muted">No saved addresses yet.</p>
      )}

      {addresses.map((a) =>
        editing === a.id ? (
          <div key={a.id} className="border-b border-line">
            <AddressForm address={a} onDone={close} />
          </div>
        ) : (
          <div key={a.id} className="flex gap-4 px-8 py-5 border-b border-line">
            <input
              type="radio"
              name="default"
              checked={!!a.isDefault}
              disabled={pending}
              onChange={() => start(() => setDefaultAddress(a.id))}
              aria-label="Default address"
              className="mt-1 accent-orange-d"
            />
            <div className="flex-1 text-[14px]">
              <div className="font-semibold text-ink">{fullName}</div>
              <div className="text-muted">
                {a.addressLine}, {a.city}, {a.state}, {a.country}, {a.postalCode}
              </div>
              {phone && <div className="font-medium text-ink mt-1">{phone}</div>}
            </div>
            <div className="flex items-center gap-3 self-end text-[13px]">
              <button type="button" onClick={() => setEditing(a.id)} className="text-muted hover:text-purple">
                Edit
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => start(() => removeAddress(a.id))}
                className="border border-[#C9CDD3] rounded-full px-5 py-1.5 text-muted hover:border-orange-d hover:text-orange-d"
              >
                Remove
              </button>
            </div>
          </div>
        ),
      )}
    </div>
  )
}
