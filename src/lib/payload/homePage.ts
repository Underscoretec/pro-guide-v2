import { cache } from 'react'
import { getPayloadClient } from './client'

export const getHomePage = cache(async () => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'home-page',
      limit: 1,
      depth: 2,
    })

    return result.docs[0] || null
  } catch (error) {
    console.error('Error fetching homePage document:', error)
    return null
  }
})

export const getLandingProducts = cache(async () => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'products',
      where: {
        showOnLandingPage: {
          equals: true,
        },
      },
      sort: 'displayOrder',
      limit: 50,
      depth: 2,
    })

    let docs = result.docs || []

    if (docs.length === 0) {
      const allRes = await payload.find({
        collection: 'products',
        sort: 'displayOrder',
        limit: 50,
        depth: 2,
      })
      docs = allRes.docs || []
    }

    if (docs.length === 0) {
      return []
    }

    return docs.map((doc: any) => {
      let mainImageUrl = doc.imageUrl || ''
      if (!mainImageUrl && typeof doc.image === 'object' && doc.image?.url) {
        mainImageUrl = doc.image.url
      }

      const galleryImages: string[] = []
      if (mainImageUrl) galleryImages.push(mainImageUrl)
      if (Array.isArray(doc.images)) {
        for (const imgObj of doc.images) {
          const u = typeof imgObj === 'string' ? imgObj : imgObj?.image?.url || imgObj?.imageUrl || imgObj?.url
          if (u && !galleryImages.includes(u)) {
            galleryImages.push(u)
          }
        }
      }

      return {
        id: doc.slug || String(doc.id),
        title: doc.name,
        name: doc.name,
        slug: doc.slug,
        badge: doc.badge || undefined,
        variant: doc.variant || 'Available in Left and Right variant',
        price:
          typeof doc.price === 'number'
            ? `Rs ${doc.price.toLocaleString('en-IN')}`
            : String(doc.price || 'Rs 20,000'),
        gstNote: '+ 18% GST',
        image: doc.image,
        imageUrl: mainImageUrl || '/images/prod1.jpg',
        images: galleryImages.length > 0 ? galleryImages : undefined,
        detailsUrl: `/products/${doc.slug}`,
        primaryButtonText: doc.primaryButtonText || 'Buy',
        secondaryButtonText: doc.secondaryButtonText || 'Enquire',
        secondaryButtonLink:
          doc.secondaryButtonLink || `/contact?product=${encodeURIComponent(doc.name)}`,
        cartUrl: '/cart',
      }
    })
  } catch (error) {
    console.error('Error fetching landing products from Payload:', error)
    return []
  }
})

export default getHomePage
