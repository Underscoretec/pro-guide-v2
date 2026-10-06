import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'author',
    defaultColumns: ['author', 'type', 'quote', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Feedback Chip', value: 'feedback' },
        { label: 'Learner Story Card', value: 'story' },
      ],
      defaultValue: 'feedback',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
