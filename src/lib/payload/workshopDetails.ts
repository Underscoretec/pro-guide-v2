import { cache } from 'react'
import { getPayloadClient } from './client'

export interface WorkshopSlotItem {
  startTime: string
  endTime: string
  seats?: number | null
  registrationsCount?: number | null
}

export interface WorkshopDateItem {
  date: string
  slots: WorkshopSlotItem[]
}

export interface WorkshopRecordedVideoItem {
  title: string
  duration?: string
  videoUrl?: string
}

export interface WorkshopHandoutItem {
  title: string
  fileSize?: string
  fileUrl?: string
}

export interface WorkshopFacultyItem {
  name: string
  role?: string
  bio?: string
  avatarBg?: string
}

export interface WorkshopFaqItem {
  id?: number
  question: string
  answer: string
}

export interface WorkshopDetailItem {
  id?: number | string
  title: string
  slug?: string
  subtitle: string
  category: string
  facultyLeadName?: string
  cluster?: string
  cmeCredits?: string
  language?: string
  deliveryMode: 'offline' | 'online_live' | 'online_recorded'
  imageUrl: string
  duration: string
  description?: string
  learners: string
  priceINR: number
  gstPercent: number
  priceUSD: number
  totalINR: number
  feeFormatted: string
  gstFormatted: string
  totalFormatted: string
  internationalFee: string
  seatsPerSession: number
  booking: boolean
  registeredUsers?: string
  revenueSample?: string
  datesAndTimeSlots: WorkshopDateItem[]
  onlineLiveDetails?: {
    platform: string
    joinLink?: string
    sendJoinLink?: string
  }
  offlineDetails?: {
    venueName: string
    fullAddress: string
    googleMapsLink?: string
    reportingTime: string
    seatsPerSessionOffline?: number
    checkInMethod: string
    whatParticipantsShouldBring?: string
    onSiteContact: string
    certificate?: boolean
    cancellationPolicy?: string
  }
  onlineRecordedDetails?: {
    videos: WorkshopRecordedVideoItem[]
    accessWindowDays: number
    handouts: WorkshopHandoutItem[]
    subtitles?: string
    previewClip?: string
  }
  designationBullets: string[]
  academicContent: {
    heading: string
    subheadings: { title: string; bullets: string[] }[]
  }
  whyTrainBullets: string[]
  faculty: WorkshopFacultyItem[]
  feeInclusions: string[]
  faq: WorkshopFaqItem[]
}

const toList = (rows: any): string[] =>
  Array.isArray(rows) ? rows.map((r) => r?.text).filter(Boolean) : []

