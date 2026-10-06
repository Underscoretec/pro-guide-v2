import React from 'react'

interface PartnerLogosProps {
  data?: any
}

const defaultPartners = [
  'Partner Institute',
  'University Partner',
  'Teaching Hospital',
  'Society Partner',
  'Foundation',
]

export const PartnerLogosSection: React.FC<PartnerLogosProps> = ({ data }) => {
  const title =
    data?.title ||
    'Partnerships with top institutes to make world-class education accessible globally'

  const partners: string[] =
    data?.partnersList && data.partnersList.length > 0
      ? data.partnersList.map((p: any) => (typeof p === 'string' ? p : p.name))
      : defaultPartners

  return (
    <section className="py-[34px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <p className="text-center font-bold mb-5 text-[16px] text-ink">
          {title}
        </p>
        <div className="flex justify-between items-center gap-[26px] flex-wrap opacity-75">
          {partners.map((item, idx) => (
            <span
              key={idx}
              className="font-bold tracking-[1px] text-[#8A8F98] text-[15px] flex items-center gap-2 before:content-['\25C8'] before:text-[#B9BEC6] before:text-[18px]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerLogosSection
