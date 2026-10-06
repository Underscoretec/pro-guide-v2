import type { CollectionConfig } from 'payload'

export const Workshops: CollectionConfig = {
  slug: 'workshops',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'tagline', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: '3D Temporal Bone', value: 'temporal' },
        { label: 'Paranasal Sinus', value: 'sinus' },
        { label: 'Microlaryngoscopy and Laser Surgeries', value: 'larynx' },
      ],
      defaultValue: 'temporal',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'KBI SkillBridge',
    },
    {
      name: 'meta',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      type: 'text',
      admin: {
        description: 'Fallback image path if no Media upload is selected (e.g. /images/ws_lab.jpg)',
      },
    },
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'brochureUrl',
      type: 'text',
      defaultValue: '/ProGuide_3D_Workshops_2026.pdf',
    },
    {
      name: 'registrationUrl',
      type: 'text',
      defaultValue: 'https://pro-guide.in/',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
