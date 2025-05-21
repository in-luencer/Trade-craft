import { IndicatorConfig } from './types'

export const LOGIC_MAP: Record<string, string> = {
  crosses_above: "ta.crossover",
  crosses_below: "ta.crossunder",
  greater_than: ">",
  less_than: "<",
  equals: "==",
  inside: "inside",
  outside: "outside",
  touches: "touches",
  increasing: "is increasing",
  decreasing: "is decreasing",
  bullish: "is bullish",
  bearish: "is bearish",
  overbought: "> 70",
  oversold: "< 30",
  center_cross_up: "crosses above 50",
  center_cross_down: "crosses below 50",
  zero_cross_up: "crosses above 0",
  zero_cross_down: "crosses below 0",
  histogram_positive: "histogram > 0",
  histogram_negative: "histogram < 0",
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
  di_plus_above_di_minus: "DI+ > DI-",
  di_plus_below_di_minus: "DI+ < DI-",
  above_cloud: "is above cloud",
  below_cloud: "is below cloud",
  inside_cloud: "is inside cloud",
  tenkan_kijun_cross: "tenkan crosses kijun",
  changes_to_bullish: "changes to bullish",
  changes_to_bearish: "changes to bearish",
  squeeze: "is in squeeze",
  expansion: "is in expansion",
  percent_change: "percent change",
  turns_up: "turns up",
  turns_down: "turns down",
  above_average: "above average",
  below_average: "below average",
  spike: "shows spike",
}

