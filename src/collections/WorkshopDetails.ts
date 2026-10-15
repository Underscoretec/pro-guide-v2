import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

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
    defaultColumns: ['title', 'slug', 'category', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
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
      name: 'subtitle',
      type: 'text',
      defaultValue: 'KBI SkillBridge • Hands-On Faculty-Led Dissection Workshop',
    },
    {
      name: 'category',
      type: 'text',
      defaultValue: 'ENT & Surgical Training',
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
      defaultValue: '1-2 Days Hands-On',
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
    textList('experienceContent', 'Professional Section Experience'),
    textList('teachingPhilosophy', 'Teaching Philosophy'),
  ],
  timestamps: true,
}

export default WorkshopDetails
