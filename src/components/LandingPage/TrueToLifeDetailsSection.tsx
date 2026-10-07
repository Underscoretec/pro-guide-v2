'use client'

import React, { useState, useEffect } from 'react'

interface TrueToLifeDetailsProps {
  data?: any
}

const detailGalleries: Record<string, string[]> = {
  '/images/detail_macro.jpg': [
    '/images/detail_macro.jpg',
    '/images/detail_middleear.jpg',
    '/images/detail_sigmoid.jpg',
    '/images/prod1.jpg',
  ],
  '/images/detail_sigmoid.jpg': [
    '/images/detail_sigmoid.jpg',
    '/images/detail_macro.jpg',
    '/images/detail_middleear.jpg',
    '/images/prod1.jpg',
  ],
  '/images/detail_middleear.jpg': [
    '/images/detail_middleear.jpg',
    '/images/detail_sigmoid.jpg',
    '/images/detail_macro.jpg',
    '/images/prod1.jpg',
  ],
  '/images/detail_nose.jpg': [
    '/images/detail_nose.jpg',
    '/images/prod2.jpg',
    '/images/prod3.jpg',
  ],
  '/images/detail_larynxtop.jpg': [
    '/images/detail_larynxtop.jpg',
    '/images/prod4.jpg',
    '/images/photo_micro.jpg',
  ],
  '/images/detail_ear.jpg': [
    '/images/detail_ear.jpg',
    '/images/detail_macro.jpg',
    '/images/detail_middleear.jpg',
    '/images/prod1.jpg',
  ],
}

interface DetailImageSliderProps {
  images: string[]
  alt: string
}

const DetailImageSlider: React.FC<DetailImageSliderProps> = ({ images, alt }) => {
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
    <div
      className="relative aspect-[16/9] bg-[#1a1a1a] overflow-hidden select-none group/slider cursor-pointer"
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
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
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
              className={`h-1.5 rounded-full transition-all duration-300 shadow-md ${
                i === currentIndex ? 'w-4 bg-orange' : 'w-1.5 bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const defaultDetails = [
  {
    category: 'Temporal Bone',
    title: 'Ear canal, membrane & ossicles',
    description: 'Look down the canal of the temporal bone model — chorda tympani and ossicular detail included.',
    imageUrl: '/images/detail_macro.jpg',
    images: detailGalleries['/images/detail_macro.jpg'],
    alt: 'Ear canal and tympanic membrane detail',
  },
  {
    category: 'Temporal Bone',
    title: 'Sigmoid sinus, nerves & dura',
    description: 'Colour-true vessels and nerve pathways run through the bone, exactly where surgery will find them.',
    imageUrl: '/images/detail_sigmoid.jpg',
    images: detailGalleries['/images/detail_sigmoid.jpg'],
    alt: 'Temporal bone with sigmoid sinus and nerves',
  },
  {
    category: 'Middle Ear',
    title: 'Facial nerve & vascular anatomy',
    description: 'The complete middle ear cleft with facial nerve and vessels for decompression and re-routing work.',
    imageUrl: '/images/detail_middleear.jpg',
    images: detailGalleries['/images/detail_middleear.jpg'],
    alt: 'Middle ear anatomy with vessels and facial nerve',
  },
  {
    category: 'Rhinology',
    title: 'Soft-tissue nose & nasal cavity',
    description: 'Lifelike external nose over the full sinonasal anatomy — scope it as you would a patient.',
    imageUrl: '/images/detail_nose.jpg',
    images: detailGalleries['/images/detail_nose.jpg'],
    alt: 'External nose soft tissue model',
  },
  {
    category: 'Laryngology',
    title: 'Glottis with replaceable lesions',
    description: "The larynx model's endoscopic view — cassettes simulate nodules, polyps and webs for excision practice.",
    imageUrl: '/images/detail_larynxtop.jpg',
    images: detailGalleries['/images/detail_larynxtop.jpg'],
    alt: 'Endoscopic view of the larynx model with lesion',
  },
  {
    category: 'Otology',
    title: 'Silicone pinna & canal',
    description: 'A soft, lifelike ear for endoscopic ear surgery, canal work and examination training.',
    imageUrl: '/images/detail_ear.jpg',
    images: detailGalleries['/images/detail_ear.jpg'],
    alt: 'Silicone ear model',
  },
]

export const TrueToLifeDetailsSection: React.FC<TrueToLifeDetailsProps> = ({ data }) => {
  const title = data?.title || 'Every Detail, True to Life'
  const subtitle =
    data?.subtitle ||
    'Straight from our bench \u2014 unretouched photographs of the models our delegates train on.'
  const list = data?.detailsList && data.detailsList.length > 0 ? data.detailsList : defaultDetails

  const resolveImages = (card: any, primarySrc: string): string[] => {
    if (Array.isArray(card.images) && card.images.length > 0) {
      return card.images.map((img: any) =>
        typeof img === 'string' ? img : img?.url || img?.image?.url || img?.imageUrl || primarySrc
      )
    }

    if (detailGalleries[primarySrc]) {
      return detailGalleries[primarySrc]
    }

    const titleOrCat = `${card.title || ''} ${card.category || ''}`.toLowerCase()
    if (titleOrCat.includes('canal') || titleOrCat.includes('membrane') || titleOrCat.includes('ossicle')) {
      return detailGalleries['/images/detail_macro.jpg'] || [primarySrc]
    }
    if (titleOrCat.includes('sigmoid') || titleOrCat.includes('dura')) {
      return detailGalleries['/images/detail_sigmoid.jpg'] || [primarySrc]
    }
    if (titleOrCat.includes('middle ear') || titleOrCat.includes('facial nerve')) {
      return detailGalleries['/images/detail_middleear.jpg'] || [primarySrc]
    }
    if (
      titleOrCat.includes('nose') ||
      titleOrCat.includes('rhinology') ||
      titleOrCat.includes('nasal') ||
      titleOrCat.includes('sinus')
    ) {
      return detailGalleries['/images/detail_nose.jpg'] || [primarySrc]
    }
    if (titleOrCat.includes('glottis') || titleOrCat.includes('larynx') || titleOrCat.includes('lesion')) {
      return detailGalleries['/images/detail_larynxtop.jpg'] || [primarySrc]
    }
    if (
      titleOrCat.includes('pinna') ||
      titleOrCat.includes('ear') ||
      titleOrCat.includes('silicone') ||
      titleOrCat.includes('otology')
    ) {
      return detailGalleries['/images/detail_ear.jpg'] || [primarySrc]
    }

    return [primarySrc]
  }

  return (
    <section className="py-[52px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold text-ink">{title}</h2>
          <p className="text-muted mt-2 text-[15px]">
            {subtitle}
          </p>
          <div className="rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {list.map((card: any, idx: number) => {
            const mediaImage = typeof card.image === 'object' && card.image ? card.image.url : null
            const imageSrc = mediaImage || card.imageUrl || card.image || '/images/detail_macro.jpg'
            const images = resolveImages(card, imageSrc)

            return (
              <div
                key={idx}
                className="bg-white border border-line rounded-[8px] overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
              >
                <DetailImageSlider
                  images={images}
                  alt={card.alt || card.title}
                />
                <div className="p-4 flex-1 flex flex-col gap-[6px]">
                  <span className="text-[11px] font-extrabold tracking-[1.2px] uppercase text-orange">
                    {card.category}
                  </span>
                  <h3 className="text-[15.5px] font-bold text-ink leading-[1.4]">
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TrueToLifeDetailsSection