export const INDICATOR_CONFIGS: Record<string, IndicatorConfig> = {
  sma: {
    name: "sma",
    displayName: "Simple Moving Average",
    parameters: [
      { name: "period", type: "number", default: 20 },
      { name: "source", type: "select", default: "close", options: ["close", "open", "high", "low", "hl2", "hlc3", "ohlc4"] }
    ],
    logicTypes: ["crosses_above", "crosses_below", "greater_than", "less_than"],
    pineScriptGenerator: (params) => `ta.sma(${params.source || "close"}, ${params.period})`,
    pseudocodeGenerator: (params) => `SMA(${params.period})`,
    plotGenerator: (params) => `plot(ta.sma(${params.source || "close"}, ${params.period}), color=color.blue, title="SMA ${params.period}")`
  },
  ema: {
    name: "ema",
    displayName: "Exponential Moving Average",
    parameters: [
      { name: "period", type: "number", default: 20 },
      { name: "source", type: "select", default: "close", options: ["close", "open", "high", "low", "hl2", "hlc3", "ohlc4"] },
      { name: "offset", type: "number", default: 0 }
    ],
    logicTypes: ["crosses_above", "crosses_below", "greater_than", "less_than"],
    pineScriptGenerator: (params) => `ta.ema(${params.source || "close"}, ${params.period})`,
    pseudocodeGenerator: (params) => `EMA(${params.period})`,
    plotGenerator: (params) => `plot(ta.ema(${params.source || "close"}, ${params.period}), color=color.orange, title="EMA ${params.period}")`
  },
  rsi: {
    name: "rsi",
    displayName: "Relative Strength Index",
    parameters: [
      { name: "period", type: "number", default: 14 },
      { name: "source", type: "select", default: "close", options: ["close", "open", "high", "low", "hl2", "hlc3", "ohlc4"] }
    ],
    logicTypes: ["crosses_above", "crosses_below", "overbought", "oversold", "bullish_divergence", "bearish_divergence"],
    pineScriptGenerator: (params) => `ta.rsi(${params.source || "close"}, ${params.period})`,
    pseudocodeGenerator: (params) => `RSI(${params.period})`,
    plotGenerator: (params) => `plot(ta.rsi(${params.source || "close"}, ${params.period}), color=color.purple, title="RSI ${params.period}", display=display.pane)`
  },
  macd: {
    name: "macd",
    displayName: "MACD",
    parameters: [
      { name: "fastPeriod", type: "number", default: 12 },
      { name: "slowPeriod", type: "number", default: 26 },
      { name: "signalPeriod", type: "number", default: 9 },
      { name: "signal_smoothing", type: "number", default: 9 },
      { name: "oscilator_ma_type", type: "select", default: "sma", options: ["sma", "ema", "wma"] },
      { name: "signal_ma_type", type: "select", default: "sma", options: ["sma", "ema", "wma"] },
      { name: "source", type: "select", default: "close", options: ["close", "open", "high", "low", "hl2", "hlc3", "ohlc4"] }
    ],
    logicTypes: ["crosses_above_signal", "crosses_below_signal", "crosses_above_zero", "crosses_below_zero", "histogram_positive", "histogram_negative", "histogram_increasing", "histogram_decreasing", "bullish_divergence", "bearish_divergence"],
    pineScriptGenerator: (params) => `[ta.macd(${params.source || "close"}, ${params.fastPeriod || 12}, ${params.slowPeriod || 26}, ${params.signalPeriod || 9})]`,
    pseudocodeGenerator: (params) => `MACD(${params.fastPeriod || 12}, ${params.slowPeriod || 26}, ${params.signalPeriod || 9})`,
    plotGenerator: (params) => `[macdLine, signalLine, histogram] = ta.macd(${params.source || "close"}, ${params.fastPeriod || 12}, ${params.slowPeriod || 26}, ${params.signalPeriod || 9})
plot(macdLine, color=color.blue, title="MACD Line", display=display.pane)
plot(signalLine, color=color.red, title="Signal Line", display=display.pane)
plot(histogram, color=histogram >= 0 ? color.green : color.red, title="Histogram", style=plot.style_histogram, display=display.pane)`
  },
  bollinger: {
    name: "bollinger",
    displayName: "Bollinger Bands",
    parameters: [
      { name: "period", type: "number", default: 20 },
      { name: "stdDev", type: "number", default: 2 },
      { name: "source", type: "select", default: "close", options: ["close", "open", "high", "low", "hl2", "hlc3", "ohlc4"] },
      { name: "maType", type: "select", default: "sma", options: ["sma", "ema", "wma"] }
    ],
    logicTypes: ["price_above_upper", "price_below_lower", "price_crosses_above_middle", "price_crosses_below_middle", "bands_squeeze", "bands_expand", "price_touches_upper", "price_touches_lower"],
    pineScriptGenerator: (params) => `ta.bbands(${params.source || "close"}, ${params.period || 20}, ${params.stdDev || 2})`,
    pseudocodeGenerator: (params) => `Bollinger Bands(${params.period || 20}, ${params.stdDev || 2})`,
    plotGenerator: (params) => `[upperBand, middleBand, lowerBand] = ta.bbands(${params.source || "close"}, ${params.period || 20}, ${params.stdDev || 2})
plot(upperBand, color=color.blue, title="Upper Band")
plot(middleBand, color=color.blue, title="Middle Band")
plot(lowerBand, color=color.blue, title="Lower Band")`
  },
  stochastic: {
    name: "stochastic",
    displayName: "Stochastic Oscillator",
    parameters: [
      { name: "kPeriod", type: "number", default: 14 },
      { name: "K_smoothing", type: "number", default: 1 },
      { name: "d_slowing", type: "number", default: 3 },
      { name: "overbought", type: "number", default: 80 },
      { name: "oversold", type: "number", default: 20 }
    ],
    logicTypes: ["crosses_above", "crosses_below", "k_crosses_above_d", "k_crosses_below_d", "bullish_divergence", "bearish_divergence"],
    pineScriptGenerator: (params) => `ta.stoch(high, low, close, ${params.kPeriod || 14}, ${params.dSmoothing || 3}, ${params.kSmoothing || 1})`,
    pseudocodeGenerator: (params) => `Stochastic(${params.kPeriod || 14}, ${params.dSmoothing || 3}, ${params.kSmoothing || 1})`,
    plotGenerator: (params) => `[k, d] = ta.stoch(high, low, close, ${params.kPeriod || 14}, ${params.dSmoothing || 3}, ${params.kSmoothing || 1})
plot(k, color=color.blue, title="%K", display=display.pane)
plot(d, color=color.red, title="%D", display=display.pane)`
  },
  adx: {
    name: "adx",
    displayName: "Average Directional Index",
    parameters: [
      { name: "period", type: "number", default: 14 },
      { name: "smoothing", type: "number", default: 14 }
    ],
    logicTypes: ["crosses_above", "crosses_below", "di_plus_crosses_above_di_minus", "di_plus_crosses_below_di_minus", "increasing", "decreasing", "strong_trend", "weak_trend"],
    pineScriptGenerator: (params) => `ta.adx(high, low, close, ${params.period || 14})`,
    pseudocodeGenerator: (params) => `ADX(${params.period || 14})`,
    plotGenerator: (params) => `[adx, diPlus, diMinus] = ta.adx(high, low, close, ${params.period || 14})
plot(adx, color=color.blue, title="ADX", display=display.pane)
plot(diPlus, color=color.green, title="DI+", display=display.pane)
plot(diMinus, color=color.red, title="DI-", display=display.pane)`
  },
  volume: {
    name: "volume",
    displayName: "Volume",
    parameters: [
      { name: "maType", type: "select", default: "sma", options: ["sma", "ema"] },
      { name: "MA_length", type: "number", default: 20 }
    ],
    logicTypes: ["above_average", "below_average", "increasing", "decreasing", "divergence_bullish", "divergence_bearish"],
    pineScriptGenerator: (params) => `ta.${params.maType || "sma"}(volume, ${params.MA_length || 20})`,
    pseudocodeGenerator: (params) => `Volume MA(${params.MA_length || 20})`,
    plotGenerator: (params) => `volumeMA = ta.${params.maType || "sma"}(volume, ${params.MA_length || 20})
plot(volume, color=volume > volume[1] ? color.green : color.red, title="Volume", style=plot.style_columns, display=display.pane)
plot(volumeMA, color=color.blue, title="Volume MA", display=display.pane)`
  },
  ichimoku: {
    name: "ichimoku",
    displayName: "Ichimoku Cloud",
    parameters: [
      { name: "conversionPeriod", type: "number", default: 9 },
      { name: "basePeriod", type: "number", default: 26 },
      { name: "leadingSpanBPeriod", type: "number", default: 52 },
      { name: "laggingSpanPeriod", type: "number", default: 26 }
    ],
    logicTypes: ["price_above_cloud", "price_below_cloud", "price_in_cloud", "tenkan_kijun_cross_bullish", "tenkan_kijun_cross_bearish", "chikou_price_cross_bullish", "chikou_price_cross_bearish", "cloud_color_change_bullish", "cloud_color_change_bearish"],
    pineScriptGenerator: (params) => `ta.ichimoku(${params.conversionPeriod || 9}, ${params.basePeriod || 26}, ${params.leadingSpanBPeriod || 52}, ${params.laggingSpanPeriod || 26})`,
    pseudocodeGenerator: (params) => `Ichimoku Cloud(${params.conversionPeriod || 9}, ${params.basePeriod || 26}, ${params.leadingSpanBPeriod || 52}, ${params.laggingSpanPeriod || 26})`,
    plotGenerator: (params) => `[tenkan, kijun, senkou_a, senkou_b, chikou] = ta.ichimoku(${params.conversionPeriod || 9}, ${params.basePeriod || 26}, ${params.leadingSpanBPeriod || 52}, ${params.laggingSpanPeriod || 26})
plot(tenkan, color=color.blue, title="Tenkan")
plot(kijun, color=color.red, title="Kijun")
fill(plot(senkou_a, color=color.green, title="Senkou A"), plot(senkou_b, color=color.red, title="Senkou B"), color = senkou_a > senkou_b ? color.rgb(76, 175, 80, 90) : color.rgb(255, 82, 82, 90))`
  },
  supertrend: {
    name: "supertrend",
    displayName: "SuperTrend",
    parameters: [
      { name: "atrLength", type: "number", default: 10 },
      { name: "factor", type: "number", default: 3 }
    ],
    logicTypes: ["price_above", "price_below", "trend_change_bullish", "trend_change_bearish", "divergence_bullish", "divergence_bearish"],
    pineScriptGenerator: (params) => `ta.supertrend(${params.atrLength || 10}, ${params.factor || 3})`,
    pseudocodeGenerator: (params) => `SuperTrend(${params.atrLength || 10}, ${params.factor || 3})`,
    plotGenerator: (params) => `[supertrend, direction] = ta.supertrend(${params.atrLength || 10}, ${params.factor || 3})
supertrendColor = direction == 1 ? color.green : color.red
plot(supertrend, color=supertrendColor, title="SuperTrend", linewidth=2)`
  },
  vwap: {
    name: "vwap",
    displayName: "Volume Weighted Average Price",
    parameters: [
      { name: "source", type: "select", default: "close", options: ["close", "open", "high", "low", "hl2", "hlc3", "ohlc4"] },
      { name: "anchorPeriod", type: "select", default: "session", options: ["session", "week", "month", "year", "decade"] },
      { name: "offset", type: "number", default: 0 }
    ],
    logicTypes: ["price_crosses_above", "price_crosses_below"],
    pineScriptGenerator: (params) => `ta.vwap(${params.source || "hlc3"})`,
    pseudocodeGenerator: (params) => `VWAP`,
    plotGenerator: (params) => `plot(ta.vwap(${params.source || "hlc3"}), color=color.blue, title="VWAP")`
  },
  wma: {
    name: "wma",
    displayName: "Weighted Moving Average",
    parameters: [
      { name: "period", type: "number", default: 9 },
      { name: "source", type: "select", default: "close", options: ["close", "open", "high", "low", "hl2", "hlc3", "ohlc4"] },
      { name: "offset", type: "number", default: 0 }
    ],
    logicTypes: ["crosses_above_indicator", "crosses_below_indicator", "price_above", "price_below"],
    pineScriptGenerator: (params) => `ta.wma(${params.source || "close"}, ${params.period})`,
    pseudocodeGenerator: (params) => `WMA(${params.period})`,
    plotGenerator: (params) => `plot(ta.wma(${params.source || "close"}, ${params.period}), color=color.purple, title="WMA ${params.period}")`
  },
  vwma: {
    name: "vwma",
    displayName: "Volume Weighted Moving Average",
    parameters: [
      { name: "period", type: "number", default: 20 },
      { name: "source", type: "select", default: "close", options: ["close", "open", "high", "low", "hl2", "hlc3", "ohlc4"] },
      { name: "offset", type: "number", default: 0 }
    ],
    logicTypes: ["crosses_above_price", "crosses_below_price", "crosses_above_indicator", "crosses_below_indicator", "slope_positive", "slope_negative"],
    pineScriptGenerator: (params) => `ta.vwma(${params.source || "close"}, ${params.period})`,
    pseudocodeGenerator: (params) => `VWMA(${params.period})`,
    plotGenerator: (params) => `plot(ta.vwma(${params.source || "close"}, ${params.period}), color=color.blue, title="VWMA ${params.period}")`
  },
  cci: {
    name: "cci",
    displayName: "Commodity Channel Index",
    parameters: [
      { name: "period", type: "number", default: 20 },
      { name: "constant", type: "number", default: 0.015 }
    ],
    logicTypes: ["crosses_above", "crosses_below", "overbought", "oversold"],
    pineScriptGenerator: (params) => `ta.cci(high, low, close, ${params.period || 20})`,
    pseudocodeGenerator: (params) => `CCI(${params.period || 20})`,
    plotGenerator: (params) => `plot(ta.cci(high, low, close, ${params.period || 20}), color=color.blue, title="CCI ${params.period}", display=display.pane)`
  },
  mfi: {
    name: "mfi",
    displayName: "Money Flow Index",
    parameters: [
      { name: "period", type: "number", default: 14 }
    ],
    logicTypes: ["crosses_above", "crosses_below", "overbought", "oversold"],
    pineScriptGenerator: (params) => `ta.mfi(high, low, close, volume, ${params.period || 14})`,
    pseudocodeGenerator: (params) => `MFI(${params.period || 14})`,
    plotGenerator: (params) => `plot(ta.mfi(high, low, close, volume, ${params.period || 14}), color=color.blue, title="MFI ${params.period}", display=display.pane)`
  },
  obv: {
    name: "obv",
    displayName: "On Balance Volume",
    parameters: [
      { name: "maType", type: "select", default: "sma", options: ["sma", "ema"] },
      { name: "maPeriod", type: "number", default: 20 }
    ],
    logicTypes: ["crosses_above_ma", "crosses_below_ma", "divergence_bullish", "divergence_bearish"],
    pineScriptGenerator: (params) => `ta.obv`,
    pseudocodeGenerator: (params) => `OBV`,
    plotGenerator: (params) => `plot(ta.obv, color=color.blue, title="OBV", display=display.pane)`
  },
  williams_r: {
    name: "williams_r",
    displayName: "Williams %R",
    parameters: [
      { name: "period", type: "number", default: 14 }
    ],
    logicTypes: ["crosses_above", "crosses_below", "overbought", "oversold"],
    pineScriptGenerator: (params) => `ta.wpr(${params.period || 14})`,
    pseudocodeGenerator: (params) => `Williams %R(${params.period || 14})`,
    plotGenerator: (params) => `plot(ta.wpr(${params.period || 14}), color=color.blue, title="Williams %R ${params.period}", display=display.pane)`
  },
  dmi: {
    name: "dmi",
    displayName: "Directional Movement Index",
    parameters: [
      { name: "period", type: "number", default: 14 }
    ],
    logicTypes: ["di_plus_crosses_above_di_minus", "di_plus_crosses_below_di_minus", "adx_above_25", "adx_below_25"],
    pineScriptGenerator: (params) => `ta.adx(high, low, close, ${params.period || 14})`,
    pseudocodeGenerator: (params) => `DMI(${params.period || 14})`,
    plotGenerator: (params) => `[adx, diPlus, diMinus] = ta.adx(high, low, close, ${params.period || 14})
plot(adx, color=color.blue, title="ADX", display=display.pane)
plot(diPlus, color=color.green, title="DI+", display=display.pane)
plot(diMinus, color=color.red, title="DI-", display=display.pane)`
  },
  parabolic_sar: {
    name: "parabolic_sar",
    displayName: "Parabolic SAR",
    parameters: [
      { name: "acceleration", type: "number", default: 0.02 },
      { name: "maximum", type: "number", default: 0.2 }
    ],
    logicTypes: ["crosses_above_price", "crosses_below_price", "trend_change_bullish", "trend_change_bearish"],
    pineScriptGenerator: (params) => `ta.sar(${params.acceleration || 0.02}, ${params.maximum || 0.2})`,
    pseudocodeGenerator: (params) => `Parabolic SAR(${params.acceleration || 0.02}, ${params.maximum || 0.2})`,
    plotGenerator: (params) => `plot(ta.sar(${params.acceleration || 0.02}, ${params.maximum || 0.2}), color=color.blue, title="Parabolic SAR", style=plot.style_circles)`
  },
  momentum: {
    name: "momentum",
    displayName: "Momentum",
    parameters: [
      { name: "period", type: "number", default: 10 },
      { name: "source", type: "select", default: "close", options: ["close", "open", "high", "low"] }
    ],
    logicTypes: ["crosses_above_zero", "crosses_below_zero", "crosses_above", "crosses_below"],
    pineScriptGenerator: (params) => `ta.mom(${params.source || "close"}, ${params.period || 10})`,
    pseudocodeGenerator: (params) => `Momentum(${params.period || 10})`,
    plotGenerator: (params) => `plot(ta.mom(${params.source || "close"}, ${params.period || 10}), color=color.blue, title="Momentum ${params.period}", display=display.pane)`
  },
  roc: {
    name: "roc",
    displayName: "Rate of Change",
    parameters: [
      { name: "period", type: "number", default: 9 },
      { name: "source", type: "select", default: "close", options: ["close", "open", "high", "low"] }
    ],
    logicTypes: ["crosses_above_zero", "crosses_below_zero", "crosses_above", "crosses_below"],
    pineScriptGenerator: (params) => `ta.roc(${params.source || "close"}, ${params.period || 9})`,
    pseudocodeGenerator: (params) => `ROC(${params.period || 9})`,
    plotGenerator: (params) => `plot(ta.roc(${params.source || "close"}, ${params.period || 9}), color=color.blue, title="ROC ${params.period}", display=display.pane)`
  },
  cmf: {
    name: "cmf",
    displayName: "Chaikin Money Flow",
    parameters: [
      { name: "period", type: "number", default: 20 }
    ],
    logicTypes: ["crosses_above_zero", "crosses_below_zero", "crosses_above", "crosses_below"],
    pineScriptGenerator: (params) => `ta.cmf(high, low, close, volume, ${params.period || 20})`,
    pseudocodeGenerator: (params) => `CMF(${params.period || 20})`,
    plotGenerator: (params) => `plot(ta.cmf(high, low, close, volume, ${params.period || 20}), color=color.blue, title="CMF ${params.period}", display=display.pane)`
  },
  bbp: {
    name: "bbp",
    displayName: "Bollinger Bands %B",
    parameters: [
      { name: "period", type: "number", default: 20 },
      { name: "stdDev", type: "number", default: 2 }
    ],
    logicTypes: ["crosses_above_one", "crosses_below_zero", "crosses_above", "crosses_below"],
    pineScriptGenerator: (params) => `ta.bbw(${params.period || 20}, ${params.stdDev || 2})`,
    pseudocodeGenerator: (params) => `BB %B(${params.period || 20}, ${params.stdDev || 2})`,
    plotGenerator: (params) => `plot(ta.bbw(${params.period || 20}, ${params.stdDev || 2}), color=color.blue, title="BB %B ${params.period}", display=display.pane)`
  },
  bbr: {
    name: "bbr",
    displayName: "Bollinger Bands Range",
    parameters: [
      { name: "period", type: "number", default: 20 },
      { name: "stdDev", type: "number", default: 2 }
    ],
    logicTypes: ["crosses_above", "crosses_below", "increasing", "decreasing"],
    pineScriptGenerator: (params) => `ta.bbw(${params.period || 20}, ${params.stdDev || 2})`,
    pseudocodeGenerator: (params) => `BB Range(${params.period || 20}, ${params.stdDev || 2})`,
    plotGenerator: (params) => `plot(ta.bbw(${params.period || 20}, ${params.stdDev || 2}), color=color.blue, title="BB Range ${params.period}", display=display.pane)`
  },
  hma: {
    name: "hma",
    displayName: "Hull Moving Average",
    parameters: [
      { name: "period", type: "number", default: 20 },
      { name: "source", type: "select", default: "close", options: ["close", "open", "high", "low", "hl2", "hlc3", "ohlc4"] }
    ],
    logicTypes: ["crosses_above_price", "crosses_below_price", "crosses_above_indicator", "crosses_below_indicator"],
    pineScriptGenerator: (params) => `ta.hma(${params.source || "close"}, ${params.period})`,
    pseudocodeGenerator: (params) => `HMA(${params.period})`,
    plotGenerator: (params) => `plot(ta.hma(${params.source || "close"}, ${params.period}), color=color.teal, title="HMA ${params.period}")`
  },
  orb: {
    name: "orb",
    displayName: "Opening Range Breakout",
    parameters: [
      { name: "rangeMinutes", type: "number", default: 30 },
      { name: "requireRetest", type: "select", default: "false", options: ["true", "false"] },
      { name: "retestTimeWindow", type: "number", default: 10 },
      { name: "retestConfirmation", type: "select", default: "none", options: ["none", "bounce", "candle_close_above", "volume_spike"] },
      { name: "source", type: "select", default: "orb_high", options: ["orb_high", "orb_low"] }
    ],
    logicTypes: ["breaks_above_range", "breaks_below_range", "retest_success", "retest_fail"],
    pineScriptGenerator: (params) => `// ORB logic placeholder`,
    pseudocodeGenerator: (params) => `ORB(${params.rangeMinutes})`,
    plotGenerator: (params) => `// ORB plot placeholder`
  }
}

export const AVAILABLE_SYMBOLS = [
  { value: "BTCUSD", label: "BTC/USD" },
  { value: "ETHUSD", label: "ETH/USD" },
  { value: "BNBUSD", label: "BNB/USD" },
  { value: "ADAUSD", label: "ADA/USD" },
  { value: "DOGEUSD", label: "DOGE/USD" }
]

export const AVAILABLE_TIMEFRAMES = [
  { value: "1m", label: "1 Minute" },
  { value: "5m", label: "5 Minutes" },
  { value: "15m", label: "15 Minutes" },
  { value: "30m", label: "30 Minutes" },
  { value: "1h", label: "1 Hour" },
  { value: "4h", label: "4 Hours" },
  { value: "1d", label: "1 Day" },
  { value: "1w", label: "1 Week" }
] 