export const formatWorkshopDetail = (doc: any): WorkshopDetailItem => {
  const mediaUrl = typeof doc.image === 'object' && doc.image?.url ? doc.image.url : null

  const priceINR = typeof doc.priceINR === 'number' ? doc.priceINR : 45000
  const gstPercent = typeof doc.gstPercent === 'number' ? doc.gstPercent : 18
  const priceUSD = typeof doc.priceUSD === 'number' ? doc.priceUSD : 499
  const gstAmount = Math.round((priceINR * gstPercent) / 100)
  const totalINR = priceINR + gstAmount

  const datesAndTimeSlots: WorkshopDateItem[] = Array.isArray(doc.datesAndTimeSlots)
    ? doc.datesAndTimeSlots.map((d: any) => ({
        date: d?.date || '',
        slots: Array.isArray(d?.slots)
          ? d.slots.map((s: any) => ({
              startTime: s?.startTime || '',
              endTime: s?.endTime || '',
              seats: s?.seats ?? null,
              registrationsCount: s?.registrationsCount ?? 0,
            }))
          : [],
      }))
    : []

  const recordedVideos: WorkshopRecordedVideoItem[] = Array.isArray(
    doc.onlineRecordedDetails?.videos,
  )
    ? doc.onlineRecordedDetails.videos.map((v: any) => ({
        title: v?.title || '',
        duration: v?.duration || '',
        videoUrl: v?.videoUrl || '',
      }))
    : []

  const recordedHandouts: WorkshopHandoutItem[] = Array.isArray(
    doc.onlineRecordedDetails?.handouts,
  )
    ? doc.onlineRecordedDetails.handouts.map((h: any) => ({
        title: h?.title || '',
        fileSize: h?.fileSize || '',
        fileUrl: h?.fileUrl || '',
      }))
    : []

  return {
    id: doc.id,
    title: doc.title,
    slug: doc.slug,
    subtitle: doc.subtitle || '',
    category: doc.category || '',
    deliveryMode: doc.deliveryMode || 'offline',
    imageUrl: mediaUrl || doc.imageUrl || '/images/ws_faculty.jpg',
    duration: doc.duration || '2.5 hours live',
    description: doc.description || '',
    learners: doc.learners || '1:1 Station Ratio',
    priceINR,
    gstPercent,
    priceUSD,
    totalINR,
    feeFormatted: `₹${priceINR.toLocaleString('en-IN')}`,
    gstFormatted: `₹${gstAmount.toLocaleString('en-IN')}`,
    totalFormatted: `₹${totalINR.toLocaleString('en-IN')}`,
    internationalFee: `$${priceUSD}, no GST`,
    seatsPerSession: doc.seatsPerSession ?? 500,
    booking: doc.booking !== false,
    registeredUsers: doc.registeredUsers || '24 users',
    revenueSample: doc.revenueSample || '₹12,74,400',
    datesAndTimeSlots,
    onlineLiveDetails: doc.onlineLiveDetails
      ? {
          platform: doc.onlineLiveDetails.platform || 'Zoom',
          joinLink: doc.onlineLiveDetails.joinLink || '',
          sendJoinLink: doc.onlineLiveDetails.sendJoinLink || '',
        }
      : undefined,
    offlineDetails: doc.offlineDetails
      ? {
          venueName: doc.offlineDetails.venueName || 'Tata Memorial Hospital',
          fullAddress: doc.offlineDetails.fullAddress || 'Dr E Borges Road, Parel, Mumbai 400012',
          googleMapsLink: doc.offlineDetails.googleMapsLink || '',
          reportingTime: doc.offlineDetails.reportingTime || '30 minutes before the slot',
          seatsPerSessionOffline: doc.offlineDetails.seatsPerSessionOffline ?? 40,
          checkInMethod: doc.offlineDetails.checkInMethod || 'QR code scanned at the registration desk',
          whatParticipantsShouldBring: doc.offlineDetails.whatParticipantsShouldBring || 'Photo ID, scrubs and closed shoes',
          onSiteContact: doc.offlineDetails.onSiteContact || '+91 98765 43210',
          certificate: doc.offlineDetails.certificate !== false,
          cancellationPolicy: doc.offlineDetails.cancellationPolicy || 'Cancellation: no refund, per the booking terms. Attendees can request a date transfer up to 7 days before their date.',
        }
      : undefined,
    onlineRecordedDetails: doc.onlineRecordedDetails
      ? {
          videos: recordedVideos,
          accessWindowDays: doc.onlineRecordedDetails.accessWindowDays ?? 90,
          handouts: recordedHandouts,
          subtitles: doc.onlineRecordedDetails.subtitles || '',
          previewClip: doc.onlineRecordedDetails.previewClip || '',
        }
      : undefined,
    designationBullets: toList(doc.designationBullets),
    academicContent: {
      heading: doc.academicHeading || 'Academic & Procedural Coverage',
      subheadings: Array.isArray(doc.academicSubheadings)
        ? doc.academicSubheadings.map((s: any) => ({
            title: s?.title || '',
            bullets: toList(s?.bullets),
          }))
        : [],
    },
    whyTrainBullets: toList(doc.whyTrainBullets),
    facultyLeadName: doc.facultyLeadName || '',
    cluster: doc.cluster || doc.category || '',
    cmeCredits: doc.cmeCredits || '4 credits',
    language: doc.language || 'English',
    faculty: Array.isArray(doc.faculty)
      ? doc.faculty.map((f: any) => ({
          name: f?.name || '',
          role: f?.role || '',
          bio: f?.bio || '',
          avatarBg: f?.avatarBg || '#6B21A8',
        }))
      : [],
    feeInclusions: toList(doc.feeInclusions),
    faq: Array.isArray(doc.faq)
      ? doc.faq.map((q: any, idx: number) => ({
          id: idx + 1,
          question: q?.question || '',
          answer: q?.answer || '',
        }))
      : [],
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
