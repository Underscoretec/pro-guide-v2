'use client'

import React from 'react'
import Link from 'next/link'

interface TrainingCoursesContentProps {
  data?: any
}

const defaultManagementTeam = [
  {
    initials: 'PN',
    name: 'Dr. Prashant Naik',
    role: 'MS (ENT), DLO',
    bio: "Dr. Prashant's dedication to the field of otology is commendable. His innovative approach — including the creation of a precise 3D-printed replica of the temporal bone — showcases his commitment to advancing medical education and practice. He is an active member of the AAO-HNSF and the Politzer Society and a peer reviewer for the Otolaryngology–Head and Neck Surgery journal. His hands-on dissection workshops, coupled with his management of an open-access temporal bone dissection lab, offer invaluable resources for both aspiring and established otologists.",
  },
  {
    initials: 'MK',
    name: 'Dr. Milind Kirtane',
    role: 'MS, DORL, DSc (Hon.) — Padma Shri Awardee',
    bio: "One of India's foremost ENT and cochlear implant surgeons. Consulting ENT Surgeon at P. D. Hinduja National Hospital, Breach Candy and Saifee Hospital, Mumbai, and Honorary Surgeon at King Edward Memorial Hospital. A teacher to generations of otolaryngologists, his guidance anchors the clinical standards of every ProGuide training programme.",
  },
]

