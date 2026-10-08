import React from 'react'

const DEFAULT_FEATURES = [
  { num: '01', text: 'No need for chemical preservations' },
  { num: '02', text: 'Bone-similar and soft tissue like material' },
  { num: '03', text: '14/12/4 surgeries can be practiced on temporal, sinus and larynx models respectively' },
  { num: '04', text: 'Made with eco-friendly material' },
  { num: '05', text: 'Models of disease pathology available' },
]

interface ModelFeaturesSectionProps {
  data?: {
    title?: string
    features?: Array<{ num?: string; text?: string }>
  }
}

export function ModelFeaturesSection({ data }: ModelFeaturesSectionProps) {
  const title = data?.title || '3D Simulation Bone Model Features'
  const features = data?.features && data.features.length > 0 ? data.features : DEFAULT_FEATURES

  return (
    <section className="py-[52px] bg-[#F8F8FA] border-y border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold">{title}</h2>
          <div className="rule"></div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[22px] text-center">
          {features.map((item, idx) => (
            <div key={idx}>
              <div className="text-[26px] font-extrabold text-purple">{item.num}</div>
              <p className="text-[13.5px] text-muted mt-1 font-semibold">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
