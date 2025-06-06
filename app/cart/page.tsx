"use client"

import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { CheckoutForm } from "@/components/checkout-form"
import { motion } from "framer-motion"

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCart()
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
        <p className="text-lg text-gray-600 mb-8">Your cart is empty.</p>
        <Button 
          className="gradient-gold text-primary-foreground hover:scale-105 transition-transform"
          onClick={() => window.history.back()}
        >
          Continue Shopping
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-12 max-w-7xl"
    >
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Your Cart
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="rounded-lg border bg-card p-6 shadow-lg hover:shadow-xl transition-shadow"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4">Product</th>
                  <th className="text-center py-4">Quantity</th>
                  <th className="text-right py-4">Price</th>
                  <th className="text-right py-4">Total</th>
                  <th className="text-right py-4"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <motion.tr 
                    key={item.id} 
                    className="border-b hover:bg-gray-50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="py-6">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                        />
                        <div className="ml-6">
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-6">
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="hover:bg-gray-100 transition-colors"
                        >
                          -
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="hover:bg-gray-100 transition-colors"
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td className="py-6 text-right font-medium">${item.price.toFixed(2)}</td>
                    <td className="py-6 text-right font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-6 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                      >
                        Remove
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="rounded-lg border bg-card p-6 shadow-lg hover:shadow-xl transition-shadow sticky top-8"
          >
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Button
              className="w-full mt-8 gradient-gold text-primary-foreground hover:scale-105 transition-transform"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Proceed to Checkout
            </Button>
          </motion.div>
        </div>
      </div>

      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </motion.div>
  )
}

