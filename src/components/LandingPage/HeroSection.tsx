'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

  const isInfinite = pairs.length > 1
  // Clone last slide at start and first slide at end for seamless infinite loop
  const extendedSlides = isInfinite
    ? [pairs[pairs.length - 1], ...pairs, pairs[0]]
    : pairs

  const [currentIndex, setCurrentIndex] = useState(isInfinite ? 1 : 0)
  const [withTransition, setWithTransition] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Auto-scroll forward continuously
  useEffect(() => {
    if (!isInfinite || isPaused || !withTransition) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      setCurrentIndex((prev) => prev + 1)
    }, 3500)

    return () => clearInterval(interval)
  }, [isInfinite, isPaused, withTransition])

  // Re-enable transition after instant position reset
  useEffect(() => {
    if (!withTransition) {
      const timer = setTimeout(() => {
        setWithTransition(true)
        setIsTransitioning(false)
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [withTransition])

  // Fallback safety timeout for transition lock
  useEffect(() => {
    if (isTransitioning) {
      const safety = setTimeout(() => {
        setIsTransitioning(false)
      }, 850)
      return () => clearTimeout(safety)
    }
  }, [isTransitioning])

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Only handle transforms on the carousel container itself (ignore child hover animations)
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    if (!isInfinite) return

    if (currentIndex >= pairs.length + 1) {
      // Reached clone of first slide -> seamlessly snap to real first slide (index 1)
      setWithTransition(false)
      setCurrentIndex(1)
    } else if (currentIndex <= 0) {
      // Reached clone of last slide -> seamlessly snap to real last slide
      setWithTransition(false)
      setCurrentIndex(pairs.length)
    } else {
      setIsTransitioning(false)
    }
  }

  const handleNext = () => {
    if (isTransitioning || !withTransition) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (isTransitioning || !withTransition) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev - 1)
  }

  const handleDotClick = (dotIdx: number) => {
    if (isTransitioning || !withTransition) return
    setIsTransitioning(true)
    setCurrentIndex(dotIdx + 1)
  }

  // Calculate active indicator dot
  const activeDotIndex = !isInfinite
    ? 0
    : currentIndex === 0
      ? pairs.length - 1
      : currentIndex >= pairs.length + 1
        ? 0
        : currentIndex - 1

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
            <Image
              src={mainImage}
              alt="Faculty guiding a delegate during hands-on dissection"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>

          {/* Bottom Images: 2-by-2 Infinite Forward Carousel */}
          <div
            className="relative group w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="overflow-hidden w-full rounded-[10px]">
              <div
                className={`flex ${withTransition ? 'transition-transform duration-700 ease-in-out' : ''}`}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedSlides.map((pair, slideIdx) => (
                  <div key={slideIdx} className="w-full shrink-0 grid grid-cols-2 gap-3">
                    {pair.map((item: any, itemIdx: number) => {
                      const src = item.image?.url || item.imageUrl || item
                      const alt = item.alt || 'Medical simulation model'

                      return (
                        <div
                          key={itemIdx}
                          className="rounded-[10px] overflow-hidden shadow-[0_20px_44px_rgba(76,21,96,0.22)] relative aspect-[3/4] bg-white group/card"
                        >
                          <Image
                            src={src}
                            alt={alt}
                            fill
                            sizes="(max-width: 1024px) 50vw, 25vw"
                            className="object-contain transition-transform duration-300 group-hover/card:scale-105"
                          />
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation Arrows (appear on hover) */}
            {isInfinite && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous images"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-purple shadow-md flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                >
                  &#10094;
                </button>

                <button
                  type="button"
                  onClick={handleNext}
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
                      onClick={() => handleDotClick(dotIdx)}
                      aria-label={`Go to slide ${dotIdx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeDotIndex === dotIdx
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
