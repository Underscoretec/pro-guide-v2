import type { Block, CollectionConfig } from 'payload'

export const ResourcesHeroBlock: Block = {
  slug: 'resources-hero',
  fields: [
    {
      name: 'crumbHomeText',
      type: 'text',
      defaultValue: 'Home',
    },
    {
      name: 'crumbCurrentText',
      type: 'text',
      defaultValue: '3D Simulation',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Why 3D Simulation Models',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        "Everything surgeons ask us about the models — why they work, what they're made of, and every procedure that can be performed on them.",
    },
  ],
}

export const WhySimulationBlock: Block = {
  slug: 'why-simulation',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Why 3D Simulation Models',
    },
    {
      name: 'points',
      type: 'array',
      fields: [
        {
          name: 'num',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}

export const ModelFeaturesBlock: Block = {
  slug: 'model-features',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: '3D Simulation Bone Model Features',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'num',
          type: 'text',
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export const TemporalBoneProceduresBlock: Block = {
  slug: 'temporal-bone-procedures',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Procedures That Can Be Performed Using the Temporal Bone Model',
    },
    {
      name: 'procedures',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      type: 'text',
      defaultValue: '/images/photo_lab1.jpg',
    },
  ],
}

export const SinusProceduresBlock: Block = {
  slug: 'sinus-procedures',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Procedures on the Paranasal Sinus Model',
    },
    {
      name: 'procedures',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      type: 'text',
      defaultValue: '/images/photo_lab2.jpg',
    },
  ],
}

export const LarynxProceduresBlock: Block = {
  slug: 'larynx-procedures',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Procedures on the Larynx Model',
    },
    {
      name: 'procedures',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      type: 'text',
      defaultValue: '/images/photo_micro.jpg',
    },
  ],
}

export const VariantsBlock: Block = {
  slug: 'variants',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Temporal Bone Variants Available',
    },
    {
      name: 'variantsList',
      type: 'array',
      fields: [
        {
          name: 'code',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'desc',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}

export const DoctorAcknowledgmentBlock: Block = {
  slug: 'doctor-acknowledgment',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Acknowledgment From a Globally Acclaimed Otolaryngologist',
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'doctorName',
      type: 'text',
      defaultValue: 'Dr. Milind Kirtane',
    },
    {
      name: 'doctorTitle',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      type: 'text',
      defaultValue: '/images/photo_lab2.jpg',
    },
  ],
}

export const ThreeDSimulation: CollectionConfig = {
  slug: '3d-simulation',
  labels: {
    singular: '3D Simulation',
    plural: '3D Simulation',
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
      defaultValue: '3D Simulation Page',
    },
    {
      name: 'sections',
      type: 'blocks',
      blocks: [
        ResourcesHeroBlock,
        WhySimulationBlock,
        ModelFeaturesBlock,
        TemporalBoneProceduresBlock,
        SinusProceduresBlock,
        LarynxProceduresBlock,
        VariantsBlock,
        DoctorAcknowledgmentBlock,
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'keywords', type: 'text' },
      ],
    },
  ],
  timestamps: true,
}

export default ThreeDSimulation
