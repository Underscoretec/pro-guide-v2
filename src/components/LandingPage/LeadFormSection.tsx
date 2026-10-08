'use client'

import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface LeadFormProps {
  data?: any
}

export const LeadFormSection: React.FC<LeadFormProps> = ({ data }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('India')
  const [mobile, setMobile] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const title = data?.title || 'Let us guide you in your upskilling journey'
  const subtitle =
    data?.subtitle ||
    'Our programme experts are available 7 days a week. Fill the form and we will help you choose the right programme.'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstName.trim() || !lastName.trim() || !mobile.trim()) {
      toast.error('Please fill in all required fields.', { position: 'bottom-right' })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/lead-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          country: country.trim() || 'India',
          mobile: mobile.trim(),
          source: 'Landing Page — Upskilling Journey',
          status: 'New',
        }),
      })

      const result = await response.json()

      if (response.ok && (result.doc || result.id)) {
        toast.success('Form submitted successfully!', {
          position: 'bottom-right',
        })
        setFirstName('')
        setLastName('')
        setCountry('India')
        setMobile('')
      } else {
        const errMsg =
          result.errors?.[0]?.message ||
          result.message ||
          'Failed to submit form. Please check your information and try again.'
        toast.error(errMsg, { position: 'bottom-right' })
      }
    } catch (err) {
      console.error('Lead form submission error:', err)
      toast.error('A network error occurred. Please try again.', { position: 'bottom-right' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-[52px]">
      <ToastContainer />
      <div className="max-w-[860px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold text-ink">
            {title}
          </h2>
          <p className="text-muted mt-2 text-[15px]">
            {subtitle}
          </p>
          <div className="rule" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-line rounded-[10px] p-7 shadow-[0_14px_34px_rgba(31,35,40,0.08)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-[14px]">
            <input
              type="text"
              name="fn"
              placeholder="First Name *"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-[#C9CDD3] rounded-[6px] py-[11px] px-3 text-[14px] outline-none focus:border-purple transition-colors text-ink"
            />
            <input
              type="text"
              name="ln"
              placeholder="Last Name *"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-[#C9CDD3] rounded-[6px] py-[11px] px-3 text-[14px] outline-none focus:border-purple transition-colors text-ink"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-[14px]">
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border border-[#C9CDD3] rounded-[6px] py-[11px] px-3 text-[14px] outline-none focus:border-purple transition-colors text-ink"
            />
            <input
              type="tel"
              name="mob"
              placeholder="Mobile Number *"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border border-[#C9CDD3] rounded-[6px] py-[11px] px-3 text-[14px] outline-none focus:border-purple transition-colors text-ink"
            />
          </div>

          <div className="text-[12px] text-muted my-[10px] mb-[14px] leading-relaxed">
            By clicking the button below, you agree to receive communications via Email/Call/WhatsApp/SMS
            from KnowledgeBridge about this programme and other relevant programmes.
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple text-white py-[10px] px-5 rounded-[5px] font-bold text-[13.5px] border border-purple hover:bg-purple-d hover:border-purple-d transition-all shadow-sm cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default LeadFormSection
