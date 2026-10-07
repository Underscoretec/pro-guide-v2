import type { CollectionConfig } from 'payload'

export const CustomizedModelPage: CollectionConfig = {
  slug: 'customized-model-page',
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
      defaultValue: 'Get Your Own Customized 3D Simulated Model',
      required: true,
    },
    {
      name: 'heroDescription',
      type: 'textarea',
      defaultValue:
        'We provide 3D simulated models as per your requirement. Fill in the details below and upload your DICOM file — our engineers will review the submission and get back to you within 48 working hours.',
    },
    {
      name: 'dicomHelpText',
      type: 'text',
      defaultValue: 'dicom file (max. 50MB)',
    },
    {
      name: 'dicomFormatInfo',
      type: 'textarea',
      defaultValue:
        'Only DICOM (.dcom) files are supported. Minimum 0.6mm thick sections in all the three planes Sagittal, Axial, CORONAL',
    },
  ],
}
