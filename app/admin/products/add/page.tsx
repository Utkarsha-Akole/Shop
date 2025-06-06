"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  isNew: boolean
}

export default function AddProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string>("")

  const handlePaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      // Get the pasted text
      const text = e.target.value

      // Split into rows
      const rows = text.split("\n").filter((row) => row.trim())

      // Process each row
      const processedProducts = rows.map((row, index) => {
        const [id, name, description, price, image, category, isNew] = row.split("\t")

        if (!name || !description || !price) {
          throw new Error(`Row ${index + 1}: Missing required fields (name, description, or price)`)
        }

        return {
          id: id || Math.random().toString(36).substr(2, 9),
          name: name.trim(),
          description: description.trim(),
          price: Number.parseFloat(price) || 0,
          image: image?.trim() || "/placeholder.svg",
          category: category?.trim() || "uncategorized",
          isNew: isNew === "true",
        }
      })

      setProducts(processedProducts)
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error processing data")
    }
  }

  const handleSave = () => {
    // Here you would typically save to your database
    console.log("Products to save:", products)
    alert("Products saved successfully! Check console for data.")
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">Add Products from Excel</h1>
          <p className="text-muted-foreground mb-4">
            1. Open your Excel sheet
            <br />
            2. Select and copy your data (including headers)
            <br />
            3. Paste it into the text area below
          </p>
        </div>

        <div className="space-y-4">
          <Textarea
            className="min-h-[200px] font-mono"
            placeholder={`id\tname\tdescription\tprice\timage\tcategory\tisNew
1\tiPhone 15 Pro\tLatest iPhone model\t999.99\t/placeholder.svg\tsmartphones\ttrue
2\tMacBook Air\tM2 Chip laptop\t1299.99\t/placeholder.svg\tlaptops\ttrue`}
            onChange={handlePaste}
          />

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {products.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Preview ({products.length} products)</h2>
                <Button onClick={handleSave} className="gradient-gold text-primary-foreground">
                  Save Products
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <p className="text-sm text-muted-foreground">
            Your Excel sheet should have these columns in order:
            <br />- id (optional): Product ID
            <br />- name (required): Product name
            <br />- description (required): Product description
            <br />- price (required): Product price (numbers only)
            <br />- image (optional): Image URL or path (defaults to placeholder)
            <br />- category (optional): Product category
            <br />- isNew (optional): true or false
          </p>
        </div>
      </div>
    </div>
  )
}

