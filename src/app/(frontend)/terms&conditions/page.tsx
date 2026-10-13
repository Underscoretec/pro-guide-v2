import React from 'react'
import type { Metadata } from 'next'
import Termscondition from '@/components/Terms&Conditions/Terms&conditions'

export const metadata: Metadata = {
  title: 'Terms of Service | ProGuide',
  description:
    'Read the terms and conditions governing the use of ProGuide products, services, and online store operated by KnowledgeBridge International Private Limited.',
}

export default function TermsConditionPage() {
  return <Termscondition />
}
