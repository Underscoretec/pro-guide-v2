import { cache } from 'react'
import { getPayloadClient } from './client'

export const getHeader = cache(async () => {
  try {
    const payload = await getPayloadClient()
    return await payload.findGlobal({ slug: 'header' })
  } catch (error) {
    console.error('Error fetching Header global:', error)
    return null
  }
})

export const getFooter = cache(async () => {
  try {
    const payload = await getPayloadClient()
    return await payload.findGlobal({ slug: 'footer' })
  } catch (error) {
    console.error('Error fetching Footer global:', error)
    return null
  }
})

