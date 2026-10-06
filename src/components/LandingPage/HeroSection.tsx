import React from 'react'
import Link from 'next/link'

export const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-[#FBF9FD] to-[#F1EBF9] border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-11 pb-12 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-[42px] items-center">
        {/* Left Column Content */}
        <div>
          <h1 className="text-[clamp(28px,3.6vw,42px)] font-bold leading-[1.25] text-ink">
            Otolaryngology Head &amp; Neck 3D Simulation Models
          </h1>
          <p className="text-muted my-[14px] mb-5 max-w-[560px] text-[16px] leading-[1.6]">
            Simulation surgery models for learning the surgeries in a hygienic &amp; easier way!
            KnowledgeBridge International is a tech knowledge company developing market-leading, innovative tools in
            collaboration with the medical community.
          </p>

          <ul className="list-none mb-[22px] space-y-[6px]">
            <li className="relative pl-[30px] font-semibold text-[15px] text-ink before:content-['\2713'] before:absolute before:left-[2px] before:text-orange before:font-extrabold">
              Participate in upcoming workshops
            </li>
            <li className="relative pl-[30px] font-semibold text-[15px] text-ink before:content-['\2713'] before:absolute before:left-[2px] before:text-orange before:font-extrabold">
              Purchase 3D Simulation Models
            </li>
            <li className="relative pl-[30px] font-semibold text-[15px] text-ink before:content-['\2713'] before:absolute before:left-[2px] before:text-orange before:font-extrabold">
              Get your own customized model from a CT scan
            </li>
          </ul>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="#products"
              className="inline-block bg-purple text-white px-5 py-[10px] rounded-[5px] font-bold text-[13.5px] border border-purple hover:bg-purple-d hover:border-purple-d transition-all text-center shadow-sm"
            >
              Explore Products
            </Link>
            <Link
              href="#workshops"
              className="inline-block bg-white text-ink px-5 py-[10px] rounded-[5px] font-bold text-[13.5px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all text-center shadow-sm"
            >
              Explore Workshops
            </Link>
          </div>
        </div>

        {/* Right Column Grid Images */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 rounded-[10px] overflow-hidden shadow-[0_20px_44px_rgba(76,21,96,0.22)] relative aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/ws_guide2.jpg"
              alt="Faculty guiding a delegate during hands-on dissection"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-[10px] overflow-hidden shadow-[0_20px_44px_rgba(76,21,96,0.22)] relative aspect-[4/3] bg-card flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/prod1.jpg"
              alt="3D temporal bone model"
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="rounded-[10px] overflow-hidden shadow-[0_20px_44px_rgba(76,21,96,0.22)] relative aspect-[4/3] bg-card flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/prod3.jpg"
              alt="Paranasal sinus model"
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
