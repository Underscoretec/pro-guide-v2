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

const clearAllLocalCartStorage = () => {
  if (typeof window === 'undefined') return
  try {
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k && (k.startsWith('proguide_cart') || k === 'cart')) {
        keysToRemove.push(k)
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k))
  } catch {}
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
  const activeUserIdRef = useRef<string | null>(userId)

  // Listen for user changes or logout events
  useEffect(() => {
    activeUserIdRef.current = userId

    if (!userId) {
      // User is logged out: wipe all cart data from localStorage and reset items to empty
      clearAllLocalCartStorage()
      setItems([])
      setIsHydrated(true)
      return
    }

    // A user is logged in
    const key = `proguide_cart_user_${userId}`

    // Reset items state first so no previous user items can ever be shown
    setItems([])

    // 1. Read only this specific user's cached cart from localStorage
    let userLocalItems: CartItem[] = []
    try {
      const stored = localStorage.getItem(key)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          userLocalItems = parsed
        }
      }
    } catch {}

    if (userLocalItems.length > 0) {
      setItems(userLocalItems)
    }
    setIsHydrated(true)

    // 2. Fetch authoritative cart from database for this user
    getUserCart()
      .then((serverItems) => {
        // Ensure this response is still for the current active user
        if (activeUserIdRef.current !== userId) return

        if (Array.isArray(serverItems)) {
          setItems(serverItems)
          try {
            localStorage.setItem(key, JSON.stringify(serverItems))
          } catch {}
        }
      })
      .catch((err) => {
        console.warn('Failed to load user cart:', err)
      })
  }, [userId])

  // Helper to persist changes both in user-scoped localStorage and Payload DB
  const persistItems = (newItems: CartItem[]) => {
    setItems(newItems)

    if (userId) {
      const key = `proguide_cart_user_${userId}`
      try {
        localStorage.setItem(key, JSON.stringify(newItems))
      } catch {}
      syncUserCart(newItems).catch(() => {})
    } else {
      try {
        localStorage.setItem('proguide_cart_guest', JSON.stringify(newItems))
      } catch {}
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
    setItems([])
    if (userId) {
      try {
        localStorage.removeItem(`proguide_cart_user_${userId}`)
      } catch {}
      clearUserCart().catch(() => {})
    } else {
      clearAllLocalCartStorage()
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
