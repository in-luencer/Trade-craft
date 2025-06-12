import { StrategyConfig } from '../strategy-builder'
import { getIndicatorVariable, getIndicatorLogic } from './utils'
import { INDICATOR_CONFIGS } from './constants'

export function generatePineScript(strategy: StrategyConfig): string {
  let code = `//@version=5
strategy("${strategy.name}", overlay=true, margin_long=100, margin_short=100)

// Input parameters
riskPerTrade = input.float(${strategy.riskManagement.positionSizing[0]?.riskPerTrade || 2}, "Risk Per Trade (%)", minval=0.1, maxval=100, step=0.1)
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
    const config = INDICATOR_CONFIGS[indicator]
    if (config) {
      code += config.pineScriptGenerator({}) + '\n'
    }
  })

  // Generate entry/exit conditions
  code += generateEntryExitConditions(strategy)

  // Generate risk management
  code += generateRiskManagement(strategy)

  // Generate strategy execution
  code += generateStrategyExecution(strategy)

  // Generate plots
  code += generatePlots(indicators)

  return code
}

function generateEntryExitConditions(strategy: StrategyConfig): string {
  let code = '\n// Entry/Exit Conditions\n'

  // Entry Long
  code += '// Long entry\n'
  code += 'longEntryCondition = '
  code += generateConditionCode(strategy.entryLong)

  // Entry Short
  code += '\n// Short entry\n'
  code += 'shortEntryCondition = '
  code += generateConditionCode(strategy.entryShort)

  // Exit Long
  code += '\n// Long exit\n'
  code += 'longExitCondition = '
  code += generateConditionCode(strategy.exitLong)

  // Exit Short
  code += '\n// Short exit\n'
  code += 'shortExitCondition = '
  code += generateConditionCode(strategy.exitShort)

  return code
}

function generateConditionCode(positionRule: any): string {
  if (positionRule.conditionGroups.length === 0) return 'false'

  return positionRule.conditionGroups.map((group: any, groupIndex: number) => {
    const groupCode = group.conditions.map((condition: any, conditionIndex: number) => {
      const logic = getIndicatorLogic(condition)
      return conditionIndex < group.conditions.length - 1
        ? `${logic} ${group.operator === "and" ? "and" : "or"}`
        : logic
    }).join(' ')

    return groupIndex > 0 ? ` or (${groupCode})` : `(${groupCode})`
  }).join('')
}

function generateRiskManagement(strategy: StrategyConfig): string {
  let code = '\n// Risk Management\n'

  // Stop Loss
  if (strategy.riskManagement.stopLoss.length > 0) {
    const stopLoss = strategy.riskManagement.stopLoss.find((sl) => sl.enabled)
    if (stopLoss) {
      code += generateStopLossCode(stopLoss)
    }
  }

  // Take Profit
  if (strategy.riskManagement.takeProfit.length > 0) {
    const takeProfit = strategy.riskManagement.takeProfit.find((tp) => tp.enabled)
    if (takeProfit) {
      code += generateTakeProfitCode(takeProfit)
    }
  }

  // Trailing Stop
  if (strategy.riskManagement.trailingStop.length > 0) {
    const trailingStop = strategy.riskManagement.trailingStop.find((ts) => ts.enabled)
    if (trailingStop) {
      code += generateTrailingStopCode(trailingStop)
    }
  }

  return code
}

function generateStopLossCode(stopLoss: any): string {
  let code = '// Stop Loss\n'
  
  switch (stopLoss.type) {
    case 'percentage':
      code += `longStopPct = ${stopLoss.value} / 100
shortStopPct = ${stopLoss.value} / 100
longStopPrice = strategy.position_avg_price * (1 - longStopPct)
shortStopPrice = strategy.position_avg_price * (1 + shortStopPct)\n`
      break
    case 'atr':
      code += `atrPeriod = ${stopLoss.atrPeriod || 14}
atrMultiplier = ${stopLoss.atrMultiplier || 2}
atrValue = ta.atr(atrPeriod)
longStopPrice = strategy.position_avg_price - atrValue * atrMultiplier
shortStopPrice = strategy.position_avg_price + atrValue * atrMultiplier\n`
      break
    default:
      code += `// Default stop loss (2%)
longStopPrice = strategy.position_avg_price * 0.98
shortStopPrice = strategy.position_avg_price * 1.02\n`
  }

  return code
}

function generateTakeProfitCode(takeProfit: any): string {
  let code = '// Take Profit\n'
  
  switch (takeProfit.type) {
    case 'percentage':
      code += `longTpPct = ${takeProfit.value} / 100
shortTpPct = ${takeProfit.value} / 100
longTpPrice = strategy.position_avg_price * (1 + longTpPct)
shortTpPrice = strategy.position_avg_price * (1 - shortTpPct)\n`
      break
    case 'atr':
      code += `tpAtrPeriod = ${takeProfit.atrPeriod || 14}
tpAtrMultiplier = ${takeProfit.atrMultiplier || 3}
tpAtrValue = ta.atr(tpAtrPeriod)
longTpPrice = strategy.position_avg_price + tpAtrValue * tpAtrMultiplier
shortTpPrice = strategy.position_avg_price - tpAtrValue * tpAtrMultiplier\n`
      break
    default:
      code += `// Default take profit (5%)
longTpPrice = strategy.position_avg_price * 1.05
shortTpPrice = strategy.position_avg_price * 0.95\n`
  }

  return code
}

function generateTrailingStopCode(trailingStop: any): string {
  let code = '// Trailing Stop\n'
  
  switch (trailingStop.type) {
    case 'percentage':
      code += `trailPct = ${trailingStop.value} / 100
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
      break
    default:
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

  return code
}

function generateStrategyExecution(strategy: StrategyConfig): string {
  return `
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
`
}

function generatePlots(indicators: Set<string>): string {
  let code = '\n// Plot indicators for visualization\n'

  indicators.forEach((indicator) => {
    const config = INDICATOR_CONFIGS[indicator]
    if (config) {
      code += config.plotGenerator({}) + '\n'
    }
  })

  return code
} 