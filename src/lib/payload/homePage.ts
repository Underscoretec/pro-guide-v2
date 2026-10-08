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

    if (!result.docs || result.docs.length === 0) {
      return []
    }

    return result.docs.map((doc: any) => ({
      id: doc.id,
      title: doc.name,
      slug: doc.slug,
      badge: doc.badge || undefined,
      variant: doc.variant || 'Available in Left and Right variant',
      price:
        typeof doc.price === 'number'
          ? `Rs ${doc.price.toLocaleString('en-IN')}`
          : String(doc.price || 'Rs 20,000'),
      gstNote: '+ 18% GST',
      image: doc.image,
      imageUrl:
        doc.imageUrl ||
        (typeof doc.image === 'object' && doc.image?.url ? doc.image.url : undefined),
      images: doc.images,
      detailsUrl: `/products/${doc.slug}`,
      cartUrl: '/cart',
    }))
  } catch (error) {
    console.error('Error fetching landing products from Payload:', error)
    return []
  }
})

export default getHomePage
