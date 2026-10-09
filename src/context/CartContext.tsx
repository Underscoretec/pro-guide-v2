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

const GUEST_CART_KEY = 'proguide_cart_guest'
const getUserCartKey = (id: string | number) => `proguide_cart_user_${id}`

// Helper to merge guest cart items into an existing user cart
const mergeCartItems = (base: CartItem[], incoming: CartItem[]): CartItem[] => {
  if (!incoming || incoming.length === 0) return base || []
  if (!base || base.length === 0) return incoming

  const result = [...base]
  for (const item of incoming) {
    const idx = result.findIndex((r) => r.id === item.id || r.name === item.name)
    if (idx > -1) {
      result[idx] = {
        ...result[idx],
        quantity: (result[idx].quantity || 1) + (item.quantity || 1),
      }
    } else {
      result.push(item)
    }
  }
  return result
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
  const prevUserIdRef = useRef<string | null | undefined>(undefined)
  const activeUserIdRef = useRef<string | null>(userId)

  // Listen for user changes (login, logout, initial load)
  useEffect(() => {
    activeUserIdRef.current = userId
    const prevUserId = prevUserIdRef.current
    prevUserIdRef.current = userId

    // CASE 1: User explicitly logged out (was logged in with an ID, now userId is null)
    if (prevUserId !== undefined && prevUserId !== null && userId === null) {
      try {
        localStorage.removeItem(getUserCartKey(prevUserId))
        localStorage.removeItem(GUEST_CART_KEY)
      } catch {}
      setItems([])
      setIsHydrated(true)
      return
    }

    // CASE 2: Guest user (not logged in)
    if (!userId) {
      let guestItems: CartItem[] = []
      try {
        const stored = localStorage.getItem(GUEST_CART_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            guestItems = parsed
          }
        }
      } catch {}
      setItems(guestItems)
      setIsHydrated(true)
      return
    }

    // CASE 3: User is logged in
    const userKey = getUserCartKey(userId)

    // Check if there was an active guest cart to migrate/merge
    let guestItems: CartItem[] = []
    try {
      const guestStored = localStorage.getItem(GUEST_CART_KEY)
      if (guestStored) {
        const parsed = JSON.parse(guestStored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          guestItems = parsed
        }
      }
    } catch {}

    // Also check current items in memory if guestItems was already in state
    if (guestItems.length === 0 && items.length > 0 && prevUserId === null) {
      guestItems = items
    }

    // Read user's cached cart from localStorage
    let userLocalItems: CartItem[] = []
    try {
      const stored = localStorage.getItem(userKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed)) {
          userLocalItems = parsed
        }
      }
    } catch {}

    // Merge guest items with user local items immediately for instant UI
    const initialMerged = mergeCartItems(userLocalItems, guestItems)
    setItems(initialMerged)
    setIsHydrated(true)

    if (guestItems.length > 0) {
      // Save merged locally and clean guest cart so it doesn't merge multiple times
      try {
        localStorage.setItem(userKey, JSON.stringify(initialMerged))
        localStorage.removeItem(GUEST_CART_KEY)
      } catch {}
    }

    // Fetch authoritative user cart from database and merge
    getUserCart()
      .then((serverItems) => {
        if (activeUserIdRef.current !== userId) return

        const validServerItems = Array.isArray(serverItems) ? serverItems : []

        let finalMerged: CartItem[]
        if (validServerItems.length > 0) {
          // If server has items, merge them with any guest or locally cached items
          finalMerged = mergeCartItems(validServerItems, guestItems.length > 0 ? guestItems : initialMerged)
        } else {
          // If server is empty (e.g. brand new user), preserve the user/guest items
          finalMerged = initialMerged
        }

        setItems(finalMerged)

        try {
          localStorage.setItem(userKey, JSON.stringify(finalMerged))
          localStorage.removeItem(GUEST_CART_KEY)
        } catch {}

        // If we have items (from guest or local) and server was empty, or if guest items were merged: sync to DB
        if (finalMerged.length > 0 && (guestItems.length > 0 || validServerItems.length === 0)) {
          syncUserCart(finalMerged).catch(() => {})
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
      const key = getUserCartKey(userId)
      try {
        localStorage.setItem(key, JSON.stringify(newItems))
      } catch {}
      syncUserCart(newItems).catch(() => {})
    } else {
      try {
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(newItems))
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
        localStorage.removeItem(getUserCartKey(userId))
      } catch {}
      clearUserCart().catch(() => {})
    } else {
      try {
        localStorage.removeItem(GUEST_CART_KEY)
      } catch {}
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
