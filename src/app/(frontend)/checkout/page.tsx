import React from 'react'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/session'
import { getPayloadClient } from '@/lib/payload/client'
import { CheckoutView } from '@/components/Cart/CheckoutView'
import type { ShippingAddress } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Shipping and Checkout | ProGuide 3D Simulation Models',
  description:
    'Complete your shipping and billing details, review your order and taxes, and place your ProGuide simulation models order.',
}

export default async function CheckoutPage() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/sign-in?redirect=/checkout')
  }

  const payload = await getPayloadClient()
  const { docs: addresses } = await payload.find({
    collection: 'shipping-addresses',
    where: { user: { equals: user.id } },
    sort: '-isDefault',
    depth: 0,
    limit: 50,
    user,
    overrideAccess: false,
  })

  return (
    <main className="flex-1 bg-white">
      <CheckoutView
        user={{
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
        }}
        initialAddresses={addresses as ShippingAddress[]}
      />
    </main>
  )
}
