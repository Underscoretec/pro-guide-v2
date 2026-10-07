import React from 'react'
import { ProductCard, type ProductItem } from './ProductCard'

export interface ProductFamily {
  familyId?: string
  title: string
  subtitle?: string
  isAlt?: boolean
  items: ProductItem[]
}

interface ProductFamilySectionProps {
  family: ProductFamily
}

export const ProductFamilySection: React.FC<ProductFamilySectionProps> = ({
  family,
}) => {
  const isAlt = family.isAlt ?? false

  return (
    <section
      id={family.familyId}
      className={`py-[52px] ${
        isAlt ? 'bg-[#F8F8FA] border-t border-b border-line' : 'bg-white'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-[34px]">
          <h2 className="text-[clamp(23px,2.6vw,31px)] font-bold text-ink">
            {family.title}
          </h2>
          {family.subtitle && (
            <p className="text-muted mt-2 text-[15px]">{family.subtitle}</p>
          )}
          {/* ProGuide Signature Rule Divider */}
          <div className="w-16 h-1 bg-gradient-to-r from-purple from-55% to-orange rounded-sm mx-auto mt-3.5 relative after:content-[''] after:absolute after:-right-3 after:-top-0.5 after:w-2 after:h-2 after:rounded-full after:bg-orange" />
        </div>

        {/* Exactly 3 cards per line with identical card size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {family.items.map((item, idx) => (
            <ProductCard key={idx} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductFamilySection
