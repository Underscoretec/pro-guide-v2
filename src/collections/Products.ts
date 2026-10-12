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
    defaultColumns: ['name', 'slug', 'price', 'priceUSD', 'category', 'showOnLandingPage', 'updatedAt'],
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
      name: 'showOnLandingPage',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show on Landing Page',
      admin: {
        description: 'Check this box to display this product in the Product Offerings section on the Home / Landing page.',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Card Badge (e.g. Foundation, Complete, Advanced, Task, Only from OSSA+)',
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      label: 'Display Order / Priority',
      admin: {
        description: 'Lower numbers display first (e.g. 1, 2, 3...)',
      },
    },
    {
      name: 'price',
      type: 'number',
      required: true,
      label: 'Price in INR (₹)',
    },
    {
      name: 'priceUSD',
      type: 'number',
      required: false,
      label: 'Price in USD ($)',
      admin: {
        description: 'International price in USD for customers outside India. If empty, falls back to INR price.',
      },
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
    },
    {
      name: 'familyId',
      type: 'select',
      label: 'Product Family',
      defaultValue: 'family1',
      options: [
        { label: 'Family 1', value: 'family1' },
        { label: 'Family 2', value: 'family2' },
        { label: 'Family 3', value: 'family3' },
        { label: 'Family 4', value: 'family4' },
        // Legacy options to keep existing data compatible:
        { label: 'Family 1 (Otology)', value: 'otology' },
        { label: 'Family 2 (Rhinology)', value: 'rhinology' },
        { label: 'Family 3 (Balloon Sinuplasty)', value: 'balloon' },
        { label: 'Family 4 (Laryngology & Custom)', value: 'laryngology-custom' },
      ],
      admin: {
        description: 'Select which Product Family this product belongs to (e.g. Family 1, Family 2...).',
      },
    },
    {
      name: 'familyTitle',
      type: 'text',
      label: 'Product Family Title',
      admin: {
        description:
          'Name / Title of this Product Family (e.g. "Family 01 · Otology — Artificial Temporal Bone Series"). If edited here, it dynamically updates the family title on the /products page without requiring an extra collection.',
      },
    },
    {
      name: 'familySubtitle',
      type: 'text',
      label: 'Product Family Subtitle',
      admin: {
        description:
          'Subtitle of this Product Family shown below the title on /products page. (Optional)',
      },
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
      name: 'bulletPoints',
      type: 'array',
      label: 'Key Bullets / Sub-items (Optional Accordion on Card)',
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
      name: 'primaryButtonText',
      type: 'text',
      defaultValue: 'Buy',
      label: 'Primary Button Label',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      defaultValue: 'Enquire',
      label: 'Secondary Button Label',
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
      label: 'Secondary Button Link (leave empty for default enquiry form)',
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
