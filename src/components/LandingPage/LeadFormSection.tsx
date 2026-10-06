'use client'

import React, { useState } from 'react'

export const LeadFormSection: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [country, setCountry] = useState('India')
  const [mobile, setMobile] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `Name: ${firstName} ${lastName}%0ACountry: ${country}%0AMobile: ${mobile}`
    window.location.href = `mailto:shelly@knowledgebridgeint.com?subject=ProGuide%20programme%20enquiry&body=${body}`
    setSubmitted(true)
  }

  return (
    <section className="py-[52px]">
      <div className="max-w-[860px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold text-ink">
            Let us guide you in your upskilling journey
          </h2>
          <p className="text-muted mt-2 text-[15px]">
            Our programme experts are available 7 days a week. Fill the form and we will help you choose the right
            programme.
          </p>
          <div className="rule" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-line rounded-[10px] p-7 shadow-[0_14px_34px_rgba(31,35,40,0.08)]"
        >
          {submitted ? (
            <div className="text-center py-6 text-green font-semibold">
              Thank you for reaching out! Opening your email client to send your enquiry.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] mb-[14px]">
                <input
                  type="text"
                  name="fn"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full border border-[#C9CDD3] rounded-[6px] py-[11px] px-3 text-[14px] outline-none focus:border-purple transition-colors text-ink"
                />
                <input
                  type="text"
                  name="ln"
                  placeholder="Last Name"
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
                  placeholder="Mobile Number"
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
                className="w-full bg-purple text-white py-[10px] px-5 rounded-[5px] font-bold text-[13.5px] border border-purple hover:bg-purple-d hover:border-purple-d transition-all shadow-sm cursor-pointer"
              >
                Submit
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

export default LeadFormSection
