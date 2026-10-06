import React from 'react'
import type { Metadata } from 'next'
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

export default function ResourcesPage() {
  return (
    <>
    
      <main className="flex-1">
        <ResourcesHero />
        <WhySimulationSection />
        <ModelFeaturesSection />
        <TemporalBoneProceduresSection />
        <SinusProceduresSection />
        <LarynxProceduresSection />
        <VariantsSection />
        <DoctorAcknowledgmentSection />
      </main>
     
    </>
  )
}
