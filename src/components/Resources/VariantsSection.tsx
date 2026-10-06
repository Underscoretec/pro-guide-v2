import React from 'react'

const VARIANTS = [
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

export function VariantsSection() {
  return (
    <section className="py-[52px] bg-[#F8F8FA] border-y border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold">Temporal Bone Variants Available</h2>
          <div className="rule"></div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[2px] bg-line border border-line rounded-lg overflow-hidden">
          {VARIANTS.map((item) => (
            <div key={item.code} className="bg-white p-[26px_20px] text-center">
              <div className="w-[52px] h-[52px] mx-auto mb-2.5 rounded-full bg-tint text-purple flex items-center justify-center text-[22px] font-extrabold">
                {item.code}
              </div>
              <b className="block text-[15.5px] font-bold text-ink">{item.title}</b>
              <span className="text-[13px] text-muted">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
