import React from 'react'
import Image from 'next/image'

const DEFAULT_PROCEDURES = [
  'Vocal Nodule Excision',
  'Vocal Cord Polypectomy',
  'Partial Cordectomy',
  'Laryngeal Web Excision',
]

interface LarynxProceduresSectionProps {
  data?: {
    title?: string
    procedures?: Array<{ name?: string } | string>
    image?: any
    imageUrl?: string
  }
}

export function LarynxProceduresSection({ data }: LarynxProceduresSectionProps) {
  const title = data?.title || 'Procedures on the Larynx Model'
  const rawProcedures = data?.procedures && data.procedures.length > 0 ? data.procedures : DEFAULT_PROCEDURES
  const procedures = rawProcedures.map((p) => (typeof p === 'string' ? p : p.name || ''))
  const imgSrc = data?.image?.url || data?.imageUrl || '/images/photo_micro.jpg'

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
              alt="Microlaryngoscopy training"
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
