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

export async function getUnifiedProductFamilies(pageData?: any): Promise<ProductFamily[]> {
  const [catalogProducts, pageDoc] = await Promise.all([
    getCatalogProducts(),
    pageData ? Promise.resolve(pageData) : getProductsPage(),
  ])

  // 1. Check if user configured families directly in Products Page
  const pageFamilies: any[] = Array.isArray(pageDoc?.families) ? pageDoc.families : []
  const hasPageFamilies =
    pageFamilies.length > 0 &&
    pageFamilies.some((f) => Array.isArray(f.items) && f.items.length > 0)

  // Format page families
  const formattedPageFamilies: ProductFamily[] = pageFamilies.map((f: any, idx: number) => ({
    familyId: f.familyId || `family-${idx + 1}`,
    title: f.title || `Family 0${idx + 1}`,
    subtitle: f.subtitle || undefined,
    isAlt: f.isAlt ?? idx % 2 === 1,
    items: Array.isArray(f.items) ? f.items.map(mapPageFamilyItemToProductItem) : [],
  }))

  const getFamilyCategoryKey = (f: { familyId?: string; title?: string }) => {
    const t = (f.title || '').toLowerCase()
    const fid = (f.familyId || '').toLowerCase()
    if (
      fid.includes('otology') ||
      t.includes('otology') ||
      t.includes('temporal bone') ||
      t.includes('family 01')
    )
      return 'otology'
    if (
      fid.includes('rhinology') ||
      (t.includes('rhinology') && !t.includes('interventional')) ||
      t.includes('pns') ||
      t.includes('sinus') ||
      t.includes('family 02')
    )
      return 'rhinology'
    if (
      fid.includes('balloon') ||
      t.includes('balloon') ||
      t.includes('interventional') ||
      t.includes('family 03')
    )
      return 'balloon'
    if (
      fid.includes('laryngology') ||
      t.includes('laryngology') ||
      t.includes('vestibular') ||
      t.includes('custom') ||
      t.includes('family 04')
    )
      return 'laryngology-custom'
    return null
  }

  // If user configured families in Products Page:
  if (hasPageFamilies) {
    const mergedFamilies = defaultProductFamilies.map((defFamily) => {
      const match = formattedPageFamilies.find((pf) => {
        const pfKey = getFamilyCategoryKey(pf)
        return pfKey && pfKey === defFamily.familyId
      })
      if (match && match.items.length > 0) {
        return {
          ...defFamily,
          title: match.title || defFamily.title,
          subtitle: match.subtitle || defFamily.subtitle,
          isAlt: match.isAlt ?? defFamily.isAlt,
          items: match.items,
        }
      }
      return defFamily
    })

    // Add any custom page families that didn't match the 4 standard ones
    for (const pf of formattedPageFamilies) {
      if (!getFamilyCategoryKey(pf) && pf.items.length > 0) {
        mergedFamilies.push(pf)
      }
    }

    // Integrate any catalogProducts if present
    if (catalogProducts.length > 0) {
      for (const prod of catalogProducts) {
        const item = mapProductDocToItem(prod)
        const cat = (prod.category || '').toLowerCase()
        const targetFamily = mergedFamilies.find((f) => {
          const k = getFamilyCategoryKey(f)
          return (
            (k && cat.includes(k)) ||
            (f.title && f.title.toLowerCase().includes(cat)) ||
            (f.familyId && cat.includes(f.familyId))
          )
        })
        if (targetFamily) {
          const existingIdx = targetFamily.items.findIndex(
            (i) =>
              i.name.toLowerCase() === item.name.toLowerCase() ||
              (item.id && i.id === item.id)
          )
          if (existingIdx > -1) {
            targetFamily.items[existingIdx] = item
          } else {
            targetFamily.items.push(item)
          }
        }
      }
    }

    return mergedFamilies
  }

  // If no page families, but catalogProducts are present:
  if (catalogProducts.length > 0) {
    const rawCategories = catalogProducts
      .map((p: any) => (typeof p.category === 'string' ? p.category.trim() : ''))
      .filter((cat: string): cat is string => Boolean(cat))

    const categories: string[] = Array.from(new Set(rawCategories))

    if (categories.length > 1) {
      return categories.map((cat: string, idx: number) => {
        const items = catalogProducts
          .filter(
            (p: any) =>
              typeof p.category === 'string' && p.category.trim() === cat
          )
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

    return [
      {
        familyId: 'all-products',
        title: (categories[0] as string | undefined) || 'Product Offerings',
        subtitle:
          'The complete surgical simulation models catalogue cast in OSSA+ Composite™.',
        isAlt: false,
        items: catalogProducts.map(mapProductDocToItem),
      },
    ]
  }

  // Fallback to default product families
  return defaultProductFamilies
}
