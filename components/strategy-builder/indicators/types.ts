export interface IndicatorParams {
  period?: number
  source?: string
  fastPeriod?: number
  slowPeriod?: number
  signalPeriod?: number
  stdDev?: number
  kPeriod?: number
  dPeriod?: number
  slowing?: number
  multiplier?: number
  conversionPeriod?: number
  basePeriod?: number
  laggingSpanPeriod?: number
  displacement?: number
  formula?: string
  [key: string]: any
}

export interface Condition {
  indicator: string
  parameter?: string
  logic: string
  value: number | string
  timeframe?: string
  params?: IndicatorParams
}

export interface ConditionGroup {
  conditions: Condition[]
  operator: 'and' | 'or'
}

export interface PositionRule {
  conditionGroups: ConditionGroup[]
}

export interface IndicatorConfig {
  name: string
  displayName: string
  parameters: {
    name: string
    type: 'number' | 'string' | 'select'
    default?: any
    options?: string[]
  }[]
  logicTypes: string[]
  pineScriptGenerator: (params: IndicatorParams) => string
  pseudocodeGenerator: (params: IndicatorParams) => string
  plotGenerator: (params: IndicatorParams) => string
}

export interface RiskRule {
  enabled: boolean
  type: string
  value: number | string
  maxRisk?: number
}

export interface RiskManagement {
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

export interface StrategyConfig {
  name: string
  description: string
  entryLong: PositionRule
  entryShort: PositionRule
  exitLong: PositionRule
  exitShort: PositionRule
  riskManagement: RiskManagement
} 