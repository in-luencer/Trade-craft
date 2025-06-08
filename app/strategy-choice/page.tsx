"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, BarChart4, Edit, Plus, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Strategy preview data
const strategyPreviews = {
  "ma-crossover": {
    title: "Moving Average Crossover",
    description:
      "A classic trend-following strategy that generates buy signals when a faster moving average crosses above a slower moving average, and sell signals when it crosses below.",
    logic:
      "Buy when: Fast MA (e.g., 20-period) crosses above Slow MA (e.g., 50-period)\nSell when: Fast MA crosses below Slow MA",
    indicators: ["SMA/EMA (Fast)", "SMA/EMA (Slow)"],
    difficulty: "Beginner",
    bestFor: "Trending markets with clear directional moves",
    image: "/placeholder.svg?height=200&width=400",
  },
  "rsi-oscillator": {
    title: "RSI Oscillator",
    description:
      "A mean-reversion strategy that uses the Relative Strength Index to identify overbought and oversold conditions in the market.",
    logic:
      "Buy when: RSI falls below 30 (oversold) and then rises back above 30\nSell when: RSI rises above 70 (overbought) and then falls back below 70",
    indicators: ["RSI (14-period)"],
    difficulty: "Beginner",
    bestFor: "Range-bound markets with regular price oscillations",
    image: "/placeholder.svg?height=200&width=400",
  },
  "bollinger-breakout": {
    title: "Bollinger Band Breakout",
    description:
      "A volatility-based strategy that identifies potential breakouts when price moves outside the Bollinger Bands.",
    logic:
      "Buy when: Price closes above the upper Bollinger Band\nSell when: Price closes below the lower Bollinger Band",
    indicators: ["Bollinger Bands (20-period, 2 standard deviations)"],
    difficulty: "Intermediate",
    bestFor: "Markets transitioning from low to high volatility",
    image: "/placeholder.svg?height=200&width=400",
  },
  "macd-momentum": {
    title: "MACD Momentum",
    description:
      "A trend and momentum strategy that uses the MACD indicator to identify potential trend reversals and momentum shifts.",
    logic: "Buy when: MACD line crosses above the Signal line\nSell when: MACD line crosses below the Signal line",
    indicators: ["MACD (12, 26, 9)"],
    difficulty: "Intermediate",
    bestFor: "Markets with strong trends and momentum",
    image: "/placeholder.svg?height=200&width=400",
  },
  "volume-spike": {
    title: "Volume Spike",
    description:
      "A volume-based strategy that identifies potential reversals or continuations based on significant spikes in trading volume.",
    logic:
      "Buy when: Volume exceeds the average volume by a certain threshold\nSell when: Volume drops below the average volume",
    indicators: ["Volume"],
    difficulty: "Intermediate",
    bestFor: "Markets with sudden changes in interest or activity",
    image: "/placeholder.svg?height=200&width=400",
  },
  ichimoku: {
    title: "Ichimoku Cloud",
    description:
      "A comprehensive strategy using the Ichimoku Cloud indicator for multiple signals including trend direction, support/resistance, and momentum.",
    logic:
      "Buy when: Price is above the cloud, Tenkan-sen crosses above Kijun-sen\nSell when: Price is below the cloud, Tenkan-sen crosses below Kijun-sen",
    indicators: ["Ichimoku Cloud (9, 26, 52)"],
    difficulty: "Advanced",
    bestFor: "Trending markets with clear directional bias",
    image: "/placeholder.svg?height=200&width=400",
  },
}

export default function StrategyChoicePage() {
  const router = useRouter()
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null)
  const [previewStrategy, setPreviewStrategy] = useState<string | null>(null)

  const handleStrategySelection = (templateId: string) => {
    // Redirect to builder with the selected template
    router.push(`/builder?template=${templateId}`)
  }

  const handleCreateCustom = () => {
    // Redirect to builder for a custom strategy
    router.push("/builder")
  }

  return (
    <div className="container py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Choose Your Strategy</h1>
        <p className="text-muted-foreground">Select a pre-built strategy or create your own</p>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="templates">Pre-built Templates</TabsTrigger>
          <TabsTrigger value="custom">Create Custom Strategy</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(strategyPreviews).map(([id, strategy]) => (
              <Card
                key={id}
                className={`cursor-pointer transition-all hover:border-primary hover:ring-2 hover:ring-primary/20 ${
                  selectedStrategy === id ? "border-primary ring-2 ring-primary/20" : ""
                }`}
                onClick={() => handleStrategySelection(id)}
              >
                <CardHeader>
                  <CardTitle>{strategy.title}</CardTitle>
                  <CardDescription>{strategy.description.split(".")[0] + "."}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    {id === "ma-crossover" || id === "bollinger-breakout" || id === "support-resistance" ? (
                      <TrendingUp className="h-5 w-5 text-primary" />
                    ) : (
                      <BarChart4 className="h-5 w-5 text-primary" />
                    )}
                    <span>
                      {id === "ma-crossover" || id === "rsi-oscillator"
                        ? "Beginner Friendly"
                        : id === "macd-momentum" || id === "bollinger-breakout"
                          ? "Intermediate"
                          : "Advanced Strategy"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{strategy.description}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex w-full items-center justify-between">
                    <span className="text-sm text-muted-foreground">Difficulty: {strategy.difficulty}</span>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            setPreviewStrategy(id)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>{strategy.title}</DialogTitle>
                          <DialogDescription>{strategy.description}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="rounded-md bg-muted p-4">
                            <h4 className="mb-2 font-medium">Strategy Logic:</h4>
                            <pre className="text-sm whitespace-pre-wrap">{strategy.logic}</pre>
                          </div>

                          <div>
                            <h4 className="mb-2 font-medium">Indicators Used:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {strategy.indicators.map((indicator, index) => (
                                <li key={index} className="text-sm">
                                  {indicator}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="mb-2 font-medium">Best For:</h4>
                            <p className="text-sm">{strategy.bestFor}</p>
                          </div>

                          <div className="mt-4">
                            <img
                              src={strategy.image || "/placeholder.svg"}
                              alt={`${strategy.title} chart example`}
                              className="rounded-md w-full h-auto"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                          </DialogClose>
                          <Button
                            onClick={() => {
                              handleStrategySelection(id)
                            }}
                          >
                            Use This Strategy
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Create Your Own Strategy</CardTitle>
              <CardDescription>Start from scratch and build a custom trading strategy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center space-y-4 py-12">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                  <Plus className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Build Your Strategy</h3>
                <p className="max-w-md text-center text-muted-foreground">
                  Create a custom trading strategy using our visual builder. Add indicators, entry/exit rules, and risk
                  management settings.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={handleCreateCustom}>
                Start Building <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
