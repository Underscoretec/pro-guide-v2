'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export function ContactContent() {
  const [formData, setFormData] = useState({
    fn: '',
    ln: '',
    country: 'India',
    mob: '',
    msg: '',
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const product = params.get('product')
      if (product) {
        setFormData((prev) => ({
          ...prev,
          msg: prev.msg || `Hi, I would like to enquire about the "${product}" simulation model. Please provide pricing, availability, and institutional order details.`,
        }))
      }
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `Name: ${formData.fn} ${formData.ln}%0ACountry: ${formData.country}%0AMobile: ${formData.mob}%0A%0A${encodeURIComponent(
      formData.msg,
    )}`
    window.location.href = `mailto:shelly@knowledgebridgeint.com?subject=ProGuide%20enquiry&body=${body}`
  }

  return (
    <>
      <div className="phero">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="crumb">
            <Link href="/">Home</Link> / Contact Us
          </div>
          <h1>Get In Touch</h1>
          <p>
            Have questions or need assistance? We&apos;re here to help — workshops, models, bulk and institutional
            orders, or anything else.
          </p>
        </div>
      </div>

      <section>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="split" style={{ alignItems: 'start' }}>
            <form className="form" onSubmit={handleSubmit}>
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
              <div className="fnote">
                By clicking the button below, you agree to receive communications via Email/Call/WhatsApp/SMS from
                KnowledgeBridge about this programme and other relevant programmes.
              </div>
              <button className="btn" type="submit" style={{ width: '100%' }}>
                Submit
              </button>
            </form>

            <div>
              <div className="form" style={{ marginBottom: '18px' }}>
                <h3 style={{ marginBottom: '8px' }}>Contacts for Indian Queries</h3>
                <p style={{ fontSize: '14.5px' }}>
                  <b>Shelly Sequeira</b>
                  <br />
                  Email: <a href="mailto:shelly@knowledgebridgeint.com">shelly@knowledgebridgeint.com</a>
                  <br />
                  Mobile: 9220522294
                </p>
              </div>

              <div className="form" style={{ marginBottom: '18px' }}>
                <h3 style={{ marginBottom: '8px' }}>Contacts for International Queries</h3>
                <p style={{ fontSize: '14.5px' }}>
                  <b>Shashikumar Sambhoo</b>
                  <br />
                  Email: <a href="mailto:svs@knowledgebridgeint.com">svs@knowledgebridgeint.com</a>
                  <br />
                  Mobile: +971 507863903 | +91 9820454543
                </p>
              </div>

              <div className="form">
                <h3 style={{ marginBottom: '8px' }}>Address</h3>
                <p style={{ fontSize: '14.5px' }}>
                  506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East), Mumbai-400059,
                  Maharashtra, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
