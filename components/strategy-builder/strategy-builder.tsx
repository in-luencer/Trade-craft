"use client"

import { useState } from "react"
import { Save, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { cleanPositionRule } from "./utils";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import EntryExitNode from "./entry-exit-node"
import RiskManagement from "./risk-management/risk-management-main"
import { useStrategy } from "@/context/strategy-context"
import StrategyJsonExporter from "./strategy-json-exporter"

import type { 
  IndicatorCondition,
  ConditionGroup,
  PositionRule,
  IndicatorType,
  IndicatorParams,
  IndicatorLogic,
  RiskManagementConfig
} from "./types";

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
  indicator: "rsi" as IndicatorType,
  logic: "less_than" as IndicatorLogic,
  value: "30",
  timeframe: "1d",
  params: {
    period: 14,
    source: "close",

    //overbought: 70,
    //oversold: 30,

  },

  secondaryIndicator: {
    type: "sma" as IndicatorType,
    params: {
      period: 14,
     source: "close",
   },
 },
}

const defaultConditionGroup: ConditionGroup = {
  id: generateId("group"),
  conditions: [{ ...defaultCondition, id: generateId("condition") }],
  operator: "or",
}




const defaultPositionRule = (id: string = generateId("rule")): PositionRule => ({
  id,
  conditionGroups: [{
    id: generateId("group"),
    conditions: [{
      id: generateId("condition"),
      indicator: "rsi" as IndicatorType,
      logic: "less_than" as IndicatorLogic,
      value: "30",
      timeframe: "1d",
      params: {
        period: 14,
        source: "close",
      },
    }],
    operator: "or",
  }],
});

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
      equityPercentage: 2,
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
  description: "A comprehensive trading strategy with independent indicator values",
  entryLong: defaultPositionRule("entry-long"),
  entryShort: defaultPositionRule("entry-short"),
  exitLong: defaultPositionRule("exit-long"),
  exitShort: defaultPositionRule("exit-short"),
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
  const [strategy, setStrategy] = useState<StrategyConfig>({
    id: generateId("strategy"),
    name: "",
    description: "",
    entryLong: defaultPositionRule("entry-long"),
    entryShort: defaultPositionRule("entry-short"),
    exitLong: defaultPositionRule("exit-long"),
    exitShort: defaultPositionRule("exit-short"),
    riskManagement: defaultRiskManagement,
  })
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { setStrategyName, setStrategyId, setIsPublic, setIndicators } = useStrategy()

  const updateStrategy = (updates: Partial<StrategyConfig>) => {
    setStrategy((prev) => ({
      ...prev,
      ...updates,
    }))
  }

  const createPositionRule = (groups: ConditionGroup[]): PositionRule => ({
    id: generateId("rule"),
    conditionGroups: groups
  })

  // Update handlers
  const handleEntryLongUpdate = (groups: ConditionGroup[]) => updateStrategy({ entryLong: createPositionRule(groups) })
  const handleEntryShortUpdate = (groups: ConditionGroup[]) => updateStrategy({ entryShort: createPositionRule(groups) })
  const handleExitLongUpdate = (groups: ConditionGroup[]) => updateStrategy({ exitLong: createPositionRule(groups) })
  const handleExitShortUpdate = (groups: ConditionGroup[]) => updateStrategy({ exitShort: createPositionRule(groups) })

  const saveStrategy = async () => {
    try {
      setIsSaving(true)

      // Generate a new ID if one doesn't exist
      const strategyWithId = {
        ...strategy,
        id: strategy.id || generateId("strategy"),
        // Ensure all condition parameters are properly structured
        entryLong: {
          ...strategy.entryLong,
          conditionGroups: strategy.entryLong.conditionGroups.map((group) => ({
            ...group,
            conditions: group.conditions.map((condition) => ({
              ...condition,
              params: condition.params || {},
            })),
          })),
        },
        entryShort: {
          ...strategy.entryShort,
          conditionGroups: strategy.entryShort.conditionGroups.map((group) => ({
            ...group,
            conditions: group.conditions.map((condition) => ({
              ...condition,
              params: condition.params || {},
            })),
          })),
        },
        exitLong: {
          ...strategy.exitLong,
          conditionGroups: strategy.exitLong.conditionGroups.map((group) => ({
            ...group,
            conditions: group.conditions.map((condition) => ({
              ...condition,
              params: condition.params || {},
            })),
          })),
        },
        exitShort: {
          ...strategy.exitShort,
          conditionGroups: strategy.exitShort.conditionGroups.map((group) => ({
            ...group,
            conditions: group.conditions.map((condition) => ({
              ...condition,
              params: condition.params || {},
            })),
          })),
        },
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
            // Also collect secondary indicators from crossover logic
            if (condition.params?.secondary_indicator) {
              indicators.add(condition.params.secondary_indicator)
            }
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
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      <div className="w-full sm:w-1/2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-bold">Entry Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <EntryExitNode
              positionRule={strategy.entryLong}
              onChange={(updatedRule) => updateStrategy({ entryLong: updatedRule })}
              title="Long Position"
            />
            <EntryExitNode
              positionRule={strategy.entryShort}
              onChange={(updatedRule) => updateStrategy({ entryShort: updatedRule })}
              title="Short Position"
            />
          </CardContent>
        </Card>
      </div>
      <div className="w-full sm:w-1/2">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg font-bold">Exit Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <EntryExitNode
              positionRule={strategy.exitLong}
              onChange={(updatedRule) => updateStrategy({ exitLong: updatedRule })}
              title="Long Position"
            />
            <EntryExitNode
              positionRule={strategy.exitShort}
              onChange={(updatedRule) => updateStrategy({ exitShort: updatedRule })}
              title="Short Position"
            />
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builder">Entry/Exit Rules</TabsTrigger>
          <TabsTrigger value="risk">Risk Management</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="json">JSON Export</TabsTrigger>
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
                    title="Long Position"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Short Position</h3>
                  <EntryExitNode
                    positionRule={strategy.entryShort}
                    onChange={(updatedRule) => updateStrategy({ entryShort: updatedRule })}
                    title="Short Position"
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
                    title="Long Position"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Short Position</h3>
                  <EntryExitNode
                    positionRule={strategy.exitShort}
                    onChange={(updatedRule) => updateStrategy({ exitShort: updatedRule })}
                    title="Short Position"
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
        <TabsContent value="json">
      <StrategyJsonExporter strategy={strategy} />
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
