'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

interface WorkshopDetailProps {
  slug: string
}

const workshopDataMap: Record<string, {
  title: string
  subtitle: string
  category: string
  imageUrl: string
  duration: string
  learners: string
  brochureUrl: string
  registrationUrl: string
  designationBullets: string[]
  academicContent: {
    heading: string
    subheadings: { title: string; bullets: string[] }[]
  }
  whyTrainBullets: string[]
  experienceContent: string[]
  teachingPhilosophy: string[]
}> = {
  'basic-3d-temporal-bone-dissection-workshop': {
    title: 'Basic 3D Temporal Bone Dissection Workshop',
    subtitle: 'High-Fidelity Otology Simulation, Station-Based Hands-On Micro-Dissection Training',
    category: 'Otology & Temporal Bone',
    imageUrl: '/images/ws_lab.jpg',
    duration: '1 Day Hands-on',
    learners: '1:1 Station Ratio',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
    designationBullets: [
      'Senior Consultants & Junior ENT Surgeons seeking anatomical confidence in temporal bone dissection.',
      'Otology Fellows & Post-Graduate Residents preparing for middle ear and mastoid surgical procedures.',
      'Surgeons wanting dedicated 1-on-1 faculty mentoring at fully equipped micro-dissection workstations.',
    ],
    academicContent: {
      heading: 'Procedural & Surgical Dissection Coverage',
      subheadings: [
        {
          title: 'Cortical Mastoidectomy (Initial Steps)',
          bullets: [
            'Identification of spine of Henle, Macewen triangle, and dural/sigmoid sinus landmarks.',
            'Systematic drilling of mastoid cortex with irrigation and bone dust management.',
          ],
        },
        {
          title: 'Antrostomy & Facial Canal Identification',
          bullets: [
            'Opening of the aditus ad antrum and exposure of the incus short process.',
            'Skeletonization of the fallopian canal and chorda tympani nerve under high magnification.',
          ],
        },
        {
          title: 'Posterior Tympanotomy',
          bullets: [
            'Delineation of the facial recess triangle (facial nerve, chorda tympani, annulus).',
            'Direct endoscopic and microscopic view into the tympanic cavity through posterior tympanotomy.',
          ],
        },
      ],
    },
    whyTrainBullets: [
      'Learn from top-tier national faculty with decades of micro-otology and cadaveric dissection teaching experience.',
      'Gain unmatched anatomical clarity on anatomically precise 3D temporal bone simulation models with bone-like haptic feedback.',
      'Supervised practice with real-time faculty corrections, procedural checklists, and official CME participation certificate.',
    ],
    experienceContent: [
      'Hands-on workstation setup with high-resolution operating microscopes and precision surgical drills.',
      'Step-by-step live faculty demonstration broadcasted to individual workstations before each dissection phase.',
      'Post-dissection specimen evaluation and individual feedback session with faculty.',
    ],
    teachingPhilosophy: [
      'Patient safety begins with anatomical precision in the dissection lab before entering the operating theatre.',
      'Every delegate operates on a 1:1 dedicated 3D model to maximize drill time and procedural confidence.',
      'Interactive, non-intimidating mentorship fostering open Q&A and step-by-step skill mastery.',
    ],
  },
  'advanced-temporal-bone-dissection-workshop': {
    title: 'Advanced Temporal Bone Dissection Workshop',
    subtitle: 'Complex Otology & Skull Base Approaches on Anatomically Accurate 3D Bone Models',
    category: 'Skull Base & Advanced Otology',
    imageUrl: '/images/ws_faculty.jpg',
    duration: '1 Day Hands-on',
    learners: '1:1 Station Ratio',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
    designationBullets: [
      'Practicing ENT Specialists and Neurotologists expanding into skull base surgery.',
      'Surgeons wanting advanced exposure to petrous apex, labyrinthectomy, and facial nerve decompression.',
    ],
    academicContent: {
      heading: 'Advanced Surgical & Skull Base Coverage',
      subheadings: [
        {
          title: 'Extended Mastoidectomy & Labyrinthectomy',
          bullets: [
            'Complete drilling of semicircular canals (lateral, superior, posterior).',
            'Translabyrinthine opening into the internal auditory canal (IAC).',
          ],
        },
        {
          title: 'Facial Nerve Decompression & Grafting',
          bullets: [
            'Full decompression from geniculate ganglion to stylomastoid foramen.',
            'Simulated nerve transposition and re-anastomosis techniques.',
          ],
        },
      ],
    },
    whyTrainBullets: [
      'Master high-risk anatomical zones without surgical hazard using high-fidelity 3D skull base models.',
      'Work side-by-side with leading neurotologists and lateral skull base surgeons.',
    ],
    experienceContent: [
      'Advanced drill burs, continuous suction-irrigation, and micro-instruments provided at each station.',
      'In-depth discussion on managing intraoperative vascular and neural variations.',
    ],
    teachingPhilosophy: [
      'Refining microsurgical dexterity through structured repetition and direct expert oversight.',
    ],
  },
  'cochlear-implant-surgery-workshop': {
    title: 'Cochlear Implant Surgery Workshop',
    subtitle: 'Station-Based Hands-On Implant Insertion & Posterior Tympanotomy Masterclass',
    category: 'Cochlear Implantation',
    imageUrl: '/images/ws_lecture.jpg',
    duration: '1 Day Masterclass',
    learners: '1:1 Station Ratio',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
    designationBullets: [
      'ENT Surgeons aiming to initiate or refine their cochlear implant surgical practice.',
      'Surgical teams seeking hands-on electrode array insertion training.',
    ],
    academicContent: {
      heading: 'Cochlear Implant Procedural Training',
      subheadings: [
        {
          title: 'Posterior Tympanotomy & Round Window Exposure',
          bullets: [
            'Precise facial recess opening to visualize the round window membrane.',
            'Cochleostomy vs. round window approach techniques.',
          ],
        },
        {
          title: 'Electrode Array Insertion Technique',
          bullets: [
            'Simulated electrode array insertion through round window into scala tympani.',
            'Fixation of internal receiver-stimulator package.',
          ],
        },
      ],
    },
    whyTrainBullets: [
      'Realistic internal ear micro-structures providing accurate tactile feedback during electrode insertion.',
      'Faculty guidance on surgical pitfalls, soft surgery concepts, and electrode preservation.',
    ],
    experienceContent: [
      'Comprehensive hands-on training combining surgical drilling, video tutorials, and live technique analysis.',
    ],
    teachingPhilosophy: [
      'Enabling precision otologic technology through tactile, hands-on simulation training.',
    ],
  },
}

