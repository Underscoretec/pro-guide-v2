import React from 'react'
import Image from 'next/image'

const DEFAULT_PROCEDURES = [
  'Identification of Endoscopic Anatomical Landmarks',
  'Uncinate Process Resection',
  'Middle Meatal Antrostomy',
  'Anterior Ethmoidectomy',
  'Posterior Ethmoidectomy',
  'Transethmoid Sphenoidotomy',
  'Inferior and Middle Turbinectomy',
  'Agar Cell Decapping',
  'Medial Maxillectomy',
  'Frontoethmoid Recess Approach',
  'Bulla Ethmoidalis Opening',
  'Transsphenoidal Approach to Pituitary',
]

interface SinusProceduresSectionProps {
  data?: {
    title?: string
    procedures?: Array<{ name?: string } | string>
    image?: any
    imageUrl?: string
  }
}

export function SinusProceduresSection({ data }: SinusProceduresSectionProps) {
  const title = data?.title || 'Procedures on the Paranasal Sinus Model'
  const rawProcedures = data?.procedures && data.procedures.length > 0 ? data.procedures : DEFAULT_PROCEDURES
  const procedures = rawProcedures.map((p) => (typeof p === 'string' ? p : p.name || ''))
  const imgSrc = data?.image?.url || data?.imageUrl || '/images/photo_lab2.jpg'

  return (
    <section className="py-[52px] bg-[#F8F8FA] border-y border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold">{title}</h2>
          <div className="rule"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[44px] items-start">
          <div className="rounded-[10px] overflow-hidden shadow-lg border-t-4 border-purple order-2 md:order-1">
            <Image
              src={imgSrc}
              alt="Endoscopic sinus surgery training"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <ul className="space-y-3 order-1 md:order-2">
            {procedures.map((item, idx) => (
              <li key={idx} className="relative pl-[30px] text-[14.5px]">
                <span className="absolute left-0 text-purple font-extrabold">✓</span>
                <b className="font-bold text-ink">{item}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
