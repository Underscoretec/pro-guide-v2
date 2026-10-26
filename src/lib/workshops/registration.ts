'use server'

import { revalidatePath } from 'next/cache'
import { getPayloadClient } from '@/lib/payload/client'
import { getCurrentUser } from '@/lib/auth/session'

export const isRegisteredForWorkshop = async (slug: string): Promise<boolean> => {
  const user = await getCurrentUser()
  if (!user || !slug) return false
  const payload = await getPayloadClient()
  const existing = await payload.find({
    collection: 'workshop-registrations',
    where: { and: [{ user: { equals: user.id } }, { workshopSlug: { equals: slug } }] },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  return existing.totalDocs > 0
}

export const registerForWorkshop = async (
  slug: string,
  title: string,
): Promise<{ success: boolean; error?: string }> => {
  const user = await getCurrentUser()
  if (!user) return { success: false, error: 'Please sign in to register.' }
  if (!slug) return { success: false, error: 'Invalid workshop.' }

  if (await isRegisteredForWorkshop(slug)) return { success: true }

  const payload = await getPayloadClient()
  await payload.create({
    collection: 'workshop-registrations',
    data: { user: user.id, workshopSlug: slug, workshopTitle: title || slug },
    overrideAccess: true,
  })
  revalidatePath(`/workshops/${slug}`)
  return { success: true }
}
