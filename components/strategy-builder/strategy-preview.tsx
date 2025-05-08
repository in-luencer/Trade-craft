"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ArrowDown, ArrowUp, Save } from 'lucide-react'
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

import type { StrategyConfig } from "../strategy-builder"

import tradingviewChart from "../tradingview-chart"

// Define interfaces for the strategy configuration
interface Condition {
  indicator: string
  parameter?: string
  logic: string
  value: number | string
  timeframe?: string
  params?: any
}

interface ConditionGroup {
  conditions: Condition[]
  operator: 'and' | 'or'
}

interface PositionRule {
  conditionGroups: ConditionGroup[]
}

interface RiskRule {
  id: string
  enabled: boolean
  type: string
  value: number | string
  atrPeriod?: number
  atrMultiplier?: number
  lookbackPeriod?: number
  activationThreshold?: number
  equityPercentage?: number
  riskPerTrade?: number
  maxRisk?: number
  winRate?: number
  payoffRatio?: number
  volatilityPeriod?: number
  volatilityMultiplier?: number
  riskRewardRatio?: number
}

interface RiskManagement {
  stopLoss: RiskRule[]
  takeProfit: RiskRule[]
  trailingStop: RiskRule[]
  timeExit: RiskRule[]
  positionSizing: RiskRule[]
  maxOpenPositions: number
  maxDrawdown: number
  maxDailyLoss: number
  maxConsecutiveLosses: number
  profitTarget: number
  riskRewardMinimum: number
  pyramiding: number
}

interface StrategyConfig {
  name: string
  description: string
  entryLong: PositionRule
  entryShort: PositionRule
  exitLong: PositionRule
  exitShort: PositionRule
  riskManagement: RiskManagement
}

// Sample data for the chart
const sampleData = [
  { date: "2023-01-01", price: 100, sma20: 98, rsi: 45 },
  { date: "2023-01-02", price: 102, sma20: 99, rsi: 52 },
  { date: "2023-01-03", price: 104, sma20: 100, rsi: 58 },
  { date: "2023-01-04", price: 103, sma20: 100.5, rsi: 54 },
  { date: "2023-01-05", price: 105, sma20: 101, rsi: 60 },
  { date: "2023-01-06", price: 107, sma20: 102, rsi: 65, signal: "buy" },
  { date: "2023-01-07", price: 109, sma20: 103, rsi: 70 },
  { date: "2023-01-08", price: 112, sma20: 104, rsi: 75 },
  { date: "2023-01-09", price: 114, sma20: 105, rsi: 78 },
  { date: "2023-01-10", price: 116, sma20: 106, rsi: 80 },
  { date: "2023-01-11", price: 118, sma20: 107, rsi: 82 },
  { date: "2023-01-12", price: 115, sma20: 108, rsi: 70, signal: "sell" },
  { date: "2023-01-13", price: 113, sma20: 108, rsi: 65 },
  { date: "2023-01-14", price: 110, sma20: 108, rsi: 60 },
  { date: "2023-01-15", price: 108, sma20: 108, rsi: 55 },
  { date: "2023-01-16", price: 105, sma20: 107, rsi: 48 },
  { date: "2023-01-17", price: 103, sma20: 106, rsi: 42 },
  { date: "2023-01-18", price: 101, sma20: 105, rsi: 38 },
  { date: "2023-01-19", price: 99, sma20: 104, rsi: 32 },
  { date: "2023-01-20", price: 97, sma20: 103, rsi: 28, signal: "buy" },
  { date: "2023-01-21", price: 99, sma20: 102, rsi: 35 },
  { date: "2023-01-22", price: 101, sma20: 101, rsi: 42 },
  { date: "2023-01-23", price: 103, sma20: 101, rsi: 48 },
  { date: "2023-01-24", price: 105, sma20: 101, rsi: 55 },
  { date: "2023-01-25", price: 107, sma20: 101, rsi: 62 },
  { date: "2023-01-26", price: 109, sma20: 102, rsi: 68 },
  { date: "2023-01-27", price: 111, sma20: 103, rsi: 72 },
  { date: "2023-01-28", price: 113, sma20: 104, rsi: 76 },
  { date: "2023-01-29", price: 115, sma20: 105, rsi: 80, signal: "sell" },
  { date: "2023-01-30", price: 112, sma20: 106, rsi: 70 },
  { date: "2023-01-31", price: 110, sma20: 107, rsi: 65 },
  { date: "2023-02-01", price: 108, sma20: 108, rsi: 60 },
  { date: "2023-02-02", price: 106, sma20: 109, rsi: 55 },
  { date: "2023-02-03", price: 104, sma20: 110, rsi: 50 },
  { date: "2023-02-04", price: 102, sma20: 111, rsi: 45 },
  { date: "2023-02-05", price: 100, sma20: 112, rsi: 40 },
  { date: "2023-02-06", price: 98, sma20: 113, rsi: 35 },
  { date: "2023-02-07", price: 96, sma20: 114, rsi: 30 },
  { date: "2023-02-08", price: 94, sma20: 115, rsi: 25 },
  { date: "2023-02-09", price: 92, sma20: 116, rsi: 20 },
  { date: "2023-02-10", price: 90, sma20: 117, rsi: 15 },
  { date: "2023-02-11", price: 88, sma20: 118, rsi: 10, signal: "buy" },
]

interface StrategyPreviewProps {
  strategy: StrategyConfig
}

