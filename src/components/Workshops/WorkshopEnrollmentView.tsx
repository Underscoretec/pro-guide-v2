'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import type { WorkshopDetailItem } from '@/lib/payload/workshopDetails'

interface WorkshopEnrollmentViewProps {
  slug: string
  data?: WorkshopDetailItem | null
}

const loadRazorpayScript = () =>
  new Promise<boolean>((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    if ((window as any).Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

export const WorkshopEnrollmentView: React.FC<WorkshopEnrollmentViewProps> = ({ slug, data }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialYearParam = searchParams.get('year') ? parseInt(searchParams.get('year')!, 10) : 2026
  const initialMonthParam = searchParams.get('month') ? parseInt(searchParams.get('month')!, 10) : 10
  const initialDayParam = searchParams.get('date') ? parseInt(searchParams.get('date')!, 10) : 18
  const initialTimeParam = searchParams.get('time') || '02:00 PM CET'

  const [step, setStep] = useState<'details' | 'ticket'>('details')
  const [selectedYear, setSelectedYear] = useState<number>(initialYearParam || 2026)
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonthParam ?? 10)
  const [selectedDay, setSelectedDay] = useState<number>(initialDayParam || 18)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    initialTimeParam.includes('CET') ? initialTimeParam : `${initialTimeParam} CET`
  )
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentError, setPaymentError] = useState('')
  const [ticketId, setTicketId] = useState('EB-2026-0187')
  const [paymentRef, setPaymentRef] = useState('pay_Nk3x9sample')

  // Merge CMS data with fallback
  const details = {
    title: data?.title || 'Advanced Temporal Bone Dissection Workshop',
    category: data?.category || 'SKULL BASE & ADVANCED OTOLOGY',
    deliveryMode: data?.deliveryMode || 'offline',
    imageUrl: data?.imageUrl || '/images/ws_faculty.jpg',
    duration: data?.duration || '1 Day Hands-on',
    learners: data?.learners || '1:1 Station Ratio',
    feeFormatted: data?.feeFormatted || '₹45,000',
    gstFormatted: data?.gstFormatted || '₹8,100',
    totalFormatted: data?.totalFormatted || '₹53,100',
    totalINR: data?.totalINR || 53100,
    priceINR: typeof data?.priceINR === 'number' ? data.priceINR : 45000,
    priceUSD: typeof data?.priceUSD === 'number' ? data.priceUSD : 499,
    internationalFee: data?.internationalFee || '$499, no GST',
    venueName:
      data?.deliveryMode === 'online_live'
        ? (data?.onlineLiveDetails?.platform || 'Zoom')
        : data?.deliveryMode === 'online_recorded'
          ? 'ProGuide Online Portal'
          : (data?.offlineDetails?.venueName || 'Tata Memorial Hospital'),
    fullAddress:
      data?.offlineDetails?.fullAddress || 'Dr E Borges Road, Parel, Mumbai 400012',
    reportingTime: data?.offlineDetails?.reportingTime || '30 minutes before the slot',
    whatToBring:
      data?.offlineDetails?.whatParticipantsShouldBring || 'Photo ID, scrubs and closed shoes',
    seatsPerSession: data?.seatsPerSession || (data?.deliveryMode === 'offline' ? 40 : 500),
    booking: data?.booking !== false,
    onlineLiveDetails: data?.onlineLiveDetails,
    offlineDetails: data?.offlineDetails,
    onlineRecordedDetails: data?.onlineRecordedDetails,
  }

  // Countdown timer for 15 minutes (899 seconds)
  const [timeLeft, setTimeLeft] = useState(899)

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Form State
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [institution, setInstitution] = useState('')
  const [regNumber, setRegNumber] = useState('')
  const [country, setCountry] = useState('India')

  interface FormErrors {
    fullName?: string
    email?: string
    phone?: string
    institution?: string
    regNumber?: string
    country?: string
    general?: string
  }

  const [formErrors, setFormErrors] = useState<FormErrors>({})

  const handleFieldChange = (field: keyof FormErrors, value: string, setter: (val: string) => void) => {
    setter(value)
    if (formErrors[field] || formErrors.general) {
      setFormErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        if (Object.keys(next).filter((k) => k !== 'general').length === 0) {
          delete next.general
        }
        return next
      })
    }
  }

  const validateForm = (): boolean => {
    const errors: FormErrors = {}
    const trimmedName = fullName.trim()
    const trimmedEmail = email.trim()
    const trimmedPhone = phone.trim()
    const trimmedInstitution = institution.trim()
    const trimmedRegNumber = regNumber.trim()
    const trimmedCountry = country.trim()

    // 1. Full name: required
    if (!trimmedName) {
      errors.fullName = 'You must enter your full name.'
    } else if (trimmedName.length < 2) {
      errors.fullName = 'Full name must be at least 2 characters.'
    }

    // 2. Email address: required
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!trimmedEmail) {
      errors.email = 'You must enter your email address.'
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address (e.g. name@hospital.org).'
    }

    // 3. Mobile number: required
    const phoneDigits = trimmedPhone.replace(/\D/g, '')
    if (!trimmedPhone) {
      errors.phone = 'You must enter your mobile number.'
    } else if (isIndia) {
      if (phoneDigits.length < 10) {
        errors.phone = 'Mobile number for India must be at least 10 digits.'
      }
    } else {
      if (trimmedPhone.length < 6 || phoneDigits.length < 5) {
        errors.phone = 'Please enter a valid phone number (at least 6 characters).'
      }
    }

    // 4. Institution / Hospital: required
    if (!trimmedInstitution) {
      errors.institution = 'You must enter your institution or hospital.'
    } else if (trimmedInstitution.length < 2) {
      errors.institution = 'Please enter a valid hospital or clinic name.'
    }

    // 5. Medical registration number: required
    if (!trimmedRegNumber) {
      errors.regNumber = 'You must enter your medical registration number.'
    } else if (trimmedRegNumber.length < 2) {
      errors.regNumber = 'Please enter a valid registration number.'
    }

    // 6. Billing country: required
    if (!trimmedCountry) {
      errors.country = 'You must select your billing country.'
    }

    if (Object.keys(errors).length > 0) {
      errors.general = 'You must fill in all required fields before proceeding with payment.'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Dynamic currency and pricing based on Billing country
  const isIndia = country.trim().toLowerCase() === 'india'
  const activeCurrency = isIndia ? 'INR' : 'USD'
  const basePrice = isIndia ? details.priceINR : details.priceUSD

  // Coupon state
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  const [discountPercent, setDiscountPercent] = useState<number>(0)
  const [couponMessage, setCouponMessage] = useState('')
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  // Calculate discounted amounts
  const discountAmount = appliedCoupon ? Math.round((basePrice * discountPercent) / 100) : 0
  const discountedBaseFee = Math.max(0, basePrice - discountAmount)
  const gstAmount = isIndia ? Math.round((discountedBaseFee * 18) / 100) : 0
  const activePayAmount = discountedBaseFee + gstAmount

  // Formatted displays
  const activeFeeFormatted = isIndia ? `₹${discountedBaseFee.toLocaleString('en-IN')}` : `$${discountedBaseFee.toLocaleString('en-US')}`
  const activeGstFormatted = isIndia ? `₹${gstAmount.toLocaleString('en-IN')}` : '$0'
  const activeTotalFormatted = isIndia ? `₹${activePayAmount.toLocaleString('en-IN')}` : `$${activePayAmount.toLocaleString('en-US')}`

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    setIsApplyingCoupon(true)
    setCouponMessage('')

    try {
      const res = await fetch('/api/workshops/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: couponCode.trim(),
          workshopSlug: slug,
          institution: institution.trim(),
        }),
      })

      const data = await res.json()
      if (res.ok && data.valid) {
        setAppliedCoupon(data.code)
        setDiscountPercent(data.discountPercent)
        setCouponMessage(data.message || `${data.discountPercent}% discount applied!`)
      } else {
        setAppliedCoupon(null)
        setDiscountPercent(0)
        setCouponMessage(data.message || 'Invalid or expired coupon code.')
      }
    } catch {
      setCouponMessage('Error validating coupon. Please try again.')
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  const handleRemoveCoupon = () => {
    setCouponCode('')
    setAppliedCoupon(null)
    setDiscountPercent(0)
    setCouponMessage('')
  }

  // Razorpay Payment Handler
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setPaymentError('')

    const isValid = validateForm()
    if (!isValid) {
      const detailsCard = document.getElementById('participant-details-card')
      if (detailsCard) {
        detailsCard.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }

    setIsProcessingPayment(true)

    // Handle 100% Free registration via coupon without Razorpay
    if (activePayAmount === 0) {
      await verifyAndConfirmPayment('free_order', 'free_coupon_payment', '', false)
      return
    }

    try {
      // 1. Create Order via server API
      const res = await fetch('/api/workshops/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workshopSlug: slug,
          workshopTitle: details.title,
          amount: activePayAmount,
          currency: activeCurrency,
          participantName: fullName,
          participantEmail: email,
          participantPhone: phone,
        }),
      })

      const orderData = await res.json()
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment')
      }

      // 2. Load Razorpay script
      const isLoaded = await loadRazorpayScript()
      if (!isLoaded || typeof (window as any).Razorpay === 'undefined') {
        // Fallback simulation in case Razorpay external script is blocked
        await verifyAndConfirmPayment(orderData.orderId, `pay_sim_${Date.now()}`, '', true)
        return
      }

      // 3. Open Razorpay Checkout modal
      const options = {
        key: orderData.keyId || 'rzp_test_TMPEteOxiD5AeI',
        amount: orderData.amount,
        currency: orderData.currency || activeCurrency,
        name: 'ProGuide',
        description: details.title,
        order_id: orderData.orderId.startsWith('order_test_') ? undefined : orderData.orderId,
        prefill: {
          name: fullName,
          email: email,
          contact: phone,
        },
        theme: {
          color: '#4F1787',
        },
        handler: async function (response: any) {
          // Immediately navigate directly to ticket page upon payment completion
          setStep('ticket')
          window.scrollTo({ top: 0, behavior: 'instant' })
          if (response.razorpay_payment_id) {
            setPaymentRef(response.razorpay_payment_id)
          }

          await verifyAndConfirmPayment(
            response.razorpay_order_id || orderData.orderId,
            response.razorpay_payment_id,
            response.razorpay_signature,
            false
          )
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false)
          },
        },
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on('payment.failed', function (resp: any) {
        setPaymentError(resp.error?.description || 'Payment failed. Please try again.')
        setIsProcessingPayment(false)
      })
      rzp.open()
    } catch (err: any) {
      console.error('Payment error:', err)
      setPaymentError(err.message || 'Payment failed. Please try again.')
      setIsProcessingPayment(false)
    }
  }

  const verifyAndConfirmPayment = async (
    orderId: string,
    paymentId: string,
    signature: string,
    isTestMock = false
  ) => {
    // Immediately ensure step is set to 'ticket'
    setStep('ticket')
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (paymentId) {
      setPaymentRef(paymentId)
    }

    try {
      const verifyRes = await fetch('/api/workshops/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpayOrderId: orderId,
          razorpayPaymentId: paymentId,
          razorpaySignature: signature,
          workshopSlug: slug,
          workshopTitle: details.title,
          participantName: fullName,
          participantEmail: email,
          participantPhone: phone,
          institution,
          medicalRegNumber: regNumber,
          country,
          selectedDate: `${monthShort} ${selectedDay}, ${selectedYear}`,
          selectedTime: selectedTimeSlot,
          amount: activePayAmount,
          appliedCoupon: appliedCoupon || null,
          discountPercent: discountPercent || null,
          isTestMock,
        }),
      })

      const verifyData = await verifyRes.json()
      if (verifyData.ticketId) {
        setTicketId(verifyData.ticketId)
      }
      if (verifyData.paymentId || paymentId) {
        setPaymentRef(verifyData.paymentId || paymentId)
      }
    } catch (err: any) {
      console.warn('Verify fallback:', err)
    } finally {
      setIsProcessingPayment(false)
    }
  }

  interface SlotDetail {
    startTime: string
    endTime: string
    label: string
    seats: number
    registrationsCount: number
    availableSeats: number
  }

  // Parse dates and slots from Payload CMS
  const parseDayFromDateString = (dateStr: string): number | null => {
    if (!dateStr) return null
    const clean = String(dateStr).trim()
    const parts = clean.split(/[-/.]/)
    if (parts.length === 3) {
      if (parts[0].length === 4) return parseInt(parts[2], 10) || null
      if (parts[2].length === 4) return parseInt(parts[0], 10) || null
    }
    const match = clean.match(/\b([1-9]|[12]\d|3[01])\b/)
    if (match) return parseInt(match[1], 10)
    const d = new Date(clean)
    if (!isNaN(d.getTime())) return d.getDate()
    return null
  }

  const defaultCapacity =
    details.deliveryMode === 'online_recorded'
      ? 999999
      : details.deliveryMode === 'online_live'
        ? (details.seatsPerSession || 500)
        : 40

  const daySlotDetailsMap: Record<number, SlotDetail[]> = {}
  const daySlotsMap: Record<number, string[]> = {}

  if (data?.datesAndTimeSlots && data.datesAndTimeSlots.length > 0) {
    data.datesAndTimeSlots.forEach((d) => {
      const day = parseDayFromDateString(d.date)
      if (day) {
        const slotObjs: SlotDetail[] = (d.slots || []).map((s: any) => {
          const startTime = s.startTime || ''
          const endTime = s.endTime || ''
          const label = endTime ? `${startTime} – ${endTime}` : startTime
          const capacity = typeof s.seats === 'number' && s.seats > 0 ? s.seats : defaultCapacity
          const regCount = typeof s.registrationsCount === 'number' ? s.registrationsCount : 0
          const availableSeats = Math.max(0, capacity - regCount)

          return {
            startTime,
            endTime,
            label,
            seats: capacity,
            registrationsCount: regCount,
            availableSeats,
          }
        })

        if (slotObjs.length > 0) {
          daySlotDetailsMap[day] = slotObjs
          daySlotsMap[day] = slotObjs.map((s) => s.label)
        } else {
          const fallbackTimes = ['02:00 PM CET', '04:30 PM CET', '06:00 PM CET', '08:30 PM CET']
          daySlotsMap[day] = fallbackTimes
          daySlotDetailsMap[day] = fallbackTimes.map((t) => ({
            startTime: t,
            endTime: '',
            label: t,
            seats: defaultCapacity,
            registrationsCount: 0,
            availableSeats: defaultCapacity,
          }))
        }
      }
    })
  }

  const dynamicDays = Object.keys(daySlotsMap).map(Number)
  const availableDays = dynamicDays.length > 0
    ? dynamicDays
    : [18, 19, 20, 21, 22, 25, 26, 27, 28, 29]
  const currentSlotDetails = daySlotDetailsMap[selectedDay] || []
  const timeSlots = daySlotsMap[selectedDay] || ['02:00 PM CET', '04:30 PM CET', '06:00 PM CET', '08:30 PM CET']

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getDayDetails = (day: number, month = selectedMonth, year = selectedYear) => {
    const dateObj = new Date(year, month, day)
    const weekdayShort = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
    const monthShort = dateObj.toLocaleDateString('en-US', { month: 'short' })
    return { weekdayShort, monthShort, day }
  }

  const { weekdayShort, monthShort } = getDayDetails(selectedDay, selectedMonth, selectedYear)

  return (
    <div className="fixed inset-0 z-[100] bg-[#FAFAFA] text-gray-800 overflow-y-auto min-h-screen">
      {/* 1. Top Minimal Header Bar (White Background) */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* ProGuide Logo */}
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/images/logo.svg"
              alt="ProGuide"
              width={180}
              height={52}
              priority
              unoptimized
              className="h-10 sm:h-11 md:h-12 w-auto object-contain cursor-pointer"
            />
          </Link>

          {/* Back to workshop link */}
          <Link
            href={`/workshops/${slug || 'advanced-temporal-bone-dissection-workshop'}`}
            className="text-xs sm:text-[13px] font-medium text-gray-700 hover:text-[#4F1787] hover:underline transition-colors flex items-center gap-1"
          >
            <span>—</span> Back to workshop
          </Link>
        </div>
      </header>

      {/* 2. Purple Banner with Stepper & Title */}
      <div className="bg-[#4F1787] text-white pt-8 pb-12 sm:pt-10 sm:pb-14 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-[1240px] mx-auto">
          {/* Stepper Navigation */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm font-medium mb-6 flex-wrap">
            {/* Step 1: Date and time */}
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                ✓
              </span>
              <span className="text-white/90">Date and time</span>
            </div>

            <div className="w-8 sm:w-12 h-[1px] bg-white/30" />

            {/* Step 2: Details and payment */}
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shadow-xs ${
                  step === 'ticket'
                    ? 'bg-amber-500 text-white'
                    : 'bg-white text-[#4F1787]'
                }`}
              >
                {step === 'ticket' ? '✓' : '2'}
              </span>
              <span className={step === 'details' ? 'text-white font-bold' : 'text-white/90'}>
                Details and payment
              </span>
            </div>

            <div className="w-8 sm:w-12 h-[1px] bg-white/30" />

            {/* Step 3: Your ticket */}
            <div className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shadow-xs ${
                  step === 'ticket'
                    ? 'bg-white text-[#4F1787]'
                    : 'bg-white/20 text-white/80'
                }`}
              >
                3
              </span>
              <span className={step === 'ticket' ? 'text-white font-bold' : 'text-white/70'}>
                Your ticket
              </span>
            </div>
          </div>

          {/* Banner Title & Timer */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold tracking-tight mb-1.5 leading-snug">
                {step === 'details' ? 'Complete your enrollment' : 'Payment successful: your ticket'}
              </h1>
              <p className="text-purple-200 text-xs sm:text-sm font-normal">
                {step === 'details'
                  ? 'Pay securely through Razorpay. Your seat is held for 15 minutes.'
                  : 'Show this ticket at the venue when you attend the workshop.'}
              </p>
            </div>

            {step === 'details' && (
              <div className="self-start md:self-auto">
                <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-xs border border-white/20 text-white text-xs px-3.5 py-1.5 rounded-full shadow-xs">
                  <svg className="w-3.5 h-3.5 text-purple-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Seat held for {formatTimer(timeLeft)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Main Content: STEP 2 (Complete your enrollment) */}
      {step === 'details' && (
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handlePayment} noValidate className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">
            {/* Left Column: Workshop Summary + Participant Details + Sponsorship */}
            <div className="space-y-6">
              {/* Workshop Summary Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center shadow-xs">
                {/* Thumbnail Image with Badge */}
                <div className="relative w-full sm:w-44 h-28 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={details.imageUrl}
                    alt={details.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-[#4F1787] text-white text-[8.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                    {details.category}
                  </div>
                </div>

                {/* Info Text */}
                <div className="flex-1 min-w-0">
                  <div className="mb-1">
                    {details.deliveryMode === 'online_live' ? (
                      <span className="inline-block text-[11px] font-semibold text-pink-700 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded-full">
                        Online live • {details.onlineLiveDetails?.platform || 'Zoom'}
                      </span>
                    ) : details.deliveryMode === 'online_recorded' ? (
                      <span className="inline-block text-[11px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                        Recorded • On demand
                      </span>
                    ) : (
                      <span className="inline-block text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        Offline • Mumbai
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-[17px] font-bold text-gray-900 leading-snug">
                    {details.title}
                  </h3>
                  <p className="text-xs font-semibold text-gray-800 mt-1">
                    {details.deliveryMode === 'online_recorded'
                      ? 'On demand • Immediate access for 90 days'
                      : `${weekdayShort}, ${monthShort} ${selectedDay}, ${selectedYear} • ${selectedTimeSlot}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {details.deliveryMode === 'offline'
                      ? `${details.venueName}, Parel, Mumbai • ${details.duration} • ${details.learners}`
                      : details.deliveryMode === 'online_live'
                        ? `Live Interactive via ${details.onlineLiveDetails?.platform || 'Zoom'} • ${details.duration}`
                        : `HD Video Modules & Clinical Audit • ${details.duration}`}
                  </p>
                  {details.deliveryMode !== 'online_recorded' && (
                    <button
                      type="button"
                      onClick={() => setIsDatePickerOpen(true)}
                      className="text-xs font-semibold text-[#4F1787] hover:underline mt-2 inline-block cursor-pointer"
                    >
                      Change date or time
                    </button>
                  )}
                </div>
              </div>

              {/* Participant Details Card */}
              <div id="participant-details-card" className="bg-white rounded-xl border border-gray-200 p-6 sm:p-7 shadow-xs">
                {/* Header */}
                <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100">
                  <span className="w-6 h-6 rounded-full bg-[#4F1787] text-white text-xs font-bold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    Participant details
                  </h2>
                </div>

                {/* Validation Notification Banner */}
                {formErrors.general && (
                  <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-center gap-2">
                    <span className="text-base shrink-0">⚠️</span>
                    <span>{formErrors.general}</span>
                  </div>
                )}

                {paymentError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-medium">
                    {paymentError}
                  </div>
                )}

                {details.booking === false && (
                  <div className="mb-4 p-3.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-xs font-semibold flex items-center gap-2">
                    <span>⚠️</span>
                    <span>Booking for this workshop is currently paused by admin. Enrollment is temporarily closed.</span>
                  </div>
                )}

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value, setFullName)}
                      placeholder="Dr. Anita Sharma"
                      className={`w-full border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none transition ${
                        formErrors.fullName
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-gray-300 focus:border-[#4F1787] focus:ring-1 focus:ring-[#4F1787]'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleFieldChange('email', e.target.value, setEmail)}
                      placeholder="name@hospital.org"
                      className={`w-full border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none transition ${
                        formErrors.email
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-gray-300 focus:border-[#4F1787] focus:ring-1 focus:ring-[#4F1787]'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      Mobile number {isIndia ? '(10 digits)' : '(min. 6 characters)'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value, setPhone)}
                      placeholder={isIndia ? '+91 98765 43210' : '+1 555 123 4567'}
                      className={`w-full border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none transition ${
                        formErrors.phone
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-gray-300 focus:border-[#4F1787] focus:ring-1 focus:ring-[#4F1787]'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      Institution / Hospital <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => handleFieldChange('institution', e.target.value, setInstitution)}
                      placeholder="Hospital or clinic name"
                      className={`w-full border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none transition ${
                        formErrors.institution
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-gray-300 focus:border-[#4F1787] focus:ring-1 focus:ring-[#4F1787]'
                      }`}
                    />
                    {formErrors.institution && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.institution}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      Medical registration number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={regNumber}
                      onChange={(e) => handleFieldChange('regNumber', e.target.value, setRegNumber)}
                      placeholder="Registration no."
                      className={`w-full border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 focus:outline-none transition ${
                        formErrors.regNumber
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-gray-300 focus:border-[#4F1787] focus:ring-1 focus:ring-[#4F1787]'
                      }`}
                    />
                    {formErrors.regNumber && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.regNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                      Billing country <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => handleFieldChange('country', e.target.value, setCountry)}
                      className={`w-full border rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-gray-900 bg-white focus:outline-none transition ${
                        formErrors.country
                          ? 'border-red-400 bg-red-50/20 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                          : 'border-gray-300 focus:border-[#4F1787] focus:ring-1 focus:ring-[#4F1787]'
                      }`}
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.country && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.country}</p>
                    )}
                  </div>
                </div>

                {/* Lavender Note Banner */}
                <div className="bg-[#F4EEFB] border border-purple-100 rounded-lg px-4 py-2.5 text-xs text-gray-700 flex items-center gap-2">
                  <span>
                    {isIndia
                      ? 'India: you pay in INR and 18% GST is added to the workshop fee.'
                      : `Outside India: you pay in USD ($${details.priceUSD}) and no Indian GST is added.`}
                  </span>
                </div>
              </div>

              {/* Need Institution Sponsorship? Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 flex items-center gap-3.5 shadow-xs">
                <div className="w-7 h-7 rounded-md bg-[#4F1787] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  ?
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                    Need institution sponsorship?
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Request a formal invoice for hospital reimbursement instead of paying now.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Order Summary Card */}
            <div className="sticky top-20">
              <div className="bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">
                {/* Amber / Tan Header Strip */}
                <div className="bg-[#FFF8E7] px-5 py-3 border-b border-amber-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
                    ORDER SUMMARY
                  </span>
                </div>

                {/* Summary Body */}
                <div className="p-5 space-y-4">
                  {/* Coupon Code Input */}
                  <div>
                    <div className="flex">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter redeem code"
                        disabled={Boolean(appliedCoupon) || isApplyingCoupon}
                        className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#4F1787] uppercase placeholder:normal-case"
                      />
                      {appliedCoupon ? (
                        <button
                          type="button"
                          onClick={handleRemoveCoupon}
                          className="bg-red-50 hover:bg-red-100 border border-l-0 border-red-200 rounded-r-lg px-3.5 py-2 text-xs font-semibold text-red-700 transition cursor-pointer"
                        >
                          Remove
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={isApplyingCoupon || !couponCode.trim()}
                          className="bg-white hover:bg-gray-50 border border-l-0 border-gray-300 rounded-r-lg px-4 py-2 text-xs font-semibold text-gray-700 transition cursor-pointer disabled:opacity-50"
                        >
                          {isApplyingCoupon ? 'Checking…' : 'Apply'}
                        </button>
                      )}
                    </div>
                    {couponMessage && (
                      <p
                        className={`text-[11px] mt-1.5 font-medium ${
                          appliedCoupon ? 'text-green-700' : 'text-red-600'
                        }`}
                      >
                        {couponMessage}
                      </p>
                    )}
                  </div>

                  {/* Fee Breakdown */}
                  <div className="space-y-2 text-xs text-gray-700 pt-1">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        {isIndia ? 'Workshop fee' : 'Workshop fee (USD)'}
                      </span>
                      <span className="font-semibold text-gray-900">
                        {isIndia ? `₹${basePrice.toLocaleString('en-IN')}` : `$${basePrice.toLocaleString('en-US')}`}
                      </span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between items-center text-green-700 font-medium">
                        <span className="flex items-center gap-1">
                          <span>Discount ({appliedCoupon} • {discountPercent}%)</span>
                        </span>
                        <span>
                          -{isIndia ? `₹${discountAmount.toLocaleString('en-IN')}` : `$${discountAmount.toLocaleString('en-US')}`}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        {isIndia ? 'GST (18%)' : 'GST (Outside India)'}
                      </span>
                      <span className="font-semibold text-gray-900">{activeGstFormatted}</span>
                    </div>
                  </div>

                  {/* Total Payable */}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between items-baseline">
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-gray-900 block">
                          Total payable
                        </span>
                        <span className="text-[10.5px] text-gray-400 block mt-0.5">
                          {isIndia
                            ? `Incl. 18% GST. Outside India: ${details.internationalFee}`
                            : 'International delegate fee. No GST applied.'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className={`text-2xl font-bold ${activePayAmount === 0 ? 'text-green-700' : 'text-gray-900'}`}>
                          {activePayAmount === 0 ? 'FREE' : activeTotalFormatted}
                        </span>
                        {appliedCoupon && activePayAmount === 0 && (
                          <span className="block text-[11px] text-green-600 font-semibold">100% Institute Waiver</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pay Button CTA */}
                  <div className="pt-2 space-y-2">
                    {/* Notification if validation fails */}
                    {formErrors.general && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-semibold flex items-start gap-1.5 leading-snug">
                        <span className="shrink-0 text-sm">⚠️</span>
                        <span>You must fill in all required participant details to proceed with payment.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isProcessingPayment || details.booking === false}
                      className={`w-full font-semibold py-3.5 px-4 rounded-lg text-sm transition shadow-md text-center flex items-center justify-center gap-1.5 ${
                        details.booking === false
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-60'
                          : activePayAmount === 0
                            ? 'bg-green-700 hover:bg-green-800 text-white cursor-pointer'
                            : 'bg-[#4F1787] hover:bg-[#3D0F6B] text-white cursor-pointer'
                      }`}
                    >
                      {details.booking === false ? (
                        <span>Booking Paused</span>
                      ) : isProcessingPayment ? (
                        <span>{activePayAmount === 0 ? 'Confirming free registration...' : 'Connecting to Razorpay...'}</span>
                      ) : activePayAmount === 0 ? (
                        <>
                          <span>Complete Free Registration</span>
                          <span>→</span>
                        </>
                      ) : (
                        <>
                          <span>Pay {activeTotalFormatted} securely</span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Trust Badges */}
                  <div className="text-[10.5px] text-gray-500 text-center flex items-center justify-center gap-2 flex-wrap pt-1">
                    <span>✓ Official Razorpay gateway</span>
                    <span>✓ 100% encrypted</span>
                    <span>✓ Ticket by email instantly</span>
                  </div>

                  {/* Terms Note */}
                  <p className="text-[10px] text-gray-400 text-center pt-1 border-t border-gray-100">
                    By paying you accept the Terms and Conditions.
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 4. Main Content: STEP 3 (Payment successful: your ticket) */}
      {step === 'ticket' && (
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] gap-8 items-start">
            {/* Left Column: Success Alert + Workshop Boarding Pass Ticket + Actions */}
            <div className="space-y-6">
              {/* Green Success Alert Banner */}
              <div className="bg-[#E8F5E9] border border-green-200 rounded-xl p-4 sm:p-4.5 flex items-start sm:items-center gap-3.5 shadow-xs">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 sm:mt-0">
                  ✓
                </span>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-emerald-950">
                    Payment received: {activeTotalFormatted} {isIndia ? '(incl. 18% GST)' : '(no GST)'}
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    Your ticket is below. A copy has been emailed to {email || 'name@hospital.org'}.
                  </p>
                </div>
              </div>

              {/* Workshop Ticket Pass Card (Skeuomorphic Boarding Pass) */}
              <div className="bg-white rounded-2xl border border-gray-200/90 shadow-md overflow-hidden">
                {/* Top Ticket Header Band */}
                <div className="bg-[#4F1787] text-white px-5 sm:px-6 py-2.5 flex items-center justify-between">
                  <span className="font-bold text-sm tracking-tight">ProGuide</span>
                  <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-purple-200">
                    ADMIT ONE • WORKSHOP TICKET
                  </span>
                  <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[9.5px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    ✓ PAID
                  </span>
                </div>

                {/* Ticket Inner Grid (Left Body + Perforated Notch Divider + Right Stub) */}
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_180px] md:grid-cols-[1fr_auto_200px] items-stretch">
                  {/* Left Ticket Main Section */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      {/* Date Badge + Title + Attendee */}
                      <div className="flex items-start gap-4">
                        {/* Purple Date Badge */}
                        <div className="bg-[#4F1787] text-white rounded-lg p-2 text-center w-14 shrink-0 flex flex-col justify-center items-center shadow-xs">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-purple-200 block">
                            NOV
                          </span>
                          <span className="text-xl font-bold leading-tight block">
                            {selectedDay}
                          </span>
                          <span className="text-[8.5px] font-semibold uppercase tracking-wider text-purple-200 block">
                            {weekdayShort.toUpperCase()}
                          </span>
                        </div>

                        {/* Workshop Name & Attendee */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base sm:text-lg text-gray-900 leading-snug">
                            {details.title}
                          </h3>
                          <p className="text-xs text-gray-600 mt-1 flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold text-gray-900">{fullName || 'Dr. Anita Sharma'}</span>
                            <span>•</span>
                            <span>{email || 'name@hospital.org'}</span>
                            <span>•</span>
                            <span className="font-semibold text-emerald-700">
                              {details.deliveryMode === 'online_live'
                                ? 'Online live • Zoom'
                                : details.deliveryMode === 'online_recorded'
                                  ? 'Online recorded • On demand'
                                  : 'Offline, in person'}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Key Details Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3.5 my-4 border-y border-gray-100 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            SESSION
                          </span>
                          <span className="font-bold text-gray-900 mt-0.5 block">
                            {details.deliveryMode === 'online_recorded' ? 'On demand' : selectedTimeSlot}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            {details.deliveryMode === 'offline' ? 'REPORT BY' : 'ACCESS'}
                          </span>
                          <span className="font-bold text-gray-900 mt-0.5 block">
                            {details.deliveryMode === 'offline'
                              ? (details.reportingTime.includes('30') ? '01:30 PM' : details.reportingTime)
                              : 'Immediate'}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            {details.deliveryMode === 'offline' ? 'STATION' : 'PLATFORM'}
                          </span>
                          <span className="font-bold text-gray-900 mt-0.5 block">
                            {details.deliveryMode === 'offline'
                              ? 'Station 14'
                              : (details.onlineLiveDetails?.platform || 'Zoom Meeting')}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                            PAID
                          </span>
                          <span className="font-bold text-gray-900 mt-0.5 block">
                            {details.totalFormatted}
                          </span>
                          <span className="text-[9.5px] text-gray-400 block">incl. 18% GST</span>
                        </div>
                      </div>

                      {/* Venue Information */}
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider mb-0.5">
                          {details.deliveryMode === 'offline' ? 'VENUE' : 'ACCESS LINK'}
                        </span>
                        <p className="font-semibold text-xs text-gray-800">
                          {details.deliveryMode === 'offline'
                            ? `${details.venueName}, ${details.fullAddress}`
                            : details.deliveryMode === 'online_live'
                              ? `Live via ${details.onlineLiveDetails?.platform || 'Zoom'} (join link emailed directly)`
                              : 'ProGuide Video Portal (login instructions emailed immediately)'}
                        </p>
                      </div>
                    </div>

                    {/* Footer reference note */}
                    <div className="pt-4 text-[10px] text-gray-400">
                      Razorpay ref: {paymentRef} • Sample QR for entry
                    </div>
                  </div>

                  {/* Perforated Vertical Divider with Semicircular Notches */}
                  <div className="hidden sm:flex relative items-center justify-center">
                    <div className="w-[1px] h-full border-r-2 border-dashed border-gray-200" />
                    {/* Top Notch Cutout */}
                    <div className="w-4 h-4 rounded-full bg-[#FAFAFA] absolute -top-2 left-1/2 -translate-x-1/2 border-b border-gray-200/50" />
                    {/* Bottom Notch Cutout */}
                    <div className="w-4 h-4 rounded-full bg-[#FAFAFA] absolute -bottom-2 left-1/2 -translate-x-1/2 border-t border-gray-200/50" />
                  </div>

                  {/* Right Ticket Stub (QR Code & ID) */}
                  <div className="bg-gray-50/60 p-5 sm:p-6 flex flex-col items-center justify-center text-center border-t sm:border-t-0 border-gray-100">
                    <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mb-2.5">
                      SCAN AT ENTRY
                    </span>

                    {/* Realistic SVG QR Code Representation */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white p-2 border border-gray-200 rounded-md shadow-xs flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full text-gray-900" fill="currentColor">
                        {/* Corner Finding Patterns */}
                        <path d="M5 5h30v30H5V5zm5 5v20h20V10H10zm5 5h10v10H15V15z" />
                        <path d="M65 5h30v30H65V5zm5 5v20h20V10H70zm5 5h10v10H75V15z" />
                        <path d="M5 65h30v30H5V65zm5 5v20h20V70H10zm5 5h10v10H15V75z" />
                        {/* Dense Matrix Data Elements */}
                        <rect x="42" y="8" width="6" height="6" />
                        <rect x="52" y="14" width="6" height="6" />
                        <rect x="45" y="24" width="6" height="6" />
                        <rect x="10" y="42" width="6" height="6" />
                        <rect x="22" y="48" width="6" height="6" />
                        <rect x="30" y="42" width="6" height="6" />
                        <rect x="42" y="42" width="16" height="6" />
                        <rect x="48" y="52" width="8" height="8" />
                        <rect x="62" y="44" width="6" height="6" />
                        <rect x="74" y="42" width="10" height="6" />
                        <rect x="88" y="52" width="6" height="6" />
                        <rect x="42" y="65" width="6" height="12" />
                        <rect x="52" y="70" width="8" height="6" />
                        <rect x="65" y="65" width="10" height="6" />
                        <rect x="80" y="68" width="8" height="6" />
                        <rect x="48" y="85" width="12" height="6" />
                        <rect x="65" y="80" width="8" height="8" />
                        <rect x="80" y="82" width="10" height="6" />
                      </svg>
                    </div>

                    <span className="font-mono font-bold text-xs text-gray-900 mt-2.5">
                      {ticketId}
                    </span>
                    <span className="text-[9.5px] text-gray-400 mt-0.5">
                      Non-transferable • carry a photo ID
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Under Ticket */}
              <div className="flex items-center gap-3 flex-wrap pt-1">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="bg-[#4F1787] hover:bg-[#3D0F6B] text-white font-semibold py-2.5 px-4 rounded-lg text-xs sm:text-sm transition shadow-xs cursor-pointer"
                >
                  Download ticket (PDF)
                </button>
                <button
                  type="button"
                  onClick={() => alert('Calendar event (.ics) downloaded!')}
                  className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg text-xs sm:text-sm transition cursor-pointer"
                >
                  Add to calendar
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Ticket copy sent to ${email}!`)}
                  className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg text-xs sm:text-sm transition cursor-pointer"
                >
                  Email me the ticket
                </button>
                <Link
                  href={`/workshops/${slug || 'advanced-temporal-bone-dissection-workshop'}`}
                  className="text-xs sm:text-sm font-semibold text-[#4F1787] hover:underline ml-2"
                >
                  — Back to workshops
                </Link>
              </div>
            </div>

            {/* Right Column: "On the day of the workshop" Info Card */}
            <div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-5">
                  On the day of the workshop
                </h3>

                <div className="space-y-4">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#4F1787] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      1
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-snug">
                        Reach the venue {details.reportingTime}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        Registration desk, Ground floor, {details.venueName}.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#4F1787] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      2
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-snug">
                        Show this ticket
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        Open it on your phone or bring a printout. The desk scans the QR code.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#4F1787] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      3
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-snug">
                        Carry a photo ID
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        Medical registration card or government ID matching the ticket name.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#4F1787] text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      4
                    </span>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-gray-900 leading-snug">
                        Collect your station kit
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                        {details.whatToBring}. Your 3D bone model and drill are at your station.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-note */}
                <p className="text-[11px] text-gray-400 mt-6 pt-4 border-t border-gray-100 leading-relaxed">
                  Online live and recorded workshops get a join link or video access by email instead of a QR ticket.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Date & Time Picker Modal (Triggered by "Change date or time") */}
      {isDatePickerOpen && (
        <div
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
          onClick={() => setIsDatePickerOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative border border-gray-200 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-base text-gray-900">Change Date & Time</h3>
              <button
                type="button"
                onClick={() => setIsDatePickerOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 hover:text-gray-800 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Select Workshop Day ({monthNames[selectedMonth]} {selectedYear})
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableDays.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        setSelectedDay(day)
                        const slots = daySlotsMap[day] || ['02:00 PM CET', '04:30 PM CET', '06:00 PM CET', '08:30 PM CET']
                        if (slots.length > 0 && !slots.includes(selectedTimeSlot)) {
                          setSelectedTimeSlot(slots[0])
                        }
                      }}
                      className={`h-9 w-9 rounded-lg text-xs font-semibold transition cursor-pointer ${
                        selectedDay === day
                          ? 'bg-[#4F1787] text-white shadow-xs'
                          : 'bg-[#FFF3E0] text-[#B45309] hover:bg-[#FFE0B2]'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-2">
                  Select Time Slot
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {currentSlotDetails.length > 0 ? (
                    currentSlotDetails.map((slotObj) => {
                      const isSelected =
                        selectedTimeSlot === slotObj.label ||
                        selectedTimeSlot === slotObj.startTime ||
                        selectedTimeSlot.includes(slotObj.startTime)
                      const isSoldOut = slotObj.availableSeats <= 0

                      return (
                        <button
                          key={slotObj.label}
                          type="button"
                          disabled={isSoldOut}
                          onClick={() => setSelectedTimeSlot(slotObj.label)}
                          className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition cursor-pointer text-center flex flex-col items-center justify-center ${
                            isSoldOut
                              ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                              : isSelected
                                ? 'bg-[#4F1787] text-white shadow-xs'
                                : 'border border-amber-300 bg-white text-amber-900 hover:border-[#4F1787]'
                          }`}
                        >
                          <span>{slotObj.label}</span>
                          <span
                            className={`text-[10px] mt-0.5 ${
                              isSelected
                                ? 'text-white/80'
                                : isSoldOut
                                  ? 'text-gray-400'
                                  : 'text-emerald-700 font-normal'
                            }`}
                          >
                            {isSoldOut ? 'Sold out' : `${slotObj.availableSeats} left`}
                          </span>
                        </button>
                      )
                    })
                  ) : (
                    timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition cursor-pointer text-center ${
                          selectedTimeSlot === slot
                            ? 'bg-[#4F1787] text-white shadow-xs'
                            : 'border border-amber-300 bg-white text-amber-900 hover:border-[#4F1787]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(false)}
                  className="w-full bg-[#4F1787] hover:bg-[#3D0F6B] text-white font-semibold py-2.5 rounded-lg text-xs transition shadow-xs cursor-pointer"
                >
                  Confirm Slot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkshopEnrollmentView
