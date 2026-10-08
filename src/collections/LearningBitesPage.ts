import type { CollectionConfig } from 'payload'

export const LearningBitesPage: CollectionConfig = {
  slug: 'learning-bites-page',
  labels: {
    singular: 'Learning Bites Page',
    plural: 'Learning Bites Pages',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Learning Bites',
      required: true,
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'crumbHomeText', type: 'text', defaultValue: 'Home' },
        { name: 'crumbCurrentText', type: 'text', defaultValue: 'Learning Bites' },
        { name: 'title', type: 'text', defaultValue: 'Learning Bites' },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'Watch surgical demonstration videos, 3D model drilling techniques, and expert step-by-step tutorials from master otolaryngology faculty.',
        },
      ],
    },
    {
      name: 'sectionHeader',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Surgical Demonstration & Drilling Videos' },
        {
          name: 'subheading',
          type: 'text',
          defaultValue: 'Practical surgical guidance and simulation model walkthroughs.',
        },
      ],
    },
    {
      name: 'videoList',
      type: 'array',
      label: 'Videos List',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'category', type: 'text' },
        { name: 'duration', type: 'text' },
        { name: 'thumbnail', type: 'upload', relationTo: 'media' },
        { name: 'thumbnailUrl', type: 'text' },
        { name: 'videoUrl', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'metaText', type: 'text', defaultValue: 'Video library · Skill Lab Demonstration' },
      ],
    },
  ],
}
