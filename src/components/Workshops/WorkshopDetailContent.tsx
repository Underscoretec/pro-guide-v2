'use client'

import React, { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { registerForWorkshop } from '@/lib/workshops/registration'
import type { WorkshopDetailItem } from '@/lib/payload/workshopDetails'

interface WorkshopDetailProps {
  slug: string
  data?: WorkshopDetailItem | null
  isRegistered?: boolean
}

type TabKey = 'about' | 'faculty' | 'dates' | 'faq'

interface FacultyMember {
  name: string
  role: string
  bio: string
  avatarBg: string
}

interface FaqItem {
  id: number
  question: string
  answer: string
}

const facultyList: FacultyMember[] = [
  {
    name: 'Dr. Milind Kirtane',
    role: 'Senior ENT and Neurotology Faculty',
    bio: 'Leads the hands-on dissection stations and the facial nerve decompression module.',
    avatarBg: 'bg-[#6B21A8]',
  },
  {
    name: 'Dr. Prashant Naik',
    role: 'Lateral Skull Base Surgeon',
    bio: 'Teaches translabyrinthine approaches and internal auditory canal exposure.',
    avatarBg: 'bg-[#EA580C]',
  },
  {
    name: 'Dr. Rohan Patil',
    role: 'Neurotologist',
    bio: 'Guides nerve transposition and re-anastomosis practice on 3D models.',
    avatarBg: 'bg-[#0284C7]',
  },
]

const faqList: FaqItem[] = [
  {
    id: 1,
    question: 'Who can attend this workshop?',
    answer:
      'Practising ENT specialists and neurotologists expanding into skull base surgery. Trainees are welcome subject to seat availability.',
  },
  {
    id: 2,
    question: 'What is included in the fee?',
    answer:
      'Full 1-day hands-on workstation access, dedicated 3D bone simulation models, operating microscope & micro-drill burs, course materials, lunch & refreshments, and CME certificate of completion.',
  },
  {
    id: 3,
    question: 'Can I choose my date and time?',
    answer:
      'Yes, you can choose your preferred workshop date and time slot using the "Select date & time" button on this page.',
  },
  {
    id: 4,
    question: 'How do I get my ticket?',
    answer:
      'Once your slot is reserved, your digital ticket, workshop itinerary, and workstation confirmation will be sent directly to your registered email.',
  },
  {
    id: 5,
    question: 'What should I bring?',
    answer:
      'All dissection equipment, protective gear, microscopes, and 3D simulation bone models are provided. Simply bring your registration confirmation ID.',
  },
]

const defaultFeeInclusions: string[] = [
  'Full hands-on workstation access with dedicated 3D simulation bone model',
  'High-resolution operating microscope, micro-drill burs & continuous irrigation',
  '1-on-1 direct faculty supervision, step-by-step guidance & procedural critique',
  'Official CME accreditation certificate and lunch & refreshments',
]

const workshopDataMap: Record<
  string,
  {
    title: string
    subtitle: string
    category: string
    imageUrl: string
    duration: string
    learners: string
    fee: string
    gst: string
    total: string
    internationalFee: string
    brochureUrl: string
    registrationUrl: string
    designationBullets: string[]
    academicContent: {
      heading: string
      subheadings: { title: string; bullets: string[] }[]
    }
    whyTrainBullets: string[]
  }
> = {
  'advanced-temporal-bone-dissection-workshop': {
    title: 'Advanced Temporal Bone Dissection Workshop',
    subtitle: 'Complex Otology & Skull Base Approaches on Anatomically Accurate 3D Bone Models',
    category: 'SKULL BASE & ADVANCED OTOLOGY',
    imageUrl: '/images/ws_faculty.jpg',
    duration: '1 Day Hands-on',
    learners: '1:1 Station Ratio',
    fee: '₹45,000',
    gst: '₹8,100',
    total: '₹53,100',
    internationalFee: '$699, no GST.',
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
          title: 'EXTENDED MASTOIDECTOMY & LABYRINTHECTOMY',
          bullets: [
            'Complete drilling of semicircular canals (lateral, superior, posterior).',
            'Translabyrinthine opening into the internal auditory canal (IAC).',
          ],
        },
        {
          title: 'FACIAL NERVE DECOMPRESSION & GRAFTING',
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
  },
  'basic-3d-temporal-bone-dissection-workshop': {
    title: 'Basic 3D Temporal Bone Dissection Workshop',
    subtitle: 'High-Fidelity Otology Simulation, Station-Based Hands-On Micro-Dissection Training',
    category: 'OTOLOGY & TEMPORAL BONE',
    imageUrl: '/images/ws_lab.jpg',
    duration: '1 Day Hands-on',
    learners: '1:1 Station Ratio',
    fee: '₹40,000',
    gst: '₹7,200',
    total: '₹47,200',
    internationalFee: '$599, no GST.',
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
          title: 'CORTICAL MASTOIDECTOMY (INITIAL STEPS)',
          bullets: [
            'Identification of spine of Henle, Macewen triangle, and dural/sigmoid sinus landmarks.',
            'Systematic drilling of mastoid cortex with irrigation and bone dust management.',
          ],
        },
        {
          title: 'ANTROSTOMY & FACIAL CANAL IDENTIFICATION',
          bullets: [
            'Opening of the aditus ad antrum and exposure of the incus short process.',
            'Skeletonization of the fallopian canal and chorda tympani nerve under high magnification.',
          ],
        },
        {
          title: 'POSTERIOR TYMPANOTOMY',
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
  },
  'cochlear-implant-surgery-workshop': {
    title: 'Cochlear Implant Surgery Workshop',
    subtitle: 'Station-Based Hands-On Implant Insertion & Posterior Tympanotomy Masterclass',
    category: 'COCHLEAR IMPLANTATION',
    imageUrl: '/images/ws_lecture.jpg',
    duration: '1 Day Masterclass',
    learners: '1:1 Station Ratio',
    fee: '₹48,000',
    gst: '₹8,640',
    total: '₹56,640',
    internationalFee: '$749, no GST.',
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
          title: 'POSTERIOR TYMPANOTOMY & ROUND WINDOW EXPOSURE',
          bullets: [
            'Precise facial recess opening to visualize the round window membrane.',
            'Cochleostomy vs. round window approach techniques.',
          ],
        },
        {
          title: 'ELECTRODE ARRAY INSERTION TECHNIQUE',
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
  },
}

const defaultWorkshopDetail = {
  title: 'Advanced Temporal Bone Dissection Workshop',
  subtitle: 'Complex Otology & Skull Base Approaches on Anatomically Accurate 3D Bone Models',
  category: 'SKULL BASE & ADVANCED OTOLOGY',
  imageUrl: '/images/ws_faculty.jpg',
  duration: '1 Day Hands-on',
  learners: '1:1 Station Ratio',
  fee: '₹45,000',
  gst: '₹8,100',
  total: '₹53,100',
  internationalFee: '$699, no GST.',
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
        title: 'EXTENDED MASTOIDECTOMY & LABYRINTHECTOMY',
        bullets: [
          'Complete drilling of semicircular canals (lateral, superior, posterior).',
          'Translabyrinthine opening into the internal auditory canal (IAC).',
        ],
      },
      {
        title: 'FACIAL NERVE DECOMPRESSION & GRAFTING',
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
}

export const WorkshopDetailContent: React.FC<WorkshopDetailProps> = ({
  slug,
  data,
  isRegistered = false,
}) => {
  const [activeTab, setActiveTab] = useState<TabKey>('about')
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)
  const [isDateModalOpen, setIsDateModalOpen] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const { addToCart, isLoggedIn } = useCart()
  const router = useRouter()
  const [registerPending, startRegister] = useTransition()
  const [registerError, setRegisterError] = useState('')

  const formattedSlug = slug?.toLowerCase() || ''
  const fallback = workshopDataMap[formattedSlug] || {
    ...defaultWorkshopDetail,
    title: slug
      ? slug
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')
      : defaultWorkshopDetail.title,
  }

  const pick = <T,>(value: T | undefined, fb: T): T =>
    Array.isArray(value) ? (value.length ? value : fb) : value || fb

  const details = data
    ? {
        ...fallback,
        title: pick(data.title, fallback.title),
        subtitle: pick(data.subtitle, fallback.subtitle),
        category: pick(data.category, fallback.category),
        cluster: data.cluster || data.category || fallback.category,
        facultyLeadName: data.facultyLeadName || 'Dr. Milind Kirtane & Team',
        cmeCredits: data.cmeCredits || '4 credits',
        language: data.language || 'English',
        faculty: Array.isArray(data.faculty) && data.faculty.length > 0 ? data.faculty : facultyList,
        feeInclusions:
          Array.isArray(data.feeInclusions) && data.feeInclusions.length > 0
            ? data.feeInclusions
            : defaultFeeInclusions,
        faq: Array.isArray(data.faq) && data.faq.length > 0 ? data.faq : faqList,
        deliveryMode: data.deliveryMode || 'offline',
        imageUrl: pick(data.imageUrl, fallback.imageUrl),
        duration: pick(data.duration, fallback.duration),
        learners: pick(data.learners, fallback.learners),
        description: data.description || '',
        fee: data.feeFormatted || fallback.fee,
        gst: data.gstFormatted || fallback.gst,
        total: data.totalFormatted || fallback.total,
        internationalFee: data.internationalFee || fallback.internationalFee,
        priceINR: data.priceINR || 45000,
        priceUSD: data.priceUSD || 499,
        seatsPerSession: data.seatsPerSession || (data.deliveryMode === 'offline' ? 40 : 500),
        booking: data.booking !== false,
        datesAndTimeSlots: data.datesAndTimeSlots || [],
        onlineLiveDetails: data.onlineLiveDetails,
        offlineDetails: data.offlineDetails,
        onlineRecordedDetails: data.onlineRecordedDetails,
        venueName:
          data.deliveryMode === 'online_live'
            ? (data.onlineLiveDetails?.platform || 'Zoom')
            : data.deliveryMode === 'online_recorded'
              ? 'Online Video Portal'
              : (data.offlineDetails?.venueName || 'Tata Memorial Hospital'),
        fullAddress:
          data.offlineDetails?.fullAddress || 'Dr E Borges Road, Parel, Mumbai 400012',
        reportingTime:
          data.offlineDetails?.reportingTime || '30 minutes before the slot',
        designationBullets: pick(data.designationBullets, fallback.designationBullets),
        academicContent: {
          heading: pick(data.academicContent.heading, fallback.academicContent.heading),
          subheadings: pick(data.academicContent.subheadings, fallback.academicContent.subheadings),
        },
        whyTrainBullets: pick(data.whyTrainBullets, fallback.whyTrainBullets),
      }
    : {
        ...fallback,
        cluster: fallback.category,
        deliveryMode: 'offline' as const,
        description: '',
        priceINR: 45000,
        priceUSD: 499,
        seatsPerSession: 40,
        booking: true,
        facultyLeadName: 'Dr. Milind Kirtane & Team',
        cmeCredits: '4 credits',
        language: 'English',
        faculty: facultyList,
        feeInclusions: defaultFeeInclusions,
        faq: faqList,
        datesAndTimeSlots: [],
        venueName: 'Tata Memorial Hospital',
        fullAddress: 'Dr E Borges Road, Parel, Mumbai 400012',
        reportingTime: '30 minutes before the slot',
      }

  interface SlotDetail {
    startTime: string
    endTime: string
    label: string
    seats: number
    registrationsCount: number
    availableSeats: number
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  // Parse full date (year, month, day) dynamically from Payload CMS
  const parseDateParts = (dateStr: string): { year: number; month: number; day: number } | null => {
    if (!dateStr) return null
    const clean = String(dateStr).trim()
    // YYYY-MM-DD
    const ymd = clean.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/)
    if (ymd) {
      return {
        year: parseInt(ymd[1], 10),
        month: parseInt(ymd[2], 10) - 1,
        day: parseInt(ymd[3], 10),
      }
    }
    // DD-MM-YYYY
    const dmy = clean.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})/)
    if (dmy) {
      return {
        year: parseInt(dmy[3], 10),
        month: parseInt(dmy[2], 10) - 1,
        day: parseInt(dmy[1], 10),
      }
    }
    const d = new Date(clean)
    if (!isNaN(d.getTime())) {
      return {
        year: d.getFullYear(),
        month: d.getMonth(),
        day: d.getDate(),
      }
    }
    return null
  }

  const defaultCapacity =
    details.deliveryMode === 'online_recorded'
      ? 999999
      : details.deliveryMode === 'online_live'
        ? (details.seatsPerSession || 500)
        : (('offlineDetails' in details ? details.offlineDetails?.seatsPerSessionOffline : undefined) || details.seatsPerSession || 40)

  const dateSlotDetailsMap: Record<string, SlotDetail[]> = {}
  const dateSlotsMap: Record<string, string[]> = {}
  let firstParsedDate: { year: number; month: number; day: number } | null = null

  if (details.datesAndTimeSlots && details.datesAndTimeSlots.length > 0) {
    for (const d of details.datesAndTimeSlots) {
      const parts = parseDateParts(d.date)
      if (parts) {
        if (!firstParsedDate) {
          firstParsedDate = parts
        }
        const key = `${parts.year}-${parts.month}-${parts.day}`
        const slotObjs: SlotDetail[] = (d.slots || []).map((s: any) => {
          const startTime = s.startTime || ''
          const endTime = s.endTime || ''
          const label = endTime ? `${startTime} – ${endTime}` : startTime
          const capacity = typeof s.seats === 'number' && s.seats > 0 ? s.seats : defaultCapacity
          const regCount = typeof s.registrationsCount === 'number' ? s.registrationsCount : 0
          const availableSeats = Math.max(0, capacity - regCount)

          return {
            startTime,
            endTime,
            label,
            seats: capacity,
            registrationsCount: regCount,
            availableSeats,
          }
        })

        if (slotObjs.length > 0) {
          dateSlotDetailsMap[key] = slotObjs
          dateSlotsMap[key] = slotObjs.map((s) => s.label)
        } else {
          const fallbackTimes = ['02:00 PM', '04:30 PM', '06:00 PM', '08:30 PM']
          dateSlotsMap[key] = fallbackTimes
          dateSlotDetailsMap[key] = fallbackTimes.map((t) => ({
            startTime: t,
            endTime: '',
            label: t,
            seats: defaultCapacity,
            registrationsCount: 0,
            availableSeats: defaultCapacity,
          }))
        }
      }
    }
  }

  // Fallback dates (Nov 2026) if none provided in DB
  const defaultFallbackDays = [18, 19, 20, 21, 22, 25, 26, 27, 28, 29]
  if (Object.keys(dateSlotsMap).length === 0) {
    defaultFallbackDays.forEach((day) => {
      const key = `2026-10-${day}`
      const fallbackTimes = ['02:00 PM', '04:30 PM', '06:00 PM', '08:30 PM']
      dateSlotsMap[key] = fallbackTimes
      dateSlotDetailsMap[key] = fallbackTimes.map((t) => ({
        startTime: t,
        endTime: '',
        label: t,
        seats: defaultCapacity,
        registrationsCount: 0,
        availableSeats: defaultCapacity,
      }))
    })
  }

  const initialYear = firstParsedDate ? firstParsedDate.year : 2026
  const initialMonth = firstParsedDate ? firstParsedDate.month : 10
  const initialDay = firstParsedDate ? firstParsedDate.day : 18

  const [calendarYear, setCalendarYear] = useState<number>(initialYear)
  const [calendarMonth, setCalendarMonth] = useState<number>(initialMonth)
  const [selectedYear, setSelectedYear] = useState<number>(initialYear)
  const [selectedMonth, setSelectedMonth] = useState<number>(initialMonth)
  const [selectedDay, setSelectedDay] = useState<number>(initialDay)

  const selectedDateKey = `${selectedYear}-${selectedMonth}-${selectedDay}`
  const currentSlotDetails = dateSlotDetailsMap[selectedDateKey] || []
  const timeSlots = dateSlotsMap[selectedDateKey] || ['02:00 PM', '04:30 PM', '06:00 PM', '08:30 PM']
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(timeSlots[0] || '02:00 PM')

  const handlePrevMonth = () => {
    setCalendarMonth((prev) => {
      if (prev === 0) {
        setCalendarYear((y) => y - 1)
        return 11
      }
      return prev - 1
    })
  }

  const handleNextMonth = () => {
    setCalendarMonth((prev) => {
      if (prev === 11) {
        setCalendarYear((y) => y + 1)
        return 0
      }
      return prev + 1
    })
  }

  const firstDayWeekday = new Date(calendarYear, calendarMonth, 1).getDay()
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate()

  // Calculate available days for the currently viewed month
  const availableDaysInCurrentMonth: number[] = []
  for (let day = 1; day <= daysInMonth; day++) {
    const key = `${calendarYear}-${calendarMonth}-${day}`
    if (dateSlotsMap[key]) {
      availableDaysInCurrentMonth.push(day)
    }
  }

  const activeSlotDetail =
    currentSlotDetails.find(
      (s) =>
        s.label === selectedTimeSlot ||
        s.startTime === selectedTimeSlot ||
        selectedTimeSlot.includes(s.startTime) ||
        s.label.includes(selectedTimeSlot)
    ) || currentSlotDetails[0]

  const activeAvailableSeats = activeSlotDetail
    ? activeSlotDetail.availableSeats
    : details.deliveryMode === 'online_recorded'
      ? 'Unlimited'
      : (details.seatsPerSession || defaultCapacity)

  const handleRegister = () => {
    if (!isLoggedIn) {
      router.push(`/sign-up?redirect=${encodeURIComponent(`/workshops/${formattedSlug}`)}`)
      return
    }
    setRegisterError('')
    startRegister(async () => {
      const res = await registerForWorkshop(formattedSlug, details.title)
      if (res.success) router.refresh()
      else setRegisterError(res.error || 'Could not register. Please try again.')
    })
  }

  const handleConfirmSlot = () => {
    setIsDateModalOpen(false)
    router.push(
      `/workshops/${formattedSlug}/enroll?year=${selectedYear}&month=${selectedMonth}&date=${selectedDay}&time=${encodeURIComponent(selectedTimeSlot)}`
    )
  }

  const getDayName = (year: number, month: number, day: number) => {
    const dateObj = new Date(year, month, day)
    return dateObj.toLocaleDateString('en-US', { weekday: 'long' })
  }

  const leadName =
    details.facultyLeadName ||
    details.faculty?.[0]?.name ||
    (details.deliveryMode === 'offline'
      ? 'Dr. Milind Kirtane & Team'
      : 'Prof. Chittaranjan N. Purandare')

  const getInitials = (name: string): string => {
    if (!name) return 'MK'
    const cleaned = name.replace(/^(Dr\.|Prof\.|Mr\.|Mrs\.|Ms\.)\s+/i, '').trim()
    const parts = cleaned.split(/\s+/).filter(Boolean)
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }

  const leadInitials = getInitials(leadName)
  const clusterLabel = details.cluster || details.category || 'ENT & Surgical Training'

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-800">
      {/* Top Banner - Deep Rich Purple */}
      <div className="bg-[#4F1787] text-white pt-10 pb-16 md:pt-14 md:pb-24 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-[1280px] mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold tracking-tight mb-3 leading-snug">
              {details.title}
            </h1>
            <p className="text-purple-200 text-sm sm:text-base font-normal leading-relaxed">
              {details.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left Column: Back Link + Tabs + Active Tab Content */}
          <div className="pt-4">
            {/* Back to workshops link */}
            <div className="mb-4">
              <Link
                href="/workshops"
                className="inline-flex items-center text-xs sm:text-[13px] font-medium text-[#4F1787] hover:underline transition-colors"
              >
                ‹ Back to workshops
              </Link>
            </div>

            {/* Navigation Tabs Header */}
            <div className="bg-white border border-b-0 border-gray-200 rounded-t-lg overflow-hidden flex">
              <button
                type="button"
                onClick={() => setActiveTab('about')}
                className={`flex-1 py-3.5 px-3 text-center text-xs sm:text-sm font-semibold transition-all border-b-2 ${
                  activeTab === 'about'
                    ? 'border-[#4F1787] text-[#4F1787] bg-[#F4EEFB]'
                    : 'border-transparent text-gray-700 hover:text-[#4F1787] hover:bg-gray-50'
                }`}
              >
                About the Workshop
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('faculty')}
                className={`flex-1 py-3.5 px-3 text-center text-xs sm:text-sm font-semibold transition-all border-b-2 ${
                  activeTab === 'faculty'
                    ? 'border-[#4F1787] text-[#4F1787] bg-[#F4EEFB]'
                    : 'border-transparent text-gray-700 hover:text-[#4F1787] hover:bg-gray-50'
                }`}
              >
                Faculty
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('dates')}
                className={`flex-1 py-3.5 px-3 text-center text-xs sm:text-sm font-semibold transition-all border-b-2 ${
                  activeTab === 'dates'
                    ? 'border-[#4F1787] text-[#4F1787] bg-[#F4EEFB]'
                    : 'border-transparent text-gray-700 hover:text-[#4F1787] hover:bg-gray-50'
                }`}
              >
                Dates & Fee
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('faq')}
                className={`flex-1 py-3.5 px-3 text-center text-xs sm:text-sm font-semibold transition-all border-b-2 ${
                  activeTab === 'faq'
                    ? 'border-[#4F1787] text-[#4F1787] bg-[#F4EEFB]'
                    : 'border-transparent text-gray-700 hover:text-[#4F1787] hover:bg-gray-50'
                }`}
              >
                FAQ
              </button>
            </div>

            {/* Tab Body Card */}
            <div className="bg-white border border-gray-200 rounded-b-lg p-6 sm:p-8 shadow-xs">
              {/* TAB 1: About the Workshop */}
              {activeTab === 'about' && (
                <div className="space-y-7">
                  {/* Target Audience & Designation */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-3">
                      Target Audience & Designation
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                      {details.designationBullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-gray-900 font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Advanced Surgical & Skull Base Coverage */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-base font-bold text-gray-900 mb-4">
                      {details.academicContent.heading}
                    </h3>
                    <div className="space-y-5">
                      {details.academicContent.subheadings.map((sub, sIdx) => (
                        <div key={sIdx} className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#4F1787]">
                            {sub.title}
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                            {sub.bullets.map((b, bIdx) => (
                              <li key={bIdx} className="flex items-start gap-2.5">
                                <span className="text-gray-900 font-bold">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why Train Under Section */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-base font-bold text-gray-900 mb-3">
                      Why Train Under KBI SkillBridge & ProGuide?
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                      {details.whyTrainBullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-gray-900 font-bold">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 2: Faculty */}
              {activeTab === 'faculty' && (
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-5">Faculty</h3>
                  <div className="space-y-4">
                    {details.faculty.map((fac, idx) => {
                      const isHex = fac.avatarBg && fac.avatarBg.startsWith('#')
                      const isClass = fac.avatarBg && fac.avatarBg.startsWith('bg-')
                      const bgClass = isClass ? fac.avatarBg : isHex ? '' : 'bg-[#6B21A8]'
                      const inlineStyle = isHex ? { backgroundColor: fac.avatarBg } : undefined

                      return (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded-lg p-5 flex items-start gap-4 transition hover:border-gray-300"
                        >
                          {/* Person Silhouette Avatar */}
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${bgClass} text-white flex items-center justify-center shrink-0 shadow-xs`}
                            style={inlineStyle}
                          >
                            <svg
                              className="w-7 h-7 sm:w-8 sm:h-8"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          </div>
                          {/* Faculty Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                              {fac.name}
                            </h4>
                            {fac.role && (
                              <p className="text-xs font-semibold text-[#4F1787] mt-0.5">
                                {fac.role}
                              </p>
                            )}
                            {fac.bio && (
                              <p className="text-xs sm:text-[13px] text-gray-600 mt-1.5 leading-relaxed">
                                {fac.bio}
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: Dates & Fee */}
              {activeTab === 'dates' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-2">
                      Upcoming Workshop Dates & Fee Structure
                    </h3>
                    <p className="text-xs text-gray-500 mb-5">
                      {details.deliveryMode === 'online_recorded'
                        ? 'Instant on-demand access to video modules, procedural walk-throughs & masterclass recordings.'
                        : 'Select your preferred date & time slot for structured faculty-led training.'}
                    </p>
                  </div>

                  {/* Schedule Card */}
                  <div className="bg-[#FAF8FC] border border-purple-100 rounded-lg p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-100/80">
                      <div>
                        <span className="inline-block text-[11px] font-bold text-[#4F1787] uppercase tracking-wider bg-purple-100/70 px-2.5 py-0.5 rounded-full mb-1.5">
                          {details.deliveryMode === 'online_live'
                            ? 'Online Live Masterclass'
                            : details.deliveryMode === 'online_recorded'
                              ? 'Online Recorded • On Demand'
                              : 'Next Batch'}
                        </span>
                        <h4 className="text-base font-bold text-gray-900">
                          {details.deliveryMode === 'online_recorded'
                            ? 'Instant On-Demand Access'
                            : `${monthNames[selectedMonth]} ${selectedDay}, ${selectedYear} (${getDayName(selectedYear, selectedMonth, selectedDay)})`}
                        </h4>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {details.deliveryMode === 'online_recorded'
                            ? `Full access for ${details.onlineRecordedDetails?.accessWindowDays || 90} days • Includes clinical audit tools & handouts`
                            : `${timeSlots[0] || '02:00 PM CET'} • ${details.duration}`}
                        </p>
                      </div>
                      <button
                        type="button"
                        disabled={!details.booking}
                        onClick={() => setIsDateModalOpen(true)}
                        className={`text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-md transition shadow-xs whitespace-nowrap self-start sm:self-auto ${
                          details.booking
                            ? 'bg-[#4F1787] hover:bg-[#3D0F6B] text-white cursor-pointer'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-60'
                        }`}
                      >
                        {details.booking
                          ? details.deliveryMode === 'online_recorded'
                            ? 'Enroll & Access Now'
                            : 'Select date & time'
                          : 'Booking Paused'}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs">
                      <div>
                        <span className="text-gray-500 block">
                          {details.deliveryMode === 'offline' ? 'Venue' : 'Platform'}
                        </span>
                        <span className="font-semibold text-gray-800">
                          {details.deliveryMode === 'online_live'
                            ? (details.onlineLiveDetails?.platform || 'Zoom Video')
                            : details.deliveryMode === 'online_recorded'
                              ? 'ProGuide Online Portal'
                              : details.venueName}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Ratio / Format</span>
                        <span className="font-semibold text-gray-800">
                          {details.deliveryMode === 'online_live'
                            ? 'Live Interactive'
                            : details.deliveryMode === 'online_recorded'
                              ? 'HD Video Modules'
                              : details.learners}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Capacity</span>
                        <span className="font-semibold text-gray-800">
                          {details.deliveryMode === 'online_recorded'
                            ? 'Immediate Access'
                            : `${details.seatsPerSession} Seats limit`}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 block">Accreditation</span>
                        <span className="font-semibold text-gray-800">EBCOG CME ({details.cmeCredits || '4 credits'})</span>
                      </div>
                    </div>
                  </div>

                  {/* Fee Breakdown Table */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-xs sm:text-sm text-gray-800">
                      Fee Breakdown & Taxes
                    </div>
                    <div className="p-4 space-y-2.5 text-xs sm:text-sm">
                      <div className="flex justify-between text-gray-600">
                        <span>Workshop Registration Fee</span>
                        <span className="font-medium text-gray-900">{details.fee}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Applicable GST (18%)</span>
                        <span className="font-medium text-gray-900">{details.gst}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2.5 flex justify-between font-bold text-sm sm:text-base text-gray-900">
                        <span>Total Amount (India)</span>
                        <span className="text-[#4F1787]">{details.total}</span>
                      </div>
                      <div className="text-xs text-gray-500 pt-1">
                        International delegates: {details.internationalFee}
                      </div>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <div className="bg-gray-50/70 border border-gray-200/80 rounded-lg p-4">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-gray-800 mb-2">
                      What is included in the fee:
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1.5 list-disc list-inside">
                      {details.feeInclusions.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 4: FAQ */}
              {activeTab === 'faq' && (
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-5">
                    Frequently asked questions
                  </h3>
                  <div className="space-y-3">
                    {details.faq.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx
                      return (
                        <div
                          key={faq.id || idx}
                          className="bg-white border border-gray-200 rounded-lg overflow-hidden transition"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full p-4 sm:p-4.5 flex items-center justify-between text-left hover:bg-gray-50/60 transition cursor-pointer"
                          >
                            <div className="flex items-center gap-3 flex-1 pr-4">
                              {/* Number Circle Badge */}
                              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#4F1787] text-white text-xs font-bold flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                {faq.question}
                              </span>
                            </div>
                            {/* Minus / Plus Indicator */}
                            <span className="text-gray-500 font-light text-base sm:text-lg shrink-0">
                              {isOpen ? '—' : '+'}
                            </span>
                          </button>

                          {isOpen && (
                            <div className="px-4 pb-4 sm:px-4.5 sm:pb-4.5 pl-12 sm:pl-13 text-xs sm:text-[13px] text-gray-600 leading-relaxed border-t border-gray-100 pt-2.5">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Floating Sidebar Card */}
          <div className="lg:-mt-24 xl:-mt-28 z-20 sticky top-6">
            <div className="bg-white rounded-lg border border-gray-200/90 shadow-xl overflow-hidden">
              {/* Card Image Banner */}
              <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={details.imageUrl || '/images/ws_faculty.jpg'}
                  alt={details.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3.5 right-3.5 bg-[#4F1787] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10">
                  {details.category}
                </div>
              </div>

              {/* Card Info & Pricing Body */}
              <div className="p-5 space-y-4">
                {/* Meta details row: duration, ratio, country */}
                <div className="flex items-center justify-between text-xs text-gray-700 border-b border-gray-100 pb-3">
                  <span className="flex items-center gap-1.5 font-medium">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {details.duration}
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-800" />
                    {details.learners}
                  </span>
                  <span className="font-bold text-xs text-gray-700 tracking-wide">IN</span>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-1.5 text-xs text-gray-700 pt-0.5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Workshop fee</span>
                    <span className="font-semibold text-gray-900">{details.fee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">GST (18%)</span>
                    <span className="font-semibold text-gray-900">{details.gst}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 flex justify-between items-baseline">
                    <span className="text-sm font-bold text-gray-900">Total</span>
                    <span className="text-base font-bold text-gray-900">{details.total}</span>
                  </div>
                  <div className="text-[11px] text-gray-400">
                    Outside India: {details.internationalFee}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-2.5">
                  {/* Select date & time button */}
                  <button
                    type="button"
                    disabled={!details.booking}
                    onClick={() => setIsDateModalOpen(true)}
                    className={`w-full font-semibold py-3 px-4 rounded-md text-sm transition shadow-sm text-center ${
                      details.booking
                        ? 'bg-[#4F1787] hover:bg-[#3D0F6B] text-white cursor-pointer'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {details.booking ? 'Select date & time' : 'Booking Paused'}
                  </button>

                  {/* Register your interest button */}
                  <button
                    type="button"
                    onClick={handleRegister}
                    disabled={isRegistered || registerPending}
                    className={`w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-medium py-2.5 px-4 rounded-md text-sm transition text-center cursor-pointer ${
                      isRegistered ? 'opacity-80 cursor-not-allowed bg-green-50 text-green-800 border-green-200' : ''
                    }`}
                  >
                    {isRegistered
                      ? 'Already Registered'
                      : registerPending
                        ? 'Registering…'
                        : 'Register your interest'}
                  </button>
                  {registerError && (
                    <p className="text-[12px] text-red-600 mt-1 font-medium">{registerError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CALENDLY DATE & TIME MODAL (Image 4 UI) */}
      {isDateModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fadeIn"
          onClick={() => setIsDateModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full relative border border-gray-200 overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button X */}
            <button
              type="button"
              onClick={() => setIsDateModalOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-700 flex items-center justify-center transition cursor-pointer border border-gray-200/60"
              aria-label="Close modal"
            >
              ✕
            </button>

            {bookingConfirmed ? (
              <div className="p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-gray-900">Date & Time Reserved!</h3>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  You have selected <span className="font-semibold text-gray-900">{getDayName(selectedYear, selectedMonth, selectedDay)}, {monthNames[selectedMonth]} {selectedDay}, {selectedYear} at {selectedTimeSlot} CET</span>.
                </p>
                <p className="text-xs text-gray-500">Your station slot has been held. Proceeding to registration...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {/* Column 1: Workshop & Faculty Info (Image 4 Left Column) */}
                <div className="md:col-span-4 p-6 sm:p-7 flex flex-col justify-between bg-white">
                  <div>
                    {/* Faculty Avatar Initials */}
                    <div className="w-12 h-12 rounded-full bg-[#4F1787] text-white font-bold text-sm flex items-center justify-center mb-3.5 shadow-xs">
                      {leadInitials}
                    </div>

                    <p className="text-xs text-gray-500 font-medium mb-1">
                      {leadName}
                    </p>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-2">
                      {details.title}
                    </h3>

                    {/* Green Pill Badge */}
                    <div className="mb-3">
                      <span className="inline-block bg-[#E8F5E9] text-[#2E7D32] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                        {clusterLabel}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed mb-6">
                      {details.subtitle || details.description}
                    </p>

                    {/* Metadata Specs Table */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Cluster</span>
                        <span className="font-semibold text-gray-900">{clusterLabel}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Date</span>
                        <span className="font-semibold text-gray-900">
                          {details.deliveryMode === 'online_recorded' ? 'On demand (Immediate)' : `${monthNames[selectedMonth]} ${selectedDay}, ${selectedYear}`}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Time</span>
                        <span className="font-semibold text-gray-900">
                          {details.deliveryMode === 'online_recorded' ? 'Self-paced' : `${selectedTimeSlot}`}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Duration</span>
                        <span className="font-semibold text-gray-900">{details.duration}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Venue / platform</span>
                        <span className="font-semibold text-gray-900 text-right max-w-[170px]">
                          {details.deliveryMode === 'online_live'
                            ? (details.onlineLiveDetails?.platform || 'Zoom')
                            : details.deliveryMode === 'online_recorded'
                              ? 'ProGuide Online Portal'
                              : details.venueName}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Seats</span>
                        <span className="font-semibold text-gray-900">
                          {details.deliveryMode === 'online_recorded' ? 'Unlimited' : `${activeAvailableSeats} seats`}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">EBCOG CME</span>
                        <span className="font-semibold text-gray-900">{details.cmeCredits || '4 credits'}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="text-gray-500">Language</span>
                        <span className="font-semibold text-gray-900">{details.language || 'English'}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-500">Fee (INR / USD)</span>
                        <span className="font-semibold text-gray-900">{details.fee} / ${details.priceUSD}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 2: Calendar Picker (Image 4 Middle Column) */}
                <div className="md:col-span-5 p-6 sm:p-7 bg-white flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-4">
                      Select a date and time
                    </h3>

                    {/* Month Navigator */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold text-xs sm:text-sm text-gray-800">
                        {monthNames[calendarMonth]} {calendarYear}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          aria-label="Previous month"
                          className="w-6 h-6 rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100 flex items-center justify-center text-xs transition cursor-pointer"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          aria-label="Next month"
                          className="w-6 h-6 rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100 flex items-center justify-center text-xs transition cursor-pointer"
                        >
                          ›
                        </button>
                      </div>
                    </div>

                    {/* Weekday Header */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] sm:text-[11px] font-semibold text-gray-400 tracking-wider mb-2">
                      <span>SUN</span>
                      <span>MON</span>
                      <span>TUE</span>
                      <span>WED</span>
                      <span>THU</span>
                      <span>FRI</span>
                      <span>SAT</span>
                    </div>

                    {/* Days Matrix */}
                    <div className="grid grid-cols-7 gap-1.5 text-center text-xs">
                      {Array.from({ length: firstDayWeekday }, (_, i) => (
                        <span key={`blank-${i}`} />
                      ))}

                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                        const isAvailable = availableDaysInCurrentMonth.includes(day)
                        const isSelected =
                          selectedYear === calendarYear &&
                          selectedMonth === calendarMonth &&
                          selectedDay === day

                        return (
                          <button
                            key={day}
                            type="button"
                            disabled={!isAvailable}
                            onClick={() => {
                              setSelectedYear(calendarYear)
                              setSelectedMonth(calendarMonth)
                              setSelectedDay(day)
                              const key = `${calendarYear}-${calendarMonth}-${day}`
                              const slots = dateSlotsMap[key] || ['02:00 PM', '04:30 PM', '06:00 PM', '08:30 PM']
                              if (slots.length > 0 && !slots.includes(selectedTimeSlot)) {
                                setSelectedTimeSlot(slots[0])
                              }
                            }}
                            className={`h-8 w-8 sm:h-9 sm:w-9 mx-auto rounded-lg flex items-center justify-center transition text-xs ${
                              isSelected
                                ? 'bg-[#4F1787] text-white font-bold shadow-xs cursor-pointer'
                                : isAvailable
                                  ? 'bg-[#FFF3E0] text-[#B45309] font-medium hover:bg-[#FFE0B2] cursor-pointer'
                                  : 'text-gray-300 cursor-default'
                            }`}
                          >
                            {day}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Timezone Indicator */}
                  <div className="pt-6 mt-6 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                    <svg
                      className="w-4 h-4 text-gray-400 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M3.6 9h16.8M3.6 15h16.8M12 3a14.4 14.4 0 000 18M12 3a14.4 14.4 0 010 18"
                      />
                    </svg>
                    <span>Central European Time (CET)</span>
                  </div>
                </div>

                {/* Column 3: Time Slots & Continue (Image 4 Right Column) */}
                <div className="md:col-span-3 p-6 sm:p-7 bg-white flex flex-col justify-between">
                  <div>
                    {/* Selected Date Header */}
                    <h4 className="font-semibold text-xs sm:text-sm text-gray-800 mb-4">
                      {getDayName(selectedYear, selectedMonth, selectedDay)}, {monthNames[selectedMonth]} {selectedDay}
                    </h4>

                    {/* Time Slots List */}
                    <div className="space-y-2.5">
                      {currentSlotDetails.length > 0 ? (
                        currentSlotDetails.map((slotObj) => {
                          const isSelected =
                            selectedTimeSlot === slotObj.label ||
                            selectedTimeSlot === slotObj.startTime ||
                            selectedTimeSlot.includes(slotObj.startTime)
                          const isSoldOut = slotObj.availableSeats <= 0

                          return (
                            <button
                              key={slotObj.label}
                              type="button"
                              disabled={isSoldOut}
                              onClick={() => setSelectedTimeSlot(slotObj.label)}
                              className={`w-full py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-between text-left ${
                                isSoldOut
                                  ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                                  : isSelected
                                    ? 'bg-[#4F1787] text-white shadow-xs'
                                    : 'border border-amber-300 bg-white text-amber-900 hover:border-[#4F1787] hover:text-[#4F1787]'
                              }`}
                            >
                              <span>{slotObj.label}</span>
                              <span
                                className={`text-[11px] font-normal px-2 py-0.5 rounded-full ${
                                  isSelected
                                    ? 'bg-white/20 text-white'
                                    : isSoldOut
                                      ? 'bg-gray-200 text-gray-500'
                                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                }`}
                              >
                                {isSoldOut ? 'Sold out' : `${slotObj.availableSeats} left`}
                              </span>
                            </button>
                          )
                        })
                      ) : (
                        timeSlots.map((slot) => {
                          const isSelected = selectedTimeSlot === slot
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`w-full py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition text-center cursor-pointer ${
                                isSelected
                                  ? 'bg-[#4F1787] text-white shadow-xs'
                                  : 'border border-amber-300 bg-white text-amber-900 hover:border-[#4F1787] hover:text-[#4F1787]'
                              }`}
                            >
                              {slot}
                            </button>
                          )
                        })
                      )}
                    </div>
                  </div>

                  {/* Continue Button */}
                  <div className="pt-6">
                    <button
                      type="button"
                      disabled={!details.booking}
                      onClick={handleConfirmSlot}
                      className={`w-full font-semibold py-3 px-3 rounded-lg text-xs sm:text-sm transition shadow-md text-center ${
                        details.booking
                          ? 'bg-[#4F1787] hover:bg-[#3D0F6B] text-white cursor-pointer'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {details.booking ? `Continue with ${selectedTimeSlot} →` : 'Booking Paused'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkshopDetailContent