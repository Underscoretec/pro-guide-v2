import React from 'react'

const FEATURES = [
  {
    num: '01',
    content: <b>No need for chemical preservations</b>,
  },
  {
    num: '02',
    content: <b>Bone-similar and soft tissue like material</b>,
  },
  {
    num: '03',
    content: (
      <>
        <b>14/12/4 surgeries can be practiced</b> on temporal, sinus and larynx models respectively
      </>
    ),
  },
  {
    num: '04',
    content: <b>Made with eco-friendly material</b>,
  },
  {
    num: '05',
    content: (
      <>
        <b>Models of disease pathology</b> available
      </>
    ),
  },
]

export function ModelFeaturesSection() {
  return (
    <section className="py-[52px] bg-[#F8F8FA] border-y border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold">3D Simulation Bone Model Features</h2>
          <div className="rule"></div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[22px] text-center">
          {FEATURES.map((item) => (
            <div key={item.num}>
              <div className="text-[26px] font-extrabold text-purple">{item.num}</div>
              <p className="text-[13.5px] text-muted mt-1">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
