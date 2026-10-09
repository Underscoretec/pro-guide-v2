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
    name: 'Larynx Model',
    price: 20000,
    category: 'Laryngology — Simulation Series',
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
      'Endoscopic vocal fold surgery model equipped with modular lesion cassettes simulating polyps, nodules, and webs for excision practice.',
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
  'advance-model-complete-bone': 'tb',
  'cochlear-implant-model': 'tb',
  'mastoid': 'tb',
  'tb': 'tb',
  'larynx': 'larynx',
  'larynx-model': 'larynx',
  'glottis-with-replaceable-lesions': 'larynx',
  'laser-microlaryngoscopy-trainer': 'larynx',
}

export function getProductBySlug(slug?: string | null): ProductDetailData {
  if (!slug) {
    return PRODUCTS_CATALOG['pns']
  }

  const cleanSlug = slug.toLowerCase().trim()
  const resolvedKey = SLUG_ALIASES[cleanSlug] || cleanSlug

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

    // 1. Search in Products collection first
    const { docs } = await payload.find({
      collection: 'products',
      where: {
        or: [
          { slug: { equals: cleanSlug } },
          { slug: { equals: resolvedKey } },
          { name: { equals: cleanSlug } },
        ],
      },
      depth: 1,
      limit: 1,
    })

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
            itemId === resolvedKey ||
            itemNameSlug === cleanSlug ||
            itemNameSlug === resolvedKey ||
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
