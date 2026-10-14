import React from 'react'
import Link from 'next/link'
import { roboto } from '@/font'

interface BlogSectionProps {
  data?: any
  posts?: any[]
}

export const BlogSection: React.FC<BlogSectionProps> = ({ data, posts }) => {
  // Prefer blogs fetched from Payload 'blogs' collection, fallback to data?.postsList if configured in page
  const list = (posts && posts.length > 0) ? posts : (data?.postsList || [])

  // If no blog data is available from Payload, do not show the blog section
  if (!list || list.length === 0) {
    return null
  }

  const tag = data?.tag || 'Catch the latest updates on'
  const title = data?.title || 'The ProGuide Blog'

  return (
    <section className={`${roboto.className} py-[52px] bg-[#F8F8FA] border-t border-b border-line`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <p className="!text-purple font-extrabold tracking-[1px] uppercase text-[12px]">
            {tag}
          </p>
          <h2 className="font-bold text-ink mt-1">{title}</h2>
          <div className="rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {list.map((post: any, idx: number) => {
            const mediaImage = typeof post.image === 'object' && post.image ? post.image.url : null
            const imageSrc = mediaImage || post.imageUrl || '/images/photo_micro.jpg'
            const postSlug = post.slug || String(post.id || idx)
            const postHref = `/blog/${postSlug}`
            const key = post.id || post.slug || idx

            const authorName = post.author || 'ProGuide Editorial'
            const readTime = post.readTime || '5 min read'
            const metaText = post.meta || `By ${authorName} · ${readTime}`

            return (
              <article
                key={key}
                className="bg-white border border-line rounded-sm overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all group"
              >
                <Link href={postHref} className="aspect-[16/9] overflow-hidden block bg-[#F0F0F2]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={post.title || 'Blog image'}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="p-4 flex-1 flex flex-col gap-[6px]">
                  {post.category && (
                    <span className="text-[11px] font-extrabold tracking-[1.2px] uppercase text-orange">
                      {post.category}
                    </span>
                  )}
                  <h3 className="text-[15.5px] font-bold text-ink leading-[1.4]">
                    <Link
                      href={postHref}
                      className="text-ink hover:text-purple transition-colors no-underline"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt && (
                    <p className="text-[13px] text-muted leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="text-[12px] text-muted mt-auto pt-2 border-t border-dashed border-line flex items-center justify-between">
                    <span>{metaText}</span>
                    <Link
                      href={postHref}
                      className="text-purple hover:text-purple-d font-semibold text-[12px] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      Read &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BlogSection
