import React from 'react'
import Link from 'next/link'

export const WorkshopGlimpsesSection: React.FC = () => {
  return (
    <section className="pt-0 pb-[52px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead mb-[22px]">
          <p className="text-purple font-extrabold tracking-[1px] uppercase text-[12px]">
            Glimpses from our first KBI SkillBridge workshop
          </p>
          <h2 className="font-bold text-ink mt-1">
            Advanced Temporal Bone Dissection Workshop
          </h2>
          <p className="text-muted mt-2 text-[15px]">
            2 October 2026 &middot; KBI Skill Lab, Andheri East, Mumbai &middot; Under the aegis of AOI Mumbai West,
            ahead of Mumbai Manthan 3.0 &mdash; every delegate drilled their own 3D temporal bone model under
            faculty guidance.
          </p>
          <div className="rule" />
        </div>

        {/* Large Main Collage Image */}
        <Link href="/workshops.html" className="block overflow-hidden rounded-[10px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/ws_collage.jpg"
            alt="Collage from the Advanced Temporal Bone Dissection Workshop, 2 October 2026"
            className="w-full rounded-[10px] shadow-[0_16px_36px_rgba(31,35,40,0.18)] hover:opacity-95 transition-opacity"
          />
        </Link>

        {/* 4 Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[18px] mt-[14px]">
          <div className="rounded-[8px] overflow-hidden aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ws_lab.jpg"
              alt="Delegates at stations"
              className="w-full h-full object-cover rounded-[8px] hover:scale-105 transition-transform"
            />
          </div>
          <div className="rounded-[8px] overflow-hidden aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ws_faculty.jpg"
              alt="One-to-one faculty guidance"
              className="w-full h-full object-cover rounded-[8px] hover:scale-105 transition-transform"
            />
          </div>
          <div className="rounded-[8px] overflow-hidden aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ws_lecture.jpg"
              alt="Live demonstration"
              className="w-full h-full object-cover rounded-[8px] hover:scale-105 transition-transform"
            />
          </div>
          <div className="rounded-[8px] overflow-hidden aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ws_skilllab.jpg"
              alt="KBI Skill Lab inauguration"
              className="w-full h-full object-cover rounded-[8px] hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkshopGlimpsesSection
