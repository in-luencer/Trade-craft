import type { StrategyConfig } from "./strategy-builder"
import { collectIndicators, getIndicatorParams, getIndicatorVariable } from "./utils"

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
  const indicators = collectIndicators(strategy)

  // Generate indicator definitions
  indicators.forEach((indicator) => {
    switch (indicator) {
      case "price":
        code += `// Price is already available as 'close', 'open', 'high', 'low'\n`
        break
      case "sma":
        const smaParams = getIndicatorParams({ indicator: "sma" } as any, "sma")
        code += `sma(${smaParams.source || "close"}, ${smaParams.period})\n`
        break
      case "ema":
        const emaParams = getIndicatorParams({ indicator: "ema" } as any, "ema")
        code += `ema(${emaParams.source || "close"}, ${emaParams.period})\n`
        break
      case "wma":
        const wmaParams = getIndicatorParams({ indicator: "wma" } as any, "wma")
        code += `wma(${wmaParams.source || "close"}, ${wmaParams.period})\n`
        break
      case "hma":
        const hmaParams = getIndicatorParams({ indicator: "hma" } as any, "hma")
        code += `hma(${hmaParams.source || "close"}, ${hmaParams.period})\n`
        break
      case "vwap":
        code += `vwap = ta.vwap(hlc3)\n`
        break
      case "rsi":
        const rsiParams = getIndicatorParams({ indicator: "rsi" } as any, "rsi")
        code += `rsi(${rsiParams.source || "close"}, ${rsiParams.period})\n`
        break
      case "macd":
        const macdParams = getIndicatorParams({ indicator: "macd" } as any, "macd")
        code += `[macdLine, signalLine, histogram] = ta.macd(${macdParams.source || "close"}, ${macdParams.fastPeriod || 12}, ${macdParams.slowPeriod || 26}, ${macdParams.signalPeriod || 9})\n`
        break
      case "bollinger":
        const bbParams = getIndicatorParams({ indicator: "bollinger" } as any, "bollinger")
        code += `[upperBand, middleBand, lowerBand] = ta.bbands(${bbParams.source || "close"}, ${bbParams.period || 20}, ${bbParams.stdDev || 2})\n`
        break
      case "atr":
        const atrParams = getIndicatorParams({ indicator: "atr" } as any, "atr")
        code += `atr(${atrParams.period})\n`
        break
      case "stochastic":
        const stochParams = getIndicatorParams({ indicator: "stochastic" } as any, "stochastic")
        code += `[k, d] = ta.stoch(high, low, close, ${stochParams.kPeriod || 14}, ${stochParams.dPeriod || 3}, ${stochParams.slowing || 3})\n`
        break
      case "adx":
        const adxParams = getIndicatorParams({ indicator: "adx" } as any, "adx")
        code += `[adx, diPlus, diMinus] = ta.adx(high, low, close, ${adxParams.period || 14})\n`
        break
      case "supertrend":
        const stParams = getIndicatorParams({ indicator: "supertrend" } as any, "supertrend")
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
        const ichiParams = getIndicatorParams({ indicator: "ichimoku" } as any, "ichimoku")
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
        const momParams = getIndicatorParams({ indicator: "momentum" } as any, "momentum")
        code += `momentum = ta.mom(${momParams.source || "close"}, ${momParams.period || 10})\n`
        break
      case "custom":
        const customParams = getIndicatorParams({ indicator: "custom" } as any, "custom")
        code += `customValue = ${customParams.formula || "sma(close, 20) + atr(14) * 2"}\n`
        break
    }
  })

  code += "\n"

  // Generate entry conditions
  code += "// Entry conditions\n"
  code += "longCondition = "
  strategy.entryLong.conditionGroups.forEach((group, groupIndex) => {
    if (groupIndex > 0) code += " or "
    code += "("
    group.conditions.forEach((condition, conditionIndex) => {
      if (conditionIndex > 0) code += " and "
      code += getIndicatorLogic(condition)
    })
    code += ")"
  })
  code += "\n"

  code += "shortCondition = "
  strategy.entryShort.conditionGroups.forEach((group, groupIndex) => {
    if (groupIndex > 0) code += " or "
    code += "("
    group.conditions.forEach((condition, conditionIndex) => {
      if (conditionIndex > 0) code += " and "
      code += getIndicatorLogic(condition)
    })
    code += ")"
  })
  code += "\n"

  // Generate exit conditions
  code += "// Exit conditions\n"
  code += "exitLongCondition = "
  strategy.exitLong.conditionGroups.forEach((group, groupIndex) => {
    if (groupIndex > 0) code += " or "
    code += "("
    group.conditions.forEach((condition, conditionIndex) => {
      if (conditionIndex > 0) code += " and "
      code += getIndicatorLogic(condition)
    })
    code += ")"
  })
  code += "\n"

  code += "exitShortCondition = "
  strategy.exitShort.conditionGroups.forEach((group, groupIndex) => {
    if (groupIndex > 0) code += " or "
    code += "("
    group.conditions.forEach((condition, conditionIndex) => {
      if (conditionIndex > 0) code += " and "
      code += getIndicatorLogic(condition)
    })
    code += ")"
  })
  code += "\n"

  // Generate strategy execution
  code += `
// Strategy execution
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

if (exitLongCondition)
    strategy.close("Long")

if (exitShortCondition)
    strategy.close("Short")

// Plot indicators
`
  // Plot indicators
  indicators.forEach((indicator) => {
    switch (indicator) {
      case "sma":
        const smaParams = getIndicatorParams({ indicator: "sma" } as any, "sma")
        code += `plot(sma(${smaParams.source || "close"}, ${smaParams.period}), color=color.blue, title="SMA ${smaParams.period}")\n`
        break
      case "ema":
        const emaParams = getIndicatorParams({ indicator: "ema" } as any, "ema")
        code += `plot(ema(${emaParams.source || "close"}, ${emaParams.period}), color=color.orange, title="EMA ${emaParams.period}")\n`
        break
      case "wma":
        const wmaParams = getIndicatorParams({ indicator: "wma" } as any, "wma")
        code += `plot(wma(${wmaParams.source || "close"}, ${wmaParams.period}), color=color.purple, title="WMA ${wmaParams.period}")\n`
        break
      case "hma":
        const hmaParams = getIndicatorParams({ indicator: "hma" } as any, "hma")
        code += `plot(hma(${hmaParams.source || "close"}, ${hmaParams.period}), color=color.teal, title="HMA ${hmaParams.period}")\n`
        break
      case "vwap":
        code += `plot(vwap, color=color.blue, title="VWAP")\n`
        break
      case "rsi":
        code += `// RSI plot on separate pane
rsiPlot = plot(rsi(${getIndicatorParams({ indicator: "rsi" } as any, "rsi").source || "close"}, ${getIndicatorParams({ indicator: "rsi" } as any, "rsi").period || 14}), color=color.purple, title="RSI", display=display.pane)\n`
        break
      case "macd":
        code += `// MACD plots on separate pane
plot(macd(${getIndicatorParams({ indicator: "macd" } as any, "macd").source || "close"}, ${getIndicatorParams({ indicator: "macd" } as any, "macd").fastPeriod || 12}, ${getIndicatorParams({ indicator: "macd" } as any, "macd").slowPeriod || 26}, ${getIndicatorParams({ indicator: "macd" } as any, "macd").signalPeriod || 9}), color=color.blue, title="MACD Line", display=display.pane)\n`
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
plot(adx(${getIndicatorParams({ indicator: "adx" } as any, "adx").source || "close"}, ${getIndicatorParams({ indicator: "adx" } as any, "adx").period || 14}), color=color.blue, title="ADX", display=display.pane)\n`
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
plot(momentum(${getIndicatorParams({ indicator: "momentum" } as any, "momentum").source || "close"}, ${getIndicatorParams({ indicator: "momentum" } as any, "momentum").period || 10}), color=color.blue, title="Momentum", display=display.pane)\n`
        break
    }
  })

  // Position Sizing
  if (strategy.riskManagement.positionSizing.length > 0) {
    const positionSizing = strategy.riskManagement.positionSizing.find((ps) => ps.enabled);
    if (positionSizing) {
      switch (positionSizing.type) {
        case "percentage":
          code += `// Percentage-based position sizing
equityPct = ${positionSizing.equityPercentage} / 100
positionSize = math.floor((strategy.equity * equityPct) / close)\n`;
          break;
        case "risk-based":
          code += `// Risk-based position sizing
riskPct = ${positionSizing.riskPerTrade} / 100
positionSize = math.floor((strategy.equity * riskPct) / close)\n`;
          break;
        case "kelly":
          code += `// Kelly Criterion position sizing
winRate = ${positionSizing.winRate} / 100
payoffRatio = ${positionSizing.payoffRatio}

// Kelly formula: f = (p * b - q) / b, where p = win rate, q = 1-p, b = payoff ratio
kellyPct = (winRate * payoffRatio - (1 - winRate)) / payoffRatio
// Usually we use half-Kelly for safety
adjustedKellyPct = kellyPct / 2

positionSize = math.floor((strategy.equity * adjustedKellyPct) / close)\n`;
          break;
        case "volatility-based":
          code += `// Volatility-based position sizing
volPeriod = ${positionSizing.volatilityPeriod}
volMultiplier = ${positionSizing.volatilityMultiplier}

// Calculate volatility
volValue = ta.stdev(close, volPeriod)
volRatio = volValue / close

// Adjust position size inversely to volatility
positionPct = volMultiplier / volRatio
positionSize = math.floor((strategy.equity * positionPct) / close)\n`;
          break;
        case "fixed-amount":
          code += `// Fixed amount position sizing
positionSize = math.floor(${positionSizing.value} / close)\n`;
          break;
        case "fixed-units":
          code += `// Fixed units position sizing
positionSize = ${positionSizing.value}\n`;
          break;
        default:
          code += `// Default position sizing (2% of equity)
positionSize = math.floor((strategy.equity * 0.02) / close)\n`;
      }
    } else {
      code += `// Default position sizing (2% of equity)
positionSize = math.floor((strategy.equity * 0.02) / close)\n`;
    }
  } else {
    code += `// Default position sizing (2% of equity)
positionSize = math.floor((strategy.equity * 0.02) / close)\n`;
  }

  return code
}

function getIndicatorLogic(condition: any): string {
  const indicator = condition.indicator
  const logic = condition.logic
  const value = condition.value

  // Handle crossover/crossunder between indicators
  if (logic === "crosses_above" || logic === "crosses_below") {
    if (typeof value === "string" && value.startsWith("indicator:")) {
      const targetIndicator = value.split(":")[1]
      const targetVariable = getIndicatorVariable({ indicator: targetIndicator } as any)
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