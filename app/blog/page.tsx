import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata = {
  title: "Blog - Luxury Store",
  description: "Read the latest news and articles about luxury fashion, jewelry, and lifestyle.",
}

export default function BlogPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold gradient-text md:text-4xl">Our Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the latest trends, stories, and insights from the world of luxury.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="hover-card h-full">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription>{formatDate(post.date)}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-muted-foreground">{post.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

const blogPosts = [
  {
    title: "The Art of Luxury Watch Collecting",
    slug: "art-of-luxury-watch-collecting",
    date: "2024-01-20",
    image: "/placeholder.svg?height=400&width=600",
    excerpt:
      "Discover the fascinating world of luxury timepieces and learn what makes them valuable collectors' items.",
  },
  {
    title: "Sustainable Luxury: The Future of Fashion",
    slug: "sustainable-luxury-future-fashion",
    date: "2024-01-18",
    image: "/placeholder.svg?height=400&width=600",
    excerpt: "How luxury brands are embracing sustainability without compromising on quality and elegance.",
  },
  {
    title: "Investment Pieces: Luxury Items That Appreciate in Value",
    slug: "investment-pieces-luxury-items",
    date: "2024-01-15",
    image: "/placeholder.svg?height=400&width=600",
    excerpt: "A guide to investing in luxury items that can potentially increase in value over time.",
  },
  {
    title: "The Rise of Digital Luxury Retail",
    slug: "rise-digital-luxury-retail",
    date: "2024-01-12",
    image: "/placeholder.svg?height=400&width=600",
    excerpt: "How technology is transforming the luxury shopping experience in the digital age.",
  },
  {
    title: "Craftsmanship in Modern Luxury",
    slug: "craftsmanship-modern-luxury",
    date: "2024-01-10",
    image: "/placeholder.svg?height=400&width=600",
    excerpt: "Exploring the role of traditional craftsmanship in contemporary luxury goods.",
  },
  {
    title: "The Psychology of Luxury Consumption",
    slug: "psychology-luxury-consumption",
    date: "2024-01-08",
    image: "/placeholder.svg?height=400&width=600",
    excerpt: "Understanding the psychological factors that drive luxury purchasing decisions.",
  },
]

