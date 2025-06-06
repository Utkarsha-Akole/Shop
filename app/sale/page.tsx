import { ProductCard } from "@/components/product-card"

const saleProducts = [
  {
    id: "s1",
    name: "Diamond Pendant Necklace",
    description: "18K white gold with brilliant-cut diamond",
    price: 1499.99,
    originalPrice: 2999.99,
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: "s2",
    name: "Luxury Leather Briefcase",
    description: "Hand-stitched Italian leather",
    price: 799.99,
    originalPrice: 1599.99,
    image: "/placeholder.svg?height=400&width=400",
  },
  // Add more sale products...
]

export default function SalePage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold gradient-text md:text-4xl">Special Offers</h1>
          <p className="mt-4 text-lg text-muted-foreground">Exclusive deals on luxury items for a limited time</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {saleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                badge: `${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

