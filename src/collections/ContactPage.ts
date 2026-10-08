import type { CollectionConfig } from 'payload'

export const ContactPage: CollectionConfig = {
  slug: 'contact-page',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Get In Touch',
      required: true,
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      defaultValue:
        "Have questions or need assistance? We're here to help — workshops, models, bulk and institutional orders, or anything else.",
    },
    {
      name: 'indianQueries',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Contacts for Indian Queries' },
        { name: 'name', type: 'text', defaultValue: 'Shelly Sequeira' },
        { name: 'email', type: 'text', defaultValue: 'shelly@knowledgebridgeint.com' },
        { name: 'phone', type: 'text', defaultValue: '9220522294' },
      ],
    },
    {
      name: 'internationalQueries',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Contacts for International Queries' },
        { name: 'name', type: 'text', defaultValue: 'Shashikumar Sambhoo' },
        { name: 'email', type: 'text', defaultValue: 'svs@knowledgebridgeint.com' },
        { name: 'phone', type: 'text', defaultValue: '+971 507863903 | +91 9820454543' },
      ],
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', defaultValue: 'Address' },
        {
          name: 'text',
          type: 'textarea',
          defaultValue:
            '506, Centre Point, 5th Floor, J.B. Nagar, Andheri Kurla Road, Andheri (East), Mumbai-400059, Maharashtra, India',
        },
      ],
    },
    {
      name: 'formDisclaimer',
      type: 'textarea',
      defaultValue:
        'By clicking the button below, you agree to receive communications via Email/Call/WhatsApp/SMS from KnowledgeBridge about this programme and other relevant programmes.',
    },
  ],
}
