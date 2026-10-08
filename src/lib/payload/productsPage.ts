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
        name: 'Basic Model — Mastoid Bone',
        badge: 'Foundation',
        price: 20000,
        imageUrl: '/images/prod1.jpg',
        description:
          'Learn to hold the drill, identify the landmarks and open the mastoid safely — where everyone begins.',
        primaryButton: { text: 'Buy / Enquire', link: 'https://pro-guide.in/' },
      },
      {
        name: 'Advance Model — Complete Bone',
        badge: 'Complete',
        price: 20000,
        imageUrl: '/images/detail_sigmoid.jpg',
        description:
          'The complete bone with middle and inner ear in place — for advanced surgeries and every exam that matters.',
        primaryButton: { text: 'Buy / Enquire', link: 'https://pro-guide.in/' },
      },
      {
        name: 'Cochlear Implant Model',
        badge: 'Advanced',
        price: 20000,
        imageUrl: '/images/detail_macro.jpg',
        description:
          'Practise the delicate path to the cochlea and feel what a smooth electrode insertion should feel like — built for CI programmes and device training.',
        primaryButton: { text: 'Buy / Enquire', link: 'https://pro-guide.in/' },
      },
      {
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
        primaryButton: { text: 'Buy / Enquire', link: 'https://pro-guide.in/' },
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
        name: 'Advance PNS Model',
        badge: 'Advanced',
        price: 25000,
        imageUrl: '/images/prod2.jpg',
        description:
          'Complete sinonasal anatomy for endoscopic sinus surgery training — from uncinectomy through sphenoidotomy, under real instruments.',
        primaryButton: { text: 'Buy / Enquire', link: 'https://pro-guide.in/' },
      },
      {
        name: 'Task-Based PNS Model',
        badge: 'Task',
        price: 20000,
        imageUrl: '/images/prod3.jpg',
        description:
          'Focused FESS steps in a repeatable, consumable format for early endoscopic skills and instrument navigation.',
        primaryButton: { text: 'Buy / Enquire', link: 'https://pro-guide.in/' },
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
        name: 'Maxillary Balloon Sinuplasty Trainer',
        badge: 'Only from OSSA+',
        price: 20000,
        imageUrl: '/images/detail_nose.jpg',
        description:
          'Ostium identification, catheter navigation and balloon placement under endoscopic view.',
        primaryButton: { text: 'Enquire', link: '/contact' },
      },
      {
        name: 'Frontal Balloon Sinuplasty Trainer',
        badge: 'Only from OSSA+',
        price: 20000,
        imageUrl: '/images/prod3.jpg',
        description:
          'Practise the challenging frontal recess pathway with realistic anatomical curvature.',
        primaryButton: { text: 'Enquire', link: '/contact' },
      },
      {
        name: 'Eustachian Tube Dilation Trainer',
        badge: 'Only from OSSA+',
        price: 20000,
        imageUrl: '/images/detail_middleear.jpg',
        description:
          "The world's first Eustachian tube balloon dilation trainer for clinic procedure rehearsal.",
        primaryButton: { text: 'Enquire', link: '/contact' },
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
        name: 'Artificial Larynx Model',
        badge: 'Family 04 · Laryngology',
        price: 20000,
        imageUrl: '/images/prod4.jpg',
        description:
          'Laryngeal framework and airway anatomy for procedural demonstration, airway teaching and course use — with replaceable glottic cassettes for lesion work.',
        primaryButton: { text: 'Buy / Enquire', link: 'https://pro-guide.in/' },
      },
      {
        name: 'Labyrinth Model for the Epley Maneuver',
        badge: 'Family 05 · Vestibular',
        price: 20000,
        imageUrl: '/images/detail_ear.jpg',
        description:
          'A functional semicircular-canal model demonstrating otoconia movement through each stage of repositioning — for ENT, neurology and physiotherapy teaching.',
        primaryButton: { text: 'Enquire', link: '/contact' },
      },
      {
        name: 'Pathology Variants & Patient-Specific Models',
        badge: 'Family 06 · Pathological & Custom',
        price: 20000,
        imageUrl: '/images/detail_larynxtop.jpg',
        description:
          'Disease-state anatomy (cholesteatoma, sclerotic mastoid and more) at catalogue prices, and CT-to-model builds for rehearsing a specific patient’s surgery before you perform it.',
        primaryButton: { text: 'Get Customized Model', link: '/customized-model' },
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
      depth: 2,
    })
    return res.docs[0] || null
  } catch (error) {
    console.error('Error fetching ProductsPage from Payload:', error)
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

export function mapProductDocToItem(doc: any): ProductItem {
  const mediaUrl = typeof doc.image === 'object' && doc.image?.url ? doc.image.url : null
  const imageUrl = mediaUrl || doc.imageUrl || '/images/prod1.jpg'

  return {
    id: doc.slug || String(doc.id),
    name: doc.name,
    badge: doc.badge || undefined,
    price: typeof doc.price === 'number' ? doc.price : 20000,
    imageUrl,
    image: doc.image,
    images: doc.images,
    description: doc.shortDescription || undefined,
    bulletPoints: doc.bulletPoints || undefined,
    primaryButton: {
      text: doc.primaryButtonText || 'Buy',
      link: `/products/${doc.slug}`,
    },
    secondaryButton: {
      text: doc.secondaryButtonText || 'Enquire',
      link: doc.secondaryButtonLink || `/contact?product=${encodeURIComponent(doc.name)}`,
    },
  }
}

export async function getUnifiedProductFamilies(): Promise<ProductFamily[]> {
  const catalogProducts = await getCatalogProducts()

  if (catalogProducts.length === 0) {
    return defaultProductFamilies
  }

  // Check if products have categories defined
  const rawCategories = catalogProducts
    .map((p: any) => (typeof p.category === 'string' ? p.category.trim() : ''))
    .filter((cat: string): cat is string => Boolean(cat))

  const categories: string[] = Array.from(new Set(rawCategories))

  if (categories.length > 1) {
    // If multiple categories exist, group products by category
    return categories.map((cat: string, idx: number) => {
      const items = catalogProducts
        .filter((p: any) => typeof p.category === 'string' && p.category.trim() === cat)
        .map(mapProductDocToItem)

      return {
        familyId: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        title: cat,
        subtitle: `Explore our ${cat} simulation models.`,
        isAlt: idx % 2 === 1,
        items,
      }
    })
  }

  // Single category or no category: show all products cleanly
  return [
    {
      familyId: 'all-products',
      title: (categories[0] as string | undefined) || 'Product Offerings',
      subtitle: 'The complete surgical simulation models catalogue cast in OSSA+ Composite™.',
      isAlt: false,
      items: catalogProducts.map(mapProductDocToItem),
    },
  ]
}
