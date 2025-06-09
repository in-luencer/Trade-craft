import { StrategyConfig } from "./types";
import { IndicatorCondition } from "./types";

import { DEFAULT_INDICATOR_PARAMS } from "./constants"

export function getIndicatorVariable(condition: IndicatorCondition): string {
  const indicator = condition.indicator;

  switch (indicator) {
    case "price":
      return condition.params?.source || "close";
    case "sma":
      const smaParams = getIndicatorParams(condition, "sma");
      return `ta.sma(${smaParams.source || "close"}, ${smaParams.period})`;
    case "ema":
      const emaParams = getIndicatorParams(condition, "ema");
      return `ta.ema(${emaParams.source || "close"}, ${emaParams.period})`;
    case "wma":
      const wmaParams = getIndicatorParams(condition, "wma");
      return `ta.wma(${wmaParams.source || "close"}, ${wmaParams.period})`;
    case "hma":
      const hmaParams = getIndicatorParams(condition, "hma");
      return `ta.hma(${hmaParams.source || "close"}, ${hmaParams.period})`;
    case "vwap":
      return "ta.vwap(hlc3)";
    case "rsi":
      const rsiParams = getIndicatorParams(condition, "rsi");
      return `ta.rsi(${rsiParams.source || "close"}, ${rsiParams.period})`;
    case "macd":
      if (condition.params?.macdType === "histogram") return "histogram";
      if (condition.params?.macdType === "signal") return "signalLine";
      return "macdLine";
    case "bollinger":
      if (condition.params?.band === "upper") return "upperBand";
      if (condition.params?.band === "lower") return "lowerBand";
      if (condition.params?.band === "width") return "(upperBand - lowerBand) / middleBand";
      if (condition.params?.band === "percent_b") return "(close - lowerBand) / (upperBand - lowerBand)";
      return "middleBand";
    case "atr":
      const atrParams = getIndicatorParams(condition, "atr");
      return `ta.atr(${atrParams.period})`;
    case "stochastic":
      if (condition.params?.stochType === "d") return "d";
      return "k";
    case "adx":
      if (condition.params?.adxType === "di_plus") return "diPlus";
      if (condition.params?.adxType === "di_minus") return "diMinus";
      return "adx";
    case "supertrend":
      if (condition.params?.supertrendType === "direction") return "direction";
      return "supertrend";
    case "ichimoku":
      if (condition.params?.ichimokuType === "tenkan") return "tenkan";
      if (condition.params?.ichimokuType === "kijun") return "kijun";
      if (condition.params?.ichimokuType === "senkou_a") return "senkou_a";
      if (condition.params?.ichimokuType === "senkou_b") return "senkou_b";
      if (condition.params?.ichimokuType === "chikou") return "chikou";
      return "tenkan";
    case "volume":
      if (condition.params?.volumeType === "average") return "volumeMA";
      return "volume";
    case "momentum":
      return "momentum";
    case "custom":
      return "customValue";
    default:
      return `${indicator}Value`;
  }
}

export function getIndicatorLogic(condition: IndicatorCondition): string {
  const indicator = condition.indicator;
  const logic = condition.logic;
  const value = condition.value;
  const params = condition.params || {};

  // Handle crossover/crossunder between indicators - only for valid logic values
  if (logic === "crosses_above" || logic === "crosses_below") {
    if (typeof value === "string" && value.startsWith("indicator:")) {
      const targetIndicator = value.split(":")[1];
      const targetIndicatorDisplayName = getIndicatorDisplayName({ indicator: targetIndicator } as IndicatorCondition);
      const logicDescription = logic === "crosses_above" ? "crosses above" : "crosses below";
      return `${logicDescription} ${targetIndicatorDisplayName}`;
    }
    // Handle cross with secondaryIndicator (object form)
    if (condition.secondaryIndicator && typeof condition.secondaryIndicator === "object" && condition.secondaryIndicator.type) {
      const logicDescription = logic === "crosses_above" ? "crosses above" : "crosses below";
      let secondaryDisplayName = condition.secondaryIndicator.type.toUpperCase();
      if (condition.secondaryIndicator.params && condition.secondaryIndicator.params.period) {
        secondaryDisplayName += `(${condition.secondaryIndicator.params.period})`;
      }
      return `${logicDescription} ${secondaryDisplayName}`;
    }
  }

  // Handle other logic types
  const logicMap: Record<string, string> = {
    crosses_above: "crosses above",
    crosses_below: "crosses below",
    crosses_above_price: "crosses above price",
    crosses_below_price: "crosses below price",
    greater_than: ">",
    less_than: "<",
    equals: "==",
    inside: "is inside",
    outside: "is outside",
    touches: "touches",
    increasing: "is increasing",
    decreasing: "is decreasing",
    bullish: "is bullish",
    bearish: "is bearish",
    overbought: "is overbought",
    oversold: "is oversold",
    center_cross_up: "crosses above 50",
    center_cross_down: "crosses below 50",
    zero_cross_up: "crosses above 0",
    zero_cross_down: "crosses below 0",
    histogram_positive: "histogram is positive",
    histogram_negative: "histogram is negative",
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
    di_plus_above_di_minus: "DI+ is above DI-",
    di_plus_below_di_minus: "DI+ is below DI-",
    above_cloud: "is above cloud",
    below_cloud: "is below cloud",
    inside_cloud: "is inside cloud",
    tenkan_kijun_cross: "tenkan crosses kijun",
    changes_to_bullish: "changes to bullish",
    changes_to_bearish: "changes to bearish",
    squeeze: "is in a squeeze",
    expansion: "is in expansion",
    percent_change: "percent change is",
    turns_up: "turns up",
    turns_down: "turns down",
    above_average: "is above average",
    below_average: "is below average",
    spike: "shows a spike",
    price_above: "price above",
    price_below: "price below",
  };
  const logicDescription = logicMap[logic] || logic;

  // Handle cases where value is included in the description
  if (["greater_than", "less_than", "equals", "percent_change"].includes(logic)) {
    return `${logicDescription} ${value}`
  }

  // For value-based conditions, append the value if it exists
  if (value !== undefined && value !== null && value !== "") {
    return `${logicDescription} ${value}`
  }

  return logicDescription
}

