import React from 'react'
import type { Metadata } from 'next'
import { CheckoutView } from '@/components/Cart/CheckoutView'

export const metadata: Metadata = {
  title: 'Shipping and Checkout | ProGuide 3D Simulation Models',
  description:
    'Complete your shipping and billing details, review your order and taxes, and place your ProGuide simulation models order.',
}

export default function CheckoutPage() {
  return (
    <main className="flex-1 bg-white">
      <CheckoutView />
    </main>
  )
}
