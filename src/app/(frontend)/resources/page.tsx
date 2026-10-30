import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import ResourceLibraryContent from '@/components/ResourceLibrary/ResourceLibraryContent'
import { roboto } from '@/font'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Resource Library & PDF Catalogues | ProGuide',
  description:
    "Access and download verified educational materials, curriculum modules, and technical brochures for ProGuide's Otolaryngology Head & Neck 3D simulation models and hands-on dissection workshops.",
}

export default async function ResourcesPage() {
  let resourcesData: any = null

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'resources',
      limit: 100,
      overrideAccess: true,
    })
    if (res.docs.length > 0) {
      const allDocuments = res.docs.flatMap((doc: any) => doc.documents ?? [])
      resourcesData = { ...res.docs[0], documents: allDocuments }
    }
  } catch (error) {
    console.error('Error fetching resources data from Payload:', error)
  }

  return (
    <main className={`${roboto.className} flex-1`}>
      <ResourceLibraryContent data={resourcesData} />
    </main>
  )
}
