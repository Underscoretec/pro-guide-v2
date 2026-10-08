'use client'

import React, { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react'
import { getUserCart, syncUserCart, clearUserCart } from '@/lib/cart/actions'

export interface CartItem {
  id: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  variant?: string
}

interface AddToCartInput {
  id?: string
  name: string
  price?: number
  imageUrl?: string
  quantity?: number
  variant?: string
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

export const DEFAULT_CART_ITEMS: CartItem[] = []

const getStorageKey = (userId?: number | string | null) => {
  return userId ? `proguide_cart_user_${userId}` : 'proguide_cart_guest'
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export interface CartProviderProps {
  children: React.ReactNode
  user?: { id: number | string; email?: string } | null
}

export const CartProvider: React.FC<CartProviderProps> = ({ children, user }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const userId = user?.id ? String(user.id) : null
  const currentKey = getStorageKey(userId)
  const activeUserIdRef = useRef<string | null>(userId)

  // Clear deprecated legacy global cart key so dummy items are never retained
  useEffect(() => {
    try {
      localStorage.removeItem('proguide_cart_v1')
    } catch {}
  }, [])

  // When active user changes (login, logout, or account switch)
  useEffect(() => {
    const key = getStorageKey(userId)
    activeUserIdRef.current = userId

    // 1. Immediately read user-scoped localStorage for instantaneous UI
    let localItems: CartItem[] = []
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          localItems = parsed
        }
      }
    } catch {}

    setItems(localItems)
    setIsHydrated(true)

    // 2. If user is logged in, fetch authoritative cart from Payload DB
    if (userId) {
      getUserCart()
        .then((serverItems) => {
          // Verify this response is still for the active user
          if (activeUserIdRef.current !== userId) return

          if (Array.isArray(serverItems)) {
            if (serverItems.length > 0) {
              setItems(serverItems)
              try {
                localStorage.setItem(key, JSON.stringify(serverItems))
              } catch {}
            } else if (localItems.length > 0) {
              // Local has items, sync to server
              syncUserCart(localItems).catch(() => {})
            }
          }
        })
        .catch((err) => {
          console.warn('Failed to load cart from server:', err)
        })
    }
  }, [userId])

  // Helper to persist changes both in user-scoped localStorage and Payload DB
  const persistItems = (newItems: CartItem[]) => {
    setItems(newItems)
    try {
      localStorage.setItem(currentKey, JSON.stringify(newItems))
    } catch {}

    if (userId) {
      syncUserCart(newItems).catch(() => {})
    }
  }

  const addToCart = (input: AddToCartInput) => {
    const id = input.id || input.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const price = typeof input.price === 'number' && !isNaN(input.price) ? input.price : 20000
    const imageUrl = input.imageUrl || '/images/prod1.jpg'
    const qtyToAdd = input.quantity && input.quantity > 0 ? input.quantity : 1

    const existingIndex = items.findIndex((i) => i.id === id || i.name === input.name)
    let updated: CartItem[]
    if (existingIndex > -1) {
      updated = [...items]
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + qtyToAdd,
      }
    } else {
      updated = [
        ...items,
        {
          id,
          name: input.name,
          price,
          imageUrl,
          quantity: qtyToAdd,
          variant: input.variant,
        },
      ]
    }
    persistItems(updated)
  }

  const removeFromCart = (id: string) => {
    const updated = items.filter((item) => item.id !== id)
    persistItems(updated)
  }

  const updateQuantity = (id: string, delta: number) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        const newQty = item.quantity + delta
        return {
          ...item,
          quantity: newQty < 1 ? 1 : newQty,
        }
      }
      return item
    })
    persistItems(updated)
  }

  const setQuantity = (id: string, qty: number) => {
    const updated = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: Math.max(1, qty),
        }
      }
      return item
    })
    persistItems(updated)
  }

  const clearCart = () => {
    persistItems([])
    if (userId) {
      clearUserCart().catch(() => {})
    }
  }

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0)
  }, [items])

  const shipping = 0 // Free Shipping across India

  const gst = useMemo(() => {
    return Math.round(subtotal * 0.18)
  }, [subtotal])

  const total = useMemo(() => {
    return subtotal + shipping + gst
  }, [subtotal, shipping, gst])

  const itemCount = useMemo(() => {
    return items.reduce((count, item) => count + (item.quantity || 1), 0)
  }, [items])

  const value = {
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
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
