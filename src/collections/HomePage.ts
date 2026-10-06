import type { Block, CollectionConfig } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'headline',
      type: 'text',
      required: true,
      defaultValue: 'Otolaryngology Head & Neck 3D Simulation Models',
    },
    {
      name: 'lede',
      type: 'textarea',
      required: true,
      defaultValue:
        'Simulation surgery models for learning the surgeries in a hygienic & easier way! KnowledgeBridge International is a tech knowledge company developing market-leading, innovative tools in collaboration with the medical community.',
    },
    {
      name: 'ticks',
      type: 'array',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'primaryCTA',
      type: 'group',
      fields: [
        { name: 'text', type: 'text', defaultValue: 'Explore Products' },
        { name: 'link', type: 'text', defaultValue: '#products' },
      ],
    },
    {
      name: 'secondaryCTA',
      type: 'group',
      fields: [
        { name: 'text', type: 'text', defaultValue: 'Explore Workshops' },
        { name: 'link', type: 'text', defaultValue: '#workshops' },
      ],
    },
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'mainImageUrl',
      type: 'text',
      defaultValue: '/images/ws_guide2.jpg',
    },
    {
      name: 'cardImage1',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'cardImage1Url',
      type: 'text',
      defaultValue: '/images/prod1.jpg',
    },
    {
      name: 'cardImage2',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'cardImage2Url',
      type: 'text',
      defaultValue: '/images/prod3.jpg',
    },
    {
      name: 'carouselImages',
      type: 'array',
      label: 'Bottom Carousel Images (2 by 2 Auto Scroll)',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'imageUrl',
          type: 'text',
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
  ],
}

export const PartnersBlock: Block = {
  slug: 'partners',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Partnerships with top institutes to make world-class education accessible globally',
    },
    {
      name: 'partnersList',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export const ProductsBlock: Block = {
  slug: 'products',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Product Offerings',
    },
    {
      name: 'productsList',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', required: true },
        { name: 'variant', type: 'text', defaultValue: 'Available in Left and Right variant' },
        { name: 'price', type: 'text', required: true },
        { name: 'gstNote', type: 'text', defaultValue: '+ 18% GST' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
        { name: 'alt', type: 'text' },
        { name: 'cartUrl', type: 'text', defaultValue: 'https://pro-guide.in/' },
        { name: 'detailsUrl', type: 'text' },
      ],
    },
  ],
}

export const TrueToLifeDetailsBlock: Block = {
  slug: 'true-to-life-details',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Every Detail, True to Life',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue: 'Straight from our bench — unretouched photographs of the models our delegates train on.',
    },
    {
      name: 'detailsList',
      type: 'array',
      fields: [
        { name: 'category', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
        { name: 'alt', type: 'text' },
      ],
    },
  ],
}

export const WorkshopsBlock: Block = {
  slug: 'workshops',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Explore Workshops',
    },
    {
      name: 'workshopsList',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: '3D Temporal Bone', value: 'temporal' },
            { label: 'Paranasal Sinus', value: 'sinus' },
            { label: 'Microlaryngoscopy and Laser Surgeries', value: 'larynx' },
          ],
          required: true,
        },
        { name: 'tagline', type: 'text', defaultValue: 'KBI SkillBridge' },
        { name: 'meta', type: 'text', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
        { name: 'alt', type: 'text' },
        { name: 'brochureUrl', type: 'text', defaultValue: '/ProGuide_3D_Workshops_2026.pdf' },
        { name: 'registrationUrl', type: 'text', defaultValue: 'https://pro-guide.in/' },
      ],
    },
  ],
}

export const WorkshopGlimpsesBlock: Block = {
  slug: 'workshop-glimpses',
  fields: [
    {
      name: 'tag',
      type: 'text',
      defaultValue: 'Glimpses from our first KBI SkillBridge workshop',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Advanced Temporal Bone Dissection Workshop',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        '2 October 2026 · KBI Skill Lab, Andheri East, Mumbai · Under the aegis of AOI Mumbai West, ahead of Mumbai Manthan 3.0 — every delegate drilled their own 3D temporal bone model under faculty guidance.',
    },
    {
      name: 'collageImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'collageImageUrl',
      type: 'text',
      defaultValue: '/images/ws_collage.jpg',
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
        { name: 'alt', type: 'text' },
      ],
    },
  ],
}

export const WhyArtificialBoneBlock: Block = {
  slug: 'why-artificial-bone',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Why Artificial Bone',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'imageUrl',
      type: 'text',
      defaultValue: '/images/detail_macro.jpg',
    },
    {
      name: 'checkList',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
  ],
}

export const FacultyBlock: Block = {
  slug: 'faculty',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'World-Class Faculty',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue:
        'Learn from faculty members who bring a blend of theory and practice, and real-world examples relevant to your learning experience.',
    },
    {
      name: 'facultyList',
      type: 'array',
      fields: [
        { name: 'initials', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text', required: true },
        { name: 'bio', type: 'textarea', required: true },
      ],
    },
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  fields: [
    {
      name: 'feedbackTitle',
      type: 'text',
      defaultValue: 'Temporal Bone Dissection Workshop Feedback',
    },
    {
      name: 'feedbackList',
      type: 'array',
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text', required: true },
      ],
    },
    {
      name: 'storiesTitle',
      type: 'text',
      defaultValue: 'What Our Learners Are Saying',
    },
    {
      name: 'storiesList',
      type: 'array',
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text', required: true },
      ],
    },
  ],
}

export const BoneVariantsBlock: Block = {
  slug: 'bone-variants',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Temporal Bone Variants',
    },
    {
      name: 'variantsList',
      type: 'array',
      fields: [
        { name: 'code', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
  ],
}

export const LeadFormBlock: Block = {
  slug: 'lead-form',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Let us guide you in your upskilling journey',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      defaultValue:
        'Our programme experts are available 7 days a week. Fill the form and we will help you choose the right programme.',
    },
    {
      name: 'submitEmail',
      type: 'text',
      defaultValue: 'shelly@knowledgebridgeint.com',
    },
  ],
}

export const BlogBlock: Block = {
  slug: 'blog',
  fields: [
    {
      name: 'tag',
      type: 'text',
      defaultValue: 'Catch the latest updates on',
    },
    {
      name: 'title',
      type: 'text',
      defaultValue: 'The ProGuide Blog',
    },
    {
      name: 'postsList',
      type: 'array',
      fields: [
        { name: 'category', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'excerpt', type: 'textarea', required: true },
        { name: 'meta', type: 'text', defaultValue: 'By ProGuide Editorial · 5 min read' },
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'imageUrl', type: 'text' },
      ],
    },
  ],
}

export const HomePage: CollectionConfig = {
  slug: 'home-page',
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
      defaultValue: 'Home',
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'sections',
      type: 'blocks',
      blocks: [
        HeroBlock,
        PartnersBlock,
        ProductsBlock,
        TrueToLifeDetailsBlock,
        WorkshopsBlock,
        WorkshopGlimpsesBlock,
        WhyArtificialBoneBlock,
        FacultyBlock,
        TestimonialsBlock,
        BoneVariantsBlock,
        LeadFormBlock,
        BlogBlock,
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

export default HomePage
