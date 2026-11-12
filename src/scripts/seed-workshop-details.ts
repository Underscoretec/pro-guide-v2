import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../payload.config'
import { workshopSeedData } from './workshop-details-data'

function loadEnv() {
  for (const file of ['.env.local', '.env']) {
    const envPath = path.resolve(process.cwd(), file)
    if (!fs.existsSync(envPath)) continue
    for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      let val = trimmed.slice(eqIdx + 1).trim()
      if (/^(".*"|'.*')$/.test(val)) val = val.slice(1, -1)
      if (key && !process.env[key]) process.env[key] = val
    }
  }
}

const rows = (items: string[]) => items.map((text) => ({ text }))

const entFaculty = [
  {
    name: 'Dr. Milind Kirtane',
    role: 'Senior ENT and Neurotology Faculty',
    bio: 'Leads the hands-on dissection stations and the facial nerve decompression module.',
    avatarBg: '#6B21A8',
  },
  {
    name: 'Dr. Prashant Naik',
    role: 'Lateral Skull Base Surgeon',
    bio: 'Teaches translabyrinthine approaches and internal auditory canal exposure.',
    avatarBg: '#EA580C',
  },
  {
    name: 'Dr. Rohan Patil',
    role: 'Neurotologist',
    bio: 'Guides nerve transposition and re-anastomosis practice on 3D models.',
    avatarBg: '#0284C7',
  },
]

const entFaq = [
  {
    question: 'Who can attend this workshop?',
    answer:
      'Practising ENT specialists and neurotologists expanding into skull base surgery. Trainees are welcome subject to seat availability.',
  },
  {
    question: 'What is included in the fee?',
    answer:
      'Full 1-day hands-on workstation access, dedicated 3D bone simulation models, operating microscope & micro-drill burs, course materials, lunch & refreshments, and CME certificate of completion.',
  },
  {
    question: 'Can I choose my date and time?',
    answer:
      'Yes, you can choose your preferred workshop date and time slot using the "Select date & time" button on this page.',
  },
  {
    question: 'How do I get my ticket?',
    answer:
      'Once your slot is reserved, your digital ticket, workshop itinerary, and workstation confirmation will be sent directly to your registered email.',
  },
  {
    question: 'What should I bring?',
    answer:
      'All dissection equipment, protective gear, microscopes, and 3D simulation bone models are provided. Simply bring your registration confirmation ID.',
  },
]

const entFeeInclusions = rows([
  'Full hands-on workstation access with dedicated 3D simulation bone model',
  'High-resolution operating microscope, micro-drill burs & continuous irrigation',
  '1-on-1 direct faculty supervision, step-by-step guidance & procedural critique',
  'Official CME accreditation certificate and lunch & refreshments',
])

const obstetricFaculty = [
  {
    name: 'Prof. Chittaranjan N. Purandare',
    role: 'Past FIGO President & Senior Maternal-Fetal Specialist',
    bio: 'Leads peripartum hemorrhage management and advanced surgical compression suture simulations.',
    avatarBg: '#6B21A8',
  },
  {
    name: 'Dr. Anita Sharma',
    role: 'Consultant Obstetrician & Gynecologist',
    bio: 'Guides acute resuscitation protocols and ROTEM / TEG guided coagulopathy algorithms.',
    avatarBg: '#EA580C',
  },
  {
    name: 'Dr. Rajesh Deshmukh',
    role: 'Critical Care Obstetric Fellow',
    bio: 'Oversees hands-on uterine tamponade and vacuum-assisted haemostasis techniques.',
    avatarBg: '#0284C7',
  },
]

const obstetricFaq = [
  {
    question: 'Who should attend this obstetric masterclass?',
    answer:
      'Obstetricians, Gynecologists, Maternal-Fetal Medicine fellows, and critical care specialists managing acute peripartum bleeding.',
  },
  {
    question: 'What is covered during the live simulation?',
    answer:
      'Real-time ROTEM/TEG interpretation, medical resuscitation, balloon tamponade insertion, and compression suture placements.',
  },
  {
    question: 'Is CME credit awarded for this session?',
    answer:
      'Yes, participants receive an official 4-credit CME certificate accredited by EBCOG upon session completion.',
  },
  {
    question: 'How will I receive the Zoom join link / access details?',
    answer:
      'The confirmation and access details are emailed immediately upon registration and again before the scheduled session.',
  },
  {
    question: 'Will recordings and reference clinical guides be provided?',
    answer:
      'Yes, delegates get 90 days access to recorded case analyses and downloadable PDF clinical management algorithms.',
  },
]

