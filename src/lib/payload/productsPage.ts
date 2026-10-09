import { cache } from 'react'
import { getPayloadClient } from './client'
import type { ProductFamily } from '@/components/Products/ProductFamilySection'
import type { ProductItem } from '@/components/Products/ProductCard'

export const defaultProductFamilies: ProductFamily[] = [
  {
    familyId: 'otology',
    title: 'Family 01 · Otology — Artificial Temporal Bone Series',
    subtitle: 'From first mastoid drilling to cochlear implantation and skull base work.',
    isAlt: true,
    items: [
      {
        id: 'tb',
        name: 'Basic Model — Mastoid Bone',
        badge: 'Foundation',
        price: 20000,
        imageUrl: '/images/prod1.jpg',
        description:
          'Learn to hold the drill, identify the landmarks and open the mastoid safely — where everyone begins.',
        primaryButton: { text: 'Buy', link: '/products/tb' },
      },
      {
        id: 'advance-model-complete-bone',
        name: 'Advance Model — Complete Bone',
        badge: 'Complete',
        price: 20000,
        imageUrl: '/images/detail_sigmoid.jpg',
        description:
          'The complete bone with middle and inner ear in place — for advanced surgeries and every exam that matters.',
        primaryButton: { text: 'Buy', link: '/products/advance-model-complete-bone' },
      },
      {
        id: 'cochlear-implant-model',
        name: 'Cochlear Implant Model',
        badge: 'Advanced',
        price: 20000,
        imageUrl: '/images/detail_macro.jpg',
        description:
          'Practise the delicate path to the cochlea and feel what a smooth electrode insertion should feel like — built for CI programmes and device training.',
        primaryButton: { text: 'Buy', link: '/products/cochlear-implant-model' },
      },
      {
        id: 'task-based-trainers',
        name: 'Task-Based Trainers',
        badge: 'Task',
        price: 20000,
        imageUrl: '/images/detail_middleear.jpg',
        description:
          'One skill per model, priced like a textbook — repeat it until it feels easy.',
        bulletPoints: [
          { point: 'Tympanoplasty Model' },
          { point: 'Facial Nerve Decompression Model' },
          { point: 'Stapedectomy Model' },
          { point: 'Ossiculoplasty Model' },
        ],
        primaryButton: { text: 'Buy', link: '/products/task-based-trainers' },
      },
    ],
  },
  {
    familyId: 'rhinology',
    title: 'Family 02 · Rhinology — Paranasal Sinus (PNS) Series',
    subtitle: 'Sinus anatomy as you actually meet it through the endoscope.',
    isAlt: false,
    items: [
      {
        id: 'pnsb',
        name: 'Advance PNS Model',
        badge: 'Advanced',
        price: 25000,
        imageUrl: '/images/prod2.jpg',
        description:
          'Complete sinonasal anatomy for endoscopic sinus surgery training — from uncinectomy through sphenoidotomy, under real instruments.',
        primaryButton: { text: 'Buy', link: '/products/pnsb' },
      },
      {
        id: 'pns',
        name: 'Task-Based PNS Model',
        badge: 'Task',
        price: 20000,
        imageUrl: '/images/prod3.jpg',
        description:
          'Focused FESS steps in a repeatable, consumable format for early endoscopic skills and instrument navigation.',
        primaryButton: { text: 'Buy', link: '/products/pns' },
      },
    ],
  },
  {
    familyId: 'balloon',
    title: 'Family 03 · Interventional Rhinology — Balloon Sinuplasty Series',
    subtitle: 'The only dedicated balloon dilation trainers in surgical simulation.',
    isAlt: true,
    items: [
      {
        id: 'maxillary-balloon-sinuplasty-trainer',
        name: 'Maxillary Balloon Sinuplasty Trainer',
        badge: 'Only from OSSA+',
        price: 20000,
        imageUrl: '/images/detail_nose.jpg',
        description:
          'Ostium identification, catheter navigation and balloon placement under endoscopic view.',
        primaryButton: { text: 'Buy', link: '/products/maxillary-balloon-sinuplasty-trainer' },
      },
      {
        id: 'frontal-balloon-sinuplasty-trainer',
        name: 'Frontal Balloon Sinuplasty Trainer',
        badge: 'Only from OSSA+',
        price: 20000,
        imageUrl: '/images/prod3.jpg',
        description:
          'Practise the challenging frontal recess pathway with realistic anatomical curvature.',
        primaryButton: { text: 'Buy', link: '/products/frontal-balloon-sinuplasty-trainer' },
      },
      {
        id: 'eustachian-tube-dilation-trainer',
        name: 'Eustachian Tube Dilation Trainer',
        badge: 'Only from OSSA+',
        price: 20000,
        imageUrl: '/images/detail_middleear.jpg',
        description:
          "The world's first Eustachian tube balloon dilation trainer for clinic procedure rehearsal.",
        primaryButton: { text: 'Buy', link: '/products/eustachian-tube-dilation-trainer' },
      },
    ],
  },
  {
    familyId: 'laryngology-custom',
    title: 'Laryngology, Vestibular & Custom Series',
    subtitle:
      'Advanced simulation models for airway, balance testing, and patient-specific surgical preparation.',
    isAlt: false,
    items: [
      {
        id: 'larynx',
        name: 'Artificial Larynx Model',
        badge: 'Family 04 · Laryngology',
        price: 20000,
        imageUrl: '/images/prod4.jpg',
        description:
          'Laryngeal framework and airway anatomy for procedural demonstration, airway teaching and course use — with replaceable glottic cassettes for lesion work.',
        primaryButton: { text: 'Buy', link: '/products/larynx' },
      },
      {
        id: 'labyrinth-model-epley-maneuver',
        name: 'Labyrinth Model for the Epley Maneuver',
        badge: 'Family 05 · Vestibular',
        price: 20000,
        imageUrl: '/images/detail_ear.jpg',
        description:
          'A functional semicircular-canal model demonstrating otoconia movement through each stage of repositioning — for ENT, neurology and physiotherapy teaching.',
        primaryButton: { text: 'Buy', link: '/products/labyrinth-model-epley-maneuver' },
      },
      {
        id: 'pathology-variants-patient-specific-models',
        name: 'Pathology Variants & Patient-Specific Models',
        badge: 'Family 06 · Pathological & Custom',
        price: 20000,
        imageUrl: '/images/detail_larynxtop.jpg',
        description:
          'Disease-state anatomy (cholesteatoma, sclerotic mastoid and more) at catalogue prices, and CT-to-model builds for rehearsing a specific patient’s surgery before you perform it.',
        primaryButton: { text: 'Buy', link: '/products/pathology-variants-patient-specific-models' },
        secondaryButton: { text: 'Discuss Variant', link: '/contact' },
      },
    ],
  },
]

