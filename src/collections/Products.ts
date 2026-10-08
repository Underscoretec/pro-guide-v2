import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

export const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'price', 'category', 'sku', 'updatedAt'],
    group: 'Shop',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user && ['admin', 'kb_admin'].includes((user as User).role)),
    update: ({ req: { user } }) => Boolean(user && ['admin', 'kb_admin'].includes((user as User).role)),
    delete: ({ req: { user } }) => Boolean(user && ['admin', 'kb_admin'].includes((user as User).role)),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Product Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug (e.g. tb, pns, pnsb, larynx)',
      admin: {
        description: 'URL identifier used in /products/[slug] and /product?p=[slug]',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Price in INR',
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
    },
    {
      name: 'sku',
      type: 'text',
      label: 'SKU / Product Code',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Short Description',
    },
    {
      name: 'variant',
      type: 'text',
      defaultValue: 'Available in Left and Right variant',
      label: 'Variant Description',
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Main / Featured Image URL (e.g. /images/prod1.jpg)',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Main / Featured Image Upload',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Multiple Product Images / Gallery (Thumbnails & Hover Slider)',
      labels: {
        singular: 'Product Image',
        plural: 'Product Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Upload Image',
        },
        {
          name: 'url',
          type: 'text',
          label: 'Image URL (optional if uploaded above)',
        },
      ],
    },
    {
      name: 'detailHeading',
      type: 'text',
      label: 'Detailed Section Heading',
    },
    {
      name: 'detailParagraph1',
      type: 'textarea',
      label: 'Detailed Paragraph 1',
    },
    {
      name: 'detailParagraph2',
      type: 'textarea',
      label: 'Detailed Paragraph 2',
    },
    {
      name: 'whyChoose',
      type: 'array',
      label: 'Why Choose (Bullet Points)',
      fields: [
        {
          name: 'point',
          type: 'text',
          required: true,
          label: 'Bullet Point',
        },
      ],
    },
    {
      name: 'sampleList',
      type: 'array',
      label: 'Key Features / Highlights',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: 'Feature Item',
        },
      ],
    },
    {
      name: 'lining',
      type: 'text',
      label: 'Material / Composition Note',
    },
    {
      name: 'specifications',
      type: 'group',
      label: 'Technical Specifications',
      fields: [
        { name: 'weight', type: 'text', label: 'Weight (e.g. 240 g)' },
        { name: 'dimensions', type: 'text', label: 'Dimensions (e.g. 11 × 9 × 8 cm)' },
        { name: 'material', type: 'text', label: 'Material' },
        { name: 'variant', type: 'text', label: 'Variant Available' },
        { name: 'compatibility', type: 'text', label: 'Instrument Compatibility' },
      ],
    },
  ],
  timestamps: true,
}

export default Products
