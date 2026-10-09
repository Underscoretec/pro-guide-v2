export interface ProductDetailData {
  id: string
  slug: string
  name: string
  price: number
  category: string
  sku: string
  tags: string[]
  imageUrl: string
  images: string[]
  shortDescription: string
  variant?: string
  detailHeading?: string
  detailParagraph1?: string
  detailParagraph2?: string
  whyChoose?: string[]
  sampleList?: string[]
  lining?: string
  specifications?: {
    weight?: string
    dimensions?: string
    material?: string
    variant?: string
    compatibility?: string
  }
}

export const PRODUCTS_CATALOG: Record<string, ProductDetailData> = {
  pns: {
    id: 'paranasal-model-without-base',
    slug: 'pns',
    name: 'Paranasal Model without base',
    price: 20000,
    category: 'Rhinology — Paranasal Sinus Series',
    sku: 'PG-PNS-001',
    tags: ['rhinology', 'paranasal', 'sinus', 'fess', 'simulation', 'surgical-training'],
    imageUrl: '/images/prod3.jpg',
    images: [
      '/images/prod3.jpg',
      '/images/prod2.jpg',
      '/images/detail_nose.jpg',
      '/images/photo_micro.jpg',
    ],
    shortDescription:
      'Focused endoscopic sinonasal anatomy model for repeatable surgical training, instrument navigation, and resident dissection workshops.',
    variant: 'Available in Left and Right variant',
    detailHeading: 'Targeted Sinonasal Surgical Training',
    detailParagraph1:
      'Engineered for comprehensive endoscopic sinus surgical workshops. Trainees navigate endoscopic visualization, identify critical sinonasal landmarks, and practice instrument coordination under realistic haptic conditions.',
    detailParagraph2:
      'Cast in authentic OSSA+ Composite™ replicating human bone and soft tissue resistance, providing authentic tactile feedback during uncinectomy and antrostomy.',
    whyChoose: [
      'Cast in authentic OSSA+ Composite™ replicating human bone tactile feedback',
      'Anatomically validated landmarks by senior otolaryngologists',
      'Clean, repeatable surgical workstation training eliminating cadaveric hazards',
    ],
    sampleList: [
      'Uncinectomy, maxillary antrostomy and ethmoid dissection capabilities',
      'Compatible with standard rigid endoscopes and sinus instruments',
      'Standardized anatomical baseline across all course delegates',
    ],
    lining: 'OSSA+ Composite™ Mineralized Bone Matrix & Soft Surgical Grade Silicone.',
    specifications: {
      weight: '350 g',
      dimensions: '14 × 12 × 10 cm',
      material: 'OSSA+ Composite™ bone matrix & soft silicone',
      variant: 'Left & Right available',
      compatibility: 'Endoscopic sinus surgical instruments & microdebriders',
    },
  },
  pnsb: {
    id: 'paranasal-model-with-bassettes',
    slug: 'pnsb',
    name: 'Paranasal Model with Bassettes',
    price: 25000,
    category: 'Rhinology — Paranasal Sinus Series',
    sku: 'PG-PNS-002',
    tags: ['rhinology', 'paranasal', 'fess', 'cassette', 'simulation'],
    imageUrl: '/images/prod2.jpg',
    images: [
      '/images/prod2.jpg',
      '/images/prod3.jpg',
      '/images/detail_nose.jpg',
      '/images/photo_micro.jpg',
    ],
    shortDescription:
      'Complete endoscopic sinonasal anatomy mounted on an ergonomic base station with replaceable cassettes for repetitive surgical and resident training.',
    variant: 'Available in Left and Right variant',
    detailHeading: 'Complete Sinonasal Surgical Station',
    detailParagraph1:
      'Engineered for comprehensive endoscopic sinus surgical workshops. From uncinectomy, maxillary antrostomy, ethmoidectomy to sphenoidotomy and frontal sinusotomy, delegates perform real steps under standard endoscopic visualization.',
    detailParagraph2:
      'Equipped with quick-release anatomical cassettes to enable fast resets between training sessions without discarding the base mounting hardware.',
    whyChoose: [
      'Modular cassette design for cost-effective repeated workshops',
      'True haptic drilling and cutting resistance identical to human tissue',
      'Ergonomic workstation footprint compatible with standard ENT towers',
    ],
    sampleList: [
      'Anatomically validated landmarks by senior rhinologists',
      'Realistic mucosal and bone feedback under microdebrider use',
      'Pre-assembled and ready for surgical residency simulation labs',
    ],
    lining: 'OSSA+ Composite™ Bone Matrix & High-Durability Medical Polymer.',
    specifications: {
      weight: '620 g',
      dimensions: '18 × 15 × 12 cm',
      material: 'OSSA+ Composite™ with reinforced workstation base',
      variant: 'Left & Right available',
      compatibility: 'Rigid endoscopes, curettes, punches, and microdebriders',
    },
  },
  tb: {
    id: '3d-temporal-bone',
    slug: 'tb',
    name: '3D Temporal Bone',
    price: 20000,
    category: 'Otology — Artificial Temporal Bone Series',
    sku: 'PG-TB-001',
    tags: ['otology', 'temporal-bone', 'mastoidectomy', 'ear-surgery'],
    imageUrl: '/images/prod1.jpg',
    images: [
      '/images/prod1.jpg',
      '/images/detail_middleear.jpg',
      '/images/detail_sigmoid.jpg',
      '/images/detail_macro.jpg',
    ],
    shortDescription:
      'The benchmark artificial temporal bone for mastoid drilling, canal wall up/down procedures, and middle ear decompression practice.',
    variant: 'Available in Left and Right variant',
    detailHeading: 'True-to-Life Otological Training',
    detailParagraph1:
      'Cast from radiological high-resolution micro-CT data, our 3D temporal bone replicates cellular mastoid architecture, pneumatization, dural plate, sigmoid sinus, and facial canal positions down to 0.1 mm precision.',
    detailParagraph2:
      'Allows trainees to drill with surgical cutting and diamond burrs, experience realistic vibration and tactile bone feedback, and identify crucial landmarks safely before entering the operating theatre.',
    whyChoose: [
      'Precise anatomical landmarks: tegmen, sigmoid sinus, and facial nerve',
      'Realistic bone dust generation and drill resistance',
      'Waterproof structure suitable for continuous irrigation and suction',
    ],
    sampleList: [
      'Standardized for fellowship exams and dissection courses',
      'Consistent pathology-free anatomical baseline across delegates',
      'Eliminates infectious disease hazards of cadaveric specimens',
    ],
    lining: 'OSSA+ Composite™ Mineralized Bone Matrix.',
    specifications: {
      weight: '240 g',
      dimensions: '11 × 9 × 8 cm',
      material: 'Mineral-filled bone composite with colored anatomical landmarks',
      variant: 'Left & Right available',
      compatibility: 'Standard surgical drills, irrigation, and operating microscopes',
    },
  },
  larynx: {
    id: 'larynx-model',
    slug: 'larynx',
    name: 'Artificial Larynx Model',
    price: 20000,
    category: 'Laryngology, Vestibular & Custom Series',
    sku: 'PG-LRX-001',
    tags: ['laryngology', 'microlaryngoscopy', 'vocal-cord', 'phonomicrosurgery'],
    imageUrl: '/images/prod4.jpg',
    images: [
      '/images/prod4.jpg',
      '/images/detail_larynxtop.jpg',
      '/images/photo_micro.jpg',
      '/images/ws_lab.jpg',
    ],
    shortDescription:
      'Laryngeal framework and airway anatomy for procedural demonstration, airway teaching and course use — with replaceable glottic cassettes for lesion work.',
    variant: 'Standard Adult Anatomical Scale',
    detailHeading: 'Microlaryngoscopy & Phonomicrosurgery Training',
    detailParagraph1:
      'Designed specifically for microlaryngoscopy suspension training and laser surgery. Trainees navigate suspension laryngoscopes, align microscope focal planes, and operate delicate micro-instruments in a restricted corridor.',
    detailParagraph2:
      'The cassette glottic insert incorporates life-like simulated vocal fold layers, permitting precise micro-flap elevation, subepithelial dissection, and pathology excision.',
    whyChoose: [
      'True suspension laryngoscope positioning and neck angulation',
      'Replaceable vocal fold inserts with authentic tissue elasticity',
      'Compatible with cold steel micro-instruments and CO2 surgical laser',
    ],
    sampleList: [
      'Modular lesion cassettes for repetitive training',
      'True-to-scale anterior commissure and subglottic airway',
      'Validated by leading laryngologists and voice surgeons',
    ],
    lining: 'Soft Surgical Silicone & Rigid Cartilaginous Framework Polymer.',
    specifications: {
      weight: '480 g',
      dimensions: '16 × 13 × 11 cm',
      material: 'Anatomical polyurethane cartilage framework & silicone mucosa',
      variant: 'Adult scale with exchangeable pathology cassettes',
      compatibility: 'Suspension laryngoscopes, surgical microscopes, micro-instruments',
    },
  },
  'advance-model-complete-bone': {
    id: 'advance-model-complete-bone',
    slug: 'advance-model-complete-bone',
    name: 'Advance Model — Complete Bone',
    price: 20000,
    category: 'Otology — Artificial Temporal Bone Series',
    sku: 'PG-TB-002',
    tags: ['otology', 'temporal-bone', 'middle-ear', 'inner-ear', 'surgical-training'],
    imageUrl: '/images/detail_sigmoid.jpg',
    images: [
      '/images/detail_sigmoid.jpg',
      '/images/prod1.jpg',
      '/images/detail_middleear.jpg',
      '/images/detail_macro.jpg',
    ],
    shortDescription:
      'The complete bone with middle and inner ear in place — for advanced surgeries and every exam that matters.',
    variant: 'Available in Left and Right variant',
    detailHeading: 'Comprehensive Otological & Skull Base Dissection',
    detailParagraph1:
      'Features full pneumatization, incus and malleus assembly, stapes footplate, promontory, round window niche, and internal acoustic canal anatomy for advanced otological dissection.',
    detailParagraph2:
      'Engineered for advanced otology fellowship training, subtotal petrosectomy, labyrinthectomy, and middle ear reconstruction.',
    whyChoose: [
      'Complete middle ear ossicular chain and facial nerve canal',
      'Realistic drill vibration and bone dust generation',
      'Ideal for fellowship examinations and advanced dissection courses',
    ],
    sampleList: [
      'Posterior tympanotomy (facial recess) dissection',
      'Endolymphatic sac decompression and labyrinthectomy rehearsal',
      'Stapedectomy and ossiculoplasty practice',
    ],
    lining: 'OSSA+ Composite™ Mineralized Bone Matrix.',
    specifications: {
      weight: '260 g',
      dimensions: '11 × 9 × 8 cm',
      material: 'Mineral-filled bone composite with colored anatomical landmarks',
      variant: 'Left & Right available',
      compatibility: 'Standard surgical drills, irrigation, and operating microscopes',
    },
  },
  'cochlear-implant-model': {
    id: 'cochlear-implant-model',
    slug: 'cochlear-implant-model',
    name: 'Cochlear Implant Model',
    price: 20000,
    category: 'Otology — Artificial Temporal Bone Series',
    sku: 'PG-TB-003',
    tags: ['otology', 'cochlear-implant', 'round-window', 'temporal-bone'],
    imageUrl: '/images/detail_macro.jpg',
    images: [
      '/images/detail_macro.jpg',
      '/images/prod1.jpg',
      '/images/detail_middleear.jpg',
      '/images/detail_sigmoid.jpg',
    ],
    shortDescription:
      'Practise the delicate path to the cochlea and feel what a smooth electrode insertion should feel like — built for CI programmes and device training.',
    variant: 'Available in Left and Right variant',
    detailHeading: 'Dedicated Cochlear Implantation Simulation',
    detailParagraph1:
      'Designed specifically for cochlear implant surgical workshops and device manufacturer training. Replicates realistic round window membrane resistance and scala tympani dimensions.',
    detailParagraph2:
      'Enables surgeons to practice cortical mastoidectomy, posterior tympanotomy, round window exposure, and tactile electrode array insertion without specimen degradation.',
    whyChoose: [
      'Accurate scala tympani geometry for dummy electrode insertion',
      'Precise facial recess and chorda tympani identification',
      'Reusable with exchangeable cochlear inserts for repeated workshops',
    ],
    sampleList: [
      'Round window approach vs cochleostomy comparison',
      'Electrode insertion angle and depth gauge training',
      'Compatible with leading cochlear implant test arrays',
    ],
    lining: 'OSSA+ Composite™ Mineralized Bone Matrix & Elastic Cochlear Lining.',
    specifications: {
      weight: '240 g',
      dimensions: '11 × 9 × 8 cm',
      material: 'Mineral-filled bone composite with soft inner cochlear canal',
      variant: 'Left & Right available',
      compatibility: 'Surgical drills, CI dummy electrodes, and microscopes',
    },
  },
  'task-based-trainers': {
    id: 'task-based-trainers',
    slug: 'task-based-trainers',
    name: 'Task-Based Trainers',
    price: 20000,
    category: 'Otology — Artificial Temporal Bone Series',
    sku: 'PG-TB-004',
    tags: ['otology', 'tympanoplasty', 'stapedectomy', 'task-based'],
    imageUrl: '/images/detail_middleear.jpg',
    images: [
      '/images/detail_middleear.jpg',
      '/images/prod1.jpg',
      '/images/detail_macro.jpg',
    ],
    shortDescription:
      'One skill per model, priced like a textbook — repeat it until it feels easy.',
    variant: 'Available in Left and Right variant',
    detailHeading: 'Focused Surgical Task Training Modules',
    detailParagraph1:
      'Targeted single-procedure simulation models focusing on high-stakes middle ear maneuvers: tympanoplasty graft placement, stapes footplate fenestration, facial nerve decompression, and ossicular reconstruction.',
    detailParagraph2:
      'High-volume, cost-effective training allowing residents to build muscle memory and master individual procedure steps independently.',
    whyChoose: [
      'Single-procedure focus for efficient deliberate practice',
      'High fidelity tactile response at textbook-level pricing',
      'Modular setup compatible with desktop microscopes and loupes',
    ],
    sampleList: [
      'Tympanoplasty graft positioning and underlay practice',
      'Facial nerve decompression landmarking and unroofing',
      'Stapedectomy crimping and piston sizing practice',
      'Ossiculoplasty TORP and PORP placement',
    ],
    lining: 'OSSA+ Composite™ Mineralized Bone Matrix.',
    specifications: {
      weight: '200 g',
      dimensions: '10 × 8 × 7 cm',
      material: 'Mineral-filled bone composite & soft ear canal lining',
      variant: 'Left & Right available',
      compatibility: 'Standard middle ear micro-instruments and microscopes',
    },
  },
  'maxillary-balloon-sinuplasty-trainer': {
    id: 'maxillary-balloon-sinuplasty-trainer',
    slug: 'maxillary-balloon-sinuplasty-trainer',
    name: 'Maxillary Balloon Sinuplasty Trainer',
    price: 20000,
    category: 'Interventional Rhinology — Balloon Sinuplasty Series',
    sku: 'PG-BLN-001',
    tags: ['rhinology', 'balloon-sinuplasty', 'maxillary', 'fess'],
    imageUrl: '/images/detail_nose.jpg',
    images: [
      '/images/detail_nose.jpg',
      '/images/prod3.jpg',
      '/images/photo_micro.jpg',
    ],
    shortDescription:
      'Ostium identification, catheter navigation and balloon placement under endoscopic view.',
    variant: 'Available in Left and Right variant',
    detailHeading: 'Endoscopic Maxillary Ostium Balloon Dilation',
    detailParagraph1:
      'Engineered specifically for interventional rhinology workshops. Features uncinate process anatomy, natural maxillary ostium, and realistic tactile resistance during guide catheter and balloon catheter introduction.',
    detailParagraph2:
      'Simulates true trans-nasal endoscopic navigation with guide wire transillumination feedback and pneumatic dilation mechanics.',
    whyChoose: [
      'Accurate uncinate and fontanelle tactile feedback',
      'Compatible with real clinic balloon dilation devices',
      'Transillumination visualization under endoscopic monitoring',
    ],
    sampleList: [
      'Catheter curve selection and ostial cannulation',
      'Balloon positioning and controlled pressure dilation',
      'Consumable ostial cassettes for repetitive workshop sessions',
    ],
    lining: 'OSSA+ Composite™ Bone Matrix & Surgical Grade Elastomers.',
    specifications: {
      weight: '320 g',
      dimensions: '14 × 12 × 10 cm',
      material: 'OSSA+ Composite™ with flexible ostial membranes',
      variant: 'Left & Right available',
      compatibility: 'Standard rigid endoscopes, guide catheters, and dilation balloons',
    },
  },
  'frontal-balloon-sinuplasty-trainer': {
    id: 'frontal-balloon-sinuplasty-trainer',
    slug: 'frontal-balloon-sinuplasty-trainer',
    name: 'Frontal Balloon Sinuplasty Trainer',
    price: 20000,
    category: 'Interventional Rhinology — Balloon Sinuplasty Series',
    sku: 'PG-BLN-002',
    tags: ['rhinology', 'balloon-sinuplasty', 'frontal-recess', 'fess'],
    imageUrl: '/images/prod3.jpg',
    images: [
      '/images/prod3.jpg',
      '/images/detail_nose.jpg',
      '/images/photo_micro.jpg',
    ],
    shortDescription:
      'Practise the challenging frontal recess pathway with realistic anatomical curvature.',
    variant: 'Available in Left and Right variant',
    detailHeading: 'Frontal Recess & Ostium Catheterization Simulation',
    detailParagraph1:
      'Master the steep angle of attack and tortuous pathway into the frontal sinus. Features agger nasi cells, frontal beak, and realistic frontal sinus outflow tract curvature.',
    detailParagraph2:
      'Provides true-to-life tactile feedback when navigating curved seeker catheters and balloon systems under 45° and 70° endoscopic views.',
    whyChoose: [
      'Realistic frontal sinus ostium resistance and pathway curvature',
      'Safe environment to master complex frontal recess navigation',
      'Lighted guide wire transillumination confirmation over the brow',
    ],
    sampleList: [
      '45° and 70° endoscope navigation training',
      'Guide wire trajectory and frontal ostium confirmation',
      'High-pressure balloon dilation simulation without mucosal shredding',
    ],
    lining: 'OSSA+ Composite™ Bone Matrix & Flexible Recess Mucosa.',
    specifications: {
      weight: '330 g',
      dimensions: '14 × 12 × 11 cm',
      material: 'OSSA+ Composite™ with curved anatomical recess geometry',
      variant: 'Left & Right available',
      compatibility: 'Angled endoscopes (45°/70°), frontal guide catheters, and balloons',
    },
  },
  'eustachian-tube-dilation-trainer': {
    id: 'eustachian-tube-dilation-trainer',
    slug: 'eustachian-tube-dilation-trainer',
    name: 'Eustachian Tube Dilation Trainer',
    price: 20000,
    category: 'Interventional Rhinology — Balloon Sinuplasty Series',
    sku: 'PG-BLN-003',
    tags: ['rhinology', 'otology', 'eustachian-tube', 'balloon-dilation'],
    imageUrl: '/images/detail_middleear.jpg',
    images: [
      '/images/detail_middleear.jpg',
      '/images/detail_nose.jpg',
      '/images/prod3.jpg',
    ],
    shortDescription:
      "The world's first Eustachian tube balloon dilation trainer for clinic procedure rehearsal.",
    variant: 'Available in Left and Right variant',
    detailHeading: 'Eustachian Tube Dilation (ETD) Procedural Training',
    detailParagraph1:
      'The dedicated simulator for balloon Eustachian tuboplasty. Features realistic nasopharyngeal torus tubarius anatomy, Rosenmüller fossa, and cartilaginous Eustachian tube lumen.',
    detailParagraph2:
      'Trainers navigate the balloon catheter through the nasal cavity into the pharyngeal orifice, feeling realistic catheter seating and balloon inflation dynamics.',
    whyChoose: [
      'True anatomical nasopharynx and torus tubarius landmarks',
      'Accurate depth gauge markings and resistance at the isthmus',
      'Compatible with clinic and office-based dilation systems',
    ],
    sampleList: [
      'Trans-nasal endoscopic approach to the nasopharynx',
      'Catheter engagement into the cartilaginous Eustachian orifice',
      'Timed high-pressure balloon inflation simulation (2 minutes at 10-12 bar)',
    ],
    lining: 'OSSA+ Composite™ Cartilaginous Framework & Soft Torus Silicone.',
    specifications: {
      weight: '340 g',
      dimensions: '15 × 12 × 10 cm',
      material: 'OSSA+ Composite™ framework with anatomical torus tubarius',
      variant: 'Left & Right available',
      compatibility: 'Endoscopes, ETD guide catheters, and commercial dilation balloons',
    },
  },
  'labyrinth-model-epley-maneuver': {
    id: 'labyrinth-model-epley-maneuver',
    slug: 'labyrinth-model-epley-maneuver',
    name: 'Labyrinth Model for the Epley Maneuver',
    price: 20000,
    category: 'Laryngology, Vestibular & Custom Series',
    sku: 'PG-VST-001',
    tags: ['vestibular', 'epley-maneuver', 'bppv', 'semicircular-canals', 'otology'],
    imageUrl: '/images/detail_ear.jpg',
    images: [
      '/images/detail_ear.jpg',
      '/images/prod1.jpg',
      '/images/detail_sigmoid.jpg',
    ],
    shortDescription:
      'A functional semicircular-canal model demonstrating otoconia movement through each stage of repositioning — for ENT, neurology and physiotherapy teaching.',
    variant: 'Standard Anatomical Scale',
    detailHeading: 'Functional Vestibular & Canalolithiasis Simulation',
    detailParagraph1:
      'A clear, fluid-filled semicircular canal demonstration model with suspended micro-particles that physically move through the anterior, posterior, and horizontal canals during head rotation.',
    detailParagraph2:
      'Essential for teaching the canalolithiasis mechanism of BPPV, demonstrating Dix-Hallpike diagnosis, and practicing Canalith Repositioning Maneuvers (Epley, Semont, Lempert) visually in real-time.',
    whyChoose: [
      'Transparent fluid-filled canals showing live particle gravitation',
      'Anatomically accurate spatial orientation of all three semicircular canals',
      'Invaluable teaching tool for residents, vestibular physical therapists, and patients',
    ],
    sampleList: [
      'Posterior canal BPPV and Epley maneuver walkthrough',
      'Horizontal canal BPPV (canalolithiasis vs cupulolithiasis) demonstration',
      'Hands-on repositioning practice before treating acute vertigo patients',
    ],
    lining: 'Medical-Grade Optical Polymer & Viscous Fluid Matrix.',
    specifications: {
      weight: '180 g',
      dimensions: '12 × 10 × 9 cm',
      material: 'Transparent optical polymer with sealed fluid-filled canal lumens',
      variant: 'Standard Anatomical Scale',
      compatibility: 'Desktop display and head-mounted training rigs',
    },
  },
  'pathology-variants-patient-specific-models': {
    id: 'pathology-variants-patient-specific-models',
    slug: 'pathology-variants-patient-specific-models',
    name: 'Pathology Variants & Patient-Specific Models',
    price: 20000,
    category: 'Laryngology, Vestibular & Custom Series',
    sku: 'PG-CST-001',
    tags: ['custom', 'patient-specific', 'pathology', '3d-printing', 'surgical-planning'],
    imageUrl: '/images/detail_larynxtop.jpg',
    images: [
      '/images/detail_larynxtop.jpg',
      '/images/prod1.jpg',
      '/images/prod3.jpg',
      '/images/ws_lab.jpg',
    ],
    shortDescription:
      'Disease-state anatomy (cholesteatoma, sclerotic mastoid and more) at catalogue prices, and CT-to-model builds for rehearsing a specific patient’s surgery before you perform it.',
    variant: 'Custom / Pathology Specific',
    detailHeading: 'Pathology-Specific & Patient-Matched Surgical Simulation',
    detailParagraph1:
      'Transform clinical DICOM CT/MRI datasets into tangible, drillable surgical replicas for pre-operative rehearsal of challenging cases: high jugular bulb, anterior sigmoid sinus, extensive cholesteatoma, or revision sinus surgery.',
    detailParagraph2:
      'Allows surgical teams to test trajectories, identify anatomical variations in advance, and improve operating room efficiency and patient safety.',
    whyChoose: [
      'Direct conversion from patient DICOM radiological scans',
      'True haptic drilling resistance identical to native pathological bone',
      'Fast turnaround for scheduled complex surgical cases',
    ],
    sampleList: [
      'Erosive cholesteatoma and fistula rehearsal',
      'Sclerotic mastoid bone and low middle fossa dura planning',
      'Patient-specific anatomical consultation and surgical consent',
    ],
    lining: 'OSSA+ Composite™ Mineralized Bone Matrix & Custom Tissue Polymers.',
    specifications: {
      weight: '250 g (varies by specimen)',
      dimensions: '12 × 10 × 8 cm',
      material: 'OSSA+ Composite™ mineralized matrix customized to patient scan density',
      variant: 'Patient-Specific (Built to DICOM scan specifications)',
      compatibility: 'Standard surgical drills, endoscopes, and operating microscopes',
    },
  },
}

