import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logoUrl',
      type: 'text',
      defaultValue: '/images/logo_white.svg',
    },
    {
      name: 'quickLinksTitle',
      type: 'text',
      defaultValue: 'Quick Links',
    },
    {
      name: 'quickLinks',
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
          required: true,
        },
      ],
    },
    {
      name: 'indianQuery',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Contacts for Indian Queries',
        },
        {
          name: 'name',
          type: 'text',
          defaultValue: 'Shelly Sequeira',
        },
        {
          name: 'email',
          type: 'text',
          defaultValue: 'shelly@knowledgebridgeint.com',
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '9220522294',
        },
      ],
    },
    {
      name: 'internationalQuery',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Contacts for International Queries',
        },
        {
          name: 'name',
          type: 'text',
          defaultValue: 'Shashikumar Sambhoo',
        },
        {
          name: 'email',
          type: 'text',
          defaultValue: 'svs@knowledgebridgeint.com',
        },
        {
          name: 'phone',
          type: 'text',
          defaultValue: '+971 507863903 | +91 9820454543',
        },
      ],
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Address',
        },
        {
          name: 'text',
          type: 'textarea',
          defaultValue:
            '506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East). Mumbai-400059, Maharashtra, India',
        },
      ],
    },
    {
      name: 'about',
      type: 'textarea',
      defaultValue:
        'ProGuide is dedicated to equipping individuals, businesses, and organizations with the skills needed for the future by providing accessible and affordable high-quality education. Through collaborations with leading institutions and industry experts, ProGuide offers a wide range of courses, certifications, and professional programs designed to enhance career growth and business success.',
    },
    {
      name: 'legalLinks',
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
          required: true,
        },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue:
        '© 2026. All Rights Reserved · 3D simulation models by OSSA PLUS SIMULATION LLP — ossa.sudors.in',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'platform',
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
}

export default Footer