export function getIndicatorParams(condition: IndicatorCondition, indicatorType: string): any {

  // First check if the condition itself has params
  if (condition.params) {
    return condition.params
  }

  // If not, return default params for the indicator type
  return DEFAULT_INDICATOR_PARAMS[indicatorType as keyof typeof DEFAULT_INDICATOR_PARAMS] || {}
}

export function getIndicatorDisplayName(condition: IndicatorCondition): string {
  const indicator = condition.indicator;

  switch (indicator) {
    case "price":
      return condition.params?.source || "close";
    case "sma":
      const smaParams = getIndicatorParams(condition, "sma");
      return `SMA(${smaParams.period})`;
    case "ema":
      const emaParams = getIndicatorParams(condition, "ema");
      return `EMA(${emaParams.period})`;
    case "wma":
      const wmaParams = getIndicatorParams(condition, "wma");
      return `WMA(${wmaParams.period})`;
    case "hma":
      const hmaParams = getIndicatorParams(condition, "hma");
      return `HMA(${hmaParams.period})`;
    case "vwap":
      return "VWAP";
    case "rsi":
      const rsiParams = getIndicatorParams(condition, "rsi");
      return `RSI(${rsiParams.period})`;
    case "macd":
      if (condition.params?.macdType === "histogram") return "MACD Histogram";
      if (condition.params?.macdType === "signal") return "MACD Signal";
      return "MACD Line";
    case "bollinger":
      if (condition.params?.band === "upper") return "Bollinger Upper Band";
      if (condition.params?.band === "lower") return "Bollinger Lower Band";
      if (condition.params?.band === "width") return "Bollinger Width";
      if (condition.params?.band === "percent_b") return "Bollinger %B";
      return "Bollinger Middle Band";
    case "atr":
      const atrParams = getIndicatorParams(condition, "atr");
      return `ATR(${atrParams.period})`;
    case "stochastic":
      if (condition.params?.stochType === "d") return "Stochastic %D";
      return "Stochastic %K";
    case "adx":
      if (condition.params?.adxType === "di_plus") return "ADX DI+";
      if (condition.params?.adxType === "di_minus") return "ADX DI-";
      return "ADX";
    case "supertrend":
      if (condition.params?.supertrendType === "direction") return "SuperTrend Direction";
      return "SuperTrend";
    case "ichimoku":
      if (condition.params?.ichimokuType === "tenkan") return "Ichimoku Tenkan";
      if (condition.params?.ichimokuType === "kijun") return "Ichimoku Kijun";
      if (condition.params?.ichimokuType === "senkou_a") return "Ichimoku Senkou A";
      if (condition.params?.ichimokuType === "senkou_b") return "Ichimoku Senkou B";
      if (condition.params?.ichimokuType === "chikou") return "Ichimoku Chikou";
      return "Ichimoku Tenkan";
    case "volume":
      if (condition.params?.volumeType === "average") return "Volume MA";
      return "Volume";
    case "momentum":
      return "Momentum";
    case "custom":
      return "Custom Indicator";
    default:
      return `${indicator}`;
  }
}


export function collectIndicators(strategy: StrategyConfig): Set<string> {
  const indicators = new Set<string>()


  const collectFromRule = (positionRule: any) => {
    positionRule.conditionGroups.forEach((group: any) => {
      group.conditions.forEach((condition: any) => {
        indicators.add(condition.indicator)
      })
    })
  }

  collectFromRule(strategy.entryLong)
  collectFromRule(strategy.entryShort)
  collectFromRule(strategy.exitLong)
  collectFromRule(strategy.exitShort)

  return indicators

}

