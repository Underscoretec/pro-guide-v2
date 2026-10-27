import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

const isStaff = (user: unknown) => Boolean(user && ['admin', 'kb_admin'].includes((user as User).role))

export const WorkshopRegistrations: CollectionConfig = {
  slug: 'workshop-registrations',
  labels: {
    singular: 'Workshop Registration',
    plural: 'Workshop Registrations',
  },
  admin: {
    useAsTitle: 'workshopTitle',
    defaultColumns: ['workshopTitle', 'user', 'workshopSlug', 'createdAt'],
    description: 'Users who registered for a specific workshop.',
  },
  access: {
    // Registrations are created server-side only (see registerForWorkshop)
    create: () => false,
    read: ({ req: { user } }) => isStaff(user),
    update: ({ req: { user } }) => (user as User)?.role === 'admin',
    delete: ({ req: { user } }) => (user as User)?.role === 'admin',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'workshopSlug',
      type: 'text',
      required: true,
      index: true,
      label: 'Workshop Slug',
    },
    {
      name: 'workshopTitle',
      type: 'text',
      required: true,
      label: 'Workshop',
    },
  ],
}
