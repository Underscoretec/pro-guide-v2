import React from 'react'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import {
  HeroSection,
  PartnerLogosSection,
  ProductOfferingsSection,
  TrueToLifeDetailsSection,
  ExploreWorkshopsSection,
  WorkshopGlimpsesSection,
  WhyArtificialBoneSection,
  FacultySection,
  TestimonialsSection,
  BoneVariantsSection,
  LeadFormSection,
  BlogSection,
} from '@/components/LandingPage'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PartnerLogosSection />
        <ProductOfferingsSection />
        <TrueToLifeDetailsSection />
        <ExploreWorkshopsSection />
        <WorkshopGlimpsesSection />
        <WhyArtificialBoneSection />
        <FacultySection />
        <TestimonialsSection />
        <BoneVariantsSection />
        <LeadFormSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  )
}
