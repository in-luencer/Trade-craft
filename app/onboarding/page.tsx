import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function OnboardingPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to TradeCraft</h1>
        <p className="text-muted-foreground">Let's get to know your trading preferences</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>What type of trader are you?</CardTitle>
            <CardDescription>This helps us customize your experience</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="swing">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="day" id="day" />
                <Label htmlFor="day">Day Trader</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="swing" id="swing" />
                <Label htmlFor="swing">Swing Trader</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="position" id="position" />
                <Label htmlFor="position">Position Trader</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="scalper" id="scalper" />
                <Label htmlFor="scalper">Scalper</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What markets do you trade?</CardTitle>
            <CardDescription>Select all that apply</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="stocks" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="stocks">Stocks</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="forex" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="forex">Forex</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="crypto" className="h-4 w-4 rounded border-gray-300" defaultChecked />
                <Label htmlFor="crypto">Cryptocurrency</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="futures" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="futures">Futures</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="options" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="options">Options</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="commodities" className="h-4 w-4 rounded border-gray-300" />
                <Label htmlFor="commodities">Commodities</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What's your preferred trading style?</CardTitle>
            <CardDescription>Choose the approach that best matches your strategy</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="technical">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="technical" id="technical" />
                <Label htmlFor="technical">Technical Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fundamental" id="fundamental" />
                <Label htmlFor="fundamental">Fundamental Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid">Hybrid Approach</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="algorithmic" id="algorithmic" />
                <Label htmlFor="algorithmic">Algorithmic Trading</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button asChild>
            <Link href="/dashboard">
              Complete Setup <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
