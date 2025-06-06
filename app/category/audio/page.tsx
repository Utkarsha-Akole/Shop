"use client"

import { useProducts } from "@/contexts/products-context"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Headphones, Filter, Search, Music, Volume2, Radio } from "lucide-react"
import { useState } from "react"

export default function AudioPage() {
  const { getPublicProducts } = useProducts()
  const audioProducts = getPublicProducts().filter((product) => product.category === "audio")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")

  const filteredProducts = audioProducts.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1
      default:
        return 0
    }
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Headphones className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold gradient-text">Audio</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experience premium sound with our collection of high-quality audio devices
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row gap-6 mb-8"
      >
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search audio products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {sortedProducts.map((product, index) => (
          <motion.div key={product.id} variants={itemVariants} custom={index}>
            <ProductCard product={product} />
          </motion.div>
        ))}
        {sortedProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12 text-muted-foreground"
          >
            No audio products found matching your criteria.
          </motion.div>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold mb-4 gradient-text">Why Choose Our Audio Products?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
          >
            <Music className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Premium Sound</h3>
            <p className="text-muted-foreground">Crystal clear audio with deep bass and crisp highs</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
          >
            <Volume2 className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Noise Cancellation</h3>
            <p className="text-muted-foreground">Advanced noise-canceling technology for immersive sound</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
          >
            <Radio className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wireless Freedom</h3>
            <p className="text-muted-foreground">Seamless wireless connectivity for ultimate convenience</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

