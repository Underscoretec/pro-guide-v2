import React from 'react'
import type { Metadata } from 'next'
import VideosContent from '@/components/Videos/VideosContent'

export const metadata: Metadata = {
  title: 'Otolaryngology Video Library | ProGuide',
  description:
    'Watch 3D temporal bone, paranasal sinus and larynx surgical demonstration videos and drilling technique tutorials.',
}

export default function VideosPage() {
  return (
    <main className="flex-1 bg-white">
      <VideosContent />
    </main>
  )
}