export const getProductsPage = cache(async () => {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'products-page',
      limit: 1,
      depth: 1,
    })
    return res.docs[0] || null
  } catch (_error) {
    // Return null silently if products-page collection table is non-existent or erroring
    return null
  }
})

export const getCatalogProducts = cache(async () => {
  try {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'products',
      sort: 'displayOrder',
      limit: 100,
      depth: 2,
    })
    return res.docs || []
  } catch (error) {
    console.error('Error fetching Products from Payload:', error)
    return []
  }
})

export function mapPageFamilyItemToProductItem(item: any): ProductItem {
  const mediaUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : null
  const imageUrl = mediaUrl || item.imageUrl || '/images/prod1.jpg'
  const slug =
    item.slug ||
    item.id ||
    (item.name ? item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '')

  return {
    id: slug,
    name: item.name,
    badge: item.badge || undefined,
    price: typeof item.price === 'number' ? item.price : 20000,
    imageUrl,
    image: item.image,
    images: item.images,
    description: item.description || undefined,
    bulletPoints: item.bulletPoints || undefined,
    primaryButton: {
      text: item.primaryButton?.text || 'Buy',
      link:
        item.primaryButton?.link && item.primaryButton.link !== '/'
          ? item.primaryButton.link
          : `/products/${slug}`,
    },
    secondaryButton: {
      text: item.secondaryButton?.text || 'Enquire',
      link:
        item.secondaryButton?.link && item.secondaryButton.link !== '/'
          ? item.secondaryButton.link
          : `/contact?product=${encodeURIComponent(item.name || '')}`,
    },
  }
}

