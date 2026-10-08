import React from 'react'
import Image from 'next/image'

const DEFAULT_PROCEDURES = [
  'Cortical Mastoidectomy',
  'Posterior Tympanotomy',
  'Cochleostomy',
  'Cochlear Implant Dummy Electrode Insertion',
  'Labyrinthectomy',
  'Facial Nerve Decompression',
  'Endolymphatic Sac Approach',
  "Bill's Island",
  'Atticotomy',
  'Modified Radical Mastoidectomy',
  'Translab Approach to IAC',
  'Stapedotomy',
  'Incus Transposition Demo',
  'Radical Mastoidectomy',
]

interface TemporalBoneProceduresSectionProps {
  data?: {
    title?: string
    procedures?: Array<{ name?: string } | string>
    image?: any
    imageUrl?: string
  }
}

export function TemporalBoneProceduresSection({ data }: TemporalBoneProceduresSectionProps) {
  const title = data?.title || 'Procedures That Can Be Performed Using the Temporal Bone Model'
  const rawProcedures = data?.procedures && data.procedures.length > 0 ? data.procedures : DEFAULT_PROCEDURES
  const procedures = rawProcedures.map((p) => (typeof p === 'string' ? p : p.name || ''))
  const imgSrc = data?.image?.url || data?.imageUrl || '/images/photo_lab1.jpg'

  return (
    <section className="py-[52px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold">{title}</h2>
          <div className="rule"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[44px] items-start">
          <ul className="space-y-3">
            {procedures.map((item, idx) => (
              <li key={idx} className="relative pl-[30px] text-[14.5px]">
                <span className="absolute left-0 text-purple font-extrabold">✓</span>
                <b className="font-bold text-ink">{item}</b>
              </li>
            ))}
          </ul>
          <div className="rounded-[10px] overflow-hidden shadow-lg border-t-4 border-purple">
            <Image
              src={imgSrc}
              alt="Temporal bone dissection stations"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
