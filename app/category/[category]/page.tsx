"use client"

import { useProducts } from "@/contexts/products-context"
import { ProductCard } from "@/components/product-card"

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { getPublicProducts } = useProducts()
  const categoryProducts = getPublicProducts().filter(
    (product) => product.category.toLowerCase() === params.category.toLowerCase(),
  )

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8 capitalize gradient-text">{params.category}</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {categoryProducts.length === 0 && (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  )
}

