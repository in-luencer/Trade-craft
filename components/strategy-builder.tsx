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

import type { IndicatorCondition, ConditionGroup, PositionRule } from "@/components/strategy-builder/types"
import EntryExitNode from "@/components/strategy-builder/entry-exit-node"
import RiskManagement, { type RiskManagementConfig } from "@/components/strategy-builder/risk-management"
import StrategyPreview from "./strategy-preview"
import { useStrategy } from "@/context/strategy-context"

export type StrategyConfig = {
  id: string
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
  } as const,
}

const defaultConditionGroup: ConditionGroup = {
  id: generateId("group"),
  conditions: [{ ...defaultCondition, id: generateId("condition") }],
  operator: "or",
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

  // Convert string properties to number for preview compatibility
  function convertRiskRuleStringsToNumbers<T extends Record<string, any>>(rule: T): T {
    const numericFields = [
      'value',
      'atrPeriod',
      'atrMultiplier',
      'lookbackPeriod',
      'riskRewardRatio',
      'activationThreshold',
      'accelerationFactor',
      'maxAcceleration',
      'maPeriod',
      'equityPercentage',
      'riskPerTrade',
      'winRate',
      'payoffRatio',
      'optimalFraction',
      'volatilityPeriod',
      'volatilityMultiplier',
      'martingaleFactor'
    ]

    const converted = { ...rule } as T
    for (const field of numericFields) {
      if (field in converted && converted[field] !== undefined) {
        const num = parseFloat(converted[field])
        if (!isNaN(num)) {
          (converted as any)[field] = num
        }
      }
    }
    return converted
  }

  // Utility to deeply convert all risk rule arrays in a strategy config
  function convertStrategyForPreview(strategy: StrategyConfig): any {
    // Convert all .value fields to string|number, never undefined
    function fixConditionValue(condition: any) {
      return {
        ...condition,
        value: condition.value === undefined ? "" : condition.value,
      }
    }
    function fixGroup(group: any) {
      return {
        ...group,
        conditions: group.conditions.map(fixConditionValue),
      }
    }
    function fixRule(rule: any) {
      return {
        ...rule,
        conditionGroups: rule.conditionGroups.map(fixGroup),
      }
    }
    return {
      ...strategy,
      entryLong: fixRule(strategy.entryLong),
      entryShort: fixRule(strategy.entryShort),
      exitLong: fixRule(strategy.exitLong),
      exitShort: fixRule(strategy.exitShort),
      riskManagement: strategy.riskManagement,
    }
  }

  // Prepare strategy for preview with value fix
  const strategyForPreview = convertStrategyForPreview(strategy);

  const updateStrategy = (newStrategy: Partial<StrategyConfig>) => {
    setStrategy({ ...strategy, ...newStrategy })
  }

  const saveStrategy = async () => {
    try {
      setIsSaving(true)

      // Store strategy data in context
      setStrategyName(strategy.name)
      setStrategyId(strategy.id || generateId("strategy"))
      setIsPublic(strategy.isPublic || false)

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

      collectIndicators(strategy.entryLong)
      collectIndicators(strategy.entryShort)
      collectIndicators(strategy.exitLong)
      collectIndicators(strategy.exitShort)

      setIndicators(Array.from(indicators))

      // In a real app, this would save to your backend
      await apiClient.saveStrategy(strategy)
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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="builder">Entry/Exit Rules</TabsTrigger>
          <TabsTrigger value="risk">Risk Management</TabsTrigger>
          
       {/*   <TabsTrigger value="preview">Preview</TabsTrigger> */  }
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
          <StrategyPreview strategy={strategyForPreview} />
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
