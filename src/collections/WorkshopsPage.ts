import type { CollectionConfig } from 'payload'

export const WorkshopsPage: CollectionConfig = {
  slug: 'workshops-page',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Explore Workshops',
      required: true,
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      defaultValue:
        'Hands-on, station-based programmes where every delegate operates on their own model under faculty guidance. Registration and payment are handled on the ProGuide store.',
    },
    {
      name: 'glimpses',
      type: 'group',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imageUrl',
          type: 'text',
          defaultValue: '/images/ws_collage.jpg',
        },
        {
          name: 'caption',
          type: 'textarea',
          defaultValue:
            'Our first KBI SkillBridge workshop — Advanced Temporal Bone Dissection, 2 October 2026 at the KBI Skill Lab, Andheri East, under the aegis of AOI Mumbai West, ahead of Mumbai Manthan 3.0.',
        },
        {
          name: 'brochureFile',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'brochureUrl',
          type: 'text',
          defaultValue: '/ProGuide_3D_Workshops_2026.pdf',
        },
      ],
    },
    {
      name: 'temporalHeading',
      type: 'text',
      defaultValue: '3D Temporal Bone Workshops',
    },
    {
      name: 'sinusHeading',
      type: 'text',
      defaultValue: 'Paranasal Sinus Workshops',
    },
    {
      name: 'larynxHeading',
      type: 'text',
      defaultValue: 'Microlaryngoscopy and Laser Surgeries',
    },
    {
      name: 'temporalWorkshops',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'tagline', type: 'text', defaultValue: 'KBI SkillBridge' },
        { name: 'meta', type: 'text', defaultValue: 'One-day, faculty-led hands-on · Dates & fees on registration' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
        { name: 'alt', type: 'text' },
        { name: 'brochureFile', type: 'upload', relationTo: 'media' },
        { name: 'brochureUrl', type: 'text', defaultValue: '/ProGuide_3D_Workshops_2026.pdf' },
        { name: 'registrationUrl', type: 'text', defaultValue: 'https://pro-guide.in/' },
      ],
    },
    {
      name: 'sinusWorkshops',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'tagline', type: 'text', defaultValue: 'KBI SkillBridge' },
        { name: 'meta', type: 'text', defaultValue: 'One-day, faculty-led hands-on · Dates & fees on registration' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
        { name: 'alt', type: 'text' },
        { name: 'brochureFile', type: 'upload', relationTo: 'media' },
        { name: 'brochureUrl', type: 'text', defaultValue: '/ProGuide_3D_Workshops_2026.pdf' },
        { name: 'registrationUrl', type: 'text', defaultValue: 'https://pro-guide.in/' },
      ],
    },
    {
      name: 'larynxWorkshops',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'tagline', type: 'text', defaultValue: 'KBI SkillBridge' },
        { name: 'meta', type: 'text', defaultValue: 'One-day, faculty-led hands-on · Dates & fees on registration' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
        { name: 'alt', type: 'text' },
        { name: 'brochureFile', type: 'upload', relationTo: 'media' },
        { name: 'brochureUrl', type: 'text', defaultValue: '/ProGuide_3D_Workshops_2026.pdf' },
        { name: 'registrationUrl', type: 'text', defaultValue: 'https://pro-guide.in/' },
      ],
    },
    {
      name: 'larynxStats',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}
