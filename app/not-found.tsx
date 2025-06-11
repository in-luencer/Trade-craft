import Link from "next/link"
import { ArrowLeft, BarChart4, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="relative overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container relative mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            {/* Logo/Icon */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-primary/20 blur-xl" />
              <div className="relative rounded-full bg-primary/10 p-8">
                <BarChart4 className="h-16 w-16 text-primary" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h1 className="text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl">
                404
              </h1>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Page Not Found
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  Oops! The strategy you're looking for seems to have taken a different path. Let's get you back on track.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="outline" asChild className="gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button size="lg" asChild className="gap-2">
                <Link href="/marketplace">
                  <ArrowLeft className="h-4 w-4" />
                  Explore Strategies
                </Link>
              </Button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  )
} 