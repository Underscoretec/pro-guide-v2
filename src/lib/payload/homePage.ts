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

export default getHomePage
