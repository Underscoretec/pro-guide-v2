'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

interface ProductOfferingsProps {
  data?: any
  products?: any[]
}

const defaultProducts = [
  {
    title: '3D Temporal Bone',
    slug: 'tb',
    imageUrl: '/images/prod1.jpg',
    alt: '3D Temporal Bone',
    variant: 'Available in Left and Right variant',
    price: 'Rs 20,000',
    gstNote: '+ 18% GST',
    cartUrl: 'https://pro-guide.in/',
    detailsUrl: '/product.html?p=tb',
  },
  {
    title: 'Paranasal Model with Bassettes',
    slug: 'pnsb',
    imageUrl: '/images/prod2.jpg',
    alt: 'Paranasal Model with Bassettes',
    variant: 'Available in Left and Right variant',
    price: 'Rs 25,000',
    gstNote: '+ 18% GST',
    cartUrl: 'https://pro-guide.in/',
    detailsUrl: '/product.html?p=pnsb',
  },
  {
    title: 'Paranasal Model without base',
    slug: 'pns',
    imageUrl: '/images/prod3.jpg',
    alt: 'Paranasal Model without base',
    variant: 'Available in Left and Right variant',
    price: 'Rs 20,000',
    gstNote: '+ 18% GST',
    cartUrl: 'https://pro-guide.in/',
    detailsUrl: '/product.html?p=pns',
  },
  {
    title: 'Larynx Model',
    slug: 'larynx',
    imageUrl: '/images/prod4.jpg',
    alt: 'Larynx Model',
    variant: 'Available in Left and Right variant',
    price: 'Rs 20,000',
    gstNote: '+ 18% GST',
    cartUrl: 'https://pro-guide.in/',
    detailsUrl: '/product.html?p=larynx',
  },
]

export const ProductOfferingsSection: React.FC<ProductOfferingsProps> = ({ data, products }) => {
  const router = useRouter()
  const { addToCart } = useCart()

  const title = data?.title || 'Product Offerings'
  const rawList = data?.productsList || products || []
  const productList = rawList.length > 0 ? rawList : defaultProducts

  const handleAddToCart = (e: React.MouseEvent, prod: any, imageSrc: string) => {
    e.preventDefault()
    const priceNum = typeof prod.price === 'string'
      ? parseInt(prod.price.replace(/[^0-9]/g, ''), 10) || 20000
      : 20000

    addToCart({
      id: prod.slug || prod.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: prod.title,
      price: priceNum,
      imageUrl: imageSrc,
      quantity: 1,
    })
    router.push('/cart')
  }

  return (
    <section id="products" className="py-[52px] bg-[#F8F8FA] border-t border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Heading */}
        <div className="sechead">
          <h2 className="font-bold text-ink">{title}</h2>
          <div className="rule" />
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {productList.map((prod: any, idx: number) => {
            const mediaImage = typeof prod.image === 'object' && prod.image ? prod.image.url : null
            const imageSrc = mediaImage || prod.imageUrl || '/images/prod1.jpg'
            const detailsHref = prod.detailsUrl || `/product.html?p=${prod.slug || ''}`
            const key = prod.id || prod.slug || idx

            return (
              <div
                key={key}
                className="bg-white border border-line rounded-[8px] overflow-hidden flex flex-col transition-all duration-[180ms] hover:shadow-[0_14px_30px_rgba(31,35,40,0.12)] hover:-translate-y-[3px]"
              >
                {/* Product Image */}
                <Link
                  href={detailsHref}
                  className="bg-card aspect-[4/2.9] flex items-center justify-center overflow-hidden"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={prod.alt || prod.title}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </Link>

                {/* Product Body */}
                <div className="p-[14px_16px_16px] flex flex-col gap-1 flex-1">
                  <h3 className="text-[16.5px] font-bold text-ink leading-snug">
                    <Link href={detailsHref} className="text-inherit hover:text-purple">
                      {prod.title}
                    </Link>
                  </h3>
                  <div className="text-[12.5px] text-muted">{prod.variant}</div>
                  <div className="font-extrabold text-[16px] text-ink mt-1">
                    {prod.price}{' '}
                    {prod.gstNote && (
                      <small className="font-semibold text-muted text-[11.5px]">{prod.gstNote}</small>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-3 pt-1">
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, prod, imageSrc)}
                      className="flex-1 py-[9px] px-2 text-[12.5px] font-bold text-center bg-purple text-white rounded-[5px] border border-purple hover:bg-purple-d hover:border-purple-d transition-all cursor-pointer"
                    >
                      Add to Cart
                    </button>
                    <Link
                      href="/products"
                      className="flex-1 py-[9px] px-2 text-[12.5px] font-bold text-center bg-white text-ink rounded-[5px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View Cart & All Products CTA */}
        <p className="text-center mt-[22px] flex items-center justify-center gap-3">
          <Link
            href="/cart"
            className="inline-block bg-purple text-white px-5 py-[10px] rounded-[5px] font-bold text-[13.5px] border border-purple hover:bg-purple-d transition-all shadow-sm"
          >
            View Cart &rarr;
          </Link>
          <Link
            href="/products"
            className="inline-block bg-white text-ink px-5 py-[10px] rounded-[5px] font-bold text-[13.5px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all shadow-sm"
          >
            All Products &rarr;
          </Link>
        </p>
      </div>
    </section>
  )
}

export default ProductOfferingsSection
