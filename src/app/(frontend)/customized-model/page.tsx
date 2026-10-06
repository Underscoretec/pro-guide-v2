import React from 'react'
import type { Metadata } from 'next'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { CustomizedModelContent } from '@/components/CustomizedModel/CustomizedModelContent'

export const metadata: Metadata = {
  title: 'Get Your Own Customized 3D Model | ProGuide',
  description:
    'Upload your CT (DICOM) and get a patient-specific 3D simulated model cast for surgical rehearsal.',
}

export default function CustomizedModelPage() {
  return (
    <>
     
      <main className="flex-1">
        <CustomizedModelContent />
      </main>
    
    </>
  )
}
