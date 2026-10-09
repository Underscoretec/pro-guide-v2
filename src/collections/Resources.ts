import type { CollectionConfig } from 'payload'

export const Resources: CollectionConfig = {
  slug: 'resources',
  labels: {
    singular: 'Resource',
    plural: 'Resources',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Resource Library & PDF Catalogues',
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'crumbHomeText', type: 'text', defaultValue: 'Home' },
        { name: 'crumbCategoryText', type: 'text', defaultValue: 'Resources' },
        { name: 'crumbCurrentText', type: 'text', defaultValue: 'Brochures & Catalogues' },
        { name: 'title', type: 'text', defaultValue: 'Resource Library & PDF Catalogues' },
        {
          name: 'description',
          type: 'textarea',
          defaultValue:
            "Access and download verified educational materials, curriculum modules, and technical brochures for ProGuide's Otolaryngology Head & Neck 3D simulation models and hands-on dissection workshops.",
        },
        { name: 'directPdfDownloadText', type: 'text', defaultValue: 'Direct PDF Download' },
        { name: 'directPdfDownloadLink', type: 'text', defaultValue: '#' },
        { name: 'instantViewerText', type: 'text', defaultValue: 'Instant In-Browser Viewer' },
        { name: 'instantViewerLink', type: 'text', defaultValue: '#' },
      ],
    },
    {
      name: 'filterTabs',
      type: 'array',
      label: 'Filter Category Tabs',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'key', type: 'text', required: true },
      ],
    },
    {
      name: 'sectionHeader',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Official ProGuide Brochures & Documents',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          defaultValue:
            'Review the comprehensive course itineraries, surgical dissection station setups, and complete product dimension tables.',
        },
        {
          name: 'downloadAllText',
          type: 'text',
          defaultValue: 'Download All Package (.zip)',
        },
        { name: 'downloadAllLink', type: 'text', defaultValue: '#' },
      ],
    },
    {
      name: 'documents',
      type: 'array',
      label: 'Resource Documents / Catalogues',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Workshop Brochures', value: 'workshop' },
            { label: 'Product Catalogues', value: 'product' },
            { label: 'Clinical & Simulation Guides', value: 'clinical' },
          ],
          defaultValue: 'workshop',
        },
        { name: 'badgeText', type: 'text', label: 'Top Badge Label (e.g. WORKSHOP BROCHURE)' },
        {
          name: 'badgeColor',
          type: 'select',
          options: [
            { label: 'Orange / Amber', value: 'orange' },
            { label: 'Purple', value: 'purple' },
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
          ],
          defaultValue: 'orange',
        },
        { name: 'yearOrVol', type: 'text', label: 'Tag / Date / Volume (e.g. Oct 2026, Vol. IV)' },
        { name: 'description', type: 'textarea' },
        { name: 'viewPdfText', type: 'text', defaultValue: 'View PDF' },
        { name: 'viewPdfLink', type: 'text', defaultValue: '#' },
        { name: 'downloadPdfText', type: 'text', defaultValue: 'Download PDF' },
        { name: 'downloadPdfLink', type: 'text', defaultValue: '#' },
        {
          name: 'downloadFile',
          type: 'upload',
          relationTo: 'media',
          label: 'PDF File Upload (Optional)',
        },
        { name: 'spineBadgeTag', type: 'text', label: 'Left Spine Tag (e.g. PDF, 24 PAGES)' },
        { name: 'spineTitle', type: 'text', label: 'Left Spine Vertical Title' },
        {
          name: 'spineBg',
          type: 'select',
          options: [
            { label: 'Purple', value: 'purple' },
            { label: 'Dark Purple', value: 'dark-purple' },
            { label: 'Dark Green', value: 'green' },
            { label: 'Amber / Orange', value: 'orange' },
          ],
          defaultValue: 'purple',
        },
      ],
    },
    {
      name: 'ctaBanner',
      type: 'group',
      label: 'Institutional Request CTA Banner',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Require Institutional Course Packages or Printed Physical Catalogues?',
        },
        {
          name: 'subtitle',
          type: 'textarea',
          defaultValue:
            'ProGuide coordinates with ENT departments, teaching hospitals, and surgical skill labs worldwide to provide customized bulk models, workshop facilitation kits, and printed course syllabi.',
        },
        { name: 'primaryBtnText', type: 'text', defaultValue: 'Request Call Back' },
        { name: 'primaryBtnLink', type: 'text', defaultValue: '/contact' },
        { name: 'secondaryBtnText', type: 'text', defaultValue: 'Email Programme Co-ordinator' },
        { name: 'secondaryBtnLink', type: 'text', defaultValue: 'mailto:info@pro-guide.in' },
      ],
    },
  ],
  timestamps: true,
}

export default Resources