// Fallback data for any unspecified workshop slug
const defaultWorkshopDetail = {
  title: '3D Simulation Surgical Workshop',
  subtitle: 'KBI SkillBridge • Hands-On Faculty-Led Dissection Workshop',
  category: 'ENT & Surgical Training',
  imageUrl: '/images/ws_lab.jpg',
  duration: '1-2 Days Hands-On',
  learners: '1:1 Station Ratio',
  brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
  registrationUrl: 'https://pro-guide.in/',
  designationBullets: [
    'ENT Surgeons, Otology Fellows, Residents, and Medical Professionals.',
    'Delegates seeking hands-on surgical practice on anatomically accurate 3D simulation models.',
  ],
  academicContent: {
    heading: 'Academic & Surgical Procedural Coverage',
    subheadings: [
      {
        title: 'Step-by-Step Surgical Dissection',
        bullets: [
          'Anatomical landmark identification under magnification.',
          'Systematic hands-on procedural steps guided by expert faculty.',
        ],
      },
      {
        title: 'Workstation Practice & Technique Mastery',
        bullets: [
          'Direct supervision and 1:1 feedback at dedicated workstations.',
          'Comprehensive procedural checklist completion.',
        ],
      },
    ],
  },
  whyTrainBullets: [
    'Learn from highly experienced faculty with advanced surgical training and teaching expertise.',
    'Gain in-depth anatomical mastery with high-fidelity 3D simulation models.',
    'Receive dedicated continuous mentoring and an official CME participation certificate.',
  ],
  experienceContent: [
    'Workstation equipped with high-resolution magnification and professional surgical instruments.',
    'Live faculty demonstration before each surgical step.',
    'Post-workshop Q&A and procedural certificate award.',
  ],
  teachingPhilosophy: [
    'Patient safety begins with anatomical precision in hands-on lab training.',
    '1:1 station ratio ensuring every surgeon gets maximum dedicated operating time.',
    'Mentorship aimed at building long-term surgical confidence.',
  ],
}

