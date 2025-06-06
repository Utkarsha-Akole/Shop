"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Search, Save, X, Upload } from "lucide-react"
import { useProducts, type Product, type ProductFeature, type ProductSpec } from "@/contexts/products-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  // State for features and specs
  const [features, setFeatures] = useState<ProductFeature[]>([])
  const [specs, setSpecs] = useState<ProductSpec[]>([])
  const [images, setImages] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")
  const [newSpecKey, setNewSpecKey] = useState("")
  const [newSpecValue, setNewSpecValue] = useState("")
  const [newImage, setNewImage] = useState("")

  // Reset form states when dialog opens/closes
  const handleDialogOpenChange = (open: boolean) => {
    if (open && editingProduct) {
      setFeatures(editingProduct.features || [])
      setSpecs(editingProduct.specs || [])
      setImages(editingProduct.images || [editingProduct.image])
    } else if (!open) {
      setEditingProduct(null)
      setFeatures([])
      setSpecs([])
      setImages([])
      setNewFeature("")
      setNewSpecKey("")
      setNewSpecValue("")
      setNewImage("")
    }
    setIsDialogOpen(open)
  }

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, { id: Math.random().toString(), text: newFeature.trim() }])
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (id: string) => {
    setFeatures(features.filter((f) => f.id !== id))
  }

  const handleAddSpec = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setSpecs([
        ...specs,
        {
          id: Math.random().toString(),
          key: newSpecKey.trim(),
          value: newSpecValue.trim(),
        },
      ])
      setNewSpecKey("")
      setNewSpecValue("")
    }
  }

  const handleRemoveSpec = (id: string) => {
    setSpecs(specs.filter((s) => s.id !== id))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          if (typeof reader.result === "string") {
            setImages((prev) => [...prev, reader.result])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleAddImage = () => {
    if (newImage.trim() && !images.includes(newImage)) {
      setImages([...images, newImage.trim()])
      setNewImage("")
    }
  }

  const handleRemoveImage = (image: string) => {
    setImages(images.filter((img) => img !== image))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    const formData = new FormData(form)
    const product = {
      id: editingProduct?.id || Math.random().toString(36).substr(2, 9),
      name: (formData.get("name") as string) || editingProduct?.name || "",
      description: (formData.get("description") as string) || editingProduct?.description || "",
      price: Number(formData.get("price")) || editingProduct?.price || 0,
      category: (formData.get("category") as string) || editingProduct?.category || "smartphones",
      image: images[0] || "/placeholder.svg",
      isNew: formData.get("isNew") === "on" || editingProduct?.isNew || false,
      features,
      specs,
      images: images.length > 0 ? images : ["/placeholder.svg"],
    }

    if (editingProduct) {
      updateProduct(product)
    } else {
      addProduct(product)
    }

    setIsDialogOpen(false)
    setEditingProduct(null)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id)
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[300px] golden-border"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto gradient-gold text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] p-0">
            <form ref={formRef} onSubmit={handleSubmit} className="overflow-hidden">
              <Tabs defaultValue="basic" className="w-full">
                <div className="p-6 border-b border-amber-200/20">
                  <DialogHeader>
                    <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                    <DialogDescription>
                      {editingProduct ? "Edit the product details below" : "Fill in the product details below"}
                    </DialogDescription>
                  </DialogHeader>
                </div>
                <div className="px-6 border-b border-amber-200/20 overflow-x-auto">
                  <TabsList className="inline-flex w-full sm:w-auto h-auto p-0 bg-transparent">
                    <TabsTrigger value="basic" className="px-4 py-2 -mb-px data-[state=active]:border-b-2">
                      Basic Info
                    </TabsTrigger>
                    <TabsTrigger value="features" className="px-4 py-2 -mb-px data-[state=active]:border-b-2">
                      Features
                    </TabsTrigger>
                    <TabsTrigger value="specs" className="px-4 py-2 -mb-px data-[state=active]:border-b-2">
                      Specifications
                    </TabsTrigger>
                    <TabsTrigger value="images" className="px-4 py-2 -mb-px data-[state=active]:border-b-2">
                      Images
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(100vh-20rem)]">
                  <TabsContent value="basic" className="space-y-4 mt-0">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input id="name" name="name" defaultValue={editingProduct?.name} className="golden-border" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          defaultValue={editingProduct?.price}
                          className="golden-border"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={editingProduct?.description}
                        className="golden-border"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" defaultValue={editingProduct?.category || "smartphones"}>
                          <SelectTrigger className="golden-border">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="smartphones">Smartphones</SelectItem>
                            <SelectItem value="laptops">Laptops</SelectItem>
                            <SelectItem value="audio">Audio</SelectItem>
                            <SelectItem value="accessories">Accessories</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2 pt-8">
                        <Switch id="isNew" name="isNew" defaultChecked={editingProduct?.isNew} />
                        <Label htmlFor="isNew">Mark as New</Label>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="features" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a feature..."
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          className="golden-border"
                        />
                        <Button
                          type="button"
                          onClick={handleAddFeature}
                          className="gradient-gold text-primary-foreground"
                        >
                          Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {features.map((feature) => (
                          <div key={feature.id} className="flex items-center gap-2">
                            <div className="flex-1 p-2 border rounded-md golden-border">{feature.text}</div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveFeature(feature.id)}
                              className="hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="specs" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Specification name..."
                          value={newSpecKey}
                          onChange={(e) => setNewSpecKey(e.target.value)}
                          className="golden-border"
                        />
                        <Input
                          placeholder="Specification value..."
                          value={newSpecValue}
                          onChange={(e) => setNewSpecValue(e.target.value)}
                          className="golden-border"
                        />
                        <Button type="button" onClick={handleAddSpec} className="gradient-gold text-primary-foreground">
                          Add
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {specs.map((spec) => (
                          <div key={spec.id} className="flex items-center gap-2">
                            <div className="flex-1 p-2 border rounded-md golden-border">
                              <span className="font-medium">{spec.key}:</span> {spec.value}
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveSpec(spec.id)}
                              className="hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="images" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Image URL..."
                          value={newImage}
                          onChange={(e) => setNewImage(e.target.value)}
                          className="golden-border"
                        />
                        <Button
                          type="button"
                          onClick={handleAddImage}
                          className="gradient-gold text-primary-foreground"
                        >
                          Add URL
                        </Button>
                      </div>
                      <div className="flex items-center gap-4">
                        <Label htmlFor="image-upload" className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 border rounded-md golden-border hover:border-amber-400/40">
                            <Upload className="h-4 w-4" />
                            <span>Upload Images</span>
                          </div>
                          <Input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </Label>
                        <span className="text-sm text-muted-foreground">or drag and drop</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Product image ${index + 1}`}
                              width={200}
                              height={200}
                              className="rounded-md object-cover w-full h-40"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveImage(image)}
                              className="absolute top-2 right-2 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </div>

                <div className="p-6 border-t border-amber-200/20">
                  <DialogFooter className="sm:justify-end">
                    <Button type="submit" className="w-full sm:w-auto gradient-gold text-primary-foreground">
                      <Save className="h-4 w-4 mr-2" />
                      {editingProduct ? "Save Changes" : "Add Product"}
                    </Button>
                  </DialogFooter>
                </div>
              </Tabs>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border golden-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="truncate">{product.name}</span>
                      <span className="md:hidden text-xs text-muted-foreground capitalize">{product.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell capitalize">{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {product.isNew && (
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                        New
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingProduct(product)
                          setFeatures(product.features || [])
                          setSpecs(product.specs || [])
                          setImages(product.images || [product.image])
                          setIsDialogOpen(true)
                        }}
                        className="hover:gradient-gold hover:text-primary-foreground"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                        className="hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