import { getPayloadClient } from '@/lib/payload/client'
import { getProductsPage } from '@/lib/payload/productsPage'

// Slugs mapping aliases
const SLUG_ALIASES: Record<string, string> = {
  'paranasal-model-without-base': 'pns',
  'task-based-pns-model': 'pns',
  'pns': 'pns',
  'paranasal-model-with-bassettes': 'pnsb',
  'advance-pns-model': 'pnsb',
  'pnsb': 'pnsb',
  '3d-temporal-bone': 'tb',
  'basic-model-mastoid-bone': 'tb',
  'mastoid': 'tb',
  'tb': 'tb',
  'larynx': 'larynx',
  'larynx-model': 'larynx',
  'artificial-larynx-model': 'larynx',
}

export function getProductBySlug(slug?: string | null): ProductDetailData {
  if (!slug) {
    return PRODUCTS_CATALOG['pns']
  }

  const cleanSlug = slug.toLowerCase().trim()
  const resolvedKey = SLUG_ALIASES[cleanSlug] || cleanSlug

  if (PRODUCTS_CATALOG[cleanSlug]) {
    return PRODUCTS_CATALOG[cleanSlug]
  }

  if (PRODUCTS_CATALOG[resolvedKey]) {
    return PRODUCTS_CATALOG[resolvedKey]
  }

  // Fallback to pns if not found
  return PRODUCTS_CATALOG['pns']
}

