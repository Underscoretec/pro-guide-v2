'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export interface ResourceDocument {
  id?: string
  title: string
  category: 'workshop' | 'product' | 'clinical' | string
  badgeText: string
  badgeColor?: 'orange' | 'purple' | 'green' | 'amber' | string
  yearOrVol: string
  description: string
  viewPdfText?: string
  viewPdfLink?: string
  downloadPdfText?: string
  downloadPdfLink?: string
  spineBadgeTag?: string
  spineTitle?: string
  spineBg?: 'purple' | 'dark-purple' | 'green' | 'orange' | string
  pdfUrl?: string
}

export interface ResourceLibraryData {
  hero?: {
    crumbHomeText?: string
    crumbCategoryText?: string
    crumbCurrentText?: string
    title?: string
    description?: string
    directPdfDownloadText?: string
    directPdfDownloadLink?: string
    instantViewerText?: string
    instantViewerLink?: string
  }
  filterTabs?: Array<{ label: string; key: string }>
  sectionHeader?: {
    title?: string
    subtitle?: string
    downloadAllText?: string
    downloadAllLink?: string
  }
  documents?: ResourceDocument[]
  ctaBanner?: {
    title?: string
    subtitle?: string
    primaryBtnText?: string
    primaryBtnLink?: string
    secondaryBtnText?: string
    secondaryBtnLink?: string
  }
}

const defaultDocuments: ResourceDocument[] = [
  {
    id: 'doc-1',
    title: 'ProGuide 3D Hands-On Workshops 2026 Official Brochure',
    category: 'workshop',
    badgeText: 'WORKSHOP BROCHURE',
    badgeColor: 'orange',
    yearOrVol: 'Oct 2026',
    description:
      'Comprehensive programme itinerary for KBI SkillBridge dissection stations, surgical faculty profiles, and station logistics.',
    viewPdfText: 'View PDF',
    viewPdfLink: '/files/proguide-workshop-brochure-2026.pdf',
    downloadPdfText: 'Download PDF',
    downloadPdfLink: '/files/proguide-workshop-brochure-2026.pdf',
    spineBadgeTag: 'PDF',
    spineTitle: 'COURSE SYLLABUS & SPECS',
    spineBg: 'purple',
    pdfUrl: '/files/proguide-workshop-brochure-2026.pdf',
  },
  {
    id: 'doc-2',
    title: 'ProGuide 3D Otolaryngology Simulation Models Master Catalogue',
    category: 'product',
    badgeText: 'PRODUCT CATALOGUE',
    badgeColor: 'purple',
    yearOrVol: 'Vol. IV (2026)',
    description:
      'Full specifications for high-fidelity Otology and Rhinology training models, composite material properties, and complete dimension tables.',
    viewPdfText: 'View PDF',
    viewPdfLink: '/files/proguide-master-catalogue.pdf',
    downloadPdfText: 'Download PDF',
    downloadPdfLink: '/files/proguide-master-catalogue.pdf',
    spineBadgeTag: '24 PAGES',
    spineTitle: 'MASTER CATALOG VOL. IV',
    spineBg: 'dark-purple',
    pdfUrl: '/files/proguide-master-catalogue.pdf',
  },
  {
    id: 'doc-3',
    title: 'Temporal Bone Drilling Manual & Anatomical Landmark Guide',
    category: 'clinical',
    badgeText: 'CLINICAL GUIDE',
    badgeColor: 'green',
    yearOrVol: 'Surgical Lab Ed.',
    description:
      'Standard operating procedures and station drill protocols for mastoidectomy, facial nerve decompression, and labyrinthotomy.',
    viewPdfText: 'View PDF',
    viewPdfLink: '/files/temporal-bone-drilling-manual.pdf',
    downloadPdfText: 'Download PDF',
    downloadPdfLink: '/files/temporal-bone-drilling-manual.pdf',
    spineBadgeTag: '12 PAGES',
    spineTitle: 'SURGICAL LAB PROTOCOLS',
    spineBg: 'green',
    pdfUrl: '/files/temporal-bone-drilling-manual.pdf',
  },
  {
    id: 'doc-4',
    title: 'Custom Patient-Specific 3D Models Specification Sheet',
    category: 'product',
    badgeText: 'PRODUCT SPEC',
    badgeColor: 'purple',
    yearOrVol: 'Orders 2026',
    description:
      'Guidelines for hospital departments and skills labs to submit anonymized DICOM / CT datasets for patient-specific surgical model preparation.',
    viewPdfText: 'View PDF',
    viewPdfLink: '/files/custom-patient-model-specsheet.pdf',
    downloadPdfText: 'Download PDF',
    downloadPdfLink: '/files/custom-patient-model-specsheet.pdf',
    spineBadgeTag: '8 PAGES',
    spineTitle: 'DICOM / CT SPECIFICATIONS',
    spineBg: 'orange',
    pdfUrl: '/files/custom-patient-model-specsheet.pdf',
  },
]

