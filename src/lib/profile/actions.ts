'use server'

import { revalidatePath } from 'next/cache'
import { getPayloadClient } from '@/lib/payload/client'
import { getCurrentUser } from '@/lib/auth/session'
import type { AuthState } from '@/lib/auth/actions'

const str = (fd: FormData, key: string) => String(fd.get(key) ?? '').trim()

const unsetOtherDefaults = async (payload: any, user: any, exceptId?: number | string) => {
  const { docs } = await payload.find({
    collection: 'shipping-addresses',
    where: { user: { equals: user.id }, isDefault: { equals: true } },
    user,
    overrideAccess: false,
    depth: 0,
    limit: 100,
  })
  for (const d of docs) {
    if (d.id === exceptId) continue
    await payload.update({ collection: 'shipping-addresses', id: d.id, data: { isDefault: false }, user, overrideAccess: false })
  }
}

export async function saveAddress(id: number | string | null, _prev: AuthState, formData: FormData): Promise<AuthState> {
  const user = await getCurrentUser()
  if (!user) return { error: 'Please sign in again.' }

  const data = {
    addressLine: str(formData, 'addressLine'),
    city: str(formData, 'city'),
    state: str(formData, 'state'),
    postalCode: str(formData, 'postalCode'),
    country: str(formData, 'country') || 'India',
  }
  const fieldErrors: Record<string, string> = {}
  if (!data.addressLine) fieldErrors.addressLine = 'Street address is required'
  if (!data.city) fieldErrors.city = 'City is required'
  if (!data.state) fieldErrors.state = 'State is required'
  if (!data.postalCode) fieldErrors.postalCode = 'Postal code is required'
  if (Object.keys(fieldErrors).length) return { fieldErrors, values: data }

  const payload = await getPayloadClient()
  try {
    if (id) {
      // access rules restrict this to the owner's own addresses
      await payload.update({ collection: 'shipping-addresses', id, data, user, overrideAccess: false })
    } else {
      const { totalDocs } = await payload.count({
        collection: 'shipping-addresses',
        where: { user: { equals: user.id } },
        user,
        overrideAccess: false,
      })
      await payload.create({
        collection: 'shipping-addresses',
        data: { ...data, user: user.id, isDefault: totalDocs === 0 },
        user,
        overrideAccess: false,
      })
    }
  } catch (err) {
    console.error('Save address failed', err)
    return { error: 'Could not save the address.', values: data }
  }
  revalidatePath('/profile/addresses')
  return { values: { saved: '1' } }
}

export async function setDefaultAddress(id: number | string) {
  const user = await getCurrentUser()
  if (!user) return
  const payload = await getPayloadClient()
  await payload.update({ collection: 'shipping-addresses', id, data: { isDefault: true }, user, overrideAccess: false })
  await unsetOtherDefaults(payload, user, id)
  revalidatePath('/profile/addresses')
}

export async function removeAddress(id: number | string) {
  const user = await getCurrentUser()
  if (!user) return
  const payload = await getPayloadClient()
  await payload.delete({ collection: 'shipping-addresses', id, user, overrideAccess: false })
  revalidatePath('/profile/addresses')
}
