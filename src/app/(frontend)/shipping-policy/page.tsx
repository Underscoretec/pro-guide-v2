import React from 'react'
import type { Metadata } from 'next'
import ShippingPolicy from '@/components/ShippingPolicy/ShippingPolicy'

export const metadata: Metadata = {
  title: 'Shipping Policy | ProGuide',
  description:
    'Learn about ProGuide shipping rates, delivery timelines, and international shipping options.',
}

export default function ShippingPolicyPage() {
  return <ShippingPolicy />
}
