"use client"

import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock, Cog, Server } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function DeployPage() {
  const [selectedExchange, setSelectedExchange] = useState("binance")

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Deploy Strategy</h1>
        <p className="text-muted-foreground">Configure and deploy your strategy to live trading</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Deployment Configuration</CardTitle>
              <CardDescription>Set up how your strategy will run in live trading</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Exchange Selection</h3>
                <Select defaultValue="binance" onChange={(e) => setSelectedExchange(e.target.value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exchange" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="binance">Binance</SelectItem>
                    <SelectItem value="coinbase">Coinbase Pro</SelectItem>
                    <SelectItem value="kucoin">KuCoin</SelectItem>
                    <SelectItem value="bybit">Bybit</SelectItem>
                    <SelectItem value="ftx">FTX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {selectedExchange === "binance" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Binance</Label>
                      <p className="text-sm text-muted-foreground">Connect to Binance exchange</p>
                    </div>
                    <Switch id="binance-enabled" defaultChecked />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="binance-api-key">API Key</Label>
                      <Input id="binance-api-key" type="password" placeholder="Enter your API key" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="binance-api-secret">API Secret</Label>
                      <Input id="binance-api-secret" type="password" placeholder="Enter your API secret" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Trading Mode</Label>
                    <Select defaultValue="paper">
                      <SelectTrigger>
                        <SelectValue placeholder="Select trading mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paper">Paper Trading</SelectItem>
                        <SelectItem value="live">Live Trading</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {selectedExchange === "coinbase" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Coinbase Pro</Label>
                      <p className="text-sm text-muted-foreground">Connect to Coinbase Pro exchange</p>
                    </div>
                    <Switch id="coinbase-enabled" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="coinbase-api-key">API Key</Label>
                      <Input id="coinbase-api-key" type="password" placeholder="Enter your API key" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coinbase-api-secret">API Secret</Label>
                      <Input id="coinbase-api-secret" type="password" placeholder="Enter your API secret" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Trading Mode</Label>
                    <Select defaultValue="paper">
                      <SelectTrigger>
                        <SelectValue placeholder="Select trading mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paper">Paper Trading</SelectItem>
                        <SelectItem value="live">Live Trading</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="font-medium">Execution Settings</h3>
                <div className="space-y-2">
                  <Label>Order Type</Label>
                  <RadioGroup defaultValue="market">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="market" id="market" />
                      <Label htmlFor="market">Market Order</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="limit" id="limit" />
                      <Label htmlFor="limit">Limit Order</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initial-capital">Initial Capital</Label>
                    <Input id="initial-capital" type="number" defaultValue="10000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position-size">Position Size (%)</Label>
                    <Input id="position-size" type="number" defaultValue="2" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Monitoring & Alerts</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-alerts">Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive email notifications for trades</p>
                  </div>
                  <Switch id="email-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sms-alerts">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive SMS notifications for trades</p>
                  </div>
                  <Switch id="sms-alerts" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="daily-reports">Daily Reports</Label>
                    <p className="text-sm text-muted-foreground">Receive daily performance reports</p>
                  </div>
                  <Switch id="daily-reports" defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Schedule</h3>
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-restart">Auto Restart</Label>
                    <p className="text-sm text-muted-foreground">Automatically restart after errors</p>
                  </div>
                  <Switch id="auto-restart" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Deployment Summary</CardTitle>
              <CardDescription>Review your deployment settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Strategy</h3>
                <p className="text-sm text-muted-foreground">Moving Average Crossover</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Account Type</h3>
                <p className="text-sm text-muted-foreground">Paper Trading</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Initial Capital</h3>
                <p className="text-sm text-muted-foreground">$10,000.00</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Position Size</h3>
                <p className="text-sm text-muted-foreground">2% of equity per trade</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Alerts</h3>
                <p className="text-sm text-muted-foreground">Email, Daily Reports</p>
              </div>

              <div className="pt-4">
                <Button className="w-full">
                  <Server className="mr-2 h-4 w-4" /> Deploy Strategy
                </Button>
              </div>

              <div className="rounded-md bg-muted p-3">
                <div className="flex">
                  <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="text-sm font-medium">Deployment Time</h4>
                    <p className="text-xs text-muted-foreground">Deployment typically takes 2-5 minutes to complete.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-muted p-3">
                <div className="flex">
                  <Cog className="mr-2 h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="text-sm font-medium">Need Help?</h4>
                    <p className="text-xs text-muted-foreground">
                      Check our{" "}
                      <Link href="/learn/deployment" className="text-primary hover:underline">
                        deployment guide
                      </Link>{" "}
                      for more information.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="link" size="sm" asChild>
                <Link href="/backtest-results">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
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
