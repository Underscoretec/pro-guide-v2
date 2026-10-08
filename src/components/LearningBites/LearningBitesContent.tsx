'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export interface VideoItem {
  id?: string
  title: string
  description?: string
  metaText?: string
  category?: string
  duration?: string
  thumbnail?: any
  thumbnailUrl?: string
  videoUrl?: string
}

interface LearningBitesContentProps {
  data?: any
}

const defaultVideoList: VideoItem[] = [
  {
    id: 'v1',
    title: 'Cortical Mastoidectomy',
    description: 'Step-by-step dissection on the 3D temporal bone model',
    metaText: 'Video library · Skill Lab Demonstration',
    category: 'Otology',
    duration: '12 mins',
    thumbnailUrl: '/images/ws_skilllab.jpg',
    videoUrl: '/images/Skill Lab.mp4',
  },
  {
    id: 'v2',
    title: 'Posterior Tympanotomy',
    description: 'Approaching the facial recess safely',
    metaText: 'Video library · Skill Lab Demonstration',
    category: 'Otology',
    duration: '10 mins',
    thumbnailUrl: '/images/ws_lab.jpg',
    videoUrl: '/images/Skill Lab.mp4',
  },
  {
    id: 'v3',
    title: 'Cochlear Implant Insertion',
    description: 'Dummy electrode insertion demonstration',
    metaText: 'Video library · Skill Lab Demonstration',
    category: 'Otology',
    duration: '15 mins',
    thumbnailUrl: '/images/ws_faculty.jpg',
    videoUrl: '/images/Skill Lab.mp4',
  },
  {
    id: 'v4',
    title: 'Paranasal Sinus Navigation',
    description: 'Endoscopic navigation and uncinectomy on PNS model',
    metaText: 'Video library · Skill Lab Demonstration',
    category: 'Rhinology',
    duration: '10 mins',
    thumbnailUrl: '/images/ws_room2.jpg',
    videoUrl: '/images/Skill Lab.mp4',
  },
  {
    id: 'v5',
    title: 'Microlaryngoscopy Polyp Excision',
    description: 'Vocal cord lesion excision simulation on larynx model',
    metaText: 'Video library · Skill Lab Demonstration',
    category: 'Laryngology',
    duration: '8 mins',
    thumbnailUrl: '/images/ws_lecture.jpg',
    videoUrl: '/images/Skill Lab.mp4',
  },
  {
    id: 'v6',
    title: 'Eustachian Tube Dilation',
    description: 'Catheter navigation and balloon placement demonstration',
    metaText: 'Video library · Skill Lab Demonstration',
    category: 'Rhinology',
    duration: '14 mins',
    thumbnailUrl: '/images/ws_guide2.jpg',
    videoUrl: '/images/Skill Lab.mp4',
  },
]

