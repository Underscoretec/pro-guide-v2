import type { CollectionConfig } from 'payload'

export const LeadSubmissions: CollectionConfig = {
  slug: 'lead-submissions',
  labels: {
    singular: 'Lead Submission',
    plural: 'Lead Submissions',
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'mobile', 'country', 'status', 'createdAt'],
  },
  access: {
    create: () => true, // Allows public form submissions from landing page
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data) {
          data.fullName = `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Lead Submission'
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
      type: 'row',
      fields: [
        {
          name: 'country',
          type: 'text',
          defaultValue: 'India',
          label: 'Country',
          admin: { width: '50%' },
        },
        {
          name: 'mobile',
          type: 'text',
          required: true,
          label: 'Mobile Number',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'Landing Page — Upskilling Journey',
      label: 'Lead Source',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'New',
      options: [
        { label: 'New', value: 'New' },
        { label: 'Contacted', value: 'Contacted' },
        { label: 'In Progress', value: 'In Progress' },
        { label: 'Enrolled', value: 'Enrolled' },
        { label: 'Closed', value: 'Closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
