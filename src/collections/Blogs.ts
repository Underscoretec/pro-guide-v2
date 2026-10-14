import type { CollectionConfig } from 'payload'
import type { User } from '../payload-types'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  labels: {
    singular: 'Blog',
    plural: 'Blogs',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'status', 'publishedDate', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user && ['admin', 'kb_admin'].includes((user as User).role)),
    update: ({ req: { user } }) => Boolean(user && ['admin', 'kb_admin'].includes((user as User).role)),
    delete: ({ req: { user } }) => Boolean(user && ['admin', 'kb_admin'].includes((user as User).role)),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Blog Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle / Secondary Headline',
      admin: {
        placeholder: 'e.g. The Key to Surgical Excellence',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'Slug',
      admin: {
        description: 'URL slug for the blog details page (e.g. /blog/mastering-anatomy). Generated automatically from title if left empty.',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            const raw = value || data?.title || ''
            return String(raw)
              .toLowerCase()
              .trim()
              .replace(/^\/+|\/+$/g, '')
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9-_]/g, '')
          },
        ],
      },
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
      admin: {
        placeholder: 'e.g. Temporal Bone, Workshops, 3D Training',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Excerpt / Summary',
      admin: {
        description: 'Brief overview displayed on blog cards on the home page.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Card Cover Image',
      admin: {
        description: 'Cover image used on blog cards (landing page & blog listing). Images inside the article can be added directly in the text editor below.',
      },
    },
    {
      name: 'imageUrl',
      type: 'text',
      label: 'Card Cover Image URL (fallback / external URL)',
    },
    {
      name: 'author',
      type: 'text',
      defaultValue: 'ProGuide Editorial',
      label: 'Author Name',
    },
    {
      name: 'authorTitle',
      type: 'text',
      label: 'Author Qualifications / Title',
      admin: {
        placeholder: 'e.g. MS (ENT), DLO',
      },
    },
    {
      name: 'authorLocation',
      type: 'text',
      label: 'Author Location',
      admin: {
        placeholder: 'e.g. Nagpur, India',
      },
    },
    {
      name: 'readTime',
      type: 'text',
      defaultValue: '5 min read',
      label: 'Read Time',
      admin: {
        placeholder: 'e.g. 5 min read',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Published Date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Blog Content (Text Editor)',
      admin: {
        description: 'Compose and format full blog article using the rich text editor.',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Draft', value: 'draft' },
      ],
      label: 'Status',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured on Landing Page',
      admin: {
        position: 'sidebar',
        description: 'Optionally highlight this post on the landing page.',
      },
    },
  ],
  timestamps: true,
}

export default Blogs
