import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface PartnerLogosProps {
  data?: any
}

const defaultPartners = [
  { name: "Dr. Reddy's", logoUrl: '/images/partners/dr-reddys.png' },
  { name: 'Zydus', logoUrl: '/images/partners/zydus.png' },
  { name: 'GSK', logoUrl: '/images/partners/gsk.png' },
  { name: 'Torrent Pharma', logoUrl: '/images/partners/torrent.png' },
  { name: 'Alembic', logoUrl: '/images/partners/alembic.png' },
  { name: 'Radiant Pharmaceuticals', logoUrl: '/images/partners/radiant.png' },
  { name: 'Abbott', logoUrl: '/images/partners/abbott.png' },
  { name: 'Sun Pharma', logoUrl: '/images/partners/sun-pharma.png' },
]

export const PartnerLogosSection: React.FC<PartnerLogosProps> = ({ data }) => {
  const title =
    data?.title ||
    'Partnerships with top institutes to make world-class education accessible globally'

  const rawList =
    data?.partnersList && data.partnersList.length > 0
      ? data.partnersList
      : defaultPartners

  return (
    <section className="py-9 border-b border-line bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-center font-bold mb-6 text-[15px] sm:text-[16px] text-ink max-w-[800px] mx-auto">
          {title}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 items-center">
          {rawList.map((item: any, idx: number) => {
            const logoUrl =
              item?.logo?.url ||
              item?.logoUrl ||
              (typeof item?.logo === 'string' ? item.logo : null)
            const name = item?.name || `Partner ${idx + 1}`
            const link = item?.link

            const logoCard = (
              <div className="w-full h-[62px] bg-[#F8F9FA] hover:bg-white border border-[#E9ECEF] hover:border-[#CBDCF0] rounded-[8px] p-2 flex items-center justify-center shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(76,21,96,0.08)] hover:-translate-y-0.5 transition-all duration-300 group">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={name}
                    width={138}
                    height={48}
                    className="max-h-[38px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <span className="font-bold tracking-[0.5px] text-[#8A8F98] text-[13px] text-center line-clamp-2">
                    {name}
                  </span>
                )}
              </div>
            )

            return link ? (
              <Link
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block cursor-pointer no-underline"
              >
                {logoCard}
              </Link>
            ) : (
              <div key={idx} className="block">
                {logoCard}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default PartnerLogosSection
