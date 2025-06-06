"use client"

import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import emailjs from '@emailjs/browser'
import { motion, AnimatePresence } from "framer-motion"

// Initialize EmailJS with your public key
emailjs.init("gLhWs6KLdVZvsVbjj")

interface CheckoutFormProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutForm({ isOpen, onClose }: CheckoutFormProps) {
  const { items } = useCart()
  const [customerName, setCustomerName] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [address, setAddress] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<"paypal" | "card" | "googlepay" | null>(null)
  const [mobileError, setMobileError] = useState("")

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const validateMobileNumber = (number: string) => {
    // Remove any non-digit characters
    const digitsOnly = number.replace(/\D/g, '')
    
    // Check if the number is exactly 10 digits
    if (digitsOnly.length !== 10) {
      setMobileError("Mobile number must be exactly 10 digits")
      return false
    }
    
    setMobileError("")
    return true
  }

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow digits
    const digitsOnly = value.replace(/\D/g, '')
    // Limit to 10 digits
    const truncated = digitsOnly.slice(0, 10)
    setMobileNumber(truncated)
    validateMobileNumber(truncated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate mobile number before submission
    if (!validateMobileNumber(mobileNumber)) {
      return
    }
    
    // Get payment URL based on selected method
    let paymentUrl = ""
    switch (selectedPayment) {
      case "paypal":
        paymentUrl = "https://www.paypal.com/checkoutnow?token=your_paypal_token"
        break
      case "card":
        paymentUrl = "https://checkout.stripe.com/pay/your_stripe_session_id"
        break
      case "googlepay":
        paymentUrl = "https://pay.google.com/gp/v/pay?token=your_google_pay_token"
        break
    }

    // First, open payment link in a new tab
    window.open(paymentUrl, '_blank')

    // Then, send email using EmailJS
    try {
      // Format items as a string for the template
      const itemsList = items.map(item => 
        `${item.name} - Quantity: ${item.quantity} - Price: $${item.price.toFixed(2)} - Subtotal: $${(item.price * item.quantity).toFixed(2)}`
      ).join('\n')

      await emailjs.send(
        'service_mumkdhw',
        'template_sv84xam',
        {
          to_name: 'Admin',
          from_name: customerName,
          customer_name: customerName,
          mobile_number: mobileNumber,
          delivery_address: address,
          order_items: itemsList,
          total_amount: `$${total.toFixed(2)}`,
          payment_method: selectedPayment?.toUpperCase() || 'Not Selected'
        }
      )
    } catch (error) {
      console.error('Error sending email:', error)
    }
    
    // Close the form
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">Checkout</DialogTitle>
        </DialogHeader>
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-6">
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Label htmlFor="name" className="text-lg">Full Name</Label>
              <Input
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="golden-border h-12 text-lg focus:ring-2 focus:ring-amber-500 transition-all"
                placeholder="Enter your full name"
              />
            </motion.div>
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Label htmlFor="mobile" className="text-lg">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                value={mobileNumber}
                onChange={handleMobileChange}
                required
                className={`golden-border h-12 text-lg focus:ring-2 focus:ring-amber-500 transition-all ${mobileError ? 'border-red-500' : ''}`}
                placeholder="Enter 10-digit mobile number"
                maxLength={10}
              />
              <AnimatePresence>
                {mobileError && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-red-500 mt-1"
                  >
                    {mobileError}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Label htmlFor="address" className="text-lg">Delivery Address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="golden-border min-h-[120px] text-lg focus:ring-2 focus:ring-amber-500 transition-all"
                placeholder="Enter your complete delivery address"
              />
            </motion.div>
          </div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-semibold text-lg">Select Payment Method</h3>
            <div className="grid grid-cols-3 gap-4">
              <Card
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedPayment === "paypal" ? "border-amber-500 shadow-lg" : ""
                }`}
                onClick={() => setSelectedPayment("paypal")}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">PayPal</CardTitle>
                </CardHeader>
              </Card>
              <Card
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedPayment === "card" ? "border-amber-500 shadow-lg" : ""
                }`}
                onClick={() => setSelectedPayment("card")}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Card</CardTitle>
                </CardHeader>
              </Card>
              <Card
                className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedPayment === "googlepay" ? "border-amber-500 shadow-lg" : ""
                }`}
                onClick={() => setSelectedPayment("googlepay")}
              >
                <CardHeader className="p-4">
                  <CardTitle className="text-sm">Google Pay</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </motion.div>

          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex justify-between text-xl font-semibold">
              <span>Total Amount:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-lg gradient-gold text-primary-foreground hover:scale-105 transition-transform"
              disabled={!selectedPayment || !!mobileError}
            >
              Proceed to Payment
            </Button>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
  )
} 