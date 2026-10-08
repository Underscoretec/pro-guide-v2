import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

export const ShippingAddresses: CollectionConfig = {
  slug: 'shipping-addresses',
  admin: {
    useAsTitle: 'addressLine',
    defaultColumns: ['addressLine', 'city', 'state', 'country', 'user', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      if (['admin', 'kb_admin'].includes((user as User).role)) return true
      return {
        user: {
          equals: user.id,
        },
      }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => {
      if (!user) return false
      if (['admin', 'kb_admin'].includes((user as User).role)) return true
      return {
        user: {
          equals: user.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      if (['admin', 'kb_admin'].includes((user as User).role)) return true
      return {
        user: {
          equals: user.id,
        },
      }
    },
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
      admin: {
        description: 'User associated with this shipping address',
      },
    },
    {
      name: 'addressLine',
      type: 'textarea',
      required: true,
      label: 'Street Address',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
    },
    {
      name: 'state',
      type: 'text',
      required: true,
      label: 'State / Province',
    },
    {
      name: 'postalCode',
      type: 'text',
      required: true,
      label: 'Postal Code / PIN',
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      defaultValue: 'India',
    },
    {
      name: 'deliveryNotes',
      type: 'textarea',
      required: false,
      label: 'Delivery Notes / Instructions',
    },
    {
      name: 'isDefault',
      type: 'checkbox',
      defaultValue: true,
      label: 'Default Address',
    },
  ],
  timestamps: true,
}

export default ShippingAddresses