'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import countryList from 'country-list'
import 'react-toastify/dist/ReactToastify.css'

interface CustomizedModelContentProps {
  data?: any
}

export function CustomizedModelContent({ data }: CustomizedModelContentProps) {
  const title = data?.title || 'Get Your Own Customized 3D Simulated Model'
  const heroDescription =
    data?.heroDescription ||
    'We provide 3D simulated models as per your requirement. Fill in the details below and upload your DICOM file — our engineers will review the submission and get back to you within 48 working hours.'
  const dicomHelpText = data?.dicomHelpText || 'dicom file (max. 50MB)'
  const dicomFormatInfo =
    data?.dicomFormatInfo ||
    'Only DICOM (.dcom) files are supported. Minimum 0.6mm thick sections in all the three planes Sagittal, Axial, CORONAL'

  const [formData, setFormData] = useState({
    firstName: '',
    academicQualification: '',
    email: '',
    iMessageNo: '',
    whatsAppNo: '',
    viberNo: '',
    institutionName: '',
    address: '',
    state: '',
    city: '',
    country: '',
    pincode: '',
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [verifiedHuman, setVerifiedHuman] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({})

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (value.trim()) {
      setFieldErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setFieldErrors((prev) => ({ ...prev, file: false }))
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
      setFieldErrors((prev) => ({ ...prev, file: false }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isEmailValid = emailRegex.test(formData.email.trim())
    const cleanPhone = formData.whatsAppNo.replace(/\D/g, '')
    const isPhoneValid = cleanPhone.length === 10

    if (!formData.firstName.trim()) newErrors.firstName = true
    if (!formData.academicQualification.trim()) newErrors.academicQualification = true
    if (!formData.email.trim() || !isEmailValid) newErrors.email = true
    if (!formData.iMessageNo.trim()) newErrors.iMessageNo = true
    if (!formData.whatsAppNo.trim() || !isPhoneValid) newErrors.whatsAppNo = true
    if (!formData.viberNo.trim()) newErrors.viberNo = true
    if (!formData.institutionName) newErrors.institutionName = true
    if (!formData.address) newErrors.address = true
    if (!formData.state.trim()) newErrors.state = true
    if (!formData.city.trim()) newErrors.city = true
    if (!formData.country.trim()) newErrors.country = true
    if (!formData.pincode.trim()) newErrors.pincode = true
    if (!selectedFile) newErrors.file = true

    setFieldErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      if (formData.email.trim() && !isEmailValid) {
        toast.error('Please enter a valid email address', { position: 'bottom-right' })
      } else if (formData.whatsAppNo.trim() && !isPhoneValid) {
        toast.error('Please enter a valid 10-digit phone number', { position: 'bottom-right' })
      } else if (newErrors.file) {
        toast.error('Please upload a DICOM file', { position: 'bottom-right' })
      } else {
        toast.error('Please fill in all required fields', { position: 'bottom-right' })
      }
      return
    }

    if (!verifiedHuman) {
      toast.error('Please check "Verify you are human" before submitting.', {
        position: 'bottom-right',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/customized-model-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          academicQualification: formData.academicQualification,
          email: formData.email,
          iMessageNo: formData.iMessageNo,
          whatsAppNo: formData.whatsAppNo,
          viberNo: formData.viberNo,
          institutionName: formData.institutionName,
          address: formData.address,
          state: formData.state,
          city: formData.city,
          country: formData.country,
          pincode: formData.pincode,
          fileName: selectedFile ? selectedFile.name : '',
        }),
      })

      if (response.ok) {
        toast.success('Customized 3D model request submitted successfully!', {
          position: 'bottom-right',
        })
        setFormData({
          firstName: '',
          academicQualification: '',
          email: '',
          iMessageNo: '',
          whatsAppNo: '',
          viberNo: '',
          institutionName: '',
          address: '',
          state: '',
          city: '',
          country: '',
          pincode: '',
        })
        setSelectedFile(null)
        setVerifiedHuman(false)
        setFieldErrors({})
      } else {
        const errData = await response.json().catch(() => null)
        const msg = errData?.errors?.[0]?.message || 'Failed to submit request. Please try again.'
        toast.error(msg, { position: 'bottom-right' })
      }
    } catch (err) {
      console.error('Error submitting customized model request:', err)
      toast.error('An error occurred. Please try again.', { position: 'bottom-right' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInputClass = (fieldName: string) =>
    `w-full border ${
      fieldErrors[fieldName] ? 'border-[#DC2626]' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
    } bg-white rounded-[4px] px-3.5 py-2.5 text-[14px] text-[#1F2328] placeholder-[#9CA3AF] focus:outline-none focus:border-[#5E007B] focus:ring-1 focus:ring-[#5E007B] transition-all`

  const getSelectClass = (fieldName: string) =>
    `w-full border ${
      fieldErrors[fieldName] ? 'border-[#DC2626]' : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
    } bg-white rounded-[4px] px-3.5 py-2.5 text-[14px] text-[#1F2328] appearance-none focus:outline-none focus:border-[#5E007B] focus:ring-1 focus:ring-[#5E007B] transition-all cursor-pointer`

  return (
    <>
      <div className="phero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / Get Your Own Customized Model
          </div>
          <h1>{title}</h1>
          <p>{heroDescription}</p>
        </div>
      </div>
      <ToastContainer position="bottom-right" />

      <section style={{ paddingTop: '10px', paddingBottom: '48px' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Column: Personal Details & Address */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-[20px] font-semibold text-[#1F2328] mb-4">Personal Details</h2>
                  <div className="space-y-3.5">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name *"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={getInputClass('firstName')}
                      />
                      <input
                        type="text"
                        name="academicQualification"
                        placeholder="Enter Academic Qualification *"
                        value={formData.academicQualification}
                        onChange={handleInputChange}
                        className={getInputClass('academicQualification')}
                      />
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email *"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={getInputClass('email')}
                      />
                      <input
                        type="text"
                        name="iMessageNo"
                        placeholder="iMessage No. *"
                        value={formData.iMessageNo}
                        onChange={handleInputChange}
                        className={getInputClass('iMessageNo')}
                      />
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <input
                        type="tel"
                        name="whatsAppNo"
                        maxLength={10}
                        placeholder="WhatsApp No. (10 Digits) *"
                        value={formData.whatsAppNo}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '')
                          setFormData({ ...formData, whatsAppNo: val })
                          if (val.length === 10) setFieldErrors((prev) => ({ ...prev, whatsAppNo: false }))
                        }}
                        className={getInputClass('whatsAppNo')}
                      />
                      <input
                        type="text"
                        name="viberNo"
                        placeholder="Viber No. *"
                        value={formData.viberNo}
                        onChange={handleInputChange}
                        className={getInputClass('viberNo')}
                      />
                    </div>


                    {/* Row 4: Clinic / Hospital / Institute / College Name */}
                    <input
                      type="text"
                      name="institutionName"
                      placeholder="Clinic / Hospital / Institute / College Name *"
                      value={formData.institutionName}
                      onChange={handleInputChange}
                      className={getInputClass('institutionName')}
                    />
                  </div>
                </div>

                {/* Address Section */}
                <div>
                  <h2 className="text-[20px] font-semibold text-[#1F2328] mb-4">Address</h2>
                  <div className="space-y-3.5">
                    {/* Row 5: Address */}
                    <input
                      type="text"
                      name="address"
                      placeholder="Address *"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={getInputClass('address')}
                    />

                    {/* Row 6 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <input
                        type="text"
                        name="state"
                        placeholder="State *"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={getInputClass('state')}
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City *"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={getInputClass('city')}
                      />
                    </div>

                    {/* Row 7 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="relative">
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className={getSelectClass('country')}
                        >
                          <option value="" disabled hidden>
                            Country *
                          </option>
                          {countryList.getNames().map((cName) => (
                            <option key={cName} value={cName}>
                              {cName}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#6B7280]">
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode *"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className={getInputClass('pincode')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: File Upload & Submission */}
              <div>
                <h2 className="text-[20px] font-semibold text-[#1F2328] mb-4">Personal Details</h2>

                {/* DICOM File Upload Card */}
                <div className="border border-[#E5E7EB] rounded-xl p-5 bg-white shadow-sm">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors flex flex-col items-center justify-center cursor-pointer relative ${
                      fieldErrors.file
                        ? 'border-[#612178]'
                        : dragActive
                        ? 'border-[#2563EB] bg-blue-50'
                        : 'border-[#D1D5DB] bg-[#FAFAFA] hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="file"
                      id="dicom-file-input"
                      accept=".dcm,.dicom"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />

                    {/* Upload Icon */}
                    <div className="w-12 h-12 mb-3 text-[#9CA3AF] flex items-center justify-center">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>

                    {/* Main Prompt */}
                    <p className="text-[14px] text-[#4B5563]">
                      <span className="text-[#2563EB] font-medium hover:underline">
                        Click to upload you dicom file
                      </span>{' '}
                      or drag and drop
                    </p>
                    <p className="text-[13px] text-[#6B7280] mt-1">{dicomHelpText}</p>

                    {selectedFile && (
                      <div className="mt-3 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md text-xs font-semibold">
                        Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                    )}
                  </div>

                  {/* Format Notes */}
                  <div className="mt-4 space-y-1.5 text-[13px] text-[#4B5563]">
                    <p className="text-[#4B5563] font-medium leading-relaxed">
                      {dicomFormatInfo}
                    </p>
                  </div>
                </div>

                {/* Cloudflare Captcha Box */}
                <div className="mt-4 border border-[#E5E7EB] rounded-lg p-3.5 bg-[#F9FAFB] flex items-center justify-between">
                  <label className="flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={verifiedHuman}
                      onChange={(e) => setVerifiedHuman(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-[#673AB7] focus:ring-[#673AB7] cursor-pointer"
                    />
                    <span className="ml-3 text-[14px] text-[#374151] font-medium">Verify you are human</span>
                  </label>

                  {/* Cloudflare Logo Badge */}
                  <div className="flex flex-col items-end">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/Cloudflare Logo.png"
                      alt="Cloudflare"
                      className="h-7 w-auto object-contain"
                    />
                    <span className="text-[10px] text-[#9CA3AF] mt-0.5">Privacy • Terms</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 w-full py-3 bg-[#673AB7] hover:bg-[#5B21B6] text-white font-semibold rounded-lg text-[15px] transition shadow-sm"
                  style={{ opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>

                {/* Bottom Link */}
                <p className="mt-4 text-center text-[14px] text-[#4B5563]">
                  Already have an account ?{' '}
                  <Link href="/contact" className="text-[#673AB7] font-semibold hover:underline">
                    Log in here
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

