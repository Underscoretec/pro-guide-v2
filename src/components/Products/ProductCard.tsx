'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export interface ProductItem {
  id?: string
  name: string
  badge?: string
  image?: any
  imageUrl?: string
  images?: (string | { image?: any; imageUrl?: string; url?: string })[]
  description?: string
  price?: number
  bulletPoints?: (string | { point: string })[]
  primaryButton?: {
    text?: string
    link?: string
  }
  secondaryButton?: {
    text?: string
    link?: string
  }
}

interface ProductCardProps {
  item: ProductItem
}

const nameOrUrlGalleries: Record<string, string[]> = {
  '/images/prod1.jpg': [
    '/images/prod1.jpg',
    '/images/detail_middleear.jpg',
    '/images/detail_sigmoid.jpg',
    '/images/detail_macro.jpg',
  ],
  '/images/detail_sigmoid.jpg': [
    '/images/detail_sigmoid.jpg',
    '/images/prod1.jpg',
    '/images/detail_middleear.jpg',
    '/images/detail_macro.jpg',
  ],
  '/images/detail_macro.jpg': [
    '/images/detail_macro.jpg',
    '/images/detail_sigmoid.jpg',
    '/images/prod1.jpg',
    '/images/detail_middleear.jpg',
  ],
  '/images/detail_middleear.jpg': [
    '/images/detail_middleear.jpg',
    '/images/prod1.jpg',
    '/images/detail_sigmoid.jpg',
  ],
  '/images/prod2.jpg': [
    '/images/prod2.jpg',
    '/images/detail_nose.jpg',
    '/images/prod3.jpg',
  ],
  '/images/prod3.jpg': [
    '/images/prod3.jpg',
    '/images/detail_nose.jpg',
    '/images/prod2.jpg',
  ],
  '/images/detail_nose.jpg': [
    '/images/detail_nose.jpg',
    '/images/prod2.jpg',
    '/images/prod3.jpg',
  ],
  '/images/prod4.jpg': [
    '/images/prod4.jpg',
    '/images/detail_larynxtop.jpg',
    '/images/prod1.jpg',
  ],
  '/images/detail_ear.jpg': [
    '/images/detail_ear.jpg',
    '/images/detail_middleear.jpg',
    '/images/detail_macro.jpg',
  ],
  '/images/detail_larynxtop.jpg': [
    '/images/detail_larynxtop.jpg',
    '/images/prod4.jpg',
    '/images/prod1.jpg',
  ],
}

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter()
  const { addToCart } = useCart()

  const firstGalleryImage =
    Array.isArray(item.images) && item.images.length > 0
      ? (typeof item.images[0] === 'string'
          ? item.images[0]
          : item.images[0]?.image?.url || item.images[0]?.imageUrl || item.images[0]?.url)
      : null

  const imgSrc =
    item.image?.url ||
    item.imageUrl ||
    firstGalleryImage ||
    (typeof item.image === 'string' ? item.image : '/images/prod1.jpg')
  const altText = item.name || 'ProGuide 3D Simulation Model'

  // Resolve multiple images for hover slider
  const resolveImages = (): string[] => {
    // 1. If images array is provided in Payload
    if (Array.isArray(item.images)) {
      const customImages = item.images
        .map((img: any) =>
          typeof img === 'string'
            ? img
            : img?.image?.url || img?.imageUrl || img?.url || ''
        )
        .filter(Boolean)

      // If user uploaded exactly 1 image: DO NOT auto-slide, show only that 1 image
      if (customImages.length === 1) {
        return customImages
      }
      // If user uploaded multiple images: auto-slide between them
      if (customImages.length > 1) {
        return customImages
      }
    }

    // 2. If user uploaded a single image via media upload or custom URL (and no multiple images):
    // DO NOT auto-slide, show only that single image
    const hasCustomUpload =
      (item.image && typeof item.image === 'object' && Boolean(item.image.url)) ||
      (typeof item.imageUrl === 'string' &&
        item.imageUrl.trim() !== '' &&
        !item.imageUrl.startsWith('/images/prod') &&
        !item.imageUrl.startsWith('/images/detail_'))

    if (hasCustomUpload || (item.image && typeof item.image === 'object')) {
      return [imgSrc]
    }

    // 3. Fallback for static default catalog demo items (only when no custom image was uploaded)
    if (nameOrUrlGalleries[imgSrc]) {
      return nameOrUrlGalleries[imgSrc]
    }

    const lowerName = (item.name || '').toLowerCase()
    if (
      lowerName.includes('temporal') ||
      lowerName.includes('mastoid') ||
      lowerName.includes('cochlear') ||
      lowerName.includes('ear')
    ) {
      return [imgSrc, '/images/detail_middleear.jpg', '/images/detail_sigmoid.jpg', '/images/detail_macro.jpg']
    }
    if (
      lowerName.includes('paranasal') ||
      lowerName.includes('sinus') ||
      lowerName.includes('pns') ||
      lowerName.includes('sinuplasty')
    ) {
      return [imgSrc, '/images/detail_nose.jpg', '/images/prod2.jpg', '/images/prod3.jpg']
    }
    if (lowerName.includes('larynx') || lowerName.includes('airway')) {
      return [imgSrc, '/images/detail_larynxtop.jpg', '/images/prod4.jpg']
    }

    return [imgSrc]
  }

  const cardImages = resolveImages()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered || cardImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cardImages.length)
    }, 1200)

    return () => clearInterval(interval)
  }, [isHovered, cardImages.length])

  const points: string[] =
    item.bulletPoints && item.bulletPoints.length > 0
      ? item.bulletPoints.map((p) => (typeof p === 'string' ? p : p.point))
      : []

  const price = typeof item.price === 'number' && !isNaN(item.price) ? item.price : 20000

  const handleBuy = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: item.id || item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      name: item.name,
      price,
      imageUrl: imgSrc,
      quantity: 1,
    })
    router.push('/cart')
  }

  const formattedPrice = `Rs ${price.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  const productSlug =
    item.id ||
    item.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

  return (
    <div className="bg-white border border-line rounded-[8px] overflow-hidden flex flex-col h-full transition-all duration-[180ms] hover:shadow-[0_14px_30px_rgba(31,35,40,0.12)] hover:-translate-y-[3px] group">
      {/* Uniform card image container with hover auto-slide */}
      <Link
        href={`/products/${productSlug}`}
        className="relative aspect-[16/10] bg-[#F8F9FA] overflow-hidden border-b border-line/60 select-none group/img block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setCurrentIndex(0)
        }}
      >
        {cardImages.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt={`${altText} view ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-contain p-2 mix-blend-multiply transition-opacity duration-500 ease-in-out ${
              i === currentIndex
                ? 'opacity-100 z-10'
                : 'opacity-0 z-0 pointer-events-none'
            }`}
          />
        ))}

        {/* Slide Indicator Pills on hover */}
        {cardImages.length > 1 && (
          <div
            className={`absolute bottom-2 left-0 right-0 z-20 flex justify-center items-center gap-1.5 transition-opacity duration-300 pointer-events-none ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {cardImages.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 shadow-xs ${
                  i === currentIndex ? 'w-4 bg-orange' : 'w-1.5 bg-[#9CA3AF]/60'
                }`}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Uniform card body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          {item.badge ? (
            <span className="text-[10.5px] font-extrabold tracking-[1.1px] uppercase text-orange block truncate">
              {item.badge}
            </span>
          ) : (
            <span />
          )}
          <span className="text-[12.5px] font-semibold text-muted whitespace-nowrap">
            {formattedPrice}
          </span>
        </div>

        <Link href={`/products/${productSlug}`}>
          <h3 className="text-[15.5px] sm:text-[16px] font-bold text-ink hover:text-purple transition-colors leading-[1.35] mb-2">
            {item.name}
          </h3>
        </Link>

        <p className="text-[13px] text-muted leading-[1.55] flex-1 mb-3">
          {item.description}
        </p>

        {/* Optional Accordion Details (e.g. for Task-Based Trainers) */}
        {points.length > 0 && (
          <div className="mb-4 pt-2.5 border-t border-dashed border-line">
            <details className="text-[13px] text-ink">
              <summary className="cursor-pointer font-bold text-purple hover:text-purple-d select-none">
                The four trainers +
              </summary>
              <ul className="mt-2 space-y-1 pl-4 list-disc text-muted text-[12.5px]">
                {points.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </details>
          </div>
        )}

        {/* Pinned Bottom Buttons: Buy and Enquire */}
        <div className="mt-auto pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={handleBuy}
            className="flex-1 text-center bg-purple text-white px-2.5 sm:px-3.5 py-[9px] rounded-[5px] font-bold text-[12.5px] sm:text-[13px] border border-purple hover:bg-purple-d hover:border-purple-d transition-all shadow-sm cursor-pointer"
          >
            {item.primaryButton?.text || 'Buy'}
          </button>

          <Link
            href={item.secondaryButton?.link || `/contact?product=${encodeURIComponent(item.name)}`}
            className="flex-1 text-center bg-white text-ink px-2.5 sm:px-3.5 py-[9px] rounded-[5px] font-bold text-[12.5px] sm:text-[13px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all shadow-sm"
          >
            {item.secondaryButton?.text || 'Enquire'}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
