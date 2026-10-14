import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogBySlug } from '@/lib/payload/blogs'
import { BlogDetailView } from '@/components/Blog'

export const dynamic = 'force-dynamic'

interface BlogDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    return {
      title: 'Blog Post Not Found | ProGuide',
    }
  }

  return {
    title: `${blog.title} | ProGuide Blog`,
    description: blog.excerpt || `${blog.title} — ProGuide surgical simulation and training`,
    openGraph: {
      title: `${blog.title} | ProGuide Blog`,
      description: blog.excerpt || '',
      images: blog.imageUrl ? [{ url: blog.imageUrl }] : [],
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const blog = await getBlogBySlug(slug)

  if (!blog) {
    notFound()
  }

  return <BlogDetailView blog={blog} />
}
