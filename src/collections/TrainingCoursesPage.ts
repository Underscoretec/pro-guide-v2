import type { CollectionConfig } from 'payload'

export const TrainingCoursesPage: CollectionConfig = {
  slug: 'training-courses-page',
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
      defaultValue: 'About Training Courses — 2026 Workshop Series',
      required: true,
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      defaultValue:
        'We are dedicated to building surgical confidence and reducing complications through specialized presurgical training. Our workshops provide hands-on training on simulation models of the temporal bone, paranasal sinuses and larynx, designed specifically for practicing surgeons. Each session is led by esteemed faculty members who provide one-to-one guidance.',
    },
    {
      name: 'managementTeamTitle',
      type: 'text',
      defaultValue: 'The Management Team',
    },
    {
      name: 'managementTeam',
      type: 'array',
      fields: [
        { name: 'initials', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'bio', type: 'textarea', required: true },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
      ],
    },
    {
      name: 'coursesSeriesTitle',
      type: 'text',
      defaultValue: '3D Surgical Simulation Workshops — 2026 Series',
    },
    {
      name: 'coursesSeriesDescription',
      type: 'textarea',
      defaultValue:
        'A comprehensive series of one-day, faculty-led, hands-on programs built on anatomically accurate 3D simulation models. Each workshop pairs live demonstration of every procedural step with supervised practice at fully equipped workstations — with one-to-one mentoring, continuous faculty feedback and participation certificates.',
    },
    {
      name: 'courses',
      type: 'array',
      fields: [
        { name: 'category', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'why', type: 'textarea', required: true },
        {
          name: 'procedures',
          type: 'array',
          fields: [{ name: 'text', type: 'text', required: true }],
        },
        { name: 'fmt', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
        { name: 'brochureFile', type: 'upload', relationTo: 'media' },
        { name: 'brochureUrl', type: 'text', defaultValue: '/ProGuide_3D_Workshops_2026.pdf' },
        { name: 'registrationUrl', type: 'text', defaultValue: 'https://pro-guide.in/' },
      ],
    },
    {
      name: 'whyArtificialBone',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Why Artificial Bone' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text', defaultValue: '/images/photo_micro.jpg' },
        {
          name: 'checkList',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
        {
          name: 'stats',
          type: 'array',
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
          ],
        },
      ],
    },
  ],
}
