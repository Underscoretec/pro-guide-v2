import React from 'react'
import type { Metadata } from 'next'
import { ProductDetailsView } from '@/components/Products'
import { getProductData } from '@/lib/products'

interface ProductQueryPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: ProductQueryPageProps): Promise<Metadata> {
  const query = await searchParams
  const slugParam = (query.p || query.slug || query.product) as string | undefined
  const product = await getProductData(slugParam)

  return {
    title: `${product.name} — 3D Simulation Models | ProGuide`,
    description: product.shortDescription,
  }
}

export default async function ProductQueryPage({ searchParams }: ProductQueryPageProps) {
  const query = await searchParams
  const slugParam = (query.p || query.slug || query.product) as string | undefined
  const product = await getProductData(slugParam)

  return (
    <main className="flex-1">
      <ProductDetailsView product={product} />
    </main>
  )
}
