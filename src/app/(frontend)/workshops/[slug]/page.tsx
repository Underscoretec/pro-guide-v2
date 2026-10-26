import React from 'react'
import type { Metadata } from 'next'
import { WorkshopDetailContent } from '@/components/Workshops/WorkshopDetailContent'
import { getWorkshopDetailBySlug } from '@/lib/payload/workshopDetails'
import { isRegisteredForWorkshop } from '@/lib/workshops/registration'
import { roboto } from '@/font'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug || ''
  const workshop = await getWorkshopDetailBySlug(slug)
  const title = workshop?.title
    ? workshop.title
    : slug
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
  const workshop = await getWorkshopDetailBySlug(resolvedParams.slug)
  const isRegistered = await isRegisteredForWorkshop(resolvedParams.slug.toLowerCase())
  return (
    <main className={`${roboto.className} flex-1 bg-white`}>
      <WorkshopDetailContent slug={resolvedParams.slug} data={workshop} isRegistered={isRegistered} />
    </main>
  )
}
