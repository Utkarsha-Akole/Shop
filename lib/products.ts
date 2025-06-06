export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  isNew?: boolean
  isFeatured?: boolean
  isAdminAdded?: boolean
}

const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    description: "Latest Apple flagship with A17 Pro chip, titanium design, and advanced camera system",
    price: 1199,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=60",
    category: "smartphones",
    rating: 5,
    reviews: 128,
    isNew: true,
    isFeatured: true
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    description: "Samsung's premium flagship with S Pen, advanced AI features, and powerful camera system",
    price: 1199,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=60",
    category: "smartphones",
    rating: 4.8,
    reviews: 95,
    isNew: true,
    isFeatured: true
  },
  {
    id: "3",
    name: "MacBook Pro M3",
    description: "Powerful laptop with M3 chip, stunning display, and all-day battery life",
    price: 1999,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=60",
    category: "laptops",
    rating: 4.9,
    reviews: 156,
    isNew: true,
    isFeatured: true,
    isAdminAdded: true
  },
  {
    id: "4",
    name: "Dell XPS 15",
    description: "Premium Windows laptop with InfinityEdge display and powerful performance",
    price: 1799,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=60",
    category: "laptops",
    rating: 4.7,
    reviews: 89,
    isFeatured: true,
    isAdminAdded: true
  },
  {
    id: "5",
    name: "Sony WH-1000XM5",
    description: "Premium noise-cancelling headphones with exceptional sound quality",
    price: 399,
    originalPrice: 449,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=60",
    category: "audio",
    rating: 4.9,
    reviews: 234,
    isNew: true,
    isFeatured: true
  },
  {
    id: "6",
    name: "Apple AirPods Pro 2",
    description: "Wireless earbuds with active noise cancellation and spatial audio",
    price: 249,
    originalPrice: 279,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&auto=format&fit=crop&q=60",
    category: "audio",
    rating: 4.8,
    reviews: 189,
    isNew: true
  },
  {
    id: "7",
    name: "Apple Watch Series 9",
    description: "Latest smartwatch with advanced health features and always-on display",
    price: 399,
    originalPrice: 429,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=60",
    category: "accessories",
    rating: 4.7,
    reviews: 145,
    isNew: true,
    isFeatured: true
  },
  {
    id: "8",
    name: "Samsung Galaxy Watch 6",
    description: "Premium Android smartwatch with advanced health monitoring",
    price: 349,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=60",
    category: "accessories",
    rating: 4.6,
    reviews: 98,
    isNew: true
  }
]

export function getPublicProducts(): Product[] {
  return products
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.isFeatured)
}

export function getNewArrivals(): Product[] {
  return products.filter(product => product.isNew)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category)
}

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getAdminAddedProducts(): Product[] {
  return products.filter(product => product.isAdminAdded)
}

export function getAdminAddedProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category && product.isAdminAdded)
} 