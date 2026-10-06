import React from 'react'
import Link from 'next/link'

interface Product {
  id: string
  title: string
  image: string
  alt: string
  variant: string
  price: string
  detailsUrl: string
}

const products: Product[] = [
  {
    id: 'tb',
    title: '3D Temporal Bone',
    image: '/images/prod1.jpg',
    alt: '3D Temporal Bone',
    variant: 'Available in Left and Right variant',
    price: 'Rs 20,000',
    detailsUrl: '/product.html?p=tb',
  },
  {
    id: 'pnsb',
    title: 'Paranasal Model with Bassettes',
    image: '/images/prod2.jpg',
    alt: 'Paranasal Model with Bassettes',
    variant: 'Available in Left and Right variant',
    price: 'Rs 25,000',
    detailsUrl: '/product.html?p=pnsb',
  },
  {
    id: 'pns',
    title: 'Paranasal Model without base',
    image: '/images/prod3.jpg',
    alt: 'Paranasal Model without base',
    variant: 'Available in Left and Right variant',
    price: 'Rs 20,000',
    detailsUrl: '/product.html?p=pns',
  },
  {
    id: 'larynx',
    title: 'Larynx Model',
    image: '/images/prod4.jpg',
    alt: 'Larynx Model',
    variant: 'Available in Left and Right variant',
    price: 'Rs 20,000',
    detailsUrl: '/product.html?p=larynx',
  },
]

export const ProductOfferingsSection: React.FC = () => {
  return (
    <section id="products" className="py-[52px] bg-[#F8F8FA] border-t border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Heading */}
        <div className="sechead">
          <h2 className="font-bold text-ink">Product Offerings</h2>
          <div className="rule" />
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-line rounded-[8px] overflow-hidden flex flex-col transition-all duration-[180ms] hover:shadow-[0_14px_30px_rgba(31,35,40,0.12)] hover:-translate-y-[3px]"
            >
              {/* Product Image */}
              <Link
                href={prod.detailsUrl}
                className="bg-card aspect-[4/2.9] flex items-center justify-center overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={prod.image}
                  alt={prod.alt}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </Link>

              {/* Product Body */}
              <div className="p-[14px_16px_16px] flex flex-col gap-1 flex-1">
                <h3 className="text-[16.5px] font-bold text-ink leading-snug">
                  <Link href={prod.detailsUrl} className="text-inherit hover:text-purple">
                    {prod.title}
                  </Link>
                </h3>
                <div className="text-[12.5px] text-muted">{prod.variant}</div>
                <div className="font-extrabold text-[16px] text-ink mt-1">
                  {prod.price} <small className="font-semibold text-muted text-[11.5px]">+ 18% GST</small>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-3 pt-1">
                  <a
                    href="https://pro-guide.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-[9px] px-2 text-[12.5px] font-bold text-center bg-purple text-white rounded-[5px] border border-purple hover:bg-purple-d hover:border-purple-d transition-all"
                  >
                    Add to Cart
                  </a>
                  <Link
                    href={prod.detailsUrl}
                    className="flex-1 py-[9px] px-2 text-[12.5px] font-bold text-center bg-white text-ink rounded-[5px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <p className="text-center mt-[22px]">
          <Link
            href="/products.html"
            className="inline-block bg-white text-ink px-5 py-[10px] rounded-[5px] font-bold text-[13.5px] border border-[#C9CDD3] hover:border-purple hover:text-purple hover:bg-tint transition-all shadow-sm"
          >
            View Cart &amp; All Products &rarr;
          </Link>
        </p>
      </div>
    </section>
  )
}

export default ProductOfferingsSection
