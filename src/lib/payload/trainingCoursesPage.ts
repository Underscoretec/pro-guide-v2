import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getTrainingCoursesPage() {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'training-courses-page',
      limit: 1,
    })
    return res.docs[0] || null
  } catch (error) {
    console.error('Error fetching training courses page data:', error)
    return null
  }
}
