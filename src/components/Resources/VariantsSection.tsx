import React from 'react'

interface VariantItem {
  code?: string
  title?: string
  desc?: string
  description?: string
}

const DEFAULT_VARIANTS: VariantItem[] = [
  {
    code: 'A',
    title: 'Adult Healthy',
    desc: 'Standard adult anatomy, fully pneumatised mastoid',
  },
  {
    code: 'AP',
    title: 'Adult Pathological',
    desc: 'Disease-state anatomy for advanced training',
  },
  {
    code: 'P',
    title: 'Pediatric Healthy',
    desc: 'Pediatric proportions and landmarks',
  },
  {
    code: 'PP',
    title: 'Pediatric Pathological',
    desc: 'Complex pediatric cases',
  },
]

interface VariantsSectionProps {
  data?: {
    title?: string
    variantsList?: VariantItem[]
  }
}

export function VariantsSection({ data }: VariantsSectionProps) {
  const title = data?.title || 'Temporal Bone Variants Available'
  const variants = data?.variantsList && data.variantsList.length > 0 ? data.variantsList : DEFAULT_VARIANTS

  return (
    <section className="py-[52px] bg-[#F8F8FA] border-y border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold">{title}</h2>
          <div className="rule"></div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[2px] bg-line border border-line rounded-lg overflow-hidden">
          {variants.map((item, idx) => (
            <div key={idx} className="bg-white p-[26px_20px] text-center">
              <div className="w-[52px] h-[52px] mx-auto mb-2.5 rounded-full bg-tint text-purple flex items-center justify-center text-[22px] font-extrabold">
                {item.code}
              </div>
              <b className="block text-[15.5px] font-bold text-ink">{item.title}</b>
              <span className="text-[13px] text-muted">{item.desc || item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
