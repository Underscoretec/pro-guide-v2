'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface HeroSectionProps {
  data?: any
}

const defaultCarousel = [
  { imageUrl: '/images/prod1.jpg', alt: '3D temporal bone model' },
  { imageUrl: '/images/prod2.jpg', alt: 'Paranasal Model with Bassettes' },
  { imageUrl: '/images/prod3.jpg', alt: 'Paranasal sinus model' },
  { imageUrl: '/images/prod4.jpg', alt: 'Larynx Model' },
]

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

  // Top image remains still (static)
  const mainImage = data?.mainImage?.url || data?.mainImageUrl || '/images/ws_guide2.jpg'

  // Bottom images for 2-by-2 auto-scroll carousel
  const rawCarousel = data?.carouselImages && data.carouselImages.length > 0
    ? data.carouselImages
    : (data?.cardImage1 || data?.cardImage2
        ? [
            { imageUrl: data?.cardImage1?.url || data?.cardImage1Url || '/images/prod1.jpg', alt: '3D temporal bone model' },
            { imageUrl: data?.cardImage2?.url || data?.cardImage2Url || '/images/prod3.jpg', alt: 'Paranasal sinus model' },
            { imageUrl: '/images/prod2.jpg', alt: 'Paranasal Model with Bassettes' },
            { imageUrl: '/images/prod4.jpg', alt: 'Larynx Model' },
          ]
        : defaultCarousel)

  // Chunk carousel items into pairs (2 images per slide)
  const pairs: any[][] = []
  for (let i = 0; i < rawCarousel.length; i += 2) {
    const pair = [rawCarousel[i]]
    if (rawCarousel[i + 1]) {
      pair.push(rawCarousel[i + 1])
    } else if (rawCarousel.length > 1) {
      pair.push(rawCarousel[0]) // wrap to keep 2-by-2 layout balanced
    }
    pairs.push(pair)
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (pairs.length <= 1 || isPaused) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pairs.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [pairs.length, isPaused])

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

        {/* Right Column Images Section */}
        <div className="flex flex-col gap-3">
          {/* Top Image: Still & Static */}
          <div className="w-full rounded-[10px] overflow-hidden shadow-[0_20px_44px_rgba(76,21,96,0.22)] relative aspect-[16/10]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mainImage}
              alt="Faculty guiding a delegate during hands-on dissection"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Images: 2-by-2 Auto-Scroll Carousel */}
          <div
            className="relative group w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="overflow-hidden w-full rounded-[10px]">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {pairs.map((pair, slideIdx) => (
                  <div key={slideIdx} className="w-full shrink-0 grid grid-cols-2 gap-3">
                    {pair.map((item, itemIdx) => {
                      const src = item.image?.url || item.imageUrl || item
                      const alt = item.alt || 'Medical simulation model'

                      return (
                        <div
                          key={itemIdx}
                          className="rounded-[10px] overflow-hidden shadow-[0_20px_44px_rgba(76,21,96,0.22)] relative aspect-[4/3] bg-card flex items-center justify-center p-2 group/card"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={src}
                            alt={alt}
                            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-300 group-hover/card:scale-105"
                          />
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation Arrows (appear on hover) */}
            {pairs.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => (prev === 0 ? pairs.length - 1 : prev - 1))}
                  aria-label="Previous images"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-purple shadow-md flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                >
                  &#10094;
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentIndex((prev) => (prev + 1) % pairs.length)}
                  aria-label="Next images"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-purple shadow-md flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                >
                  &#10095;
                </button>

                {/* Dots Pagination */}
                <div className="flex justify-center gap-1.5 mt-2.5">
                  {pairs.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setCurrentIndex(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === dotIdx
                          ? 'w-6 bg-purple'
                          : 'w-2 bg-[#C9CDD3] hover:bg-purple/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
