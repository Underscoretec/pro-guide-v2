'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ContactContentProps {
  data?: any
}

export function ContactContent({ data }: ContactContentProps) {
  const title = data?.title || 'Get In Touch'
  const heroDescription =
    data?.heroDescription ||
    "Have questions or need assistance? We're here to help — workshops, models, bulk and institutional orders, or anything else."

  const indianTitle = data?.indianQueries?.title || 'Contacts for Indian Queries'
  const indianName = data?.indianQueries?.name || 'Shelly Sequeira'
  const indianEmail = data?.indianQueries?.email || 'shelly@knowledgebridgeint.com'
  const indianPhone = data?.indianQueries?.phone || '9220522294'

  const intlTitle = data?.internationalQueries?.title || 'Contacts for International Queries'
  const intlName = data?.internationalQueries?.name || 'Shashikumar Sambhoo'
  const intlEmail = data?.internationalQueries?.email || 'svs@knowledgebridgeint.com'
  const intlPhone = data?.internationalQueries?.phone || '+971 507863903 | +91 9820454543'

  const addressTitle = data?.address?.title || 'Address'
  const addressText =
    data?.address?.text ||
    '506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East), Mumbai-400059, Maharashtra, India'

  const formDisclaimer =
    data?.formDisclaimer ||
    'By clicking the button below, you agree to receive communications via Email/Call/WhatsApp/SMS from KnowledgeBridge about this programme and other relevant programmes.'

  const [formData, setFormData] = useState({
    fn: '',
    ln: '',
    country: 'India',
    mob: '',
    msg: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}

    const cleanMob = formData.mob.replace(/\D/g, '')
    const isMobValid = cleanMob.length === 10

    if (!formData.fn.trim()) newErrors.fn = true
    if (!formData.ln.trim()) newErrors.ln = true
    if (!formData.country.trim()) newErrors.country = true
    if (!formData.mob.trim() || !isMobValid) newErrors.mob = true
    if (!formData.msg.trim()) newErrors.msg = true

    setFieldErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      if (formData.mob.trim() && !isMobValid) {
        toast.error('Please enter a valid 10-digit mobile number.', { position: 'bottom-right' })
      } else {
        toast.error('Please fill in all required fields.', { position: 'bottom-right' })
      }
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.fn,
          lastName: formData.ln,
          country: formData.country,
          mobile: formData.mob,
          message: formData.msg,
        }),
      })

      if (response.ok) {
        toast.success('Form submitted successfully!', {
          position: 'bottom-right',
        })
        setFormData({
          fn: '',
          ln: '',
          country: 'India',
          mob: '',
          msg: '',
        })
        setFieldErrors({})
      } else {
        const data = await response.json().catch(() => null)
        const msg = data?.errors?.[0]?.message || 'Failed to submit form. Please try again.'
        toast.error(msg, { position: 'bottom-right' })
      }
    } catch (err) {
      console.error('Error submitting contact form:', err)
      toast.error('An error occurred. Please try again.', { position: 'bottom-right' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStyle = (fieldName: string) =>
    fieldErrors[fieldName] ? { borderColor: '#612178' } : {}

  return (
    <>
      <ToastContainer position="bottom-right" />
      <div className="phero">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="crumb">
            <Link href="/">Home</Link> / Contact Us
          </div>
          <h1>{title}</h1>
          <p>{heroDescription}</p>
        </div>
      </div>

      <section>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="split" style={{ alignItems: 'start' }}>
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="frow">
                <input
                  name="fn"
                  placeholder="First Name *"
                  value={formData.fn}
                  style={getStyle('fn')}
                  onChange={(e) => {
                    setFormData({ ...formData, fn: e.target.value })
                    if (e.target.value.trim()) setFieldErrors((p) => ({ ...p, fn: false }))
                  }}
                />
                <input
                  name="ln"
                  placeholder="Last Name *"
                  value={formData.ln}
                  style={getStyle('ln')}
                  onChange={(e) => {
                    setFormData({ ...formData, ln: e.target.value })
                    if (e.target.value.trim()) setFieldErrors((p) => ({ ...p, ln: false }))
                  }}
                />
              </div>
              <div className="frow">
                <input
                  name="country"
                  placeholder="Country *"
                  value={formData.country}
                  style={getStyle('country')}
                  onChange={(e) => {
                    setFormData({ ...formData, country: e.target.value })
                    if (e.target.value.trim()) setFieldErrors((p) => ({ ...p, country: false }))
                  }}
                />
                <input
                  name="mob"
                  type="tel"
                  maxLength={10}
                  placeholder="10-Digit Mobile Number *"
                  value={formData.mob}
                  style={getStyle('mob')}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '')
                    setFormData({ ...formData, mob: val })
                    if (val.length === 10) setFieldErrors((p) => ({ ...p, mob: false }))
                  }}
                />
              </div>
              <textarea
                name="msg"
                placeholder="Message *"
                value={formData.msg}
                style={getStyle('msg')}
                onChange={(e) => {
                  setFormData({ ...formData, msg: e.target.value })
                  if (e.target.value.trim()) setFieldErrors((p) => ({ ...p, msg: false }))
                }}
              ></textarea>
              <div className="fnote">{formDisclaimer}</div>
              <button className="btn" type="submit" disabled={isSubmitting} style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </form>


            <div>
              <div className="form" style={{ marginBottom: '18px' }}>
                <h3 style={{ marginBottom: '8px' }}>{indianTitle}</h3>
                <p style={{ fontSize: '14.5px' }}>
                  <b>{indianName}</b>
                  <br />
                  Email: <a href={`mailto:${indianEmail}`}>{indianEmail}</a>
                  <br />
                  Mobile: {indianPhone}
                </p>
              </div>

              <div className="form" style={{ marginBottom: '18px' }}>
                <h3 style={{ marginBottom: '8px' }}>{intlTitle}</h3>
                <p style={{ fontSize: '14.5px' }}>
                  <b>{intlName}</b>
                  <br />
                  Email: <a href={`mailto:${intlEmail}`}>{intlEmail}</a>
                  <br />
                  Mobile: {intlPhone}
                </p>
              </div>

              <div className="form">
                <h3 style={{ marginBottom: '8px' }}>{addressTitle}</h3>
                <p style={{ fontSize: '14.5px' }}>{addressText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

