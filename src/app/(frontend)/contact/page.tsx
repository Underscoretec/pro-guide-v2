import React from 'react'
import type { Metadata } from 'next'
import { ContactContent } from '@/components/Contact/ContactContent'
import { getContactPage } from '@/lib/payload/contact'

export const metadata: Metadata = {
  title: 'Contact Us | ProGuide',
  description:
    'Contact ProGuide / KnowledgeBridge International — workshops, 3D simulation models, institutional orders.',
}

export default async function ContactPage() {
  const contactData = await getContactPage()

  return (
    <main className="flex-1 bg-white">
      <ContactContent data={contactData} />
    </main>
  )
}
