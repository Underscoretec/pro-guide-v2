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
  onBlur?: () => void
  error?: string
  type?: string
  required?: boolean
  isTextarea?: boolean
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
  onBlur,
  error,
  type = 'text',
  required = false,
  isTextarea = false,
  rows = 5,
  className = '',
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = Boolean(value && value.trim().length > 0)
  const isFloating = isFocused || hasValue || Boolean(error)

  const displayPlaceholder = !isFloating
    ? placeholder !== undefined
      ? placeholder
      : label
    : ''

  const borderClass = isFocused
    ? 'border-2 border-[#5E007B]'
    : error
    ? 'border-2 border-[#DC2626]'
    : 'border border-[#E5E7EB] hover:border-[#D1D5DB]'

  const labelColorClass = isFocused
    ? 'text-[#5E007B]'
    : error
    ? 'text-[#DC2626]'
    : 'text-[#6B7280]'

  return (
    <div className={className}>
      <div
        className={`relative rounded-[2px] transition-all duration-150 ${borderClass} ${
          isTextarea ? 'p-3.5 min-h-[130px]' : 'h-[46px] flex items-center px-3.5'
        }`}
      >
        {/* Floating Label */}
        {isFloating && (
          <label
            htmlFor={id || name}
            className={`absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium leading-none pointer-events-none transition-colors duration-150 select-none z-10 ${labelColorClass}`}
          >
            {label}
          </label>
        )}

        {isTextarea ? (
          <textarea
            id={id || name}
            name={name}
            rows={rows}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false)
              onBlur?.()
            }}
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
            onBlur={() => {
              setIsFocused(false)
              onBlur?.()
            }}
            onChange={(e) => onChange(e.target.value)}
            placeholder={displayPlaceholder}
            className="w-full h-full bg-transparent border-none text-[13.5px] text-ink placeholder-[#9CA3AF] focus:outline-none"
          />
        )}
      </div>

      {/* Validation Error Message */}
      {error && (
        <p className="text-[11px] text-[#DC2626] mt-1 pl-1 font-medium flex items-center gap-1">
          <span>&times;</span> {error}
        </p>
      )}
    </div>
  )
}

