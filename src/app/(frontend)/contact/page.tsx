import React from 'react'
import type { Metadata } from 'next'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { ContactContent } from '@/components/Contact/ContactContent'

export const metadata: Metadata = {
  title: 'Contact Us | ProGuide',
  description:
    'Contact ProGuide / KnowledgeBridge International — workshops, 3D simulation models, institutional orders.',
}

export default function ContactPage() {
  return (
    <>
   
      <main className="flex-1">
        <ContactContent />
      </main>
    
    </>
  )
}
