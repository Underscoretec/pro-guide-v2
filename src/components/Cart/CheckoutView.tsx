'use client'

import React, { useState, useEffect, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { AddressForm, type Address } from '@/components/Profile/AddressForm'
import { setDefaultAddress, removeAddress } from '@/lib/profile/actions'
import type { ShippingAddress } from '@/payload-types'

export interface CheckoutUser {
  id: number | string
  fullName: string
  email: string
  phoneNumber?: string | null
}

export interface CheckoutViewProps {
  user?: CheckoutUser | null
  initialAddresses?: ShippingAddress[]
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  user,
  initialAddresses = [],
}) => {
  const router = useRouter()
  const { items, subtotal, clearCart, isHydrated } = useCart()

  const [addresses, setAddresses] = useState<ShippingAddress[]>(initialAddresses)
  const [selectedAddressId, setSelectedAddressId] = useState<number | string | null>(() => {
    const def = initialAddresses.find((a) => a.isDefault) || initialAddresses[0]
    return def?.id ?? null
  })

  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<number | string | null>(null)
  const [orderNotes, setOrderNotes] = useState('')
  const [isActionPending, startTransition] = useTransition()

  const [currentStep, setCurrentStep] = useState<2 | 3>(2)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | number | null>(null)
  const [confirmedOrderSummary, setConfirmedOrderSummary] = useState<{
    items: { id?: string; name: string; price: number; quantity?: number; imageUrl?: string }[]
    subtotal: number
    gst: number
    total: number
    date: string
    deliveryAddress?: {
      fullName: string
      addressLine: string
      city: string
      state: string
      postalCode: string
      country: string
      phone?: string
    }
    orderNotes?: string
  } | null>(null)

  // Sync addresses when server props update
  useEffect(() => {
    setAddresses(initialAddresses)
  }, [initialAddresses])

  // Maintain valid selectedAddressId
  useEffect(() => {
    if (addresses.length > 0) {
      if (!selectedAddressId || !addresses.some((a) => a.id === selectedAddressId)) {
        const def = addresses.find((a) => a.isDefault) || addresses[0]
        setSelectedAddressId(def?.id ?? null)
      }
    } else {
      setSelectedAddressId(null)
    }
  }, [addresses, selectedAddressId])

  const gstRate = 0.18
  const computedGst = Math.round(subtotal * gstRate)
  const computedTotal = subtotal + computedGst

  const formatPrice = (amount: number) => {
    return `Rs ${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const handleSetDefault = (id: number | string) => {
    startTransition(async () => {
      await setDefaultAddress(id)
      setSelectedAddressId(id)
      router.refresh()
    })
  }

  const handleRemoveAddress = (id: number | string) => {
    if (!confirm('Are you sure you want to remove this address?')) return
    startTransition(async () => {
      await removeAddress(id)
      if (selectedAddressId === id) {
        const remaining = addresses.filter((a) => a.id !== id)
        setSelectedAddressId(remaining[0]?.id ?? null)
      }
      router.refresh()
    })
  }

  const handleAddressSaved = (newId?: string) => {
    setIsAddingNew(false)
    setEditingAddressId(null)
    if (newId) {
      setSelectedAddressId(Number(newId) || newId)
    }
    router.refresh()
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    if (items.length === 0) {
      setSubmitError('Your cart is empty. Please add products to your cart before placing an order.')
      return
    }

    const selectedAddr = addresses.find((a) => a.id === selectedAddressId)
    if (!selectedAddr) {
      setSubmitError('Please select or add a shipping address before completing checkout.')
      return
    }

    setIsSubmitting(true)

    const orderNum = `PG-${Date.now().toString().slice(-6)}`
    const now = new Date()
    const dd = String(now.getDate()).padStart(2, '0')
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const yyyy = now.getFullYear()

    setConfirmedOrderSummary({
      items: [...items],
      subtotal,
      gst: computedGst,
      total: computedTotal,
      date: `${dd}/${mm}/${yyyy}`,
      deliveryAddress: {
        fullName: user?.fullName || 'Customer',
        addressLine: selectedAddr.addressLine,
        city: selectedAddr.city,
        state: selectedAddr.state,
        postalCode: selectedAddr.postalCode,
        country: selectedAddr.country,
        phone: user?.phoneNumber || '',
      },
      orderNotes: orderNotes.trim() || undefined,
    })
    setConfirmedOrderId(orderNum)
    clearCart()
    setIsSubmitting(false)
    setCurrentStep(3)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="bg-white min-h-[75vh] py-10 md:py-14">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-[26px] md:text-[30px] font-bold text-ink tracking-tight mb-8 uppercase">
          {currentStep === 3 ? 'ORDER RECEIVED' : 'SHIPPING AND CHECKOUT'}
        </h1>

        {/* 3-Step Stepper Header */}
        <div className="relative mb-10 pb-4 border-b border-[#E5E7EB]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Step 1 */}
            <Link href="/cart" className="relative pb-3 block group">
              <div className="font-bold text-[13px] md:text-[14px] text-ink uppercase tracking-wider group-hover:text-purple transition-colors">
                01 SHOPPING BAG
              </div>
              <div className="text-[12px] md:text-[12.5px] text-muted mt-0.5">
                Manage Your Items List
              </div>
            </Link>

            {/* Step 2 */}
            <div className="relative pb-3">
              <div
                className={`text-[13px] md:text-[14px] uppercase tracking-wider ${
                  currentStep === 2 ? 'font-bold text-ink' : 'font-semibold text-[#4B5563]'
                }`}
              >
                02 SHIPPING AND CHECKOUT
              </div>
              <div className="text-[12px] md:text-[12.5px] text-muted mt-0.5">
                Checkout Your Items List
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative pb-3">
              <div
                className={`text-[13px] md:text-[14px] uppercase tracking-wider ${
                  currentStep === 3 ? 'font-bold text-ink' : 'font-semibold text-[#4B5563]'
                }`}
              >
                03 CONFIRMATION
              </div>
              <div className="text-[12px] md:text-[12.5px] text-muted mt-0.5">
                Review And Submit Your Order
              </div>
            </div>
          </div>
          {/* Active Dark Indicator Underline */}
          <div
            className={`absolute left-0 bottom-[-1px] h-[2px] bg-ink transition-all duration-300 ${
              currentStep === 3 ? 'w-full' : 'hidden md:block md:w-2/3'
            }`}
          />
        </div>

        {/* Step 3: Confirmation View */}
        {currentStep === 3 && confirmedOrderSummary ? (
          <div className="py-6 animate-in fade-in duration-200">
            {/* Purple Circle with White Checkmark */}
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#5E007B] flex items-center justify-center mx-auto mb-6 text-white shadow-sm">
              <svg
                className="w-7 h-7 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Title & Subtitle */}
            <h2 className="text-[25px] md:text-[28px] font-bold text-[#111827] tracking-tight mb-2 text-center">
              Your order is completed!
            </h2>
            <p className="text-[12.5px] md:text-[13px] text-[#6B7280] mb-8 text-center">
              Thank you. Your order has been received.
            </p>

            {/* Dashed Order Metadata Card */}
            <div className="max-w-[760px] mx-auto rounded-[4px] border border-dashed border-[#D1D5DB] py-5 px-6 sm:px-8 mb-8 bg-white">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 text-left">
                <div>
                  <div className="text-[11.5px] text-[#6B7280] mb-1">Order Number</div>
                  <div className="text-[13.5px] font-bold text-ink">{confirmedOrderId}</div>
                </div>
                <div>
                  <div className="text-[11.5px] text-[#6B7280] mb-1">Date</div>
                  <div className="text-[13.5px] font-bold text-ink">
                    {confirmedOrderSummary.date}
                  </div>
                </div>
                <div>
                  <div className="text-[11.5px] text-[#6B7280] mb-1">Total</div>
                  <div className="text-[13.5px] font-bold text-ink">
                    {formatPrice(confirmedOrderSummary.total)}
                  </div>
                </div>
                <div>
                  <div className="text-[11.5px] text-[#6B7280] mb-1">Payment Method</div>
                  <div className="text-[13.5px] font-bold text-ink">Direct Bank Transfer</div>
                </div>
              </div>
            </div>

            {/* Delivery Address Details */}
            {confirmedOrderSummary.deliveryAddress && (
              <div className="max-w-[760px] mx-auto rounded-[4px] border border-[#E5E7EB] p-5 sm:p-6 mb-8 bg-[#F9FAFB]/60 text-left">
                <h3 className="text-[12px] font-bold text-[#4B5563] uppercase tracking-wider mb-2">
                  Delivering To:
                </h3>
                <div className="text-[14px] font-semibold text-ink">
                  {confirmedOrderSummary.deliveryAddress.fullName}
                </div>
                <div className="text-[13px] text-[#4B5563] mt-0.5">
                  {confirmedOrderSummary.deliveryAddress.addressLine},{' '}
                  {confirmedOrderSummary.deliveryAddress.city},{' '}
                  {confirmedOrderSummary.deliveryAddress.state},{' '}
                  {confirmedOrderSummary.deliveryAddress.country} -{' '}
                  {confirmedOrderSummary.deliveryAddress.postalCode}
                </div>
                {confirmedOrderSummary.deliveryAddress.phone && (
                  <div className="text-[12.5px] text-[#6B7280] mt-1">
                    Phone: {confirmedOrderSummary.deliveryAddress.phone}
                  </div>
                )}
                {confirmedOrderSummary.orderNotes && (
                  <div className="text-[12.5px] text-muted italic mt-2 border-t border-[#E5E7EB] pt-2">
                    Order notes: {confirmedOrderSummary.orderNotes}
                  </div>
                )}
              </div>
            )}

            {/* Order Details Card */}
            <div className="max-w-[760px] mx-auto rounded-[4px] border border-[#E5E7EB] p-6 sm:p-8 bg-white">
              <h3 className="text-[13px] font-bold text-ink uppercase tracking-wider mb-6 text-left">
                ORDER DETAILS
              </h3>

              {/* Table Header */}
              <div className="flex justify-between items-center pb-3 border-b border-[#E5E7EB] text-[11.5px] font-bold text-ink uppercase tracking-wider">
                <span>PRODUCT</span>
                <span>SUBTOTAL</span>
              </div>

              {/* Product Items List */}
              <div className="divide-y divide-[#E5E7EB]/60">
                {confirmedOrderSummary.items.map((item, idx) => {
                  const itemSubtotal = item.price * (item.quantity || 1)
                  return (
                    <div
                      key={item.id || idx}
                      className="py-3 flex justify-between items-center text-[13px] text-[#4B5563]"
                    >
                      <span>
                        {item.name}
                        {item.quantity && item.quantity > 1 ? ` × ${item.quantity}` : ''}
                      </span>
                      <span>{formatPrice(itemSubtotal)}</span>
                    </div>
                  )
                })}
              </div>

              {/* Summary Rows */}
              <div className="border-t border-[#E5E7EB] text-[13px]">
                <div className="py-3.5 flex justify-between items-center border-b border-[#E5E7EB]/60">
                  <span className="font-bold text-ink uppercase text-[12px] tracking-wider">
                    SUBTOTAL
                  </span>
                  <span className="font-bold text-ink">
                    {formatPrice(confirmedOrderSummary.subtotal)}
                  </span>
                </div>

                <div className="py-3.5 flex justify-between items-center border-b border-[#E5E7EB]/60">
                  <span className="font-bold text-ink uppercase text-[12px] tracking-wider">
                    SHIPPING
                  </span>
                  <span className="text-[#4B5563]">Free shipping</span>
                </div>

                <div className="py-3.5 flex justify-between items-center border-b border-[#E5E7EB]/60">
                  <span className="font-bold text-ink uppercase text-[12px] tracking-wider">
                    GST (18%)
                  </span>
                  <span className="text-[#4B5563]">{formatPrice(confirmedOrderSummary.gst)}</span>
                </div>

                <div className="py-3.5 flex justify-between items-center border-b border-[#E5E7EB]/60">
                  <span className="font-bold text-ink uppercase text-[12px] tracking-wider">
                    PAYMENT METHOD
                  </span>
                  <span className="text-[#4B5563]">Direct bank transfer</span>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <span className="font-bold text-ink uppercase text-[13px] tracking-wider">
                    TOTAL
                  </span>
                  <span className="font-bold text-ink text-[14px]">
                    {formatPrice(confirmedOrderSummary.total)}
                  </span>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/products"
                  className="inline-block bg-[#5E007B] hover:bg-[#430D60] text-white px-8 py-3 rounded-[3px] font-bold text-[13px] uppercase tracking-wider transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: Main Shipping & Checkout View */
          <div>
            {submitError && (
              <div className="mb-6 p-4 bg-[#FEF2F2] border border-[#FCA5A5] rounded-[4px] text-[#991B1B] text-[13px] flex items-center justify-between">
                <span>{submitError}</span>
                <button
                  type="button"
                  onClick={() => setSubmitError(null)}
                  className="font-bold text-lg leading-none cursor-pointer"
                >
                  &times;
                </button>
              </div>
            )}

            {isHydrated && items.length === 0 ? (
              <div className="p-12 text-center border border-[#E5E7EB] rounded-[4px] bg-[#F9FAFB]">
                <p className="text-[15px] text-[#4B5563] mb-4">
                  Your cart is currently empty.
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-[#5E007B] hover:bg-[#430D60] text-white px-6 py-2.5 rounded-[3px] font-semibold text-[13px] uppercase tracking-wider transition-colors"
                >
                  View Products
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Section: Saved Addresses & Add Address Form */}
                <div className="lg:col-span-8">
                  <div className="bg-white border border-[#E5E7EB] rounded-[4px] p-6 shadow-xs">
                    <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-5">
                      <div>
                        <h2 className="text-[14px] md:text-[15px] font-bold text-ink uppercase tracking-wider">
                          SAVED ADDRESSES
                        </h2>
                        <p className="text-[12px] text-muted mt-0.5">
                          Select the shipping address for this order
                        </p>
                      </div>
                      {!isAddingNew && addresses.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setIsAddingNew(true)}
                          className="text-[13px] font-bold text-[#5E007B] hover:underline cursor-pointer"
                        >
                          + Add New Address
                        </button>
                      )}
                    </div>

                    {/* Address List */}
                    {addresses.length === 0 && !isAddingNew ? (
                      <div className="py-6 text-center">
                        <p className="text-[13.5px] text-[#6B7280] mb-4">
                          You have no saved addresses yet.
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsAddingNew(true)}
                          className="bg-[#5E007B] hover:bg-[#430D60] text-white px-5 py-2 rounded-[3px] text-[13px] font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Add Shipping Address
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {addresses.map((addr) => {
                          const isSelected = selectedAddressId === addr.id
                          const isEditing = editingAddressId === addr.id

                          if (isEditing) {
                            return (
                              <div
                                key={addr.id}
                                className="border border-[#5E007B] rounded-[4px] overflow-hidden"
                              >
                                <div className="px-5 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between">
                                  <span className="text-[12px] font-bold text-ink uppercase tracking-wider">
                                    Edit Address
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setEditingAddressId(null)}
                                    className="text-[12px] text-muted hover:text-ink cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </div>
                                <AddressForm
                                  address={addr as unknown as Address}
                                  onDone={handleAddressSaved}
                                  onCancel={() => setEditingAddressId(null)}
                                />
                              </div>
                            )
                          }

                          return (
                            <div
                              key={addr.id}
                              onClick={() => setSelectedAddressId(addr.id)}
                              className={`p-4 sm:p-5 rounded-[4px] border transition-all cursor-pointer flex items-start gap-4 ${
                                isSelected
                                  ? 'border-[#5E007B] bg-[#FAF5FF]/40 shadow-xs'
                                  : 'border-[#E5E7EB] hover:border-[#D1D5DB] bg-white'
                              }`}
                            >
                              <input
                                type="radio"
                                id={`address-${addr.id}`}
                                name="selectedAddress"
                                checked={isSelected}
                                onChange={() => setSelectedAddressId(addr.id)}
                                className="mt-1 w-4 h-4 accent-[#5E007B] cursor-pointer"
                              />

                              <div className="flex-1 text-left min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                  <span className="font-bold text-[14px] text-ink">
                                    {user?.fullName || 'Recipient'}
                                  </span>
                                  {addr.isDefault && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#5E007B]/10 text-[#5E007B] px-2 py-0.5 rounded-full">
                                      Default
                                    </span>
                                  )}
                                  {isSelected && (
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                                      Selected for Delivery
                                    </span>
                                  )}
                                </div>

                                <p className="text-[13px] text-[#4B5563] leading-relaxed">
                                  {addr.addressLine}
                                </p>
                                <p className="text-[13px] text-[#4B5563]">
                                  {addr.city}, {addr.state}, {addr.country} -{' '}
                                  <span className="font-semibold text-ink">
                                    {addr.postalCode}
                                  </span>
                                </p>

                                {user?.phoneNumber && (
                                  <p className="text-[12.5px] text-[#6B7280] mt-1">
                                    <span className="font-medium text-ink">Phone:</span>{' '}
                                    {user.phoneNumber}
                                  </p>
                                )}

                                {addr.deliveryNotes && (
                                  <p className="text-[12px] text-muted italic mt-1.5 bg-[#F9FAFB] p-2 rounded-[2px] border border-[#E5E7EB]/50">
                                    Notes: {addr.deliveryNotes}
                                  </p>
                                )}

                                <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[#E5E7EB]/60 text-[12.5px]">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setEditingAddressId(addr.id)
                                    }}
                                    className="font-semibold text-[#5E007B] hover:underline cursor-pointer"
                                  >
                                    Edit
                                  </button>
                                  {!addr.isDefault && (
                                    <button
                                      type="button"
                                      disabled={isActionPending}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleSetDefault(addr.id)
                                      }}
                                      className="text-muted hover:text-ink cursor-pointer disabled:opacity-50"
                                    >
                                      Set as Default
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    disabled={isActionPending}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handleRemoveAddress(addr.id)
                                    }}
                                    className="text-red-600 hover:text-red-700 cursor-pointer disabled:opacity-50"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Add New Address Form Section Directly Under List */}
                    {isAddingNew && (
                      <div className="mt-6 pt-5 border-t border-[#E5E7EB]">
                        <div className="border border-[#E5E7EB] rounded-[4px] overflow-hidden bg-white shadow-xs">
                          <div className="px-6 py-3.5 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between">
                            <h3 className="text-[13px] font-bold text-ink uppercase tracking-wider">
                              Add New Shipping Address
                            </h3>
                            <button
                              type="button"
                              onClick={() => setIsAddingNew(false)}
                              className="text-[12.5px] font-semibold text-muted hover:text-ink cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                          <AddressForm
                            onDone={handleAddressSaved}
                            onCancel={() => setIsAddingNew(false)}
                          />
                        </div>
                      </div>
                    )}

                    {/* Order Notes / Instructions */}
                    <div className="mt-6 pt-6 border-t border-[#E5E7EB]">
                      <label
                        htmlFor="orderNotes"
                        className="block text-[13px] font-bold text-ink uppercase tracking-wider mb-2"
                      >
                        Order Notes (optional)
                      </label>
                      <textarea
                        id="orderNotes"
                        name="orderNotes"
                        rows={3}
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Notes about your order, e.g. special instructions for delivery."
                        className="w-full border border-[#E5E7EB] rounded-[3px] p-3 text-[13px] text-ink placeholder-[#9CA3AF] focus:outline-none focus:border-[#5E007B] focus:ring-1 focus:ring-[#5E007B]"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Section: YOUR ORDER Summary */}
                <div className="lg:col-span-4 lg:sticky lg:top-24">
                  <div className="border border-[#E5E7EB] rounded-[2px] p-6 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                    <h2 className="text-[13px] font-bold text-ink uppercase tracking-wider mb-6">
                      YOUR ORDER
                    </h2>

                    {/* Header Row: PRODUCT / SUBTOTAL */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB] text-[11.5px] font-bold text-[#4B5563] uppercase tracking-wider">
                      <span>PRODUCT</span>
                      <span>SUBTOTAL</span>
                    </div>

                    {/* Products list */}
                    <div className="divide-y divide-[#E5E7EB]/60">
                      {items.map((item, idx) => {
                        const itemSubtotal = item.price * (item.quantity || 1)
                        return (
                          <div
                            key={item.id || idx}
                            className="flex items-center justify-between py-3 text-[13px]"
                          >
                            <span className="text-[#4B5563] pr-2">
                              {item.name}
                              {item.quantity && item.quantity > 1 ? ` × ${item.quantity}` : ''}
                            </span>
                            <span className="text-[#4B5563] whitespace-nowrap">
                              {formatPrice(itemSubtotal)}
                            </span>
                          </div>
                        )
                      })}
                    </div>

                    {/* Order Totals List */}
                    <div className="border-t border-[#E5E7EB] pt-1 space-y-3.5 text-[12.5px]">
                      {/* Subtotal */}
                      <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                        <span className="font-bold text-[#1F2328] uppercase tracking-wide">
                          SUBTOTAL
                        </span>
                        <span className="text-[#1F2328] font-medium">
                          {formatPrice(subtotal)}
                        </span>
                      </div>

                      {/* Shipping */}
                      <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                        <span className="font-bold text-[#1F2328] uppercase tracking-wide">
                          SHIPPING
                        </span>
                        <span className="text-[#1F2328] font-normal">Free shipping</span>
                      </div>

                      {/* GST - 18% */}
                      <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                        <span className="font-bold text-[#1F2328] uppercase tracking-wide">
                          GST - 18%
                        </span>
                        <span className="text-[#1F2328] font-medium">
                          {formatPrice(computedGst)}
                        </span>
                      </div>

                      {/* Grand Total */}
                      <div className="flex items-center justify-between py-2.5 text-[13px]">
                        <span className="font-extrabold text-[#1F2328] uppercase tracking-wide">
                          TOTAL
                        </span>
                        <span className="font-bold text-[#1F2328] text-[14.5px]">
                          {formatPrice(computedTotal)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Policy Note */}
                  <p className="text-[11.5px] text-[#4B5563] leading-[1.6] my-4">
                    Your personal data will be used to process your order, support your experience
                    throughout this website, and for other purposes described in our{' '}
                    <Link
                      href="/privacy-policy"
                      className="text-[#5E007B] hover:underline font-medium"
                    >
                      privacy policy
                    </Link>
                    .
                  </p>

                  {/* PLACE ORDER Button */}
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting || items.length === 0}
                    className="w-full bg-[#5E007B] hover:bg-[#430D60] active:scale-[0.99] text-white py-3.5 px-6 rounded-[3px] font-bold text-[13px] uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>PROCESSING...</span>
                      </>
                    ) : (
                      'PLACE ORDER'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default CheckoutView
