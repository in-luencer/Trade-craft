"use client"

import { useState } from "react"
import { Info, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Risk Rule Types
export type StopLossRule = {
  id: string
  type: "fixed" | "percentage" | "atr" | "volatility" | "equity" | "support" | "swing" | "chandelier" | "custom"
  value: string
  atrPeriod?: string
  atrMultiplier?: string
  lookbackPeriod?: string
  enabled: boolean
}

export type TakeProfitRule = {
  id: string
  type: "fixed" | "percentage" | "atr" | "volatility" | "equity" | "resistance" | "risk-reward" | "trailing" | "custom"
  value: string
  atrPeriod?: string
  atrMultiplier?: string
  riskRewardRatio?: string
  lookbackPeriod?: string
  enabled: boolean
}

export type TrailingStopRule = {
  id: string
  type: "fixed" | "percentage" | "atr" | "volatility" | "parabolic" | "moving-average" | "custom"
  value: string
  activationThreshold?: string
  atrPeriod?: string
  atrMultiplier?: string
  accelerationFactor?: string
  maxAcceleration?: string
  maType?: "sma" | "ema" | "wma"
  maPeriod?: string
  enabled: boolean
}

export type PositionSizingRule = {
  id: string
  type:
    | "fixed"
    | "percentage"
    | "risk-reward"
    | "kelly"
    | "optimal-f"
    | "martingale"
    | "anti-martingale"
    | "volatility-based"
    | "custom"
  value: string
  maxRisk: string
  equityPercentage?: string
  riskPerTrade?: string
  winRate?: string
  payoffRatio?: string
  optimalFraction?: string
  volatilityPeriod?: string
  volatilityMultiplier?: string
  martingaleFactor?: string
  customFormula?: string
  enabled: boolean
}

export type TimeExitRule = {
  id: string
  type: "bars" | "time" | "date" | "session-end" | "custom"
  value: string
  enabled: boolean
}

export type RiskManagementConfig = {
  stopLoss: StopLossRule[]
  takeProfit: TakeProfitRule[]
  trailingStop: TrailingStopRule[]
  positionSizing: PositionSizingRule[]
  timeExit: TimeExitRule[]
  maxOpenPositions: number
  maxDrawdown: number
  maxDailyLoss: number
  maxConsecutiveLosses: number
  profitTarget: number
  riskRewardMinimum: number
  pyramiding: number
}

interface RiskManagementProps {
  config: RiskManagementConfig
  onChange: (config: RiskManagementConfig) => void
}

export default function RiskManagement({ config, onChange }: RiskManagementProps) {
  const [activeTab, setActiveTab] = useState("basic")

  const updateConfig = (newConfig: Partial<RiskManagementConfig>) => {
    onChange({ ...config, ...newConfig })
  }

  // Stop Loss Rules
  const addStopLossRule = () => {
    const newRule: StopLossRule = {
      id: `sl-${Date.now()}`,
      type: "percentage",
      value: "2",
      enabled: true,
    }
    updateConfig({ stopLoss: [...config.stopLoss, newRule] })
  }

  const updateStopLossRule = (id: string, updates: Partial<StopLossRule>) => {
    updateConfig({
      stopLoss: config.stopLoss.map((rule) => (rule.id === id ? { ...rule, ...updates } : rule)),
    })
  }

  const removeStopLossRule = (id: string) => {
    updateConfig({
      stopLoss: config.stopLoss.filter((rule) => rule.id !== id),
    })
  }

  // Take Profit Rules
  const addTakeProfitRule = () => {
    const newRule: TakeProfitRule = {
      id: `tp-${Date.now()}`,
      type: "percentage",
      value: "5",
      enabled: true,
    }
    updateConfig({ takeProfit: [...config.takeProfit, newRule] })
  }

  const updateTakeProfitRule = (id: string, updates: Partial<TakeProfitRule>) => {
    updateConfig({
      takeProfit: config.takeProfit.map((rule) => (rule.id === id ? { ...rule, ...updates } : rule)),
    })
  }

  const removeTakeProfitRule = (id: string) => {
    updateConfig({
      takeProfit: config.takeProfit.filter((rule) => rule.id !== id),
    })
  }

  // Trailing Stop Rules
  const addTrailingStopRule = () => {
    const newRule: TrailingStopRule = {
      id: `ts-${Date.now()}`,
      type: "percentage",
      value: "1.5",
      enabled: true,
    }
    updateConfig({ trailingStop: [...config.trailingStop, newRule] })
  }

  const updateTrailingStopRule = (id: string, updates: Partial<TrailingStopRule>) => {
    updateConfig({
      trailingStop: config.trailingStop.map((rule) => (rule.id === id ? { ...rule, ...updates } : rule)),
    })
  }

  const removeTrailingStopRule = (id: string) => {
    updateConfig({
      trailingStop: config.trailingStop.filter((rule) => rule.id !== id),
    })
  }

  // Time Exit Rules
  const addTimeExitRule = () => {
    const newRule: TimeExitRule = {
      id: `te-${Date.now()}`,
      type: "bars",
      value: "20",
      enabled: true,
    }
    updateConfig({ timeExit: [...config.timeExit, newRule] })
  }

  const updateTimeExitRule = (id: string, updates: Partial<TimeExitRule>) => {
    updateConfig({
      timeExit: config.timeExit.map((rule) => (rule.id === id ? { ...rule, ...updates } : rule)),
    })
  }

  const removeTimeExitRule = (id: string) => {
    updateConfig({
      timeExit: config.timeExit.filter((rule) => rule.id !== id),
    })
  }

  // Position Sizing Rules
  const addPositionSizingRule = () => {
    const newRule: PositionSizingRule = {
      id: `ps-${Date.now()}`,
      type: "percentage",
      value: "2",
      maxRisk: "2",
      enabled: true,
    }
    updateConfig({ positionSizing: [...config.positionSizing, newRule] })
  }

  const updatePositionSizingRule = (id: string, updates: Partial<PositionSizingRule>) => {
    updateConfig({
      positionSizing: config.positionSizing.map((rule) => (rule.id === id ? { ...rule, ...updates } : rule)),
    })
  }

  const removePositionSizingRule = (id: string) => {
    updateConfig({
      positionSizing: config.positionSizing.filter((rule) => rule.id !== id),
    })
  }

  // Render additional fields based on stop loss type
  const renderStopLossFields = (rule: StopLossRule) => {
    switch (rule.type) {
      case "atr":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>ATR Period</Label>
              <Input
                type="number"
                value={rule.atrPeriod || "14"}
                onChange={(e) => updateStopLossRule(rule.id, { atrPeriod: e.target.value })}
                min="1"
                step="1"
              />
            </div>
            <div className="space-y-2">
              <Label>ATR Multiplier</Label>
              <Input
                type="number"
                value={rule.atrMultiplier || "2"}
                onChange={(e) => updateStopLossRule(rule.id, { atrMultiplier: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        )
      case "volatility":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Lookback Period</Label>
              <Input
                type="number"
                value={rule.lookbackPeriod || "20"}
                onChange={(e) => updateStopLossRule(rule.id, { lookbackPeriod: e.target.value })}
                min="1"
                step="1"
              />
            </div>
            <div className="space-y-2">
              <Label>Multiplier</Label>
              <Input
                type="number"
                value={rule.atrMultiplier || "2"}
                onChange={(e) => updateStopLossRule(rule.id, { atrMultiplier: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        )
      case "swing":
        return (
          <div className="space-y-2 mt-4">
            <Label>Lookback Bars</Label>
            <Input
              type="number"
              value={rule.lookbackPeriod || "10"}
              onChange={(e) => updateStopLossRule(rule.id, { lookbackPeriod: e.target.value })}
              min="1"
              step="1"
            />
          </div>
        )
      case "chandelier":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>ATR Period</Label>
              <Input
                type="number"
                value={rule.atrPeriod || "22"}
                onChange={(e) => updateStopLossRule(rule.id, { atrPeriod: e.target.value })}
                min="1"
                step="1"
              />
            </div>
            <div className="space-y-2">
              <Label>Multiplier</Label>
              <Input
                type="number"
                value={rule.atrMultiplier || "3"}
                onChange={(e) => updateStopLossRule(rule.id, { atrMultiplier: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Render additional fields based on take profit type
  const renderTakeProfitFields = (rule: TakeProfitRule) => {
    switch (rule.type) {
      case "atr":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>ATR Period</Label>
              <Input
                type="number"
                value={rule.atrPeriod || "14"}
                onChange={(e) => updateTakeProfitRule(rule.id, { atrPeriod: e.target.value })}
                min="1"
                step="1"
              />
            </div>
            <div className="space-y-2">
              <Label>ATR Multiplier</Label>
              <Input
                type="number"
                value={rule.atrMultiplier || "3"}
                onChange={(e) => updateTakeProfitRule(rule.id, { atrMultiplier: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        )
      case "risk-reward":
        return (
          <div className="space-y-2 mt-4">
            <Label>Risk-Reward Ratio</Label>
            <Input
              type="number"
              value={rule.riskRewardRatio || "2"}
              onChange={(e) => updateTakeProfitRule(rule.id, { riskRewardRatio: e.target.value })}
              min="0.1"
              step="0.1"
            />
          </div>
        )
      case "resistance":
        return (
          <div className="space-y-2 mt-4">
            <Label>Lookback Bars</Label>
            <Input
              type="number"
              value={rule.lookbackPeriod || "20"}
              onChange={(e) => updateTakeProfitRule(rule.id, { lookbackPeriod: e.target.value })}
              min="1"
              step="1"
            />
          </div>
        )
      default:
        return null
    }
  }

  // Render additional fields based on trailing stop type
  const renderTrailingStopFields = (rule: TrailingStopRule) => {
    switch (rule.type) {
      case "atr":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>ATR Period</Label>
              <Input
                type="number"
                value={rule.atrPeriod || "14"}
                onChange={(e) => updateTrailingStopRule(rule.id, { atrPeriod: e.target.value })}
                min="1"
                step="1"
              />
            </div>
            <div className="space-y-2">
              <Label>ATR Multiplier</Label>
              <Input
                type="number"
                value={rule.atrMultiplier || "2"}
                onChange={(e) => updateTrailingStopRule(rule.id, { atrMultiplier: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label>Activation Threshold (%)</Label>
              <Input
                type="number"
                value={rule.activationThreshold || "1"}
                onChange={(e) => updateTrailingStopRule(rule.id, { activationThreshold: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        )
      case "parabolic":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Acceleration Factor</Label>
              <Input
                type="number"
                value={rule.accelerationFactor || "0.02"}
                onChange={(e) => updateTrailingStopRule(rule.id, { accelerationFactor: e.target.value })}
                min="0.01"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label>Max Acceleration</Label>
              <Input
                type="number"
                value={rule.maxAcceleration || "0.2"}
                onChange={(e) => updateTrailingStopRule(rule.id, { maxAcceleration: e.target.value })}
                min="0.01"
                step="0.01"
              />
            </div>
          </div>
        )
      case "moving-average":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>MA Type</Label>
              <Select
                value={rule.maType || "ema"}
                onValueChange={(value) => updateTrailingStopRule(rule.id, { maType: value as "sma" | "ema" | "wma" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select MA type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sma">Simple MA</SelectItem>
                  <SelectItem value="ema">Exponential MA</SelectItem>
                  <SelectItem value="wma">Weighted MA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>MA Period</Label>
              <Input
                type="number"
                value={rule.maPeriod || "20"}
                onChange={(e) => updateTrailingStopRule(rule.id, { maPeriod: e.target.value })}
                min="1"
                step="1"
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Render additional fields based on position sizing type
  const renderPositionSizingFields = (rule: PositionSizingRule) => {
    switch (rule.type) {
      case "percentage":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Equity Percentage (%)</Label>
              <Input
                type="number"
                value={rule.equityPercentage || "2"}
                onChange={(e) => updatePositionSizingRule(rule.id, { equityPercentage: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label>Max Risk Per Trade (%)</Label>
              <Input
                type="number"
                value={rule.maxRisk}
                onChange={(e) => updatePositionSizingRule(rule.id, { maxRisk: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        )
      case "risk-reward":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Risk Per Trade (%)</Label>
              <Input
                type="number"
                value={rule.riskPerTrade || "1"}
                onChange={(e) => updatePositionSizingRule(rule.id, { riskPerTrade: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label>Max Risk Per Trade (%)</Label>
              <Input
                type="number"
                value={rule.maxRisk}
                onChange={(e) => updatePositionSizingRule(rule.id, { maxRisk: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        )
      case "kelly":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Win Rate (%)</Label>
              <Input
                type="number"
                value={rule.winRate || "60"}
                onChange={(e) => updatePositionSizingRule(rule.id, { winRate: e.target.value })}
                min="1"
                max="99"
                step="1"
              />
            </div>
            <div className="space-y-2">
              <Label>Payoff Ratio</Label>
              <Input
                type="number"
                value={rule.payoffRatio || "2"}
                onChange={(e) => updatePositionSizingRule(rule.id, { payoffRatio: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label>Max Risk Per Trade (%)</Label>
              <Input
                type="number"
                value={rule.maxRisk}
                onChange={(e) => updatePositionSizingRule(rule.id, { maxRisk: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        )
      case "optimal-f":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Optimal Fraction</Label>
              <Input
                type="number"
                value={rule.optimalFraction || "0.25"}
                onChange={(e) => updatePositionSizingRule(rule.id, { optimalFraction: e.target.value })}
                min="0.01"
                max="1"
                step="0.01"
              />
            </div>
            <div className="space-y-2">
              <Label>Max Risk Per Trade (%)</Label>
              <Input
                type="number"
                value={rule.maxRisk}
                onChange={(e) => updatePositionSizingRule(rule.id, { maxRisk: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        )
      case "volatility-based":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Volatility Period</Label>
              <Input
                type="number"
                value={rule.volatilityPeriod || "20"}
                onChange={(e) => updatePositionSizingRule(rule.id, { volatilityPeriod: e.target.value })}
                min="1"
                step="1"
              />
            </div>
            <div className="space-y-2">
              <Label>Volatility Multiplier</Label>
              <Input
                type="number"
                value={rule.volatilityMultiplier || "0.5"}
                onChange={(e) => updatePositionSizingRule(rule.id, { volatilityMultiplier: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label>Max Risk Per Trade (%)</Label>
              <Input
                type="number"
                value={rule.maxRisk}
                onChange={(e) => updatePositionSizingRule(rule.id, { maxRisk: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        )
      case "martingale":
      case "anti-martingale":
        return (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Factor</Label>
              <Input
                type="number"
                value={rule.martingaleFactor || "2"}
                onChange={(e) => updatePositionSizingRule(rule.id, { martingaleFactor: e.target.value })}
                min="1.1"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label>Max Risk Per Trade (%)</Label>
              <Input
                type="number"
                value={rule.maxRisk}
                onChange={(e) => updatePositionSizingRule(rule.id, { maxRisk: e.target.value })}
                min="0.1"
                step="0.1"
              />
            </div>
          </div>
        )
      case "custom":
        return (
          <div className="space-y-2 mt-4">
            <Label>Custom Formula</Label>
            <Input
              type="text"
              value={rule.customFormula || "equity * 0.02 / close"}
              onChange={(e) => updatePositionSizingRule(rule.id, { customFormula: e.target.value })}
              placeholder="e.g., equity * 0.02 / close"
            />
            <p className="text-xs text-muted-foreground mt-1">Use variables: equity, close, atr, volatility, risk</p>
          </div>
        )
      default:
        return null
    }
  }

  // Render additional fields based on time exit type
  const renderTimeExitFields = (rule: TimeExitRule) => {
    switch (rule.type) {
      case "bars":
        return (
          <div className="space-y-2 mt-4">
            <Label>Number of Bars</Label>
            <Input
              type="number"
              value={rule.value}
              onChange={(e) => updateTimeExitRule(rule.id, { value: e.target.value })}
              min="1"
              step="1"
            />
          </div>
        )
      case "time":
        return (
          <div className="space-y-2 mt-4">
            <Label>Time (HH:MM)</Label>
            <Input
              type="text"
              value={rule.value}
              onChange={(e) => updateTimeExitRule(rule.id, { value: e.target.value })}
              placeholder="14:30"
            />
          </div>
        )
      case "date":
        return (
          <div className="space-y-2 mt-4">
            <Label>Date (YYYY-MM-DD)</Label>
            <Input
              type="date"
              value={rule.value}
              onChange={(e) => updateTimeExitRule(rule.id, { value: e.target.value })}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Risk Management Settings</h3>
          <p className="text-sm text-muted-foreground">Configure how your strategy manages risk and position sizing</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="position-sizing">Position Sizing</TabsTrigger>
          <TabsTrigger value="exit-rules">Exit Rules</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* Basic Tab */}
        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="max-positions">Max Open Positions</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Maximum number of positions that can be open at the same time</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="max-positions"
                type="number"
                value={config.maxOpenPositions}
                onChange={(e) => updateConfig({ maxOpenPositions: Number.parseInt(e.target.value) || 1 })}
                min="1"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="max-drawdown">Max Drawdown (%)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Maximum allowed drawdown before stopping trading</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="max-drawdown"
                type="number"
                value={config.maxDrawdown}
                onChange={(e) => updateConfig({ maxDrawdown: Number.parseFloat(e.target.value) || 0 })}
                step="0.1"
              />
            </div>
          </div>

          {/* Stop Loss Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">Stop Loss</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Rules to exit a trade to limit losses</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {config.stopLoss.map((rule) => (
              <Card key={rule.id} className="border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={(checked) => updateStopLossRule(rule.id, { enabled: checked })}
                      />
                      <Label>Enabled</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStopLossRule(rule.id)}
                      className="h-8 px-2 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select
                        value={rule.type}
                        onValueChange={(value) =>
                          updateStopLossRule(rule.id, {
                            type: value as StopLossRule["type"],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Price</SelectItem>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="atr">ATR Multiple</SelectItem>
                          <SelectItem value="volatility">Volatility Based</SelectItem>
                          <SelectItem value="support">Support Level</SelectItem>
                          <SelectItem value="swing">Swing Low/High</SelectItem>
                          <SelectItem value="chandelier">Chandelier Exit</SelectItem>
                          <SelectItem value="custom">Custom Formula</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input
                        type="number"
                        value={rule.value}
                        onChange={(e) => updateStopLossRule(rule.id, { value: e.target.value })}
                        step="0.1"
                      />
                    </div>
                  </div>

                  {renderStopLossFields(rule)}
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addStopLossRule} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Stop Loss Rule
            </Button>
          </div>

          {/* Take Profit Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">Take Profit</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Rules to exit a trade to secure profits</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {config.takeProfit.map((rule) => (
              <Card key={rule.id} className="border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={(checked) => updateTakeProfitRule(rule.id, { enabled: checked })}
                      />
                      <Label>Enabled</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTakeProfitRule(rule.id)}
                      className="h-8 px-2 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select
                        value={rule.type}
                        onValueChange={(value) =>
                          updateTakeProfitRule(rule.id, {
                            type: value as TakeProfitRule["type"],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Price</SelectItem>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="risk-reward">Risk-Reward Ratio</SelectItem>
                          <SelectItem value="atr">ATR Multiple</SelectItem>
                          <SelectItem value="resistance">Resistance Level</SelectItem>
                          <SelectItem value="trailing">Trailing Profit</SelectItem>
                          <SelectItem value="custom">Custom Formula</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input
                        type="number"
                        value={rule.value}
                        onChange={(e) => updateTakeProfitRule(rule.id, { value: e.target.value })}
                        step="0.1"
                      />
                    </div>
                  </div>

                  {renderTakeProfitFields(rule)}
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addTakeProfitRule} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Take Profit Rule
            </Button>
          </div>
        </TabsContent>

        {/* Position Sizing Tab */}
        <TabsContent value="position-sizing" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">Position Sizing</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Rules to determine the size of each position</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {config.positionSizing.map((rule) => (
              <Card key={rule.id} className="border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={(checked) => updatePositionSizingRule(rule.id, { enabled: checked })}
                      />
                      <Label>Enabled</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePositionSizingRule(rule.id)}
                      className="h-8 px-2 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select
                        value={rule.type}
                        onValueChange={(value) =>
                          updatePositionSizingRule(rule.id, {
                            type: value as PositionSizingRule["type"],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Units</SelectItem>
                          <SelectItem value="percentage">Percentage of Equity</SelectItem>
                          <SelectItem value="risk-reward">Risk-Based</SelectItem>
                          <SelectItem value="kelly">Kelly Criterion</SelectItem>
                          <SelectItem value="optimal-f">Optimal F</SelectItem>
                          <SelectItem value="volatility-based">Volatility Based</SelectItem>
                          <SelectItem value="martingale">Martingale</SelectItem>
                          <SelectItem value="anti-martingale">Anti-Martingale</SelectItem>
                          <SelectItem value="custom">Custom Formula</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input
                        type="number"
                        value={rule.value}
                        onChange={(e) => updatePositionSizingRule(rule.id, { value: e.target.value })}
                        step="0.1"
                      />
                    </div>
                  </div>

                  {renderPositionSizingFields(rule)}
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addPositionSizingRule} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Position Sizing Rule
            </Button>
          </div>
        </TabsContent>

        {/* Exit Rules Tab */}
        <TabsContent value="exit-rules" className="space-y-6">
          {/* Trailing Stop Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">Trailing Stop</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Stop loss that moves as price moves in your favor</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {config.trailingStop.map((rule) => (
              <Card key={rule.id} className="border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={(checked) => updateTrailingStopRule(rule.id, { enabled: checked })}
                      />
                      <Label>Enabled</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTrailingStopRule(rule.id)}
                      className="h-8 px-2 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select
                        value={rule.type}
                        onValueChange={(value) =>
                          updateTrailingStopRule(rule.id, {
                            type: value as TrailingStopRule["type"],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Points</SelectItem>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="atr">ATR Multiple</SelectItem>
                          <SelectItem value="parabolic">Parabolic SAR</SelectItem>
                          <SelectItem value="moving-average">Moving Average</SelectItem>
                          <SelectItem value="volatility">Volatility Based</SelectItem>
                          <SelectItem value="custom">Custom Formula</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Value</Label>
                      <Input
                        type="number"
                        value={rule.value}
                        onChange={(e) => updateTrailingStopRule(rule.id, { value: e.target.value })}
                        step="0.1"
                      />
                    </div>
                  </div>

                  {renderTrailingStopFields(rule)}
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addTrailingStopRule} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Trailing Stop Rule
            </Button>
          </div>

          {/* Time Exit Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">Time-Based Exit</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Exit a trade after a specific time period or at a specific time</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {config.timeExit.map((rule) => (
              <Card key={rule.id} className="border-2 border-dashed">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={(checked) => updateTimeExitRule(rule.id, { enabled: checked })}
                      />
                      <Label>Enabled</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTimeExitRule(rule.id)}
                      className="h-8 px-2 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select
                        value={rule.type}
                        onValueChange={(value) =>
                          updateTimeExitRule(rule.id, {
                            type: value as TimeExitRule["type"],
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bars">Number of Bars</SelectItem>
                          <SelectItem value="time">Specific Time</SelectItem>
                          <SelectItem value="date">Specific Date</SelectItem>
                          <SelectItem value="session-end">Session End</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {renderTimeExitFields(rule)}
                </CardContent>
              </Card>
            ))}
            <Button variant="outline" onClick={addTimeExitRule} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Time Exit Rule
            </Button>
          </div>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="profit-target">Profit Target (%)</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Target profit percentage for the entire strategy</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="profit-target"
                type="number"
                value={config.profitTarget}
                onChange={(e) => updateConfig({ profitTarget: Number.parseFloat(e.target.value) || 0 })}
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="risk-reward-min">Minimum Risk-Reward Ratio</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Minimum risk-reward ratio required to enter a trade</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="risk-reward-min"
                type="number"
                value={config.riskRewardMinimum}
                onChange={(e) => updateConfig({ riskRewardMinimum: Number.parseFloat(e.target.value) || 0 })}
                step="0.1"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">Custom Risk Settings</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Advanced risk settings for expert traders</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Risk Adjustment Method</Label>
                    <RadioGroup defaultValue="fixed">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="fixed" id="r1" />
                        <Label htmlFor="r1">Fixed Risk</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="adaptive" id="r2" />
                        <Label htmlFor="r2">Adaptive Risk</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dynamic" id="r3" />
                        <Label htmlFor="r3">Dynamic Risk</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Risk Multiplier Based on Win Rate</Label>
                    <div className="pt-2">
                      <Slider defaultValue={[1]} max={2} step={0.1} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0.5x</span>
                      <span>1x</span>
                      <span>1.5x</span>
                      <span>2x</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Custom Risk Formula</Label>
                    <Input
                      type="text"
                      placeholder="e.g., risk = base_risk * (1 + win_rate - 0.5)"
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Variables: base_risk, win_rate, equity, drawdown, volatility
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
