import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface ProductItem {
  name: string
  badge?: string
  image?: any
  imageUrl?: string
  description?: string
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
  const imgSrc =
    item.image?.url || item.imageUrl || (typeof item.image === 'string' ? item.image : '/images/prod1.jpg')
  const altText = item.name || 'ProGuide 3D Simulation Model'

  const points: string[] =
    item.bulletPoints && item.bulletPoints.length > 0
      ? item.bulletPoints.map((p) => (typeof p === 'string' ? p : p.point))
      : []

  const primaryBtn = item.primaryButton || {
    text: 'Buy / Enquire',
    link: 'https://pro-guide.in/',
  }

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
        {item.badge && (
          <span className="text-[11px] font-extrabold tracking-[1.2px] uppercase text-orange mb-1.5 block">
            {item.badge}
          </span>
        )}

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

        {/* Pinned Bottom Buttons */}
        <div className="mt-auto pt-2 flex flex-wrap gap-2">
          {primaryBtn?.text && (
            <Link
              href={primaryBtn.link || 'https://pro-guide.in/'}
              target={primaryBtn.link?.startsWith('http') ? '_blank' : undefined}
              rel={primaryBtn.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex-1 min-w-[110px] text-center bg-purple text-white px-3.5 py-[9px] rounded-[5px] font-bold text-[12.5px] border border-purple hover:bg-purple-d hover:border-purple-d transition-all shadow-sm"
            >
              {primaryBtn.text}
            </Link>
          )}

          {item.secondaryButton?.text && (
            <Link
              href={item.secondaryButton.link || '/contact'}
              target={item.secondaryButton.link?.startsWith('http') ? '_blank' : undefined}
              rel={item.secondaryButton.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex-1 min-w-[110px] text-center bg-white text-ink px-3.5 py-[9px] rounded-[5px] font-bold text-[12.5px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all shadow-sm"
            >
              {item.secondaryButton.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
