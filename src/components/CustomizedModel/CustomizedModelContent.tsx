'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export function CustomizedModelContent() {
  const [formData, setFormData] = useState({
    name: '',
    qual: '',
    email: '',
    wa: '',
    org: '',
    city: '',
    state: '',
    country: 'India',
    pin: '',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = `Name: ${formData.name}%0AQualification: ${formData.qual}%0AEmail: ${formData.email}%0AWhatsApp: ${
      formData.wa
    }%0AOrganisation: ${formData.org}%0ACity/State: ${formData.city} / ${formData.state}%0ACountry/PIN: ${
      formData.country
    } / ${formData.pin}%0ARequirement: ${encodeURIComponent(formData.notes)}`
    window.location.href = `mailto:svs@knowledgebridgeint.com?subject=Customized%203D%20Model%20Requirement&body=${body}`
  }

  return (
    <>
      <div className="phero">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="crumb">
            <Link href="/">Home</Link> / Get Your Own Customized Model
          </div>
          <h1>Get Your Own Customized 3D Simulated Model</h1>
          <p>
            We provide 3D simulated models as per your requirement. Fill in the details below and upload your DICOM
            file — our engineers will review the submission and get back to you within 48 working hours.
          </p>
        </div>
      </div>

      <section>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="split" style={{ alignItems: 'start' }}>
            <form className="form" onSubmit={handleSubmit}>
              <h3 style={{ marginBottom: '14px' }}>Personal Details</h3>
              <div className="frow">
                <input
                  name="name"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                  name="qual"
                  placeholder="Academic Qualification"
                  value={formData.qual}
                  onChange={(e) => setFormData({ ...formData, qual: e.target.value })}
                />
              </div>
              <div className="frow">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  name="wa"
                  placeholder="WhatsApp No."
                  value={formData.wa}
                  onChange={(e) => setFormData({ ...formData, wa: e.target.value })}
                />
              </div>
              <input
                name="org"
                placeholder="Clinic / Hospital / Institute / College Name"
                style={{ marginBottom: '14px' }}
                value={formData.org}
                onChange={(e) => setFormData({ ...formData, org: e.target.value })}
              />

              <h3 style={{ margin: '10px 0 14px' }}>Address</h3>
              <div className="frow">
                <input
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
                <input
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
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
                  name="pin"
                  placeholder="Pincode"
                  value={formData.pin}
                  onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
                />
              </div>
              <textarea
                name="notes"
                placeholder="Describe the case / requirement (pathology, side, planned surgery)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              ></textarea>
              <div className="fnote">
                After you submit, we will reply from svs@knowledgebridgeint.com with a secure link to upload your DICOM
                file.
              </div>
              <button className="btn" type="submit" style={{ width: '100%' }}>
                Submit Requirement
              </button>
            </form>

            <div>
              <div className="form" style={{ marginBottom: '18px' }}>
                <h3 style={{ marginBottom: '10px' }}>DICOM file requirements</h3>
                <ul className="checks">
                  <li>
                    <b>Format: DICOM (.dcm) files only</b>
                    <span>Export directly from your CT console or PACS.</span>
                  </li>
                  <li>
                    <b>Minimum 0.6 mm thick sections</b>
                    <span>In all three planes — sagittal, axial and coronal.</span>
                  </li>
                  <li>
                    <b>Maximum 50 MB per upload</b>
                    <span>Larger studies can be shared via the secure link we send you.</span>
                  </li>
                </ul>
              </div>

              <div className="form">
                <h3 style={{ marginBottom: '10px' }}>How it works</h3>
                <ul className="checks">
                  <li>
                    <b>1 · Submit this form</b>
                    <span>Tell us about the case and your requirement.</span>
                  </li>
                  <li>
                    <b>2 · Upload your DICOM</b>
                    <span>Through the secure link we send within 48 working hours.</span>
                  </li>
                  <li>
                    <b>3 · Engineering review &amp; quote</b>
                    <span>Our engineers verify the study and confirm feasibility, pricing and timeline.</span>
                  </li>
                  <li>
                    <b>4 · Your model is cast and shipped</b>
                    <span>Rehearse the surgery before you perform it.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
