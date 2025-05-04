"use client"

import { useState } from "react"
import { Check, Info, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SettingsPage() {
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [tradingDays, setTradingDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri"])
  const [coinbaseEnabled, setCoinbaseEnabled] = useState(false)
  const [selectedExchange, setSelectedExchange] = useState<string | null>(null)

  const handleSave = () => {
    // Simulate saving
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your trading preferences and connections</p>
      </div>

      <Tabs defaultValue="execution" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="execution">Execution</TabsTrigger>
          <TabsTrigger value="exchanges">Exchanges</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="execution">
          <Card>
            <CardHeader>
              <CardTitle>Execution Settings</CardTitle>
              <CardDescription>Configure how your strategies are executed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Execution Mode</Label>
                    <p className="text-sm text-muted-foreground">Choose how your strategies will be executed</p>
                  </div>
                </div>
                <RadioGroup defaultValue="signals">
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                    <RadioGroupItem value="signals" id="signals" />
                    <div className="flex-1">
                      <Label htmlFor="signals" className="font-medium">
                        Signal Only
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive trading signals without automatic execution
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                    <RadioGroupItem value="semi-auto" id="semi-auto" />
                    <div className="flex-1">
                      <Label htmlFor="semi-auto" className="font-medium">
                        Semi-Automated
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receive signals and confirm trades before execution
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                    <RadioGroupItem value="fully-auto" id="fully-auto" />
                    <div className="flex-1">
                      <Label htmlFor="fully-auto" className="font-medium">
                        Fully Automated
                      </Label>
                      <p className="text-sm text-muted-foreground">Automatically execute trades without confirmation</p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Trading Hours</Label>
                    <p className="text-sm text-muted-foreground">Set when your strategies can trade</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="trading-hours">Restrict Trading Hours</Label>
                    <p className="text-sm text-muted-foreground">Only trade during specific hours</p>
                  </div>
                  <Switch id="trading-hours" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input type="time" defaultValue="09:30" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input type="time" defaultValue="16:00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Trading Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
                      const isSelected = tradingDays.includes(day)
                      return (
                        <div
                          key={day}
                          className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full ${
                            isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                          onClick={() => {
                            if (isSelected) {
                              setTradingDays(tradingDays.filter((d) => d !== day))
                            } else {
                              setTradingDays([...tradingDays, day])
                            }
                          }}
                        >
                          {day}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                {saveSuccess ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="exchanges">
          <Card>
            <CardHeader>
              <CardTitle>Exchange Connections</CardTitle>
              <CardDescription>Connect to your trading exchanges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Exchange selector at the top */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Select Exchange</Label>
                    <p className="text-sm text-muted-foreground">Choose an exchange to configure</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Select
                    value={selectedExchange || ""}
                    onValueChange={(value) => {
                      setSelectedExchange(value)
                      if (value === "coinbase") {
                        setCoinbaseEnabled(true)
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select exchange" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="binance">Binance</SelectItem>
                      <SelectItem value="coinbase">Coinbase Pro</SelectItem>
                      <SelectItem value="kucoin">KuCoin</SelectItem>
                      <SelectItem value="bybit">Bybit</SelectItem>
                      <SelectItem value="ftx">FTX</SelectItem>
                      <SelectItem value="kraken">Kraken</SelectItem>
                      <SelectItem value="bitfinex">Bitfinex</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Binance section */}
              {(!selectedExchange || selectedExchange === "binance") && (
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
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="binance-api-key">API Key</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Your API key from Binance. Make sure it has the appropriate permissions.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input id="binance-api-key" type="password" placeholder="Enter your API key" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor="binance-api-secret">API Secret</Label>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="h-4 w-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">
                                Your API secret from Binance. This is kept secure and never shared.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Input id="binance-api-secret" type="password" placeholder="Enter your API secret" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Environment</Label>
                    <Select defaultValue="testnet">
                      <SelectTrigger>
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="testnet">Testnet (Paper Trading)</SelectItem>
                        <SelectItem value="mainnet">Mainnet (Live Trading)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Coinbase Pro section */}
              {(selectedExchange === "coinbase" || coinbaseEnabled) && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Coinbase Pro</Label>
                      <p className="text-sm text-muted-foreground">Connect to Coinbase Pro exchange</p>
                    </div>
                    <Switch id="coinbase-enabled" checked={coinbaseEnabled} onCheckedChange={setCoinbaseEnabled} />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="coinbase-api-key">API Key</Label>
                      <Input
                        id="coinbase-api-key"
                        type="password"
                        placeholder="Enter your API key"
                        disabled={!coinbaseEnabled}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="coinbase-api-secret">API Secret</Label>
                      <Input
                        id="coinbase-api-secret"
                        type="password"
                        placeholder="Enter your API secret"
                        disabled={!coinbaseEnabled}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Environment</Label>
                    <Select defaultValue="testnet" disabled={!coinbaseEnabled}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="testnet">Testnet (Paper Trading)</SelectItem>
                        <SelectItem value="mainnet">Mainnet (Live Trading)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Other exchanges */}
              {selectedExchange && !["binance", "coinbase"].includes(selectedExchange) && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">
                        {selectedExchange.charAt(0).toUpperCase() + selectedExchange.slice(1)}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Connect to {selectedExchange.charAt(0).toUpperCase() + selectedExchange.slice(1)} exchange
                      </p>
                    </div>
                    <Switch id={`${selectedExchange}-enabled`} />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`${selectedExchange}-api-key`}>API Key</Label>
                      <Input id={`${selectedExchange}-api-key`} type="password" placeholder="Enter your API key" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${selectedExchange}-api-secret`}>API Secret</Label>
                      <Input
                        id={`${selectedExchange}-api-secret`}
                        type="password"
                        placeholder="Enter your API secret"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Environment</Label>
                    <Select defaultValue="testnet">
                      <SelectTrigger>
                        <SelectValue placeholder="Select environment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="testnet">Testnet (Paper Trading)</SelectItem>
                        <SelectItem value="mainnet">Mainnet (Live Trading)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                {saveSuccess ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" defaultValue="user@example.com" />
                </div>
                <div className="space-y-2">
                  <Label>Notification Frequency</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Mobile Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your mobile device</p>
                  </div>
                  <Switch id="mobile-notifications" defaultChecked />
                </div>
                <div className="space-y-2">
                  <Label>Mobile Number</Label>
                  <Input type="tel" placeholder="+1 (555) 123-4567" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notification Types</Label>
                    <p className="text-sm text-muted-foreground">Select which events trigger notifications</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="trade-signals">Trade Signals</Label>
                    <Switch id="trade-signals" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="trade-execution">Trade Execution</Label>
                    <Switch id="trade-execution" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="strategy-performance">Strategy Performance</Label>
                    <Switch id="strategy-performance" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="account-activity">Account Activity</Label>
                    <Switch id="account-activity" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-updates">System Updates</Label>
                    <Switch id="system-updates" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                {saveSuccess ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Profile Information</Label>
                    <p className="text-sm text-muted-foreground">Update your personal information</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <Input type="email" defaultValue="user@example.com" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Password</Label>
                    <p className="text-sm text-muted-foreground">Update your password</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" placeholder="Enter your current password" />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>New Password</Label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label>Confirm New Password</Label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Preferences</Label>
                    <p className="text-sm text-muted-foreground">Customize your experience</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <Select defaultValue="utc-5">
                    <SelectTrigger>
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                {saveSuccess ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
