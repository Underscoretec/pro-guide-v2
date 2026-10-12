import React from 'react'
import type { Metadata } from 'next'
import { CartView } from '@/components/Cart/CartView'
import { roboto } from '@/font'

export const metadata: Metadata = {
  title: 'Shopping Cart | ProGuide 3D Simulation Models',
  description:
    'Review your selected ProGuide 3D ENT surgical simulation models, manage items, view taxes & shipping, and proceed to checkout.',
}

export default function CartPage() {
  return (
    <main className={`${roboto.className} flex-1 bg-white`}>
      <CartView />
    </main>
  )
}
