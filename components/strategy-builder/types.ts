export type IndicatorType = 
  | "price"
  | "sma"
  | "ema"
  | "wma"
  | "hma"
  | "vwap"
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
  source?: string
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
}

export type IndicatorCondition = {
  id: string
  indicator: IndicatorType
  parameter: string
  logic: IndicatorLogic
  value: string | number
  timeframe: string
  params?: IndicatorParams
}

export type ConditionGroup = {
  operator: "and" | "or"
  conditions: IndicatorCondition[]
}

export type PositionRule = {
  conditionGroups: ConditionGroup[]
}

export type RiskManagementConfig = {
  positionSizing: {
    maxRisk: number
    maxPositions: number
  }[]
  maxOpenPositions: number
  maxDrawdown: number
  stopLoss?: StopLossConfig
  takeProfit?: TakeProfitConfig
  trailingStop?: TrailingStopConfig
}

export type StopLossConfig = {
  type: "fixed" | "trailing" | "atr";
  value: number; // Percentage or ATR multiplier
};

export type TakeProfitConfig = {
  type: "fixed" | "risk_reward";
  value: number; // Percentage or R:R ratio
};

export type TrailingStopConfig = {
  type: "fixed" | "atr";
  value: number; // Percentage or ATR multiplier
  activation_price_delta?: number; // Optional: activate trailing stop only after price moves X% in favor
};

export type Strategy = {
  name: string
  description: string
  entryLong: PositionRule
  entryShort: PositionRule
  exitLong: PositionRule
  exitShort: PositionRule
  riskManagement: RiskManagementConfig
} 