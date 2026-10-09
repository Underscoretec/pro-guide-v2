import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

export const Carts: CollectionConfig = {
  slug: 'carts',
  labels: {
    singular: 'Cart',
    plural: 'Carts',
  },
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['user', 'totalItems', 'subtotal', 'updatedAt'],
    group: 'Shop',
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
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data && Array.isArray(data.items)) {
          let totalQty = 0
          let totalSub = 0
          data.items.forEach((item: any) => {
            const qty = Number(item.quantity) || 1
            const price = Number(item.price) || 0
            item.subtotal = qty * price
            totalQty += qty
            totalSub += item.subtotal
          })
          data.totalItems = totalQty
          data.subtotal = totalSub
        } else if (data) {
          data.totalItems = 0
          data.subtotal = 0
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'User linked to this shopping cart',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Cart Items',
      fields: [
        {
          name: 'productId',
          type: 'text',
          required: true,
          label: 'Product ID / Slug',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Product Name',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Unit Price (INR)',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          defaultValue: 1,
          min: 1,
          label: 'Quantity',
        },
        {
          name: 'imageUrl',
          type: 'text',
          label: 'Image URL',
        },
        {
          name: 'variant',
          type: 'text',
          label: 'Variant (e.g. Left / Right)',
        },
        {
          name: 'subtotal',
          type: 'number',
          label: 'Item Subtotal',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
    {
      name: 'totalItems',
      type: 'number',
      defaultValue: 0,
      label: 'Total Items Count',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'subtotal',
      type: 'number',
      defaultValue: 0,
      label: 'Total Cart Value (INR)',
      admin: {
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}

export default Carts
