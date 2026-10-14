import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import {
  ResourcesHero,
  WhySimulationSection,
  ModelFeaturesSection,
} from '@/components/Resources'
import { roboto } from '@/font'

export const metadata: Metadata = {
  title: 'Why 3D Simulation Models & Procedures | ProGuide',
  description:
    'Why 3D simulation models work, the full list of procedures on temporal bone, sinus and larynx models, and available variants.',
}

export default async function ThreeDSimulationPage() {
  let resourcesData: any = null

  try {
    const payload = await getPayload({ config })
    let res = await payload.find({
      collection: '3d-simulation' as any,
      limit: 1,
    })
    if (!res.docs || res.docs.length === 0) {
      res = await payload.find({
        collection: 'resources',
        limit: 1,
      })
    }
    resourcesData = res.docs[0] || null
  } catch (error) {
    console.error('Error fetching 3D Simulation data from Payload:', error)
  }

  // Helper to extract block data by slug
  const getBlockData = (blockType: string) => {
    return resourcesData?.sections?.find((b: any) => b.blockType === blockType)
  }

  const rawHeroData = getBlockData('resources-hero')
  const heroData = {
    ...rawHeroData,
    crumbCurrentText: '3D Simulation',
  }
  const whyData = getBlockData('why-simulation')
  const featuresData = getBlockData('model-features')

  return (
    <main className={`${roboto.className} flex-1`}>
      <ResourcesHero data={heroData} />
      <WhySimulationSection data={whyData} />
      <ModelFeaturesSection data={featuresData} />
      <section className="py-[52px] bg-white text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <a
            href="https://ossaplussim.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple text-white px-7 py-3 rounded-sm font-bold text-[14px] sm:text-[15px] border border-purple hover:bg-purple-d hover:border-purple-d transition-all shadow-sm hover:shadow-md cursor-pointer"
          >
            To Know More About 3D Simulation
          </a>
        </div>
      </section>
    </main>
  )
}
