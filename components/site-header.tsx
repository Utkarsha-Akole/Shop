"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart, X } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  const { items } = useCart()
  //const [isSearchOpen, setIsSearchOpen] = useState(false)

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-200/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild className="mr-2 md:hidden">
            <Button variant="ghost" size="icon" className="shrink-0">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" onClick={handleLinkClick} className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold gradient-text">TechHub</h1>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Products</h4>
                <div className="grid grid-cols-1 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.title}
                      href={category.href}
                      onClick={handleLinkClick}
                      className="block rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {category.title}
                      <p className="text-xs text-muted-foreground">{category.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Brands</h4>
                <div className="grid grid-cols-1 gap-2">
                  {brandLinks.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="block rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.title}
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Support</h4>
                <div className="grid grid-cols-1 gap-2">
                  {supportLinks.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="block rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.title}
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" onClick={handleLinkClick} className="mr-6 flex items-center space-x-2">
          <h1 className="text-2xl font-bold gradient-text">TechHub</h1>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:gradient-text">Products</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {categories.map((category) => (
                    <li key={category.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={category.href}
                          onClick={handleLinkClick}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{category.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {category.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:gradient-text">Brands</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {brandLinks.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="hover:gradient-text">Support</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                  {supportLinks.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{item.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{item.description}</p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="relative flex w-full items-center md:w-auto">
            {/*isSearchOpen && (
              <div className="absolute left-0 right-0 top-0 z-50 flex h-16 -mx-4 px-4 md:static md:mx-0 md:h-auto md:px-0">
                <form
                  className="flex w-full items-center"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const searchQuery = (e.target as HTMLFormElement).search.value
                    if (searchQuery) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
                    }
                    setIsSearchOpen(false)
                  }}
                >
                  <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      name="search"
                      type="search"
                      placeholder="Search products..."
                      className="w-full appearance-none bg-background pl-8 golden-border"
                      autoFocus
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="ml-2 shrink-0 md:hidden"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close search</span>
                  </Button>
                </form>
              </div>
            )}*/}
            {/*<Button variant="ghost" size="icon" className="shrink-0 md:hidden" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>*/}
          </div>
          <ThemeToggle />
          <Link href="/cart" onClick={handleLinkClick}>
            <Button
              variant="outline"
              size="icon"
              className="relative golden-border hover:gradient-gold hover:text-primary-foreground"
            >
              <ShoppingCart className="h-4 w-4" />
              {items.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

const categories = [
  {
    title: "Smartphones",
    description: "Latest flagship and premium smartphones",
    href: "/category/smartphones",
  },
  {
    title: "Laptops",
    description: "High-performance laptops and notebooks",
    href: "/category/laptops",
  },
  {
    title: "Audio",
    description: "Premium headphones and audio devices",
    href: "/category/audio",
  },
  {
    title: "Accessories",
    description: "Essential electronics accessories",
    href: "/category/accessories",
  },
]

const brandLinks = [
  {
    title: "Apple",
    description: "iPhones, MacBooks, and more",
    href: "/brands/apple",
  },
  {
    title: "Samsung",
    description: "Galaxy phones and tablets",
    href: "/brands/samsung",
  },
  {
    title: "Sony",
    description: "Audio and gaming products",
    href: "/brands/sony",
  },
  {
    title: "Dell",
    description: "Laptops and computers",
    href: "/brands/dell",
  },
]

const supportLinks = [
  {
    title: "Contact",
    description: "Get in touch with our team",
    href: "/contact",
  },
  {
    title: "FAQs",
    description: "Frequently asked questions",
    href: "/faq",
  },
  {
    title: "Tech Support",
    description: "Product help and tutorials",
    href: "/support",
  },
  {
    title: "Returns",
    description: "Our return policy",
    href: "/returns",
  },
]

