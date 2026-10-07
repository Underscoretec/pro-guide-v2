'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

interface FloatingFieldProps {
  id?: string
  label: string
  name: string
  value: string
  onChange: (val: string) => void
  type?: string
  required?: boolean
  isTextarea?: boolean
  isSelect?: boolean
  selectOptions?: { label: string; value: string }[]
  rows?: number
  className?: string
  placeholder?: string
}

const FloatingField: React.FC<FloatingFieldProps> = ({
  id,
  label,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  isTextarea = false,
  isSelect = false,
  selectOptions = [],
  rows = 5,
  className = '',
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = Boolean(value && value.trim().length > 0)
  const isFloating = isFocused || hasValue

  const displayPlaceholder = !isFloating
    ? placeholder !== undefined
      ? placeholder
      : label
    : ''

  return (
    <div
      className={`relative rounded-[2px] transition-all duration-150 ${
        isFocused
          ? 'border-2 border-[#5E007B]'
          : 'border border-[#E5E7EB] hover:border-[#D1D5DB]'
      } ${
        isTextarea
          ? 'p-3.5 min-h-[130px]'
          : 'h-[46px] flex items-center px-3.5'
      } ${className}`}
    >
      {/* Floating Label: appears on top border when focused or has value */}
      {isFloating && (
        <label
          htmlFor={id || name}
          className={`absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium leading-none pointer-events-none transition-colors duration-150 select-none z-10 ${
            isFocused ? 'text-[#5E007B]' : 'text-[#6B7280]'
          }`}
        >
          {label}
        </label>
      )}

      {isSelect ? (
        <div className="relative w-full flex items-center justify-between">
          <select
            id={id || name}
            name={name}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent text-[13.5px] text-ink focus:outline-none appearance-none cursor-pointer pr-6"
          >
            {selectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ink">
            <svg
              className="w-4 h-4 text-ink"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      ) : isTextarea ? (
        <textarea
          id={id || name}
          name={name}
          rows={rows}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          placeholder={displayPlaceholder}
          className="w-full h-full bg-transparent border-none text-[13.5px] text-ink placeholder-[#9CA3AF] focus:outline-none resize-y min-h-[105px]"
        />
      ) : (
        <input
          id={id || name}
          name={name}
          type={type}
          required={required}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          placeholder={displayPlaceholder}
          className="w-full h-full bg-transparent border-none text-[13.5px] text-ink placeholder-[#9CA3AF] focus:outline-none"
        />
      )}
    </div>
  )
}

export const CheckoutView: React.FC = () => {
  const router = useRouter()
  const { items, subtotal, isHydrated, clearCart } = useCart()

  const [currentStep, setCurrentStep] = useState<2 | 3>(2)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: 'India',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    postcode: '',
    province: '',
    phone: '',
    email: '',
    orderNotes: '',
  })

  // Fallback demo items from the screenshot if cart is empty
  const displayItems =
    items.length > 0
      ? items
      : [
          { id: '1', name: 'Product 1', price: 20000, quantity: 1, imageUrl: '/images/prod1.jpg' },
          { id: '2', name: 'Product 2', price: 20000, quantity: 1, imageUrl: '/images/prod2.jpg' },
        ]

  const computedSubtotal =
    items.length > 0 ? subtotal : displayItems.reduce((acc, i) => acc + i.price * i.quantity, 0)

  const gstRate = 0.18
  const computedGst = Math.round(computedSubtotal * gstRate)
  const computedTotal = computedSubtotal + computedGst

  const formatPrice = (amount: number) => {
    return `Rs ${amount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setCurrentStep(3)
    }, 600)
  }

  const countryOptions = [
    { label: 'India', value: 'India' },
    { label: 'United States', value: 'United States' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'United Arab Emirates', value: 'United Arab Emirates' },
    { label: 'Singapore', value: 'Singapore' },
    { label: 'Australia', value: 'Australia' },
  ]

  return (
    <div className="bg-white min-h-[75vh] py-10 md:py-14">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-[26px] md:text-[30px] font-bold text-ink tracking-tight mb-8 uppercase">
          {currentStep === 3 ? 'CONFIRMATION' : 'SHIPPING AND CHECKOUT'}
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

            {/* Step 2 - Active */}
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
              {/* Active Dark Indicator Underline for Step 2 */}
              {currentStep === 2 && (
                <div className="absolute left-0 bottom-[-17px] w-full h-[2.5px] bg-ink" />
              )}
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
              {currentStep === 3 && (
                <div className="absolute left-0 bottom-[-17px] w-full h-[2.5px] bg-ink" />
              )}
            </div>
          </div>
        </div>

        {/* Step 3: Confirmation State */}
        {currentStep === 3 ? (
          <div className="max-w-[700px] mx-auto py-8 text-center">
            <div className="w-16 h-16 bg-[#ECFDF5] text-[#059669] rounded-full flex items-center justify-center mx-auto text-3xl mb-5 font-bold">
              ✓
            </div>
            <h2 className="text-[24px] font-bold text-ink mb-2">
              Thank You! Your Order Has Been Placed.
            </h2>
            <p className="text-muted text-[14.5px] mb-8 leading-relaxed">
              We have received your simulation order request. A ProGuide surgical training coordinator will review your institutional details and reach out within 2 hours with the formal proforma invoice.
            </p>

            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] p-6 text-left mb-8 space-y-3">
              <div className="font-bold text-ink text-[14px] uppercase tracking-wider pb-2 border-b border-[#E5E7EB]">
                Order Summary
              </div>
              <div className="text-[13.5px] space-y-2 text-ink">
                <div className="flex justify-between">
                  <span className="text-muted">Recipient:</span>
                  <span className="font-medium">
                    {formData.firstName} {formData.lastName || ''}
                  </span>
                </div>
                {formData.companyName && (
                  <div className="flex justify-between">
                    <span className="text-muted">Institution:</span>
                    <span className="font-medium">{formData.companyName}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted">Contact Phone:</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping Location:</span>
                  <span className="font-medium">
                    {formData.city}, {formData.province} - {formData.postcode}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E5E7EB] font-bold text-[15px]">
                  <span>Total Amount (incl. 18% GST):</span>
                  <span>{formatPrice(computedTotal)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/products"
                onClick={() => clearCart()}
                className="bg-[#4A148C] hover:bg-[#3B0D70] text-white px-7 py-3 rounded-[3px] font-bold text-[13px] uppercase tracking-wider transition-all"
              >
                Back to Products
              </Link>
              <Link
                href="/"
                onClick={() => clearCart()}
                className="border border-[#D1D5DB] text-ink hover:text-purple hover:border-purple px-7 py-3 rounded-[3px] font-bold text-[13px] uppercase tracking-wider transition-all"
              >
                Return Home
              </Link>
            </div>
          </div>
        ) : (
          /* Step 2: Main Shipping & Checkout Form Grid */
          <form onSubmit={handlePlaceOrder}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Section: Billing Details (lg:col-span-8) */}
              <div className="lg:col-span-8 space-y-4">
                <h2 className="text-[13px] font-bold text-ink uppercase tracking-wider mb-5">
                  BILLING DETAILS
                </h2>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingField
                    label="First Name"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={(val) => setFormData({ ...formData, firstName: val })}
                  />
                  <FloatingField
                    label="Last Name"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={(val) => setFormData({ ...formData, lastName: val })}
                  />
                </div>

                {/* Company Name (optional) */}
                <FloatingField
                  label="Company Name (optional)"
                  name="companyName"
                  value={formData.companyName}
                  onChange={(val) => setFormData({ ...formData, companyName: val })}
                />

                {/* Country / Region * Select */}
                <FloatingField
                  label="Country / Region *"
                  name="country"
                  isSelect
                  selectOptions={countryOptions}
                  value={formData.country}
                  onChange={(val) => setFormData({ ...formData, country: val })}
                />

                {/* Street Address 1 */}
                <FloatingField
                  label="Street Address *"
                  name="streetAddress1"
                  required
                  value={formData.streetAddress1}
                  onChange={(val) => setFormData({ ...formData, streetAddress1: val })}
                />

                {/* Street Address 2 (no default placeholder, reveals label on focus) */}
                <FloatingField
                  label="Apartment, suite, unit, etc. (optional)"
                  name="streetAddress2"
                  placeholder=""
                  value={formData.streetAddress2}
                  onChange={(val) => setFormData({ ...formData, streetAddress2: val })}
                />

                {/* Town / City * */}
                <FloatingField
                  label="Town / City *"
                  name="city"
                  required
                  value={formData.city}
                  onChange={(val) => setFormData({ ...formData, city: val })}
                />

                {/* Postcode / ZIP * */}
                <FloatingField
                  label="Postcode / ZIP *"
                  name="postcode"
                  required
                  value={formData.postcode}
                  onChange={(val) => setFormData({ ...formData, postcode: val })}
                />

                {/* Province * */}
                <FloatingField
                  label="Province *"
                  name="province"
                  required
                  value={formData.province}
                  onChange={(val) => setFormData({ ...formData, province: val })}
                />

                {/* Phone * */}
                <FloatingField
                  label="Phone *"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(val) => setFormData({ ...formData, phone: val })}
                />

                {/* Your Mail */}
                <FloatingField
                  label="Your Mail"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(val) => setFormData({ ...formData, email: val })}
                />

                {/* Order Notes (optional) */}
                <FloatingField
                  label="Order Notes (optional)"
                  name="orderNotes"
                  isTextarea
                  rows={5}
                  value={formData.orderNotes}
                  onChange={(val) => setFormData({ ...formData, orderNotes: val })}
                />
              </div>

              {/* Right Section: YOUR ORDER (lg:col-span-4) */}
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
                    {displayItems.map((item, idx) => {
                      const itemSubtotal = item.price * (item.quantity || 1)
                      return (
                        <div
                          key={item.id || idx}
                          className="flex items-center justify-between py-3 text-[13px]"
                        >
                          <span className="text-[#4B5563] pr-2">
                            {item.name}
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
                        {formatPrice(computedSubtotal)}
                      </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex items-center justify-between py-2 border-b border-[#E5E7EB]">
                      <span className="font-bold text-[#1F2328] uppercase tracking-wide">
                        SHIPPING
                      </span>
                      <span className="text-[#1F2328] font-normal">
                        Free shipping
                      </span>
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
                  Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
                  <Link href="/privacy-policy" className="text-[#5E007B] hover:underline font-medium">
                    privacy policy
                  </Link>
                  .
                </p>

                {/* PLACE ORDER Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5E007B] hover:bg-[#430D60] active:scale-[0.99] text-white py-3.5 px-6 rounded-[3px] font-bold text-[13px] uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default CheckoutView