export const ResourceLibraryContent: React.FC<{ data?: ResourceLibraryData }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activePdfModal, setActivePdfModal] = useState<ResourceDocument | null>(null)

  const hero = data?.hero || {
    crumbHomeText: 'Home',
    crumbCategoryText: 'Resources',
    crumbCurrentText: 'Brochures & Catalogues',
    title: 'Resource Library & PDF Catalogues',
    description:
      "Access and download verified educational materials, curriculum modules, and technical brochures for ProGuide's Otolaryngology Head & Neck 3D simulation models and hands-on dissection workshops.",
    directPdfDownloadText: 'Direct PDF Download',
    instantViewerText: 'Instant In-Browser Viewer',
  }

  const sectionHeader = data?.sectionHeader || {
    title: 'Official ProGuide Brochures & Documents',
    subtitle:
      'Review the comprehensive course itineraries, surgical dissection station setups, and complete product dimension tables.',
    downloadAllText: 'Download All Package (.zip)',
  }

  const filterTabs = data?.filterTabs || [
    { label: 'All Documents (4)', key: 'all' },
    { label: 'Workshop Brochures', key: 'workshop' },
    { label: 'Product Catalogues', key: 'product' },
    { label: 'Clinical & Simulation Guides', key: 'clinical' },
  ]

  const rawDocs =
    data?.documents && data.documents.length > 0 ? data.documents : defaultDocuments

  const filteredDocs =
    activeTab === 'all'
      ? rawDocs
      : rawDocs.filter(
          (d) => (d.category || '').toLowerCase() === activeTab.toLowerCase()
        )

  const ctaBanner = data?.ctaBanner || {
    title: 'Require Institutional Course Packages or Printed Physical Catalogues?',
    subtitle:
      'ProGuide coordinates with ENT departments, teaching hospitals, and surgical skill labs worldwide to provide customized bulk models, workshop facilitation kits, and printed course syllabi.',
    primaryBtnText: 'Request Call Back',
    primaryBtnLink: '/contact',
    secondaryBtnText: 'Email Programme Co-ordinator',
    secondaryBtnLink: 'mailto:info@pro-guide.in',
  }

  const getSpineColorClasses = (bg?: string) => {
    switch (bg) {
      case 'dark-purple':
        return 'bg-[#4C1D95]'
      case 'green':
        return 'bg-[#15803D]'
      case 'orange':
      case 'amber':
        return 'bg-[#C2410C]'
      case 'purple':
      default:
        return 'bg-[#6B21A8]'
    }
  }

  const getBadgeClasses = (color?: string) => {
    switch (color) {
      case 'orange':
      case 'amber':
        return 'bg-[#FFF7ED] text-[#EA580C] border-[#FFEDD5]'
      case 'green':
        return 'bg-[#F0FDF4] text-[#16A34A] border-[#DCFCE7]'
      case 'purple':
      default:
        return 'bg-[#F3E8FF] text-[#7C3AED] border-[#E9D5FF]'
    }
  }

  return (
    <div className="w-full bg-[#FAFAFC] min-h-screen">
      {/* Solid Purple Hero Header Banner */}
      <section className="bg-[#4A148C] text-white py-10 sm:py-14 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-white mb-3 font-medium">
              <Link href="/" className="text-white hover:underline transition">
                {hero.crumbHomeText || 'Home'}
              </Link>
              <span className="text-white/80">/</span>
              <span className="text-white">{hero.crumbCategoryText || 'Resources'}</span>
              <span className="text-white/80">/</span>
              <span className="text-white font-semibold">{hero.crumbCurrentText || 'Brochures & Catalogues'}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              {hero.title || 'Resource Library & PDF Catalogues'}
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed max-w-2xl">
              {hero.description}
            </p>
          </div>

          {/* Top Right Action Badges */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 self-start md:self-auto">
            <a
              href={hero.directPdfDownloadLink || '/files/proguide-workshop-brochure-2026.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-xs border border-white/20 text-white text-xs sm:text-sm font-medium px-3.5 py-2 rounded-lg shadow-2xs hover:bg-white/20 transition cursor-pointer"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span>{hero.directPdfDownloadText || 'Direct PDF Download'}</span>
            </a>

            <a
              href={hero.instantViewerLink || '/files/proguide-master-catalogue.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 backdrop-blur-xs border border-white/20 text-white text-xs sm:text-sm font-medium px-3.5 py-2 rounded-lg shadow-2xs hover:bg-white/20 transition cursor-pointer"
            >
              <svg className="w-4 h-4 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{hero.instantViewerText || 'Instant In-Browser Viewer'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Filter Tabs & Toolbar */}
      <section className="bg-white border-b border-gray-200 shadow-2xs py-3 px-4 sm:px-6 sticky top-0 z-30">
        <div className="max-w-[1320px] mx-auto flex flex-row items-center justify-between gap-4 overflow-x-auto no-scrollbar py-0.5">
          {/* Category Tabs */}
          <div className="flex flex-row items-center gap-2 shrink-0 whitespace-nowrap">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#581C87] text-white shadow-xs font-semibold'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Right Toolbar (Stats + Grid/List View Toggle) */}
          <div className="flex flex-row items-center gap-4 text-xs sm:text-sm text-gray-600 shrink-0 whitespace-nowrap">
            <span className="whitespace-nowrap">
              Showing <strong className="text-gray-900 font-semibold">{filteredDocs.length} official brochures</strong> • Updated for Academic Year 2026
            </span>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200 shrink-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  viewMode === 'grid'
                    ? 'bg-[#581C87] text-white shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 002-2h2a2 2 0 002 2v2a2 2 0 00-2 2h-2a2 2 0 00-2-2V5zM11 13a2 2 0 002-2h2a2 2 0 002 2v2a2 2 0 00-2 2h-2a2 2 0 00-2-2v-2z" />
                </svg>
                <span>Grid View</span>
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                  viewMode === 'list'
                    ? 'bg-[#581C87] text-white shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span>List View</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1320px] mx-auto py-8 sm:py-12 px-4 sm:px-6">
        {/* Section Heading & Download Package Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              {sectionHeader.title || 'Official ProGuide Brochures & Documents'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              {sectionHeader.subtitle}
            </p>
          </div>

          <a
            href={sectionHeader.downloadAllLink || '/files/proguide-workshop-brochure-2026.pdf'}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start md:self-auto inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-800 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-2xs hover:bg-gray-50 transition cursor-pointer"
          >
            <svg className="w-4 h-4 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{sectionHeader.downloadAllText || 'Download All Package (.zip)'}</span>
          </a>
        </div>

        {/* Resource Cards Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDocs.map((doc, idx) => {
              const spineBgClass = getSpineColorClasses(doc.spineBg)
              const badgeClass = getBadgeClasses(doc.badgeColor)

              return (
                <div
                  key={doc.id || idx}
                  className="bg-white border border-gray-200/90 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between h-full group"
                >
                  {/* Top Card Area with Spine Cover & Content */}
                  <div>
                    <div className="flex gap-3 mb-4">
                      {/* Left Spine / Cover Graphic */}
                      <div
                        className={`${spineBgClass} w-20 shrink-0 rounded-xl text-white p-2 flex flex-col justify-between items-center text-center shadow-xs relative overflow-hidden min-h-[145px]`}
                      >
                        {/* Top Spine Badge */}
                        <span className="bg-white/20 backdrop-blur-2xs text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded text-white border border-white/30">
                          {doc.spineBadgeTag || 'PDF'}
                        </span>

                        {/* Center Icon */}
                        <div className="my-2 text-white/90">
                          {doc.spineBg === 'green' ? (
                            <svg className="w-6 h-6 border-2 border-white/80 rounded p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                            </svg>
                          ) : doc.spineBg === 'orange' ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          )}
                        </div>

                        {/* Bottom Vertical / Spine Title */}
                        <span className="text-[9px] font-bold tracking-tight uppercase leading-tight text-white/90">
                          {doc.spineTitle || 'DOCUMENT'}
                        </span>
                      </div>

                      {/* Right Header & Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {/* Badge Header & Date/Vol */}
                          <div className="flex flex-wrap items-center gap-1.5 mb-2">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badgeClass}`}
                            >
                              {doc.badgeText}
                            </span>
                            <span className="text-[10px] font-medium text-gray-600">
                              {doc.yearOrVol}
                            </span>
                          </div>

                          {/* Card Title */}
                          <h3 className="text-sm font-bold text-gray-900 leading-snug group-hover:text-[#581C87] transition-colors line-clamp-3">
                            {doc.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {doc.description}
                    </p>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => setActivePdfModal(doc)}
                      className="w-full bg-purple-50 hover:bg-purple-100 text-[#581C87] rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-[#581C87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{doc.viewPdfText || 'View PDF'}</span>
                    </button>

                    <a
                      href={doc.downloadPdfLink || doc.pdfUrl || '/files/proguide-workshop-brochure-2026.pdf'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#581C87] hover:bg-[#4C1D95] text-white rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>{doc.downloadPdfText || 'Download PDF'}</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* List View */
          <div className="flex flex-col gap-4">
            {filteredDocs.map((doc, idx) => {
              const spineBgClass = getSpineColorClasses(doc.spineBg)
              const badgeClass = getBadgeClasses(doc.badgeColor)

              return (
                <div
                  key={doc.id || idx}
                  className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    {/* Spine Cover Icon */}
                    <div
                      className={`${spineBgClass} w-16 h-20 shrink-0 rounded-xl text-white p-2 flex flex-col justify-between items-center text-center shadow-2xs`}
                    >
                      <span className="text-[9px] font-bold uppercase">{doc.spineBadgeTag || 'PDF'}</span>
                      <svg className="w-5 h-5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-[8px] font-bold tracking-tighter uppercase">{doc.spineBg}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${badgeClass}`}>
                          {doc.badgeText}
                        </span>
                        <span className="text-xs font-medium text-gray-600">{doc.yearOrVol}</span>
                      </div>

                      <h3 className="text-base font-bold text-gray-900 group-hover:text-[#581C87] transition-colors">
                        {doc.title}
                      </h3>

                      <p className="text-xs text-gray-600 mt-1 max-w-3xl">
                        {doc.description}
                      </p>
                    </div>
                  </div>

                  {/* List Action Buttons */}
                  <div className="flex sm:flex-col items-center gap-2.5 w-full sm:w-auto shrink-0 border-t sm:border-t-0 border-gray-100 pt-3 sm:pt-0">
                    <button
                      onClick={() => setActivePdfModal(doc)}
                      className="flex-1 sm:flex-none w-full sm:w-36 bg-purple-50 hover:bg-purple-100 text-[#581C87] rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-[#581C87]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{doc.viewPdfText || 'View PDF'}</span>
                    </button>

                    <a
                      href={doc.downloadPdfLink || doc.pdfUrl || '/files/proguide-workshop-brochure-2026.pdf'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none w-full sm:w-36 bg-[#581C87] hover:bg-[#4C1D95] text-white rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>{doc.downloadPdfText || 'Download PDF'}</span>
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Bottom Institutional Request Callout Banner */}
        <div className="mt-12 bg-[#FAF5FF] border border-[#E9D5FF] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xs">
          <div className="max-w-3xl">
            <h3 className="text-lg sm:text-xl font-bold text-[#4C1D95]">
              {ctaBanner.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed">
              {ctaBanner.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
            <a
              href={ctaBanner.secondaryBtnLink || 'mailto:info@pro-guide.in'}
              className="flex-1 sm:flex-none text-center bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-2xs transition whitespace-nowrap"
            >
              {ctaBanner.secondaryBtnText || 'Email Programme Co-ordinator'}
            </a>

            <Link
              href={ctaBanner.primaryBtnLink || '/contact'}
              className="flex-1 sm:flex-none text-center bg-[#581C87] hover:bg-[#4C1D95] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg shadow-2xs transition whitespace-nowrap"
            >
              {ctaBanner.primaryBtnText || 'Request Call Back'}
            </Link>
          </div>
        </div>
      </main>

      {/* PDF View Modal */}
      {activePdfModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
              <div>
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                  {activePdfModal.badgeText}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-0.5">
                  {activePdfModal.title}
                </h3>
              </div>

              <button
                onClick={() => setActivePdfModal(null)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body Preview / Live PDF Viewer */}
            <div className="w-full flex-1 bg-gray-900 flex flex-col items-center justify-center min-h-[450px] relative overflow-hidden">
              {activePdfModal.viewPdfLink || activePdfModal.downloadPdfLink || activePdfModal.pdfUrl ? (
                <iframe
                  src={
                    activePdfModal.viewPdfLink ||
                    activePdfModal.downloadPdfLink ||
                    activePdfModal.pdfUrl ||
                    '/files/proguide-workshop-brochure-2026.pdf'
                  }
                  title={activePdfModal.title}
                  className="w-full h-[65vh] border-0 bg-white"
                />
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-md max-w-lg text-center border border-gray-200 my-8">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {activePdfModal.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                    {activePdfModal.description}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500">
              <span>ProGuide Official Educational Publication • Academic Year 2026</span>
              <div className="flex items-center gap-3">
                <a
                  href={
                    activePdfModal.viewPdfLink ||
                    activePdfModal.downloadPdfLink ||
                    activePdfModal.pdfUrl ||
                    '/files/proguide-workshop-brochure-2026.pdf'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 font-semibold hover:underline flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Open in New Tab</span>
                </a>

                <a
                  href={
                    activePdfModal.downloadPdfLink ||
                    activePdfModal.viewPdfLink ||
                    activePdfModal.pdfUrl ||
                    '/files/proguide-workshop-brochure-2026.pdf'
                  }
                  download
                  className="bg-[#581C87] hover:bg-[#4C1D95] text-white px-4 py-1.5 rounded-md text-xs font-semibold shadow-2xs flex items-center gap-1.5 transition"
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download PDF</span>
                </a>

                <button
                  onClick={() => setActivePdfModal(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md text-xs font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResourceLibraryContent
