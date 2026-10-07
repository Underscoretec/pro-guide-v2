import React from 'react'
import type { Metadata } from 'next'
import { CartView } from '@/components/Cart/CartView'

export const metadata: Metadata = {
  title: 'Shopping Cart | ProGuide 3D Simulation Models',
  description:
    'Review your selected ProGuide 3D ENT surgical simulation models, manage items, view taxes & shipping, and proceed to checkout.',
}

export default function CartPage() {
  return (
    <main className="flex-1 bg-white">
      <CartView />
    </main>
  )
}