export const WorkshopDetailContent: React.FC<WorkshopDetailProps> = ({ slug }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'experience' | 'philosophy'>('details')
  const { addToCart } = useCart()
  const router = useRouter()

  const formattedSlug = slug?.toLowerCase() || ''
  const details = workshopDataMap[formattedSlug] || {
    ...defaultWorkshopDetail,
    title: slug
      ? slug
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      : defaultWorkshopDetail.title,
  }

  const handleAddToCart = () => {
    addToCart({
      id: formattedSlug || details.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: details.title,
      price: 20000,
      imageUrl: details.imageUrl,
      quantity: 1,
    })
    router.push('/cart')
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Top Banner - Dark Purple (Exact color & style from Image 1) */}
      <div className="bg-[#4A148C] text-white py-10 md:py-14 px-6 shadow-md">
        <div className="max-w-[1200px] mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-2 leading-tight">
            {details.title}
          </h1>
          <p className="text-purple-200 text-sm md:text-base font-normal max-w-3xl">
            {details.subtitle}
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Left Column: Back button + Tabbed Details */}
          <div>
            {/* Back Link */}
            <div className="mb-6">
              <Link
                href="/workshops"
                className="inline-flex items-center text-[13.5px] font-medium text-gray-600 hover:text-[#4A148C] transition-colors"
              >
                &lt; Back to workshops
              </Link>
            </div>

            {/* Tabs Header */}
            <div className="bg-white border border-gray-200 rounded-t-xl overflow-hidden flex border-b">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`flex-1 py-3 px-4 text-center font-semibold text-sm transition-all border-b-2 ${
                  activeTab === 'details'
                    ? 'border-[#E67E22] text-[#4A148C] bg-[#FFF5F7]'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Personal Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('experience')}
                className={`flex-1 py-3 px-4 text-center font-semibold text-sm transition-all border-b-2 ${
                  activeTab === 'experience'
                    ? 'border-[#E67E22] text-[#4A148C] bg-[#FFF5F7]'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Professional Experience
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('philosophy')}
                className={`flex-1 py-3 px-4 text-center font-semibold text-sm transition-all border-b-2 ${
                  activeTab === 'philosophy'
                    ? 'border-[#E67E22] text-[#4A148C] bg-[#FFF5F7]'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Teaching Philosophy
              </button>
            </div>

            {/* Tab Content Box (matching the soft pink/purple tint background in Image 1) */}
            <div className="bg-[#FFF8FA] border border-t-0 border-gray-200 rounded-b-xl p-6 md:p-8 space-y-8 shadow-sm">
              {activeTab === 'details' && (
                <>
                  {/* Designation / Target Audience */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">Target Audience & Designation</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 leading-relaxed">
                      {details.designationBullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Academic / Procedural Background */}
                  <div className="border-t border-gray-200/80 pt-6">
                    <h3 className="text-base font-bold text-gray-900 mb-3">
                      {details.academicContent.heading}
                    </h3>
                    <div className="space-y-4">
                      {details.academicContent.subheadings.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-1.5">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-900">
                            {sub.title}
                          </h4>
                          <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-700 leading-relaxed">
                            {sub.bullets.map((b, bIdx) => (
                              <li key={bIdx}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why Train Under Section */}
                  <div className="border-t border-gray-200/80 pt-6">
                    <h3 className="text-base font-bold text-gray-900 mb-3">
                      Why Train Under KBI SkillBridge & ProGuide?
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 leading-relaxed">
                      {details.whyTrainBullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {activeTab === 'experience' && (
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-3">
                    Professional Hands-on Experience & Infrastructure
                  </h3>
                  <ul className="list-disc list-inside space-y-3 text-sm text-gray-700 leading-relaxed">
                    {details.experienceContent.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'philosophy' && (
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-3">
                    Teaching & Mentorship Philosophy
                  </h3>
                  <ul className="list-disc list-inside space-y-3 text-sm text-gray-700 leading-relaxed">
                    {details.teachingPhilosophy.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Floating Sidebar Card (Exact design from Image 1) */}
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
              {/* Card Image Banner */}
              <div className="relative h-48 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={details.imageUrl}
                  alt={details.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#4A148C] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  {details.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-600 border-b border-gray-100 pb-3">
                  <span className="flex items-center gap-1 font-medium">
                    ⏱️ {details.duration}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    👥 {details.learners}
                  </span>
                  <span className="text-base" title="India & International">
                    🇮🇳
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="block w-full text-center bg-[#4A148C] hover:bg-[#3b0764] text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg text-sm cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <a
                    href={details.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center border border-[#4A148C] text-[#4A148C] hover:bg-purple-50 font-semibold py-2.5 rounded-xl transition-colors text-xs"
                  >
                    Download Brochure
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkshopDetailContent
