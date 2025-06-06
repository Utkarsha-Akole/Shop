"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProductUploadPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      setMessage({ type: "error", text: "Please upload an Excel file (.xlsx or .xls)" })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-products", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error uploading file")
      }

      setMessage({
        type: "success",
        text: data.message || "Products uploaded successfully",
      })
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Error uploading file",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Upload Products</CardTitle>
          <CardDescription>
            Upload your products using an Excel file. The file should have the following columns: id (optional), name,
            description, price, image, category, isNew
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6">
              <Upload className="h-8 w-8 mb-4 text-muted-foreground" />
              <Input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                disabled={loading}
                className="max-w-xs"
              />
              <p className="text-sm text-muted-foreground mt-2">Drag and drop or click to select a file</p>
            </div>

            {loading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}

            {message && (
              <Alert variant={message.type === "error" ? "destructive" : "default"}>
                <AlertTitle>{message.type === "success" ? "Success!" : "Error!"}</AlertTitle>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            <div className="mt-4">
              <h3 className="font-semibold mb-2">Excel File Format:</h3>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm">
                  {`id (optional) | name* | description* | price* | image | category | isNew
123         | Product 1 | Description | 99.99 | /url  | phones  | true`}
                </pre>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

