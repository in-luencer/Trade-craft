"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PositionSizingSection } from "./PositionSizingSection";
import { TimeExitSection } from "./TimeExitSection";
import { useStopLossRules, useTakeProfitRules, useTrailingStopRules, useTimeExitRules, usePositionSizingRules } from "./risk-management-hooks"
import type { RiskManagementConfig } from "../types"
import { LeverageSection } from "./LeverageSection"
import { StopLossSection } from "./StopLossSection"
import { TakeProfitSection } from "./TakeProfitSection"
import { MaxDrawdownSection } from "./MaxDrawdownSection"
import { MaxTradesSection } from "./MaxTradesSection"
import { MaxPositionsSection } from "./MaxPositionsSection"
import { TradingSessionFilterSection } from "./TradingSessionFilterSection"

// Risk Rule Types
export type StopLossRule = {
  id: string
  type: "percentage" | "atr" | "fixed-dollar" |"time"
  value: number
  atrPeriod?: number
  atrMultiplier?: number
  lookbackPeriod?: number
  enabled: boolean
}

export type TakeProfitRule = {
  id: string
  type: "percentage" | "r:r" | "atr"| "trailing"
  value: number
  atrPeriod?: number
  atrMultiplier?: number
  riskRewardRatio?: number
  lookbackPeriod?: number
  enabled: boolean
}

export type TrailingStopRule = {
  id: string
  type:  | "percentage" | "atr" | "volatility" | "parabolic" | "moving-average" | "custom"
  value: number
  activationThreshold?: number
  atrPeriod?: number
  atrMultiplier?: number
  accelerationFactor?: number
  maxAcceleration?: number
  maType?: "sma" | "ema" | "wma"
  maPeriod?: number
  enabled: boolean
}

export type PositionSizingRule = {
  id: string
  type:
    | "fixed-units"
    | "fixed-amount"
    | "percentage"
    | "risk-based"
    | "risk-reward"
    | "kelly"
    | "optimal-f"
    | "volatility-based"
    | "custom"
  value: number
  enabled: boolean
  // Type-specific fields
  equityPercentage?: number // Only for percentage type
  riskPerTrade?: number // Only for risk-based type
  winRate?: number // Only for kelly type
  payoffRatio?: number // Only for kelly type
  optimalFraction?: number
  volatilityPeriod?: number
  volatilityMultiplier?: number
  customFormula?: string
  useStopLossRisk?: boolean
}

export type TimeExitRule = {
  id: string
  type: "bars" | "time" | "date" | "session-end" | "custom"
  value: number
  enabled: boolean
}

interface RiskManagementProps {
  config: RiskManagementConfig
  onChange: (config: RiskManagementConfig) => void
}

export default function RiskManagement({ config, onChange }: RiskManagementProps) {
  const [activeTab, setActiveTab] = useState("position-sizing")

  const updateConfig = (newConfig: Partial<RiskManagementConfig>) => {
    onChange({ ...config, ...newConfig })
  }

  // Use modular hooks
  const stopLossRules = useStopLossRules(config, updateConfig);
  const takeProfitRules = useTakeProfitRules(config, updateConfig);
  const trailingStopRules = useTrailingStopRules(config, updateConfig);
  const timeExitRules = useTimeExitRules(config, updateConfig);
  const positionSizingRules = usePositionSizingRules(config, updateConfig);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Risk Management Settings</h3>
          <p className="text-sm text-muted-foreground">Configure how your strategy manages risk and position sizing</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="position-sizing">Position Sizing</TabsTrigger>
          <TabsTrigger value="exit-rules">Exit Rules</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* Position Sizing Tab */}
        <TabsContent value="position-sizing" className="space-y-6">
          <PositionSizingSection config={config} positionSizingRules={positionSizingRules} />
          <LeverageSection config={config} updateConfig={updateConfig} />
        </TabsContent>

        {/* Exit Rules Tab */}
        <TabsContent value="exit-rules" className="space-y-6">
          <StopLossSection config={config} stopLossRules={stopLossRules} />
          <TakeProfitSection config={config} takeProfitRules={takeProfitRules} />
          {/* Time Exit Section */}
          <TimeExitSection config={config} timeExitRules={timeExitRules} />
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6">
          {/* Max Drawdown Section */}
          <MaxDrawdownSection config={config} updateConfig={updateConfig} />

          {/* Max Trades Section */}
          <MaxTradesSection config={config} updateConfig={updateConfig} />

          {/* Max Positions Section */}
          <MaxPositionsSection config={config} updateConfig={updateConfig} />

          {/* Trading Session Filter Section */}
          <TradingSessionFilterSection config={config} updateConfig={updateConfig} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
