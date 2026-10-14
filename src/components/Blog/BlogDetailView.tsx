import React from 'react'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { roboto } from '@/font'
import type { BlogItem } from '@/lib/payload/blogs'
import { FaArrowLeft } from 'react-icons/fa'

interface BlogDetailViewProps {
  blog: BlogItem
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

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({ blog }) => {
  const publishedText = formatDate(blog.publishedDate || blog.createdAt)

  // Build byline parts (credentials, location, date, read time)
  const bylineParts: string[] = []
  if (blog.authorTitle) bylineParts.push(blog.authorTitle)
  if (blog.authorLocation) bylineParts.push(blog.authorLocation)
  if (bylineParts.length === 0) {
    if (publishedText) bylineParts.push(publishedText)
    if (blog.readTime) bylineParts.push(blog.readTime)
  }

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
