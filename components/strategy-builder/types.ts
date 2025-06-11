export type IndicatorType = 
  | "price"
  | "sma"
  | "ema"
  | "wma"
  | "hma"
  | "vwap"
  | "vwma"
  | "rsi"
  | "macd"
  | "bollinger"
  | "atr"
  | "stochastic"
  | "adx"
  | "supertrend"
  | "ichimoku"
  | "volume"
  | "momentum"
  | "williams_r"
  | "bollinger_b"
  | "parabolic_sar"
  | "dpo"
  | "ppo"
  | "cmo"
  | "trix"
  | "keltner"
  | "roc"
  | "awesome"
  | "cci"
  | "custom"



  export type IndicatorLogic =

  | "crosses_above"
  | "crosses_below"
  | "greater_than"
  | "less_than"
  | "equals"
  | "inside"
  | "outside"
  | "touches"
  | "increasing"
  | "decreasing"
  | "bullish"
  | "bearish"

| "overbought"
 | "oversold"

  | "center_cross_up"
  | "center_cross_down"
  | "zero_cross_up"
  | "zero_cross_down"
  | "histogram_positive"
  | "histogram_negative"
  | "histogram_increasing"
  | "histogram_decreasing"
  | "enters_overbought"
  | "exits_overbought"
  | "enters_oversold"
  | "exits_oversold"
  | "bullish_divergence"
  | "bearish_divergence"
  | "strong_trend"
  | "weak_trend"
  | "di_plus_above_di_minus"
  | "di_plus_below_di_minus"
  | "above_cloud"
  | "below_cloud"
  | "inside_cloud"
  | "tenkan_kijun_cross"
  | "changes_to_bullish"
  | "changes_to_bearish"
  | "squeeze"
  | "expansion"
  | "percent_change"
  | "turns_up"
  | "turns_down"
  | "above_average"
  | "below_average"
  | "spike"





export type IndicatorParams = {
  // Common parameters
  source?: "open" | "high" | "low" | "close" | "hl2" | "hlc3" | "ohlc4"
  period?: number
  
  // MACD specific
  fastPeriod?: number
  slowPeriod?: number
  signalPeriod?: number
  
  // Bollinger Bands specific
  stdDev?: number
  
  // Stochastic specific
  kPeriod?: number
  dPeriod?: number
  slowing?: number
  
  // SuperTrend specific
  multiplier?: number
  
  // Ichimoku specific
  conversionPeriod?: number
  basePeriod?: number
  laggingSpanPeriod?: number
  displacement?: number
  
  // Custom indicator specific
  formula?: string

  // Volume specific
  averageVolumeBar?: number

  // Secondary indicator
  secondary_indicator?: IndicatorType

  // Allow string indexing for dynamic access
  [key: string]: string | number | boolean | undefined | IndicatorType
}

export type SecondaryIndicator = {
  type: IndicatorType;
  params: IndicatorParams;
}

export type IndicatorCondition = {
  id: string
  indicator: IndicatorType
  logic: IndicatorLogic
  value: string
  timeframe: string
  params: IndicatorParams
  secondaryIndicator?: {
    type: IndicatorType
    params: IndicatorParams
  }
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

export type StopLossRule = {
  id: string
  type: "percentage" | "atr" | "fixed-dollar" | "time"
  value: number
  atrPeriod?: number
  atrMultiplier?: number
  lookbackPeriod?: number
  enabled: boolean
}

export type TakeProfitRule = {
  id: string
  type: "percentage" | "r:r" | "atr" | "trailing"
  value: number
  atrPeriod?: number
  atrMultiplier?: number
  riskRewardRatio?: number
  lookbackPeriod?: number
  enabled: boolean
}

export type TrailingStopRule = {
  id: string
  type: "percentage" | "atr" | "volatility" | "parabolic" | "moving-average" | "custom"
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

export type TimeExitRule = {
  id: string
  type: "bars" | "time" | "date" | "session-end" | "custom"
  value: number
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
  maxMonthlyDrawdown?: number
  maxTradesPerDay?: number
  maxTradesPerWeek?: number
  sessionStart?: string
  sessionEnd?: string
  maxConsecutiveLosses: number
  profitTarget: number
  riskRewardMinimum: number
  pyramiding: number
  experienceLevel: "beginner" | "intermediate" | "advanced"
  leverageEnabled?: boolean
  leverageRatio?: number
  advancedLogic?: { id: string; description: string; enabled: boolean }[]
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
  maxRisk: number
  equityPercentage?: number
  riskPerTrade?: number
  winRate?: number
  payoffRatio?: number
  optimalFraction?: number
  volatilityPeriod?: number
  volatilityMultiplier?: number
  customFormula?: string
  useStopLossRisk?: boolean
  enabled: boolean
}

export type Strategy = {
  name: string
  description: string
  entryLong: PositionRule
  entryShort: PositionRule
  exitLong: PositionRule
  exitShort: PositionRule
  riskManagement: RiskManagementConfig

}

export type StrategyConfig = Strategy;

