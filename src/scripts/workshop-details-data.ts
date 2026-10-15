// Initial content for the workshop-details collection (mirrors the previously static detail page content).
type WorkshopSeed = {
  title: string
  subtitle: string
  category: string
  imageUrl: string
  duration: string
  learners: string
  designationBullets: string[]
  academicContent: { heading: string; subheadings: { title: string; bullets: string[] }[] }
  whyTrainBullets: string[]
  experienceContent: string[]
  teachingPhilosophy: string[]
}

const specificWorkshops: Record<string, Omit<WorkshopSeed, never> & Record<string, unknown>> = {
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

const defaultWorkshop: Omit<WorkshopSeed, 'title'> & Record<string, unknown> = {
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

const cards: { title: string; imageUrl: string }[] = [
  { title: 'Basic 3D Temporal Bone Dissection Workshop', imageUrl: '/images/ws_lab.jpg' },
  { title: 'Advanced Temporal Bone Dissection Workshop', imageUrl: '/images/ws_faculty.jpg' },
  { title: 'Cochlear Implant Surgery Workshop', imageUrl: '/images/ws_lecture.jpg' },
  { title: 'Facial Nerve Workshop', imageUrl: '/images/ws_room2.jpg' },
  { title: 'Tympanoplasty Workshop', imageUrl: '/images/ws_skilllab.jpg' },
  { title: 'Paranasal Sinuses Workshop', imageUrl: '/images/ws_room2.jpg' },
  { title: 'Balloon Sinuplasty & Eustachian Tube Dilatation Workshop', imageUrl: '/images/ws_lab.jpg' },
  { title: 'Larynx Workshop — Microlaryngoscopy & Laser Surgeries', imageUrl: '/images/ws_lecture.jpg' },
]

export const slugify = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export const workshopSeedData: (WorkshopSeed & { slug: string })[] = cards.map((card) => {
  const slug = slugify(card.title)
  const base = (specificWorkshops[slug] || { ...defaultWorkshop, title: card.title, imageUrl: card.imageUrl }) as WorkshopSeed
  return { ...base, title: card.title, slug }
})
