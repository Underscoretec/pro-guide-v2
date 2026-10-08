import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getWorkshopsPage() {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'workshops-page',
      limit: 1,
    })
    return res.docs[0] || null
  } catch (error) {
    console.error('Error fetching workshops page data:', error)
    return null
  }
}
