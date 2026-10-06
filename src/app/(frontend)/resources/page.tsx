import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import {
  ResourcesHero,
  WhySimulationSection,
  ModelFeaturesSection,
  TemporalBoneProceduresSection,
  SinusProceduresSection,
  LarynxProceduresSection,
  VariantsSection,
  DoctorAcknowledgmentSection,
} from '@/components/Resources'

export const metadata: Metadata = {
  title: 'Resources — Why 3D Simulation Models & Procedures | ProGuide',
  description:
    'Why 3D simulation models work, the full list of procedures on temporal bone, sinus and larynx models, and available variants.',
}

export default async function ResourcesPage() {
  let resourcesData: any = null

  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'resources',
      limit: 1,
    })
    resourcesData = res.docs[0] || null
  } catch (error) {
    console.error('Error fetching resources data from Payload:', error)
  }

  // Helper to extract block data by slug
  const getBlockData = (blockType: string) => {
    return resourcesData?.sections?.find((b: any) => b.blockType === blockType)
  }

  const heroData = getBlockData('resources-hero')
  const whyData = getBlockData('why-simulation')
  const featuresData = getBlockData('model-features')
  const temporalData = getBlockData('temporal-bone-procedures')
  const sinusData = getBlockData('sinus-procedures')
  const larynxData = getBlockData('larynx-procedures')
  const variantsData = getBlockData('variants')
  const doctorData = getBlockData('doctor-acknowledgment')

  return (
    <>
    
      <main className="flex-1">
        <ResourcesHero data={heroData} />
        <WhySimulationSection data={whyData} />
        <ModelFeaturesSection data={featuresData} />
        <TemporalBoneProceduresSection data={temporalData} />
        <SinusProceduresSection data={sinusData} />
        <LarynxProceduresSection data={larynxData} />
        <VariantsSection data={variantsData} />
        <DoctorAcknowledgmentSection data={doctorData} />
      </main>
    
    </>
  )
}
