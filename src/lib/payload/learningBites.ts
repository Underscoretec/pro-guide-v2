import { cache } from 'react'
import { getPayloadClient } from './client'

export const getLearningBitesPage = cache(async () => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'learning-bites-page',
      limit: 1,
    })
    return result.docs[0] || null
  } catch (error) {
    console.error('Error fetching LearningBitesPage collection:', error)
    return null
  }
})

export default getLearningBitesPage
