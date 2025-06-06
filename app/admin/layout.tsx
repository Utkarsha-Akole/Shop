"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Menu, Package, Settings, LogOut, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [isAuthenticated, router, pathname])

  if (!isAuthenticated && pathname !== "/admin/login") {
    return null
  }

  if (pathname === "/admin/login") {
    return children
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 border-r border-amber-200/20 bg-card">
        <div className="flex w-full flex-col">
          <div className="p-6 border-b border-amber-200/20">
            <Link href="/admin" className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold gradient-text">TechHub</h1>
            </Link>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-2 px-4 py-3 text-sm rounded-md transition-colors
                  ${
                    pathname === link.href
                      ? "gradient-gold text-primary-foreground"
                      : "hover:bg-amber-50 hover:text-amber-900 dark:hover:bg-amber-900/20 dark:hover:text-amber-100"
                  }`}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.title}</span>
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-amber-200/20">
            <Button
              variant="outline"
              className="w-full justify-start border-amber-200/20 hover:gradient-gold hover:text-primary-foreground"
              onClick={() => {
                logout()
                router.push("/admin/login")
              }}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-amber-200/20 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <SheetHeader className="p-6 border-b border-amber-200/20">
                <SheetTitle asChild>
                  <Link
                    href="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2"
                  >
                    <h1 className="text-2xl font-bold gradient-text">TechHub</h1>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="space-y-1 p-4">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm rounded-md transition-colors
                      ${
                        pathname === link.href
                          ? "gradient-gold text-primary-foreground"
                          : "hover:bg-amber-50 hover:text-amber-900 dark:hover:bg-amber-900/20 dark:hover:text-amber-100"
                      }`}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.title}</span>
                  </Link>
                ))}
                <Button
                  variant="outline"
                  className="w-full justify-start mt-4 border-amber-200/20 hover:gradient-gold hover:text-primary-foreground"
                  onClick={() => {
                    logout()
                    router.push("/admin/login")
                  }}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-xl font-semibold gradient-text">
              {sidebarLinks.find((link) => link.href === pathname)?.title || "Admin Panel"}
            </h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="container p-4 md:p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

