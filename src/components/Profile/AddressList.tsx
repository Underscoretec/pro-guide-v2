'use client'

import React, { useState, useTransition } from 'react'
import { removeAddress, setDefaultAddress } from '@/lib/profile/actions'
import { AddressForm } from './AddressForm'
import { FiMapPin, FiPlus, FiPhone, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi'

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
    <div className="bg-white rounded-[8px] shadow-sm border border-line overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-8 py-5 border-b border-line bg-white">
        <div className="flex items-center gap-2.5">
          <FiMapPin className="text-purple w-5 h-5" />
          <h1 className="text-[19px] sm:text-[20px] font-bold text-ink">Saved Addresses</h1>
        </div>
        <button
          type="button"
          onClick={() => setEditing('new')}
          className="inline-flex items-center gap-1.5 text-purple hover:text-purple-d font-bold text-[13px] sm:text-[13.5px] bg-tint px-3.5 py-1.5 rounded-[6px] hover:bg-purple/15 transition-all cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Address</span>
        </button>
      </div>

      {editing === 'new' && <AddressForm onDone={close} />}

      {addresses.length === 0 && editing !== 'new' && (
        <div className="px-8 py-12 text-center">
          <FiMapPin className="w-12 h-12 text-purple/30 mx-auto mb-3" />
          <p className="text-[14px] text-muted mb-4">No saved addresses yet.</p>
          <button
            type="button"
            onClick={() => setEditing('new')}
            className="inline-flex items-center gap-1.5 bg-purple hover:bg-purple-d text-white font-bold text-[13px] px-5 py-2.5 rounded-[6px] transition-colors cursor-pointer"
          >
            <FiPlus className="w-4 h-4" />
            <span>Add Your First Address</span>
          </button>
        </div>
      )}

      {addresses.map((a) =>
        editing === a.id ? (
          <div key={a.id} className="border-b border-line">
            <AddressForm address={a} onDone={close} />
          </div>
        ) : (
          <div key={a.id} className="flex gap-4 px-6 sm:px-8 py-5 border-b border-line last:border-b-0 hover:bg-card/25 transition-colors">
            <input
              type="radio"
              name="default"
              checked={!!a.isDefault}
              disabled={pending}
              onChange={() => start(() => setDefaultAddress(a.id))}
              aria-label="Default address"
              className="mt-1 accent-purple cursor-pointer w-4 h-4"
            />
            <div className="flex-1 text-[14px]">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-bold text-ink text-[15px]">{fullName}</span>
                {a.isDefault && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple bg-tint px-2.5 py-0.5 rounded-full border border-purple/20">
                    <FiCheck className="w-3 h-3" /> Default
                  </span>
                )}
              </div>
              <div className="text-muted leading-relaxed">
                {a.addressLine}, {a.city}, {a.state}, {a.country} — {a.postalCode}
              </div>
              {phone && (
                <div className="inline-flex items-center gap-1.5 text-ink font-medium mt-1.5 text-[13px]">
                  <FiPhone className="w-3.5 h-3.5 text-purple shrink-0" />
                  <span>{phone}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 self-end sm:self-center text-[13px] shrink-0">
              <button
                type="button"
                onClick={() => setEditing(a.id)}
                className="inline-flex items-center gap-1.5 text-muted hover:text-purple font-semibold transition-colors cursor-pointer px-2 py-1"
              >
                <FiEdit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => start(() => removeAddress(a.id))}
                className="inline-flex items-center gap-1.5 border border-[#C9CDD3] rounded-full px-3.5 py-1 text-muted hover:border-red-400 hover:text-red-600 hover:bg-red-50/50 transition-all cursor-pointer disabled:opacity-50"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ),
      )}
    </div>
  )
}
