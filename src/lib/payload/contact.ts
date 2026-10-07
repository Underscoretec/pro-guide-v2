import { cache } from 'react'
import { getPayloadClient } from './client'

export const getContactPage = cache(async () => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'contact-page',
      limit: 1,
    })
    return result.docs[0] || null
  } catch (error) {
    console.error('Error fetching ContactPage collection:', error)
    return null
  }
})

export default getContactPage
