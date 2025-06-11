import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BarChart4, Search, Filter, Star, TrendingUp, Shield, Zap, ChevronRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Strategy Marketplace",
  description: "Explore and purchase trading strategies from the marketplace",
}

export default function StrategyMarketplacePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container relative mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Strategy Marketplace
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                Discover, customize, and deploy professional trading strategies. Build your own or choose from our curated collection.
              </p>
            </div>
            <div className="flex w-full max-w-2xl items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search strategies..." 
                  className="h-12 pl-10 text-lg border-primary/20 focus:border-primary/40"
                />
              </div>
              <Button size="lg" className="h-12 px-6">
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Card className="border-primary/10 bg-primary/5 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Strategies</p>
                  <p className="text-2xl font-bold">1,234</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/10 bg-primary/5 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Top Rated</p>
                  <p className="text-2xl font-bold">4.8/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/10 bg-primary/5 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Verified Creators</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/10 bg-primary/5 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">5,678</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-72">
            <Card className="sticky top-4 border-primary/10 bg-primary/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Trend Following
                </Button>
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Zap className="mr-2 h-4 w-4" />
                  Momentum
                </Button>
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  <Shield className="mr-2 h-4 w-4" />
                  Risk Management
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Strategy Grid */}
          <div className="flex-1">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Featured Strategies</h2>
                <p className="text-muted-foreground">Handpicked strategies for optimal performance</p>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Strategy Cards */}
              <Card className="group overflow-hidden border-primary/10 bg-primary/5 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/10">
          <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
            <CardTitle>Premium Moving Average Crossover</CardTitle>
                        <Badge variant="secondary" className="bg-primary/10">Premium</Badge>
                      </div>
                      <CardDescription>A refined trend-following strategy</CardDescription>
                    </div>
                  </div>
          </CardHeader>
          <CardContent>
                  <div className="flex items-center justify-center py-6">
                    <BarChart4 className="h-20 w-20 text-primary group-hover:scale-110 transition-transform" />
            </div>
                  <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
                      Advanced trend-following strategy with enhanced risk management.
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <span className="text-sm">4.9 (128 reviews)</span>
                    </div>
                  </div>
          </CardContent>
                <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href={`/strategy/premium-ma-crossover`}>
                Purchase Strategy <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
                  <Button variant="outline" className="w-full">
                    <Link href={`/strategy/premium-ma-crossover`}>
                      View Details
                    </Link>
                  </Button>
          </CardFooter>
        </Card>

              {/* Additional Strategy Cards with similar styling */}
              <Card className="group overflow-hidden border-primary/10 bg-primary/5 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/10">
          <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
            <CardTitle>RSI Momentum Strategy</CardTitle>
                        <Badge variant="secondary" className="bg-primary/10">Popular</Badge>
                      </div>
                      <CardDescription>Advanced momentum detection</CardDescription>
                    </div>
                  </div>
          </CardHeader>
          <CardContent>
                  <div className="flex items-center justify-center py-6">
                    <BarChart4 className="h-20 w-20 text-primary group-hover:scale-110 transition-transform" />
            </div>
                  <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
                      Sophisticated RSI-based strategy for momentum trading.
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <span className="text-sm">4.8 (95 reviews)</span>
                    </div>
                  </div>
          </CardContent>
                <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href={`/strategy/rsi-momentum`}>
                Purchase Strategy <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
                  <Button variant="outline" className="w-full">
                    <Link href={`/strategy/rsi-momentum`}>
                      View Details
                    </Link>
                  </Button>
          </CardFooter>
        </Card>

              <Card className="group overflow-hidden border-primary/10 bg-primary/5 backdrop-blur-sm transition-all hover:shadow-lg hover:shadow-primary/10">
          <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
            <CardTitle>MACD Divergence Strategy</CardTitle>
                        <Badge variant="secondary" className="bg-primary/10">New</Badge>
                      </div>
                      <CardDescription>Professional trend reversal detection</CardDescription>
                    </div>
                  </div>
          </CardHeader>
          <CardContent>
                  <div className="flex items-center justify-center py-6">
                    <BarChart4 className="h-20 w-20 text-primary group-hover:scale-110 transition-transform" />
            </div>
                  <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
                      Advanced MACD divergence strategy for market reversals.
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <span className="text-sm">4.7 (64 reviews)</span>
                    </div>
                  </div>
          </CardContent>
                <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href={`/strategy/macd-divergence`}>
                Purchase Strategy <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
                  <Button variant="outline" className="w-full">
              <Link href={`/strategy/macd-divergence`}>
                View Details 
              </Link>
            </Button>
          </CardFooter>
        </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Premium CTA Section */}
      <div className="relative overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="container relative mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 inline-flex items-center rounded-full bg-primary/10 px-4 py-2">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Premium Feature</span>
              </div>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Create Your Own Strategy</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Don't see what you're looking for? Use our powerful strategy builder to create your own custom trading strategy.
            </p>
            <Button size="lg" asChild className="gap-2">
              <Link href="/builder">
                Start Building <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              </div>
        </div>
      </div>
    </div>
  )
}