const obstetricFeeInclusions = rows([
  'Live interactive faculty-led masterclass & resuscitation simulation',
  'Comprehensive procedural protocol checklists and high-risk case audit toolkit',
  'Official EBCOG CME accreditation certificate (4 credits)',
  '90-day on-demand recording access and downloadable clinical reference cheat sheets',
])

const recordedFeeInclusions = rows([
  'Immediate 90-day access to HD procedural masterclass recordings',
  'Downloadable clinical audit templates and management flowcharts',
  'Official CME accreditation certificate of completion',
  'Self-paced learning with interactive diagnostic self-assessment quizzes',
])

const recordedFaq = [
  {
    question: 'How long do I have access to the recordings?',
    answer:
      'You receive full access to all video modules and clinical materials for 90 days from the date of registration.',
  },
  {
    question: 'Can I download the course handouts and clinical guidelines?',
    answer:
      'Yes, all presentation slides, audit forms, and printable algorithm cheat sheets can be downloaded directly from the portal.',
  },
  {
    question: 'When do I receive my CME certificate?',
    answer:
      'Your certificate of completion is generated automatically and sent to your registered email after completing the video modules.',
  },
]

// The exact workshops from Payload Admin Screenshot (Image 1)
const adminScreenshotsWorkshops = [
  {
    title: 'High-Risk Maternal Hemorrhage & Critical Obstetric Care',
    slug: 'hemorrhage-live',
    subtitle: 'KBI SkillBridge • Hands-On Faculty-Led Dissection Workshop',
    category: 'Maternal Medicine & Obstetrics',
    cluster: 'Maternal Medicine & Obstetrics',
    facultyLeadName: 'Prof. Chittaranjan N. Purandare & Team',
    cmeCredits: '4 credits',
    language: 'English',
    deliveryMode: 'online_live' as const,
    imageUrl: '/images/ws_faculty.jpg',
    duration: '2.5 hours live',
    description:
      'Faculty-led session on recognising and managing major obstetric haemorrhage, with ROTEM/TEG guided resuscitation and a live case walkthrough.',
    priceINR: 45000,
    gstPercent: 18,
    priceUSD: 499,
    seatsPerSession: 500,
    booking: true,
    registeredUsers: '24 users',
    revenueSample: '₹12,74,400',
    onlineLiveDetails: {
      platform: 'Zoom',
      joinLink: 'https://zoom.us/j/9812739182',
      sendJoinLink: 'Right after registration and 1 hour before.',
    },
    datesAndTimeSlots: [
      {
        date: '2026-11-18',
        slots: [
          { startTime: '02:00 PM', endTime: '04:00 PM', seats: 500, registrationsCount: 12 },
          { startTime: '06:00 PM', endTime: '08:30 PM', seats: 500, registrationsCount: 6 },
        ],
      },
      {
        date: '2026-11-19',
        slots: [{ startTime: '06:00 PM', endTime: '08:30 PM', seats: 500, registrationsCount: 4 }],
      },
      {
        date: '2026-11-20',
        slots: [{ startTime: '06:00 PM', endTime: '08:30 PM', seats: 500, registrationsCount: 2 }],
      },
    ],
    designationBullets: rows([
      'Obstetricians, Gynecologists, and Maternal-Fetal Medicine Fellows.',
      'Critical care specialists managing acute peripartum bleeding.',
      'Surgical teams aiming for hands-on simulation mastery.',
    ]),
    academicHeading: 'Procedural & Resuscitation Protocol Coverage',
    academicSubheadings: [
      {
        title: 'ROTEM / TEG Guided Resuscitation',
        bullets: rows([
          'Point-of-care coagulopathy assessment and targeted component transfusion.',
          'Fibrinogen replacement and goal-directed haemostasis algorithms.',
        ]),
      },
      {
        title: 'Surgical & Tamponade Interventions',
        bullets: rows([
          'Uterine balloon tamponade application and vacuum-induced tamponade.',
          'B-Lynch and compression suture placement walkthrough.',
        ]),
      },
    ],
    whyTrainBullets: rows([
      'Hands-on expert guidance from international maternal-fetal medicine faculty.',
      'Interactive case audits and real-time resuscitation simulations.',
    ]),
    faculty: obstetricFaculty,
    feeInclusions: obstetricFeeInclusions,
    faq: obstetricFaq,
  },
  {
    title: 'B-Lynch & Cho compression suture simulation',
    slug: 'b-lynch-simulation',
    subtitle: 'KBI SkillBridge • Hands-On Faculty-Led Dissection Workshop',
    category: 'Obstetric Surgery',
    cluster: 'Obstetric Surgery',
    facultyLeadName: 'Prof. Chittaranjan N. Purandare & Team',
    cmeCredits: '4 credits',
    language: 'English',
    deliveryMode: 'offline' as const,
    imageUrl: '/images/ws_lab.jpg',
    duration: '2.5 hours live',
    description:
      'Hands-on simulation of B-Lynch and Cho compression suture techniques on high-fidelity uterus simulation models.',
    priceINR: 18000,
    gstPercent: 18,
    priceUSD: 299,
    seatsPerSession: 40,
    booking: true,
    registeredUsers: '17 users',
    revenueSample: '₹3,61,080',
    offlineDetails: {
      venueName: 'Tata Memorial Hospital',
      fullAddress: 'Dr E Borges Road, Parel, Mumbai 400012',
      reportingTime: '30 minutes before the slot',
      seatsPerSessionOffline: 40,
      checkInMethod: 'QR code scanned at the registration desk',
      whatParticipantsShouldBring: 'Photo ID, scrubs and closed shoes',
      onSiteContact: '+91 98765 43210',
      certificate: true,
      cancellationPolicy:
        'Cancellation: no refund, per the booking terms. Attendees can request a date transfer up to 7 days before their date.',
    },
    datesAndTimeSlots: [
      {
        date: '2026-11-18',
        slots: [
          { startTime: '02:00 PM', endTime: '04:00 PM', seats: 40, registrationsCount: 10 },
          { startTime: '06:00 PM', endTime: '08:30 PM', seats: 40, registrationsCount: 7 },
        ],
      },
      {
        date: '2026-11-19',
        slots: [{ startTime: '06:00 PM', endTime: '08:30 PM', seats: 40, registrationsCount: 0 }],
      },
    ],
    designationBullets: rows([
      'Consultant Obstetricians facing atonic postpartum hemorrhage.',
      'Surgical trainees developing confidence with uterine compression techniques.',
    ]),
    academicHeading: 'Surgical Compression Mastery',
    academicSubheadings: [
      {
        title: 'Suture Techniques & Mechanics',
        bullets: rows([
          'B-Lynch brace suture anchoring, tension maintenance, and knot security.',
          'Hayman and Cho multiple square suturing techniques.',
        ]),
      },
    ],
    whyTrainBullets: rows([
      'Practice on custom anatomically correct silicone uterine models with realistic vascular pathways.',
    ]),
    faculty: obstetricFaculty,
    feeInclusions: obstetricFeeInclusions,
    faq: obstetricFaq,
  },
  {
    title: 'Point-of-care ROTEM/TEG guided resuscitation',
    slug: 'rotem-teg-recorded',
    subtitle: 'KBI SkillBridge • Video Masterclass',
    category: 'Critical Care',
    cluster: 'Critical Care & Hemostasis',
    facultyLeadName: 'Dr. Anita Sharma & Team',
    cmeCredits: '2 credits',
    language: 'English',
    deliveryMode: 'online_recorded' as const,
    imageUrl: '/images/ws_lecture.jpg',
    duration: '2 hours on-demand',
    description:
      'Video analysis of thromboelastometry traces, algorithmic component replacement, and clinical decision trees.',
    priceINR: 12000,
    gstPercent: 18,
    priceUSD: 199,
    seatsPerSession: 500,
    booking: false,
    registeredUsers: '9 users',
    revenueSample: '₹1,27,440',
    onlineRecordedDetails: {
      videos: [
        { title: 'Module 1 — ROTEM Trace Interpretation', duration: '45 min' },
        { title: 'Module 2 — TEG Guided Blood Component Therapy', duration: '55 min' },
      ],
      accessWindowDays: 90,
      handouts: [{ title: 'ROTEM Clinical Guide.pdf', fileSize: '4.8 MB' }],
    },
    datesAndTimeSlots: [],
    designationBullets: rows([
      'Intensivists, obstetric anesthetists, and trauma resuscitation teams.',
    ]),
    academicHeading: 'Viscoelastic Testing Analysis',
    academicSubheadings: [
      {
        title: 'Diagnostic Traces & Real-Time Management',
        bullets: rows([
          'EXTEM, INTEM, and FIBTEM interpretation in critical obstetric hemorrhage.',
          'Distinguishing hypofibrinogenemia from hyperfibrinolysis.',
        ]),
      },
    ],
    whyTrainBullets: rows([
      'Access on-demand recordings for 90 days with downloadable clinical cheat sheets.',
      'Self-paced learning with interactive diagnostic quizzes.',
    ]),
    faculty: obstetricFaculty,
    feeInclusions: recordedFeeInclusions,
    faq: recordedFaq,
  },
  {
    title: 'Hypertensive disorders: operative audit',
    slug: 'hypertensive-audit',
    subtitle: 'KBI SkillBridge • Operative Audit Masterclass',
    category: 'Maternal Medicine',
    cluster: 'Maternal Medicine',
    facultyLeadName: 'Prof. Chittaranjan N. Purandare',
    cmeCredits: '3 credits',
    language: 'English',
    deliveryMode: 'online_live' as const,
    imageUrl: '/images/ws_skilllab.jpg',
    duration: '2 hours live',
    description:
      'Clinical audit and management strategies for hypertensive emergencies and pre-eclampsia in labor.',
    priceINR: 29000,
    gstPercent: 18,
    priceUSD: 349,
    seatsPerSession: 500,
    booking: true,
    registeredUsers: '12 users',
    revenueSample: '₹4,10,640',
    onlineLiveDetails: {
      platform: 'Zoom',
      joinLink: 'https://zoom.us/j/hypertensive-audit',
      sendJoinLink: 'Right after registration and 1 hour before.',
    },
    datesAndTimeSlots: [
      {
        date: '2026-11-21',
        slots: [{ startTime: '04:30 PM', endTime: '06:30 PM', seats: 500, registrationsCount: 8 }],
      },
      {
        date: '2026-11-22',
        slots: [{ startTime: '06:00 PM', endTime: '08:00 PM', seats: 500, registrationsCount: 4 }],
      },
    ],
    designationBullets: rows([
      'Maternal medicine specialists and high-risk labor ward consultants.',
    ]),
    academicHeading: 'Clinical Protocol Coverage',
    academicSubheadings: [
      {
        title: 'Severe Pre-Eclampsia Management',
        bullets: rows([
          'Intravenous anti-hypertensive titration and magnesium sulfate protocols.',
          'Operative timing and neuroprotective delivery algorithms.',
        ]),
      },
    ],
    whyTrainBullets: rows([
      'Live interactive audit discussion with senior maternal-fetal faculty.',
    ]),
    faculty: obstetricFaculty,
    feeInclusions: obstetricFeeInclusions,
    faq: obstetricFaq,
  },
  {
    title: 'Fetal medicine ultrasound masterclass',
    slug: 'fetal-ultrasound',
    subtitle: 'KBI SkillBridge • Hands-On Ultrasound Simulation',
    category: 'Fetal Medicine',
    cluster: 'Fetal Medicine & Sonology',
    facultyLeadName: 'Dr. S. K. Kulkarni & Team',
    cmeCredits: '4 credits',
    language: 'English',
    deliveryMode: 'offline' as const,
    imageUrl: '/images/ws_room2.jpg',
    duration: '1 Day Hands-on',
    description:
      'Hands-on ultrasound probe navigation and anatomical biometric scans on 3D fetus models.',
    priceINR: 27000,
    gstPercent: 18,
    priceUSD: 399,
    seatsPerSession: 40,
    booking: false,
    registeredUsers: '8 users',
    revenueSample: '₹2,54,880',
    offlineDetails: {
      venueName: 'Tata Memorial Hospital',
      fullAddress: 'Dr E Borges Road, Parel, Mumbai 400012',
      reportingTime: '30 minutes before the slot',
      seatsPerSessionOffline: 40,
      checkInMethod: 'QR code scanned at the registration desk',
      whatParticipantsShouldBring: 'Photo ID, scrubs and closed shoes',
      onSiteContact: '+91 98765 43210',
      certificate: true,
      cancellationPolicy:
        'Cancellation: no refund, per the booking terms. Attendees can request a date transfer up to 7 days before their date.',
    },
    datesAndTimeSlots: [
      {
        date: '2026-11-25',
        slots: [
          { startTime: '02:00 PM', endTime: '04:00 PM', seats: 40, registrationsCount: 6 },
          { startTime: '06:00 PM', endTime: '08:30 PM', seats: 40, registrationsCount: 2 },
        ],
      },
    ],
    designationBullets: rows([
      'Fetal medicine specialists, radiologists, and obstetric sonologists.',
    ]),
    academicHeading: 'Sonographic Biometry & Anomaly Scan',
    academicSubheadings: [
      {
        title: 'Fetal Neurosonography & Cardiac Views',
        bullets: rows([
          'Four-chamber view and outflow tract sweeps on simulation phantoms.',
          'Ventricular diameter and posterior fossa measurements.',
        ]),
      },
    ],
    whyTrainBullets: rows([
      'Direct hands-on ultrasound scanning on realistic tactile phantoms.',
    ]),
    faculty: obstetricFaculty,
    feeInclusions: obstetricFeeInclusions,
    faq: obstetricFaq,
  },
  {
    title: 'Gestational diabetes management pathway',
    slug: 'gdm-pathway',
    subtitle: 'KBI SkillBridge • Clinical Protocol Masterclass',
    category: 'Endocrinology',
    cluster: 'Endocrinology & Maternal Health',
    facultyLeadName: 'Dr. Anita Sharma & Team',
    cmeCredits: '2 credits',
    language: 'English',
    deliveryMode: 'online_recorded' as const,
    imageUrl: '/images/ws_faculty.jpg',
    duration: '2 hours on-demand',
    description:
      'Evidence-based clinical guidelines, insulin titration, and neonatal risk mitigation for gestational diabetes.',
    priceINR: 15000,
    gstPercent: 18,
    priceUSD: 249,
    seatsPerSession: 500,
    booking: true,
    registeredUsers: '6 users',
    revenueSample: '₹1,06,200',
    onlineRecordedDetails: {
      videos: [
        { title: 'Module 1 — Screening & Diagnostic Criteria', duration: '35 min' },
        { title: 'Module 2 — Management & Delivery Timing', duration: '50 min' },
      ],
      accessWindowDays: 90,
      handouts: [{ title: 'GDM Clinical Pathway.pdf', fileSize: '2.1 MB' }],
    },
    datesAndTimeSlots: [],
    designationBullets: rows([
      'Obstetricians, general physicians, and endocrine clinical fellows.',
    ]),
    academicHeading: 'Clinical Management Guidelines',
    academicSubheadings: [
      {
        title: 'Glycaemic Monitoring & Pharmacotherapy',
        bullets: rows([
          'Oral hypoglycaemic agents vs. basal-bolus insulin regimens.',
          'Continuous glucose monitoring data analysis.',
        ]),
      },
    ],
    whyTrainBullets: rows([
      'Complete downloadable management protocols and patient counseling guides.',
    ]),
    faculty: obstetricFaculty,
    feeInclusions: recordedFeeInclusions,
    faq: recordedFaq,
  },
]

