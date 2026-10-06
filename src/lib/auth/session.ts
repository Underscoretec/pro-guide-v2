import { headers } from 'next/headers'
import { getPayloadClient } from '@/lib/payload/client'

export const getCurrentUser = async () => {
  try {
    const payload = await getPayloadClient()
    const { user } = await payload.auth({ headers: await headers() })
    return user ?? null
  } catch {
    return null
  }
}
