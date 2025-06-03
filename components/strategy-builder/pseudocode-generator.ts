import type { StrategyConfig } from "./strategy-builder"
import { collectIndicators } from "./utils"
import indicatorMetadata from "./indicator-metadata"

export function generatePseudocode(strategy: StrategyConfig): string {
  let code = `Strategy: ${strategy.name}
Description: ${strategy.description}

Risk Management:
- Risk per trade: ${strategy.riskManagement.positionSizing[0]?.maxRisk || 2}%
- Max open positions: ${strategy.riskManagement.maxOpenPositions}
- Max drawdown: ${strategy.riskManagement.maxDrawdown}%

Entry Rules:
`

  function getLogicDescription(condition: any): string {
    const logic = condition.logic
    const params = condition.params || {}

    console.log("=== PSEUDOCODE DEBUG ===")
    console.log("Logic:", logic)
    console.log("Params:", params)
    console.log("Condition:", condition)
    console.log("=======================")

    // Handle cross indicator logic - FIXED TO MATCH YOUR DATA STRUCTURE
    if (
      logic === "> indicator" ||
      logic === "< indicator" ||
      logic === "crosses_above_indicator" ||
      logic === "crosses_below_indicator" ||
      logic === "Crosses Above Indicator" ||
      logic === "Crosses Below Indicator"
    ) {
      const direction =
        logic === "> indicator" || logic === "crosses_above_indicator" || logic === "Crosses Above Indicator"
          ? "crosses above"
          : "crosses below"

      // Get secondary indicator from params - FIXED LOGIC
      const secondaryIndicator = params.indicator || "UNKNOWN"

      // Try multiple ways to get the secondary period
      let secondaryPeriod = "0"
      if (params.crossPeriod) {
        secondaryPeriod = params.crossPeriod.toString()
      } else if (params.period && secondaryIndicator !== condition.indicator) {
        // If period exists and it's for a different indicator, use it
        secondaryPeriod = params.period.toString()
      } else if (secondaryIndicator && indicatorMetadata[secondaryIndicator]) {
        // Use default period from metadata
        const defaultPeriod = indicatorMetadata[secondaryIndicator].parameters.period?.default
        secondaryPeriod = defaultPeriod ? defaultPeriod.toString() : "20"
      }

      // Format the secondary indicator name properly
      const formattedSecondaryIndicator = secondaryIndicator.toUpperCase()

      return `${direction} ${formattedSecondaryIndicator}(${secondaryPeriod})`
    }

    // Handle price cross logic
    if (logic === "crosses_above_price" || logic === "crosses_below_price") {
      const direction = logic === "crosses_above_price" ? "crosses above" : "crosses below"
      return `${direction} price`
    }

    // Handle threshold-based logic (like RSI overbought/oversold)
  //  if (logic === "overbought" || logic === "oversold") {
  //    const threshold = condition.value || (logic === "overbought" ? "70" : "30")
      //return `${logic} (${threshold})`
  //  }

    // Handle comparison logic with values
    if (logic === "greater_than" || logic === ">" || logic === "less_than" || logic === "<") {
      const operator = logic === "greater_than" || logic === ">" ? ">" : "<"
      const value = condition.value || "0"
      return `${operator} ${value}`
    }

    // Handle volume logic
    if (condition.indicator === "volume") {
      if (logic === "above_average") {
        const avgBars = params.averageVolumeBar || "20"
        return `above ${avgBars}-bar average`
      }
      if (logic === "below_average") {
        const avgBars = params.averageVolumeBar || "20"
        return `below ${avgBars}-bar average`
      }
    }

    // Standard logic mapping
    const logicMap: Record<string, string> = {
      crosses_above: "crosses above",
      crosses_below: "crosses below",
      equals: "equals",
      price_above: "price above",
      price_below: "price below",
      above_average: "above average",
      below_average: "below average",
    }

    const baseLogic = logicMap[logic] || logic

    // For value-based conditions
    if (
      condition.value !== undefined &&
      condition.value !== null &&
      condition.value !== "" &&
      condition.value !== "0"
    ) {
      return `${baseLogic} ${condition.value}`
    }

    return baseLogic
  }

  function getIndicatorName(condition: any): string {
    const indicator = condition.indicator
    const params = condition.params || {}

    // Get the main indicator name and parameters
    let indicatorName = indicator.toUpperCase()

    // For cross-indicator logic, use the main indicator's period, not the secondary
    let mainPeriod = params.period

    // If this is a cross-indicator condition and we have crossPeriod,
    // the main period should be the original period, not the cross period
    if ((condition.logic === "> indicator" || condition.logic === "< indicator") && params.crossPeriod) {
      // Try to get the main indicator's period from metadata default
      const mainIndicatorMeta = indicatorMetadata[indicator]
      mainPeriod = mainIndicatorMeta?.parameters?.period?.default || 20
    }

    // Add period parameter if it exists
    if (mainPeriod) {
      indicatorName += `(${mainPeriod})`
    } else {
      // Default periods for common indicators
      const defaultPeriods: Record<string, number> = {
        sma: 20,
        ema: 20,
        rsi: 14,
        macd: 12,
        bollinger: 20,
        stochastic: 14,
        atr: 14,
        adx: 14,
        cci: 20,
        williams: 14,
        momentum: 10,
        roc: 12,
        trix: 14,
        dpo: 20,
        ppo: 12,
        ultimate: 14,
        money_flow: 14,
        chaikin: 10,
        volume: 20,
        vwap: 20,
        pivot: 1,
        fibonacci: 1,
        ichimoku: 26,
        parabolic: 0.02,
        keltner: 20,
        donchian: 20,
        hma: 20,
        wma: 20,
      }

      const defaultPeriod = defaultPeriods[indicator] || 20
      indicatorName += `(${defaultPeriod})`
    }

    return indicatorName
  }

  const renderConditions = (group: any) => {
    return group.conditions
      .map((condition: any, index: number) => {
        const indicatorName = getIndicatorName(condition)
        const logicDescription = getLogicDescription(condition)
        const connector = index > 0 ? " AND " : ""

        return `${connector}${indicatorName} ${logicDescription} [${condition.timeframe}]`
      })
      .join("")
  }

  // Entry Long
  code += "Long Entry:\n"
  if (strategy.entryLong.conditionGroups.length === 0) {
    code += "  No conditions set\n"
  } else {
    strategy.entryLong.conditionGroups.forEach((group, groupIndex) => {
      if (groupIndex > 0) code += "OR\n"
      code += "  IF " + renderConditions(group) + "\n"
    })
  }

  // Entry Short
  code += "\nShort Entry:\n"
  if (strategy.entryShort.conditionGroups.length === 0) {
    code += "  No conditions set\n"
  } else {
    strategy.entryShort.conditionGroups.forEach((group, groupIndex) => {
      if (groupIndex > 0) code += "OR\n"
      code += "  IF " + renderConditions(group) + "\n"
    })
  }

  // Exit Long
  code += "\nExit Rules:\n"
  code += "Long Exit:\n"
  if (strategy.exitLong.conditionGroups.length === 0) {
    code += "  No conditions set\n"
  } else {
    strategy.exitLong.conditionGroups.forEach((group, groupIndex) => {
      if (groupIndex > 0) code += "OR\n"
      code += "  IF " + renderConditions(group) + "\n"
    })
  }

  // Exit Short
  code += "\nShort Exit:\n"
  if (strategy.exitShort.conditionGroups.length === 0) {
    code += "  No conditions set\n"
  } else {
    strategy.exitShort.conditionGroups.forEach((group, groupIndex) => {
      if (groupIndex > 0) code += "OR\n"
      code += "  IF " + renderConditions(group) + "\n"
    })
  }

  // Indicators used
  code += "\nIndicators Used:\n"
  const indicators = collectIndicators(strategy)
  if (indicators.length === 0) {
    code += "- No indicators used\n"
  } else {
    indicators.forEach((indicator) => {
      code += `- ${indicator.toUpperCase()}\n`
    })
  }

  return code
}
