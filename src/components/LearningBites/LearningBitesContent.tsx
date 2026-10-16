'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ReactPlayer from 'react-player'
import PlayIcon from '../../../public/play-icon.png'

export interface VideoItem {
  id?: string
  title: string
  videoLink?: string
  thumbnail?: string
  description?: string
  metaText?: string
  category?: string
  duration?: string
  thumbnailUrl?: string
  videoUrl?: string
}

interface LearningBitesContentProps {
  data?: any
}

const defaultVideoArray = [
  {
    id: '1',
    videoLink: '/public/Skill_lab/Skill_lab.m3u8',
    thumbnail: '/public/Skill_lab/Skill_lab.png',
    title: 'Skill Lab Workshop',
  },
  {
    id: '2',
    videoLink: '/public/Workshop_02_10_26/Workshop_02_10_26.m3u8',
    thumbnail: '/public/Workshop_02_10_26/Workshop_02_10_26.png',
    title: 'Mumbai Manthan Workshop',
  },
  {
    id: '3',
    videoLink: '/public/Bengaluru_ENT_Workshop/Bengaluru_ENT_Workshop.m3u8',
    thumbnail: '/public/Bengaluru_ENT_Workshop/Bengaluru_ENT_Workshop.png',
    title: 'Bengaluru ENT Workshop',
  },
  {
    id: '4',
    videoLink: '/public/Delhi_ENT_Workshop/Delhi_ENT_Workshop.m3u8',
    thumbnail: '/public/Delhi_ENT_Workshop/Delhi_ENT_Workshop.png',
    title: 'Delhi ENT Workshop',
  },
  {
    id: '5',
    videoLink: '/public/Hyderabad_ENT_Workshop/Hyderabad_ENT_Workshop.m3u8',
    thumbnail: '/public/Hyderabad_ENT_Workshop/Hyderabad_ENT_Workshop.png',
    title: 'Hyderabad ENT Workshop',
  },
  {
    id: '6',
    videoLink: '/public/Mumbai_ENT_Workshop/Mumbai_ENT_Workshop.m3u8',
    thumbnail: '/public/Mumbai_ENT_Workshop/Mumbai_ENT_Workshop.png',
    title: 'Mumbai ENT Workshop',
  },
]

export function LearningBitesContent({ data }: LearningBitesContentProps) {
  const playerRefs = useRef<{ [key: string]: any }>({})
  const [initialRenderComplete, setInitialRenderComplete] = useState<boolean>(false)

  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || 'https://d390yctwqquge8.cloudfront.net'
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'proGuide'

  const heroCrumbHome = data?.hero?.crumbHomeText || 'Home'
  const heroCrumbCurrent = data?.hero?.crumbCurrentText || 'Learning Bites'
  const heroTitle = data?.hero?.title || data?.title || 'Learning Bites'
  const heroDescription =
    data?.hero?.description ||
    'Watch surgical demonstration videos, 3D model drilling techniques, and expert step-by-step tutorials from master otolaryngology faculty.'

  const sectionHeading = data?.sectionHeader?.heading || 'Surgical Demonstration & Drilling Videos'
  const sectionSubheading =
    data?.sectionHeader?.subheading || 'Practical surgical guidance and simulation model walkthroughs.'

  const handleVideoEnd = (id: string | number) => {
    const currentPlayer = playerRefs.current[id]
    if (currentPlayer && typeof currentPlayer.showPreview === 'function') {
      currentPlayer.showPreview()
    }
  }

  useEffect(() => {
    setInitialRenderComplete(true)
  }, [])

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

          <div className="mb-6">
            <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-ink">
              Otolaryngology
            </h3>
          </div>

          {initialRenderComplete && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {defaultVideoArray.map((video: any) => (
                <div
                  key={video.id}
                  className="relative overflow-hidden rounded-2xl w-full aspect-video bg-black shadow-md group [&_video]:!object-cover [&_video]:!w-full [&_video]:!h-full [&_.react-player]:!h-full [&_.react-player]:!w-full [&_.react-player__preview]:!h-full [&_.react-player__preview]:!w-full"
                >
                  <ReactPlayer
                    url={`${cdnUrl}/${appName}${video.videoLink}`}
                    className="w-full h-full rounded-2xl overflow-hidden"
                    width="100%"
                    height="100%"
                    playing={true}
                    controls
                    config={{
                      file: {
                        attributes: {
                          style: {
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                          },
                        },
                      },
                    }}
                    ref={(el: any) => {
                      if (el) {
                        playerRefs.current[video.id] = el
                      }
                    }}
                    light={
                      <div className="relative w-full h-full cursor-pointer">
                        <div className="absolute top-[5%] left-[5%] font-inter text-[17px] sm:text-[18px] text-white z-10 font-bold drop-shadow-md pr-4">
                          {video.title}
                        </div>
                        <Image
                          src={`${cdnUrl}/${appName}${video.thumbnail}`}
                          alt={video.title || 'thumbnail'}
                          fill
                          unoptimized
                          className="object-cover w-full h-full"
                        />
                      </div>
                    }
                    playIcon={
                      <Image
                        src={PlayIcon}
                        alt="play-icon"
                        width={60}
                        height={60}
                        style={{ position: 'absolute' }}
                      />
                    }
                    onEnded={() => handleVideoEnd(video.id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default LearningBitesContent
