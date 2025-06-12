import { StrategyConfig, PositionRule, RiskRule } from './types'
import { getIndicatorDisplayName } from './utils'
import { LOGIC_MAP } from './constants'

export function generatePseudocode(strategy: StrategyConfig): string {
  let code = `// ${strategy.name}\n// ${strategy.description}\n\n`

  // Define indicators
  code += "// Define Indicators\n"
  const indicators = new Set<string>()

  // Collect all indicators from entry and exit rules
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

  // Generate indicator definitions
  indicators.forEach((indicator) => {
    code += generateIndicatorDefinition(indicator)
  })

  code += "\n"

  // Entry Long
  code += "// Entry Long\n"
  code += generatePositionRuleCode(strategy.entryLong, "ENTER LONG")

  // Entry Short
  code += "// Entry Short\n"
  code += generatePositionRuleCode(strategy.entryShort, "ENTER SHORT")

  // Exit Long
  code += "// Exit Long\n"
  code += generatePositionRuleCode(strategy.exitLong, "EXIT LONG")

  // Exit Short
  code += "// Exit Short\n"
  code += generatePositionRuleCode(strategy.exitShort, "EXIT SHORT")

  // Risk Management
  code += generateRiskManagementCode(strategy)

  return code
}

function generateIndicatorDefinition(indicator: string): string {
  switch (indicator) {
    case "price":
      return `var price = close // Using close price by default\n`
    case "sma":
      return `var sma20 = ta.sma(close, 20)\n`
    case "ema":
      return `var ema20 = ta.ema(close, 20)\n`
    case "wma":
      return `var wma20 = ta.wma(close, 20)\n`
    case "hma":
      return `var hma20 = ta.hma(close, 20)\n`
    case "vwap":
      return `var vwap = ta.vwap()\n`
    case "rsi":
      return `var rsi14 = ta.rsi(close, 14)\n`
    case "macd":
      return `var [macdLine, signalLine, histogram] = ta.macd(close, 12, 26, 9)\n`
    case "bollinger":
      return `var [upperBand, middleBand, lowerBand] = ta.bbands(close, 20, 2)\n`
    case "atr":
      return `var atr14 = ta.atr(14)\n`
    case "stochastic":
      return `var [k, d] = ta.stoch(high, low, close, 14, 3, 3)\n`
    case "adx":
      return `var [adx, diPlus, diMinus] = ta.adx(high, low, close, 14)\n`
    case "supertrend":
      return `var [supertrend, direction] = ta.supertrend(high, low, close, 10, 3)\n`
    case "ichimoku":
      return `var [tenkan, kijun, senkou_a, senkou_b, chikou] = ta.ichimoku(9, 26, 52, 26)\n`
    case "volume":
      return `var volume = volume\nvar volumeMA = ta.sma(volume, 20)\n`
    case "momentum":
      return `var momentum = ta.mom(close, 10)\n`
    case "custom":
      return `var custom = sma(close, 20) + atr(14) * 2\n`
    default:
      return `var ${indicator} = ta.${indicator}(close)\n`
  }
}

function generatePositionRuleCode(positionRule: PositionRule, action: string): string {
  if (positionRule.conditionGroups.length === 0) return ""

  return positionRule.conditionGroups.map((group, groupIndex) => {
    if (groupIndex > 0) return "OR\n"

    let code = "IF (\n"
    group.conditions.forEach((condition, conditionIndex) => {
      const indicatorDisplay = getIndicatorDisplayName(condition)
      const logic = LOGIC_MAP[condition.logic] || condition.logic

      if (condition.logic === "crosses_above" || condition.logic === "crosses_below") {
        if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
          const targetIndicator = condition.value.split(":")[1]
          const targetIndicatorDisplay = getIndicatorDisplayName({ indicator: targetIndicator } as any)
          code += `  ${indicatorDisplay} ${logic} ${targetIndicatorDisplay} [${condition.timeframe}]`
        } else {
          code += `  ${indicatorDisplay} ${logic} ${condition.value} [${condition.timeframe}]`
        }
      } else {
        code += `  ${indicatorDisplay} ${logic} ${condition.value} [${condition.timeframe}]`
      }

      if (conditionIndex < group.conditions.length - 1) {
        code += ` ${group.operator.toUpperCase()}\n`
      } else {
        code += "\n"
      }
    })
    code += `)\n  ${action}\n\n`
    return code
  }).join("")
}

function generateRiskManagementCode(strategy: StrategyConfig): string {
  let code = "// Risk Management\n"

  // Stop Loss
  if (strategy.riskManagement.stopLoss.length > 0) {
    code += "// Stop Loss\n"
    strategy.riskManagement.stopLoss.forEach((rule: RiskRule) => {
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
    strategy.riskManagement.takeProfit.forEach((rule: RiskRule) => {
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
    strategy.riskManagement.trailingStop.forEach((rule: RiskRule) => {
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
    strategy.riskManagement.timeExit.forEach((rule: RiskRule) => {
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
    strategy.riskManagement.positionSizing.forEach((rule: RiskRule) => {
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
        code += `SET_POSITION_SIZE ${typeMap[rule.type]} ${rule.value}\n`
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