export default function StrategyPreview({ strategy }: StrategyPreviewProps) {
  const [symbol, setSymbol] = useState("BTCUSD")
  const [timeframe, setTimeframe] = useState("1d")
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const saveStrategy = async () => {
    try {
      setIsSaving(true)
      
      // Ensure we have all required data
      if (!strategy.name || !strategy.description) {
        toast({
          title: "Error",
          description: "Strategy name and description are required",
          variant: "destructive",
        })
        return
      }

      // Prepare the complete strategy data with all logic and parameters
      const strategyData = {
        name: strategy.name,
        description: strategy.description,
        symbol,
        timeframe,
        entryLong: {
          conditionGroups: strategy.entryLong.conditionGroups.map(group => ({
            operator: group.operator,
            conditions: group.conditions.map(condition => ({
              indicator: condition.indicator,
              parameter: condition.parameter,
              logic: condition.logic,
              value: condition.value,
              timeframe: condition.timeframe,
              params: condition.params || getIndicatorParams(condition, condition.indicator)
            }))
          }))
        },
        entryShort: {
          conditionGroups: strategy.entryShort.conditionGroups.map(group => ({
            operator: group.operator,
            conditions: group.conditions.map(condition => ({
              indicator: condition.indicator,
              parameter: condition.parameter,
              logic: condition.logic,
              value: condition.value,
              timeframe: condition.timeframe,
              params: condition.params || getIndicatorParams(condition, condition.indicator)
            }))
          }))
        },
        exitLong: {
          conditionGroups: strategy.exitLong.conditionGroups.map(group => ({
            operator: group.operator,
            conditions: group.conditions.map(condition => ({
              indicator: condition.indicator,
              parameter: condition.parameter,
              logic: condition.logic,
              value: condition.value,
              timeframe: condition.timeframe,
              params: condition.params || getIndicatorParams(condition, condition.indicator)
            }))
          }))
        },
        exitShort: {
          conditionGroups: strategy.exitShort.conditionGroups.map(group => ({
            operator: group.operator,
            conditions: group.conditions.map(condition => ({
              indicator: condition.indicator,
              parameter: condition.parameter,
              logic: condition.logic,
              value: condition.value,
              timeframe: condition.timeframe,
              params: condition.params || getIndicatorParams(condition, condition.indicator)
            }))
          }))
        },
        riskManagement: {
          stopLoss: strategy.riskManagement.stopLoss.map(rule => ({
            id: rule.id || `sl-${Date.now()}`,
            type: rule.type,
            value: rule.value,
            enabled: rule.enabled,
            atrPeriod: rule.atrPeriod,
            atrMultiplier: rule.atrMultiplier,
            lookbackPeriod: rule.lookbackPeriod,
            activationThreshold: rule.activationThreshold,
            equityPercentage: rule.equityPercentage,
            riskPerTrade: rule.riskPerTrade,
            maxRisk: rule.maxRisk,
            winRate: rule.winRate,
            payoffRatio: rule.payoffRatio,
            volatilityPeriod: rule.volatilityPeriod,
            volatilityMultiplier: rule.volatilityMultiplier,
            riskRewardRatio: rule.riskRewardRatio
          })),
          takeProfit: strategy.riskManagement.takeProfit.map(rule => ({
            id: rule.id || `tp-${Date.now()}`,
            type: rule.type,
            value: rule.value,
            enabled: rule.enabled,
            atrPeriod: rule.atrPeriod,
            atrMultiplier: rule.atrMultiplier,
            lookbackPeriod: rule.lookbackPeriod,
            activationThreshold: rule.activationThreshold,
            equityPercentage: rule.equityPercentage,
            riskPerTrade: rule.riskPerTrade,
            maxRisk: rule.maxRisk,
            winRate: rule.winRate,
            payoffRatio: rule.payoffRatio,
            volatilityPeriod: rule.volatilityPeriod,
            volatilityMultiplier: rule.volatilityMultiplier,
            riskRewardRatio: rule.riskRewardRatio
          })),
          trailingStop: strategy.riskManagement.trailingStop.map(rule => ({
            id: rule.id || `ts-${Date.now()}`,
            type: rule.type,
            value: rule.value,
            enabled: rule.enabled,
            atrPeriod: rule.atrPeriod,
            atrMultiplier: rule.atrMultiplier,
            lookbackPeriod: rule.lookbackPeriod,
            activationThreshold: rule.activationThreshold,
            equityPercentage: rule.equityPercentage,
            riskPerTrade: rule.riskPerTrade,
            maxRisk: rule.maxRisk,
            winRate: rule.winRate,
            payoffRatio: rule.payoffRatio,
            volatilityPeriod: rule.volatilityPeriod,
            volatilityMultiplier: rule.volatilityMultiplier,
            riskRewardRatio: rule.riskRewardRatio
          })),
          positionSizing: strategy.riskManagement.positionSizing.map(rule => ({
            id: rule.id || `ps-${Date.now()}`,
            type: rule.type,
            value: rule.value,
            enabled: rule.enabled,
            atrPeriod: rule.atrPeriod,
            atrMultiplier: rule.atrMultiplier,
            lookbackPeriod: rule.lookbackPeriod,
            activationThreshold: rule.activationThreshold,
            equityPercentage: rule.equityPercentage,
            riskPerTrade: rule.riskPerTrade,
            maxRisk: rule.maxRisk,
            winRate: rule.winRate,
            payoffRatio: rule.payoffRatio,
            volatilityPeriod: rule.volatilityPeriod,
            volatilityMultiplier: rule.volatilityMultiplier,
            riskRewardRatio: rule.riskRewardRatio
          })),
          timeExit: strategy.riskManagement.timeExit.map(rule => ({
            id: rule.id || `te-${Date.now()}`,
            type: rule.type,
            value: rule.value,
            enabled: rule.enabled
          })),
          maxOpenPositions: strategy.riskManagement.maxOpenPositions,
          maxDrawdown: strategy.riskManagement.maxDrawdown,
          maxDailyLoss: strategy.riskManagement.maxDailyLoss,
          maxConsecutiveLosses: strategy.riskManagement.maxConsecutiveLosses,
          profitTarget: strategy.riskManagement.profitTarget,
          riskRewardMinimum: strategy.riskManagement.riskRewardMinimum,
          pyramiding: strategy.riskManagement.pyramiding
        }
      }
      
      const response = await fetch("/api/strategies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(strategyData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to save strategy")
      }

      const data = await response.json()
      
      toast({
        title: "Success",
        description: "Strategy saved successfully",
      })

      // Optionally redirect to backtest page
      router.push(`/backtest?strategy=${data.id}`)
    } catch (error) {
      console.error("Error saving strategy:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save strategy. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Generate pseudocode representation of the strategy
  const generatePseudocode = () => {
    let code = `// ${strategy.name}\n// ${strategy.description}\n\n`

    // Define indicators
    code += "// Define Indicators\n"
    const indicators = new Set<string>()

    // Collect all indicators from entry and exit rules
    const collectIndicators = (positionRule: any) => {
      positionRule.conditionGroups.forEach((group: any) => {
        group.conditions.forEach((condition: any) => {
          indicators.add(condition.indicator)
        })
      })
    }

    collectIndicators(strategy.entryLong)
    collectIndicators(strategy.entryShort)
    collectIndicators(strategy.exitLong)
    collectIndicators(strategy.exitShort)
    
    // Generate indicator definitions
    indicators.forEach((indicator) => {
      switch (indicator) {
        case "price":
          code += `var price = close // Using close price by default\n`
          break
        case "sma":
          const smaParams = getIndicatorParams(strategy, "sma")
          code += `var sma${smaParams.period} = ta.sma(${smaParams.source || "close"}, ${smaParams.period})\n`
          break
        case "ema":
          const emaParams = getIndicatorParams(strategy, "ema")
          code += `var ema${emaParams.period} = ta.ema(${emaParams.source || "close"}, ${emaParams.period})\n`
          break
        case "wma":
          const wmaParams = getIndicatorParams(strategy, "wma")
          code += `var wma${wmaParams.period} = ta.wma(${wmaParams.source || "close"}, ${wmaParams.period})\n`
          break
        case "hma":
          const hmaParams = getIndicatorParams(strategy, "hma")
          code += `var hma${hmaParams.period} = ta.hma(${hmaParams.source || "close"}, ${hmaParams.period})\n`
          break
        case "vwap":
          code += `var vwap = ta.vwap()\n`
          break
        case "rsi":
          const rsiParams = getIndicatorParams(strategy, "rsi")
          code += `var rsi${rsiParams.period} = ta.rsi(${rsiParams.source || "close"}, ${rsiParams.period})\n`
          break
        case "macd":
          const macdParams = getIndicatorParams(strategy, "macd")
          code += `var [macdLine, signalLine, histogram] = ta.macd(${macdParams.source || "close"}, ${macdParams.fastPeriod || 12}, ${macdParams.slowPeriod || 26}, ${macdParams.signalPeriod || 9})\n`
          break
        case "bollinger":
          const bbParams = getIndicatorParams(strategy, "bollinger")
          code += `var [upperBand, middleBand, lowerBand] = ta.bbands(${bbParams.source || "close"}, ${bbParams.period || 20}, ${bbParams.stdDev || 2})\n`
          break
        case "atr":
          const atrParams = getIndicatorParams(strategy, "atr")
          code += `var atr${atrParams.period} = ta.atr(${atrParams.period})\n`
          break
        case "stochastic":
          const stochParams = getIndicatorParams(strategy, "stochastic")
          code += `var [k, d] = ta.stoch(high, low, close, ${stochParams.kPeriod || 14}, ${stochParams.dPeriod || 3}, ${stochParams.slowing || 3})\n`
          break
        case "adx":
          const adxParams = getIndicatorParams(strategy, "adx")
          code += `var [adx, diPlus, diMinus] = ta.adx(high, low, close, ${adxParams.period || 14})\n`
          break
        case "supertrend":
          const stParams = getIndicatorParams(strategy, "supertrend")
          code += `var [supertrend, direction] = ta.supertrend(high, low, close, ${stParams.period || 10}, ${stParams.multiplier || 3})\n`
          break
        case "ichimoku":
          const ichiParams = getIndicatorParams(strategy, "ichimoku")
          code += `var [tenkan, kijun, senkou_a, senkou_b, chikou] = ta.ichimoku(${ichiParams.conversionPeriod || 9}, ${ichiParams.basePeriod || 26}, ${ichiParams.laggingSpanPeriod || 52}, ${ichiParams.displacement || 26})\n`
          break
        case "volume":
          code += `var volume = volume\n`
          code += `var volumeMA = ta.sma(volume, 20)\n`
          break
        case "momentum":
          const momParams = getIndicatorParams(strategy, "momentum")
          code += `var momentum = ta.mom(${momParams.source || "close"}, ${momParams.period || 10})\n`
          break
        case "custom":
          const customParams = getIndicatorParams(strategy, "custom")
          code += `var custom = ${customParams.formula || "sma(close, 20) + atr(14) * 2"}\n`
          break
        default:
          // For other indicators, just add a placeholder
          code += `var ${indicator} = ta.${indicator}(close)\n`
      }
    })

    code += "\n"

    // Entry Long
    code += "// Entry Long\n"
    strategy.entryLong.conditionGroups.forEach((group, groupIndex) => {
      if (groupIndex > 0) code += "OR\n"
      code += "IF (\n"
      group.conditions.forEach((condition, conditionIndex) => {
        const logicMap: Record<string, string> = {
          crosses_above: "crosses above",
          crosses_below: "crosses below",
          greater_than: ">",
          less_than: "<",
          equals: "==",
          inside: "inside",
          outside: "outside",
          touches: "touches",
          increasing: "is increasing",
          decreasing: "is decreasing",
          bullish: "is bullish",
          bearish: "is bearish",
          overbought: "> 70",
          oversold: "< 30",
          center_cross_up: "crosses above 50",
          center_cross_down: "crosses below 50",
          zero_cross_up: "crosses above 0",
          zero_cross_down: "crosses below 0",
          histogram_positive: "histogram > 0",
          histogram_negative: "histogram < 0",
          histogram_increasing: "histogram is increasing",
          histogram_decreasing: "histogram is decreasing",
          enters_overbought: "enters overbought zone",
          exits_overbought: "exits overbought zone",
          enters_oversold: "enters oversold zone",
          exits_oversold: "exits oversold zone",
          bullish_divergence: "shows bullish divergence",
          bearish_divergence: "shows bearish divergence",
          strong_trend: "shows strong trend",
          weak_trend: "shows weak trend",
          di_plus_above_di_minus: "DI+ > DI-",
          di_plus_below_di_minus: "DI+ < DI-",
          above_cloud: "is above cloud",
          below_cloud: "is below cloud",
          inside_cloud: "is inside cloud",
          tenkan_kijun_cross: "tenkan crosses kijun",
          changes_to_bullish: "changes to bullish",
          changes_to_bearish: "changes to bearish",
          squeeze: "is in squeeze",
          expansion: "is in expansion",
          percent_change: "percent change",
          turns_up: "turns up",
          turns_down: "turns down",
          above_average: "above average",
          below_average: "below average",
          spike: "shows spike",
        }

        // Get indicator parameter for display
        const indicatorDisplay = getIndicatorDisplayName(condition)
        const indicatorVariable = getIndicatorVariable(condition)

        // Handle crossover/crossunder between indicators
        if (condition.logic === "crosses_above" || condition.logic === "crosses_below") {
          if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
            // Extract the target indicator from the value
            const targetIndicator = condition.value.split(":")[1]
            const targetIndicatorDisplay = getIndicatorDisplayName({ indicator: targetIndicator })
            code += `  ${indicatorDisplay} ${logicMap[condition.logic]} ${targetIndicatorDisplay} [${condition.timeframe}]`
          } else {
            code += `  ${indicatorDisplay} ${logicMap[condition.logic]} ${condition.value} [${condition.timeframe}]`
          }
        } else {
          code += `  ${indicatorDisplay} ${logicMap[condition.logic] || condition.logic} ${condition.value} [${condition.timeframe}]`
        }

        if (conditionIndex < group.conditions.length - 1) {
          code += ` ${group.operator.toUpperCase()}\n`
        } else {
          code += "\n"
        }
      })
      code += ")\n  ENTER LONG\n\n"
    })

    // Entry Short
    code += "// Entry Short\n"
    strategy.entryShort.conditionGroups.forEach((group, groupIndex) => {
      if (groupIndex > 0) code += "OR\n"
      code += "IF (\n"
      group.conditions.forEach((condition, conditionIndex) => {
        const logicMap: Record<string, string> = {
          crosses_above: "crosses above",
          crosses_below: "crosses below",
          greater_than: ">",
          less_than: "<",
          equals: "==",
          inside: "inside",
          outside: "outside",
          touches: "touches",
          increasing: "is increasing",
          decreasing: "is decreasing",
          bullish: "is bullish",
          bearish: "is bearish",
          overbought: "> 70",
          oversold: "< 30",
          center_cross_up: "crosses above 50",
          center_cross_down: "crosses below 50",
          zero_cross_up: "crosses above 0",
          zero_cross_down: "crosses below 0",
          histogram_positive: "histogram > 0",
          histogram_negative: "histogram < 0",
          histogram_increasing: "histogram is increasing",
          histogram_decreasing: "histogram is decreasing",
          enters_overbought: "enters overbought zone",
          exits_overbought: "exits overbought zone",
          enters_oversold: "enters oversold zone",
          exits_oversold: "exits oversold zone",
          bullish_divergence: "shows bullish divergence",
          bearish_divergence: "shows bearish divergence",
          strong_trend: "shows strong trend",
          weak_trend: "shows weak trend",
          di_plus_above_di_minus: "DI+ > DI-",
          di_plus_below_di_minus: "DI+ < DI-",
          above_cloud: "is above cloud",
          below_cloud: "is below cloud",
          inside_cloud: "is inside cloud",
          tenkan_kijun_cross: "tenkan crosses kijun",
          changes_to_bullish: "changes to bullish",
          changes_to_bearish: "changes to bearish",
          squeeze: "is in squeeze",
          expansion: "is in expansion",
          percent_change: "percent change",
          turns_up: "turns up",
          turns_down: "turns down",
          above_average: "above average",
          below_average: "below average",
          spike: "shows spike",
        }

        // Get indicator parameter for display
        const indicatorDisplay = getIndicatorDisplayName(condition)
        const indicatorVariable = getIndicatorVariable(condition)

        // Handle crossover/crossunder between indicators
        if (condition.logic === "crosses_above" || condition.logic === "crosses_below") {
          if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
            // Extract the target indicator from the value
            const targetIndicator = condition.value.split(":")[1]
            const targetIndicatorDisplay = getIndicatorDisplayName({ indicator: targetIndicator })
            code += `  ${indicatorDisplay} ${logicMap[condition.logic]} ${targetIndicatorDisplay} [${condition.timeframe}]`
          } else {
            code += `  ${indicatorDisplay} ${logicMap[condition.logic]} ${condition.value} [${condition.timeframe}]`
          }
        } else {
          code += `  ${indicatorDisplay} ${logicMap[condition.logic] || condition.logic} ${condition.value} [${condition.timeframe}]`
        }

        if (conditionIndex < group.conditions.length - 1) {
          code += ` ${group.operator.toUpperCase()}\n`
        } else {
          code += "\n"
        }
      })
      code += ")\n  ENTER SHORT\n\n"
    })

    // Exit Long
    code += "// Exit Long\n"
    strategy.exitLong.conditionGroups.forEach((group, groupIndex) => {
      if (groupIndex > 0) code += "OR\n"
      code += "IF (\n"
      group.conditions.forEach((condition, conditionIndex) => {
        const logicMap: Record<string, string> = {
          crosses_above: "crosses above",
          crosses_below: "crosses below",
          greater_than: ">",
          less_than: "<",
          equals: "==",
          inside: "inside",
          outside: "outside",
          touches: "touches",
          increasing: "is increasing",
          decreasing: "is decreasing",
          bullish: "is bullish",
          bearish: "is bearish",
          overbought: "> 70",
          oversold: "< 30",
          center_cross_up: "crosses above 50",
          center_cross_down: "crosses below 50",
          zero_cross_up: "crosses above 0",
          zero_cross_down: "crosses below 0",
          histogram_positive: "histogram > 0",
          histogram_negative: "histogram < 0",
          histogram_increasing: "histogram is increasing",
          histogram_decreasing: "histogram is decreasing",
          enters_overbought: "enters overbought zone",
          exits_overbought: "exits overbought zone",
          enters_oversold: "enters oversold zone",
          exits_oversold: "exits oversold zone",
          bullish_divergence: "shows bullish divergence",
          bearish_divergence: "shows bearish divergence",
          strong_trend: "shows strong trend",
          weak_trend: "shows weak trend",
          di_plus_above_di_minus: "DI+ > DI-",
          di_plus_below_di_minus: "DI+ < DI-",
          above_cloud: "is above cloud",
          below_cloud: "is below cloud",
          inside_cloud: "is inside cloud",
          tenkan_kijun_cross: "tenkan crosses kijun",
          changes_to_bullish: "changes to bullish",
          changes_to_bearish: "changes to bearish",
          squeeze: "is in squeeze",
          expansion: "is in expansion",
          percent_change: "percent change",
          turns_up: "turns up",
          turns_down: "turns down",
          above_average: "above average",
          below_average: "below average",
          spike: "shows spike",
        }

        // Get indicator parameter for display
        const indicatorDisplay = getIndicatorDisplayName(condition)
        const indicatorVariable = getIndicatorVariable(condition)

        // Handle crossover/crossunder between indicators
        if (condition.logic === "crosses_above" || condition.logic === "crosses_below") {
          if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
            // Extract the target indicator from the value
            const targetIndicator = condition.value.split(":")[1]
            const targetIndicatorDisplay = getIndicatorDisplayName({ indicator: targetIndicator })
            code += `  ${indicatorDisplay} ${logicMap[condition.logic]} ${targetIndicatorDisplay} [${condition.timeframe}]`
          } else {
            code += `  ${indicatorDisplay} ${logicMap[condition.logic]} ${condition.value} [${condition.timeframe}]`
          }
        } else {
          code += `  ${indicatorDisplay} ${logicMap[condition.logic] || condition.logic} ${condition.value} [${condition.timeframe}]`
        }

        if (conditionIndex < group.conditions.length - 1) {
          code += ` ${group.operator.toUpperCase()}\n`
        } else {
          code += "\n"
        }
      })
      code += ")\n  EXIT LONG\n\n"
    })

    // Exit Short
    code += "// Exit Short\n"
    strategy.exitShort.conditionGroups.forEach((group, groupIndex) => {
      if (groupIndex > 0) code += "OR\n"
      code += "IF (\n"
      group.conditions.forEach((condition, conditionIndex) => {
        const logicMap: Record<string, string> = {
          crosses_above: "crosses above",
          crosses_below: "crosses below",
          greater_than: ">",
          less_than: "<",
          equals: "==",
          inside: "inside",
          outside: "outside",
          touches: "touches",
          increasing: "is increasing",
          decreasing: "is decreasing",
          bullish: "is bullish",
          bearish: "is bearish",
          overbought: "> 70",
          oversold: "< 30",
          center_cross_up: "crosses above 50",
          center_cross_down: "crosses below 50",
          zero_cross_up: "crosses above 0",
          zero_cross_down: "crosses below 0",
          histogram_positive: "histogram > 0",
          histogram_negative: "histogram < 0",
          histogram_increasing: "histogram is increasing",
          histogram_decreasing: "histogram is decreasing",
          enters_overbought: "enters overbought zone",
          exits_overbought: "exits overbought zone",
          enters_oversold: "enters oversold zone",
          exits_oversold: "exits oversold zone",
          bullish_divergence: "shows bullish divergence",
          bearish_divergence: "shows bearish divergence",
          strong_trend: "shows strong trend",
          weak_trend: "shows weak trend",
          di_plus_above_di_minus: "DI+ > DI-",
          di_plus_below_di_minus: "DI+ < DI-",
          above_cloud: "is above cloud",
          below_cloud: "is below cloud",
          inside_cloud: "is inside cloud",
          tenkan_kijun_cross: "tenkan crosses kijun",
          changes_to_bullish: "changes to bullish",
          changes_to_bearish: "changes to bearish",
          squeeze: "is in squeeze",
          expansion: "is in expansion",
          percent_change: "percent change",
          turns_up: "turns up",
          turns_down: "turns down",
          above_average: "above average",
          below_average: "below average",
          spike: "shows spike",
        }

        // Get indicator parameter for display
        const indicatorDisplay = getIndicatorDisplayName(condition)
        const indicatorVariable = getIndicatorVariable(condition)

        // Handle crossover/crossunder between indicators
        if (condition.logic === "crosses_above" || condition.logic === "crosses_below") {
          if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
            // Extract the target indicator from the value
            const targetIndicator = condition.value.split(":")[1]
            const targetIndicatorDisplay = getIndicatorDisplayName({ indicator: targetIndicator })
            code += `  ${indicatorDisplay} ${logicMap[condition.logic]} ${targetIndicatorDisplay} [${condition.timeframe}]`
          } else {
            code += `  ${indicatorDisplay} ${logicMap[condition.logic]} ${condition.value} [${condition.timeframe}]`
          }
        } else {
          code += `  ${indicatorDisplay} ${logicMap[condition.logic] || condition.logic} ${condition.value} [${condition.timeframe}]`
        }

        if (conditionIndex < group.conditions.length - 1) {
          code += ` ${group.operator.toUpperCase()}\n`
        } else {
          code += "\n"
        }
      })
      code += ")\n  EXIT SHORT\n\n"
    })

    // Risk Management
    code += "// Risk Management\n"

    // Stop Loss
    if (strategy.riskManagement.stopLoss.length > 0) {
      code += "// Stop Loss\n"
      strategy.riskManagement.stopLoss.forEach((rule) => {
        if (rule.enabled) {
          const typeMap: Record<string, string> = {
            fixed: "at fixed price",
            percentage: "at percentage",
            atr: "at ATR multiple",
            volatility: "based on volatility",
            equity: "based on equity percentage",
            support: "at support level",
            swing: "at swing low/high",
            chandelier: "using chandelier exit",
            custom: "using custom formula",
          }
          code += `SET_STOP_LOSS ${typeMap[rule.type]} ${rule.value}\n`
        }
      })
      code += "\n"
    }

    // Take Profit
    if (strategy.riskManagement.takeProfit.length > 0) {
      code += "// Take Profit\n"
      strategy.riskManagement.takeProfit.forEach((rule) => {
        if (rule.enabled) {
          const typeMap: Record<string, string> = {
            fixed: "at fixed price",
            percentage: "at percentage",
            atr: "at ATR multiple",
            volatility: "based on volatility",
            equity: "based on equity percentage",
            resistance: "at resistance level",
            "risk-reward": "at risk-reward ratio",
            trailing: "with trailing profit",
            custom: "using custom formula",
          }
          code += `SET_TAKE_PROFIT ${typeMap[rule.type]} ${rule.value}\n`
        }
      })
      code += "\n"
    }

    // Trailing Stop
    if (strategy.riskManagement.trailingStop.length > 0) {
      code += "// Trailing Stop\n"
      strategy.riskManagement.trailingStop.forEach((rule) => {
        if (rule.enabled) {
          const typeMap: Record<string, string> = {
            fixed: "at fixed points",
            percentage: "at percentage",
            atr: "at ATR multiple",
            volatility: "based on volatility",
            parabolic: "using parabolic SAR",
            "moving-average": "using moving average",
            custom: "using custom formula",
          }
          code += `SET_TRAILING_STOP ${typeMap[rule.type]} ${rule.value}\n`
        }
      })
      code += "\n"
    }

    // Time Exit
    if (strategy.riskManagement.timeExit.length > 0) {
      code += "// Time Exit\n"
      strategy.riskManagement.timeExit.forEach((rule) => {
        if (rule.enabled) {
          const typeMap: Record<string, string> = {
            bars: "after bars",
            time: "at time",
            date: "on date",
            "session-end": "at session end",
            custom: "using custom condition",
          }
          code += `EXIT_AFTER ${typeMap[rule.type]} ${rule.value}\n`
        }
      })
      code += "\n"
    }

    // Position Sizing
    if (strategy.riskManagement.positionSizing.length > 0) {
      code += "// Position Sizing\n"
      strategy.riskManagement.positionSizing.forEach((rule) => {
        if (rule.enabled) {
          const typeMap: Record<string, string> = {
            fixed: "fixed units",
            percentage: "percentage of equity",
            "risk-reward": "based on risk/reward ratio",
            kelly: "using Kelly criterion",
            "optimal-f": "using Optimal F",
            martingale: "using Martingale strategy",
            "anti-martingale": "using Anti-Martingale strategy",
            "volatility-based": "based on volatility",
            custom: "using custom formula",
          }
          code += `SET_POSITION_SIZE ${typeMap[rule.type]} ${rule.value} WITH MAX_RISK ${rule.maxRisk}%\n`
        }
      })
      code += "\n"
    }

    // General Risk Settings
    code += "// General Risk Settings\n"
    code += `SET_MAX_OPEN_POSITIONS ${strategy.riskManagement.maxOpenPositions}\n`
    code += `SET_MAX_DRAWDOWN ${strategy.riskManagement.maxDrawdown}%\n`
    if (strategy.riskManagement.maxDailyLoss > 0) {
      code += `SET_MAX_DAILY_LOSS ${strategy.riskManagement.maxDailyLoss}%\n`
    }
    if (strategy.riskManagement.maxConsecutiveLosses > 0) {
      code += `SET_MAX_CONSECUTIVE_LOSSES ${strategy.riskManagement.maxConsecutiveLosses}\n`
    }
    if (strategy.riskManagement.profitTarget > 0) {
      code += `SET_PROFIT_TARGET ${strategy.riskManagement.profitTarget}%\n`
    }
    if (strategy.riskManagement.riskRewardMinimum > 0) {
      code += `SET_MIN_RISK_REWARD_RATIO ${strategy.riskManagement.riskRewardMinimum}\n`
    }
    if (strategy.riskManagement.pyramiding > 0) {
      code += `SET_PYRAMIDING ${strategy.riskManagement.pyramiding}\n`
    }

    return code
  }

  // Generate Pine Script code
  const generatePineScript = () => {
    let code = `//@version=5
strategy("${strategy.name}", overlay=true, margin_long=100, margin_short=100)

// Input parameters
riskPerTrade = input.float(${strategy.riskManagement.positionSizing[0]?.maxRisk || 2}, "Risk Per Trade (%)", minval=0.1, maxval=100, step=0.1)
maxPositions = input.int(${strategy.riskManagement.maxOpenPositions}, "Max Open Positions", minval=1, maxval=100, step=1)
maxDrawdown = input.float(${strategy.riskManagement.maxDrawdown}, "Max Drawdown (%)", minval=1, maxval=100, step=1)

// Define indicators
`

    // Collect all indicators from entry and exit rules
    const indicators = new Set<string>()
    const collectIndicators = (positionRule: any) => {
      positionRule.conditionGroups.forEach((group: any) => {
        group.conditions.forEach((condition: any) => {
          indicators.add(condition.indicator)
        })
      })
    }

    collectIndicators(strategy.entryLong)
    collectIndicators(strategy.entryShort)
    collectIndicators(strategy.exitLong)
    collectIndicators(strategy.exitShort)

    // Generate indicator definitions
    indicators.forEach((indicator) => {
      switch (indicator) {
        case "price":
          code += `// Price is already available as 'close', 'open', 'high', 'low'\n`
          break
        case "sma":
          const smaParams = getIndicatorParams(strategy, "sma")
          code += `sma(${smaParams.source || "close"}, ${smaParams.period})\n`
          break
        case "ema":
          const emaParams = getIndicatorParams(strategy, "ema")
          code += `ema(${emaParams.source || "close"}, ${emaParams.period})\n`
          break
        case "wma":
          const wmaParams = getIndicatorParams(strategy, "wma")
          code += `wma(${wmaParams.source || "close"}, ${wmaParams.period})\n`
          break
        case "hma":
          const hmaParams = getIndicatorParams(strategy, "hma")
          code += `hma(${hmaParams.source || "close"}, ${hmaParams.period})\n`
          break
        case "vwap":
          code += `vwap = ta.vwap(hlc3)\n`
          break
        case "rsi":
          const rsiParams = getIndicatorParams(strategy, "rsi")
          code += `rsi(${rsiParams.source || "close"}, ${rsiParams.period})\n`
          break
        case "macd":
          const macdParams = getIndicatorParams(strategy, "macd")
          code += `[macdLine, signalLine, histogram] = ta.macd(${macdParams.source || "close"}, ${macdParams.fastPeriod || 12}, ${macdParams.slowPeriod || 26}, ${macdParams.signalPeriod || 9})\n`
          break
        case "bollinger":
          const bbParams = getIndicatorParams(strategy, "bollinger")
          code += `[upperBand, middleBand, lowerBand] = ta.bbands(${bbParams.source || "close"}, ${bbParams.period || 20}, ${bbParams.stdDev || 2})\n`
          break
        case "atr":
          const atrParams = getIndicatorParams(strategy, "atr")
          code += `atr(${atrParams.period})\n`
          break
        case "stochastic":
          const stochParams = getIndicatorParams(strategy, "stochastic")
          code += `[k, d] = ta.stoch(high, low, close, ${stochParams.kPeriod || 14}, ${stochParams.dPeriod || 3}, ${stochParams.slowing || 3})\n`
          break
        case "adx":
          const adxParams = getIndicatorParams(strategy, "adx")
          code += `[adx, diPlus, diMinus] = ta.adx(high, low, close, ${adxParams.period || 14})\n`
          break
        case "supertrend":
          const stParams = getIndicatorParams(strategy, "supertrend")
          code += `// SuperTrend calculation
atrPeriod = ${stParams.period || 10}
factor = ${stParams.multiplier || 3}
atr = ta.atr(atrPeriod)
upperBand = hl2 + factor * atr
lowerBand = hl2 - factor * atr
supertrend = 0.0
direction = 0

supertrend := close[1] > supertrend[1] ? math.max(lowerBand, supertrend[1]) : math.min(upperBand, supertrend[1])
direction := close > supertrend ? 1 : -1\n`
          break
        case "ichimoku":
          const ichiParams = getIndicatorParams(strategy, "ichimoku")
          code += `// Ichimoku Cloud
conversionPeriod = ${ichiParams.conversionPeriod || 9}
basePeriod = ${ichiParams.basePeriod || 26}
laggingSpanPeriod = ${ichiParams.laggingSpanPeriod || 52}
displacement = ${ichiParams.displacement || 26}

donchianHigh(len) => math.max(high, len)
donchianLow(len) => math.min(low, len)

tenkan = (donchianHigh(conversionPeriod) + donchianLow(conversionPeriod)) / 2
kijun = (donchianHigh(basePeriod) + donchianLow(basePeriod)) / 2
senkou_a = (tenkan + kijun) / 2
senkou_b = (donchianHigh(laggingSpanPeriod) + donchianLow(laggingSpanPeriod)) / 2
chikou = close\n`
          break
        case "volume":
          code += `// Volume indicators
volumeMA = ta.sma(volume, 20)\n`
          break
        case "momentum":
          const momParams = getIndicatorParams(strategy, "momentum")
          code += `momentum(${momParams.source || "close"}, ${momParams.period || 10})\n`
          break
        case "custom":
          const customParams = getIndicatorParams(strategy, "custom")
          code += `// Custom indicator
customValue = ${customParams.formula || "ta.sma(close, 20) + ta.atr(14) * 2"}\n`
          break
        default:
          // For other indicators, just add a placeholder
          code += `${indicator}Value = 0.0  // Placeholder for ${indicator}\n`
      }
    })

    code += `
// Entry conditions
`

    // Entry Long
    code += `// Long entry\n`
    code += `longEntryCondition = `

    if (strategy.entryLong.conditionGroups.length > 0) {
      strategy.entryLong.conditionGroups.forEach((group, groupIndex) => {
        if (groupIndex > 0) code += ` or `

        code += `(`
        group.conditions.forEach((condition, conditionIndex) => {
          const logicMap: Record<string, string> = {
            crosses_above: "ta.crossover",
            crosses_below: "ta.crossunder",
            greater_than: ">",
            less_than: "<",
            equals: "==",
          }

          // Handle different logic types
          if (condition.logic === "crosses_above") {
            if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
              const targetIndicator = condition.value.split(":")[1]
              const targetVariable = getIndicatorVariable({ indicator: targetIndicator })
              code += `ta.crossover(${getIndicatorVariable(condition)}, ${targetVariable})`
            } else {
              code += `ta.crossover(${getIndicatorVariable(condition)}, ${condition.value})`
            }
          } else if (condition.logic === "crosses_below") {
            if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
              const targetIndicator = condition.value.split(":")[1]
              const targetVariable = getIndicatorVariable({ indicator: targetIndicator })
              code += `ta.crossunder(${getIndicatorVariable(condition)}, ${targetVariable})`
            } else {
              code += `ta.crossunder(${getIndicatorVariable(condition)}, ${condition.value})`
            }
          } else if (condition.logic === "center_cross_up") {
            code += `ta.crossover(${getIndicatorVariable(condition)}, 50)`
          } else if (condition.logic === "center_cross_down") {
            code += `ta.crossunder(${getIndicatorVariable(condition)}, 50)`
          } else if (condition.logic === "zero_cross_up") {
            code += `ta.crossover(${getIndicatorVariable(condition)}, 0)`
          } else if (condition.logic === "zero_cross_down") {
            code += `ta.crossunder(${getIndicatorVariable(condition)}, 0)`
          } else if (condition.logic === "histogram_positive") {
            code += `histogram > 0`
          } else if (condition.logic === "histogram_negative") {
            code += `histogram < 0`
          } else if (condition.logic === "histogram_increasing") {
            code += `histogram > histogram[1]`
          } else if (condition.logic === "histogram_decreasing") {
            code += `histogram < histogram[1]`
          } else if (condition.logic === "overbought") {
            code += `${getIndicatorVariable(condition)} > 70`
          } else if (condition.logic === "oversold") {
            code += `${getIndicatorVariable(condition)} < 30`
          } else if (condition.logic === "enters_overbought") {
            code += `${getIndicatorVariable(condition)} > 70 and ${getIndicatorVariable(condition)}[1] <= 70`
          } else if (condition.logic === "exits_overbought") {
            code += `${getIndicatorVariable(condition)} < 70 and ${getIndicatorVariable(condition)}[1] >= 70`
          } else if (condition.logic === "enters_oversold") {
            code += `${getIndicatorVariable(condition)} < 30 and ${getIndicatorVariable(condition)}[1] >= 30`
          } else if (condition.logic === "exits_oversold") {
            code += `${getIndicatorVariable(condition)} > 30 and ${getIndicatorVariable(condition)}[1] <= 30`
          } else if (condition.logic === "increasing") {
            code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1]`
          } else if (condition.logic === "decreasing") {
            code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1]`
          } else if (condition.logic === "bullish") {
            if (condition.indicator === "supertrend") {
              code += `direction == 1`
            } else {
              code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1]`
            }
          } else if (condition.logic === "bearish") {
            if (condition.indicator === "supertrend") {
              code += `direction == -1`
            } else {
              code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1]`
            }
          } else if (condition.logic === "changes_to_bullish") {
            if (condition.indicator === "supertrend") {
              code += `direction == 1 and direction[1] == -1`
            } else {
              code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1] and ${getIndicatorVariable(condition)}[1] <= ${getIndicatorVariable(condition)}[2]`
            }
          } else if (condition.logic === "changes_to_bearish") {
            if (condition.indicator === "supertrend") {
              code += `direction == -1 and direction[1] == 1`
            } else {
              code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1] and ${getIndicatorVariable(condition)}[1] >= ${getIndicatorVariable(condition)}[2]`
            }
          } else if (condition.logic === "strong_trend") {
            if (condition.indicator === "adx") {
              code += `adx > 25`
            } else {
              code += `${getIndicatorVariable(condition)} > 25`
            }
          } else if (condition.logic === "weak_trend") {
            if (condition.indicator === "adx") {
              code += `adx < 20`
            } else {
              code += `${getIndicatorVariable(condition)} < 20`
            }
          } else if (condition.logic === "di_plus_above_di_minus") {
            code += `diPlus > diMinus`
          } else if (condition.logic === "di_plus_below_di_minus") {
            code += `diPlus < diMinus`
          } else if (condition.logic === "above_cloud") {
            code += `close > math.max(senkou_a, senkou_b)`
          } else if (condition.logic === "below_cloud") {
            code += `close < math.min(senkou_a, senkou_b)`
          } else if (condition.logic === "inside_cloud") {
            code += `close > math.min(senkou_a, senkou_b) and close < math.max(senkou_a, senkou_b)`
          } else if (condition.logic === "tenkan_kijun_cross") {
            code += `ta.crossover(tenkan, kijun)`
          } else if (condition.logic === "squeeze") {
            if (condition.indicator === "bollinger") {
              code += `(upperBand - lowerBand) / middleBand < 0.1`
            } else {
              code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1] * 0.9`
            }
          } else if (condition.logic === "expansion") {
            if (condition.indicator === "bollinger") {
              code += `(upperBand - lowerBand) / middleBand > 0.2`
            } else {
              code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1] * 1.1`
            }
          } else if (condition.logic === "turns_up") {
            code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1] and ${getIndicatorVariable(condition)}[1] <= ${getIndicatorVariable(condition)}[2]`
          } else if (condition.logic === "turns_down") {
            code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1] and ${getIndicatorVariable(condition)}[1] >= ${getIndicatorVariable(condition)}[2]`
          } else if (condition.logic === "above_average") {
            if (condition.indicator === "volume") {
              code += `volume > volumeMA`
            } else {
              code += `${getIndicatorVariable(condition)} > ta.sma(${getIndicatorVariable(condition)}, 20)`
            }
          } else if (condition.logic === "below_average") {
            if (condition.indicator === "volume") {
              code += `volume < volumeMA`
            } else {
              code += `${getIndicatorVariable(condition)} < ta.sma(${getIndicatorVariable(condition)}, 20)`
            }
          } else if (condition.logic === "spike") {
            if (condition.indicator === "volume") {
              code += `volume > volumeMA * 2`
            } else {
              code += `${getIndicatorVariable(condition)} > ta.sma(${getIndicatorVariable(condition)}, 20) * 2`
            }
          } else {
            code += `${getIndicatorVariable(condition)} ${logicMap[condition.logic] || condition.logic} ${condition.value}`
          }

          if (conditionIndex < group.conditions.length - 1) {
            code += ` ${group.operator === "and" ? "and" : "or"} `
          }
        })
        code += `)`
      })
    } else {
      code += `false`
    }

    code += `\n\n`

    // Entry Short
    code += `// Short entry\n`
    code += `shortEntryCondition = `

    if (strategy.entryShort.conditionGroups.length > 0) {
      strategy.entryShort.conditionGroups.forEach((group, groupIndex) => {
        if (groupIndex > 0) code += ` or `

        code += `(`
        group.conditions.forEach((condition, conditionIndex) => {
          const logicMap: Record<string, string> = {
            crosses_above: "ta.crossover",
            crosses_below: "ta.crossunder",
            greater_than: ">",
            less_than: "<",
            equals: "==",
          }

          // Handle different logic types
          if (condition.logic === "crosses_above") {
            if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
              const targetIndicator = condition.value.split(":")[1]
              const targetVariable = getIndicatorVariable({ indicator: targetIndicator })
              code += `ta.crossover(${getIndicatorVariable(condition)}, ${targetVariable})`
            } else {
              code += `ta.crossover(${getIndicatorVariable(condition)}, ${condition.value})`
            }
          } else if (condition.logic === "crosses_below") {
            if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
              const targetIndicator = condition.value.split(":")[1]
              const targetVariable = getIndicatorVariable({ indicator: targetIndicator })
              code += `ta.crossunder(${getIndicatorVariable(condition)}, ${targetVariable})`
            } else {
              code += `ta.crossunder(${getIndicatorVariable(condition)}, ${condition.value})`
            }
          } else if (condition.logic === "center_cross_up") {
            code += `ta.crossover(${getIndicatorVariable(condition)}, 50)`
          } else if (condition.logic === "center_cross_down") {
            code += `ta.crossunder(${getIndicatorVariable(condition)}, 50)`
          } else if (condition.logic === "zero_cross_up") {
            code += `ta.crossover(${getIndicatorVariable(condition)}, 0)`
          } else if (condition.logic === "zero_cross_down") {
            code += `ta.crossunder(${getIndicatorVariable(condition)}, 0)`
          } else if (condition.logic === "histogram_positive") {
            code += `histogram > 0`
          } else if (condition.logic === "histogram_negative") {
            code += `histogram < 0`
          } else if (condition.logic === "histogram_increasing") {
            code += `histogram > histogram[1]`
          } else if (condition.logic === "histogram_decreasing") {
            code += `histogram < histogram[1]`
          } else if (condition.logic === "overbought") {
            code += `${getIndicatorVariable(condition)} > 70`
          } else if (condition.logic === "oversold") {
            code += `${getIndicatorVariable(condition)} < 30`
          } else if (condition.logic === "enters_overbought") {
            code += `${getIndicatorVariable(condition)} > 70 and ${getIndicatorVariable(condition)}[1] <= 70`
          } else if (condition.logic === "exits_overbought") {
            code += `${getIndicatorVariable(condition)} < 70 and ${getIndicatorVariable(condition)}[1] >= 70`
          } else if (condition.logic === "enters_oversold") {
            code += `${getIndicatorVariable(condition)} < 30 and ${getIndicatorVariable(condition)}[1] >= 30`
          } else if (condition.logic === "exits_oversold") {
            code += `${getIndicatorVariable(condition)} > 30 and ${getIndicatorVariable(condition)}[1] <= 30`
          } else if (condition.logic === "increasing") {
            code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1]`
          } else if (condition.logic === "decreasing") {
            code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1]`
          } else if (condition.logic === "bullish") {
            if (condition.indicator === "supertrend") {
              code += `direction == 1`
            } else {
              code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1]`
            }
          } else if (condition.logic === "bearish") {
            if (condition.indicator === "supertrend") {
              code += `direction == -1`
            } else {
              code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1]`
            }
          } else if (condition.logic === "changes_to_bullish") {
            if (condition.indicator === "supertrend") {
              code += `direction == 1 and direction[1] == -1`
            } else {
              code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1] and ${getIndicatorVariable(condition)}[1] <= ${getIndicatorVariable(condition)}[2]`
            }
          } else if (condition.logic === "changes_to_bearish") {
            if (condition.indicator === "supertrend") {
              code += `direction == -1 and direction[1] == 1`
            } else {
              code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1] and ${getIndicatorVariable(condition)}[1] >= ${getIndicatorVariable(condition)}[2]`
            }
          } else if (condition.logic === "strong_trend") {
            if (condition.indicator === "adx") {
              code += `adx > 25`
            } else {
              code += `${getIndicatorVariable(condition)} > 25`
            }
          } else if (condition.logic === "weak_trend") {
            if (condition.indicator === "adx") {
              code += `adx < 20`
            } else {
              code += `${getIndicatorVariable(condition)} < 20`
            }
          } else if (condition.logic === "di_plus_above_di_minus") {
            code += `diPlus > diMinus`
          } else if (condition.logic === "di_plus_below_di_minus") {
            code += `diPlus < diMinus`
          } else if (condition.logic === "above_cloud") {
            code += `close > math.max(senkou_a, senkou_b)`
          } else if (condition.logic === "below_cloud") {
            code += `close < math.min(senkou_a, senkou_b)`
          } else if (condition.logic === "inside_cloud") {
            code += `close > math.min(senkou_a, senkou_b) and close < math.max(senkou_a, senkou_b)`
          } else if (condition.logic === "tenkan_kijun_cross") {
            code += `ta.crossover(tenkan, kijun)`
          } else if (condition.logic === "squeeze") {
            if (condition.indicator === "bollinger") {
              code += `(upperBand - lowerBand) / middleBand < 0.1`
            } else {
              code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1] * 0.9`
            }
          } else if (condition.logic === "expansion") {
            if (condition.indicator === "bollinger") {
              code += `(upperBand - lowerBand) / middleBand > 0.2`
            } else {
              code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1] * 1.1`
            }
          } else if (condition.logic === "turns_up") {
            code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1] and ${getIndicatorVariable(condition)}[1] <= ${getIndicatorVariable(condition)}[2]`
          } else if (condition.logic === "turns_down") {
            code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1] and ${getIndicatorVariable(condition)}[1] >= ${getIndicatorVariable(condition)}[2]`
          } else if (condition.logic === "above_average") {
            if (condition.indicator === "volume") {
              code += `volume > volumeMA`
            } else {
              code += `${getIndicatorVariable(condition)} > ta.sma(${getIndicatorVariable(condition)}, 20)`
            }
          } else if (condition.logic === "below_average") {
            if (condition.indicator === "volume") {
              code += `volume < volumeMA`
            } else {
              code += `${getIndicatorVariable(condition)} < ta.sma(${getIndicatorVariable(condition)}, 20)`
            }
          } else if (condition.logic === "spike") {
            if (condition.indicator === "volume") {
              code += `volume > volumeMA * 2`
            } else {
              code += `${getIndicatorVariable(condition)} > ta.sma(${getIndicatorVariable(condition)}, 20) * 2`
            }
          } else {
            code += `${getIndicatorVariable(condition)} ${logicMap[condition.logic] || condition.logic} ${condition.value}`
          }

          if (conditionIndex < group.conditions.length - 1) {
            code += ` ${group.operator === "and" ? "and" : "or"} `
          }
        })
        code += `)`
      })
    } else {
      code += `false`
    }

    code += `\n\n`

    // Exit Long
    code += `// Long exit\n`
    code += `longExitCondition = `

    if (strategy.exitLong.conditionGroups.length > 0) {
      strategy.exitLong.conditionGroups.forEach((group, groupIndex) => {
        if (groupIndex > 0) code += ` or `

        code += `(`
        group.conditions.forEach((condition, conditionIndex) => {
          const logicMap: Record<string, string> = {
            crosses_above: "ta.crossover",
            crosses_below: "ta.crossunder",
            greater_than: ">",
            less_than: "<",
            equals: "==",
          }

          // Handle different logic types using the same pattern as entry conditions
          if (condition.logic === "crosses_above") {
            if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
              const targetIndicator = condition.value.split(":")[1]
              const targetVariable = getIndicatorVariable({ indicator: targetIndicator })
              code += `ta.crossover(${getIndicatorVariable(condition)}, ${targetVariable})`
            } else {
              code += `ta.crossover(${getIndicatorVariable(condition)}, ${condition.value})`
            }
          } else if (condition.logic === "crosses_below") {
            if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
              const targetIndicator = condition.value.split(":")[1]
              const targetVariable = getIndicatorVariable({ indicator: targetIndicator })
              code += `ta.crossunder(${getIndicatorVariable(condition)}, ${targetVariable})`
            } else {
              code += `ta.crossunder(${getIndicatorVariable(condition)}, ${condition.value})`
            }
          } else if (condition.logic === "center_cross_up") {
            code += `ta.crossover(${getIndicatorVariable(condition)}, 50)`
          } else if (condition.logic === "center_cross_down") {
            code += `ta.crossunder(${getIndicatorVariable(condition)}, 50)`
          } else if (condition.logic === "zero_cross_up") {
            code += `ta.crossover(${getIndicatorVariable(condition)}, 0)`
          } else if (condition.logic === "zero_cross_down") {
            code += `ta.crossunder(${getIndicatorVariable(condition)}, 0)`
          } else if (condition.logic === "histogram_positive") {
            code += `histogram > 0`
          } else if (condition.logic === "histogram_negative") {
            code += `histogram < 0`
          } else if (condition.logic === "histogram_increasing") {
            code += `histogram > histogram[1]`
          } else if (condition.logic === "histogram_decreasing") {
            code += `histogram < histogram[1]`
          } else if (condition.logic === "overbought") {
            code += `${getIndicatorVariable(condition)} > 70`
          } else if (condition.logic === "oversold") {
            code += `${getIndicatorVariable(condition)} < 30`
          } else if (condition.logic === "enters_overbought") {
            code += `${getIndicatorVariable(condition)} > 70 and ${getIndicatorVariable(condition)}[1] <= 70`
          } else if (condition.logic === "exits_overbought") {
            code += `${getIndicatorVariable(condition)} < 70 and ${getIndicatorVariable(condition)}[1] >= 70`
          } else if (condition.logic === "enters_oversold") {
            code += `${getIndicatorVariable(condition)} < 30 and ${getIndicatorVariable(condition)}[1] >= 30`
          } else if (condition.logic === "exits_oversold") {
            code += `${getIndicatorVariable(condition)} > 30 and ${getIndicatorVariable(condition)}[1] <= 30`
          } else if (condition.logic === "increasing") {
            code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1]`
          } else if (condition.logic === "decreasing") {
            code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1]`
          } else if (condition.logic === "bullish") {
            if (condition.indicator === "supertrend") {
              code += `direction == 1`
            } else {
              code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1]`
            }
          } else if (condition.logic === "bearish") {
            if (condition.indicator === "supertrend") {
              code += `direction == -1`
            } else {
              code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1]`
            }
          } else if (condition.logic === "changes_to_bullish") {
            if (condition.indicator === "supertrend") {
              code += `direction == 1 and direction[1] == -1`
            } else {
              code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1] and ${getIndicatorVariable(condition)}[1] <= ${getIndicatorVariable(condition)}[2]`
            }
          } else if (condition.logic === "changes_to_bearish") {
            if (condition.indicator === "supertrend") {
              code += `direction == -1 and direction[1] == 1`
            } else {
              code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1] and ${getIndicatorVariable(condition)}[1] >= ${getIndicatorVariable(condition)}[2]`
            }
          } else {
            code += `${getIndicatorVariable(condition)} ${logicMap[condition.logic] || condition.logic} ${condition.value}`
          }

          if (conditionIndex < group.conditions.length - 1) {
            code += ` ${group.operator === "and" ? "and" : "or"} `
          }
        })
        code += `)`
      })
    } else {
      code += `false`
    }

    code += `\n\n`

    // Exit Short
    code += `// Short exit\n`
    code += `shortExitCondition = `

    if (strategy.exitShort.conditionGroups.length > 0) {
      strategy.exitShort.conditionGroups.forEach((group, groupIndex) => {
        if (groupIndex > 0) code += ` or `

        code += `(`
        group.conditions.forEach((condition, conditionIndex) => {
          const logicMap: Record<string, string> = {
            crosses_above: "ta.crossover",
            crosses_below: "ta.crossunder",
            greater_than: ">",
            less_than: "<",
            equals: "==",
          }

          // Handle different logic types using the same pattern as entry conditions
          if (condition.logic === "crosses_above") {
            if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
              const targetIndicator = condition.value.split(":")[1]
              const targetVariable = getIndicatorVariable({ indicator: targetIndicator })
              code += `ta.crossover(${getIndicatorVariable(condition)}, ${targetVariable})`
            } else {
              code += `ta.crossover(${getIndicatorVariable(condition)}, ${condition.value})`
            }
          } else if (condition.logic === "crosses_below") {
            if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
              const targetIndicator = condition.value.split(":")[1]
              const targetVariable = getIndicatorVariable({ indicator: targetIndicator })
              code += `ta.crossunder(${getIndicatorVariable(condition)}, ${targetVariable})`
            } else {
              code += `ta.crossunder(${getIndicatorVariable(condition)}, ${condition.value})`
            }
          } else if (condition.logic === "center_cross_up") {
            code += `ta.crossover(${getIndicatorVariable(condition)}, 50)`
          } else if (condition.logic === "center_cross_down") {
            code += `ta.crossunder(${getIndicatorVariable(condition)}, 50)`
          } else if (condition.logic === "zero_cross_up") {
            code += `ta.crossover(${getIndicatorVariable(condition)}, 0)`
          } else if (condition.logic === "zero_cross_down") {
            code += `ta.crossunder(${getIndicatorVariable(condition)}, 0)`
          } else if (condition.logic === "histogram_positive") {
            code += `histogram > 0`
          } else if (condition.logic === "histogram_negative") {
            code += `histogram < 0`
          } else if (condition.logic === "histogram_increasing") {
            code += `histogram > histogram[1]`
          } else if (condition.logic === "histogram_decreasing") {
            code += `histogram < histogram[1]`
          } else if (condition.logic === "overbought") {
            code += `${getIndicatorVariable(condition)} > 70`
          } else if (condition.logic === "oversold") {
            code += `${getIndicatorVariable(condition)} < 30`
          } else if (condition.logic === "enters_overbought") {
            code += `${getIndicatorVariable(condition)} > 70 and ${getIndicatorVariable(condition)}[1] <= 70`
          } else if (condition.logic === "exits_overbought") {
            code += `${getIndicatorVariable(condition)} < 70 and ${getIndicatorVariable(condition)}[1] >= 70`
          } else if (condition.logic === "enters_oversold") {
            code += `${getIndicatorVariable(condition)} < 30 and ${getIndicatorVariable(condition)}[1] >= 30`
          } else if (condition.logic === "exits_oversold") {
            code += `${getIndicatorVariable(condition)} > 30 and ${getIndicatorVariable(condition)}[1] <= 30`
          } else if (condition.logic === "increasing") {
            code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1]`
          } else if (condition.logic === "decreasing") {
            code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1]`
          } else if (condition.logic === "bullish") {
            if (condition.indicator === "supertrend") {
              code += `direction == 1`
            } else {
              code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1]`
            }
          } else if (condition.logic === "bearish") {
            if (condition.indicator === "supertrend") {
              code += `direction == -1`
            } else {
              code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1]`
            }
          } else if (condition.logic === "changes_to_bullish") {
            if (condition.indicator === "supertrend") {
              code += `direction == 1 and direction[1] == -1`
            } else {
              code += `${getIndicatorVariable(condition)} > ${getIndicatorVariable(condition)}[1] and ${getIndicatorVariable(condition)}[1] <= ${getIndicatorVariable(condition)}[2]`
            }
          } else if (condition.logic === "changes_to_bearish") {
            if (condition.indicator === "supertrend") {
              code += `direction == -1 and direction[1] == 1`
            } else {
              code += `${getIndicatorVariable(condition)} < ${getIndicatorVariable(condition)}[1] and ${getIndicatorVariable(condition)}[1] >= ${getIndicatorVariable(condition)}[2]`
            }
          } else {
            code += `${getIndicatorVariable(condition)} ${logicMap[condition.logic] || condition.logic} ${condition.value}`
          }

          if (conditionIndex < group.conditions.length - 1) {
            code += ` ${group.operator === "and" ? "and" : "or"} `
          }
        })
        code += `)`
      })
    } else {
      code += `false`
    }

    code += `\n\n`

    // Risk Management
    code += `// Risk Management\n`

    // Stop Loss
    if (strategy.riskManagement.stopLoss.length > 0) {
      const stopLoss = strategy.riskManagement.stopLoss.find((sl) => sl.enabled)
      if (stopLoss) {
        if (stopLoss.type === "percentage") {
          code += `// Percentage-based stop loss
longStopPct = ${stopLoss.value} / 100
shortStopPct = ${stopLoss.value} / 100
longStopPrice = strategy.position_avg_price * (1 - longStopPct)
shortStopPrice = strategy.position_avg_price * (1 + shortStopPct)\n`
        } else if (stopLoss.type === "atr") {
          code += `// ATR-based stop loss
atrPeriod = ${stopLoss.atrPeriod || 14}
atrMultiplier = ${stopLoss.atrMultiplier || 2}
atrValue = ta.atr(atrPeriod)
longStopPrice = strategy.position_avg_price - atrValue * atrMultiplier
shortStopPrice = strategy.position_avg_price + atrValue * atrMultiplier\n`
        } else if (stopLoss.type === "volatility") {
          code += `// Volatility-based stop loss
volPeriod = ${stopLoss.lookbackPeriod || 20}
volMultiplier = ${stopLoss.atrMultiplier || 2}
volValue = ta.stdev(close, volPeriod)
longStopPrice = strategy.position_avg_price - volValue * volMultiplier
shortStopPrice = strategy.position_avg_price + volValue * volMultiplier\n`
        } else {
          code += `// Default stop loss (2%)
longStopPrice = strategy.position_avg_price * 0.98
shortStopPrice = strategy.position_avg_price * 1.02\n`
        }
      } else {
        code += `// Default stop loss (2%)
longStopPrice = strategy.position_avg_price * 0.98
shortStopPrice = strategy.position_avg_price * 1.02\n`
      }
    } else {
      code += `// Default stop loss (2%)
longStopPrice = strategy.position_avg_price * 0.98
shortStopPrice = strategy.position_avg_price * 1.02\n`
    }

    // Take Profit
    if (strategy.riskManagement.takeProfit.length > 0) {
      const takeProfit = strategy.riskManagement.takeProfit.find((tp) => tp.enabled)
      if (takeProfit) {
        if (takeProfit.type === "percentage") {
          code += `// Percentage-based take profit
longTpPct = ${takeProfit.value} / 100
shortTpPct = ${takeProfit.value} / 100
longTpPrice = strategy.position_avg_price * (1 + longTpPct)
shortTpPrice = strategy.position_avg_price * (1 - shortTpPct)\n`
        } else if (takeProfit.type === "atr") {
          code += `// ATR-based take profit
tpAtrPeriod = ${takeProfit.atrPeriod || 14}
tpAtrMultiplier = ${takeProfit.atrMultiplier || 3}
tpAtrValue = ta.atr(tpAtrPeriod)
longTpPrice = strategy.position_avg_price + tpAtrValue * tpAtrMultiplier
shortTpPrice = strategy.position_avg_price - tpAtrValue * tpAtrMultiplier\n`
        } else if (takeProfit.type === "risk-reward") {
          code += `// Risk-reward based take profit
rrRatio = ${takeProfit.riskRewardRatio || 2}
longRisk = strategy.position_avg_price - longStopPrice
shortRisk = shortStopPrice - strategy.position_avg_price
longTpPrice = strategy.position_avg_price + (longRisk * rrRatio)
shortTpPrice = strategy.position_avg_price - (shortRisk * rrRatio)\n`
        } else {
          code += `// Default take profit (5%)
longTpPrice = strategy.position_avg_price * 1.05
shortTpPrice = strategy.position_avg_price * 0.95\n`
        }
      } else {
        code += `// Default take profit (5%)
longTpPrice = strategy.position_avg_price * 1.05
shortTpPrice = strategy.position_avg_price * 0.95\n`
      }
    } else {
      code += `// Default take profit (5%)
longTpPrice = strategy.position_avg_price * 1.05
shortTpPrice = strategy.position_avg_price * 0.95\n`
    }

    // Trailing Stop
    if (
      strategy.riskManagement.trailingStop.length > 0 &&
      strategy.riskManagement.trailingStop.some((ts) => ts.enabled)
    ) {
      code += `// Trailing stop logic
var float highestHigh = na
var float lowestLow = na
var bool trailLongActive = false
var bool trailShortActive = false\n`

      const trailingStop = strategy.riskManagement.trailingStop.find((ts) => ts.enabled)
      if (trailingStop) {
        if (trailingStop.type === "percentage") {
          code += `// Percentage-based trailing stop
trailPct = ${trailingStop.value} / 100
activationPct = ${trailingStop.activationThreshold || 1} / 100

// Update trailing levels
if (strategy.position_size > 0)
    trailActivationLevel = strategy.position_avg_price * (1 + activationPct)
    if (high >= trailActivationLevel)
        trailLongActive := true
    
    if (trailLongActive)
        highestHigh := na(highestHigh) ? high : math.max(highestHigh, high)
        longTrailingStop = highestHigh * (1 - trailPct)
        longStopPrice := longTrailingStop

if (strategy.position_size < 0)
    trailActivationLevel = strategy.position_avg_price * (1 - activationPct)
    if (low <= trailActivationLevel)
        trailShortActive := true
    
    if (trailShortActive)
        lowestLow := na(lowestLow) ? low : math.min(lowestLow, low)
        shortTrailingStop = lowestLow * (1 + trailPct)
        shortStopPrice := shortTrailingStop\n`
        } else if (trailingStop.type === "atr") {
          code += `// ATR-based trailing stop
trailAtrPeriod = ${trailingStop.atrPeriod || 14}
trailAtrMultiplier = ${trailingStop.atrMultiplier || 2}
trailAtrValue = ta.atr(trailAtrPeriod)
activationPct = ${trailingStop.activationThreshold || 1} / 100

// Update trailing levels
if (strategy.position_size > 0)
    trailActivationLevel = strategy.position_avg_price * (1 + activationPct)
    if (high >= trailActivationLevel)
        trailLongActive := true
    
    if (trailLongActive)
        highestHigh := na(highestHigh) ? high : math.max(highestHigh, high)
        longTrailingStop = highestHigh - (trailAtrValue * trailAtrMultiplier)
        longStopPrice := longTrailingStop

if (strategy.position_size < 0)
    trailActivationLevel = strategy.position_avg_price * (1 - activationPct)
    if (low <= trailActivationLevel)
        trailShortActive := true
    
    if (trailShortActive)
        lowestLow := na(lowestLow) ? low : math.min(lowestLow, low)
        shortTrailingStop = lowestLow + (trailAtrValue * trailAtrMultiplier)
        shortStopPrice := shortTrailingStop\n`
        } else {
          code += `// Simple trailing stop
trailPct = 1.5 / 100
activationPct = 1 / 100

// Update trailing levels
if (strategy.position_size > 0)
    trailActivationLevel = strategy.position_avg_price * (1 + activationPct)
    if (high >= trailActivationLevel)
        trailLongActive := true
    
    if (trailLongActive)
        highestHigh := na(highestHigh) ? high : math.max(highestHigh, high)
        longTrailingStop = highestHigh * (1 - trailPct)
        longStopPrice := longTrailingStop

if (strategy.position_size < 0)
    trailActivationLevel = strategy.position_avg_price * (1 - activationPct)
    if (low <= trailActivationLevel)
        trailShortActive := true
    
    if (trailShortActive)
        lowestLow := na(lowestLow) ? low : math.min(lowestLow, low)
        shortTrailingStop = lowestLow * (1 + trailPct)
        shortStopPrice := shortTrailingStop\n`
        }
      }
    }

    // Position Sizing
    code += `\n// Position Sizing\n`
    if (strategy.riskManagement.positionSizing.length > 0) {
      const positionSizing = strategy.riskManagement.positionSizing.find((ps) => ps.enabled)
      if (positionSizing) {
        if (positionSizing.type === "percentage") {
          code += `// Percentage-based position sizing
equityPct = ${positionSizing.equityPercentage || positionSizing.value} / 100
positionSize = math.floor((strategy.equity * equityPct) / close)\n`
        } else if (positionSizing.type === "risk-reward") {
          code += `// Risk-based position sizing
riskPct = ${positionSizing.riskPerTrade || positionSizing.value} / 100
maxRiskPct = ${positionSizing.maxRisk} / 100
maxRiskAmount = strategy.equity * maxRiskPct

// Calculate position size based on stop loss distance
longRisk = close - longStopPrice
shortRisk = shortStopPrice - close

// Ensure we don't divide by zero
longPositionSize = longRisk > 0 ? math.floor(math.min((strategy.equity * riskPct) / longRisk, maxRiskAmount / longRisk)) : 0
shortPositionSize = shortRisk > 0 ? math.floor(math.min((strategy.equity * riskPct) / shortRisk, maxRiskAmount / shortRisk)) : 0\n`
        } else if (positionSizing.type === "kelly") {
          code += `// Kelly Criterion position sizing
winRate = ${positionSizing.winRate || 60} / 100
payoffRatio = ${positionSizing.payoffRatio || 2}
maxRiskPct = ${positionSizing.maxRisk} / 100

// Kelly formula: f = (p * b - q) / b, where p = win rate, q = 1-p, b = payoff ratio
kellyPct = (winRate * payoffRatio - (1 - winRate)) / payoffRatio
// Usually we use half-Kelly for safety
adjustedKellyPct = math.min(kellyPct / 2, maxRiskPct)

positionSize = math.floor((strategy.equity * adjustedKellyPct) / close)\n`
        } else if (positionSizing.type === "volatility-based") {
          code += `// Volatility-based position sizing
volPeriod = ${positionSizing.volatilityPeriod || 20}
volMultiplier = ${positionSizing.volatilityMultiplier || 0.5}
maxRiskPct = ${positionSizing.maxRisk} / 100

// Calculate volatility
volValue = ta.stdev(close, volPeriod)
volRatio = volValue / close

// Adjust position size inversely to volatility
positionPct = math.min(volMultiplier / volRatio, maxRiskPct)
positionSize = math.floor((strategy.equity * positionPct) / close)\n`
        } else if (positionSizing.type === "fixed") {
          code += `// Fixed position sizing
positionSize = ${positionSizing.value}\n`
        } else {
          code += `// Default position sizing (2% of equity)
positionSize = math.floor((strategy.equity * 0.02) / close)\n`
        }
      } else {
        code += `// Default position sizing (2% of equity)
positionSize = math.floor((strategy.equity * 0.02) / close)\n`
      }
    } else {
      code += `// Default position sizing (2% of equity)
positionSize = math.floor((strategy.equity * 0.02) / close)\n`
    }

    // Time-based exits
    if (strategy.riskManagement.timeExit.length > 0 && strategy.riskManagement.timeExit.some((te) => te.enabled)) {
      code += `\n// Time-based exit logic\n`
      const timeExit = strategy.riskManagement.timeExit.find((te) => te.enabled)
      if (timeExit) {
        if (timeExit.type === "bars") {
          code += `// Exit after a specific number of bars
var int entryBar = 0
maxBarsInTrade = ${timeExit.value}

// Track entry bar
if (strategy.position_size[1] == 0 and strategy.position_size != 0)
    entryBar := bar_index

// Exit if maximum bars in trade reached
timeExitCondition = (bar_index - entryBar) >= maxBarsInTrade and strategy.position_size != 0\n`
        } else if (timeExit.type === "time") {
          code += `// Exit at a specific time
exitTime = "${timeExit.value}"  // Format: "HH:MM"
timeExitCondition = time("1", exitTime) and strategy.position_size != 0\n`
        } else if (timeExit.type === "session-end") {
          code += `// Exit at session end
timeExitCondition = session.isclose and strategy.position_size != 0\n`
        } else {
          code += `// Default time exit (after 20 bars)
var int entryBar = 0
maxBarsInTrade = 20

// Track entry bar
if (strategy.position_size[1] == 0 and strategy.position_size != 0)
    entryBar := bar_index

// Exit if maximum bars in trade reached
timeExitCondition = (bar_index - entryBar) >= maxBarsInTrade and strategy.position_size != 0\n`
        }
      }
    } else {
      code += `\n// No time-based exit\ntimeExitCondition = false\n`
    }

    // Strategy execution
    code += `
// Strategy execution
if (strategy.position_size == 0)
    if (longEntryCondition)
        strategy.entry("Long", strategy.long, qty=positionSize)
    else if (shortEntryCondition)
        strategy.entry("Short", strategy.short, qty=positionSize)
else if (strategy.position_size > 0)
    if (longExitCondition or timeExitCondition)
        strategy.close("Long")
    else
        strategy.exit("Long TP/SL", "Long", limit=longTpPrice, stop=longStopPrice)
else if (strategy.position_size < 0)
    if (shortExitCondition or timeExitCondition)
        strategy.close("Short")
    else
        strategy.exit("Short TP/SL", "Short", limit=shortTpPrice, stop=shortStopPrice)

// Plot indicators for visualization
`

    // Add plots for indicators
    indicators.forEach((indicator) => {
      switch (indicator) {
        case "sma":
          const smaParams = getIndicatorParams(strategy, "sma")
          code += `plot(sma(${smaParams.source || "close"}, ${smaParams.period}), color=color.blue, title="SMA ${smaParams.period}")\n`
          break
        case "ema":
          const emaParams = getIndicatorParams(strategy, "ema")
          code += `plot(ema(${emaParams.source || "close"}, ${emaParams.period}), color=color.orange, title="EMA ${emaParams.period}")\n`
          break
        case "wma":
          const wmaParams = getIndicatorParams(strategy, "wma")
          code += `plot(wma(${wmaParams.source || "close"}, ${wmaParams.period}), color=color.purple, title="WMA ${wmaParams.period}")\n`
          break
        case "hma":
          const hmaParams = getIndicatorParams(strategy, "hma")
          code += `plot(hma(${hmaParams.source || "close"}, ${hmaParams.period}), color=color.teal, title="HMA ${hmaParams.period}")\n`
          break
        case "vwap":
          code += `plot(vwap, color=color.blue, title="VWAP")\n`
          break
        case "rsi":
          code += `// RSI plot on separate pane
rsiPlot = plot(rsi(${getIndicatorParams(strategy, "rsi").source || "close"}, ${getIndicatorParams(strategy, "rsi").period || 14}), color=color.purple, title="RSI", display=display.pane)\n`
          break
        case "macd":
          code += `// MACD plots on separate pane
plot(macd(${getIndicatorParams(strategy, "macd").source || "close"}, ${getIndicatorParams(strategy, "macd").fastPeriod || 12}, ${getIndicatorParams(strategy, "macd").slowPeriod || 26}, ${getIndicatorParams(strategy, "macd").signalPeriod || 9}), color=color.blue, title="MACD Line", display=display.pane)\n`
          code += `plot(signalLine, color=color.red, title="Signal Line", display=display.pane)\n`
          code += `plot(histogram, color=histogram >= 0 ? color.green : color.red, title="Histogram", style=plot.style_histogram, display=display.pane)\n`
          break
        case "bollinger":
          code += `plot(upperBand, color=color.blue, title="Upper Band")\n`
          code += `plot(middleBand, color=color.blue, title="Middle Band")\n`
          code += `plot(lowerBand, color=color.blue, title="Lower Band")\n`
          break
        case "supertrend":
          code += `// Plot SuperTrend
supertrendColor = direction == 1 ? color.green : color.red
plot(supertrend, color=supertrendColor, title="SuperTrend", linewidth=2)\n`
          break
        case "ichimoku":
          code += `// Plot Ichimoku Cloud
plot(tenkan, color=color.blue, title="Tenkan")\n`
          code += `plot(kijun, color=color.red, title="Kijun")\n`
          code += `fill(plot(senkou_a, color=color.green, title="Senkou A"), plot(senkou_b, color=color.red, title="Senkou B"), color = senkou_a > senkou_b ? color.rgb(76, 175, 80, 90) : color.rgb(255, 82, 82, 90))\n`
          break
        case "adx":
          code += `// ADX plot on separate pane
plot(adx(${getIndicatorParams(strategy, "adx").source || "close"}, ${getIndicatorParams(strategy, "adx").period || 14}), color=color.blue, title="ADX", display=display.pane)\n`
          code += `plot(diPlus, color=color.green, title="DI+", display=display.pane)\n`
          code += `plot(diMinus, color=color.red, title="DI-", display=display.pane)\n`
          break
        case "stochastic":
          code += `// Stochastic plot on separate pane
plot(k, color=color.blue, title="K", display=display.pane)\n`
          code += `plot(d, color=color.red, title="D", display=display.pane)\n`
          break
        case "volume":
          code += `// Volume plot on separate pane
plot(volume, color=volume > volume[1] ? color.green : color.red, title="Volume", style=plot.style_columns, display=display.pane)\n`
          code += `plot(volumeMA, color=color.blue, title="Volume MA", display=display.pane)\n`
          break
        case "momentum":
          code += `// Momentum plot on separate pane
plot(momentum(${getIndicatorParams(strategy, "momentum").source || "close"}, ${getIndicatorParams(strategy, "momentum").period || 10}), color=color.blue, title="Momentum", display=display.pane)\n`
          break
      }
    })

    return code
  }

  // Add missing functions for handling conditions
  function getIndicatorVariable(condition: any): string {
    const indicator = condition.indicator
    const parameter = condition.parameter

    switch (indicator) {
      case "price":
        return condition.params?.source || "close"
      case "sma":
        const smaParams = getIndicatorParams(condition, "sma")
        return `ta.sma(${smaParams.source || "close"}, ${smaParams.period})`
      case "ema":
        const emaParams = getIndicatorParams(condition, "ema")
        return `ta.ema(${emaParams.source || "close"}, ${emaParams.period})`
      case "wma":
        const wmaParams = getIndicatorParams(condition, "wma")
        return `ta.wma(${wmaParams.source || "close"}, ${wmaParams.period})`
      case "hma":
        const hmaParams = getIndicatorParams(condition, "hma")
        return `ta.hma(${hmaParams.source || "close"}, ${hmaParams.period})`
      case "vwap":
        return "ta.vwap(hlc3)"
      case "rsi":
        const rsiParams = getIndicatorParams(condition, "rsi")
        return `ta.rsi(${rsiParams.source || "close"}, ${rsiParams.period})`
      case "macd":
        if (parameter === "histogram") return "histogram"
        if (parameter === "signal") return "signalLine"
        return "macdLine"
      case "bollinger":
        if (parameter === "upper") return "upperBand"
        if (parameter === "lower") return "lowerBand"
        if (parameter === "width") return "(upperBand - lowerBand) / middleBand"
        if (parameter === "percent_b") return "(close - lowerBand) / (upperBand - lowerBand)"
        return "middleBand"
      case "atr":
        const atrParams = getIndicatorParams(condition, "atr")
        return `ta.atr(${atrParams.period})`
      case "stochastic":
        if (parameter === "d") return "d"
        return "k"
      case "adx":
        if (parameter === "di_plus") return "diPlus"
        if (parameter === "di_minus") return "diMinus"
        return "adx"
      case "supertrend":
        if (parameter === "direction") return "direction"
        return "supertrend"
      case "ichimoku":
        if (parameter === "tenkan") return "tenkan"
        if (parameter === "kijun") return "kijun"
        if (parameter === "senkou_a") return "senkou_a"
        if (parameter === "senkou_b") return "senkou_b"
        if (parameter === "chikou") return "chikou"
        return "tenkan"
      case "volume":
        if (parameter === "average") return "volumeMA"
        return "volume"
      case "momentum":
        return "momentum"
      case "custom":
        return "customValue"
      default:
        return `${indicator}Value`
    }
  }

  // Add new function to get indicator logic
  function getIndicatorLogic(condition: any): string {
    const indicator = condition.indicator
    const logic = condition.logic
    const value = condition.value

    // Handle crossover/crossunder between indicators
    if (logic === "crosses_above" || logic === "crosses_below") {
      if (typeof value === "string" && value.startsWith("indicator:")) {
        const targetIndicator = value.split(":")[1]
        const targetVariable = getIndicatorVariable({ indicator: targetIndicator })
        return `ta.${logic === "crosses_above" ? "crossover" : "crossunder"}(${getIndicatorVariable(condition)}, ${targetVariable})`
      }
    }

    // Handle other logic types
    const logicMap: Record<string, string> = {
      crosses_above: "ta.crossover",
      crosses_below: "ta.crossunder",
      greater_than: ">",
      less_than: "<",
      equals: "==",
      inside: "inside",
      outside: "outside",
      touches: "touches",
      increasing: "is increasing",
      decreasing: "is decreasing",
      bullish: "is bullish",
      bearish: "is bearish",
      overbought: "> 70",
      oversold: "< 30",
      center_cross_up: "crosses above 50",
      center_cross_down: "crosses below 50",
      zero_cross_up: "crosses above 0",
      zero_cross_down: "crosses below 0",
      histogram_positive: "histogram > 0",
      histogram_negative: "histogram < 0",
      histogram_increasing: "histogram is increasing",
      histogram_decreasing: "histogram is decreasing",
      enters_overbought: "enters overbought zone",
      exits_overbought: "exits overbought zone",
      enters_oversold: "enters oversold zone",
      exits_oversold: "exits oversold zone",
      bullish_divergence: "shows bullish divergence",
      bearish_divergence: "shows bearish divergence",
      strong_trend: "shows strong trend",
      weak_trend: "shows weak trend",
      di_plus_above_di_minus: "DI+ > DI-",
      di_plus_below_di_minus: "DI+ < DI-",
      above_cloud: "is above cloud",
      below_cloud: "is below cloud",
      inside_cloud: "is inside cloud",
      tenkan_kijun_cross: "tenkan crosses kijun",
      changes_to_bullish: "changes to bullish",
      changes_to_bearish: "changes to bearish",
      squeeze: "is in squeeze",
      expansion: "is in expansion",
      percent_change: "percent change",
      turns_up: "turns up",
      turns_down: "turns down",
      above_average: "above average",
      below_average: "below average",
      spike: "shows spike",
    }

    return `${getIndicatorVariable(condition)} ${logicMap[logic] || logic} ${value}`
  }

  // Helper function to get indicator parameters
  function getIndicatorParams(condition: any, indicatorType: string): any {
    // First check if the condition itself has params
    if (condition.params) {
      return condition.params
    }

    // If not, search through all conditions in the strategy to find one with the same indicator type
    const searchConditions = (positionRule: any) => {
      for (const group of positionRule.conditionGroups) {
        for (const cond of group.conditions) {
          if (cond.indicator === indicatorType && cond.params) {
            return cond.params
          }
        }
      }
      return null
    }

    let params = searchConditions(strategy.entryLong)
    if (params) return params

    params = searchConditions(strategy.entryShort)
    if (params) return params

    params = searchConditions(strategy.exitLong)
    if (params) return params

    params = searchConditions(strategy.exitShort)
    if (params) return params

    // If no params found in any conditions, return empty object
    // This will force the code to use the values directly from the condition
    return {}
  }

  // Helper function to get a display name for an indicator
  function getIndicatorDisplayName(condition: any): string {
    const indicator = condition.indicator
    const parameter = condition.parameter

    switch (indicator) {
      case "price":
        return condition.params?.source || "close"
      case "sma":
        const smaParams = getIndicatorParams(condition, "sma")
        return `SMA(${smaParams.period})`
      case "ema":
        const emaParams = getIndicatorParams(condition, "ema")
        return `EMA(${emaParams.period})`
      case "wma":
        const wmaParams = getIndicatorParams(condition, "wma")
        return `WMA(${wmaParams.period})`
      case "hma":
        const hmaParams = getIndicatorParams(condition, "hma")
        return `HMA(${hmaParams.period})`
      case "vwap":
        return "VWAP"
      case "rsi":
        const rsiParams = getIndicatorParams(condition, "rsi")
        return `RSI(${rsiParams.period})`
      case "macd":
        if (parameter === "histogram") return "MACD Histogram"
        if (parameter === "signal") return "MACD Signal"
        return "MACD Line"
      case "bollinger":
        if (parameter === "upper") return "Bollinger Upper Band"
        if (parameter === "lower") return "Bollinger Lower Band"
        if (parameter === "width") return "Bollinger Width"
        if (parameter === "percent_b") return "Bollinger %B"
        return "Bollinger Middle Band"
      case "atr":
        const atrParams = getIndicatorParams(condition, "atr")
        return `ATR(${atrParams.period})`
      case "stochastic":
        if (parameter === "d") return "Stochastic %D"
        return "Stochastic %K"
      case "adx":
        if (parameter === "di_plus") return "ADX DI+"
        if (parameter === "di_minus") return "ADX DI-"
        return "ADX"
      case "supertrend":
        if (parameter === "direction") return "SuperTrend Direction"
        return "SuperTrend"
      case "ichimoku":
        if (parameter === "tenkan") return "Ichimoku Tenkan"
        if (parameter === "kijun") return "Ichimoku Kijun"
        if (parameter === "senkou_a") return "Ichimoku Senkou A"
        if (parameter === "senkou_b") return "Ichimoku Senkou B"
        if (parameter === "chikou") return "Ichimoku Chikou"
        return "Ichimoku Tenkan"
      case "volume":
        if (parameter === "average") return "Volume MA"
        return "Volume"
      case "momentum":
        return "Momentum"
      case "custom":
        return "Custom Indicator"
      default:
        return `${indicator}(${parameter})`
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{strategy.name}</CardTitle>
            <Button onClick={saveStrategy} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" /> {isSaving ? "Saving..." : "Save Strategy"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Symbol</label>
              <Select value={symbol} onValueChange={setSymbol}>
                <SelectTrigger>
                  <SelectValue placeholder="Select symbol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTCUSD">BTC/USD</SelectItem>
                  <SelectItem value="ETHUSD">ETH/USD</SelectItem>
                  <SelectItem value="BNBUSD">BNB/USD</SelectItem>
                  <SelectItem value="ADAUSD">ADA/USD</SelectItem>
                  <SelectItem value="DOGEUSD">DOGE/USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timeframe</label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Minute</SelectItem>
                  <SelectItem value="5m">5 Minutes</SelectItem>
                  <SelectItem value="15m">15 Minutes</SelectItem>
                  <SelectItem value="30m">30 Minutes</SelectItem>
                  <SelectItem value="1h">1 Hour</SelectItem>
                  <SelectItem value="4h">4 Hours</SelectItem>
                  <SelectItem value="1d">1 Day</SelectItem>
                  <SelectItem value="1w">1 Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="chart" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="pseudocode">Pseudocode</TabsTrigger>
              <TabsTrigger value="pinescript">Pine Script</TabsTrigger>
            </TabsList>
            <TabsContent value="chart">
              <ChartContainer config={{}}>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price" />
                    <Line type="monotone" dataKey="sma20" stroke="#82ca9d" name="SMA 20" />
                    <Line type="monotone" dataKey="rsi" stroke="#ffc658" name="RSI" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="pseudocode">
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap">{generatePseudocode()}</pre>
              </div>
            </TabsContent>
            <TabsContent value="pinescript">
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap">{generatePineScript()}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
