'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { roboto } from '@/font'

interface ExploreWorkshopsProps {
  data?: any
  workshops?: any[]
}

const defaultWorkshops = [
  {
    title: 'Basic 3D Temporal Bone Dissection Workshop',
    category: 'temporal',
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
    imageUrl: '/images/ws_lab.jpg',
    alt: 'Delegates at microscope stations',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    title: 'Advanced Temporal Bone Dissection Workshop',
    category: 'temporal',
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
    imageUrl: '/images/ws_faculty.jpg',
    alt: 'Faculty guiding a delegate at the microscope',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    title: 'Cochlear Implant Surgery Workshop',
    category: 'temporal',
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
    imageUrl: '/images/ws_lecture.jpg',
    alt: 'Faculty demonstration session',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    title: 'Paranasal Sinuses Workshop',
    category: 'sinus',
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
    imageUrl: '/images/ws_room2.jpg',
    alt: 'Hands-on workshop stations',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    title: 'Balloon Sinuplasty & Eustachian Tube Dilatation Workshop',
    category: 'sinus',
    tagline: 'KBI SkillBridge',
    meta: 'Single-day hands-on with didactic lectures and video demonstrations',
    imageUrl: '/images/ws_skilllab.jpg',
    alt: 'KBI Skill Lab, Andheri East',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    title: 'Larynx Workshop — Microlaryngoscopy & Laser Surgeries',
    category: 'larynx',
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
    imageUrl: '/images/ws_lecture.jpg',
    alt: 'Faculty demonstration session',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
]

const getWorkshopSlug = (title: string) => {
  if (!title) return 'basic-3d-temporal-bone-dissection-workshop'
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export const ExploreWorkshopsSection: React.FC<ExploreWorkshopsProps> = ({ data, workshops }) => {
  const [activeTab, setActiveTab] = useState<'temporal' | 'sinus' | 'larynx'>('temporal')

  const title = data?.title || 'Explore Workshops'
  const rawList = data?.workshopsList || workshops || []
  const list = rawList.length > 0 ? rawList : defaultWorkshops

  const filteredWorkshops = list.filter((ws: any) => ws.category === activeTab)

  return (
    <section id="workshops" className={`${roboto.className} py-[52px]`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold text-ink">{title}</h2>
          <div className="rule" />
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 justify-center flex-wrap mb-[26px]">
          <button
            type="button"
            onClick={() => setActiveTab('temporal')}
            className={`border-[1.5px] rounded-sm py-2 px-[18px] text-[13.5px] font-semibold transition-all ${
              activeTab === 'temporal'
                ? 'bg-purple border-purple text-white'
                : 'bg-white border-line text-muted hover:border-purple/50'
            }`}
          >
            3D Temporal Bone
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sinus')}
            className={`border-[1.5px] rounded-sm py-2 px-[18px] text-[13.5px] font-semibold transition-all ${
              activeTab === 'sinus'
                ? 'bg-purple border-purple text-white'
                : 'bg-white border-line text-muted hover:border-purple/50'
            }`}
          >
            Paranasal Sinus
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('larynx')}
            className={`border-[1.5px] rounded-sm py-2 px-[18px] text-[13.5px] font-semibold transition-all ${
              activeTab === 'larynx'
                ? 'bg-purple border-purple text-white'
                : 'bg-white border-line text-muted hover:border-purple/50'
            }`}
          >
            Microlaryngoscopy and Laser Surgeries
          </button>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {filteredWorkshops.map((ws: any, idx: number) => {
            const mediaImage = typeof ws.image === 'object' && ws.image ? ws.image.url : null
            const imageSrc = mediaImage || ws.imageUrl || '/images/ws_lab.jpg'
            const key = ws.id || ws.title || idx
            const slug = getWorkshopSlug(ws.slug || ws.title)

            return (
              <div
                key={key}
                className="bg-white border border-line rounded-sm overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={`/workshops/${slug}`} className="aspect-[16/9] overflow-hidden block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={ws.alt || ws.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </Link>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <span className="text-[11px] tracking-[1.4px] uppercase text-orange font-extrabold">
                    {ws.tagline || 'KBI SkillBridge'}
                  </span>
                  <h3 className="text-[16px] font-bold text-ink leading-[1.4]">
                    <Link href={`/workshops/${slug}`} className="text-ink hover:text-ink transition-colors">
                      {ws.title}
                    </Link>
                  </h3>
                  <div className="text-[12.5px] text-muted leading-relaxed">
                    {ws.meta}
                  </div>
                  <div className="flex gap-2 mt-auto pt-[10px]">
                    <a
                      href={ws.brochureUrl || '/ProGuide_3D_Workshops_2026.pdf'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-[9px] px-2 text-[12px] font-bold text-center bg-white text-ink rounded-sm border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all"
                    >
                      Download Flyer
                    </a>
                    <Link
                      href={`/workshops/${slug}`}
                      className="flex-1 py-[9px] px-2 text-[12px] font-bold text-center bg-purple text-white rounded-sm border border-purple hover:bg-purple-d hover:border-purple-d transition-all"
                    >
                      Know More
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-center mt-[22px]">
          <Link
            href="/workshops"
            className="inline-block bg-white text-ink px-5 py-[10px] rounded-sm font-bold text-[13.5px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all shadow-sm"
          >
            View all programmes &rarr;
          </Link>
        </p>
      </div>
    </section>
  )
}

export default ExploreWorkshopsSection
