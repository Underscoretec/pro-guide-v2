import React from 'react'

interface BlogSectionProps {
  data?: any
  posts?: any[]
}

const defaultPosts = [
  {
    imageUrl: '/images/photo_micro.jpg',
    category: 'Temporal Bone',
    title: 'Mastering Temporal Bone Anatomy \u2014 The Key to Surgical Excellence',
    excerpt:
      'Why the temporal bone remains the defining challenge of otologic training, and how simulation accelerates the learning curve.',
    meta: 'By ProGuide Editorial \u00B7 5 min read',
  },
  {
    imageUrl: '/images/photo_lab1.jpg',
    category: 'Workshops',
    title: 'Why Hands-On Workshops Are Essential for ENT Surgeons',
    excerpt:
      'Medical education is evolving \u2014 and hands-on workshops are now a fundamental part of surgical training for safe, independent practice.',
    meta: 'By ProGuide Editorial \u00B7 4 min read',
  },
  {
    imageUrl: '/images/photo_lab2.jpg',
    category: '3D Training',
    title: 'How 3D Simulation Is Revolutionizing ENT Surgical Training',
    excerpt:
      "Surgical training has witnessed a transformation with the introduction of high-fidelity 3D simulation models \u2014 here's what changed.",
    meta: 'By ProGuide Editorial \u00B7 6 min read',
  },
]

export const BlogSection: React.FC<BlogSectionProps> = ({ data, posts }) => {
  const tag = data?.tag || 'Catch the latest updates on'
  const title = data?.title || 'The ProGuide Blog'

  const rawList = data?.postsList || posts || []
  const list = rawList.length > 0 ? rawList : defaultPosts

  return (
    <section className="py-[52px] bg-[#F8F8FA] border-t border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <p className="text-purple font-extrabold tracking-[1px] uppercase text-[12px]">
            {tag}
          </p>
          <h2 className="font-bold text-ink mt-1">{title}</h2>
          <div className="rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {list.map((post: any, idx: number) => {
            const mediaImage = typeof post.image === 'object' && post.image ? post.image.url : null
            const imageSrc = mediaImage || post.imageUrl || '/images/photo_micro.jpg'
            const key = post.id || post.slug || idx

            return (
              <div
                key={key}
                className="bg-white border border-line rounded-[8px] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col gap-[6px]">
                  <span className="text-[11px] font-extrabold tracking-[1.2px] uppercase text-orange">
                    {post.category}
                  </span>
                  <h3 className="text-[15.5px] font-bold text-ink leading-[1.4]">
                    {post.title}
                  </h3>
                  <p className="text-[13px] text-muted leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="text-[12px] text-muted mt-auto pt-2 border-t border-dashed border-line">
                    {post.meta}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BlogSection
