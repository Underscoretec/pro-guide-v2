import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

const isAuthorized = ({ req: { user } }: { req: { user: unknown } }) =>
  Boolean(user && ['admin', 'kb_admin', 'doctor'].includes((user as User).role))

export const RedeemCodes: CollectionConfig = {
  slug: 'redeem-codes',
  labels: {
    singular: 'Redeem Code',
    plural: 'Redeem Codes',
  },
  admin: {
    useAsTitle: 'code',
    defaultColumns: ['code', 'discountPercent', 'allowedInstitute', 'usedCount', 'maxUses', 'isActive', 'expiresAt'],
  },
  access: {
    read: isAuthorized,
    create: isAuthorized,
    update: isAuthorized,
    delete: isAuthorized,
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Redeem / Coupon Code',
      admin: {
        description: 'Code used by participants at checkout (e.g., AIIMS50, TATA100, SURGERY2026). Stored in uppercase.',
      },
      hooks: {
        beforeValidate: [
          ({ value }) => (typeof value === 'string' ? value.toUpperCase().trim().replace(/\s+/g, '') : value),
        ],
      },
    },
    {
      name: 'discountPercent',
      type: 'number',
      required: true,
      min: 1,
      max: 100,
      defaultValue: 50,
      label: 'Discount Percentage (%)',
      admin: {
        description: 'Enter percentage discount (e.g., 50 for 50% half price, 100 for 100% full free).',
      },
    },
    {
      name: 'allowedInstitute',
      type: 'text',
      label: 'Allowed Institute / Hospital (Optional)',
      admin: {
        description:
          'If specified, only participants entering this hospital/institute name can use this code (e.g., "AIIMS" or "Tata Memorial"). Leave blank to allow any institute.',
      },
    },
    {
      name: 'applicableWorkshops',
      type: 'relationship',
      relationTo: 'workshop-details',
      hasMany: true,
      label: 'Applicable Workshops (Optional)',
      admin: {
        description: 'Select specific workshops this code applies to. Leave empty to allow for ALL workshops.',
      },
    },
    {
      name: 'maxUses',
      type: 'number',
      label: 'Max Total Uses (Optional)',
      admin: {
        description: 'Maximum number of times this code can be redeemed across all users. Leave blank for unlimited.',
      },
    },
    {
      name: 'usedCount',
      type: 'number',
      label: 'Times Used',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Automatically incremented each time a registration completes using this code.',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Is Active',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to temporarily or permanently disable this code.',
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: 'Expiry Date (Optional)',
      admin: {
        position: 'sidebar',
        description: 'Optional date after which this code will no longer be accepted.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Admin / Doctor Notes (Optional)',
      admin: {
        description: 'Internal notes about who requested or was granted this coupon code.',
      },
    },
  ],
}

