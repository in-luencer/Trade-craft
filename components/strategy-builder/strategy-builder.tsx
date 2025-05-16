"use client"

import { useState } from "react"
import { Save, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

import EntryExitNode from "./entry-exit-node"
import RiskManagement, { type RiskManagementConfig } from "./risk-management"
import StrategyPreview from "./strategy-preview"
import { useStrategy } from "@/context/strategy-context"

export type IndicatorCondition = {
  id: string
  indicator: string
  parameter: string
  logic: string
  value: string
  timeframe: string
  params?: Record<string, any>
}

export type ConditionGroup = {
  id: string
  conditions: IndicatorCondition[]
  operator: "and" | "or"
}

export type PositionRule = {
  id: string
  conditionGroups: ConditionGroup[]
}

export type StrategyConfig = {
  id: string // Added 'id' property
  name: string
  description: string
  entryLong: PositionRule
  entryShort: PositionRule
  exitLong: PositionRule
  exitShort: PositionRule
  riskManagement: RiskManagementConfig
  isPublic?: boolean
}

const generateId = (prefix: string) => `${prefix}-${new Date().toISOString()}`

const defaultCondition: IndicatorCondition = {
  id: generateId("condition"),
  indicator: "rsi",
  parameter: "value",
  logic: "less_than",
  value: "30",
  timeframe: "1d",
  params: {
    period: 14,
    source: "close",
    overbought: 70,
    oversold: 30,
  },
}

const defaultConditionGroup: ConditionGroup = {
  id: generateId("group"),
  conditions: [{ ...defaultCondition, id: generateId("condition") }],
  operator: "and",
}

const defaultPositionRule: PositionRule = {
  id: generateId("rule"),
  conditionGroups: [{ ...defaultConditionGroup, id: generateId("group") }],
}

const defaultRiskManagement: RiskManagementConfig = {
  stopLoss: [
    {
      id: "sl-default",
      type: "percentage",
      value: 2,
      enabled: true,
    },
  ],
  takeProfit: [
    {
      id: "tp-default",
      type: "percentage",
      value: 5,
      enabled: true,
    },
  ],
  trailingStop: [],
  positionSizing: [
    {
      id: "ps-default",
      type: "percentage",
      value: 2,
      maxRisk: 2,
      enabled: true,
    },
  ],
  timeExit: [],
  maxOpenPositions: 3,
  maxDrawdown: 15,
  maxDailyLoss: 5,
  maxConsecutiveLosses: 3,
  profitTarget: 20,
  riskRewardMinimum: 1.5,
  pyramiding: 0,
  experienceLevel: "beginner",
}

const defaultStrategy: StrategyConfig = {
  id: generateId("strategy"),
  name: "My Trading Strategy",
  description: "A simple trading strategy based on technical indicators",
  entryLong: { ...defaultPositionRule, id: generateId("entry-long") },
  entryShort: { ...defaultPositionRule, id: generateId("entry-short") },
  exitLong: { ...defaultPositionRule, id: generateId("exit-long") },
  exitShort: { ...defaultPositionRule, id: generateId("exit-short") },
  riskManagement: defaultRiskManagement,
  isPublic: false,
}

// Function to create API client for backend communication
const apiClient = {
  saveStrategy: async (strategy: StrategyConfig) => {
    try {
      const response = await fetch("/api/strategies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(strategy),
      })

      if (!response.ok) {
        throw new Error("Failed to save strategy")
      }

      return await response.json()
    } catch (error) {
      console.error("Error saving strategy:", error)
      throw error
    }
  },

  getStrategy: async (id: string) => {
    try {
      const response = await fetch(`/api/strategies/${id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch strategy")
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching strategy:", error)
      throw error
    }
  },

  backtest: async (strategyId: string, params: any) => {
    try {
      const response = await fetch(`/api/backtest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ strategyId, ...params }),
      })

      if (!response.ok) {
        throw new Error("Failed to run backtest")
      }

      return await response.json()
    } catch (error) {
      console.error("Error running backtest:", error)
      throw error
    }
  },
}

