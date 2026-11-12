import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'
import { updateWorkshopStats } from '../lib/payload/workshopStats'

const isStaff = (user: unknown) => Boolean(user && ['admin', 'kb_admin'].includes((user as User).role))

export const WorkshopRegistrations: CollectionConfig = {
  slug: 'workshop-registrations',
  labels: {
    singular: 'Workshop Registration',
    plural: 'Workshop Registrations',
  },
  admin: {
    useAsTitle: 'participantName',
    defaultColumns: ['participantName', 'participantEmail', 'workshopTitle', 'country', 'currency', 'amountPaidINR', 'amountPaidUSD', 'selectedDate', 'status'],
    description: 'Participants registered for workshops.',
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data) {
          const isIndia = (data.country || 'India').trim().toLowerCase() === 'india'
          if (!data.currency) {
            data.currency = isIndia ? 'INR' : 'USD'
          }
          if (data.currency === 'USD') {
            if (typeof data.amountPaid === 'number' && (data.amountPaidUSD === undefined || data.amountPaidUSD === null)) {
              data.amountPaidUSD = data.amountPaid
            }
          } else {
            if (typeof data.amountPaid === 'number' && (data.amountPaidINR === undefined || data.amountPaidINR === null)) {
              data.amountPaidINR = data.amountPaid
            }
          }
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req }) => {
        try {
          if (doc?.workshopSlug) {
            await updateWorkshopStats(req.payload, doc.workshopSlug)
          }
          if (previousDoc?.workshopSlug && previousDoc.workshopSlug !== doc?.workshopSlug) {
            await updateWorkshopStats(req.payload, previousDoc.workshopSlug)
          }
        } catch (err) {
          req.payload.logger?.error(`Error updating workshop stats after registration change: ${err}`)
        }
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        try {
          if (doc?.workshopSlug) {
            await updateWorkshopStats(req.payload, doc.workshopSlug)
          }
        } catch (err) {
          req.payload.logger?.error(`Error updating workshop stats after registration delete: ${err}`)
        }
      },
    ],
  },
  access: {
    create: () => true, // Allows server-side and client payment webhook/verification
    read: ({ req: { user } }) => isStaff(user),
    update: ({ req: { user } }) => (user as User)?.role === 'admin',
    delete: ({ req: { user } }) => (user as User)?.role === 'admin',
  },
  fields: [
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
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      index: true,
    },
    {
      name: 'participantName',
      type: 'text',
      label: 'Full Name',
    },
    {
      name: 'participantEmail',
      type: 'text',
      label: 'Email',
    },
    {
      name: 'participantPhone',
      type: 'text',
      label: 'Mobile Number',
    },
    {
      name: 'institution',
      type: 'text',
      label: 'Institution / Hospital',
    },
    {
      name: 'medicalRegNumber',
      type: 'text',
      label: 'Medical Registration Number',
    },
    {
      name: 'country',
      type: 'text',
      label: 'Billing Country',
      defaultValue: 'India',
    },
    {
      name: 'selectedDate',
      type: 'text',
      label: 'Selected Date',
    },
    {
      name: 'selectedTime',
      type: 'text',
      label: 'Selected Time',
    },
    {
      name: 'currency',
      type: 'select',
      label: 'Currency',
      defaultValue: 'INR',
      options: [
        { label: 'INR (₹)', value: 'INR' },
        { label: 'USD ($)', value: 'USD' },
      ],
      admin: {
        description: 'Payment currency (INR for India, USD for international).',
      },
    },
    {
      name: 'amountPaidINR',
      type: 'number',
      label: 'Amount Paid (INR)',
      admin: {
        description: 'Amount in Indian Rupees (₹) for delegates billing from India.',
      },
    },
    {
      name: 'amountPaidUSD',
      type: 'number',
      label: 'Amount Paid (USD)',
      admin: {
        description: 'Amount in US Dollars ($) for international delegates.',
      },
    },
    {
      name: 'amountPaid',
      type: 'number',
      label: 'Total Amount (Raw)',
      admin: {
        description: 'Underlying raw amount paid in the selected currency.',
      },
    },
    {
      name: 'razorpayPaymentId',
      type: 'text',
      label: 'Razorpay Payment ID',
    },
    {
      name: 'razorpayOrderId',
      type: 'text',
      label: 'Razorpay Order ID',
    },
    {
      name: 'ticketId',
      type: 'text',
      label: 'Ticket ID',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'confirmed',
      options: [
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Pending', value: 'pending' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },
  ],
}

export default WorkshopRegistrations
