import { cache } from 'react'
import { getPayloadClient } from './client'

export interface WorkshopDetailItem {
  title: string
  subtitle: string
  category: string
  imageUrl: string
  duration: string
  learners: string
  designationBullets: string[]
  academicContent: {
    heading: string
    subheadings: { title: string; bullets: string[] }[]
  }
  whyTrainBullets: string[]
  experienceContent: string[]
  teachingPhilosophy: string[]
}

const toList = (rows: any): string[] =>
  Array.isArray(rows) ? rows.map((r) => r?.text).filter(Boolean) : []

export const formatWorkshopDetail = (doc: any): WorkshopDetailItem => {
  const mediaUrl = typeof doc.image === 'object' && doc.image?.url ? doc.image.url : null

  return {
    title: doc.title,
    subtitle: doc.subtitle || '',
    category: doc.category || '',
    imageUrl: mediaUrl || doc.imageUrl || '/images/ws_lab.jpg',
    duration: doc.duration || '',
    learners: doc.learners || '',
    designationBullets: toList(doc.designationBullets),
    academicContent: {
      heading: doc.academicHeading || '',
      subheadings: Array.isArray(doc.academicSubheadings)
        ? doc.academicSubheadings.map((s: any) => ({
            title: s?.title || '',
            bullets: toList(s?.bullets),
          }))
        : [],
    },
    whyTrainBullets: toList(doc.whyTrainBullets),
    experienceContent: toList(doc.experienceContent),
    teachingPhilosophy: toList(doc.teachingPhilosophy),
  }
}

export const getWorkshopDetailBySlug = cache(
  async (slug: string): Promise<WorkshopDetailItem | null> => {
    try {
      if (!slug) return null
      const cleanSlug = String(slug).trim().toLowerCase()
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'workshop-details',
        where: { slug: { equals: cleanSlug } },
        depth: 1,
        limit: 1,
      })
      return result.docs?.[0] ? formatWorkshopDetail(result.docs[0]) : null
    } catch (error) {
      console.error(`Error fetching workshop detail "${slug}":`, error)
      return null
    }
  },
)
