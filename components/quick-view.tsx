"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ShoppingCart, Heart, Star } from "lucide-react"
import { Product } from "@/lib/products"

interface QuickViewProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  onAddToWishlist: (productId: string) => void
  isInWishlist: boolean
}

export function QuickView({ product, isOpen, onClose, onAddToWishlist, isInWishlist }: QuickViewProps) {
  const [selectedImage, setSelectedImage] = useState(product.image)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-background rounded-xl shadow-lg z-50 overflow-hidden"
          >
            <div className="relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                {/* Image section */}
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product details */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < product.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-muted-foreground">{product.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <Button className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onAddToWishlist(product.id)}
                        className="p-2"
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            isInWishlist
                              ? "fill-red-500 text-red-500"
                              : "text-gray-600"
                          }`}
                        />
                      </Button>
                    </div>
                  </div>

                  {/* Additional details */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Product Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category</span>
                        <p className="font-medium capitalize">{product.category}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Rating</span>
                        <p className="font-medium">{product.rating}/5</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 