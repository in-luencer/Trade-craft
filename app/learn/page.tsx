import Link from "next/link"
import { ArrowRight, BookOpen, Lightbulb, Play, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LearnPage() {
  return (
    <div className="container py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Learning Center</h1>
        <p className="text-muted-foreground">Expand your trading knowledge and skills</p>
      </div>

      <Tabs defaultValue="guides" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="tutorials">Video Tutorials</TabsTrigger>
          <TabsTrigger value="strategies">Strategy Library</TabsTrigger>
        </TabsList>
        <TabsContent value="guides" className="mt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started with TradeCraft</CardTitle>
                <CardDescription>Beginner Guide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>10 min read</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Learn the basics of creating and testing trading strategies with our platform.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/learn/getting-started">
                    Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Technical Analysis Fundamentals</CardTitle>
                <CardDescription>Intermediate Guide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>15 min read</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Understand the key concepts of technical analysis for better trading decisions.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/learn/technical-analysis">
                    Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Risk Management Essentials</CardTitle>
                <CardDescription>Advanced Guide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>20 min read</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Learn how to protect your capital with proper risk management techniques.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/learn/risk-management">
                    Read Guide <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tutorials" className="mt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Building Your First Strategy</CardTitle>
                <CardDescription>Video Tutorial</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
                  <Play className="h-10 w-10 text-primary" />
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <Play className="h-5 w-5 text-primary" />
                  <span>12:34</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/learn/videos/first-strategy">
                    Watch Tutorial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Backtesting Techniques</CardTitle>
                <CardDescription>Video Tutorial</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
                  <Play className="h-10 w-10 text-primary" />
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <Play className="h-5 w-5 text-primary" />
                  <span>18:45</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/learn/videos/advanced-backtesting">
                    Watch Tutorial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Optimizing Strategy Parameters</CardTitle>
                <CardDescription>Video Tutorial</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
                  <Play className="h-10 w-10 text-primary" />
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  <Play className="h-5 w-5 text-primary" />
                  <span>15:20</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/learn/videos/parameter-optimization">
                    Watch Tutorial <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="strategies" className="mt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Moving Average Crossover</CardTitle>
                <CardDescription>Trend Following Strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Popular Strategy</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  A classic strategy that uses two moving averages to identify trend changes.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/learn/strategies/ma-crossover">Learn More</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/builder?template=ma-crossover">Use Template</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>RSI Oscillator</CardTitle>
                <CardDescription>Mean Reversion Strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <span>Beginner Friendly</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Uses the Relative Strength Index to identify overbought and oversold conditions.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/learn/strategies/rsi-oscillator">Learn More</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/builder?template=rsi-oscillator">Use Template</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bollinger Band Breakout</CardTitle>
                <CardDescription>Volatility Strategy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Advanced Strategy</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Identifies potential breakouts using Bollinger Bands volatility indicator.
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/learn/strategies/bollinger-breakout">Learn More</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/builder?template=bollinger-breakout">Use Template</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
