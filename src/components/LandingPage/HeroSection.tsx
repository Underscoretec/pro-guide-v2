import React from 'react'
import Link from 'next/link'

interface HeroSectionProps {
  data?: any
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const headline = data?.headline || 'Otolaryngology Head & Neck 3D Simulation Models'
  const lede =
    data?.lede ||
    'Simulation surgery models for learning the surgeries in a hygienic & easier way! KnowledgeBridge International is a tech knowledge company developing market-leading, innovative tools in collaboration with the medical community.'

  const defaultTicks = [
    'Participate in upcoming workshops',
    'Purchase 3D Simulation Models',
    'Get your own customized model from a CT scan',
  ]
  const ticks: string[] =
    data?.ticks && data.ticks.length > 0
      ? data.ticks.map((t: any) => (typeof t === 'string' ? t : t.text))
      : defaultTicks

  const primaryText = data?.primaryCTA?.text || 'Explore Products'
  const primaryLink = data?.primaryCTA?.link || '#products'

  const secondaryText = data?.secondaryCTA?.text || 'Explore Workshops'
  const secondaryLink = data?.secondaryCTA?.link || '#workshops'

  const mainImage = data?.mainImage?.url || data?.mainImageUrl || '/images/ws_guide2.jpg'
  const cardImage1 = data?.cardImage1?.url || data?.cardImage1Url || '/images/prod1.jpg'
  const cardImage2 = data?.cardImage2?.url || data?.cardImage2Url || '/images/prod3.jpg'

  return (
    <div className="bg-gradient-to-b from-[#FBF9FD] to-[#F1EBF9] border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6 py-11 pb-12 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-[42px] items-center">
        {/* Left Column Content */}
        <div>
          <h1 className="text-[clamp(28px,3.6vw,42px)] font-bold leading-[1.25] text-ink">
            {headline}
          </h1>
          <p className="text-muted my-[14px] mb-5 max-w-[560px] text-[16px] leading-[1.6]">
            {lede}
          </p>

          <ul className="list-none mb-[22px] space-y-[6px]">
            {ticks.map((tick, idx) => (
              <li
                key={idx}
                className="relative pl-[30px] font-semibold text-[15px] text-ink before:content-['\2713'] before:absolute before:left-[2px] before:text-orange before:font-extrabold"
              >
                {tick}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={primaryLink}
              className="inline-block bg-purple text-white px-5 py-[10px] rounded-[5px] font-bold text-[13.5px] border border-purple hover:bg-purple-d hover:border-purple-d transition-all text-center shadow-sm"
            >
              {primaryText}
            </Link>
            <Link
              href={secondaryLink}
              className="inline-block bg-white text-ink px-5 py-[10px] rounded-[5px] font-bold text-[13.5px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all text-center shadow-sm"
            >
              {secondaryText}
            </Link>
          </div>
        </div>

        {/* Right Column Grid Images */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 rounded-[10px] overflow-hidden shadow-[0_20px_44px_rgba(76,21,96,0.22)] relative aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mainImage}
              alt="Faculty guiding a delegate during hands-on dissection"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-[10px] overflow-hidden shadow-[0_20px_44px_rgba(76,21,96,0.22)] relative aspect-[4/3] bg-card flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cardImage1}
              alt="3D temporal bone model"
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="rounded-[10px] overflow-hidden shadow-[0_20px_44px_rgba(76,21,96,0.22)] relative aspect-[4/3] bg-card flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cardImage2}
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
