import type { StrategyConfig } from "@/components/strategy-builder/types"
import { collectIndicators, getIndicatorDisplayName, getIndicatorLogic } from "@/components/strategy-builder/utils"

export interface Strategy {
  id: string;
  name: string;
  description: string;
  riskManagement: {
    positionSizing: Array<{
      maxRisk: number;
    }>;
    stopLoss: Array<{
      enabled: boolean;
      type: string;
      value: number;
    }>;
    takeProfit: Array<{
      enabled: boolean;
      type: string;
      value: number;
    }>;
    trailingStop: Array<{
      enabled: boolean;
      type: string;
      value: number;
    }>;
    maxOpenPositions: number;
    maxDrawdown: number;
  };
  entryLong: {
    conditionGroups: Array<{
      conditions: Array<IndicatorCondition>;
    }>;
  };
  entryShort: {
    conditionGroups: Array<{
      conditions: Array<IndicatorCondition>;
    }>;
  };
  exitLong: {
    conditionGroups: Array<{
      conditions: Array<IndicatorCondition>;
    }>;
  };
  exitShort: {
    conditionGroups: Array<{
      conditions: Array<IndicatorCondition>;
    }>;
  };
}

export function generatePseudocode(strategy: Strategy): string {
  let code = `Strategy: ${strategy.name}
Description: ${strategy.description}

Risk Management:
- Risk per trade: ${strategy.riskManagement.positionSizing[0]?.maxRisk || 2}%
- Max open positions: ${strategy.riskManagement.maxOpenPositions}
- Max drawdown: ${strategy.riskManagement.maxDrawdown}%

Entry Rules:
`

  // Generate entry rules
  code += "Long Entry:\n"
  strategy.entryLong.conditionGroups.forEach((group, groupIndex) => {
    if (groupIndex > 0) code += "OR\n"
    code += "  IF "
    group.conditions.forEach((condition, conditionIndex) => {
      if (conditionIndex > 0) code += " AND "
     
      code += `${getIndicatorDisplayName(condition)} ${getIndicatorLogic(condition)}`
    })
    code += "\n"
  })

  code += "\nShort Entry:\n"
  strategy.entryShort.conditionGroups.forEach((group, groupIndex) => {
    if (groupIndex > 0) code += "OR\n"
    code += "  IF "
    group.conditions.forEach((condition, conditionIndex) => {
      if (conditionIndex > 0) code += " AND "
      code += `${getIndicatorDisplayName(condition)} ${getIndicatorLogic(condition)}`
    })
    code += "\n"
  })

  // Generate exit rules
  code += "\nExit Rules:\n"
  code += "Long Exit:\n"
  strategy.exitLong.conditionGroups.forEach((group, groupIndex) => {
    if (groupIndex > 0) code += "OR\n"
    code += "  IF "
    group.conditions.forEach((condition, conditionIndex) => {
      if (conditionIndex > 0) code += " AND "
      code += `${getIndicatorDisplayName(condition)} ${getIndicatorLogic(condition)}`
    })
    code += "\n"
  })

  code += "\nShort Exit:\n"
  strategy.exitShort.conditionGroups.forEach((group, groupIndex) => {
    if (groupIndex > 0) code += "OR\n"
    code += "  IF "
    group.conditions.forEach((condition, conditionIndex) => {
      if (conditionIndex > 0) code += " AND "
      code += `${getIndicatorDisplayName(condition)} ${getIndicatorLogic(condition)}`
    })
    code += "\n"
  })

  // Generate indicator descriptions
  code += "\nIndicators Used:\n"
  const indicators = collectIndicators(strategy)
  console.log(indicators)
  indicators.forEach((indicator) => {
    console.log(indicator)
    code += `- ${getIndicatorDisplayName({ indicator } as any)}\n`
  })

  return code
}