'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useCart } from '@/context/CartContext'
import type { ProductDetailData } from '@/lib/products'

interface ProductDetailsViewProps {
  product: ProductDetailData
}

export const ProductDetailsView: React.FC<ProductDetailsViewProps> = ({ product }) => {
  const router = useRouter()
  const { items, addToCart, updateQuantity, isHydrated } = useCart()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'description' | 'additional'>('description')
  const [isWishlisted, setIsWishlisted] = useState(false)

  const galleryImages =
    product.images && product.images.length > 0
      ? product.images
      : product.imageUrl
      ? [product.imageUrl]
      : ['/images/prod1.jpg']

  const productId =
    product.id ||
    product.slug ||
    product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const cartItem = items.find(
    (item) =>
      item.id === productId ||
      item.id === product.id ||
      item.id === product.slug ||
      item.name.toLowerCase() === product.name.toLowerCase()
  )

  const isInCart = isHydrated && Boolean(cartItem)
  const currentQuantity = cartItem?.quantity || 1

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: product.name,
      price: product.price,
      imageUrl: galleryImages[0] || product.imageUrl,
      quantity: 1,
    })
    toast.success(`Added "${product.name}" to cart!`)
  }

  const handleIncrement = () => {
    if (cartItem) {
      updateQuantity(cartItem.id, 1)
    }
  }

  const handleDecrement = () => {
    if (cartItem && currentQuantity > 1) {
      updateQuantity(cartItem.id, -1)
    }
  }

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted)
    if (!isWishlisted) {
      toast.info(`Added "${product.name}" to your wishlist`)
    } else {
      toast.info(`Removed "${product.name}" from your wishlist`)
    }
  }

  const handleShare = async () => {
    try {
      if (typeof window !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Product link copied to clipboard!')
      } else {
        toast.info(window.location.href)
      }
    } catch {
      toast.info('Link ready to share')
    }
  }

  return (
    <div className="bg-white text-[#1F2328] py-8 sm:py-12">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        {/* Breadcrumbs */}
        <nav className="text-[11px] uppercase tracking-[1.4px] font-semibold text-[#8C929C] mb-8 select-none">
          <Link href="/" className="hover:text-ink transition-colors">
            HOME
          </Link>
          <span className="mx-2 text-[#C9CDD3]">/</span>
          <Link href="/products" className="hover:text-ink transition-colors">
            THE SHOP
          </Link>
        </nav>

        {/* Main Product Showcase Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Gallery (Thumbnails + Big Display Image) */}
          <div className="lg:col-span-7 flex flex-row gap-3 sm:gap-4 items-start">
            {/* 4 Thumbnails Stack (replacing placeholders with real images) */}
            <div className="flex flex-col gap-3 w-16 sm:w-20 shrink-0">
              {galleryImages.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  onMouseEnter={() => setSelectedImageIndex(idx)}
                  className={`aspect-square w-full rounded-[3px] border overflow-hidden p-1 transition-all bg-[#F8F9FA] flex items-center justify-center cursor-pointer ${
                    idx === selectedImageIndex
                      ? 'border-[#1F2328] ring-1 ring-[#1F2328]'
                      : 'border-[#E5E7EB] hover:border-[#9CA3AF]'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </button>
              ))}
            </div>

            {/* Main Featured Image Box */}
            <div className="flex-1 aspect-square bg-[#F3F4F6] rounded-[3px] p-6 sm:p-12 flex items-center justify-center relative overflow-hidden select-none group/mainimg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={galleryImages[selectedImageIndex] || galleryImages[0]}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply max-h-[460px] transition-all duration-300"
              />

              {/* Prev / Next Slide Arrows (when multiple images exist) */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === 0 ? galleryImages.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-ink shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
                    aria-label="Previous image"
                  >
                    &#10094;
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImageIndex((prev) =>
                        prev === galleryImages.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-ink shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
                    aria-label="Next image"
                  >
                    &#10095;
                  </button>

                  {/* Slide Indicator Dots */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center items-center gap-1.5">
                    {galleryImages.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedImageIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === selectedImageIndex ? 'w-5 bg-orange' : 'w-1.5 bg-[#9CA3AF]/60'
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Product Summary & Actions */}
          <div className="lg:col-span-5 flex flex-col pt-1 sm:pt-2">
            <h1 className="text-[26px] sm:text-[30px] font-semibold text-[#1F2328] leading-[1.25]">
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="flex items-center gap-2.5 mt-3 mb-4">
              <span className="text-[20px] sm:text-[22px] font-bold text-[#1F2328]">
                Rs {product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-[#7B1FA2] text-[12.5px] font-semibold">
                + 18% GST
              </span>
            </div>

            {/* Short Description */}
            <p className="text-[13px] text-[#6B7280] leading-[1.65] mb-7">
              {product.shortDescription}
            </p>

            {/* Quantity Selector or Add to Cart Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-7">
              {isInCart && cartItem ? (
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {/* Quantity Stepper (Increase / Decrease) */}
                  <div className="flex items-center border border-[#E5E7EB] rounded-[3px] h-[44px] bg-white">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      disabled={currentQuantity <= 1}
                      className={`w-9 h-full flex items-center justify-center text-lg font-bold select-none transition-colors ${
                        currentQuantity <= 1
                          ? 'text-[#D1D5DB] cursor-not-allowed opacity-40'
                          : 'text-[#6B7280] hover:text-[#1F2328] cursor-pointer'
                      }`}
                      aria-label="Decrease quantity"
                    >
                      &minus;
                    </button>
                    <span className="w-10 text-center text-[14px] font-semibold text-[#1F2328] select-none">
                      {currentQuantity}
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="w-9 h-full flex items-center justify-center text-[#6B7280] hover:text-[#1F2328] text-lg font-bold select-none cursor-pointer transition-colors"
                      aria-label="Increase quantity"
                    >
                      &#43;
                    </button>
                  </div>

                  {/* View Cart button */}
                  <Link
                    href="/cart"
                    className="bg-[#5B1073] hover:bg-[#480c5c] text-white font-bold text-[12px] uppercase tracking-[1.4px] px-7 h-[44px] rounded-[3px] transition-colors shadow-xs flex items-center justify-center cursor-pointer min-w-[140px]"
                  >
                    VIEW CART
                  </Link>
                </div>
              ) : (
                /* Add to Cart button when not yet in cart */
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="bg-[#5B1073] hover:bg-[#480c5c] text-white font-bold text-[12px] uppercase tracking-[1.4px] px-8 h-[44px] rounded-[3px] transition-colors shadow-xs flex items-center justify-center cursor-pointer min-w-[180px] sm:min-w-[200px]"
                >
                  ADD TO CART
                </button>
              )}
            </div>

            {/* Actions: Add to Wishlist & Share */}
            <div className="flex items-center gap-7 mb-7 text-[11.5px] font-bold tracking-[1.2px] text-[#1F2328] uppercase select-none">
              <button
                type="button"
                onClick={handleAddToWishlist}
                className={`flex items-center gap-2 cursor-pointer transition-colors ${
                  isWishlisted ? 'text-[#5B1073]' : 'hover:text-[#5B1073]'
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill={isWishlisted ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                {isWishlisted ? 'WISHLISTED' : 'ADD TO WISHLIST'}
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-[#5B1073] transition-colors cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                SHARE
              </button>
            </div>

            {/* Meta Information */}
            <div className="pt-6 border-t border-[#F0F2F5] flex flex-col gap-1.5 text-[11px] text-[#6B7280]">
              <div>
                <span className="font-bold text-[#1F2328] uppercase tracking-wider">
                  SKU:
                </span>{' '}
                <span>{product.sku || 'N/A'}</span>
              </div>
              <div>
                <span className="font-bold text-[#1F2328] uppercase tracking-wider">
                  CATEGORIES:
                </span>{' '}
                <span className="text-[#6B7280]">
                  {product.category || product.name}
                </span>
              </div>
              <div>
                <span className="font-bold text-[#1F2328] uppercase tracking-wider">
                  TAGS:
                </span>{' '}
                <span className="text-[#6B7280]">
                  {product.tags && product.tags.length > 0
                    ? product.tags.join(', ')
                    : 'simulation, 3d model, surgery, ent'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation Section */}
        <div className="mt-16 sm:mt-20 border-b border-[#E5E7EB]">
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-[12.5px] font-bold tracking-[1.4px] uppercase transition-colors relative cursor-pointer ${
                activeTab === 'description'
                  ? 'text-[#1F2328] border-b-2 border-[#1F2328] -mb-[1px]'
                  : 'text-[#9CA3AF] hover:text-[#1F2328]'
              }`}
            >
              DESCRIPTION
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('additional')}
              className={`pb-3 text-[12.5px] font-bold tracking-[1.4px] uppercase transition-colors relative cursor-pointer ${
                activeTab === 'additional'
                  ? 'text-[#1F2328] border-b-2 border-[#1F2328] -mb-[1px]'
                  : 'text-[#9CA3AF] hover:text-[#1F2328]'
              }`}
            >
              ADDITIONAL INFORMATION
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto">
          {activeTab === 'description' ? (
            <div>
              <h2 className="text-[15.5px] font-bold text-[#1F2328] mb-3">
                {product.detailHeading || product.name}
              </h2>
              <p className="text-[13px] text-[#6B7280] leading-[1.75] mb-4">
                {product.detailParagraph1 ||
                  product.shortDescription ||
                  'Engineered for comprehensive hands-on surgical simulation workshops with life-like tactile and visual feedback.'}
              </p>
              {product.detailParagraph2 && (
                <p className="text-[13px] text-[#6B7280] leading-[1.75] mb-8">
                  {product.detailParagraph2}
                </p>
              )}

              {/* Two Column Feature Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                {/* Left Column: Why choose product */}
                <div>
                  <h3 className="text-[14px] font-bold text-[#1F2328] mb-3">
                    Why choose product?
                  </h3>
                  <ul className="space-y-2 text-[12.5px] text-[#6B7280]">
                    {(
                      product.whyChoose && product.whyChoose.length > 0
                        ? product.whyChoose
                        : [
                            'Cast in authentic OSSA+ Composite™ replicating human bone tactile feedback',
                            'Anatomically validated landmarks by senior otolaryngologists',
                            'Clean, repeatable surgical workstation training eliminating cadaveric hazards',
                          ]
                    ).map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#9CA3AF] text-[13px] select-none leading-tight font-serif">
                          &#9675;
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Key Highlights List */}
                <div>
                  <h3 className="text-[14px] font-bold text-[#1F2328] mb-3">
                    Key Highlights
                  </h3>
                  <ol className="space-y-2 text-[12.5px] text-[#6B7280]">
                    {(
                      product.sampleList && product.sampleList.length > 0
                        ? product.sampleList
                        : [
                            'Standardized anatomical fidelity for surgical training and fellowship exams',
                            'Compatible with standard surgical instrumentation and drills',
                            'Modular consumables for cost-effective repeated workshops',
                          ]
                    ).map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-semibold text-[#1F2328] w-3 shrink-0">
                          {i + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Lining / Material Note */}
              <div className="mt-8 pt-2">
                <h3 className="text-[14px] font-bold text-[#1F2328] mb-1.5">
                  Material & Composition
                </h3>
                <p className="text-[12.5px] text-[#6B7280]">
                  {product.lining ||
                    'OSSA+ Composite™ Mineralized Bone Matrix & Surgical Grade Polymers.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto">
              <table className="w-full text-[13px] border border-[#E5E7EB] rounded-[4px] overflow-hidden">
                <tbody>
                  <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                    <td className="px-4 py-3 font-semibold text-[#1F2328] w-1/3">
                      Weight
                    </td>
                    <td className="px-4 py-3 text-[#6B7280]">
                      {product.specifications?.weight || '350 g'}
                    </td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="px-4 py-3 font-semibold text-[#1F2328]">
                      Dimensions
                    </td>
                    <td className="px-4 py-3 text-[#6B7280]">
                      {product.specifications?.dimensions || '14 × 12 × 10 cm'}
                    </td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                    <td className="px-4 py-3 font-semibold text-[#1F2328]">
                      Material
                    </td>
                    <td className="px-4 py-3 text-[#6B7280]">
                      {product.specifications?.material ||
                        'OSSA+ Composite™ bone matrix & soft silicone'}
                    </td>
                  </tr>
                  <tr className="border-b border-[#E5E7EB]">
                    <td className="px-4 py-3 font-semibold text-[#1F2328]">
                      Variant
                    </td>
                    <td className="px-4 py-3 text-[#6B7280]">
                      {product.variant || 'Available in Left and Right variant'}
                    </td>
                  </tr>
                  <tr className="bg-[#F9FAFB]">
                    <td className="px-4 py-3 font-semibold text-[#1F2328]">
                      Origin
                    </td>
                    <td className="px-4 py-3 text-[#6B7280]">
                      OSSA PLUS SIMULATION LLP (India)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsView
