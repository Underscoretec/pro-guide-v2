import React from 'react'
import type { Metadata } from 'next'
import RefundPolicy from '@/components/RefundPolicy/RefundPolicy'

export const metadata: Metadata = {
  title: 'Cancellation and Return Policy | ProGuide',
  description:
    'Review the cancellation, refund, and return policy for orders placed with ProGuide by KnowledgeBridge International.',
}

export default function RefundPolicyPage() {
  return <RefundPolicy />
}