export async function seedWorkshopDetails() {
  loadEnv()
  const payload = await getPayload({ config })

  // 1. Seed the 6 admin screenshot workshops
  for (const w of adminScreenshotsWorkshops) {
    const existing = await payload.find({
      collection: 'workshop-details',
      where: { slug: { equals: w.slug } },
      limit: 1,
    })

    if (existing.docs.length) {
      await payload.update({
        collection: 'workshop-details',
        id: existing.docs[0].id,
        data: w as any,
      })
      console.log(`Updated: ${w.slug}`)
    } else {
      await payload.create({
        collection: 'workshop-details',
        data: w as any,
      })
      console.log(`Created: ${w.slug}`)
    }
  }

  // 2. Also ensure existing dissection workshops are updated with rich pricing, faculty, FAQ, and dates
  for (const w of workshopSeedData) {
    const isLarynx = w.slug === 'larynx-workshop-microlaryngoscopy-laser-surgeries'
    const data = {
      title: w.title,
      slug: w.slug,
      subtitle: w.subtitle,
      category: w.category,
      cluster: 'ENT & Surgical Training',
      facultyLeadName: 'Dr. Milind Kirtane & Team',
      cmeCredits: '4 credits',
      language: 'English',
      imageUrl: w.imageUrl,
      duration: isLarynx ? '1-2 Days Hands-On' : w.duration,
      learners: w.learners,
      deliveryMode: 'offline' as const,
      priceINR: 45000,
      gstPercent: 18,
      priceUSD: 699,
      seatsPerSession: 40,
      booking: true,
      registeredUsers: '20 users',
      revenueSample: '₹10,62,000',
      offlineDetails: {
        venueName: 'Tata Memorial Hospital',
        fullAddress: 'Dr E Borges Road, Parel, Mumbai 400012',
        reportingTime: '30 minutes before the slot',
        checkInMethod: 'QR code scanned at the registration desk',
        whatParticipantsShouldBring: 'Photo ID, scrubs and closed shoes',
        onSiteContact: '+91 98765 43210',
        certificate: true,
        cancellationPolicy:
          'Cancellation: no refund, per the booking terms. Attendees can request a date transfer up to 7 days before their date.',
      },
      datesAndTimeSlots: [
        {
          date: '2026-11-18',
          slots: [
            { startTime: '02:00 PM', endTime: '04:00 PM', seats: 40, registrationsCount: 12 },
            { startTime: '06:00 PM', endTime: '08:30 PM', seats: 40, registrationsCount: 6 },
          ],
        },
        {
          date: '2026-11-20',
          slots: [
            { startTime: '02:00 PM', endTime: '04:00 PM', seats: 40, registrationsCount: 4 },
            { startTime: '04:30 PM', endTime: '06:30 PM', seats: 40, registrationsCount: 2 },
            { startTime: '06:00 PM', endTime: '08:00 PM', seats: 40, registrationsCount: 0 },
            { startTime: '08:30 PM', endTime: '10:30 PM', seats: 40, registrationsCount: 0 },
          ],
        },
      ],
      designationBullets: rows(w.designationBullets),
      academicHeading: w.academicContent.heading,
      academicSubheadings: w.academicContent.subheadings.map((s) => ({
        title: s.title,
        bullets: rows(s.bullets),
      })),
      whyTrainBullets: rows(w.whyTrainBullets),
      faculty: entFaculty,
      feeInclusions: entFeeInclusions,
      faq: entFaq,
    }

    const existing = await payload.find({
      collection: 'workshop-details',
      where: { slug: { equals: w.slug } },
      limit: 1,
    })

    if (existing.docs.length) {
      await payload.update({
        collection: 'workshop-details',
        id: existing.docs[0].id,
        data: data as any,
      })
      console.log(`Updated dissection workshop: ${w.slug}`)
    } else {
      await payload.create({ collection: 'workshop-details', data: data as any })
      console.log(`Created dissection workshop: ${w.slug}`)
    }
  }
}

seedWorkshopDetails()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed error:', err)
    process.exit(1)
  })
