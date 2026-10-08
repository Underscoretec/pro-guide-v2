'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'

interface ProductOfferingsProps {
  data?: any
  products?: any[]
}

const productGalleries: Record<string, string[]> = {
  tb: [
    '/images/prod1.jpg',
    '/images/detail_middleear.jpg',
    '/images/detail_sigmoid.jpg',
    '/images/detail_macro.jpg',
  ],
  pnsb: [
    '/images/prod2.jpg',
    '/images/detail_nose.jpg',
    '/images/prod3.jpg',
  ],
  pns: [
    '/images/prod3.jpg',
    '/images/detail_nose.jpg',
    '/images/prod2.jpg',
  ],
  larynx: [
    '/images/prod4.jpg',
    '/images/detail_larynxtop.jpg',
    '/images/prod1.jpg',
  ],
}

interface ProductImageSliderProps {
  images: string[]
  alt: string
  detailsHref: string
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ images, alt, detailsHref }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 1200)

    return () => clearInterval(interval)
  }, [isHovered, images.length])

  return (
    <Link
      href={detailsHref}
      className="relative bg-card aspect-[4/2.9] flex items-center justify-center overflow-hidden block group/slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setCurrentIndex(0)
      }}
    >
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={src}
          alt={`${alt} view ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-opacity duration-500 ease-in-out ${
            i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        />
      ))}

      {/* Slide indicator pills on hover */}
      {images.length > 1 && (
        <div
          className={`absolute bottom-2.5 left-0 right-0 z-20 flex justify-center items-center gap-1.5 transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {images.map((_, i) => (
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
  )
}

const defaultProducts = [
  {
    title: '3D Temporal Bone',
    slug: 'tb',
    imageUrl: '/images/prod1.jpg',
    images: productGalleries.tb,
    alt: '3D Temporal Bone',
    variant: 'Available in Left and Right variant',
    price: 'Rs 20,000',
    gstNote: '+ 18% GST',
    cartUrl: 'https://pro-guide.in/',
    detailsUrl: '/products/tb',
  },
  {
    title: 'Paranasal Model with Bassettes',
    slug: 'pnsb',
    imageUrl: '/images/prod2.jpg',
    images: productGalleries.pnsb,
    alt: 'Paranasal Model with Bassettes',
    variant: 'Available in Left and Right variant',
    price: 'Rs 25,000',
    gstNote: '+ 18% GST',
    cartUrl: 'https://pro-guide.in/',
    detailsUrl: '/products/pnsb',
  },
  {
    title: 'Paranasal Model without base',
    slug: 'pns',
    imageUrl: '/images/prod3.jpg',
    images: productGalleries.pnsb,
    alt: 'Paranasal Model without base',
    variant: 'Available in Left and Right variant',
    price: 'Rs 20,000',
    gstNote: '+ 18% GST',
    cartUrl: 'https://pro-guide.in/',
    detailsUrl: '/products/pns',
  },
  {
    title: 'Larynx Model',
    slug: 'larynx',
    imageUrl: '/images/prod4.jpg',
    images: productGalleries.larynx,
    alt: 'Larynx Model',
    variant: 'Available in Left and Right variant',
    price: 'Rs 20,000',
    gstNote: '+ 18% GST',
    cartUrl: 'https://pro-guide.in/',
    detailsUrl: '/products/larynx',
  },
]

export const ProductOfferingsSection: React.FC<ProductOfferingsProps> = ({ data, products }) => {
  const router = useRouter()
  const { addToCart } = useCart()

  const title = data?.title || 'Product Offerings'
  const rawList =
    Array.isArray(products) && products.length > 0
      ? products
      : Array.isArray(data?.productsList) && data.productsList.length > 0
      ? data.productsList
      : []
  const productList = rawList.length > 0 ? rawList : defaultProducts

  const handleAddToCart = (e: React.MouseEvent, prod: any, imageSrc: string) => {
    e.preventDefault()
    const priceNum =
      typeof prod.price === 'string'
        ? parseInt(prod.price.replace(/[^0-9]/g, ''), 10) || 20000
        : typeof prod.price === 'number'
        ? prod.price
        : 20000

    addToCart({
      id: prod.slug || (prod.title || prod.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: prod.title || prod.name,
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
            const detailsHref =
              prod.detailsUrl || (prod.slug ? `/products/${prod.slug}` : '/products')
            const key = prod.id || prod.slug || idx

            // Resolve multiple images for slider
            const customImages = Array.isArray(prod.images)
              ? prod.images
                  .map((img: any) =>
                    typeof img === 'string'
                      ? img
                      : img?.image?.url || img?.imageUrl || img?.url || ''
                  )
                  .filter(Boolean)
              : []

            const isCustomUpload =
              (prod.image && typeof prod.image === 'object' && Boolean(prod.image.url)) ||
              (typeof prod.imageUrl === 'string' &&
                prod.imageUrl.trim() !== '' &&
                !prod.imageUrl.startsWith('/images/prod') &&
                !prod.imageUrl.startsWith('/images/detail_'))

            let images: string[] = []
            if (customImages.length === 1) {
              // Exactly 1 image uploaded in gallery: DO NOT auto-slide
              images = customImages
            } else if (customImages.length > 1) {
              // Multiple images uploaded in gallery: auto-slide
              images = customImages
            } else if (isCustomUpload || prod.image) {
              // Single main image uploaded: DO NOT auto-slide
              images = [imageSrc]
            } else {
              // Default demo fallback for unmodified static catalog cards
              const slugKey = (prod.slug || '').toLowerCase()
              const galleryFromSlug = productGalleries[slugKey] || []
              images = galleryFromSlug.length > 0 ? galleryFromSlug : [imageSrc]
            }

            return (
              <div
                key={key}
                className="bg-white border border-line rounded-[8px] overflow-hidden flex flex-col transition-all duration-[180ms] hover:shadow-[0_14px_30px_rgba(31,35,40,0.12)] hover:-translate-y-[3px]"
              >
                {/* Product Image Hover Slider */}
                <ProductImageSlider
                  images={images}
                  alt={prod.alt || prod.title || prod.name || 'ProGuide Model'}
                  detailsHref={detailsHref}
                />

                {/* Product Body */}
                <div className="p-[14px_16px_16px] flex flex-col gap-1 flex-1">
                  <h3 className="text-[16.5px] font-bold text-ink leading-snug">
                    <Link href={detailsHref} className="text-inherit hover:text-purple">
                      {prod.title || prod.name}
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
                    <Link
                      href={detailsHref}
                      className="flex-1 py-[9px] px-2 text-[12.5px] font-bold text-center bg-white text-ink rounded-[5px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all"
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, prod, imageSrc)}
                      className="flex-1 py-[9px] px-2 text-[12.5px] font-bold text-center bg-purple text-white rounded-[5px] border border-purple hover:bg-purple-d hover:border-purple-d transition-all cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View Cart & All Products CTA */}
        <p className="text-center mt-[22px] flex items-center justify-center gap-3">
          <Link
            href="/products"
            className="inline-block bg-white text-ink px-5 py-[10px] rounded-[5px] font-bold text-[13.5px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all shadow-sm"
          >
            All Products &rarr;
          </Link>
          <Link
            href="/cart"
            className="inline-block bg-purple text-white px-5 py-[10px] rounded-[5px] font-bold text-[13.5px] border border-purple hover:bg-purple-d transition-all shadow-sm"
          >
            View Cart &rarr;
          </Link>
        </p>
      </div>
    </section>
  )
}

export default ProductOfferingsSection
