import React from 'react'
import type { Metadata } from 'next'
import { WorkshopDetailContent } from '@/components/Workshops/WorkshopDetailContent'
import { roboto } from '@/font'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug || ''
  const title = slug
    ? slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Workshop Details'

  return {
    title: `${title} — KBI SkillBridge | ProGuide`,
    description: `Hands-on surgical dissection workshop details for ${title} using anatomically accurate 3D simulation models.`,
  }
}

export default async function WorkshopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  return (
    <main className={`${roboto.className} flex-1 bg-white`}>
      <WorkshopDetailContent slug={resolvedParams.slug} />
    </main>
  )
}
