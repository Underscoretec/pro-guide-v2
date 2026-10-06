import React from 'react'
import Image from 'next/image'

const PROCEDURES = [
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

export function SinusProceduresSection() {
  return (
    <section className="py-[52px] bg-[#F8F8FA] border-y border-line">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold">Procedures on the Paranasal Sinus Model</h2>
          <div className="rule"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[44px] items-start">
          <div className="rounded-[10px] overflow-hidden shadow-lg border-t-4 border-purple order-2 md:order-1">
            <Image
              src="/images/photo_lab2.jpg"
              alt="Endoscopic sinus surgery training"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <ul className="space-y-3 order-1 md:order-2">
            {PROCEDURES.map((item, idx) => (
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