export default function StrategyBuilder() {
  const [activeTab, setActiveTab] = useState("builder")
  const [strategy, setStrategy] = useState<StrategyConfig>(defaultStrategy)
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { setStrategyName, setStrategyId, setIsPublic, setIndicators } = useStrategy()

  const updateStrategy = (newStrategy: Partial<StrategyConfig>) => {
    setStrategy({ ...strategy, ...newStrategy })
  }

  const saveStrategy = async () => {
    try {
      setIsSaving(true)

      // Generate a new ID if one doesn't exist
      const strategyWithId = {
        ...strategy,
        id: strategy.id || generateId("strategy")
      }

      // Store strategy data in context
      setStrategyName(strategyWithId.name)
      setStrategyId(strategyWithId.id)
      setIsPublic(strategyWithId.isPublic || false)

      // Collect all indicators used in the strategy
      const indicators = new Set<string>()

      // Helper function to collect indicators from condition groups
      const collectIndicators = (positionRule: PositionRule) => {
        positionRule.conditionGroups.forEach((group) => {
          group.conditions.forEach((condition) => {
            indicators.add(condition.indicator)
          })
        })
      }

      collectIndicators(strategyWithId.entryLong)
      collectIndicators(strategyWithId.entryShort)
      collectIndicators(strategyWithId.exitLong)
      collectIndicators(strategyWithId.exitShort)

      setIndicators(Array.from(indicators))

      // In a real app, this would save to your backend
      await apiClient.saveStrategy(strategyWithId)
      alert("Strategy saved successfully!")
      return true
    } catch (error) {
      console.error("Error saving strategy:", error)
      alert("Failed to save strategy. Please try again.")
      return false
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Strategy Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="strategy-name">Strategy Name</Label>
              <Input
                id="strategy-name"
                value={strategy.name}
                onChange={(e) => updateStrategy({ name: e.target.value })}
                placeholder="Enter strategy name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="strategy-description">Description</Label>
              <Textarea
                id="strategy-description"
                value={strategy.description}
                onChange={(e) => updateStrategy({ description: e.target.value })}
                placeholder="Describe your strategy"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="public-strategy">Make Strategy Public</Label>
                <p className="text-sm text-muted-foreground">
                  Public strategies appear in the templates for other users
                </p>
              </div>
              <Switch
                id="public-strategy"
                checked={strategy.isPublic || false}
                onCheckedChange={(checked) => updateStrategy({ isPublic: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="builder">Entry/Exit Rules</TabsTrigger>
          <TabsTrigger value="risk">Risk Management</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entry Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Entry Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Long Position</h3>
                  <EntryExitNode
                    positionRule={strategy.entryLong}
                    onChange={(updatedRule) => updateStrategy({ entryLong: updatedRule })}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Short Position</h3>
                  <EntryExitNode
                    positionRule={strategy.entryShort}
                    onChange={(updatedRule) => updateStrategy({ entryShort: updatedRule })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Exit Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Exit Rules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Long Position</h3>
                  <EntryExitNode
                    positionRule={strategy.exitLong}
                    onChange={(updatedRule) => updateStrategy({ exitLong: updatedRule })}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Short Position</h3>
                  <EntryExitNode
                    positionRule={strategy.exitShort}
                    onChange={(updatedRule) => updateStrategy({ exitShort: updatedRule })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Risk Management</CardTitle>
            </CardHeader>
            <CardContent>
              <RiskManagement
                config={strategy.riskManagement}
                onChange={(updatedConfig) => updateStrategy({ riskManagement: updatedConfig })}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <StrategyPreview strategy={strategy} />
        </TabsContent>
      </Tabs>

      <Button onClick={saveStrategy} className="w-full mb-4" disabled={isSaving}>
        <Save className="mr-2 h-4 w-4" /> {isSaving ? "Saving..." : "Save Strategy"}
      </Button>

      <div className="flex justify-center mt-4">
        <Button
          variant="outline"
          onClick={() => {
            // Save strategy first, then redirect
            saveStrategy().then(() => {
              router.push(`/backtest?strategy=${strategy.name}`)
            })
          }}
        >
          Continue to Backtest <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
