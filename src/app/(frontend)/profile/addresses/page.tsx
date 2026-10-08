import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload/client'
import { getCurrentUser } from '@/lib/auth/session'
import { AddressList } from '@/components/Profile/AddressList'

export const metadata: Metadata = { title: 'Saved Address | ProGuide' }

export default async function AddressesPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/sign-in')

  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'shipping-addresses',
    where: { user: { equals: user.id } },
    sort: '-isDefault',
    depth: 0,
    limit: 50,
    user,
    overrideAccess: false,
  })

  return <AddressList addresses={docs} fullName={user.fullName} phone={user.phoneNumber ?? ''} />
}
