import React from 'react'
import { getHomePage } from '@/lib/payload/homePage'
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

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const page = await getHomePage()

  const heroBlock = page?.sections?.find((b: any) => b.blockType === 'hero')
  const partnersBlock = page?.sections?.find((b: any) => b.blockType === 'partners')
  const productsBlock = page?.sections?.find((b: any) => b.blockType === 'products')
  const detailsBlock = page?.sections?.find((b: any) => b.blockType === 'true-to-life-details')
  const workshopsBlock = page?.sections?.find((b: any) => b.blockType === 'workshops')
  const glimpsesBlock = page?.sections?.find((b: any) => b.blockType === 'workshop-glimpses')
  const whyBoneBlock = page?.sections?.find((b: any) => b.blockType === 'why-artificial-bone')
  const facultyBlock = page?.sections?.find((b: any) => b.blockType === 'faculty')
  const testimonialsBlock = page?.sections?.find((b: any) => b.blockType === 'testimonials')
  const variantsBlock = page?.sections?.find((b: any) => b.blockType === 'bone-variants')
  const leadFormBlock = page?.sections?.find((b: any) => b.blockType === 'lead-form')
  const blogBlock = page?.sections?.find((b: any) => b.blockType === 'blog')

  return (
    <main className="flex-1">
      <HeroSection data={heroBlock} />
      <PartnerLogosSection data={partnersBlock} />
      <ProductOfferingsSection data={productsBlock} />
      <TrueToLifeDetailsSection data={detailsBlock} />
      <ExploreWorkshopsSection data={workshopsBlock} />
      <WorkshopGlimpsesSection data={glimpsesBlock} />
      <WhyArtificialBoneSection data={whyBoneBlock} />
      <FacultySection data={facultyBlock} />
      <TestimonialsSection data={testimonialsBlock} />
      <BoneVariantsSection data={variantsBlock} />
      <LeadFormSection data={leadFormBlock} />
      <BlogSection data={blogBlock} />
    </main>
  )
}
