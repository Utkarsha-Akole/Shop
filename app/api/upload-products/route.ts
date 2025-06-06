import { type NextRequest, NextResponse } from "next/server"
import * as XLSX from "xlsx"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Read the file buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Parse Excel file
    const workbook = XLSX.read(buffer, { type: "buffer" })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(worksheet)

    // Validate and transform the data
    const products = jsonData.map((row: any) => ({
      id: row.id?.toString() || Math.random().toString(36).substr(2, 9),
      name: row.name || "",
      description: row.description || "",
      price: Number.parseFloat(row.price) || 0,
      image: row.image || "/placeholder.svg",
      category: row.category || "uncategorized",
      isNew: row.isNew === "true" || false,
    }))

    // Here you would typically save to your database
    // For demo, we'll just return the processed data
    return NextResponse.json({
      success: true,
      products,
      message: `Successfully processed ${products.length} products`,
    })
  } catch (error) {
    console.error("Error processing file:", error)
    return NextResponse.json({ error: "Error processing file" }, { status: 500 })
  }
}

