'use client'

import React, { useState } from 'react'
import Link from 'next/link'

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
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

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
        setIsSubmitted(true)
        setFormData({
          fn: '',
          ln: '',
          country: 'India',
          mob: '',
          msg: '',
        })
      } else {
        const data = await response.json().catch(() => null)
        setErrorMsg(data?.errors?.[0]?.message || 'Failed to submit form. Please try again.')
      }
    } catch (err) {
      console.error('Error submitting contact form:', err)
      setErrorMsg('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
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
            {isSubmitted ? (
              <div className="form" style={{ textAlign: 'center', padding: '36px 24px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#d1fae5',
                    color: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px auto',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  ✓
                </div>
                <h3 style={{ marginBottom: '8px', color: '#065f46' }}>Contact Submitted Successfully!</h3>
                <p style={{ fontSize: '15px', color: '#4b5563', marginBottom: '24px' }}>
                  Thank you for reaching out. Your details have been recorded and our team will get back to you shortly.
                </p>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                >
                  Submit Another Query
                </button>
              </div>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                {errorMsg && (
                  <div
                    style={{
                      padding: '10px 14px',
                      marginBottom: '16px',
                      borderRadius: '6px',
                      backgroundColor: '#fee2e2',
                      color: '#991b1b',
                      fontSize: '14px',
                    }}
                  >
                    {errorMsg}
                  </div>
                )}
                <div className="frow">
                  <input
                    name="fn"
                    placeholder="First Name"
                    required
                    value={formData.fn}
                    onChange={(e) => setFormData({ ...formData, fn: e.target.value })}
                  />
                  <input
                    name="ln"
                    placeholder="Last Name"
                    value={formData.ln}
                    onChange={(e) => setFormData({ ...formData, ln: e.target.value })}
                  />
                </div>
                <div className="frow">
                  <input
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                  <input
                    name="mob"
                    placeholder="Mobile Number"
                    value={formData.mob}
                    onChange={(e) => setFormData({ ...formData, mob: e.target.value })}
                  />
                </div>
                <textarea
                  name="msg"
                  placeholder="Message"
                  required
                  value={formData.msg}
                  onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                ></textarea>
                <div className="fnote">{formDisclaimer}</div>
                <button className="btn" type="submit" disabled={isSubmitting} style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            )}

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
