import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BarChart4 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Strategy Marketplace",
  description: "Explore and purchase trading strategies from the marketplace",
}

export default function StrategyMarketplacePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Strategy Marketplace</h1>
        <p className="text-muted-foreground">Explore and purchase trading strategies from the marketplace</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Premium Moving Average Crossover</CardTitle>
            <CardDescription>A refined trend-following strategy with advanced features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <BarChart4 className="h-16 w-16 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              This premium strategy includes additional filters and risk management rules to enhance performance.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/builder?template=premium-ma-crossover">
                Purchase Strategy <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>RSI Momentum Strategy</CardTitle>
            <CardDescription>Identify overbought and oversold conditions effectively</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <BarChart4 className="h-16 w-16 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              This strategy uses RSI to pinpoint momentum shifts in the market.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/builder?template=rsi-momentum">
                Purchase Strategy <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>MACD Divergence Strategy</CardTitle>
            <CardDescription>Leverage MACD signals for trend reversals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <BarChart4 className="h-16 w-16 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              This strategy focuses on MACD divergence to identify potential reversals.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/builder?template=macd-divergence">
                Purchase Strategy <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="mt-2 w-full">
              <Link href="/details?strategy=macd-divergence">
                More Details <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Featured Strategies</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Volume Breakout Strategy</CardTitle>
              <CardDescription>Spot breakout opportunities with volume analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <BarChart4 className="h-16 w-16 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                This strategy uses volume spikes to identify breakout points.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/builder?template=volume-breakout">
                  Purchase Strategy <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="mt-2 w-full">
                <Link href="/details?strategy=volume-breakout">
                  More Details <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bollinger Band Strategy</CardTitle>
              <CardDescription>Trade volatility with Bollinger Bands</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-4">
                <BarChart4 className="h-16 w-16 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">
                This strategy uses Bollinger Bands to trade market volatility.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/builder?template=bollinger-band">
                  Purchase Strategy <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
