import React from 'react'
import type { Metadata } from 'next'
import WorkshopsContent from '@/components/Workshops/WorkshopsContent'
import { getWorkshopsPage } from '@/lib/payload/workshopsPage'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Workshops — Register | ProGuide',
  description:
    'ProGuide hands-on workshops: 3D temporal bone dissection, paranasal sinus surgery, microlaryngoscopy and laser surgeries.',
}

export default async function WorkshopsPage() {
  const pageData = await getWorkshopsPage()

  return (
    <main className="flex-1 bg-white">
      <WorkshopsContent data={pageData} />
    </main>
  )
}
