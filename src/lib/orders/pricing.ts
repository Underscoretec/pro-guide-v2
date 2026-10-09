import { getPayloadClient } from '@/lib/payload/client'

export const GST_RATE = 0.18

export interface CartLineInput {
  id: string | number
  quantity: number
}

export interface PricedLine {
  product: string
  productName: string
  productImage: string
  sku: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface PricedCart {
  items: PricedLine[]
  subtotal: number
  taxAmount: number
  totalAmount: number
}

/**
 * Prices a cart from the products collection. Client-sent prices are never used.
 * Cart ids may be a product slug or a numeric product id.
 */
export async function priceCart(lines: CartLineInput[]): Promise<PricedCart> {
  if (!lines || lines.length === 0) throw new Error('Your cart is empty.')

  const payload = await getPayloadClient()
  const items: PricedLine[] = []

  for (const line of lines) {
    const quantity = Math.floor(Number(line.quantity))
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 100) {
      throw new Error('Invalid item quantity.')
    }

    const key = String(line.id)
    const or: Record<string, unknown>[] = [{ slug: { equals: key } }]
    if (/^\d+$/.test(key)) or.push({ id: { equals: Number(key) } })

    const { docs } = await payload.find({
      collection: 'products',
      where: { or },
      limit: 1,
      depth: 1,
      overrideAccess: true,
    })
    const product = docs[0]
    if (!product || typeof product.price !== 'number' || product.price < 0) {
      throw new Error(`"${key}" is not available for online purchase.`)
    }

    const media = product.image && typeof product.image === 'object' ? product.image : null
    items.push({
      product: String(product.slug),
      productName: product.name,
      productImage: media?.url || product.imageUrl || '',
      sku: product.sku || `SKU-${product.slug}`,
      quantity,
      unitPrice: product.price,
      totalPrice: product.price * quantity,
    })
  }

  const subtotal = items.reduce((sum, i) => sum + i.totalPrice, 0)
  const taxAmount = Math.round(subtotal * GST_RATE)
  return { items, subtotal, taxAmount, totalAmount: subtotal + taxAmount }
}
