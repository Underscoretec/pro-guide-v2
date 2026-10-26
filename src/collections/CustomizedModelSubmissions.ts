import { ValidationError, type CollectionConfig } from 'payload'
import { verifyTurnstileToken } from '@/lib/turnstile/verify'

export const CustomizedModelSubmissions: CollectionConfig = {
  slug: 'customized-model-submissions',
  admin: {
    useAsTitle: 'firstName',
    defaultColumns: ['firstName', 'email', 'institutionName', 'country', 'createdAt'],
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation !== 'create' || !data) return data
        const token = data.turnstileToken
        delete data.turnstileToken
        // Only public REST submissions are verified; server-side (local API) creates are trusted
        if (req.payloadAPI === 'local') return data
        const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        if (!(await verifyTurnstileToken(token, ip))) {
          throw new ValidationError({
            errors: [{ message: 'Human verification failed. Please retry the Cloudflare check.', path: 'turnstileToken' }],
          })
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      label: 'First Name',
    },
    {
      name: 'academicQualification',
      type: 'text',
      required: true,
      label: 'Academic Qualification',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'Email',
    },
    {
      name: 'iMessageNo',
      type: 'text',
      required: true,
      label: 'iMessage No.',
    },
    {
      name: 'whatsAppNo',
      type: 'text',
      required: true,
      label: 'WhatsApp No.',
    },
    {
      name: 'viberNo',
      type: 'text',
      required: true,
      label: 'Viber No.',
    },
    {
      name: 'institutionName',
      type: 'text',
      required: true,
      label: 'Clinic / Hospital / Institute / College Name',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      label: 'Address',
    },
    {
      name: 'state',
      type: 'text',
      required: true,
      label: 'State',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      label: 'City',
    },
    {
      name: 'country',
      type: 'text',
      required: true,
      label: 'Country',
    },
    {
      name: 'pincode',
      type: 'text',
      required: true,
      label: 'Pincode',
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      label: 'Uploaded File',
    },
    {
      name: 'fileName',
      type: 'text',
      label: 'Uploaded File Name',
    },
  ],
}