const defaultCourses = [
  {
    category: 'Otology · Foundation',
    title: 'Basic 3D Temporal Bone Dissection Workshop',
    why: 'Temporal bone anatomy is complex and compact — safe otologic surgery requires precise 3-D orientation before live surgery. Bone model with mastoid air cells, middle ear cleft, facial nerve canal, cochlea, semicircular canals, sigmoid sinus and internal acoustic canal.',
    procedures: [
      'Identification of external anatomical landmarks',
      'Cortical mastoidectomy',
      'Posterior tympanotomy & cochleostomy',
      'Facial nerve decompression',
      'Cochlear implant dummy electrode insertion',
      'Atticotomy & modified radical mastoidectomy',
      'Labyrinthectomy & translabyrinthine approach',
      "Endolymphatic sac approach & Bill's island",
    ],
    fmt: 'One-day hands-on · Operating microscope, high-speed microdrill, suction-irrigation, full dissection set per workstation',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    category: 'Otology · Advanced',
    title: 'Advanced Temporal Bone Dissection Workshop',
    why: 'For surgeons who have mastered basic mastoid work — progressively structured dissection on a model with real-size inner ear, complete facial nerve, internal acoustic canal, sigmoid sinus and dura.',
    procedures: [
      'Facial nerve decompression & facial recess approach',
      'Labyrinthectomy',
      'Translabyrinthine approach',
      "Bill's island technique",
      'Endolymphatic sac approach',
    ],
    fmt: 'One-day hands-on · Microear instrument sets per workstation',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    category: 'Neurotology',
    title: 'Facial Nerve Workshop',
    why: 'The facial nerve follows an intricate path through the temporal bone — surgery on it demands exceptional precision. Trained on a model carrying the complete pathway of the nerve.',
    procedures: [
      'Decompression from first genu to stylomastoid foramen',
      'Re-routing of the facial nerve',
      'End-to-end nerve anastomosis',
      'Various types of nerve grafting',
    ],
    fmt: 'One-day hands-on · Diamond burrs, nerve graft pieces, nerve suturing materials',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    category: 'Otology',
    title: 'Tympanoplasty Workshop',
    why: 'Tympanoplasty demands high surgical precision. The model carries a tympanic membrane with moderate central perforation — some models with absent or eroded incus for ossiculoplasty.',
    procedures: [
      'Endomeatal incision & tympanomeatal flap elevation',
      'Inlay graft technique & graft placement',
      'Myringotomy & grommet insertion',
      'Freshening perforation edges',
      'Ossiculoplasty when incus is absent',
    ],
    fmt: 'One-day hands-on · Microear instruments, artificial grafts, gelfoam, grommets',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    category: 'Otology · Implant',
    title: 'Cochlear Implant Surgery Workshop',
    why: 'Cochlear implantation requires thorough anatomical understanding and atraumatic electrode insertion — practiced on a model with mastoid air cells, facial recess, round window niche, cochlea and facial nerve pathway.',
    procedures: [
      'Mastoid antrotomy & facial recess approach',
      'Round window approach',
      'Stimulator well creation',
      'Electrode array tunnelling',
      'Pediatric cochlear implantation techniques',
    ],
    fmt: 'One-day hands-on · Dummy electrodes, microdrill with cutting & diamond burrs',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    category: 'Rhinology',
    title: 'Paranasal Sinuses Workshop',
    why: 'Sinus anatomy shows wide variation and endoscopic surgery demands strong three-dimensional orientation — trained on an artificial PNS model with septum, turbinates, uncinate process, bulla ethmoidalis, ostia and soft-tissue mucosa.',
    procedures: [
      'Septoplasty & uncinectomy',
      'Maxillary antrotomy',
      'Anterior & posterior ethmoidectomy',
      'Frontal recess approach',
      'Sphenoidectomy & transphenoidal approach',
    ],
    fmt: 'One-day hands-on · Endoscopes, endoscopic instruments, monitor tower',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    category: 'Rhinology · Interventional',
    title: 'Balloon Sinuplasty & Eustachian Tube Dilatation Workshop',
    why: 'Balloon-based procedures demand high precision and clear anatomical orientation — practiced on a PNS model with ergonomically designed soft tissues for balloon catheterization.',
    procedures: [
      'Balloon sinuplasty of frontal sinuses',
      'Balloon sinuplasty of maxillary sinuses',
      'Eustachian tube dilatation',
    ],
    fmt: 'Single-day hands-on with didactic lectures and video demonstrations · Balloon catheter instruments, nasal endoscopes',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    category: 'Laryngology',
    title: 'Larynx Workshop',
    why: 'Laser technology has revolutionized laryngeal surgery, demanding refined motor skills for safe day-care outcomes — trained on a real-size 3D larynx model with replaceable glottic cassettes simulating various lesions.',
    procedures: [
      'Vocal cord nodule excision',
      'Partial cordectomy',
      'Laryngeal web excision',
    ],
    fmt: 'One-day hands-on · Endoscopic instruments, laser machines, monitor tower',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
]

export const TrainingCoursesContent: React.FC<TrainingCoursesContentProps> = ({ data }) => {
  const pageTitle = data?.title || 'About Training Courses — 2026 Workshop Series'
  const heroDesc =
    data?.heroDescription ||
    'We are dedicated to building surgical confidence and reducing complications through specialized presurgical training. Our workshops provide hands-on training on simulation models of the temporal bone, paranasal sinuses and larynx, designed specifically for practicing surgeons. Each session is led by esteemed faculty members who provide one-to-one guidance.'

  const teamList = (
    data?.managementTeam && data.managementTeam.length > 0 ? data.managementTeam : defaultManagementTeam
  ).map((member: any) => ({
    ...member,
    photoUrl: typeof member.photo === 'object' && member.photo ? member.photo.url : member.imageUrl || null,
  }))

  const rawCourses = data?.courses && data.courses.length > 0 ? data.courses : defaultCourses

  const courses = rawCourses.map((c: any) => ({
    category: c.category,
    title: c.title,
    why: c.why,
    procedures: Array.isArray(c.procedures)
      ? c.procedures.map((p: any) => (typeof p === 'string' ? p : p.text))
      : c.procedures || [],
    fmt: c.fmt,
    brochureUrl:
      typeof c.brochureFile === 'object' && c.brochureFile?.url
        ? c.brochureFile.url
        : c.brochureUrl || '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: c.registrationUrl || 'https://pro-guide.in/',
    imageUrl: typeof c.image === 'object' && c.image ? c.image.url : c.imageUrl || null,
  }))

  const whyBoneData = data?.whyArtificialBone
  const whyBoneTitle = whyBoneData?.title || 'Why Artificial Bone'
  const whyBoneImg =
    typeof whyBoneData?.image === 'object' && whyBoneData?.image
      ? whyBoneData.image.url
      : whyBoneData?.imageUrl || '/images/photo_micro.jpg'

  const checks = whyBoneData?.checkList || [
    {
      title: 'Essential Skills for Surgical Procedures',
      description: 'Mastering the anatomy of the temporal bone, larynx and paranasal sinuses is crucial before performing surgical procedures.',
    },
    {
      title: 'The Need for 3D Simulation Models',
      description: 'While cadaveric dissection is ideal, it is often unavailable. Realistic 3D models provide a superior alternative.',
    },
    {
      title: 'Highly Detailed Temporal Bone Model',
      description: 'Practice mastoid surgeries, facial nerve decompression and cochlear implant insertion.',
    },
    {
      title: 'Accurate 3D Paranasal Sinus Model',
      description: 'Over 90% anatomical accuracy with detailed sinus structures and soft tissue.',
    },
  ]

  const stats = whyBoneData?.stats || [
    { value: '100%', label: 'Safety in temporal bone laboratory' },
    { value: '90%', label: 'Value for surgical experience' },
    { value: '94%', label: 'External anatomical features' },
    { value: '85%', label: 'Internal anatomical features' },
    { value: '92%', label: 'Drill response vs cadaver temporal bone' },
  ]

  const teamTitle = data?.managementTeamTitle || 'The Management Team'
  const coursesTitle = data?.coursesSeriesTitle || '3D Surgical Simulation Workshops — 2026 Series'
  const coursesDesc =
    data?.coursesSeriesDescription ||
    'A comprehensive series of one-day, faculty-led, hands-on programs built on anatomically accurate 3D simulation models. Each workshop pairs live demonstration of every procedural step with supervised practice at fully equipped workstations — with one-to-one mentoring, continuous faculty feedback and participation certificates.'

  return (
    <>
      <div className="phero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / Training Courses
          </div>
          <h1>{pageTitle}</h1>
          <p>{heroDesc}</p>
        </div>
      </div>

      <section>
        <div className="wrap">
          <div className="sechead">
            <h2>{teamTitle}</h2>
            <div className="rule"></div>
          </div>
          <div className="grid g2">
            {teamList.map((member: any, idx: number) => (
              <div key={idx} className="fcard">
                {member.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.photoUrl} alt={member.name} className="avatar" style={{ objectFit: 'cover' }} />
                ) : (
                  <div className="avatar">{member.initials}</div>
                )}
                <h3>{member.name}</h3>
                <div className="role">{member.role}</div>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt">
        <div className="wrap">
          <div className="sechead">
            <h2>{coursesTitle}</h2>
            <p>{coursesDesc}</p>
            <div className="rule"></div>
          </div>
          <div className="grid g2">
            {courses.map((c: any, idx: number) => (
              <div key={idx} className="course">
                <span className="cat">{c.category}</span>
                <h3>{c.title}</h3>
                <div className="why">{c.why}</div>
                <details>
                  <summary>Procedures covered</summary>
                  <ul>
                    {c.procedures.map((p: string, pIdx: number) => (
                      <li key={pIdx}>{p}</li>
                    ))}
                  </ul>
                </details>
                <div className="fmt">{c.fmt}</div>
                <div className="actions">
                  <a className="btn ghost" href={c.brochureUrl} target="_blank" rel="noopener noreferrer">
                    Brochure
                  </a>
                  <a className="btn" href={c.registrationUrl} target="_blank" rel="noopener noreferrer">
                    Register
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '24px' }}>
            <a className="btn" href="/ProGuide_3D_Workshops_2026.pdf" target="_blank" rel="noopener noreferrer">
              Download the 2026 Workshop Brochure (PDF)
            </a>
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="sechead">
            <h2>{whyBoneTitle}</h2>
            <div className="rule"></div>
          </div>
          <div className="split">
            <div className="photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={whyBoneImg} alt={whyBoneTitle} />
            </div>
            <ul className="checks">
              {checks.map((check: any, idx: number) => (
                <li key={idx}>
                  <b>{check.title}</b>
                  <span>{check.description}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="statband">
            {stats.map((st: any, idx: number) => (
              <div key={idx} className="stat">
                <div className="n">{st.value}</div>
                <div className="l">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default TrainingCoursesContent
