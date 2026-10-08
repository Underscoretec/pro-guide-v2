'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const videoList = [
  {
    id: 'v1',
    title: '3D Temporal Bone Dissection — Cortical Mastoidectomy & Facial Recess',
    category: 'Otology',
    duration: '12 mins',
    thumbnail: '/images/photo_micro.jpg',
    description: 'Step-by-step drilling technique on the ProGuide 3D temporal bone model showing cortical mastoidectomy, antrum exposure, and posterior tympanotomy.',
  },
  {
    id: 'v2',
    title: 'Paranasal Sinus Model — Endoscopic Navigation & Uncinectomy',
    category: 'Rhinology',
    duration: '10 mins',
    thumbnail: '/images/photo_lab2.jpg',
    description: 'Demonstration of 0° and 30° endoscope navigation through the 3D sinonasal cavity, uncinate process resection, and maxillary antrostomy.',
  },
  {
    id: 'v3',
    title: 'Larynx Model — Microlaryngoscopy Vocal Fold Polyp Excision',
    category: 'Laryngology',
    duration: '8 mins',
    thumbnail: '/images/photo_lab1.jpg',
    description: 'Endoscopic and microscopic vocal cord surgery simulation with replaceable lesion cassettes on the ProGuide larynx model.',
  },
  {
    id: 'v4',
    title: 'Cochlear Implant Dummy Electrode Insertion Procedure',
    category: 'Otology',
    duration: '15 mins',
    thumbnail: '/images/ws_lecture.jpg',
    description: 'Faculty demonstration of extended round window approach, cochleostomy, and dummy electrode array insertion under high magnification.',
  },
]

export const VideosContent: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<any | null>(null)

  return (
    <div>
      {/* Hero Banner */}
      <div className="phero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">Home</Link> &nbsp;&rarr;&nbsp; <span>Otolaryngology Video Library</span>
          </div>
          <h1>Otolaryngology Video Library</h1>
          <p>
            Watch surgical demonstration videos, 3D model drilling techniques, and expert step-by-step tutorials from master otolaryngology faculty.
          </p>
        </div>
      </div>

      <section className="py-[52px] bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="sechead">
            <h2 className="font-bold text-ink">Surgical Demonstration & Drilling Videos</h2>
            <p className="text-muted mt-2 text-[15px]">
              Practical surgical guidance and simulation model walkthroughs.
            </p>
            <div className="rule" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoList.map((video) => (
              <div
                key={video.id}
                className="bg-white border border-line rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="aspect-[16/9] relative overflow-hidden bg-ink">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-purple/90 text-white flex items-center justify-center text-xl shadow-lg group-hover:bg-purple group-hover:scale-110 transition-all"
                  >
                    &#9658;
                  </button>
                  <span className="absolute bottom-3 right-3 bg-black/75 text-white text-xs font-semibold px-2.5 py-1 rounded">
                    {video.duration}
                  </span>
                  <span className="absolute top-3 left-3 bg-purple text-white text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                    {video.category}
                  </span>
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-ink group-hover:text-purple transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mt-2 flex-1">
                    {video.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="mt-4 text-xs font-bold text-purple hover:text-purple-d flex items-center gap-1"
                  >
                    Watch Tutorial Video &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal / Video Player Overlay */}
          {activeVideo && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              onClick={() => setActiveVideo(null)}
            >
              <div
                className="bg-white rounded-xl max-w-2xl w-full p-6 relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-4 right-4 text-muted hover:text-ink font-bold text-xl"
                >
                  &times;
                </button>
                <h3 className="text-xl font-bold text-ink pr-8">{activeVideo.title}</h3>
                <div className="aspect-[16/9] bg-black rounded-lg mt-4 flex items-center justify-center text-white text-sm">
                  <div className="text-center p-6">
                    <div className="text-4xl mb-2">&#127916;</div>
                    <p className="font-semibold text-lg">{activeVideo.title}</p>
                    <p className="text-xs text-slate-300 mt-2">
                      Full HD Video Stream available for registered delegates and workshop participants.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveVideo(null)}
                    className="bg-purple text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-purple-d"
                  >
                    Close Video
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default VideosContent
