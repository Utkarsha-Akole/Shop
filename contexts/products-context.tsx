"use client"

import { createContext, useContext, useState, useEffect } from "react"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  isNew: boolean
  features: ProductFeature[]
  specs: ProductSpec[]
  images: string[]
  addedByAdmin: boolean
}

export interface ProductFeature {
  id: string
  text: string
}

export interface ProductSpec {
  id: string
  key: string
  value: string
}

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  getPublicProducts: () => Product[]
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  // Initialize state from localStorage if available
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const savedProducts = localStorage.getItem("products")
      return savedProducts ? JSON.parse(savedProducts) : []
    }
    return []
  })

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])

  const addProduct = (product: Product) => {
    setProducts((prev) => [...prev, { ...product, addedByAdmin: true }])
  }

  const updateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...product, addedByAdmin: true } : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  const getPublicProducts = () => {
    return products.filter(product => product.addedByAdmin)
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, getPublicProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}

