import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'price', 'variant', 'updatedAt'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
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
        description: 'Fallback image path if no Media upload is selected (e.g. /images/prod1.jpg)',
      },
    },
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'variant',
      type: 'text',
      defaultValue: 'Available in Left and Right variant',
    },
    {
      name: 'price',
      type: 'text',
      required: true,
    },
    {
      name: 'gstNote',
      type: 'text',
      defaultValue: '+ 18% GST',
    },
    {
      name: 'cartUrl',
      type: 'text',
      defaultValue: 'https://pro-guide.in/',
    },
    {
      name: 'detailsUrl',
      type: 'text',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