export function LearningBitesContent({ data }: LearningBitesContentProps) {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null)

  const heroCrumbHome = data?.hero?.crumbHomeText || 'Home'
  const heroCrumbCurrent = data?.hero?.crumbCurrentText || 'Learning Bites'
  const heroTitle = data?.hero?.title || data?.title || 'Learning Bites'
  const heroDescription =
    data?.hero?.description ||
    'Watch surgical demonstration videos, 3D model drilling techniques, and expert step-by-step tutorials from master otolaryngology faculty.'

  const sectionHeading = data?.sectionHeader?.heading || 'Surgical Demonstration & Drilling Videos'
  const sectionSubheading =
    data?.sectionHeader?.subheading || 'Practical surgical guidance and simulation model walkthroughs.'

  const rawVideos: any[] = data?.videoList && data.videoList.length > 0 ? data.videoList : defaultVideoList

  const videoList: VideoItem[] = rawVideos.map((v: any, index: number) => ({
    id: v.id || `video-${index}`,
    title: v.title || 'Surgical Demonstration Video',
    description: v.description || 'Step-by-step surgical simulation video tutorial.',
    metaText: v.metaText || 'Video library · Skill Lab Demonstration',
    category: v.category || 'Otology',
    duration: v.duration || '10 mins',
    thumbnailUrl: typeof v.thumbnail === 'object' && v.thumbnail?.url ? v.thumbnail.url : v.thumbnailUrl,
    videoUrl: v.videoUrl,
  }))

  return (
    <div>
      {/* Hero Banner */}
      <div className="phero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">{heroCrumbHome}</Link> / <span>{heroCrumbCurrent}</span>
          </div>
          <h1>{heroTitle}</h1>
          <p>{heroDescription}</p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-[52px] bg-white">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6">
          {/* Section Header */}
          <div className="sechead mb-8">
            <h2 className="font-bold text-ink">{sectionHeading}</h2>
            <p className="text-muted mt-2 text-[15px]">{sectionSubheading}</p>
            <div className="rule" />
          </div>

          {/* 3-Column Video Card Grid matching exact UI from reference */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoList.map((video) => (
              <div
                key={video.id}
                className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden flex flex-col h-full shadow-xs hover:shadow-lg transition-all duration-300 group"
              >
                {/* Top Video Header / Thumbnail */}
                <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden flex items-center justify-center">
                  {video.thumbnailUrl ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Soft dark gradient at bottom for title contrast */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4C1D95] via-[#5E007B] to-[#C2410C]" />
                  )}

                  {/* Centered Bright Green Play Button */}
                  <button
                    type="button"
                    onClick={() => setActiveVideo(video)}
                    className="w-14 h-14 rounded-full bg-[#10B981] hover:bg-[#059669] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all cursor-pointer relative z-10"
                    aria-label={`Play ${video.title}`}
                  >
                    <svg
                      className="w-6 h-6 fill-current ml-1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>

                  {/* Video Title in Bold White anchored at bottom-left */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h3 className="text-white font-bold text-[15.5px] sm:text-[16.5px] leading-[1.3] drop-shadow-sm">
                      {video.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body & Footer */}
                <div className="p-4 sm:p-5 flex flex-col flex-1 bg-white">
                  <p className="text-[13.5px] text-[#4B5563] leading-[1.55] flex-1 mb-3">
                    {video.description}
                  </p>

                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[12px] text-[#9CA3AF] font-normal block">
                      {video.metaText}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal / Video Player Overlay */}
          {activeVideo && (
            <div
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
              onClick={() => setActiveVideo(null)}
            >
              <div
                className="bg-white rounded-2xl max-w-5xl w-full p-5 sm:p-7 relative shadow-2xl transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="absolute top-4 right-5 text-[#6B7280] hover:text-[#1F2328] font-bold text-2xl leading-none transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  &times;
                </button>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1F2328] pr-10">{activeVideo.title}</h3>
                <div className="aspect-[16/9] bg-black rounded-xl mt-4 flex items-center justify-center text-white text-sm relative overflow-hidden shadow-inner">
                  {activeVideo.videoUrl ? (
                    activeVideo.videoUrl.endsWith('.mp4') || activeVideo.videoUrl.includes('.mp4') ? (
                      <video
                        src={activeVideo.videoUrl}
                        controls
                        autoPlay
                        className="w-full h-full rounded-lg object-contain bg-black"
                      />
                    ) : (
                      <iframe
                        src={activeVideo.videoUrl}
                        title={activeVideo.title}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-16 h-16 rounded-full bg-[#10B981] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                        <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="font-bold text-lg text-white">{activeVideo.title}</p>
                      <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
                        {activeVideo.description}
                      </p>
                      <p className="text-xs text-[#10B981] font-semibold mt-3">
                        {activeVideo.metaText}
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveVideo(null)}
                    className="bg-[#5E007B] text-white text-xs font-bold px-4 py-2 rounded-md hover:bg-[#4a0061] transition-colors"
                  >
                    Close
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

export default LearningBitesContent
