'use client'

import React, { useState } from 'react'
import Link from 'next/link'

interface Workshop {
  title: string
  meta: string
  image: string
  alt: string
}

const workshopsByTab: Record<string, Workshop[]> = {
  t1: [
    {
      title: 'Basic 3D Temporal Bone Dissection Workshop',
      meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
      image: '/images/ws_lab.jpg',
      alt: 'Delegates at microscope stations',
    },
    {
      title: 'Advanced Temporal Bone Dissection Workshop',
      meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
      image: '/images/ws_faculty.jpg',
      alt: 'Faculty guiding a delegate at the microscope',
    },
    {
      title: 'Cochlear Implant Surgery Workshop',
      meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
      image: '/images/ws_lecture.jpg',
      alt: 'Faculty demonstration session',
    },
  ],
  t2: [
    {
      title: 'Paranasal Sinuses Workshop',
      meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
      image: '/images/ws_room2.jpg',
      alt: 'Hands-on workshop stations',
    },
    {
      title: 'Balloon Sinuplasty & Eustachian Tube Dilatation Workshop',
      meta: 'Single-day hands-on with didactic lectures and video demonstrations',
      image: '/images/ws_skilllab.jpg',
      alt: 'KBI Skill Lab, Andheri East',
    },
  ],
  t3: [
    {
      title: 'Larynx Workshop \u2014 Microlaryngoscopy & Laser Surgeries',
      meta: 'One-day, faculty-led hands-on workshop · Dates & fees on the registration page',
      image: '/images/ws_lecture.jpg',
      alt: 'Faculty demonstration session',
    },
  ],
}

export const ExploreWorkshopsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'t1' | 't2' | 't3'>('t1')

  return (
    <section id="workshops" className="py-[52px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold text-ink">Explore Workshops</h2>
          <div className="rule" />
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 justify-center flex-wrap mb-[26px]">
          <button
            type="button"
            onClick={() => setActiveTab('t1')}
            className={`border-[1.5px] rounded-[20px] py-2 px-[18px] text-[13.5px] font-semibold transition-all ${
              activeTab === 't1'
                ? 'bg-purple border-purple text-white'
                : 'bg-white border-line text-muted hover:border-purple/50'
            }`}
          >
            3D Temporal Bone
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('t2')}
            className={`border-[1.5px] rounded-[20px] py-2 px-[18px] text-[13.5px] font-semibold transition-all ${
              activeTab === 't2'
                ? 'bg-purple border-purple text-white'
                : 'bg-white border-line text-muted hover:border-purple/50'
            }`}
          >
            Paranasal Sinus
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('t3')}
            className={`border-[1.5px] rounded-[20px] py-2 px-[18px] text-[13.5px] font-semibold transition-all ${
              activeTab === 't3'
                ? 'bg-purple border-purple text-white'
                : 'bg-white border-line text-muted hover:border-purple/50'
            }`}
          >
            Microlaryngoscopy and Laser Surgeries
          </button>
        </div>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {workshopsByTab[activeTab].map((ws, idx) => (
            <div
              key={idx}
              className="bg-white border border-line rounded-[8px] overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[16/9] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ws.image}
                  alt={ws.alt}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <span className="text-[11px] tracking-[1.4px] uppercase text-orange font-extrabold">
                  KBI SkillBridge
                </span>
                <h3 className="text-[16px] font-bold text-ink leading-[1.4]">
                  {ws.title}
                </h3>
                <div className="text-[12.5px] text-muted leading-relaxed">
                  {ws.meta}
                </div>
                <div className="flex gap-2 mt-auto pt-[10px]">
                  <a
                    href="/ProGuide_3D_Workshops_2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-[9px] px-2 text-[12px] font-bold text-center bg-white text-ink rounded-[5px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all"
                  >
                    Download Brochure
                  </a>
                  <a
                    href="https://pro-guide.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-[9px] px-2 text-[12px] font-bold text-center bg-purple text-white rounded-[5px] border border-purple hover:bg-purple-d hover:border-purple-d transition-all"
                  >
                    Register for Workshop
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-[22px]">
          <Link
            href="/workshops.html"
            className="inline-block bg-white text-ink px-5 py-[10px] rounded-[5px] font-bold text-[13.5px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all shadow-sm"
          >
            View all programmes &rarr;
          </Link>
        </p>
      </div>
    </section>
  )
}

export default ExploreWorkshopsSection
