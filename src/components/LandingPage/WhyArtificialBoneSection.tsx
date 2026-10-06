import React from 'react'

interface WhyArtificialBoneProps {
  data?: any
}

const defaultCheckItems = [
  {
    title: 'Essential Skills for Surgical Procedures',
    description:
      'Mastering the anatomy of the temporal bone, larynx and paranasal sinuses is crucial before performing surgical procedures.',
  },
  {
    title: 'The Need for 3D Simulation Models',
    description:
      'While cadaveric dissection is ideal, it is often unavailable. Realistic 3D models provide a superior alternative for surgical training.',
  },
  {
    title: 'Highly Detailed Temporal Bone Model',
    description:
      'Each artificial temporal bone replicates internal and external anatomy \u2014 practice mastoid surgeries, facial nerve decompression and cochlear implant insertion.',
  },
  {
    title: 'Accurate 3D Paranasal Sinus Model',
    description:
      'With over 90% anatomical accuracy, detailed sinus structures and soft tissue enhance surgical training precision.',
  },
]

const defaultStats = [
  { value: '100%', label: 'Safety in temporal bone laboratory' },
  { value: '90%', label: 'Value for surgical experience' },
  { value: '94%', label: 'External anatomical features' },
  { value: '85%', label: 'Internal anatomical features' },
  { value: '92%', label: 'Drill response vs cadaver temporal bone' },
]

export const WhyArtificialBoneSection: React.FC<WhyArtificialBoneProps> = ({ data }) => {
  const title = data?.title || 'Why Artificial Bone'
  const image = data?.image?.url || data?.imageUrl || '/images/detail_macro.jpg'
  const checkItems =
    data?.checkList && data.checkList.length > 0 ? data.checkList : defaultCheckItems
  const stats = data?.stats && data.stats.length > 0 ? data.stats : defaultStats

  return (
    <section className="py-[52px] bg-[#F8F8FA] border-t border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold text-ink">{title}</h2>
          <div className="rule" />
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[44px] items-center">
          {/* Photo */}
          <div className="rounded-[10px] overflow-hidden shadow-[0_16px_36px_rgba(31,35,40,0.16)] border-t-[6px] border-purple">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Checks List */}
          <ul className="list-none space-y-2">
            {checkItems.map((item: any, idx: number) => (
              <li key={idx} className="relative pl-[34px] py-[10px]">
                <span className="absolute left-1 top-3 text-purple font-extrabold bg-tint w-[22px] h-[22px] rounded-full flex items-center justify-center text-[12px]">
                  &#10003;
                </span>
                <b className="block text-[15.5px] font-bold text-ink mb-1">
                  {item.title}
                </b>
                <span className="text-[14px] text-muted leading-relaxed block">
                  {item.description}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stat Band */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-[2px] bg-line border border-line rounded-[8px] overflow-hidden mt-[34px]">
          {stats.map((st: any, idx: number) => (
            <div key={idx} className="bg-[#F8F8FA] text-center py-[22px] px-[14px]">
              <div className="text-[30px] font-extrabold text-purple leading-tight">
                {st.value}
              </div>
              <div className="text-[12.5px] text-muted mt-[2px] leading-snug">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyArtificialBoneSection
