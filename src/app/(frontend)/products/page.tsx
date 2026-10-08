import React from 'react'
import type { Metadata } from 'next'
import {
  ProductsHero,
  ProductFamilySection,
  TrainingStageTable,
} from '@/components/Products'
import {
  getProductsPage,
  defaultProductFamilies,
} from '@/lib/payload/productsPage'

export const metadata: Metadata = {
  title: 'Product Offerings — 3D Simulation Models | ProGuide',
  description:
    'Buy 3D temporal bone, paranasal sinus and larynx simulation models on ProGuide.',
}

export default async function ProductsPage() {
  const pageData = await getProductsPage()

  const heroData = pageData?.hero || {
    crumbHomeText: 'Home',
    crumbCurrentText: 'Product Offerings',
    title: 'Product Offerings',
    description:
      'The complete OSSA+ Simulations catalogue — ENT simulation models across otology, rhinology, laryngology and vestibular training, cast in OSSA+ Composite™ by OSSA PLUS SIMULATION LLP. Store items can be purchased right away; everything else is a quick enquiry away.',
  }

  const families =
    pageData?.families && pageData.families.length > 0
      ? pageData.families
      : defaultProductFamilies

  const stageComparison = pageData?.stageComparison

  return (
    <main className="flex-1">
      {/* Hero Banner */}
      <ProductsHero data={heroData} />

      {/* Product Families with exactly 4 cards per line and uniform card size */}
      {families.map((family: any, idx: number) => (
        <ProductFamilySection key={family.familyId || idx} family={family} />
      ))}

      {/* Choose by Training Stage Comparison Table */}
      <TrainingStageTable data={stageComparison} />
    </main>
  )
}
