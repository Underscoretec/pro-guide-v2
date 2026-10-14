import React from 'react'
import Link from 'next/link'
import { roboto } from '@/font'
import type { BlogItem } from '@/lib/payload/blogs'
import { FaBookOpen, FaArrowRight } from 'react-icons/fa'

interface BlogListViewProps {
  blogs: BlogItem[]
}

export const BlogListView: React.FC<BlogListViewProps> = ({ blogs }) => {
  return (
    <div className={`${roboto.className} flex-1 bg-white`}>
      {/* Header */}
      <div className="phero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/" className="hover:underline">
              Home
            </Link>{' '}
            / Blog
          </div>
          <h1 className="text-[28px] md:text-[38px] font-bold text-white">
            The ProGuide Blog
          </h1>
          <p className="text-[#E4D3EC] max-w-[820px] mt-2.5 text-[15.5px]">
            Insights, technique tutorials, workshop recaps, and the latest
            advancements in otolaryngology surgical simulation.
          </p>
        </div>
      </div>

      <div className="wrap py-12">
        {blogs.length === 0 ? (
          <div className="text-center py-20 px-6 max-w-[600px] mx-auto border border-line rounded-sm bg-[#FAFAFC]">
            <div className="w-16 h-16 rounded-full bg-tint flex items-center justify-center mx-auto mb-4 text-purple">
              <FaBookOpen className="text-[24px]" />
            </div>
            <h2 className="text-[20px] font-bold text-ink mb-2">
              No Blog Posts Yet
            </h2>
            <p className="text-[14px] text-muted mb-6">
              Our editorial team is preparing insightful articles on 3D surgical
              training and ENT techniques. Stay tuned!
            </p>
            <Link href="/" className="btn sm">
              Explore ProGuide Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
            {blogs.map((post) => {
              const imageSrc = post.imageUrl || '/images/photo_micro.jpg'
              const postHref = `/blog/${post.slug || post.id}`

              return (
                <article
                  key={post.id}
                  className="bg-white border border-line rounded-sm overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all group"
                >
                  <Link
                    href={postHref}
                    className="aspect-[16/9] overflow-hidden block bg-[#F0F0F2]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>

                  <div className="p-5 flex-1 flex flex-col gap-2">
                    {post.category && (
                      <span className="text-[11px] font-extrabold tracking-[1.2px] uppercase text-orange">
                        {post.category}
                      </span>
                    )}

                    <h3 className="text-[17px] font-bold text-ink leading-[1.35]">
                      <Link
                        href={postHref}
                        className="text-ink hover:text-purple transition-colors no-underline"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    {post.excerpt && (
                      <p className="text-[13.5px] text-muted leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="text-[12px] text-muted mt-auto pt-3 border-t border-dashed border-line flex items-center justify-between">
                      <span>{post.meta}</span>
                      <Link
                        href={postHref}
                        className="text-purple hover:text-purple-d font-semibold text-[12px] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        Read <FaArrowRight className="text-[10px]" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogListView
