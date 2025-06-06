"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  isNew?: boolean
  badge?: string
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
  }

  return (
    <Card className="hover-card group overflow-hidden golden-border">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
          {(product.isNew || product.badge) && (
            <Badge className="absolute right-2 top-2 gradient-gold">
              {product.badge || (product.isNew ? "New" : "")}
            </Badge>
          )}
        </div>
      </Link>
      <CardHeader>
        <CardTitle className="line-clamp-1 group-hover:gradient-text transition-colors">{product.name}</CardTitle>
        <CardDescription className="line-clamp-2">{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold gradient-text">${product.price}</div>
          {product.originalPrice && (
            <div className="text-lg text-muted-foreground line-through">${product.originalPrice}</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={handleAddToCart} className="flex-1 gradient-gold text-primary-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="golden-border hover:gradient-gold hover:text-primary-foreground"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}

