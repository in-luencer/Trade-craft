"use client"

import type React from "react"
import { useEffect, useState } from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { ThemeProvider } from "@/components/theme-provider"
import { MobileNav } from "@/components/ui/mobile-nav"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Determine if the current route is an authenticated route
  useEffect(() => {
    const authenticatedRoutes = [
      "/dashboard",
      "/builder",
      "/backtest",
      "/strategies",
      "/settings",
      "/survey",
      "/strategy-choice",
      "/backtest-satisfaction",
    ]

    const isAuthRoute = authenticatedRoutes.some((route) => pathname?.startsWith(route))
    const isAuthPage = pathname === "/login" || pathname === "/signup"

    setIsAuthenticated(isAuthRoute && !isAuthPage)
  }, [pathname])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen">
        {/* Public header - only shown on public pages */}
        {!isAuthenticated && pathname !== "/login" && pathname !== "/signup" && (
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold">in_luencer</span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-sm font-medium transition-colors hover:text-foreground/80">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </header>
        )}

        {/* Authenticated header - only shown on authenticated pages */}
        {isAuthenticated && (
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 flex">
                <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
                  <span className="font-bold">in_luencer</span>
                </Link>
                <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
                  <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                    Dashboard
                  </Link>
                  <Link href="/strategies" className="transition-colors hover:text-foreground/80">
                    Strategies
                  </Link>
                  <Link href="/builder" className="transition-colors hover:text-foreground/80">
                    Builder
                  </Link>
                  <Link href="/backtest" className="transition-colors hover:text-foreground/80">
                    Backtest
                  </Link>
                  <Link href="/settings" className="transition-colors hover:text-foreground/80">
                    Settings
                  </Link>
                </nav>
              </div>
              <div className="flex-1 md:hidden">
                <MobileNav />
              </div>
            </div>
          </header>
        )}

        {children}
      </div>
    </ThemeProvider>
  )
}