export const CheckoutView: React.FC = () => {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()

  const [currentStep, setCurrentStep] = useState<2 | 3>(2)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | number | null>(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    postcode: '',
    province: '',
    phone: '',
    email: '',
    orderNotes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Validate individual field
  const validateField = (fieldName: string, value: string): string => {
    switch (fieldName) {
      case 'firstName':
        if (!value.trim()) return 'First name is required'
        return ''
      case 'lastName':
        if (!value.trim()) return 'Last name is required'
        return ''
      case 'country':
        if (!value.trim()) return 'Country is required'
        return ''
      case 'streetAddress1':
        if (!value.trim()) return 'Street address is required'
        return ''
      case 'city':
        if (!value.trim()) return 'Town / City is required'
        return ''
      case 'postcode':
        if (!value.trim()) return 'Postcode / PIN / ZIP is required'
        if (!/^[a-zA-Z0-9\s-]{3,10}$/.test(value.trim())) {
          return 'Enter a valid postcode (e.g. 400059)'
        }
        return ''
      case 'province':
        if (!value.trim()) return 'Province / State is required'
        return ''
      case 'phone':
        if (!value.trim()) return 'Phone number is required'
        if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/.test(value.trim())) {
          return 'Enter a valid phone number (min 10 digits)'
        }
        return ''
      case 'email':
        if (!value.trim()) return 'Email address is required'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Enter a valid email address'
        }
        return ''
      default:
        return ''
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (touched[field]) {
      const err = validateField(field, value)
      setErrors((prev) => ({ ...prev, [field]: err }))
    }
  }

  const handleFieldBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const err = validateField(field, formData[field as keyof typeof formData] || '')
    setErrors((prev) => ({ ...prev, [field]: err }))
  }

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {}
    const requiredFields = [
      'firstName',
      'lastName',
      'country',
      'streetAddress1',
      'city',
      'postcode',
      'province',
      'phone',
      'email',
    ]

    requiredFields.forEach((field) => {
      const val = formData[field as keyof typeof formData] || ''
      const err = validateField(field, val)
      if (err) newErrors[field] = err
    })

    setErrors(newErrors)
    setTouched(
      requiredFields.reduce((acc, f) => ({ ...acc, [f]: true }), {})
    )

    return Object.keys(newErrors).length === 0
  }

  // Display items: use active cart items or screenshot defaults
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

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)

    const isValid = validateAll()
    if (!isValid) {
      // Scroll to first error
      const firstErrorField = document.querySelector('[name="' + Object.keys(errors)[0] + '"]')
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/checkout-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          companyName: formData.companyName.trim(),
          country: formData.country.trim(),
          streetAddress1: formData.streetAddress1.trim(),
          streetAddress2: formData.streetAddress2.trim(),
          city: formData.city.trim(),
          postcode: formData.postcode.trim(),
          province: formData.province.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          orderNotes: formData.orderNotes.trim(),
          items: displayItems.map((item) => ({
            name: item.name,
            quantity: item.quantity || 1,
            price: item.price || 20000,
            subtotal: (item.price || 20000) * (item.quantity || 1),
          })),
          subtotal: computedSubtotal,
          shipping: 'Free shipping',
          gst: computedGst,
          total: computedTotal,
          status: 'Pending',
        }),
      })

      const result = await response.json()

      if (response.ok && (result.doc || result.id)) {
        const orderId = result.doc?.id || result.id
        setConfirmedOrderId(orderId)
        clearCart()
        setCurrentStep(3)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const errMsg =
          result.errors?.[0]?.message ||
          result.message ||
          'Failed to submit form to Payload. Please check the fields and try again.'
        setSubmitError(errMsg)
      }
    } catch (err: any) {
      console.error('Order submission error:', err)
      setSubmitError('Network error while placing order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }


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
          <div className="max-w-[720px] mx-auto py-8 text-center animate-in fade-in duration-200">
            <div className="w-16 h-16 bg-[#ECFDF5] text-[#059669] rounded-full flex items-center justify-center mx-auto text-3xl mb-5 font-bold">
              ✓
            </div>
            <h2 className="text-[24px] font-bold text-ink mb-2">
              Thank You! Your Order Has Been Placed.
            </h2>
            <p className="text-muted text-[14.5px] mb-8 leading-relaxed">
              Your shipping address and order details have been saved to the administrative database
              {confirmedOrderId ? ` (Order ID: #${confirmedOrderId})` : ''}. Our simulation coordinator will review your request and reach out within 2 hours with the formal proforma invoice and dispatch tracking.
            </p>

            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-[6px] p-6 text-left mb-8 space-y-3 shadow-xs">
              <div className="font-bold text-ink text-[13.5px] uppercase tracking-wider pb-2 border-b border-[#E5E7EB] flex items-center justify-between">
                <span>Saved Shipping Details</span>
                {confirmedOrderId && (
                  <span className="text-purple text-[12px]">Ref: #{confirmedOrderId}</span>
                )}
              </div>
              <div className="text-[13.5px] space-y-2 text-ink">
                <div className="flex justify-between">
                  <span className="text-muted">Customer Name:</span>
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
                  <span className="text-muted">Phone Number:</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Email:</span>
                  <span className="font-medium">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Delivery Address:</span>
                  <span className="font-medium text-right max-w-[340px]">
                    {formData.streetAddress1}
                    {formData.streetAddress2 ? `, ${formData.streetAddress2}` : ''},{' '}
                    {formData.city}, {formData.province} - {formData.postcode}, {formData.country}
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
                className="bg-[#5E007B] hover:bg-[#430D60] text-white px-7 py-3 rounded-[3px] font-bold text-[13px] uppercase tracking-wider transition-all"
              >
                Order More Models
              </Link>
              <Link
                href="/"
                className="border border-[#D1D5DB] text-ink hover:text-purple hover:border-purple px-7 py-3 rounded-[3px] font-bold text-[13px] uppercase tracking-wider transition-all"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          /* Step 2: Main Shipping & Checkout Form Grid */
          <form onSubmit={handlePlaceOrder} noValidate>
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Section: Billing Details (lg:col-span-8) */}
              <div className="lg:col-span-8 space-y-4">
                <h2 className="text-[13px] font-bold text-ink uppercase tracking-wider mb-5">
                  BILLING DETAILS
                </h2>

                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingField
                    label="First Name *"
                    name="firstName"
                    required
                    value={formData.firstName}
                    error={touched.firstName ? errors.firstName : undefined}
                    onChange={(val) => handleFieldChange('firstName', val)}
                    onBlur={() => handleFieldBlur('firstName')}
                  />
                  <FloatingField
                    label="Last Name *"
                    name="lastName"
                    required
                    value={formData.lastName}
                    error={touched.lastName ? errors.lastName : undefined}
                    onChange={(val) => handleFieldChange('lastName', val)}
                    onBlur={() => handleFieldBlur('lastName')}
                  />
                </div>

                {/* Company Name (optional) */}
                <FloatingField
                  label="Company Name (optional)"
                  name="companyName"
                  value={formData.companyName}
                  onChange={(val) => handleFieldChange('companyName', val)}
                />

                {/* Country / Region * */}
                <FloatingField
                  label="Country / Region *"
                  name="country"
                  required
                  value={formData.country}
                  error={touched.country ? errors.country : undefined}
                  onChange={(val) => handleFieldChange('country', val)}
                  onBlur={() => handleFieldBlur('country')}
                />

                {/* Street Address 1 */}
                <FloatingField
                  label="Street Address *"
                  name="streetAddress1"
                  required
                  value={formData.streetAddress1}
                  error={touched.streetAddress1 ? errors.streetAddress1 : undefined}
                  onChange={(val) => handleFieldChange('streetAddress1', val)}
                  onBlur={() => handleFieldBlur('streetAddress1')}
                />

                {/* Street Address 2 */}
                <FloatingField
                  label="Apartment, suite, unit, etc. (optional)"
                  name="streetAddress2"
                  value={formData.streetAddress2}
                  onChange={(val) => handleFieldChange('streetAddress2', val)}
                />

                {/* Town / City * */}
                <FloatingField
                  label="Town / City *"
                  name="city"
                  required
                  value={formData.city}
                  error={touched.city ? errors.city : undefined}
                  onChange={(val) => handleFieldChange('city', val)}
                  onBlur={() => handleFieldBlur('city')}
                />

                {/* Postcode / ZIP * */}
                <FloatingField
                  label="Postcode / ZIP *"
                  name="postcode"
                  required
                  value={formData.postcode}
                  error={touched.postcode ? errors.postcode : undefined}
                  onChange={(val) => handleFieldChange('postcode', val)}
                  onBlur={() => handleFieldBlur('postcode')}
                />

                {/* Province * */}
                <FloatingField
                  label="Province *"
                  name="province"
                  required
                  value={formData.province}
                  error={touched.province ? errors.province : undefined}
                  onChange={(val) => handleFieldChange('province', val)}
                  onBlur={() => handleFieldBlur('province')}
                />

                {/* Phone * */}
                <FloatingField
                  label="Phone *"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  error={touched.phone ? errors.phone : undefined}
                  onChange={(val) => handleFieldChange('phone', val)}
                  onBlur={() => handleFieldBlur('phone')}
                />

                {/* Your Mail * */}
                <FloatingField
                  label="Your Mail *"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  error={touched.email ? errors.email : undefined}
                  onChange={(val) => handleFieldChange('email', val)}
                  onBlur={() => handleFieldBlur('email')}
                />

                {/* Order Notes (optional) */}
                <FloatingField
                  label="Order Notes (optional)"
                  name="orderNotes"
                  isTextarea
                  rows={5}
                  value={formData.orderNotes}
                  onChange={(val) => handleFieldChange('orderNotes', val)}
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
                  className="w-full bg-[#5E007B] hover:bg-[#430D60] active:scale-[0.99] text-white py-3.5 px-6 rounded-[3px] font-bold text-[13px] uppercase tracking-wider transition-all shadow-sm cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>SUBMITTING ORDER...</span>
                    </>
                  ) : (
                    'PLACE ORDER'
                  )}
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