export async function getProductData(slug?: string | null): Promise<ProductDetailData> {
  const defaultProduct = getProductBySlug(slug)

  if (!slug) {
    return defaultProduct
  }

  const cleanSlug = slug.toLowerCase().trim()
  const resolvedKey = SLUG_ALIASES[cleanSlug] || cleanSlug

  try {
    const payload = await getPayloadClient()

    // 1. Search in Products collection for EXACT slug match first
    let { docs } = await payload.find({
      collection: 'products',
      where: {
        or: [
          { slug: { equals: cleanSlug } },
          { name: { equals: cleanSlug } },
        ],
      },
      depth: 1,
      limit: 1,
    })

    // If no exact match and slug has an alias, search by alias
    if (docs.length === 0 && resolvedKey !== cleanSlug) {
      const aliasResult = await payload.find({
        collection: 'products',
        where: {
          or: [
            { slug: { equals: resolvedKey } },
            { name: { equals: resolvedKey } },
          ],
        },
        depth: 1,
        limit: 1,
      })
      docs = aliasResult.docs
    }

    if (docs.length > 0) {
      const doc = docs[0] as any

      // Process gallery images
      let galleryImages: string[] = []
      if (Array.isArray(doc.images) && doc.images.length > 0) {
        galleryImages = doc.images
          .map((img: any) =>
            typeof img === 'string'
              ? img
              : img.url || img.imageUrl || img.image?.url || ''
          )
          .filter(Boolean)
      }
      const mediaUrl =
        typeof doc.image === 'object' && doc.image?.url ? doc.image.url : null
      const primaryImage =
        doc.imageUrl || mediaUrl || galleryImages[0] || defaultProduct.imageUrl
      if (primaryImage && !galleryImages.includes(primaryImage)) {
        galleryImages = [primaryImage, ...galleryImages]
      }
      if (galleryImages.length === 0) {
        galleryImages = [primaryImage]
      }

      // Process whyChoose array
      let whyChoose = defaultProduct.whyChoose
      if (Array.isArray(doc.whyChoose) && doc.whyChoose.length > 0) {
        whyChoose = doc.whyChoose
          .map((w: any) => (typeof w === 'string' ? w : w.point || ''))
          .filter(Boolean)
      }

      // Process sampleList array
      let sampleList = defaultProduct.sampleList
      if (Array.isArray(doc.sampleList) && doc.sampleList.length > 0) {
        sampleList = doc.sampleList
          .map((s: any) => (typeof s === 'string' ? s : s.item || ''))
          .filter(Boolean)
      }

      return {
        id: String(doc.id || defaultProduct.id),
        slug: doc.slug || cleanSlug,
        name: doc.name || defaultProduct.name,
        price: typeof doc.price === 'number' ? doc.price : defaultProduct.price,
        category: doc.category || defaultProduct.category,
        sku: doc.sku || defaultProduct.sku,
        tags: Array.isArray(doc.tags) && doc.tags.length > 0 ? doc.tags : defaultProduct.tags,
        imageUrl: primaryImage,
        images: galleryImages,
        shortDescription: doc.shortDescription || defaultProduct.shortDescription,
        variant: doc.variant || defaultProduct.variant,
        detailHeading: doc.detailHeading || doc.name || defaultProduct.detailHeading,
        detailParagraph1:
          doc.detailParagraph1 || doc.shortDescription || defaultProduct.detailParagraph1,
        detailParagraph2: doc.detailParagraph2 || defaultProduct.detailParagraph2,
        whyChoose,
        sampleList,
        lining: doc.lining || defaultProduct.lining,
        specifications: {
          weight: doc.specifications?.weight || defaultProduct.specifications?.weight,
          dimensions: doc.specifications?.dimensions || defaultProduct.specifications?.dimensions,
          material: doc.specifications?.material || defaultProduct.specifications?.material,
          variant: doc.specifications?.variant || defaultProduct.specifications?.variant,
          compatibility:
            doc.specifications?.compatibility || defaultProduct.specifications?.compatibility,
        },
      }
    }

    // 2. If not found in Products collection, search in Products Page collection
    const pageDoc = await getProductsPage()
    if (pageDoc?.families && Array.isArray(pageDoc.families)) {
      for (const family of pageDoc.families) {
        if (!Array.isArray(family.items)) continue
        for (const item of family.items) {
          const itemNameSlug = String(item.name || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
          const itemId = String(item.id || '').toLowerCase()

          const isMatch =
            itemId === cleanSlug ||
            itemNameSlug === cleanSlug ||
            (resolvedKey !== cleanSlug && (itemId === resolvedKey || itemNameSlug === resolvedKey)) ||
            (cleanSlug === 'tb' && (itemNameSlug.includes('mastoid') || itemNameSlug.includes('temporal'))) ||
            (cleanSlug === 'pns' && itemNameSlug.includes('without-base')) ||
            (cleanSlug === 'pnsb' && (itemNameSlug.includes('bassette') || itemNameSlug.includes('cassette'))) ||
            (cleanSlug === 'larynx' && itemNameSlug.includes('larynx'))

          if (isMatch) {
            const mediaUrl =
              typeof item.image === 'object' && item.image?.url ? item.image.url : null
            const primaryImage = mediaUrl || item.imageUrl || defaultProduct.imageUrl

            let galleryImages: string[] = []
            if (Array.isArray(item.images) && item.images.length > 0) {
              galleryImages = item.images
                .map((img: any) =>
                  typeof img === 'string'
                    ? img
                    : img?.url || img?.imageUrl || img?.image?.url || ''
                )
                .filter(Boolean)
            }
            if (primaryImage && !galleryImages.includes(primaryImage)) {
              galleryImages = [primaryImage, ...galleryImages]
            }
            if (galleryImages.length === 0) {
              galleryImages = [primaryImage]
            }

            return {
              id: item.id || defaultProduct.id,
              slug: cleanSlug,
              name: item.name || defaultProduct.name,
              price: typeof item.price === 'number' ? item.price : defaultProduct.price,
              category: family.title || defaultProduct.category,
              sku: defaultProduct.sku,
              tags: defaultProduct.tags,
              imageUrl: primaryImage,
              images: galleryImages,
              shortDescription: item.description || defaultProduct.shortDescription,
              variant: defaultProduct.variant,
              detailHeading: item.name || defaultProduct.detailHeading,
              detailParagraph1: item.description || defaultProduct.detailParagraph1,
              detailParagraph2: defaultProduct.detailParagraph2,
              whyChoose: defaultProduct.whyChoose,
              sampleList:
                Array.isArray(item.bulletPoints) && item.bulletPoints.length > 0
                  ? item.bulletPoints
                      .map((b: any) => (typeof b === 'string' ? b : b.point || ''))
                      .filter(Boolean)
                  : defaultProduct.sampleList,
              lining: defaultProduct.lining,
              specifications: defaultProduct.specifications,
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn('Could not load product from Payload, using default catalog:', err)
  }

  return defaultProduct
}
