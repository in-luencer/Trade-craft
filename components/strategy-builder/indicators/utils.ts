import { Condition, IndicatorParams } from './types'
import { INDICATOR_CONFIGS } from './constants'

export function getIndicatorVariable(condition: Condition): string {
  const config = INDICATOR_CONFIGS[condition.indicator]
  if (!config) return `${condition.indicator}Value`

  const params = condition.params || {}
  return config.pineScriptGenerator(params)
}

export function getIndicatorDisplayName(condition: Condition): string {
  const config = INDICATOR_CONFIGS[condition.indicator]
  if (!config) return `${condition.indicator}(${condition.parameter})`

  const params = condition.params || {}
  return config.pseudocodeGenerator(params)
}

export function getIndicatorParams(condition: Condition, indicatorType: string): IndicatorParams {
  // First check if the condition itself has params
  if (condition.params) {
    return condition.params
  }

  // If not, return default params from config
  const config = INDICATOR_CONFIGS[indicatorType]
  if (config) {
    return config.parameters.reduce((acc, param) => {
      acc[param.name] = param.default
      return acc
    }, {} as IndicatorParams)
  }

  return {}
}

export function getIndicatorLogic(condition: Condition): string {
  const config = INDICATOR_CONFIGS[condition.indicator]
  if (!config) return `${condition.indicator}Value ${condition.logic} ${condition.value}`

  const variable = getIndicatorVariable(condition)
  const logicMap: Record<string, string> = {
    crosses_above: "ta.crossover",
    crosses_below: "ta.crossunder",
    greater_than: ">",
    less_than: "<",
    equals: "==",
  }

  if (condition.logic === "crosses_above" || condition.logic === "crosses_below") {
    if (typeof condition.value === "string" && condition.value.startsWith("indicator:")) {
      const targetIndicator = condition.value.split(":")[1]
      const targetVariable = getIndicatorVariable({ indicator: targetIndicator } as Condition)
      return `${logicMap[condition.logic]}(${variable}, ${targetVariable})`
    }
  }

  return `${variable} ${logicMap[condition.logic] || condition.logic} ${condition.value}`
} 