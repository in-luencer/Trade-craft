import { Strategy } from "./types"
import { collectIndicators, getIndicatorDisplayName, getIndicatorLogic } from "./utils"

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
  indicators.forEach((indicator) => {
    code += `- ${getIndicatorDisplayName({ indicator } as any)}\n`
  })

  return code
} 