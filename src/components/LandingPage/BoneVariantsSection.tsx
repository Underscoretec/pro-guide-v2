import React from 'react'

interface BoneVariantsProps {
  data?: any
}

const defaultVariants = [
  {
    code: 'A',
    title: 'Adult Healthy',
    description: 'Standard adult anatomy with full mastoid pneumatisation',
  },
  {
    code: 'AP',
    title: 'Adult Pathological',
    description: 'Disease-state anatomy for advanced decision training',
  },
  {
    code: 'P',
    title: 'Pediatric Healthy',
    description: 'Pediatric proportions and landmark relationships',
  },
  {
    code: 'PP',
    title: 'Pediatric Pathological',
    description: 'Complex pediatric cases for senior trainees',
  },
]

export const BoneVariantsSection: React.FC<BoneVariantsProps> = ({ data }) => {
  const title = data?.title || 'Temporal Bone Variants'
  const list = data?.variantsList && data.variantsList.length > 0 ? data.variantsList : defaultVariants

  return (
    <section className="py-[52px] bg-[#F8F8FA] border-t border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold text-ink">{title}</h2>
          <div className="rule" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-line border border-line rounded-[8px] overflow-hidden">
          {list.map((v: any, idx: number) => (
            <div key={idx} className="bg-white py-[26px] px-5 text-center flex flex-col items-center">
              <div className="w-[52px] h-[52px] mx-auto mb-[10px] rounded-full bg-tint text-purple flex items-center justify-center text-[22px] font-extrabold">
                {v.code}
              </div>
              <b className="block text-[15.5px] font-bold text-ink mb-1">
                {v.title}
              </b>
              <span className="text-[13px] text-muted leading-relaxed block">
                {v.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BoneVariantsSection
