import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import { WorkshopEnrollmentView } from '@/components/Workshops/WorkshopEnrollmentView'
import { getWorkshopDetailBySlug } from '@/lib/payload/workshopDetails'
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
      : 'Workshop Checkout'

  return {
    title: `Complete Enrollment — ${title} | ProGuide`,
    description: `Complete your registration for ${title}.`,
  }
}

export default async function WorkshopCheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const resolvedParams = await params
  const workshop = await getWorkshopDetailBySlug(resolvedParams.slug)

  return (
    <main className={`${roboto.className} flex-1 bg-[#FAFAFA]`}>
      <Suspense fallback={<div className="p-8 text-center text-sm text-gray-500">Loading enrollment...</div>}>
        <WorkshopEnrollmentView slug={resolvedParams.slug} data={workshop} />
      </Suspense>
    </main>
  )
}
