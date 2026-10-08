'use client'

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

interface AddToCartInput {
  id?: string
  name: string
  price?: number
  imageUrl?: string
  quantity?: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: AddToCartInput) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, delta: number) => void
  setQuantity: (id: string, qty: number) => void
  clearCart: () => void
  subtotal: number
  shipping: number
  gst: number
  total: number
  itemCount: number
  isHydrated: boolean
}

export const DEFAULT_CART_ITEMS: CartItem[] = [
  {
    id: 'paranasal-model-without-base',
    name: 'Paranasal Model without base',
    price: 20000,
    imageUrl: '/images/prod3.jpg',
    quantity: 1,
  },
  {
    id: 'paranasal-model-with-bassettes',
    name: 'Paranasal Model with Bassettes',
    price: 20000,
    imageUrl: '/images/prod2.jpg',
    quantity: 1,
  },
  {
    id: '3d-temporal-bone',
    name: '3D Temporal Bone',
    price: 20000,
    imageUrl: '/images/prod1.jpg',
    quantity: 1,
  },
]

const CART_STORAGE_KEY = 'proguide_cart_v1'

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(DEFAULT_CART_ITEMS)
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      } else {
        // Seed default items in localStorage on initial visit
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(DEFAULT_CART_ITEMS))
      }
    } catch {
      // ignore JSON parse error
    } finally {
      setIsHydrated(true)
    }
  }, [])

  // Sync to localStorage on change (only after hydrated)
  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore storage quota error
    }
  }, [items, isHydrated])

  const addToCart = (input: AddToCartInput) => {
    const id = input.id || input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const price = typeof input.price === 'number' && !isNaN(input.price) ? input.price : 20000
    const imageUrl = input.imageUrl || '/images/prod1.jpg'
    const qtyToAdd = input.quantity && input.quantity > 0 ? input.quantity : 1

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === id || i.name === input.name)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qtyToAdd,
        }
        return updated
      } else {
        return [
          ...prev,
          {
            id,
            name: input.name,
            price,
            imageUrl,
            quantity: qtyToAdd,
          },
        ]
      }
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta
          return {
            ...item,
            quantity: newQty < 1 ? 1 : newQty,
          }
        }
        return item
      })
    )
  }

  const setQuantity = (id: string, qty: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: Math.max(1, qty),
          }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
  }, [items])

  const shipping = useMemo(() => {
    return items.length > 0 ? 500 : 0
  }, [items])

  const gst = useMemo(() => {
    return Math.round(subtotal * 0.18)
  }, [subtotal])

  const total = useMemo(() => {
    return subtotal + shipping + gst
  }, [subtotal, shipping, gst])

  const itemCount = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.quantity || 1), 0)
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        setQuantity,
        clearCart,
        subtotal,
        shipping,
        gst,
        total,
        itemCount,
        isHydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
