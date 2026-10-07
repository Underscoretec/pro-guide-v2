'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

export interface ProductItem {
  id?: string
  name: string
  badge?: string
  image?: any
  imageUrl?: string
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

export const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter()
  const { addToCart } = useCart()

  const imgSrc =
    item.image?.url || item.imageUrl || (typeof item.image === 'string' ? item.image : '/images/prod1.jpg')
  const altText = item.name || 'ProGuide 3D Simulation Model'

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

  return (
    <div className="bg-white border border-line rounded-[8px] overflow-hidden flex flex-col h-full transition-all duration-[180ms] hover:shadow-[0_14px_30px_rgba(31,35,40,0.12)] hover:-translate-y-[3px] group">
      {/* Uniform card image container */}
      <div className="relative aspect-[16/10] bg-[#F8F9FA] overflow-hidden border-b border-line/60">
        <Image
          src={imgSrc}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Uniform card body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          {item.badge ? (
            <span className="text-[11px] font-extrabold tracking-[1.2px] uppercase text-orange block">
              {item.badge}
            </span>
          ) : (
            <span />
          )}
          <span className="text-[13px] font-semibold text-muted">
            {formattedPrice}
          </span>
        </div>

        <h3 className="text-[16.5px] font-bold text-ink leading-[1.35] mb-2">
          {item.name}
        </h3>

        <p className="text-[13.5px] text-muted leading-[1.6] flex-1 mb-3">
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
            className="flex-1 text-center bg-purple text-white px-3.5 py-[9px] rounded-[5px] font-bold text-[13px] border border-purple hover:bg-purple-d hover:border-purple-d transition-all shadow-sm cursor-pointer"
          >
            Buy
          </button>

          <Link
            href={item.secondaryButton?.link || `/contact?product=${encodeURIComponent(item.name)}`}
            className="flex-1 text-center bg-white text-ink px-3.5 py-[9px] rounded-[5px] font-bold text-[13px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all shadow-sm"
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
