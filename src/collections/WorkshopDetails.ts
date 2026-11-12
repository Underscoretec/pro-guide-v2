import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'
import { parseDayNumber, timesMatch } from '../lib/payload/workshopStats'

const isAdmin = ({ req: { user } }: { req: { user: unknown } }) =>
  Boolean(user && ['admin', 'kb_admin'].includes((user as User).role))

const textList = (name: string, label: string) => ({
  name,
  label,
  type: 'array' as const,
  fields: [{ name: 'text', type: 'textarea' as const, required: true }],
})

export const WorkshopDetails: CollectionConfig = {
  slug: 'workshop-details',
  labels: {
    singular: 'Workshop Detail',
    plural: 'Workshop Details',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'deliveryMode', 'priceINR', 'registeredUsers', 'booking'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        if (!doc?.slug || !req?.payload) return doc
        try {
          const regRes = await req.payload.find({
            collection: 'workshop-registrations',
            where: {
              and: [
                { workshopSlug: { equals: doc.slug } },
                { status: { equals: 'confirmed' } },
              ],
            },
            limit: 10000,
            depth: 0,
          })
          const count = regRes.totalDocs ?? regRes.docs.length
          if (count > 0) {
            const priceINR = typeof doc.priceINR === 'number' ? doc.priceINR : 45000
            const gstPercent = typeof doc.gstPercent === 'number' ? doc.gstPercent : 18
            const unitTotal = priceINR + Math.round((priceINR * gstPercent) / 100)
            let totalRevenue = 0
            for (const r of regRes.docs) {
              if (typeof r.amountPaid === 'number' && r.amountPaid > 0) {
                totalRevenue += r.amountPaid
              } else {
                totalRevenue += unitTotal
              }
            }
            doc.registeredUsers = `${count} users`
            doc.revenueSample = `₹${totalRevenue.toLocaleString('en-IN')}`

            // Live calculate each slot's registrationsCount
            if (Array.isArray(doc.datesAndTimeSlots) && doc.datesAndTimeSlots.length > 0) {
              doc.datesAndTimeSlots = doc.datesAndTimeSlots.map((d: any) => {
                const slotDay = parseDayNumber(d?.date)
                const slots = Array.isArray(d?.slots)
                  ? d.slots.map((s: any) => {
                      const matchingCount = regRes.docs.filter((r: any) => {
                        const rDate = String(r.selectedDate || '')
                        const rDay = parseDayNumber(rDate)
                        const dateMatch =
                          (slotDay !== null && rDay !== null && slotDay === rDay) ||
                          rDate.includes(d?.date) ||
                          String(d?.date).includes(rDate)
                        const timeMatch = timesMatch(s?.startTime, s?.endTime, r.selectedTime)
                        return dateMatch && timeMatch
                      }).length

                      return {
                        ...s,
                        registrationsCount: matchingCount,
                      }
                    })
                  : []
                return { ...d, slots }
              })
            }
          }
        } catch {
          // preserve doc values if query fails
        }
        return doc
      },
    ],
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        if (req.context?.skipStatsUpdate) return data
        const slug = data?.slug || originalDoc?.slug
        if (!slug || !req?.payload) return data
        try {
          const regRes = await req.payload.find({
            collection: 'workshop-registrations',
            where: {
              and: [
                { workshopSlug: { equals: slug } },
                { status: { equals: 'confirmed' } },
              ],
            },
            limit: 10000,
            depth: 0,
          })
          const count = regRes.totalDocs ?? regRes.docs.length
          if (count > 0) {
            const priceINR = typeof data?.priceINR === 'number' ? data.priceINR : (originalDoc?.priceINR || 45000)
            const gstPercent = typeof data?.gstPercent === 'number' ? data.gstPercent : (originalDoc?.gstPercent || 18)
            const unitTotal = priceINR + Math.round((priceINR * gstPercent) / 100)
            let totalRevenue = 0
            for (const r of regRes.docs) {
              if (typeof r.amountPaid === 'number' && r.amountPaid > 0) {
                totalRevenue += r.amountPaid
              } else {
                totalRevenue += unitTotal
              }
            }
            data.registeredUsers = `${count} users`
            data.revenueSample = `₹${totalRevenue.toLocaleString('en-IN')}`

            // Also sync slot counts on save
            if (Array.isArray(data?.datesAndTimeSlots) && data.datesAndTimeSlots.length > 0) {
              data.datesAndTimeSlots = data.datesAndTimeSlots.map((d: any) => {
                const slotDay = parseDayNumber(d?.date)
                const slots = Array.isArray(d?.slots)
                  ? d.slots.map((s: any) => {
                      const matchingCount = regRes.docs.filter((r: any) => {
                        const rDate = String(r.selectedDate || '')
                        const rDay = parseDayNumber(rDate)
                        const dateMatch =
                          (slotDay !== null && rDay !== null && slotDay === rDay) ||
                          rDate.includes(d?.date) ||
                          String(d?.date).includes(rDate)
                        const timeMatch = timesMatch(s?.startTime, s?.endTime, r.selectedTime)
                        return dateMatch && timeMatch
                      }).length

                      return {
                        ...s,
                        registrationsCount: matchingCount,
                      }
                    })
                  : []
                return { ...d, slots }
              })
            }
          }
        } catch {
          // ignore
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description:
          'URL slug for /workshops/[slug]. Must match the workshop card title on the Workshops page (e.g. "Basic 3D Temporal Bone Dissection Workshop" → basic-3d-temporal-bone-dissection-workshop). Generated from title if left empty.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            const raw = value || data?.title || ''
            return String(raw)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          },
        ],
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'booking',
      type: 'checkbox',
      label: 'Booking is ON',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'registeredUsers',
      type: 'text',
      label: 'Registered users',
      defaultValue: '24 users',
      admin: {
        position: 'sidebar',
        description: 'Opens the Workshop Registrations list for this workshop.',
      },
    },
    {
      name: 'revenueSample',
      type: 'text',
      label: 'Revenue (sample)',
      defaultValue: '₹12,74,400',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'KBI SkillBridge • Hands-On Faculty-Led Dissection Workshop',
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'Maternal Medicine & Obstetrics',
    },
    {
      name: 'deliveryMode',
      type: 'radio',
      label: 'Delivery mode',
      required: true,
      defaultValue: 'offline',
      options: [
        { label: 'Offline (in person)', value: 'offline' },
        { label: 'Online live', value: 'online_live' },
        { label: 'Online recorded', value: 'online_recorded' },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Image URL (fallback / external URL)',
    },
    {
      name: 'duration',
      type: 'text',
      defaultValue: '2.5 hours live',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        placeholder: 'What participants will learn',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'priceINR',
          type: 'number',
          label: 'Price (INR, before GST)',
          defaultValue: 45000,
        },
        {
          name: 'gstPercent',
          type: 'number',
          label: 'GST % (India only)',
          defaultValue: 18,
        },
        {
          name: 'priceUSD',
          type: 'number',
          label: 'Price (USD, outside India)',
          defaultValue: 499,
        },
      ],
    },
    {
      name: 'seatsPerSession',
      type: 'number',
      label: 'Seats per session',
      defaultValue: 500,
    },
    {
      name: 'datesAndTimeSlots',
      type: 'array',
      label: 'Dates and time slots',
      labels: {
        singular: 'Date',
        plural: 'Dates',
      },
      fields: [
        {
          name: 'date',
          type: 'text',
          label: 'Date (e.g. 2026-11-18 or 18-11-2026)',
          required: true,
        },
        {
          name: 'slots',
          type: 'array',
          label: 'Time slots',
          labels: {
            singular: 'Slot',
            plural: 'Slots',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'startTime',
                  type: 'text',
                  label: 'Start Time (e.g. 02:00 PM)',
                  required: true,
                },
                {
                  name: 'endTime',
                  type: 'text',
                  label: 'End Time (e.g. 04:00 PM)',
                  required: true,
                },
                {
                  name: 'seats',
                  type: 'number',
                  label: 'Seats',
                  defaultValue: 500,
                },
                {
                  name: 'registrationsCount',
                  type: 'number',
                  label: 'Registrations',
                  defaultValue: 0,
                  admin: {
                    description: 'Number of registered users for this slot (e.g. 12 registered).',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'onlineLiveDetails',
      type: 'group',
      label: 'Online live details',
      admin: {
        condition: (data, siblingData) =>
          (data?.deliveryMode || siblingData?.deliveryMode || 'offline') === 'online_live',
      },
      fields: [
        {
          name: 'platform',
          type: 'text',
          label: 'Platform',
          defaultValue: 'Zoom',
        },
        {
          name: 'joinLink',
          type: 'text',
          label: 'Join link',
          admin: {
            description: 'Emailed automatically to every registered user.',
          },
        },
        {
          name: 'sendJoinLink',
          type: 'text',
          label: 'Send join link',
          defaultValue: 'Right after registration and 1 hour before.',
        },
      ],
    },
    {
      name: 'offlineDetails',
      type: 'group',
      label: 'Offline (in person): process and details',
      admin: {
        condition: (data, siblingData) =>
          (data?.deliveryMode || siblingData?.deliveryMode || 'offline') === 'offline',
      },
      fields: [
        {
          name: 'howItRunsCard',
          type: 'ui',
          admin: {
            components: {
              Field: '@/components/Admin/OfflineProcessCard#OfflineProcessCard',
            },
          },
        },
        {
          name: 'venueName',
          type: 'text',
          label: 'Venue name',
          defaultValue: 'Tata Memorial Hospital',
        },
        {
          name: 'fullAddress',
          type: 'textarea',
          label: 'Full address',
          defaultValue: 'Dr E Borges Road, Parel, Mumbai 400012',
          admin: {
            description: 'Shown on the confirmation email and the ticket.',
          },
        },
        {
          name: 'googleMapsLink',
          type: 'text',
          label: 'Google Maps link',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'reportingTime',
              type: 'text',
              label: 'Reporting time',
              defaultValue: '30 minutes before the slot',
            },
            {
              name: 'seatsPerSessionOffline',
              type: 'number',
              label: 'Seats per session',
              defaultValue: 40,
              admin: {
                description: 'Registration closes automatically when full.',
              },
            },
          ],
        },
        {
          name: 'checkInMethod',
          type: 'text',
          label: 'Check-in method',
          defaultValue: 'QR code scanned at the registration desk',
        },
        {
          name: 'whatParticipantsShouldBring',
          type: 'text',
          label: 'What participants should bring',
          defaultValue: 'Photo ID, scrubs and closed shoes',
        },
        {
          name: 'onSiteContact',
          type: 'text',
          label: 'On-site contact',
          defaultValue: '+91 98765 43210',
          admin: {
            description: 'Number shown in the reminder message.',
          },
        },
        {
          name: 'certificate',
          type: 'checkbox',
          label: 'Issue certificate to attendees after session',
          defaultValue: true,
        },
        {
          name: 'cancellationPolicy',
          type: 'text',
          label: 'Cancellation policy',
          defaultValue:
            'Cancellation: no refund, per the booking terms. Attendees can request a date transfer up to 7 days before their date.',
        },
      ],
    },
    {
      name: 'onlineRecordedDetails',
      type: 'group',
      label: 'Online recorded: uploads',
      admin: {
        condition: (data, siblingData) =>
          (data?.deliveryMode || siblingData?.deliveryMode || 'offline') === 'online_recorded',
      },
      fields: [
        {
          name: 'publishingRequirementsCard',
          type: 'ui',
          admin: {
            components: {
              Field: '@/components/Admin/OnlineRecordedRequirementsCard#OnlineRecordedRequirementsCard',
            },
          },
        },
        {
          name: 'videos',
          type: 'array',
          label: '1. Workshop videos',
          labels: {
            singular: 'Video',
            plural: 'Videos',
          },
          admin: {
            description: 'At least one video, MP4 or MOV. Participants watch them in the order shown.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Module Title (e.g. Module 1 — Introduction)',
                  required: true,
                },
                {
                  name: 'duration',
                  type: 'text',
                  label: 'Duration (e.g. 42 min)',
                },
                {
                  name: 'videoUrl',
                  type: 'text',
                  label: 'Video URL',
                },
              ],
            },
          ],
        },
        {
          name: 'accessWindowDays',
          type: 'number',
          label: '2. Access window (days from registration)',
          defaultValue: 90,
          admin: {
            description: 'How long a participant can watch after paying.',
          },
        },
        {
          name: 'coverImageNoticeCard',
          type: 'ui',
          admin: {
            components: {
              Field: '@/components/Admin/CoverImageNoticeCard#CoverImageNoticeCard',
            },
          },
        },
        {
          name: 'handouts',
          type: 'array',
          label: '4. Handouts and slides',
          labels: {
            singular: 'Handout',
            plural: 'Handouts',
          },
          admin: {
            description: 'PDF, PPT or DOC files that participants can download with the videos.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  label: 'Document Title (e.g. Workshop slides.pdf)',
                  required: true,
                },
                {
                  name: 'fileSize',
                  type: 'text',
                  label: 'File Size (e.g. 3.2 MB)',
                },
                {
                  name: 'fileUrl',
                  type: 'text',
                  label: 'File URL',
                },
              ],
            },
          ],
        },
        {
          name: 'subtitles',
          type: 'text',
          label: '5. Subtitles',
          admin: {
            description: '.vtt or .srt file per video, for accessibility and non-native speakers.',
          },
        },
        {
          name: 'previewClip',
          type: 'text',
          label: '6. Preview clip',
          admin: {
            description: 'A free 1 to 2 minute teaser (MP4) shown on the workshop page before paying.',
          },
        },
      ],
    },
    {
      name: 'learners',
      type: 'text',
      defaultValue: '1:1 Station Ratio',
    },
    textList('designationBullets', 'Target Audience & Designation'),
    {
      name: 'academicHeading',
      type: 'text',
      defaultValue: 'Academic & Surgical Procedural Coverage',
    },
    {
      name: 'academicSubheadings',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        textList('bullets', 'Bullets'),
      ],
    },
    textList('whyTrainBullets', 'Why Train Under KBI SkillBridge & ProGuide?'),
    {
      name: 'facultyLeadName',
      type: 'text',
      label: 'Faculty / Team Lead Name (Shown on Booking Modal)',
      defaultValue: 'Dr. Milind Kirtane & Team',
    },
    {
      name: 'cluster',
      type: 'text',
      label: 'Cluster (e.g. ENT & Surgical Training)',
      defaultValue: 'ENT & Surgical Training',
    },
    {
      name: 'cmeCredits',
      type: 'text',
      label: 'CME Accreditation',
      defaultValue: '4 credits',
    },
    {
      name: 'language',
      type: 'text',
      label: 'Language',
      defaultValue: 'English',
    },
    {
      name: 'faculty',
      type: 'array',
      label: 'Faculty Members (Tab 2: Faculty)',
      labels: {
        singular: 'Faculty Member',
        plural: 'Faculty Members',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Faculty Name',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          label: 'Designation / Specialty Role',
        },
        {
          name: 'bio',
          type: 'textarea',
          label: 'Bio / Teaching Focus',
        },
        {
          name: 'avatarBg',
          type: 'text',
          label: 'Avatar Color Class or Hex',
          defaultValue: '#6B21A8',
        },
      ],
    },
    textList('feeInclusions', 'What is included in the fee (Tab 3)'),
    {
      name: 'faq',
      type: 'array',
      label: 'Frequently Asked Questions (Tab 4: FAQ)',
      labels: {
        singular: 'FAQ Item',
        plural: 'FAQ Items',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          label: 'Answer',
          required: true,
        },
      ],
    },
  ],
  timestamps: true,
}

export default WorkshopDetails
