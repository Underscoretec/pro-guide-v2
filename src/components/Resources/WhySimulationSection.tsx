import React from 'react'

const POINTS = [
  {
    num: '01',
    text: 'Anatomy of the temporal bone and paranasal sinuses mandates attaining proper skills before venturing for surgical procedures.',
  },
  {
    num: '02',
    text: 'Though cadaveric dissection is ideal, 3D simulation models offer a practical alternative when cadaveric bones are unavailable or limited.',
  },
  {
    num: '03',
    text: 'Artificial temporal bones replicate internal and external anatomy, enabling mastoid, facial nerve and cochlear implant practice.',
  },
  {
    num: '04',
    text: '3D sinus models offer 90%+ anatomical accuracy, replicating ethmoid cells, turbinates, sphenoid, uncinate process and bulla.',
  },
]

export function WhySimulationSection() {
  return (
    <section className="py-[52px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-[22px] text-center">
          {POINTS.map((item) => (
            <div key={item.num}>
              <div className="text-[26px] font-extrabold text-purple">{item.num}</div>
              <p className="text-[13.5px] text-muted mt-1">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
