import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Download, LineChart, Pencil, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BacktestResultsPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Backtest Results</h1>
        <p className="text-muted-foreground">Review the performance of your strategy</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Moving Average Crossover Strategy</CardTitle>
              <CardDescription>Backtest period: Jan 1, 2022 - Apr 23, 2023</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="performance">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="trades">Trades</TabsTrigger>
                  <TabsTrigger value="chart">Chart</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                </TabsList>
                <TabsContent value="performance" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">+$2,450.75</div>
                        <p className="text-xs text-muted-foreground">+24.51%</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-red-600">-$1,230.40</div>
                        <p className="text-xs text-muted-foreground">-12.30%</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">68.5%</div>
                        <p className="text-xs text-muted-foreground">37 of 54 trades</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Profit Factor</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">2.35</div>
                        <p className="text-xs text-muted-foreground">Gains / Losses</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1.85</div>
                        <p className="text-xs text-muted-foreground">Risk-adjusted return</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Trade</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">+$45.38</div>
                        <p className="text-xs text-muted-foreground">+0.45%</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                <TabsContent value="trades" className="mt-4">
                  <div className="rounded-md border">
                    <div className="w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead>
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Entry</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">Exit</th>
                            <th className="h-12 px-4 text-left align-middle font-medium">P/L</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">2023-01-05</td>
                            <td className="p-4 align-middle text-green-600">Long</td>
                            <td className="p-4 align-middle">$105.25</td>
                            <td className="p-4 align-middle">$112.40</td>
                            <td className="p-4 align-middle text-green-600">+$715.00</td>
                          </tr>
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">2023-01-12</td>
                            <td className="p-4 align-middle text-red-600">Short</td>
                            <td className="p-4 align-middle">$115.80</td>
                            <td className="p-4 align-middle">$110.25</td>
                            <td className="p-4 align-middle text-green-600">+$555.00</td>
                          </tr>
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">2023-01-20</td>
                            <td className="p-4 align-middle text-green-600">Long</td>
                            <td className="p-4 align-middle">$97.30</td>
                            <td className="p-4 align-middle">$109.75</td>
                            <td className="p-4 align-middle text-green-600">+$1,245.00</td>
                          </tr>
                          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <td className="p-4 align-middle">2023-01-29</td>
                            <td className="p-4 align-middle text-red-600">Short</td>
                            <td className="p-4 align-middle">$115.40</td>
                            <td className="p-4 align-middle">$118.75</td>
                            <td className="p-4 align-middle text-red-600">-$335.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="chart" className="mt-4">
                  <div className="h-[400px] rounded-md border bg-muted p-4">
                    <div className="flex h-full items-center justify-center">
                      <LineChart className="h-16 w-16 text-muted-foreground" />
                      <p className="ml-4 text-muted-foreground">Equity curve chart will appear here</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="analysis" className="mt-4 space-y-4">
                  <div>
                    <h3 className="font-medium">Strategy Strengths</h3>
                    <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                      <li>Strong performance in trending markets</li>
                      <li>Good risk-reward ratio (2.35)</li>
                      <li>Consistent win rate above 65%</li>
                      <li>Relatively low drawdown compared to returns</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium">Areas for Improvement</h3>
                    <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                      <li>Underperforms in choppy, sideways markets</li>
                      <li>Some false signals during high volatility periods</li>
                      <li>Consider adding volume filter to reduce false signals</li>
                      <li>Optimize take profit levels for better performance</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium">Optimization Suggestions</h3>
                    <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
                      <li>Test SMA periods between 15-25 for optimal performance</li>
                      <li>Consider adding ATR-based stop loss instead of fixed percentage</li>
                      <li>Test adding volume confirmation for entry signals</li>
                      <li>Consider trailing stop for capturing more profit in strong trends</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Are you satisfied with the results?</CardTitle>
              <CardDescription>Choose your next step</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <Link href="/deploy">
                  <Check className="mr-2 h-4 w-4" /> Yes, deploy this strategy
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/builder">
                  <Pencil className="mr-2 h-4 w-4" /> No, I need to make changes
                </Link>
              </Button>
              <div className="pt-4">
                <h3 className="mb-2 font-medium">Export & Share</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-4 w-4" /> Export
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="link" size="sm" asChild>
                <Link href="/backtest">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Backtest
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
