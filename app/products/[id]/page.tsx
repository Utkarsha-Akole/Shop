"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Minus, Plus, Share2 } from "lucide-react"
import { useProducts } from "@/contexts/products-context"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductPage({ params }: { params: { id: string } }) {
  const { getPublicProducts } = useProducts()
  const product = getPublicProducts().find((p) => p.id === params.id)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()

  if (!product) {
    return (
      <div className="container py-32 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="text-muted-foreground mt-2">The product you're looking for doesn't exist.</p>
      </div>
    )
  }

  // Ensure we have an array of images, fallback to main image if no additional images
  const allImages = product.images?.length ? product.images : [product.image]

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    })
  }

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-amber-200/20">
            <Image
              src={allImages[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-lg border ${
                    selectedImage === index ? "border-amber-400" : "border-amber-200/20"
                  }`}
                >
                  <Image src={image} alt={`${product.name} - Image ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold md:text-4xl">{product.name}</h1>
            <div className="text-3xl font-bold gradient-text">${product.price}</div>
            <p className="text-lg text-muted-foreground">{product.description}</p>
          </div>

          <Separator className="border-amber-200/20" />

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="golden-border hover:gradient-gold hover:text-primary-foreground"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center text-lg">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="golden-border hover:gradient-gold hover:text-primary-foreground"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-4">
              <Button size="lg" className="flex-1 gradient-gold text-primary-foreground" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="golden-border hover:gradient-gold hover:text-primary-foreground"
              >
                <Heart className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="golden-border hover:gradient-gold hover:text-primary-foreground"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Features</h2>
              <ul className="list-disc list-inside space-y-2">
                {product.features.map((feature) => (
                  <li key={feature.id} className="text-muted-foreground">
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.specs && product.specs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Specifications</h2>
              <div className="grid gap-4">
                {product.specs.map((spec) => (
                  <div key={spec.id} className="flex justify-between border-b border-amber-200/20 pb-2">
                    <span className="text-muted-foreground">{spec.key}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

