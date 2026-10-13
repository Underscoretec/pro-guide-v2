import React from 'react'
import type { Metadata } from 'next'
import PrivacyPolicy from '@/components/PrivacyPolicy/PrivacyPolicy'

export const metadata: Metadata = {
  title: 'Privacy Policy | ProGuide',
  description:
    'Learn how KnowledgeBridge International Private Limited collects, uses, and protects your personal data on ProGuide.',
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />
}
