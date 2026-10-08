import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: 'Order',
    plural: 'Orders',
  },
  admin: {
    useAsTitle: 'orderNumber',
    defaultColumns: ['orderNumber', 'user', 'orderStatus', 'paymentMethod', 'paymentStatus', 'createdAt'],
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
      return ['admin', 'kb_admin'].includes((user as User).role)
    },
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Order Number',
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
      label: 'Customer',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      label: 'Order Items',
      fields: [
        {
          name: 'product',
          type: 'text',
          label: 'Product ID',
        },
        {
          name: 'productName',
          type: 'text',
          required: true,
          label: 'Product Name',
        },
        {
          name: 'productImage',
          type: 'text',
          label: 'Product Image',
        },
        {
          name: 'sku',
          type: 'text',
          label: 'SKU',
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
          defaultValue: 1,
          label: 'Quantity',
        },
        {
          name: 'unitPrice',
          type: 'number',
          required: true,
          label: 'Unit Price (INR)',
        },
        {
          name: 'totalPrice',
          type: 'number',
          required: true,
          label: 'Total Price (INR)',
        },
      ],
    },
    {
      name: 'shippingAddress',
      type: 'group',
      label: 'Shipping Address',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
          label: 'Full Name',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone',
        },
        {
          name: 'addressLine1',
          type: 'text',
          required: true,
          label: 'Address Line 1',
        },
        {
          name: 'addressLine2',
          type: 'text',
          label: 'Address Line 2',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'City',
        },
        {
          name: 'state',
          type: 'text',
          required: true,
          label: 'State',
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
          label: 'Postal Code',
        },
        {
          name: 'country',
          type: 'text',
          required: true,
          defaultValue: 'India',
          label: 'Country',
        },
      ],
    },
    {
      name: 'billingAddress',
      type: 'group',
      label: 'Billing Address',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          required: true,
          label: 'Full Name',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone',
        },
        {
          name: 'addressLine1',
          type: 'text',
          required: true,
          label: 'Address Line 1',
        },
        {
          name: 'addressLine2',
          type: 'text',
          label: 'Address Line 2',
        },
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'City',
        },
        {
          name: 'state',
          type: 'text',
          required: true,
          label: 'State',
        },
        {
          name: 'postalCode',
          type: 'text',
          required: true,
          label: 'Postal Code',
        },
        {
          name: 'country',
          type: 'text',
          required: true,
          defaultValue: 'India',
          label: 'Country',
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      label: 'Pricing & Totals',
      fields: [
        {
          name: 'subtotal',
          type: 'number',
          required: true,
          label: 'Subtotal (INR)',
        },
        {
          name: 'discount',
          type: 'number',
          defaultValue: 0,
          label: 'Discount (INR)',
        },
        {
          name: 'shippingAmount',
          type: 'number',
          defaultValue: 0,
          label: 'Shipping Amount (INR)',
        },
        {
          name: 'taxAmount',
          type: 'number',
          defaultValue: 0,
          label: 'Tax Amount (GST INR)',
        },
        {
          name: 'totalAmount',
          type: 'number',
          required: true,
          label: 'Total Amount (INR)',
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: 'INR',
          label: 'Currency',
        },
      ],
    },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Failed', value: 'failed' },
      ],
      label: 'Payment Status',
    },
    {
      name: 'orderStatus',
      type: 'select',
      defaultValue: 'confirmed',
      options: [
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      label: 'Order Status',
    },
    {
      name: 'payment',
      type: 'text',
      label: 'Payment ID / Reference',
    },
    {
      name: 'paymentMethod',
      type: 'select',
      defaultValue: 'COD',
      options: [
        { label: 'Cash on Delivery (COD)', value: 'COD' },
        { label: 'Online Payment', value: 'ONLINE' },
        { label: 'Bank Transfer', value: 'BANK_TRANSFER' },
      ],
      label: 'Payment Method',
    },
    {
      name: 'orderNotes',
      type: 'textarea',
      label: 'Order Notes',
    },
  ],
  timestamps: true,
}

export default Orders
