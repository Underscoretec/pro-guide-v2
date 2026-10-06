'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export function CustomizedModelContent() {
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
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
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!verifiedHuman) {
      alert('Please check "Verify you are human" before submitting.')
      return
    }
    const body = `Name: ${formData.firstName}%0AQualification: ${formData.academicQualification}%0AEmail: ${formData.email}%0AiMessage: ${formData.iMessageNo}%0AWhatsApp: ${formData.whatsAppNo}%0AViber: ${formData.viberNo}%0AInstitution: ${formData.institutionName}%0AAddress: ${formData.address}%0AState/City: ${formData.state} / ${formData.city}%0ACountry/Pincode: ${formData.country} / ${formData.pincode}%0AAttached File: ${selectedFile ? selectedFile.name : 'None'}`
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

      <section className="py-[52px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <form onSubmit={handleSubmit}>
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
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-[14px] text-[#1F2328] placeholder-[#9CA3AF] focus:outline-none focus:border-[#673AB7] bg-white"
                        required
                      />
                      <input
                        type="text"
                        name="academicQualification"
                        placeholder="Enter Academic Qualification"
                        value={formData.academicQualification}
                        onChange={handleInputChange}
                        className="w-full border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-[14px] text-[#1F2328] placeholder-[#9CA3AF] focus:outline-none focus:border-[#673AB7] bg-white"
                      />
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-[14px] text-[#1F2328] placeholder-[#9CA3AF] focus:outline-none focus:border-[#673AB7] bg-white"
                        required
                      />
                      <input
                        type="text"
                        name="iMessageNo"
                        placeholder="iMessage No."
                        value={formData.iMessageNo}
                        onChange={handleInputChange}
                        className="w-full border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-[14px] text-[#1F2328] placeholder-[#9CA3AF] focus:outline-none focus:border-[#673AB7] bg-white"
                      />
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <input
                        type="text"
                        name="whatsAppNo"
                        placeholder="WhatsApp No."
                        value={formData.whatsAppNo}
                        onChange={handleInputChange}
                        className="w-full border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-[14px] text-[#1F2328] placeholder-[#9CA3AF] focus:outline-none focus:border-[#673AB7] bg-white"
                      />
                      <input
                        type="text"
                        name="viberNo"
                        placeholder="Viber No."
                        value={formData.viberNo}
                        onChange={handleInputChange}
                        className="w-full border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-[14px] text-[#1F2328] placeholder-[#9CA3AF] focus:outline-none focus:border-[#673AB7] bg-white"
                      />
                    </div>

                    {/* Row 4: Clinic / Hospital / Institute / College Name */}
                    <div className="relative">
                      <select
                        name="institutionName"
                        value={formData.institutionName}
                        onChange={handleInputChange}
                        className="w-full border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-[14px] text-[#1F2328] appearance-none focus:outline-none focus:border-[#673AB7] bg-white cursor-pointer"
                      >
                        <option value="" disabled hidden>
                          Clinic / Hospital / Institute / College Name
                        </option>
                        <option value="Clinic">Clinic</option>
                        <option value="Hospital">Hospital</option>
                        <option value="Institute">Institute</option>
                        <option value="College">College</option>
                        <option value="Other">Other Organisation</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#6B7280]">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div>
                  <h2 className="text-[20px] font-semibold text-[#1F2328] mb-4">Address</h2>
                  <div className="space-y-3.5">
                    {/* Row 5: Address dropdown */}
                    <div className="relative">
                      <select
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-[14px] text-[#1F2328] appearance-none focus:outline-none focus:border-[#673AB7] bg-white cursor-pointer"
                      >
                        <option value="" disabled hidden>
                          Address
                        </option>
                        <option value="Hospital Address">Hospital / Clinic Address</option>
                        <option value="Residential Address">Residential Address</option>
                        <option value="Institutional Address">Institutional Address</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#6B7280]">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>

                    {/* Row 6 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-[14px] text-[#1F2328] placeholder-[#9CA3AF] focus:outline-none focus:border-[#673AB7] bg-white"
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-[14px] text-[#1F2328] placeholder-[#9CA3AF] focus:outline-none focus:border-[#673AB7] bg-white"
                      />
                    </div>

                    {/* Row 7 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-[14px] text-[#1F2328] placeholder-[#9CA3AF] focus:outline-none focus:border-[#673AB7] bg-white"
                      />
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full border border-[#D1D5DB] rounded-md px-3.5 py-2.5 text-[14px] text-[#1F2328] placeholder-[#9CA3AF] focus:outline-none focus:border-[#673AB7] bg-white"
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
                      dragActive
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
                    <p className="text-[13px] text-[#6B7280] mt-1">dicom file (max. 50MB)</p>

                    {selectedFile && (
                      <div className="mt-3 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md text-xs font-semibold">
                        Selected: {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </div>
                    )}
                  </div>

                  {/* Format Notes */}
                  <div className="mt-4 space-y-1.5 text-[13px] text-[#4B5563]">
                    <p>
                      <span className="font-semibold text-[#1F2328]">Format:</span> Only DICOM (.dcom) files are supported.
                    </p>
                    <p className="text-[#4B5563] font-medium leading-relaxed">
                      Minimum 0.6mm thick sections in all the three planes Sagittal, Axial, CORONAL
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
                    <div className="flex items-center gap-1.5 text-[#F97316] font-extrabold text-[12px] tracking-wider">
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
                      </svg>
                      <span className="text-[#374151] font-bold text-[11px] uppercase tracking-widest">
                        CLOUDFLARE
                      </span>
                    </div>
                    <span className="text-[10px] text-[#9CA3AF]">Privacy • Terms</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-4 w-full py-3 bg-[#673AB7] hover:bg-[#5B21B6] text-white font-semibold rounded-lg text-[15px] transition shadow-sm"
                >
                  Submit
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
