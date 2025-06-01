import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BarChart4, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Strategy Templates",
  description: "Browse and use pre-built trading strategy templates",
}

export default function StrategiesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Strategy Templates</h1>
        <p className="text-muted-foreground">Browse and use pre-built trading strategy templates</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Moving Average Crossover</CardTitle>
            <CardDescription>A classic trend-following strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <TrendingUp className="h-16 w-16 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              This strategy generates buy signals when a faster moving average crosses above a slower moving average,
              and sell signals when it crosses below.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/builder?template=ma-crossover">
                Use Template <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>RSI Oscillator</CardTitle>
            <CardDescription>Mean-reversion strategy using RSI</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <BarChart4 className="h-16 w-16 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Buy when RSI is oversold (below 30) and sell when RSI is overbought (above 70). Works best in ranging
              markets.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/builder?template=rsi-oscillator">
                Use Template <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bollinger Band Breakout</CardTitle>
            <CardDescription>Volatility-based breakout strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <TrendingUp className="h-16 w-16 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Enter long when price breaks above the upper Bollinger Band and short when price breaks below the lower
              band.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/builder?template=bollinger-breakout">
                Use Template <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>MACD Momentum</CardTitle>
            <CardDescription>Trend and momentum strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <BarChart4 className="h-16 w-16 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Buy when MACD line crosses above the signal line and sell when it crosses below. Uses momentum to identify
              trend changes.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/builder?template=macd-momentum">
                Use Template <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Triple Moving Average</CardTitle>
            <CardDescription>Advanced trend-following strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <TrendingUp className="h-16 w-16 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Uses three moving averages of different periods to confirm trend direction and generate stronger signals
              than a simple crossover.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/builder?template=triple-ma">
                Use Template <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support & Resistance</CardTitle>
            <CardDescription>Price action based strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <BarChart4 className="h-16 w-16 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Identifies key support and resistance levels based on previous price action and generates signals when
              price bounces off these levels.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/builder?template=support-resistance">
                Use Template <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
