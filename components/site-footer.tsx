"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "./ui/button"

export function SiteFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Shop</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.title}>
                  <Link href={category.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Legal</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              // Add newsletter subscription logic here
              const email = (e.target as HTMLFormElement).email.value
              console.log("Newsletter subscription:", email)
            }}
          >
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
              />
              <Button type="submit" className="gradient-gold text-primary-foreground">
                Subscribe
              </Button>
            </div>
          </form>
          <div className="mt-4 flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground">© 2024 Store. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://instagram.com"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://facebook.com"
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const categories = [
  {
    title: "Smartphones",
    href: "/category/smartphones",
  },
  {
    title: "Laptops",
    href: "/category/laptops",
  },
  {
    title: "Audio",
    href: "/category/audio",
  },
  {
    title: "Accessories",
    href: "/category/accessories",
  },
  {
    title: "New Arrivals",
    href: "/new-arrivals",
  },
  {
    title: "Sale",
    href: "/sale",
  },
]

const companyLinks = [
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Careers",
    href: "/careers",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Press",
    href: "/press",
  },
]

const supportLinks = [
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "FAQs",
    href: "/faq",
  },
  {
    title: "Shipping",
    href: "/shipping",
  },
  {
    title: "Returns",
    href: "/returns",
  },
]

const legalLinks = [
  {
    title: "Privacy Policy",
    href: "/privacy",
  },
  {
    title: "Terms of Service",
    href: "/terms",
  },
]

