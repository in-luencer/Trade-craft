"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  BarChart4,
  Bot,
  Clock,
  Edit,
  LineChart,
  Plus,
  Settings,
  TrendingDown,
  TrendingUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState("1m")

  return (
    <div className="container py-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, John! Here's an overview of your trading strategies.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" asChild>
            <Link href="/settings">
              <Settings className="mr-2 h-4 w-4" /> Settings
            </Link>
          </Button>
          <Button asChild>
            <Link href="/builder">
              <Plus className="mr-2 h-4 w-4" /> Create Strategy
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+2</span>
              <span className="ml-1">this month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Strategies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="mr-1 h-3 w-3" />
              <span>2 in development</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">68.5%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+5.2%</span>
              <span className="ml-1">vs. last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+18.5%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              <span className="text-red-500">-2.3%</span>
              <span className="ml-1">vs. last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Track your strategies' performance over time</CardDescription>
              </div>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1w">Last Week</SelectItem>
                  <SelectItem value="1m">Last Month</SelectItem>
                  <SelectItem value="3m">Last 3 Months</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] rounded-md bg-muted p-4">
              <div className="flex h-full items-center justify-center">
                <LineChart className="h-16 w-16 text-muted-foreground" />
                <p className="ml-4 text-muted-foreground">Performance chart will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="strategies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="strategies">My Strategies</TabsTrigger>
            <TabsTrigger value="signals">Recent Signals</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="strategies">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Moving Average Crossover</CardTitle>
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Active</div>
                  </div>
                  <CardDescription>Created 2 weeks ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="text-green-600">+12.4% in backtests</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    A simple strategy using SMA crossovers to identify trend changes.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="rounded-full bg-primary/10 px-2 py-1 text-xs">BTC/USD</div>
                    <div className="rounded-full bg-primary/10 px-2 py-1 text-xs">1D</div>
                    <div className="rounded-full bg-primary/10 px-2 py-1 text-xs">Trend Following</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/builder?id=1">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/backtest?id=1">Backtest</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>RSI Oscillator</CardTitle>
                    <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Active</div>
                  </div>
                  <CardDescription>Created 1 month ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="text-green-600">+8.7% in backtests</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Uses RSI to identify overbought and oversold conditions.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="rounded-full bg-primary/10 px-2 py-1 text-xs">ETH/USD</div>
                    <div className="rounded-full bg-primary/10 px-2 py-1 text-xs">4H</div>
                    <div className="rounded-full bg-primary/10 px-2 py-1 text-xs">Mean Reversion</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/builder?id=2">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/backtest?id=2">Backtest</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>MACD Strategy</CardTitle>
                    <div className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                      In Development
                    </div>
                  </div>
                  <CardDescription>Created 3 days ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <span className="text-yellow-600">Not backtested yet</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Uses MACD indicator to identify momentum changes.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="rounded-full bg-primary/10 px-2 py-1 text-xs">BTC/USD</div>
                    <div className="rounded-full bg-primary/10 px-2 py-1 text-xs">1H</div>
                    <div className="rounded-full bg-primary/10 px-2 py-1 text-xs">Momentum</div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/builder?id=3">
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/backtest?id=3">Backtest</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-6 flex justify-center">
              <Button variant="outline" asChild>
                <Link href="/strategies">
                  View All Strategies <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signals">
            <Card>
              <CardHeader>
                <CardTitle>Recent Trading Signals</CardTitle>
                <CardDescription>Signals generated by your active strategies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium">Date & Time</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Strategy</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Symbol</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Signal</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
                          <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">2023-04-23 14:32</td>
                          <td className="p-4 align-middle">Moving Average Crossover</td>
                          <td className="p-4 align-middle">BTC/USD</td>
                          <td className="p-4 align-middle text-green-600">Buy</td>
                          <td className="p-4 align-middle">$28,450.75</td>
                          <td className="p-4 align-middle">
                            <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                              Executed
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">2023-04-22 09:15</td>
                          <td className="p-4 align-middle">RSI Oscillator</td>
                          <td className="p-4 align-middle">ETH/USD</td>
                          <td className="p-4 align-middle text-red-600">Sell</td>
                          <td className="p-4 align-middle">$1,890.25</td>
                          <td className="p-4 align-middle">
                            <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                              Executed
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">2023-04-21 16:45</td>
                          <td className="p-4 align-middle">Moving Average Crossover</td>
                          <td className="p-4 align-middle">BTC/USD</td>
                          <td className="p-4 align-middle text-red-600">Sell</td>
                          <td className="p-4 align-middle">$27,980.50</td>
                          <td className="p-4 align-middle">
                            <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                              Executed
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">2023-04-20 11:20</td>
                          <td className="p-4 align-middle">RSI Oscillator</td>
                          <td className="p-4 align-middle">ETH/USD</td>
                          <td className="p-4 align-middle text-green-600">Buy</td>
                          <td className="p-4 align-middle">$1,845.75</td>
                          <td className="p-4 align-middle">
                            <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                              Executed
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent actions and system events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <BarChart4 className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Ran backtest on "Moving Average Crossover"</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Settings className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Updated parameters for "RSI Oscillator"</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Enabled automated trading for "Moving Average Crossover"</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Plus className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Created new strategy "MACD Strategy"</p>
                      <p className="text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Settings className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Connected Binance API</p>
                      <p className="text-xs text-muted-foreground">5 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
