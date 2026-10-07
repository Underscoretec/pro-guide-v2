import React from 'react'
import type { Metadata } from 'next'
import { CustomizedModelContent } from '@/components/CustomizedModel/CustomizedModelContent'
import { getCustomizedModelPage } from '@/lib/payload/customizedModel'

export const metadata: Metadata = {
  title: 'Get Your Own Customized 3D Model | ProGuide',
  description:
    'Upload your CT (DICOM) and get a patient-specific 3D simulated model cast for surgical rehearsal.',
}

export default async function CustomizedModelPage() {
  const data = await getCustomizedModelPage()

  return (
    <main className="flex-1">
      <CustomizedModelContent data={data} />
    </main>
  )
}

