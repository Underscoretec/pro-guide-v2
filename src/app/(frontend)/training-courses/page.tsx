import React from 'react'
import type { Metadata } from 'next'
import TrainingCoursesContent from '@/components/TrainingCourses/TrainingCoursesContent'
import { getTrainingCoursesPage } from '@/lib/payload/trainingCoursesPage'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'About Training Courses & Faculty | ProGuide',
  description:
    'ProGuide training courses: temporal bone dissection, paranasal sinus surgery, microlaryngoscopy — led by Dr. Prashant Naik and Dr. Milind Kirtane.',
}

export default async function TrainingCoursesPage() {
  const pageData = await getTrainingCoursesPage()

  return (
    <main className="flex-1 bg-white">
      <TrainingCoursesContent data={pageData} />
    </main>
  )
}
