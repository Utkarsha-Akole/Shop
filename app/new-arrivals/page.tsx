"use client"

import { useProducts } from "@/contexts/products-context"
import { ProductCard } from "@/components/product-card"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function NewArrivalsPage() {
  const { getPublicProducts } = useProducts()
  const newProducts = getPublicProducts().filter((product) => product.isNew)

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
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold gradient-text">New Arrivals</h1>
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Be the first to discover our latest products and exclusive releases
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {newProducts.map((product, index) => (
          <motion.div key={product.id} variants={itemVariants} custom={index}>
            <ProductCard product={product} />
          </motion.div>
        ))}
        {newProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12 text-muted-foreground"
          >
            No new products available at the moment.
          </motion.div>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center"
      >
        <h2 className="text-2xl font-bold mb-4 gradient-text">Coming Soon</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Stay tuned for more exciting products coming your way. Subscribe to our newsletter to be the first to know!
        </p>
      </motion.div>
    </div>
  )
}

