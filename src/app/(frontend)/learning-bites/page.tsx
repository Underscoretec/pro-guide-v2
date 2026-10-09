import React from 'react'
import type { Metadata } from 'next'
import LearningBitesContent from '@/components/LearningBites/LearningBitesContent'
import getLearningBitesPage from '@/lib/payload/learningBites'

export const metadata: Metadata = {
  title: 'Learning Bites | ProGuide',
  description:
    'Watch surgical demonstration videos, 3D model drilling techniques, and expert step-by-step tutorials from master otolaryngology faculty.',
}

export default async function LearningBitesPage() {
  const data = await getLearningBitesPage()

  return (
    <main className="flex-1 bg-white">
      <LearningBitesContent data={data} />
    </main>
  )
}
