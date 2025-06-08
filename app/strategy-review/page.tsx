import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Pencil, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StrategyReviewPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Strategy Review</h1>
        <p className="text-muted-foreground">Review your strategy before proceeding to backtesting</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Moving Average Crossover Strategy</CardTitle>
              <CardDescription>Created on April 23, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="summary">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="rules">Rules</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-medium">Strategy Description</h3>
                    <p className="text-sm text-muted-foreground">
                      A trend-following strategy that uses two moving averages to identify potential trend changes and
                      generate buy and sell signals.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Key Components</h3>
                    <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                      <li>Fast Moving Average (20-period SMA)</li>
                      <li>Slow Moving Average (50-period EMA)</li>
                      <li>RSI Filter (14-period)</li>
                      <li>2% Stop Loss</li>
                      <li>5% Take Profit</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium">Market & Timeframe</h3>
                    <p className="text-sm text-muted-foreground">BTC/USD, 1-Day timeframe</p>
                  </div>
                </TabsContent>
                <TabsContent value="rules" className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-medium">Entry Rules</h3>
                    <div className="mt-2 rounded-md bg-muted p-3">
                      <p className="text-sm">
                        <strong>Long Entry:</strong> When the fast MA (SMA 20) crosses above the slow MA (EMA 50) AND
                        RSI is above 40.
                      </p>
                      <p className="mt-2 text-sm">
                        <strong>Short Entry:</strong> When the fast MA (SMA 20) crosses below the slow MA (EMA 50) AND
                        RSI is below 60.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Exit Rules</h3>
                    <div className="mt-2 rounded-md bg-muted p-3">
                      <p className="text-sm">
                        <strong>Long Exit:</strong> When the fast MA crosses below the slow MA OR price hits take profit
                        (5%) OR stop loss (2%).
                      </p>
                      <p className="mt-2 text-sm">
                        <strong>Short Exit:</strong> When the fast MA crosses above the slow MA OR price hits take
                        profit (5%) OR stop loss (2%).
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">Risk Management</h3>
                    <div className="mt-2 rounded-md bg-muted p-3">
                      <p className="text-sm">
                        <strong>Position Size:</strong> 2% of account equity per trade
                      </p>
                      <p className="mt-2 text-sm">
                        <strong>Max Open Positions:</strong> 3
                      </p>
                      <p className="mt-2 text-sm">
                        <strong>Max Drawdown:</strong> 15%
                      </p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="code" className="mt-4">
                  <pre className="max-h-[400px] overflow-auto rounded-md bg-muted p-4 text-sm">
                    <code>{`// Moving Average Crossover Strategy
// A trend-following strategy using SMA and EMA crossovers

// Define Indicators
var sma20 = ta.sma(close, 20)
var ema50 = ta.ema(close, 50)
var rsi14 = ta.rsi(close, 14)

// Entry Long
IF (
  sma20 crosses above ema50 AND
  rsi14 > 40 [1d]
)
  ENTER LONG

// Entry Short
IF (
  sma20 crosses below ema50 AND
  rsi14 < 60 [1d]
)
  ENTER SHORT

// Exit Long
IF (
  sma20 crosses below ema50 [1d]
)
  EXIT LONG

// Exit Short
IF (
  sma20 crosses above ema50 [1d]
)
  EXIT SHORT

// Risk Management
// Stop Loss
SET_STOP_LOSS at percentage 2

// Take Profit
SET_TAKE_PROFIT at percentage 5

// Position Sizing
SET_POSITION_SIZE percentage of equity 2 WITH MAX_RISK 2%

// General Risk Settings
SET_MAX_OPEN_POSITIONS 3
SET_MAX_DRAWDOWN 15%`}</code>
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Are you satisfied with this strategy?</CardTitle>
              <CardDescription>Choose your next step</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <Link href="/backtest">
                  <Check className="mr-2 h-4 w-4" /> Yes, proceed to backtesting
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/builder">
                  <Pencil className="mr-2 h-4 w-4" /> No, I need to make changes
                </Link>
              </Button>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/strategies">
                  <X className="mr-2 h-4 w-4" /> Cancel and return to strategies
                </Link>
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="link" size="sm" asChild>
                <Link href="/builder">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Builder
                </Link>
              </Button>
              <Button variant="link" size="sm" asChild>
                <Link href="/dashboard">
                  Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
