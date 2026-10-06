import React from 'react'
import Link from 'next/link'

interface TierItem {
  tier: string
  models: string
  builtFor: string
  typicalUse: string
}

interface TrainingStageTableProps {
  data?: {
    title?: string
    tiers?: TierItem[]
    footerNote?: string
  }
}

const defaultTiers: TierItem[] = [
  {
    tier: 'Basic',
    models: 'Mastoid Bone Model · Task-Based PNS',
    builtFor: 'First-year residents, course delegates',
    typicalUse: 'Weekly drilling & endoscopy practice',
  },
  {
    tier: 'Task',
    models:
      'Tympanoplasty · Stapedectomy · Ossiculoplasty · Facial Decompression · Balloon series',
    builtFor: 'Skill-specific rehearsal',
    typicalUse: 'Deliberate practice of one procedure',
  },
  {
    tier: 'Advanced',
    models: 'Cochlear Implant Model · Advance PNS',
    builtFor: 'Senior residents, fellows, device training',
    typicalUse: 'Approach + implant workflow rehearsal',
  },
  {
    tier: 'Complete',
    models: 'Complete Temporal Bone',
    builtFor: 'Exams, courses, skull base work',
    typicalUse: 'Full-procedure dissection & assessment',
  },
]

export const TrainingStageTable: React.FC<TrainingStageTableProps> = ({
  data,
}) => {
  const title = data?.title || 'Choose by Training Stage'
  const tiers = data?.tiers && data.tiers.length > 0 ? data.tiers : defaultTiers

  return (
    <section className="py-[52px] bg-[#F8F8FA] border-t border-b border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-[34px]">
          <h2 className="text-[clamp(23px,2.6vw,31px)] font-bold text-ink">
            {title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple from-55% to-orange rounded-sm mx-auto mt-3.5 relative after:content-[''] after:absolute after:-right-3 after:-top-0.5 after:w-2 after:h-2 after:rounded-full after:bg-orange" />
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-[8px] border border-line shadow-sm bg-white">
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr className="bg-gradient-to-r from-[#4A148C] to-[#673AB7] text-white text-left font-bold">
                <th className="py-3 px-3.5 sm:px-4">Tier</th>
                <th className="py-3 px-3.5 sm:px-4">Models</th>
                <th className="py-3 px-3.5 sm:px-4">Built for</th>
                <th className="py-3 px-3.5 sm:px-4">Typical use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {tiers.map((row, idx) => {
                const isEven = idx % 2 === 1
                return (
                  <tr
                    key={idx}
                    className={`transition-colors hover:bg-[#F2ECFA]/40 ${
                      isEven ? 'bg-[#F8F6FB]' : 'bg-white'
                    }`}
                  >
                    <td className="py-3 px-3.5 sm:px-4 font-bold text-[#4A148C] whitespace-nowrap">
                      {row.tier}
                    </td>
                    <td className="py-3 px-3.5 sm:px-4 text-ink font-medium">
                      {row.models}
                    </td>
                    <td className="py-3 px-3.5 sm:px-4 text-muted">
                      {row.builtFor}
                    </td>
                    <td className="py-3 px-3.5 sm:px-4 text-muted">
                      {row.typicalUse}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <p className="mt-4 text-[13px] text-muted text-center sm:text-left">
          Full model specifications and the material story are on{' '}
          <Link
            href="https://ossa.sudors.in/products"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple font-semibold underline hover:text-purple-d"
          >
            ossa.sudors.in
          </Link>{' '}
          · purchases and quotes are handled here on ProGuide.
        </p>
      </div>
    </section>
  )
}

export default TrainingStageTable
