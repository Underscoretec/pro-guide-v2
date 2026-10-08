import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'fullName', 'isEmailVerified', 'isPhoneVerified'],
  },
  auth: {
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    },
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
  },
  access: {
    admin: ({ req: { user } }) => Boolean(user && ['admin', 'kb_admin'].includes((user as User).role)),
    // read: ({ req: { user } }) => Boolean(user && ['admin', 'kb_admin'].includes((user as User).role)),
    read: ({ req: { user } }) => {
      if (!user) return false

      const currentUser = user as User

      // Full access for admin
      if (currentUser.role === 'admin') {
        return true
      }

      // KB Admin can see everyone except admins
      if (currentUser.role === 'kb_admin') {
        return {
          role: {
            not_equals: 'admin',
          },
        }
      }

      return false
    },
    create: ({ req: { user } }) => (user as User)?.role === 'admin',
    update: ({ req: { user } }) => (user as User)?.role === 'admin',
    delete: ({ req: { user } }) => (user as User)?.role === 'admin',
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'KBAdmin',
          value: 'kb_admin',
        },
        {
          label: 'User',
          value: 'user',
        }
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Full Name',
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Phone Number',
      },
    },
    {
      name: 'institution',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Institution / School / College',
      },
    },
    {
      name: 'redeemCode',
      type: 'text',
      required: false,
      index: true,
      admin: {
        description: 'Redeem code used to activate membership',
      },
    },
    {
      name: 'isEmailVerified',
      type: 'checkbox',
      defaultValue: false,
      label: 'Email Verified',
      admin: {
        position: 'sidebar',
        description: 'Whether user email has been verified',
      },
    },
    {
      name: 'isPhoneVerified',
      type: 'checkbox',
      defaultValue: false,
      label: 'Phone Verified',
      admin: {
        position: 'sidebar',
        description: 'Whether user phone number has been verified',
      },
    },
    {
      name: 'emailOtpHash',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'emailOtpExpiresAt',
      type: 'date',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'phoneOtpHash',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'phoneOtpExpiresAt',
      type: 'date',
      admin: {
        hidden: true,
      },
    },
  ],
}