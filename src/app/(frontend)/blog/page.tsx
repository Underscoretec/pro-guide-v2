import React from 'react'
import type { Metadata } from 'next'
import { getAllBlogs } from '@/lib/payload/blogs'
import { BlogListView } from '@/components/Blog'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog | ProGuide 3D Simulation Models',
  description:
    'Catch up on the latest surgical techniques, 3D simulation training breakthroughs, and workshop recaps from ProGuide.',
}

export default async function BlogIndexPage() {
  const blogs = await getAllBlogs()
  return <BlogListView blogs={blogs} />
}
