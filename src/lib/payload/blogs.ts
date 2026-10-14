import { cache } from 'react'
import { getPayloadClient } from './client'
import type { Blog } from '@/payload-types'

export interface BlogItem {
  id: string | number
  title: string
  subtitle?: string
  slug: string
  category?: string
  excerpt?: string
  image?: any
  imageUrl?: string
  author?: string
  authorTitle?: string
  authorLocation?: string
  readTime?: string
  publishedDate?: string
  content?: any
  meta?: string
  partNumber?: string
  createdAt?: string
}

export const formatBlogItem = (doc: any): BlogItem => {
  const mediaUrl =
    typeof doc.image === 'object' && doc.image?.url ? doc.image.url : null
  const imageUrl = mediaUrl || doc.imageUrl || ''

  const author = doc.author || 'ProGuide Editorial'
  const readTime = doc.readTime || '5 min read'
  const meta = doc.meta || `By ${author} · ${readTime}`

  return {
    id: doc.id,
    title: doc.title,
    subtitle: doc.subtitle || '',
    slug: doc.slug || String(doc.id),
    category: doc.category || 'General',
    excerpt: doc.excerpt || '',
    image: doc.image,
    imageUrl,
    author,
    authorTitle: doc.authorTitle || '',
    authorLocation: doc.authorLocation || '',
    readTime,
    publishedDate: doc.publishedDate || doc.createdAt,
    content: doc.content,
    meta,
    partNumber: doc.partNumber || undefined,
    createdAt: doc.createdAt,
  }
}

export const getLandingBlogs = cache(async (): Promise<BlogItem[]> => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'blogs',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-createdAt',
      limit: 10,
      depth: 2,
    })

    if (!result.docs || result.docs.length === 0) {
      return []
    }

    return result.docs.map(formatBlogItem)
  } catch (error) {
    console.error('Error fetching blogs from Payload:', error)
    return []
  }
})

export const getAllBlogs = cache(async (): Promise<BlogItem[]> => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'blogs',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-createdAt',
      limit: 50,
      depth: 2,
    })

    if (!result.docs || result.docs.length === 0) {
      return []
    }

    return result.docs.map(formatBlogItem)
  } catch (error) {
    console.error('Error fetching all blogs from Payload:', error)
    return []
  }
})

export const getBlogBySlug = cache(async (slug: string): Promise<BlogItem | null> => {
  try {
    if (!slug) return null

    const cleanSlug = String(slug).trim().toLowerCase().replace(/^\/+|\/+$/g, '')
    const payload = await getPayloadClient()

    // Query by slug
    const result = await payload.find({
      collection: 'blogs',
      where: {
        slug: {
          equals: cleanSlug,
        },
      },
      depth: 2,
      limit: 1,
    })

    if (result.docs && result.docs.length > 0) {
      return formatBlogItem(result.docs[0])
    }

    // Try finding by id if slug is numeric
    if (!isNaN(Number(cleanSlug))) {
      try {
        const byId = await payload.findByID({
          collection: 'blogs',
          id: Number(cleanSlug),
          depth: 2,
        })
        if (byId) return formatBlogItem(byId)
      } catch {
        // ignore ID lookup failure
      }
    }

    return null
  } catch (error) {
    console.error(`Error fetching blog by slug "${slug}":`, error)
    return null
  }
})
