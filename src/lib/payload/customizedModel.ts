import { cache } from 'react'
import { getPayloadClient } from './client'

export const getCustomizedModelPage = cache(async () => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'customized-model-page',
      limit: 1,
    })
    return result.docs[0] || null
  } catch (error) {
    console.error('Error fetching CustomizedModelPage collection:', error)
    return null
  }
})

export default getCustomizedModelPage
