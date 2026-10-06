import type { CollectionConfig } from 'payload'

export const ProductsPage: CollectionConfig = {
  slug: 'products-page',
  labels: {
    singular: 'Products Page',
    plural: 'Products Pages',
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
      defaultValue: 'Product Offerings',
      required: true,
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'crumbHomeText', type: 'text', defaultValue: 'Home' },
        { name: 'crumbCurrentText', type: 'text', defaultValue: 'Product Offerings' },
        { name: 'title', type: 'text', defaultValue: 'Product Offerings' },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            'The complete OSSA+ Simulations catalogue — ENT simulation models across otology, rhinology, laryngology and vestibular training, cast in OSSA+ Composite™ by OSSA PLUS SIMULATION LLP. Store items can be purchased right away; everything else is a quick enquiry away.',
        },
      ],
    },
    {
      name: 'families',
      type: 'array',
      label: 'Product Families',
      fields: [
        { name: 'familyId', type: 'text' },
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text' },
        {
          name: 'isAlt',
          type: 'checkbox',
          defaultValue: false,
          label: 'Light Grey Background',
        },
        {
          name: 'items',
          type: 'array',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'badge', type: 'text' },
            { name: 'image', type: 'upload', relationTo: 'media' },
            { name: 'imageUrl', type: 'text' },
            { name: 'description', type: 'textarea' },
            {
              name: 'bulletPoints',
              type: 'array',
              fields: [{ name: 'point', type: 'text' }],
            },
            {
              name: 'primaryButton',
              type: 'group',
              fields: [
                { name: 'text', type: 'text', defaultValue: 'Buy / Enquire' },
                { name: 'link', type: 'text', defaultValue: 'https://pro-guide.in/' },
              ],
            },
            {
              name: 'secondaryButton',
              type: 'group',
              fields: [
                { name: 'text', type: 'text' },
                { name: 'link', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'stageComparison',
      type: 'group',
      label: 'Choose by Training Stage',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Choose by Training Stage' },
        {
          name: 'tiers',
          type: 'array',
          fields: [
            { name: 'tier', type: 'text', required: true },
            { name: 'models', type: 'text', required: true },
            { name: 'builtFor', type: 'text', required: true },
            { name: 'typicalUse', type: 'text', required: true },
          ],
        },
        {
          name: 'footerNote',
          type: 'text',
          defaultValue:
            'Full model specifications and the material story are on ossa.sudors.in · purchases and quotes are handled here on ProGuide.',
        },
      ],
    },
  ],
}
