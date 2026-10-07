'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'

interface WorkshopsContentProps {
  data?: any
}

const defaultTemporalWorkshops = [
  {
    title: 'Basic 3D Temporal Bone Dissection Workshop',
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on · Dates & fees on registration',
    imageUrl: '/images/ws_lab.jpg',
    alt: 'Delegates at stations',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    title: 'Advanced Temporal Bone Dissection Workshop',
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on · Dates & fees on registration',
    imageUrl: '/images/ws_faculty.jpg',
    alt: 'Faculty guidance at the microscope',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    title: 'Cochlear Implant Surgery Workshop',
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on · Dates & fees on registration',
    imageUrl: '/images/ws_lecture.jpg',
    alt: 'Live faculty demonstration',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    title: 'Facial Nerve Workshop',
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on · Dates & fees on registration',
    imageUrl: '/images/ws_room2.jpg',
    alt: 'Hands-on stations',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    title: 'Tympanoplasty Workshop',
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on · Dates & fees on registration',
    imageUrl: '/images/ws_skilllab.jpg',
    alt: 'KBI Skill Lab',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
]

const defaultSinusWorkshops = [
  {
    title: 'Paranasal Sinuses Workshop',
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on · Dates & fees on registration',
    imageUrl: '/images/ws_room2.jpg',
    alt: 'Endoscopic stations',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
  {
    title: 'Balloon Sinuplasty & Eustachian Tube Dilatation Workshop',
    tagline: 'KBI SkillBridge',
    meta: 'Single-day hands-on with didactic lectures and video demonstrations',
    imageUrl: '/images/ws_lab.jpg',
    alt: 'Workshop floor',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
]

const defaultLarynxWorkshops = [
  {
    title: 'Larynx Workshop — Microlaryngoscopy & Laser Surgeries',
    tagline: 'KBI SkillBridge',
    meta: 'One-day, faculty-led hands-on · Dates & fees on registration',
    imageUrl: '/images/ws_lecture.jpg',
    alt: 'Faculty demonstration',
    brochureUrl: '/ProGuide_3D_Workshops_2026.pdf',
    registrationUrl: 'https://pro-guide.in/',
  },
]

const defaultLarynxStats = [
  { value: '1:1', label: 'Model per delegate' },
  { value: '2 days', label: 'Typical hands-on format' },
  { value: '10+', label: 'Procedures per workshop' },
  { value: 'CME', label: 'Completion certificate' },
]

export const WorkshopsContent: React.FC<WorkshopsContentProps> = ({ data }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [])

  const pageTitle = data?.title || 'Explore Workshops'
  const heroDesc =
    data?.heroDescription ||
    'Hands-on, station-based programmes where every delegate operates on their own model under faculty guidance. Registration and payment are handled on the ProGuide store.'

  const glimpses = data?.glimpses
  const glimpsesImg =
    typeof glimpses?.image === 'object' && glimpses?.image ? glimpses.image.url : glimpses?.imageUrl || '/images/ws_collage.jpg'
  const glimpsesCaption =
    glimpses?.caption ||
    'Our first KBI SkillBridge workshop — Advanced Temporal Bone Dissection, 2 October 2026 at the KBI Skill Lab, Andheri East, under the aegis of AOI Mumbai West, ahead of Mumbai Manthan 3.0.'
  const glimpsesBrochure =
    typeof glimpses?.brochureFile === 'object' && glimpses?.brochureFile?.url
      ? glimpses.brochureFile.url
      : glimpses?.brochureUrl || '/ProGuide_3D_Workshops_2026.pdf'

  const temporalHeading = data?.temporalHeading || '3D Temporal Bone Workshops'
  const sinusHeading = data?.sinusHeading || 'Paranasal Sinus Workshops'
  const larynxHeading = data?.larynxHeading || 'Microlaryngoscopy and Laser Surgeries'

  const mapWorkshops = (rawList: any[], defaultList: any[]) => {
    if (!rawList || rawList.length === 0) return defaultList
    return rawList.map((item) => ({
      title: item.title,
      tagline: item.tagline || 'KBI SkillBridge',
      meta: item.meta || 'One-day, faculty-led hands-on · Dates & fees on registration',
      imageUrl: typeof item.image === 'object' && item.image ? item.image.url : item.imageUrl || '/images/ws_lab.jpg',
      alt: item.alt || item.title,
      brochureUrl:
        typeof item.brochureFile === 'object' && item.brochureFile?.url
          ? item.brochureFile.url
          : item.brochureUrl || '/ProGuide_3D_Workshops_2026.pdf',
      registrationUrl: item.registrationUrl || 'https://pro-guide.in/',
    }))
  }

  const temporalWorkshops = mapWorkshops(data?.temporalWorkshops, defaultTemporalWorkshops)
  const sinusWorkshops = mapWorkshops(data?.sinusWorkshops, defaultSinusWorkshops)
  const larynxWorkshops = mapWorkshops(data?.larynxWorkshops, defaultLarynxWorkshops)

  const larynxStats = data?.larynxStats && data.larynxStats.length > 0 ? data.larynxStats : defaultLarynxStats

  return (
    <>
      <div className="phero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> / Workshops
          </div>
          <h1>{pageTitle}</h1>
          <p>{heroDesc}</p>
        </div>
      </div>

      <section style={{ paddingBottom: 0 }}>
        <div className="wrap">
          <a href={glimpsesBrochure} target="_blank" rel="noopener noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={glimpsesImg}
              alt={glimpsesCaption}
              className="rounded-[10px] shadow-[0_16px_36px_rgba(31,35,40,0.18)] w-full block"
            />
          </a>
          <p className="text-center text-[13px] text-muted mt-[10px]">{glimpsesCaption}</p>
        </div>
      </section>

      <section id="temporal">
        <div className="wrap">
          <div className="sechead">
            <h2>{temporalHeading}</h2>
            <div className="rule" />
          </div>
          <div className="grid g3">
            {temporalWorkshops.map((ws: any, idx: number) => (
              <div key={idx} className="wcard">
                <div className="wimg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ws.imageUrl} alt={ws.alt} />
                </div>
                <div className="wbody">
                  <span className="tagline">{ws.tagline}</span>
                  <h3>{ws.title}</h3>
                  <div className="meta">{ws.meta}</div>
                  <div className="actions">
                    <a className="btn ghost" href={ws.brochureUrl} target="_blank" rel="noopener noreferrer">
                      Download Brochure
                    </a>
                    <a className="btn" href={ws.registrationUrl} target="_blank" rel="noopener noreferrer">
                      Register
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="alt" id="sinus">
        <div className="wrap">
          <div className="sechead">
            <h2>{sinusHeading}</h2>
            <div className="rule" />
          </div>
          <div className="grid g3">
            {sinusWorkshops.map((ws: any, idx: number) => (
              <div key={idx} className="wcard">
                <div className="wimg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ws.imageUrl} alt={ws.alt} />
                </div>
                <div className="wbody">
                  <span className="tagline">{ws.tagline}</span>
                  <h3>{ws.title}</h3>
                  <div className="meta">{ws.meta}</div>
                  <div className="actions">
                    <a className="btn ghost" href={ws.brochureUrl} target="_blank" rel="noopener noreferrer">
                      Download Brochure
                    </a>
                    <a className="btn" href={ws.registrationUrl} target="_blank" rel="noopener noreferrer">
                      Register
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="larynx">
        <div className="wrap">
          <div className="sechead">
            <h2>{larynxHeading}</h2>
            <div className="rule" />
          </div>
          <div className="grid g3">
            {larynxWorkshops.map((ws: any, idx: number) => (
              <div key={idx} className="wcard">
                <div className="wimg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ws.imageUrl} alt={ws.alt} />
                </div>
                <div className="wbody">
                  <span className="tagline">{ws.tagline}</span>
                  <h3>{ws.title}</h3>
                  <div className="meta">{ws.meta}</div>
                  <div className="actions">
                    <a className="btn ghost" href={ws.brochureUrl} target="_blank" rel="noopener noreferrer">
                      Download Brochure
                    </a>
                    <a className="btn" href={ws.registrationUrl} target="_blank" rel="noopener noreferrer">
                      Register
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="statband mt-9">
            {larynxStats.map((st: any, idx: number) => (
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

export default WorkshopsContent
