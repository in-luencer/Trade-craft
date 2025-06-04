import type { RiskManagementConfig, StopLossRule, TakeProfitRule, TrailingStopRule, PositionSizingRule, TimeExitRule } from "./risk-management"

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

  |// "overbought"
  | //"oversold"
=======

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
  | "> indicator"
  | "< indicator"
  | "crosses_above_indicator"
  | "crosses_below_indicator"
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



export interface IndicatorParam {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'select';
  default: any;
  min?: number;
  max?: number;
  step?: number;
  advanced?: boolean;
  description?: string;
  options?: Array<string | { label: string; value: string }>;
  showIf?: (params: Record<string, any>) => boolean;
}

export interface IndicatorParams {
  [key: string]: IndicatorParam;
}

export interface IndicatorMetadata {
  name: string;
  description: string;
  parameters: IndicatorParams;
  defaultLogic?: IndicatorLogic;
  logicOptions: Array<{
    value: IndicatorLogic;
    label: string;
    description?: string;
    customInput?: boolean;
    inputLabel?: string;
    valueType?: 'number' | 'string';
    defaultValue?: string | number;
    min?: number;
    max?: number;
    step?: number;
    logicParams?: Record<string, IndicatorParam>;
  }>;
}

export interface BaseIndicatorCondition<T extends string = string> {
  indicator: T;
  logic: IndicatorLogic;
  value?: string;
  params?: Record<string, any>;
  id?: string;
  parameter?: string;
  timeframe?: string;
}

export interface IndicatorCondition {
  id: string;
  indicator: IndicatorType;
  logic: IndicatorLogic;
  value: string | number;
  params?: Record<string, any>;
  parameter?: string;
  timeframe?: string;
}

export interface ConditionGroup {
  id: string;
  operator: "and" | "or";
  conditions: IndicatorCondition[];
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
=======
export interface PositionRule {
  id: string;
  conditionGroups: ConditionGroup[];
}

export interface StrategyConfig {
  id: string;
  name: string;
  description: string;
  isPublic?: boolean;
  entryLong: PositionRule;
  entryShort: PositionRule;
  exitLong: PositionRule;
  exitShort: PositionRule;
  riskManagement: RiskManagementConfig;
}

