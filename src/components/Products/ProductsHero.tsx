import React from 'react'
import Link from 'next/link'

interface ProductsHeroProps {
  data?: {
    crumbHomeText?: string
    crumbCurrentText?: string
    title?: string
    description?: string
  }
}

export const ProductsHero: React.FC<ProductsHeroProps> = ({ data }) => {
  const crumbHome = data?.crumbHomeText || 'Home'
  const crumbCurrent = data?.crumbCurrentText || 'Product Offerings'
  const title = data?.title || 'Product Offerings'
  const description =
    data?.description ||
    'The complete OSSA+ Simulations catalogue — ENT simulation models across otology, rhinology, laryngology and vestibular training, cast in OSSA+ Composite™ by OSSA PLUS SIMULATION LLP. Store items can be purchased right away; everything else is a quick enquiry away.'

  return (
    <div className="bg-gradient-to-r from-[#4A148C] to-[#673AB7] text-white py-11">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-[12.5px] text-[#D9BEE6] mb-2.5 font-medium">
          <Link href="/" className="text-white hover:underline">
            {crumbHome}
          </Link>{' '}
          / {crumbCurrent}
        </div>
        <h1 className="text-[clamp(26px,3.2vw,38px)] font-bold leading-tight">
          {title}
        </h1>
        <p className="text-[#E4D3EC] max-w-[820px] mt-2.5 text-[15.5px] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}

export default ProductsHero
