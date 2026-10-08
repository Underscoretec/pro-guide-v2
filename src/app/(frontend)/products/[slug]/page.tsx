import React from 'react'
import type { Metadata } from 'next'
import { ProductDetailsView } from '@/components/Products'
import { getProductData } from '@/lib/products'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductData(slug)

  return {
    title: `${product.name} — 3D Simulation Models | ProGuide`,
    description: product.shortDescription,
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductData(slug)

  return (
    <main className="flex-1">
      <ProductDetailsView product={product} />
    </main>
  )
}
