import React from 'react'

interface FacultySectionProps {
  data?: any
  faculty?: any[]
}

const defaultFaculty = [
  {
    initials: 'PN',
    name: 'Dr. Prashant Naik',
    role: 'MS (ENT), DLO \u2014 ENT Specialist',
    bio: 'Creator of a precise 3D-printed replica of the temporal bone. Active member of the AAO-HNSF and the Politzer Society, and peer reviewer for the Otolaryngology\u2013Head and Neck Surgery journal. Runs hands-on dissection workshops and manages an open-access temporal bone dissection lab for aspiring and established otologists.',
  },
  {
    initials: 'MK',
    name: 'Dr. Milind Kirtane',
    role: 'MS, DORL, DSc (Hon.) \u2014 Padma Shri Awardee',
    bio: "Consulting ENT Surgeon at P. D. Hinduja National Hospital, Breach Candy and Saifee Hospital, Mumbai, and Honorary Surgeon at King Edward Memorial Hospital. One of India's most respected cochlear implant surgeons and a pioneer of ENT surgical teaching.",
  },
  {
    initials: 'GF',
    name: 'Guest Faculty',
    role: 'Visiting professors & senior surgeons',
    bio: 'Each workshop edition brings visiting national and international faculty for station teaching and live demonstration. Faculty for upcoming editions are announced on the registration page.',
  },
]

export const FacultySection: React.FC<FacultySectionProps> = ({ data, faculty }) => {
  const title = data?.title || 'World-Class Faculty'
  const subtitle =
    data?.subtitle ||
    'Learn from faculty members who bring a blend of theory and practice, and real-world examples relevant to your learning experience.'

  const rawList = data?.facultyList || faculty || []
  const list = rawList.length > 0 ? rawList : defaultFaculty

  return (
    <section className="py-[52px]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="sechead">
          <h2 className="font-bold text-ink">{title}</h2>
          <p className="text-muted mt-2 text-[15px]">
            {subtitle}
          </p>
          <div className="rule" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {list.map((member: any, idx: number) => {
            const key = member.id || member.name || idx
            return (
              <div
                key={key}
                className="bg-white border border-line rounded-[8px] p-[22px] text-left shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-[72px] h-[72px] rounded-full bg-purple text-white flex items-center justify-center font-extrabold text-[22px] mb-3">
                  {member.initials}
                </div>
                <h3 className="text-[17px] font-bold text-ink">
                  {member.name}
                </h3>
                <div className="text-[12.5px] text-purple font-bold mb-2">
                  {member.role}
                </div>
                <p className="text-[13.5px] text-muted leading-relaxed">
                  {member.bio}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FacultySection
