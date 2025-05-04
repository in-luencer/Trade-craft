import Link from "next/link"
import { ArrowLeft, ArrowRight, Check, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BacktestSatisfactionPage() {
  return (
    <div className="container max-w-md py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Backtest Results</h1>
        <p className="text-muted-foreground">Are you satisfied with the results?</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Moving Average Crossover Strategy</CardTitle>
          <CardDescription>Backtest completed successfully</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-muted p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p className="text-lg font-bold text-green-600">+18.5%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Win Rate</p>
                <p className="text-lg font-bold">68.5%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Trades</p>
                <p className="text-lg font-bold">54</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Max Drawdown</p>
                <p className="text-lg font-bold text-red-600">-12.3%</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium">Are you satisfied with these results?</p>
            <p className="text-sm text-muted-foreground">
              Choose whether to save this strategy or go back to make adjustments.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" asChild>
            <Link href="/dashboard">
              <Check className="mr-2 h-4 w-4" /> Yes, save this strategy
            </Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/builder">
              <Pencil className="mr-2 h-4 w-4" /> No, I need to make changes
            </Link>
          </Button>
          <div className="mt-4 flex w-full justify-between">
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
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
