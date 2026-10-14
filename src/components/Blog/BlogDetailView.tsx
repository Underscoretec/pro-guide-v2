import React from 'react'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { roboto } from '@/font'
import type { BlogItem } from '@/lib/payload/blogs'
import { FaArrowLeft } from 'react-icons/fa'

interface BlogDetailViewProps {
  blog: BlogItem
  allBlogs?: BlogItem[]
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  blog,
  allBlogs = [],
}) => {
  const publishedText = formatDate(blog.publishedDate || blog.createdAt)

  // Build byline parts (credentials, location, date, read time)
  const bylineParts: string[] = []
  if (blog.authorTitle) bylineParts.push(blog.authorTitle)
  if (blog.authorLocation) bylineParts.push(blog.authorLocation)
  if (bylineParts.length === 0) {
    if (publishedText) bylineParts.push(publishedText)
    if (blog.readTime) bylineParts.push(blog.readTime)
  }

  // Series navigation: only if this blog is part of a series (not 'none')
  const DEFAULT_SERIES_TITLES: Record<number, string> = {
    1: 'Methodology',
    2: 'Anatomy',
    3: 'Dissection',
  }

  // Pool all published blogs, ensuring the current blog is included
  const blogsPool = [...allBlogs]
  if (
    !blogsPool.some(
      (b) => String(b.id) === String(blog.id) || b.slug === blog.slug
    )
  ) {
    blogsPool.push(blog)
  }

  // Filter only blogs belonging to the series (partNumber is not 'none')
  const seriesBlogs = blogsPool.filter((b) => b.partNumber !== 'none')

  // Sort series blogs:
  // 1. By explicit partNumber if distinct
  // 2. Otherwise chronologically by creation date ascending (oldest first)
  const sortedSeries = [...seriesBlogs].sort((a, b) => {
    const pA = a.partNumber ? parseInt(a.partNumber, 10) : NaN
    const pB = b.partNumber ? parseInt(b.partNumber, 10) : NaN

    if (!isNaN(pA) && !isNaN(pB) && pA !== pB) {
      return pA - pB
    }
    if (!isNaN(pA) && isNaN(pB)) return -1
    if (isNaN(pA) && !isNaN(pB)) return 1

    const dateA = new Date(a.createdAt || 0).getTime()
    const dateB = new Date(b.createdAt || 0).getTime()
    return dateA - dateB
  })

  // Check if every blog in the series has a unique explicit part number ('1', '2', '3')
  const explicitParts = sortedSeries
    .map((b) => b.partNumber)
    .filter((p): p is string => Boolean(p && ['1', '2', '3'].includes(p)))
  const hasDistinctExplicit =
    explicitParts.length === sortedSeries.length &&
    new Set(explicitParts).size === sortedSeries.length

  // Build the dynamic series parts array.
  // ONLY creates items for blogs that actually exist in the database (1 blog -> 1 part, 2 blogs -> 2 parts, 3 blogs -> 3 parts)
  // All paths are 100% dynamic (`/blog/${item.slug}`) with NO static fallback paths.
  const seriesParts = sortedSeries.slice(0, 3).map((item, index) => {
    const partNum =
      hasDistinctExplicit && item.partNumber
        ? parseInt(item.partNumber, 10)
        : index + 1

    const defaultTitle = DEFAULT_SERIES_TITLES[partNum] || `Part ${partNum}`
    const label = `Part ${partNum} · ${defaultTitle}`
    const isCurrent =
      String(item.id) === String(blog.id) || item.slug === blog.slug

    return {
      num: partNum,
      label,
      href: `/blog/${item.slug}`,
      isCurrent,
    }
  })

  const showSeriesParts = blog.partNumber !== 'none' && seriesParts.length > 0

  return (
    <article className={`${roboto.className} flex-1 bg-white`}>
      <div className="max-w-[880px] mx-auto px-6">
        {/* Top Header Bar */}
        <div className="pt-6 pb-4 border-b border-[#E3E5E9] flex items-center justify-between flex-wrap gap-2">
          <Link
            href="/blog"
            className="text-purple font-extrabold text-[22px] tracking-tight hover:opacity-90 transition-opacity no-underline"
          >
            ProGuide
          </Link>
          <span className="text-[13px] md:text-[14px] text-muted font-normal">
            Otolaryngology · Head & Neck Simulation
          </span>
        </div>

        {/* Blog Post Header Info */}
        <header className="pt-7 pb-2">
          {blog.category && (
            <div className="mb-3.5">
              <span className="inline-block bg-[#E67E22] text-white font-extrabold text-[11px] tracking-[1.4px] uppercase px-3 py-1 rounded-[3px]">
                {blog.category}
              </span>
            </div>
          )}

          {/* Main Title */}
          <h1 className="text-[32px] md:text-[46px] font-extrabold text-[#1A1D20] leading-[1.18] tracking-tight mb-2">
            {blog.title}
          </h1>

          {/* Optional Subtitle */}
          {blog.subtitle && (
            <h2 className="text-[20px] md:text-[24px] font-normal text-muted leading-snug mt-1 mb-2">
              {blog.subtitle}
            </h2>
          )}

          {/* Excerpt / Lead Intro */}
          {blog.excerpt && (
            <p className="text-[15px] md:text-[16.5px] text-[#4B5563] leading-relaxed mt-2 mb-2 font-normal">
              {blog.excerpt}
            </p>
          )}

          {/* Dynamic Series Navigation: only shows parts for blogs that actually exist */}
          {showSeriesParts && (
            <div className="flex items-center gap-2.5 flex-wrap mt-5 mb-5">
              {seriesParts.map((p) => (
                <Link
                  key={p.num}
                  href={p.isCurrent ? '#' : p.href}
                  aria-current={p.isCurrent ? 'page' : undefined}
                  className={`inline-flex items-center px-3.5 py-1.5 rounded-[4px] text-[13px] md:text-[13.5px] transition-all no-underline ${
                    p.isCurrent
                      ? 'border-2 border-purple text-purple bg-[#FAF7FD] font-bold shadow-xs cursor-default'
                      : 'border border-[#E3E5E9] text-[#4B5563] bg-white font-medium hover:border-purple/70 hover:text-purple hover:bg-[#FAF7FD] cursor-pointer'
                  }`}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          )}

          {/* Divider line before byline */}
          <div className="border-b border-[#E3E5E9] mt-6 mb-4" />

          {/* Author Byline */}
          <div className="flex flex-wrap items-center text-[14.5px] py-1 text-muted">
            <span className="font-bold text-purple text-[15px]">
              {blog.author || 'ProGuide Editorial'}
            </span>
            {bylineParts.map((part, i) => (
              <React.Fragment key={i}>
                <span className="text-[#C9CDD3] mx-2.5 font-light select-none">
                  /
                </span>
                <span className="text-muted text-[14px]">{part}</span>
              </React.Fragment>
            ))}
          </div>
        </header>

        {/* Main Content Body */}
        <div className="py-8">
          {/* Rich Text Editor Content from Payload */}
          {blog.content ? (
            <div className="payload-richtext text-[16px] md:text-[17px] leading-[1.8] text-[#24292F]">
              <RichText data={blog.content} />
            </div>
          ) : (
            <div className="py-8 text-muted italic">
              No further content available for this post.
            </div>
          )}

          {/* Bottom Navigation & Actions */}
          <div className="mt-12 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/"
              className="btn ghost sm !inline-flex !flex-row !items-center gap-2 whitespace-nowrap"
            >
              <FaArrowLeft className="text-[11px] shrink-0" />
              <span>Back to Home</span>
            </Link>

            <Link href="/blog" className="btn sm">
              View All Blog Articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogDetailView
