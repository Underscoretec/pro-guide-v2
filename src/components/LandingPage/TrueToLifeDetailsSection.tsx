import React from 'react'

interface TrueToLifeDetailsProps {
  data?: any
}

const defaultDetails = [
  {
    category: 'Temporal Bone',
    title: 'Ear canal, membrane & ossicles',
    description: 'Look down the canal of the temporal bone model — chorda tympani and ossicular detail included.',
    imageUrl: '/images/detail_macro.jpg',
    alt: 'Ear canal and tympanic membrane detail',
  },
  {
    category: 'Temporal Bone',
    title: 'Sigmoid sinus, nerves & dura',
    description: 'Colour-true vessels and nerve pathways run through the bone, exactly where surgery will find them.',
    imageUrl: '/images/detail_sigmoid.jpg',
    alt: 'Temporal bone with sigmoid sinus and nerves',
  },
  {
    category: 'Middle Ear',
    title: 'Facial nerve & vascular anatomy',
    description: 'The complete middle ear cleft with facial nerve and vessels for decompression and re-routing work.',
    imageUrl: '/images/detail_middleear.jpg',
    alt: 'Middle ear anatomy with vessels and facial nerve',
  },
  {
    category: 'Rhinology',
    title: 'Soft-tissue nose & nasal cavity',
    description: 'Lifelike external nose over the full sinonasal anatomy — scope it as you would a patient.',
    imageUrl: '/images/detail_nose.jpg',
    alt: 'External nose soft tissue model',
  },
  {
    category: 'Laryngology',
    title: 'Glottis with replaceable lesions',
    description: "The larynx model's endoscopic view — cassettes simulate nodules, polyps and webs for excision practice.",
    imageUrl: '/images/detail_larynxtop.jpg',
    alt: 'Endoscopic view of the larynx model with lesion',
  },
  {
    category: 'Otology',
    title: 'Silicone pinna & canal',
    description: 'A soft, lifelike ear for endoscopic ear surgery, canal work and examination training.',
    imageUrl: '/images/detail_ear.jpg',
    alt: 'Silicone ear model',
  },
]

export const TrueToLifeDetailsSection: React.FC<TrueToLifeDetailsProps> = ({ data }) => {
  const title = data?.title || 'Every Detail, True to Life'
  const subtitle =
    data?.subtitle ||
    'Straight from our bench \u2014 unretouched photographs of the models our delegates train on.'
  const list = data?.detailsList && data.detailsList.length > 0 ? data.detailsList : defaultDetails

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

            return (
              <div
                key={idx}
                className="bg-white border border-line rounded-[8px] overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="aspect-[16/9] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={card.alt || card.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
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
