import type { CollectionConfig } from 'payload'

export const CheckoutSubmission: CollectionConfig = {
  slug: 'checkout-submissions',
  labels: {
    singular: 'Checkout Submission',
    plural: 'Checkout Submissions',
  },
  access: {
    read: () => true,
    create: () => true, // Allows direct public form submission via Payload's built-in /api/checkout-submissions endpoint
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'phone', 'city', 'province', 'postcode', 'total', 'status', 'createdAt'],
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data) {
          data.fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Checkout Submission'
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
          label: 'First Name',
          admin: { width: '50%' },
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
          label: 'Last Name',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name (optional)',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Phone *',
          admin: { width: '50%' },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Your Mail *',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'country',
          type: 'text',
          required: true,
          defaultValue: 'India',
          label: 'Country / Region *',
          admin: { width: '50%' },
        },
        {
          name: 'province',
          type: 'text',
          required: true,
          label: 'Province *',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'streetAddress1',
      type: 'text',
      required: true,
      label: 'Street Address *',
    },
    {
      name: 'streetAddress2',
      type: 'text',
      label: 'Apartment, suite, unit, etc. (optional)',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'Town / City *',
          admin: { width: '50%' },
        },
        {
          name: 'postcode',
          type: 'text',
          required: true,
          label: 'Postcode / ZIP *',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'orderNotes',
      type: 'textarea',
      label: 'Order Notes (optional)',
    },
    {
      name: 'items',
      type: 'array',
      label: 'Ordered Products',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Product Name',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          defaultValue: 1,
          label: 'Quantity',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Price',
        },
        {
          name: 'subtotal',
          type: 'number',
          label: 'Subtotal',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'subtotal',
          type: 'number',
          label: 'SUBTOTAL',
          admin: { width: '25%' },
        },
        {
          name: 'shipping',
          type: 'text',
          defaultValue: 'Free shipping',
          label: 'SHIPPING',
          admin: { width: '25%' },
        },
        {
          name: 'gst',
          type: 'number',
          label: 'GST - 18%',
          admin: { width: '25%' },
        },
        {
          name: 'total',
          type: 'number',
          label: 'TOTAL',
          admin: { width: '25%' },
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'Pending',
      options: [
        { label: 'Pending', value: 'Pending' },
        { label: 'Processing', value: 'Processing' },
        { label: 'Dispatched', value: 'Dispatched' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Cancelled', value: 'Cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
