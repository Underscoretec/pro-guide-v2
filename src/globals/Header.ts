import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'announcement',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Unlock new opportunities by upskilling and stepping into a brighter future.',
          required: true,
        },
        {
          name: 'linkText',
          type: 'text',
          defaultValue: 'Explore Now!!',
          required: true,
        },
        {
          name: 'linkUrl',
          type: 'text',
          defaultValue: '#workshops',
          required: true,
        },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoUrl',
      type: 'text',
      defaultValue: '/images/logo.svg',
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      defaultValue: 'What would you like to learn?',
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'hasDropdown',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'dropdownItems',
          type: 'array',
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.hasDropdown),
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'buyNowButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Buy Now',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/products.html',
        },
      ],
    },
    {
      name: 'cartUrl',
      type: 'text',
      defaultValue: 'https://pro-guide.in/',
    },
    {
      name: 'loginButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Login /Register',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: 'https://pro-guide.in/',
        },
      ],
    },
  ],
}

export default Header