export function mapProductDocToItem(doc: any): ProductItem {
  let mediaUrl = ''
  if (typeof doc.image === 'object' && doc.image?.url) {
    mediaUrl = doc.image.url
  } else if (typeof doc.image === 'string') {
    mediaUrl = doc.image
  }
  const imageUrl = mediaUrl || doc.imageUrl || '/images/prod1.jpg'
  const slug = doc.slug || String(doc.id)

  const galleryImages: string[] = []
  if (imageUrl) {
    galleryImages.push(imageUrl)
  }
  if (Array.isArray(doc.images)) {
    for (const imgObj of doc.images) {
      const u = typeof imgObj === 'string' ? imgObj : imgObj?.image?.url || imgObj?.imageUrl || imgObj?.url
      if (u && !galleryImages.includes(u)) {
        galleryImages.push(u)
      }
    }
  }

  return {
    id: slug,
    name: doc.name,
    badge: doc.badge || undefined,
    price: typeof doc.price === 'number' ? doc.price : 20000,
    imageUrl,
    image: doc.image,
    images: galleryImages.length > 0 ? galleryImages : undefined,
    description: doc.shortDescription || doc.description || undefined,
    bulletPoints: Array.isArray(doc.bulletPoints) ? doc.bulletPoints : undefined,
    primaryButton: {
      text: doc.primaryButtonText || 'Buy',
      link: `/products/${slug}`,
    },
    secondaryButton: {
      text: doc.secondaryButtonText || 'Enquire',
      link: doc.secondaryButtonLink || `/contact?product=${encodeURIComponent(doc.name)}`,
    },
  }
}

export async function getUnifiedProductFamilies(pageData?: any): Promise<ProductFamily[]> {
  const catalogProducts = await getCatalogProducts()

  // 1. If dynamic products exist in Payload 'products' collection, show ONLY dynamic products
  if (catalogProducts && catalogProducts.length > 0) {
    const dynamicFamilies: ProductFamily[] = defaultProductFamilies.map((defFamily) => ({
      familyId: defFamily.familyId,
      title: defFamily.title,
      subtitle: defFamily.subtitle,
      isAlt: defFamily.isAlt,
      items: [], // Start empty so NO dummy cards are included when dynamic products are present
    }))

    for (const prodDoc of catalogProducts) {
      const item = mapProductDocToItem(prodDoc)
      const slug = (prodDoc.slug || '').toLowerCase()
      const cat = (prodDoc.category || '').toLowerCase()

      // Find target family by matching category or familyId
      let targetFamily = dynamicFamilies.find((f) => {
        const fid = (f.familyId || '').toLowerCase()
        const ftitle = (f.title || '').toLowerCase()
        return (
          (cat && (fid.includes(cat) || ftitle.includes(cat))) ||
          (slug && (slug.includes(fid) || fid.includes(slug)))
        )
      })

      // Fallback matching logic based on keywords in slug or category
      if (!targetFamily) {
        if (slug.includes('tb') || slug.includes('mastoid') || slug.includes('bone') || cat.includes('otology')) {
          targetFamily = dynamicFamilies[0]
        } else if (slug.includes('pns') || cat.includes('rhinology')) {
          targetFamily = dynamicFamilies[1]
        } else if (slug.includes('balloon') || cat.includes('balloon')) {
          targetFamily = dynamicFamilies[2]
        } else if (slug.includes('larynx') || cat.includes('laryngology') || cat.includes('vestibular')) {
          targetFamily = dynamicFamilies[3]
        } else {
          targetFamily = dynamicFamilies[0]
        }
      }

      if (targetFamily) {
        targetFamily.items.push(item)
      }
    }

    const activeFamilies = dynamicFamilies.filter((f) => f.items.length > 0)
    if (activeFamilies.length > 0) {
      return activeFamilies
    }
  }

  // 2. If pageData has explicitly configured families with items, map them
  if (pageData?.families && Array.isArray(pageData.families) && pageData.families.length > 0) {
    const hasCustomItems = pageData.families.some(
      (fam: any) => Array.isArray(fam.items) && fam.items.length > 0
    )
    if (hasCustomItems) {
      return pageData.families.map((fam: any, idx: number) => {
        const defaultDef = defaultProductFamilies[idx] || defaultProductFamilies[0]
        return {
          familyId: fam.familyId || defaultDef.familyId,
          title: fam.title || defaultDef.title,
          subtitle: fam.subtitle || defaultDef.subtitle,
          isAlt: fam.isAlt !== undefined ? fam.isAlt : defaultDef.isAlt,
          items: Array.isArray(fam.items) ? fam.items.map(mapPageFamilyItemToProductItem) : [],
        }
      })
    }
  }

  // 3. Fallback: Only show dummy fallback product families if NO dynamic data is available
  return defaultProductFamilies
}
