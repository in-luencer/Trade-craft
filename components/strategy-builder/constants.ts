import { IndicatorType, IndicatorLogic } from "./types"

export const INDICATORS: Record<IndicatorType, {
  name: string
  parameters: string[]
  logics: IndicatorLogic[]
}> = {
  price: {
    name: "Price",
    parameters: ["close", "open", "high", "low"],
    logics: ["crosses_above", "crosses_below", "greater_than", "less_than", "equals"]
  },
  sma: {
    name: "Simple Moving Average",
    parameters: ["value"],
    logics: ["crosses_above", "crosses_below", "greater_than", "less_than", "equals"]
  },
  ema: {
    name: "Exponential Moving Average",
    parameters: ["value"],
    logics: ["crosses_above", "crosses_below", "greater_than", "less_than", "equals"]
  },
  wma: {
    name: "Weighted Moving Average",
    parameters: ["value"],
    logics: ["crosses_above", "crosses_below", "greater_than", "less_than", "equals"]
  },
  hma: {
    name: "Hull Moving Average",
    parameters: ["value"],
    logics: ["crosses_above", "crosses_below", "greater_than", "less_than", "equals"]
  },
  vwap: {
    name: "Volume Weighted Average Price",
    parameters: ["value"],
    logics: ["crosses_above", "crosses_below", "greater_than", "less_than", "equals"]
  },
  rsi: {
    name: "Relative Strength Index",
    parameters: ["value"],
    logics: [
      "crosses_above", "crosses_below", "greater_than", "less_than", "equals",
      "overbought", "oversold", "enters_overbought", "exits_overbought",
      "enters_oversold", "exits_oversold", "center_cross_up", "center_cross_down"
    ]
  },
  macd: {
    name: "Moving Average Convergence Divergence",
    parameters: ["line", "signal", "histogram"],
    logics: [
      "crosses_above", "crosses_below", "greater_than", "less_than", "equals",
      "zero_cross_up", "zero_cross_down", "histogram_positive", "histogram_negative",
      "histogram_increasing", "histogram_decreasing", "bullish_divergence", "bearish_divergence"
    ]
  },
  bollinger: {
    name: "Bollinger Bands",
    parameters: ["upper", "middle", "lower", "width", "percent_b"],
    logics: [
      "crosses_above", "crosses_below", "greater_than", "less_than", "equals",
      "inside", "outside", "touches", "squeeze", "expansion"
    ]
  },
  atr: {
    name: "Average True Range",
    parameters: ["value"],
    logics: ["crosses_above", "crosses_below", "greater_than", "less_than", "equals"]
  },
  stochastic: {
    name: "Stochastic Oscillator",
    parameters: ["k", "d"],
    logics: [
      "crosses_above", "crosses_below", "greater_than", "less_than", "equals",
      "overbought", "oversold", "enters_overbought", "exits_overbought",
      "enters_oversold", "exits_oversold", "center_cross_up", "center_cross_down"
    ]
  },
  adx: {
    name: "Average Directional Index",
    parameters: ["adx", "di_plus", "di_minus"],
    logics: [
      "crosses_above", "crosses_below", "greater_than", "less_than", "equals",
      "strong_trend", "weak_trend", "di_plus_above_di_minus", "di_plus_below_di_minus"
    ]
  },
  supertrend: {
    name: "SuperTrend",
    parameters: ["value", "direction"],
    logics: [
      "crosses_above", "crosses_below", "greater_than", "less_than", "equals",
      "changes_to_bullish", "changes_to_bearish"
    ]
  },
  ichimoku: {
    name: "Ichimoku Cloud",
    parameters: ["tenkan", "kijun", "senkou_a", "senkou_b", "chikou"],
    logics: [
      "crosses_above", "crosses_below", "greater_than", "less_than", "equals",
      "above_cloud", "below_cloud", "inside_cloud", "tenkan_kijun_cross"
    ]
  },
  volume: {
    name: "Volume",
    parameters: ["value", "average"],
    logics: [
      "crosses_above", "crosses_below", "greater_than", "less_than", "equals",
      "above_average", "below_average", "spike"
    ]
  },
  momentum: {
    name: "Momentum",
    parameters: ["value"],
    logics: [
      "crosses_above", "crosses_below", "greater_than", "less_than", "equals",
      "zero_cross_up", "zero_cross_down", "turns_up", "turns_down"
    ]
  },
  custom: {
    name: "Custom Indicator",
    parameters: ["value"],
    logics: ["crosses_above", "crosses_below", "greater_than", "less_than", "equals"]
  }
}

export const TIMEFRAMES = [
  "1m", "3m", "5m", "15m", "30m", "1h", "2h", "4h", "6h", "8h", "12h", "1d", "3d", "1w", "1M"
]

export const DEFAULT_INDICATOR_PARAMS: Record<IndicatorType, any> = {
  price: { source: "close" },
  sma: { period: 20, source: "close" },
  ema: { period: 20, source: "close" },
  wma: { period: 20, source: "close" },
  hma: { period: 20, source: "close" },
  vwap: {},
  rsi: { period: 14, source: "close" },
  macd: { fastPeriod: 12, slowPeriod: 26, signalPeriod: 9, source: "close" },
  bollinger: { period: 20, stdDev: 2, source: "close" },
  atr: { period: 14 },
  stochastic: { kPeriod: 14, dPeriod: 3, slowing: 3 },
  adx: { period: 14 },
  supertrend: { period: 10, multiplier: 3 },
  ichimoku: { conversionPeriod: 9, basePeriod: 26, laggingSpanPeriod: 52, displacement: 26 },
  volume: {},
  momentum: { period: 10, source: "close" },
  custom: { formula: "sma(close, 20) + atr(14) * 2" }
} 