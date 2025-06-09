"use client"

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import { Product } from "@/types"

interface WishlistContextType {
  wishlist: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  const saveWishlist = useCallback((newWishlist: Product[]) => {
    localStorage.setItem("wishlist", JSON.stringify(newWishlist))
  }, [])

  const addToWishlist = useCallback((product: Product) => {
    setWishlist(prev => {
      if (!prev.some(item => item.id === product.id)) {
        const newWishlist = [...prev, product]
        saveWishlist(newWishlist)
        return newWishlist
      }
      return prev
    })
  }, [saveWishlist])

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist(prev => {
      const newWishlist = prev.filter(item => item.id !== productId)
      saveWishlist(newWishlist)
      return newWishlist
    })
  }, [saveWishlist])

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some(item => item.id === productId)
  }, [wishlist])

  const clearWishlist = useCallback(() => {
    setWishlist([])
    localStorage.removeItem("wishlist")
  }, [])

  const value = useMemo(() => ({
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist
  }), [wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist])

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
} 