import React from 'react'
import Link from 'next/link'

interface WorkshopGlimpsesProps {
  data?: any
}

const defaultGallery = [
  { imageUrl: '/images/ws_lab.jpg', alt: 'Delegates at stations' },
  { imageUrl: '/images/ws_faculty.jpg', alt: 'One-to-one faculty guidance' },
  { imageUrl: '/images/ws_lecture.jpg', alt: 'Live demonstration' },
  { imageUrl: '/images/ws_skilllab.jpg', alt: 'KBI Skill Lab inauguration' },
]

export const WorkshopGlimpsesSection: React.FC<WorkshopGlimpsesProps> = ({ data }) => {
  const tag = data?.tag || 'Glimpses from our first KBI SkillBridge workshop'
  const title = data?.title || 'Advanced Temporal Bone Dissection Workshop'
  const description =
    data?.description ||
    '2 October 2026 · KBI Skill Lab, Andheri East, Mumbai · Under the aegis of AOI Mumbai West, ahead of Mumbai Manthan 3.0 — every delegate drilled their own 3D temporal bone model under faculty guidance.'

  const collageImage = data?.collageImage?.url || data?.collageImageUrl || '/images/ws_collage.jpg'
  const gallery = data?.gallery && data.gallery.length > 0 ? data.gallery : defaultGallery

  return (
    <section className="pt-0 pb-[52px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead mb-[22px]">
          <p className="!text-purple font-extrabold tracking-[1px] uppercase text-[12px]">
            {tag}
          </p>
          <h2 className="font-bold text-ink mt-1">
            {title}
          </h2>
          <p className="text-muted mt-2 text-[15px]">
            {description}
          </p>
          <div className="rule" />
        </div>

        {/* Large Main Collage Image */}
        <Link href="/workshops.html" className="block overflow-hidden rounded-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={collageImage}
            alt={title}
            className="w-full rounded-[10px] shadow-[0_16px_36px_rgba(31,35,40,0.18)] hover:opacity-95 transition-opacity"
          />
        </Link>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[18px] mt-[14px]">
          {gallery.map((item: any, idx: number) => {
            const mediaImage = typeof item.image === 'object' && item.image ? item.image.url : null
            const imageSrc = mediaImage || item.imageUrl || item.image || '/images/ws_lab.jpg'

            return (
              <div key={idx} className="rounded-[8px] overflow-hidden aspect-[16/10]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt={item.alt || 'Workshop glimpse'}
                  className="w-full h-full object-cover rounded-[8px] hover:scale-105 transition-transform"
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WorkshopGlimpsesSection
