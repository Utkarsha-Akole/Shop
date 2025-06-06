"use client"

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react"
import { Product } from "@/lib/products"

interface WishlistContextType {
  wishlist: string[]
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  wishlistProducts: Product[]
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([])

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  const saveWishlist = useCallback((newWishlist: string[]) => {
    localStorage.setItem("wishlist", JSON.stringify(newWishlist))
  }, [])

  const addToWishlist = useCallback((productId: string) => {
    setWishlist(prev => {
      const newWishlist = [...prev, productId]
      saveWishlist(newWishlist)
      return newWishlist
    })
  }, [saveWishlist])

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist(prev => {
      const newWishlist = prev.filter(id => id !== productId)
      saveWishlist(newWishlist)
      return newWishlist
    })
  }, [saveWishlist])

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.includes(productId)
  }, [wishlist])

  const clearWishlist = useCallback(() => {
    setWishlist([])
    localStorage.removeItem("wishlist")
  }, [])

  const wishlistProducts = wishlist.map(id => {
    // This is a placeholder - you'll need to implement getProductById
    return { id } as Product
  })

  const value = useMemo(() => ({
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistProducts,
  }), [wishlist, addToWishlist, removeFromWishlist, isInWishlist, clearWishlist, wishlistProducts])

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