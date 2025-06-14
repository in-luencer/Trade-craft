import { sources } from "next/dist/compiled/webpack/webpack"
import { sourceMapsEnabled } from "process"

// Define types for indicator parameters and metadata
export type IndicatorParameterType = "number" | "select" | "source" | "timeframe" | "boolean"

export type LogicOption = {
  value: string
  label: string
  description: string
  requiresValue?: boolean
  defaultValue?: string | number
  valueType?: "number" | "string" | "boolean" | "select"
  min?: number
  max?: number
  step?: number
  options?: string[] | { value: string; label: string }[]
  customInput?: boolean
  syncKey?: string
  inputLabel?: string
  logicParams?: Record<
    string,
    {
      name: string
      type: "number" | "select"
      default: string | number
      min?: number
      max?: number
      step?: number
      options?: { value: string; label: string }[]
      description: string
    }
  >
}

export interface IndicatorParameter {
  name: string
  type: IndicatorParameterType
  default: string | number | boolean
  min?: number
  max?: number
  step?: number
  options?: string[] | { value: string; label: string }[]
  description: string
  advanced?: boolean
  required?: boolean
  dependsOn?: string
  showIf?: (values: Record<string, any>) => boolean
}

export interface IndicatorMetadata {
  name: string
  description: string
  category: "trend" | "momentum" | "volatility" | "volume" | "price" | "custom"
  parameters: Record<string, IndicatorParameter>
  components?: string[]
  defaultComponent?: string
  logicOptions: LogicOption[]
  defaultLogic?: string
  defaultValue?: string
  defaultTimeframe?: string
  formula?: string
  learnMoreUrl?: string
  author?: string
  version?: string
  tags?: string[]
}

// Define the indicator metadata
export const indicatorMetadata: Record<string, IndicatorMetadata> = {
  sma: {
    name: "Simple Moving Average",
    description: "Average price over a specified period",
    category: "trend",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 20,
        min: 1,
        max: 500,
        step: 1,
        description: "Number of bars used in calculation",
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },
    },
    logicOptions: [
      {
        value: "> price",
        label: "Greater than Price",
        description: "When SMA crosses above the price",
        requiresValue: false,
      },
      {
        value: "< price",
        label: "Less than Price",
        description: "When SMA crosses below the price",
        requiresValue: false,
      },
      {
        value: "crosses above",
        label: "Crosses Above another moving average",
        description: "When SMA crosses above another indicator",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "sma", label: "Simple Moving Average (SMA)" },
          { value: "ema", label: "Exponential Moving Average (EMA)" },
          { value: "wma", label: "Weighted Moving Average (WMA)" },
          { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" },
          { value: "hma", label: "Hull Moving Average (HMA)" },
        ],
        customInput: true,
        logicParams: {
          indicator: {
            name: "Indicator",
            type: "select",
            default: "sma",
            options: [
              { value: "sma", label: "Simple Moving Average (SMA)" },
              { value: "ema", label: "Exponential Moving Average (EMA)" },
              { value: "wma", label: "Weighted Moving Average (WMA)" },
              { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" },
              { value: "hma", label: "Hull Moving Average (HMA)" },
            ],
            description: "Select the indicator to cross with",
          },
          period: {
            name: "Period",
            type: "number",
            default: 50,
            min: 1,
            max: 500,
            step: 1,
            description: "Number of bars used in calculation",
          },
          source: {
            name: "Source",
            type: "select",
            default: "close",
            options: [
              { value: "close", label: "Close" },
              { value: "open", label: "Open" },
              { value: "high", label: "High" },
              { value: "low", label: "Low" },
            ],
            description: "Price data point to use in calculation",
          },
        },
      },
      {
        value: "crosses below",
        label: "Crosses Below another moving average",
        description: "When SMA crosses below another indicator",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "sma", label: "Simple Moving Average (SMA)" },
          { value: "ema", label: "Exponential Moving Average (EMA)" },
          { value: "wma", label: "Weighted Moving Average (WMA)" },
          { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" },
          { value: "hma", label: "Hull Moving Average (HMA)" },
        ],
        customInput: true,
        logicParams: {
          indicator: {
            name: "Indicator",
            type: "select",
            default: "sma",
            options: [
              { value: "sma", label: "Simple Moving Average (SMA)" },
              { value: "ema", label: "Exponential Moving Average (EMA)" },
              { value: "wma", label: "Weighted Moving Average (WMA)" },
              { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" },
              { value: "hma", label: "Hull Moving Average (HMA)" },
            ],
            description: "Select the indicator to cross with",
          },
          period: {
            name: "Period",
            type: "number",
            default: 50,
            min: 1,
            max: 500,
            step: 1,
            description: "Number of bars used in calculation",
          },
          source: {
            name: "Source",
            type: "select",
            default: "close",
            options: [
              { value: "close", label: "Close" },
              { value: "open", label: "Open" },
              { value: "high", label: "High" },
              { value: "low", label: "Low" },
            ],
            description: "Price data point to use in calculation",
          },
        },
      },
    ],
    defaultLogic: "crosses_above_price",
  },

  ema: {
    name: "Exponential Moving Average",
    description: "Weighted average that gives more importance to recent prices",
    category: "trend",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 20,
        min: 1,
        max: 500,
        step: 1,
        description: "Number of bars used in calculation",
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },
    },
    logicOptions: [
      {
        value: "> price",
        label: "Greater than Price",
        description: "When EMA crosses above the price",
        requiresValue: false,
      },
      {
        value: "< price",
        label: "Less than Price",
        description: "When EMA crosses below the price",
        requiresValue: false,
      },
      {
        value: "crosses above",
        label: "Crosses Above another moving average",
        description: "When EMA crosses above another indicator",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "sma", label: "Simple Moving Average (SMA)" },
          { value: "ema", label: "Exponential Moving Average (EMA)" },
          { value: "wma", label: "Weighted Moving Average (WMA)" },
          { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" },
          { value: "hma", label: "Hull Moving Average (HMA)" },
        ],
        customInput: true,
        logicParams: {
          indicator: {
            name: "Indicator",
            type: "select",
            default: "sma",
            options: [
              { value: "sma", label: "Simple Moving Average (SMA)" },
              { value: "ema", label: "Exponential Moving Average (EMA)" },
              { value: "wma", label: "Weighted Moving Average (WMA)" },
              { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" },
              { value: "hma", label: "Hull Moving Average (HMA)" },
            ],
            description: "Select the indicator to cross with",
          },
          period: {
            name: "Period",
            type: "number",
            default: 50,
            min: 1,
            max: 500,
            step: 1,
            description: "Number of bars used in calculation",
          },
          source: {
            name: "Source",
            type: "select",
            default: "close",
            options: [
              { value: "close", label: "Close" },
              { value: "open", label: "Open" },
              { value: "high", label: "High" },
              { value: "low", label: "Low" },
            ],
            description: "Price data point to use in calculation",
          },
        },
      },
      {
        value: "crosses below",
        label: "Crosses Below another moving average",
        description: "When EMA crosses below another indicator",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "sma", label: "Simple Moving Average (SMA)" },
          { value: "ema", label: "Exponential Moving Average (EMA)" },
          { value: "wma", label: "Weighted Moving Average (WMA)" },
          { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" },
          { value: "hma", label: "Hull Moving Average (HMA)" },
        ],
        customInput: true,
        logicParams: {
          indicator: {
            name: "Indicator",
            type: "select",
            default: "sma",
            options: [
              { value: "sma", label: "Simple Moving Average (SMA)" },
              { value: "ema", label: "Exponential Moving Average (EMA)" },
              { value: "wma", label: "Weighted Moving Average (WMA)" },
              { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" },
              { value: "hma", label: "Hull Moving Average (HMA)" },
            ],
            description: "Select the indicator to cross with",
          },
          period: {
            name: "Period",
            type: "number",
            default: 50,
            min: 1,
            max: 500,
            step: 1,
            description: "Number of bars used in calculation",
          },
          source: {
            name: "Source",
            type: "select",
            default: "close",
            options: [
              { value: "close", label: "Close" },
              { value: "open", label: "Open" },
              { value: "high", label: "High" },
              { value: "low", label: "Low" },
            ],
            description: "Price data point to use in calculation",
          },
        },
      },
    ],
    defaultLogic: "crosses_above_price",
  },

  wma: {
    name: "Weighted Moving Average",
    description: "Moving average that gives more weight to recent prices",
    category: "trend",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 9,
        min: 1,
        max: 500,
        step: 1,
        description: "Number of bars used in calculation",
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },
      
    }, logicOptions: [
     
      {
        value: "crosses_above_indicator",
        label: "Crosses Above Indicator",
        description: "When EMA crosses above another indicator",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "sma", label: "Simple Moving Average (SMA)" },
          { value: "ema", label: "Exponential Moving Average (EMA)" },
          { value: "wma", label: "Weighted Moving Average (WMA)" },
          { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" }
        ],
        customInput: true,
        syncKey: "crossover_indicator",
        logicParams: {
          indicator: {
            name: "Indicator",
            type: "select",
            default: "sma",
            options: [
              { value: "sma", label: "Simple Moving Average (SMA)" },
              { value: "ema", label: "Exponential Moving Average (EMA)" },
              { value: "wma", label: "Weighted Moving Average (WMA)" },
              { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" }
            ],
            description: "Select the indicator to cross with"
          },
          period: {
            name: "Period",
            type: "number",
            default: 20,
            min: 1,
            max: 500,
            step: 1,
            description: "Number of bars used in calculation"
          },
          source: {
            name: "Source",
            type: "select",
            default: "close",
            options: [
              { value: "close", label: "Close" },
              { value: "open", label: "Open" },
              { value: "high", label: "High" },
              { value: "low", label: "Low" },
            ],
            description: "Price data point to use in calculation",
          },
         
          
        }
      },
      {
        value: "crosses below",
        label: "Crosses Below another moving average",
        description: "When SMA crosses below another indicator",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "sma", label: "Simple Moving Average (SMA)" },
          { value: "ema", label: "Exponential Moving Average (EMA)" },
          { value: "wma", label: "Weighted Moving Average (WMA)" },
          { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" }
        ],
        customInput: true,
        syncKey: "crossover_indicator",
        logicParams: {
          indicator: {
            name: "Indicator",
            type: "select",
            default: "sma",
            options: [
              { value: "sma", label: "Simple Moving Average (SMA)" },
              { value: "ema", label: "Exponential Moving Average (EMA)" },
              { value: "wma", label: "Weighted Moving Average (WMA)" },
              { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" }
            ],
            description: "Select the indicator to cross with"
          },
          period: {
            name: "Period",
            type: "number",
            default: 20,
            min: 1,
            max: 500,
            step: 1,
            description: "Number of bars used in calculation"
          },
          source: {
            name: "Source",
            type: "select",
            default: "close",
            options: [
              { value: "close", label: "Close" },
              { value: "open", label: "Open" },
              { value: "high", label: "High" },
              { value: "low", label: "Low" },
            ],
            description: "Price data point to use in calculation",
          },
         
        }
      },
      {
        value: "price_above",
        label: "Price Above",
        description: "When price is above WMA",
        requiresValue: false
      },
      {
        value: "price_below",
        label: "Price Below",
        description: "When price is below WMA",
        requiresValue: false
      },
    ],
    
    defaultLogic: "crosses_above_price",
  },
  rsi: {
    name: "Relative Strength Index",
    description: "Momentum oscillator that measures the speed and change of price movements",
    category: "momentum",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 14,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",

      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },

    },
    logicOptions: [
      {
        value: "crosses_above",
        label: "Crosses Above",
        description: "When RSI crosses above the specified value (Trigger)",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        customInput: true,
        inputLabel: "RSI Value",
      },
      {
        value: "crosses_below",
        label: "Crosses Below",
        description: "When RSI crosses below the specified value(Trigger)",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        customInput: true,
        inputLabel: "RSI Value",
      },
      
      {
        value: "<",
        label: "Less Than",
        description: "When RSI is less than the specified value(Condition)",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        customInput: true,
        syncKey: "neutral_low",
        inputLabel: "RSI Value"
      },
      {
        value: ">",
        label: "Greater Than",
        description: "When RSI is greater than the specified value (Condition)",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        customInput: true,
        syncKey: "neutral_high",
        inputLabel: "RSI Value"
      },
      {
        value: "divergence_bearish",
        label: "Bearish Divergence",
        description: "When price makes higher highs but RSI makes lower highs",
        requiresValue: false,
      },
      {
        value: "divergence_bullish",
        label: "Bullish Divergence",
        description: "When price makes lower lows but RSI makes higher lows",
        requiresValue: false
      },
      
    ],
    defaultLogic: "crosses_above",
  },

  rvi: {
    name: "Relative Vigor Index",
    description: "Measures the conviction of a recent price action and the likelihood that it will continue.",
    category: "momentum",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 10,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",
      },
    },
    logicOptions: [
      {
        value: "crosses_above_signal",
        label: "Crosses Above Signal Line",
        description: "When RVI crosses above its signal line",
        requiresValue: false,
      },
      {
        value: "crosses_below_signal",
        label: "Crosses Below Signal Line",
        description: "When RVI crosses below its signal line",
        requiresValue: false,
      },
      {
        value: ">",
        label: "Greater Than ",
        description: "When RVI is greater than a specified value",
        requiresValue: true,
        valueType: "number",
        min: -1,
        max: 1,
        step: 0.01,
        defaultValue: 0,
        customInput: true,
        inputLabel: "RVI Value",
      },
      {
        value: "<",
        label: "Less Than ",
        description: "When RVI is less than a specified value",
        requiresValue: true,
        valueType: "number",
        min: -1,
        max: 1,
        step: 0.01,
        defaultValue: 0,
        customInput: true,
        inputLabel: "RVI Value",
      },
    ],
    defaultLogic: "crosses_above_signal",
  },

  williams_r: {
    name: "Williams %R",
    description: "Momentum oscillator that measures overbought and oversold levels.",
    category: "momentum",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 14,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },
    },
    logicOptions: [
      {
        value: "crosses_above",
        label: "Crosses Above",
        description: "When Williams %R crosses above a specified value",
        requiresValue: true,
        valueType: "number",
        min: -100,
        max: 100,
        step: 1,
        defaultValue: -20,
        customInput: false,
        inputLabel: "Williams %R Value",
      },
      {
        value: "crosses_below",
        label: "Crosses Below",
        description: "When Williams %R crosses below a specified value",
        requiresValue: true,
        valueType: "number",
        min: -100,
        max: 100,
        step: 1,
        defaultValue: -80,
        customInput: false,
        inputLabel: "Williams %R Value",
      },
      {
        value: "<",
        label: "Less Than",
        description: "When Williams %R is less than a specified value",
        requiresValue: true,
        valueType: "number",
        min: -100,
        max: 100,
        step: 1,
        defaultValue: -80,
        customInput: true,
        inputLabel: "Williams %R Value",
      },
      {
        value: ">",
        label: "Greater Than",
        description: "When Williams %R is greater than a specified value",
        requiresValue: true,
        valueType: "number",
        min: -100,
        max: 100,
        step: 1,
        defaultValue: -20,
        customInput: true,
        inputLabel: "Williams %R Value",
      },
    ],
    defaultLogic: "crosses_below",
  },

  momentum: {
    name: "Momentum",
    description: "Measures the rate of change of price over a specified period.",
    category: "momentum",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 10,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },
    },
    logicOptions: [
      {
        value: "crosses_above_zero",
        label: "Crosses Above Zero",
        description: "When Momentum crosses above zero",
        requiresValue: false,
      },
      {
        value: "crosses_below_zero",
        label: "Crosses Below Zero",
        description: "When Momentum crosses below zero",
        requiresValue: false,
      },
      {
        value: "crosses_above",
        label: "Crosses Above",
        description: "When Momentum crosses above a specified value",
        requiresValue: true,
        valueType: "number",
        min: -2,
        max: 2,
        step: 0.001,
        defaultValue: 0,
        customInput: true,
        inputLabel: "Momentum Value",
      },
      {
        value: "crosses_below",
        label: "Crosses Below",
        description: "When Momentum crosses below a specified value",
        requiresValue: true,
        valueType: "number",
        min: -2,
        max: 2,
        step: 0.001,
        defaultValue: 0,
        customInput: true,
        inputLabel: "Momentum Value",
      },
    ],
    defaultLogic: "crosses_above_zero",
  },

  roc: {
    name: "Rate of Change",
    description: "Momentum oscillator that measures the percentage change in price over a specified period.",
    category: "momentum",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 9,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },
    },
    logicOptions: [
      {
        value: "crosses_above_zero",
        label: "Crosses Above Zero",
        description: "When ROC crosses above zero",
        requiresValue: false,
      },
      {
        value: "crosses_below_zero",
        label: "Crosses Below Zero",
        description: "When ROC crosses below zero",
        requiresValue: false,
      },
      {
        value: "crosses_above",
        label: "Crosses Above",
        description: "When ROC crosses above a specified value",
        requiresValue: false,
        valueType: "number",
        min: -100,
        max: 100,
        step: 1,
        defaultValue: 0,
        customInput: true,
        inputLabel: "ROC Value",
      },
      {
        value: "crosses_below",
        label: "Crosses Below",
        description: "When ROC crosses below a specified value",
        requiresValue: true,
        valueType: "number",
        min: -100,
        max: 100,
        step: 1,
        defaultValue: 0,
        customInput: false,
        inputLabel: "ROC Value",
      },
      {
        value: ">",
        label: "Greater Than",
        description: "When ROC is greater than a specified value",
        requiresValue: true,
        valueType: "number",
        min: -100,
        max: 100,
        step: 1,
        defaultValue: 0,
        customInput: true,
        inputLabel: "ROC Value",
      },
      {
        value: "<",
        label: "Less Than",
        description: "When ROC is less than a specified value",
        requiresValue: true,
        valueType: "number",
        min: -100,
        max: 100,
        step: 1,
        defaultValue: 0,
        customInput: true,
        inputLabel: "ROC Value",
      },
    ],
    defaultLogic: "crosses_above_zero",
  },

  cmf: {
    name: "Chaikin Money Flow",
    description: "Volume-weighted average of accumulation/distribution over a specified period.",
    category: "volume",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 20,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",
      },
    },
    logicOptions: [
      {
        value: "crosses_above_zero",
        label: "Crosses Above Zero",
        description: "When CMF crosses above zero (bullish)",
        requiresValue: false,
      },
      {
        value: "crosses_below_zero",
        label: "Crosses Below Zero",
        description: "When CMF crosses below zero (bearish)",
        requiresValue: false,
      },
      {
        value: "crosses_above",
        label: "Crosses Above",
        description: "When CMF crosses above a specified value",
        requiresValue: true,
        valueType: "number",
        min: -100,
        max: 100,
        step: 1,
        defaultValue: 20,
        customInput: false,
        inputLabel: "CMF Value",
      },
      {
        value: "crosses_below",
        label: "Crosses Below",
        description: "When CMF crosses below a specified value",
        requiresValue: true,
        valueType: "number",
        min: -100,
        max: 100,
        step: 1,
        defaultValue: -20,
        customInput:false,
        inputLabel: "CMF Value",
      },
      {
        value: ">",
        label: "Greater Than",
        description: "When CMF is greater than a specified value",
        requiresValue: true,
        valueType: "number",
        min: -100,
        max: 100,
        step: 1,
        defaultValue: 20,
        customInput: true,
        inputLabel: "CMF Value",
      },
      {
        value: "<",
        label: "Less Than",
        description: "When CMF is less than a specified value",
        requiresValue: true,
        valueType: "number",
        min: -100,
        max: 100,
        step: 1,
        defaultValue: -20,
        customInput: true,
        inputLabel: "CMF Value",
      },
    ],
    defaultLogic: "crosses_above_zero",
  },

  // Keep all other indicators as they were...
  macd: {
    name: "MACD",
    description: "Trend-following momentum indicator showing relationship between two moving averages",
    category: "momentum",
    parameters: {
      fastPeriod: {
        name: "Fast Period",
        type: "number",
        default: 12,
        min: 1,
        max: 100,
        step: 1,
        description: "Period for the faster EMA",
      },
      
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },
      slowPeriod: {
        name: "Slow Period",
        type: "number",
        default: 26,
        min: 1,
        max: 100,
        step: 1,
        description: "Period for the slower EMA",
      },
      signalPeriod: {
        name: "Signal Period",
        type: "number",
        default: 9,
        min: 1,
        max: 100,
        step: 1,
        description: "Period for the signal line",
      },
      signal_smoothing: {
        name: "Signal Smoothing",
        type: "number",
        default: 9,
        min: 1,
        max: 100,
        step: 1,
        description: "Smoothing period for the signal line",
      },
      oscilator_ma_type: {
        name: "Oscillator MA Type",
        type: "select",
        default: "sma",
        options: [
          { value: "sma", label: "Simple" },
          { value: "ema", label: "Exponential" },
          { value: "wma", label: "Weighted" },
        ],
        description: "Type of moving average to use for the MACD line",
      },
      signal_ma_type: {
        name: "Signal MA Type",
        type: "select",
        default: "sma",
        options: [
          { value: "sma", label: "Simple" },
          { value: "ema", label: "Exponential" },
          { value: "wma", label: "Weighted" },
        ],
        description: "Type of moving average to use for the signal line",
      },
    },
    components: ["line", "signal", "histogram"],
    defaultComponent: "line",
    logicOptions: [
      {
        value: "crosses_above_signal",
        label: "Crosses Above Signal",
        description: "When MACD line crosses above the signal line (bullish)",
        requiresValue: false,
      },
      {
        value: "crosses_below_signal",
        label: "Crosses Below Signal",
        description: "When MACD line crosses below the signal line (bearish)",
        requiresValue: false,
      },
      {
        value: "crosses_above_zero",
        label: "Crosses Above Zero",
        description: "When MACD line crosses above zero (bullish)",
        requiresValue: false,
      },
      {
        value: "crosses_below_zero",
        label: "Crosses Below Zero",
        description: "When MACD line crosses below zero (bearish)",
        requiresValue: false,
      },
      {
        value: "histogram_positive",
        label: "Histogram Positive",
        description: "When MACD histogram is positive",
        requiresValue: false,
      },
      {
        value: "histogram_negative",
        label: "Histogram Negative",
        description: "When MACD histogram is negative",
        requiresValue: false,
      },
      {
        value: "histogram_increasing",
        label: "Histogram Increasing",
        description: "When MACD histogram is increasing",
        requiresValue: false,
      },
      {
        value: "histogram_decreasing",
        label: "Histogram Decreasing",
        description: "When MACD histogram is decreasing",
        requiresValue: false,
      },
      {
        value: "divergence_bullish",
        label: "Bullish Divergence",
        description: "When price makes lower lows but MACD makes higher lows",
        requiresValue: false,
      },
      {
        value: "divergence_bearish",
        label: "Bearish Divergence",
        description: "When price makes higher highs but MACD makes lower highs",
        requiresValue: false,
      },
    ],
    defaultLogic: "crosses_above_signal",
  },

  bollinger: {
    name: "Bollinger Bands",
    description: "Volatility bands placed above and below a moving average",
    category: "volatility",
    parameters: {
      period: {
        name: "Length",
        type: "number",
        default: 20,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",
      },
      stdDev: {
        name: "Standard Deviation",
        type: "number",
        default: 2,
        min: 0.1,
        max: 5,
        step: 0.1,
        description: "Number of standard deviations for the bands",
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },
    
     maType: {
    name: "MA Type",
       type: "select",
     default: "sma",
      options: [
         { value: "sma", label: "Simple" },
        { value: "ema", label: "Exponential" },
         { value: "wma", label: "Weighted" },
      ],
       description: "Type of moving average to use",
     },
     },
  
  
     
    defaultComponent: "middle",
    logicOptions: [
      {
        value: "price_above_upper",
        label: "Price Above Upper",
        description: "When price is above the upper band",
        requiresValue: false,
      },
      {
        value: "price_below_lower",
        label: "Price Below Lower",
        description: "When price is below the lower band",
        requiresValue: false,
      },
      {
        value: "price_crosses_above_middle",
        label: "Price Crosses Above Middle",
        description: "When price crosses above the middle band",
        requiresValue: false,
      },
      {
        value: "price_crosses_below_middle",
        label: "Price Crosses Below Middle",
        description: "When price crosses below the middle band",
        requiresValue: false,
      },
      {
        value: "bands_squeeze",
        label: "Bands Squeeze",
        description: "When the bands are narrowing (low volatility)",
        requiresValue: false,
      },
      {
        value: "bands_expand",
        label: "Bands Expand",
        description: "When the bands are widening (high volatility)",
        requiresValue: false,
      },
      {
        value: "price_touches_upper",
        label: "Price Touches Upper",
        description: "When price touches the upper band",
        requiresValue: false,
      },
      {
        value: "price_touches_lower",
        label: "Price Touches Lower",
        description: "When price touches the lower band",
        requiresValue: false,
      },
    ],
    defaultLogic: "price_crosses_above_upper",
  },

  stochastic: {
    name: "Stochastic Oscillator",
    description: "Momentum indicator comparing closing price to price range over time",
    category: "momentum",
    parameters: {
      kPeriod: {
        name: "%K Length",
        type: "number",
        default: 14,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars for %K calculation",
      },
      K_smoothing: {
        name: "%K Smoothing",
        type: "number",
        default: 1,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars for %D calculation",
      },
      d_smoothing: {
        name: "%D smoothing",
        type: "number",
        default: 3,
        min: 1,
        max: 100,
        step: 1,
        description: "Slowing period",
      },
    },
    logicOptions: [
      {
        value: "crosses_above",
        label: "Crosses Above",
        description: "When %K crosses above",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        customInput: false,
        inputLabel: "Stochastic Value",
      },
      {
        value: "crosses_below",
        label: "Crosses Below",
        description: "When %K crosses below",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
        customInput: false,
        inputLabel: "Stochastic Value",
      },
      {
        value: "k_crosses_above_d",
        label: "%K Crosses Above %D",
        description: "When %K crosses above %D (bullish)",
        requiresValue: false,
      },
      {
        value: "k_crosses_below_d",
        label: "%K Crosses Below %D",
        description: "When %K crosses below %D (bearish)",
        requiresValue: false,
      },
      {
        value: "divergence_bullish",
        label: "Bullish Divergence",
        description: "When price makes lower lows but Stochastic makes higher lows",
        requiresValue: false,
      },
      {
        value: "divergence_bearish",
        label: "Bearish Divergence",
        description: "When price makes higher highs but Stochastic makes lower highs",
        requiresValue: false,
      },
    ],
    defaultLogic: "crosses_below",
  },

  adx: {
    name: "Average Directional Index",
    description: "Trend strength indicator",
    category: "trend",
    parameters: {
      period: {
        name: "DI Length",
        type: "number",
        default: 14,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",
      },
      smoothing: {
        name: "ADX Smoothing",
        type: "number",
        default: 14,
        min: 1,
        max: 100,
        step: 1,
        description: "Smoothing period for DI calculations",
      },
    },
    logicOptions: [
      {
        value: "crosses_above",
        label: "Crosses Above",
        description: "When ADX crosses above the specified value",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 25,
        customInput: false,
        inputLabel: "ADX Value",
      },
      {
        value: "crosses_below",
        label: "Crosses Below",
        description: "When ADX crosses below the specified value",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 25,
        customInput: false,
        syncKey: "trend_strength"
      },
        {
          value: "<",
          label: "Less Than",
          description: "When ADX is less than the specified value",
          requiresValue: true,
          valueType: "number",
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 25,
          customInput: true,
        },
        {
          value: ">",
          label: "Greater Than",
          description: "When ADX is greater than the specified value",
          requiresValue: true,
          valueType: "number",
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 25,
          customInput: true,
        },
      {
        value: "di_plus_crosses_above_di_minus",
        label: "+DI Crosses Above -DI",
        description: "When +DI crosses above -DI (bullish)",
        requiresValue: false
      },
      {
        value: "di_plus_crosses_below_di_minus",
        label: "+DI Crosses Below -DI",
        description: "When +DI crosses below -DI (bearish)",
        requiresValue: false
      },

    ],
    defaultLogic: "crosses_above",
  },

  volume: {
    name: "Volume",
    description: "Trading volume indicator",
    category: "volume",
    parameters: {
      maType: {
        name: "MA Type",
        type: "select",
        default: "sma",
        options: [
          { value: "sma", label: "Simple" },
          { value: "ema", label: "Exponential" },
          { value: "wma", label: "Weighted" },
          { value: "vwma", label: "Volume Weighted" },
        ],
        description: "Type of moving average to use",
      },
      MA_length: {
        name: "MA Length",
        type: "number",
        default: 20,
        min: 1,
        max: 100,
        step: 1,
        description: "Length of the moving average",
      },
    },
    logicOptions: [
      {
        value: "above_average",
        label: "Above Average",
        description: "When volume is above its moving average",
        requiresValue: true
      },
      {
        value: "below_average",
        label: "Below Average",
        description: "When volume is below its moving average",
        requiresValue: true
      },
    ],
    defaultLogic: "above_average",
  },

  ichimoku: {
    name: "Ichimoku Cloud",
    description: "Multiple component indicator for identifying trend direction and support/resistance levels",
    category: "trend",
    parameters: {
      ConversionLinePeriod: {
        name: "Conversion Line Period",
        type: "number",
        default: 9,
        min: 1,
        max: 100,
        step: 1,
        description: "Period for the Tenkan-sen line",
      },
      BaseLinePeriod: {
        name: "Base Line Period",
        type: "number",
        default: 26,
        min: 1,
        max: 100,
        step: 1,
        description: "Period for the Kijun-sen line",
      },
      LeadingSpanBPeriod: {
        name: "Leading Span B Period",
        type: "number",
        default: 52,
        min: 1,
        max: 100,
        step: 1,
        description: "Period for the Senkou Span B line",
      },
      LaggingSpanPeriod: {
        name: "Lagging Span Period",
        type: "number",
        default: 26,
        min: 1,
        max: 100,
        step: 1,
        description: "Period for the Chikou Span line",
      },
    },
    components: ["tenkan", "kijun", "senkou_a", "senkou_b", "chikou"],
    defaultComponent: "tenkan",
    logicOptions: [
      {
        value: "price_above_cloud",
        label: "Price Above Cloud",
        description: "When price is above the cloud (bullish)",
        requiresValue: false,
      },
      {
        value: "price_below_cloud",
        label: "Price Below Cloud",
        description: "When price is below the cloud (bearish)",
        requiresValue: false,
      },
      {
        value: "price_in_cloud",
        label: "Price In Cloud",
        description: "When price is inside the cloud (neutral)",
        requiresValue: false,
      },
      {
        value: "tenkan_kijun_cross_bullish",
        label: "Tenkan-Kijun Bullish Cross",
        description: "When Tenkan-sen crosses above Kijun-sen",
        requiresValue: false,
      },
      {
        value: "tenkan_kijun_cross_bearish",
        label: "Tenkan-Kijun Bearish Cross",
        description: "When Tenkan-sen crosses below Kijun-sen",
        requiresValue: false,
      },
      {
        value: "chikou_price_cross_bullish",
        label: "Chikou-Price Bullish Cross",
        description: "When Chikou Span crosses above price",
        requiresValue: false,
      },
      {
        value: "chikou_price_cross_bearish",
        label: "Chikou-Price Bearish Cross",
        description: "When Chikou Span crosses below price",
        requiresValue: false,
      },
      {
        value: "cloud_color_change_bullish",
        label: "Cloud Color Change Bullish",
        description: "When cloud changes from red to green",
        requiresValue: false,
      },
      {
        value: "cloud_color_change_bearish",
        label: "Cloud Color Change Bearish",
        description: "When cloud changes from green to red",
        requiresValue: false,
      },
    ],
    defaultLogic: "price_above_cloud",
  },

  supertrend: {
    name: "SuperTrend",
    description: "Trend following indicator that adapts to volatility",
    category: "trend",
    parameters: {
      atr_length: {
        name: "ATR Length",
        type: "number",
        default: 10,
        min: 1,
        max: 100,
        step: 1,
        description: "Length of the ATR calculation",
      },
      Factor: {
        name: "Factor",
        type: "number",
        default: 3,
        min: 1,
        max: 10,
        step: 0.1,
        description: "Factor for the ATR to determine the bands",
      },
    },
    logicOptions: [
      {
        value: "< price",
        label: "Greater than Price",
        description: "When price is above SuperTrend (bullish)",
        requiresValue: false,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 25,
        customInput: true,
      },
      {
        value: "> price",
        label: "Less than Price",
        description: "When price is below SuperTrend (bearish)",
        requiresValue: false,
          valueType: "number",
          min: 0,
          max: 100,
          step: 1,
          defaultValue: 25,
          customInput: true,
      },
      {
        value: "trend_change_bullish",
        label: "Trend Change Bullish",
        description: "When SuperTrend changes from bearish to bullish",
        requiresValue: false,
      },
      {
        value: "trend_change_bearish",
        label: "Trend Change Bearish",
        description: "When SuperTrend changes from bullish to bearish",
        requiresValue: false,
      },
      {
        value: "divergence_bullish",
        label: "Bullish Divergence",
        description: "When price makes lower lows but SuperTrend makes higher lows",
        requiresValue: false,
      },
      {
        value: "divergence_bearish",
        label: "Bearish Divergence",
        description: "When price makes higher highs but SuperTrend makes lower highs",
        requiresValue: false,
      },
    ],
    defaultLogic: "crosses_below_price",
  },
    vwma: {
    name: "Volume Weighted Moving Average",
    description: "Moving average weighted by volume",
    category: "volume",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 20,
        min: 1,
        max: 500,
        step: 1,
        description: "Number of bars used in calculation",
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },
    },
    logicOptions: [
      {
        value: "crosses_above_price",
        label: "Crosses Above Price",
        description: "When VWMA crosses above price",
        requiresValue: false
      },
      {
        value: "crosses_below_price",
        label: "Crosses Below Price",
        description: "When VWMA crosses below price",
        requiresValue: false
      },
      {
        value: "crosses_above_indicator",
        label: "Crosses Above Indicator",
        description: "When VWMA crosses above another indicator",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "sma", label: "Simple Moving Average (SMA)" },
          { value: "ema", label: "Exponential Moving Average (EMA)" },
          { value: "wma", label: "Weighted Moving Average (WMA)" },
          { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" }
        ],
        customInput: true,
        syncKey: "crossover_indicator",
        logicParams: {
          indicator: {
            name: "Indicator",
            type: "select",
            default: "sma",
            options: [
              { value: "sma", label: "Simple Moving Average (SMA)" },
              { value: "ema", label: "Exponential Moving Average (EMA)" },
              { value: "wma", label: "Weighted Moving Average (WMA)" },
              { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" }
            ],
            description: "Select the indicator to cross with"
          },
          period: {
            name: "Period",
            type: "number",
            default: 20,
            min: 1,
            max: 500,
            step: 1,
            description: "Number of bars used in calculation"
          }
        }
      },
      {
        value: "crosses_below_indicator",
        label: "Crosses Below Indicator",
        description: "When VWMA crosses below another indicator",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "sma", label: "Simple Moving Average (SMA)" },
          { value: "ema", label: "Exponential Moving Average (EMA)" },
          { value: "wma", label: "Weighted Moving Average (WMA)" },
          { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" }
        ],
        customInput: true,
        syncKey: "crossover_indicator",
        logicParams: {
          indicator: {
            name: "Indicator",
            type: "select",
            default: "sma",
            options: [
              { value: "sma", label: "Simple Moving Average (SMA)" },
              { value: "ema", label: "Exponential Moving Average (EMA)" },
              { value: "wma", label: "Weighted Moving Average (WMA)" },
              { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" }
            ],
            description: "Select the indicator to cross with"
          },
          period: {
            name: "Period",
            type: "number",
            default: 20,
            min: 1,
            max: 500,
            step: 1,
            description: "Number of bars used in calculation"
          }
        }
      },
    ],
    defaultLogic: "crosses_above_price",
  },

  cci: {
    name: "Commodity Channel Index",
    description: "Momentum oscillator that measures current price level relative to an average price level.",
    category: "momentum",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 20,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",
      },
      source: {
        name: "Source",
        type: "select",
        default: "hlc3",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
          { value: "hl2", label: "HL2" },
          { value: "hlc3", label: "HLC3" },
          { value: "ohlc4", label: "OHLC4" },
        ],
        description: "Price data point to use in calculation",
      },
    },
    logicOptions: [
      {
        value: "<",
        label: "Less Than",
        description: "When MFI is less than a specified value",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 20,
        customInput: true,
        inputLabel: "MFI Value",
      },
      {
        value: ">",
        label: "Greater Than",
        description: "When MFI is greater than a specified value",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 80,
        customInput: true,
        syncKey: "cci_value"
      },
    ],
    defaultLogic: "crosses_above",
  },

  mfi: {
    name: "Money Flow Index",
    description: "Volume-weighted RSI that measures buying and selling pressure.",
    category: "volume",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 14,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",
      }
    },
    logicOptions: [
      {
        value: "<",
        label: "Less Than",
        description: "When MFI is less than a specified value",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 80,
        customInput: true,
        syncKey: "mfi_value"
      },
      {
        value: ">",
        label: "Greater Than",
        description: "When MFI crosses below a specified value",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 20,
        customInput: true,
        syncKey: "mfi_value"
      },
      {
        value: "crosses_above",
        label: "Crosses Above",
        description: "When MFI crosses above a specified value",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 80,
        customInput: false,
        inputLabel: "MFI Value",
      },
      {
        value: "crosses_below",
        label: "Crosses Below",
        description: "When MFI crosses below a specified value",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 20,
        customInput: false,
        syncKey: "mfi_value"
      }
    ],
    defaultLogic: "crosses_below",
  },

  orb: {
    name: "Opening Range Breakout",
    description: "Trade breakouts of the opening range defined by a custom time window.",
    category: "custom",
    parameters: {
      rangeStartTime: {
        name: "Range Start Time",
        type: "timeframe",
        default: "09:15",
        description: "Start time of the opening range (e.g., 09:15)",
        required: true,
      },
      rangeEndTime: {
        name: "Range End Time",
        type: "timeframe",
        default: "09:30",
        description: "End time of the opening range (e.g., 09:30)",
        required: true,
      },
      confirmationType: {
        name: "Confirmation Type",
        type: "select",
        default: "breakout",
        options: [
          { value: "breakout", label: "Breakout" },
          { value: "close_above", label: "Close Above" },
          { value: "candle_body_break", label: "Candle Body Break" },
        ],
        description: "How to confirm the breakout.",
        required: true,
      },
      requireRetest: {
        name: "Require Retest After Breakout",
        type: "boolean",
        default: false,
        description: "Whether to require a retest of the breakout level before entering",
      },
      retestType: {
        name: "Retest Type",
        type: "select",
        default: "touch",
        options: [
          { value: "touch", label: "Touch" },
          { value: "close_to", label: "Close To" },
          { value: "candle_wick", label: "Candle Wick" },
        ],
        description: "Define how exact the retest should be",
        showIf: (values) => values.requireRetest === true,
      },
      retestTolerance: {
        name: "Retest Tolerance (%)",
        type: "number",
        default: 0.1,
        min: 0.01,
        max: 5,
        step: 0.01,
        description: "How close price must get to ORB High/Low",
        showIf: (values) => values.requireRetest === true,
      },
      retestTimeWindow: {
        name: "Retest Time Window (min)",
        type: "number",
        default: 10,
        min: 1,
        max: 120,
        step: 1,
        description: "Max time after breakout to look for retest",
        showIf: (values) => values.requireRetest === true,
      },
      retestConfirmation: {
        name: "Retest Confirmation",
        type: "select",
        default: "none",
        options: [
          { value: "none", label: "None" },
          { value: "bounce", label: "Bounce" },
          { value: "candle_close_above", label: "Candle Close Above" },
          { value: "volume_spike", label: "Volume Spike" },
        ],
        description: "Optional validation for the retest",
        showIf: (values) => values.requireRetest === true,
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "orb_high", label: "ORB High" },
          { value: "orb_low", label: "ORB Low" },
        ],
        description: "Data source for ORB logic (e.g. ORB High, ORB Low)",
        required: false,
      },
    },
    logicOptions: [
      {
        value: "crosses_above",
        label: "Crosses Above",
        description: "When price crosses above the ORB High",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "orb_high", label: "ORB High" },
          { value: "orb_low", label: "ORB Low" },
        ],
        customInput: false,
        inputLabel: "ORB Level",
      },
      {
        value: "crosses_below",
        label: "Crosses Below",
        description: "When price crosses below the ORB Low",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "orb_high", label: "ORB High" },
          { value: "orb_low", label: "ORB Low" },
        ],
        customInput: false,
        inputLabel: "ORB Level",
      },
      {
        value: "greater_than",
        label: "Greater Than",
        description: "When price is greater than the ORB High",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "orb_high", label: "ORB High" },
          { value: "orb_low", label: "ORB Low" },
        ],
        customInput: true,
        inputLabel: "ORB Level",
      },
      {
        value: "less_than",
        label: "Less Than",
        description: "When price is less than the ORB Low",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "orb_high", label: "ORB High" },
          { value: "orb_low", label: "ORB Low" },
        ],
        customInput: true,
        inputLabel: "ORB Level",
      },
      {
        value: "closes_above",
        label: "Closes Above",
        description: "When candle closes above the ORB High",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "orb_high", label: "ORB High" },
          { value: "orb_low", label: "ORB Low" },
        ],
        customInput: true,
        inputLabel: "ORB Level",
      },
      {
        value: "touches",
        label: "Touches",
        description: "When price touches the ORB High or Low",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "orb_high", label: "ORB High" },
          { value: "orb_low", label: "ORB Low" },
        ],
        customInput: true,
        inputLabel: "ORB Level",
      },
    ],
    defaultLogic: "crosses_above",
  },

  hma: {
    name: "Hull Moving Average",
    description: "A fast and smooth moving average that reduces lag.",
    category: "trend",
    parameters: {
      period: {
        name: "Length",
        type: "number",
        default: 20,
        min: 1,
        max: 500,
        step: 1,
        description: "Number of bars used in calculation",
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
          { value: "hl2", label: "HL2" },
          { value: "hlc3", label: "HLC3" },
          { value: "ohlc4", label: "OHLC4" },
        ],
        description: "Price data point to use in calculation",
      },
    },
    logicOptions: [
      {
        value: "crosses_above_price",
        label: "Crosses Above Price",
        description: "When HMA crosses above the price",
        requiresValue: false
      },
      {
        value: "crosses_below_price",
        label: "Crosses Below Price",
        description: "When HMA crosses below the price",
        requiresValue: false
      },
      {
        value: "crosses_above_indicator",
        label: "Crosses Above Indicator",
        description: "When HMA crosses above another indicator",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "sma", label: "Simple Moving Average (SMA)" },
          { value: "ema", label: "Exponential Moving Average (EMA)" },
          { value: "wma", label: "Weighted Moving Average (WMA)" },
          { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" },
          { value: "hma", label: "Hull Moving Average (HMA)" }
        ],
        customInput: true,
        syncKey: "crossover_indicator",
        logicParams: {
          indicator: {
            name: "Indicator",
            type: "select",
            default: "sma",
            options: [
              { value: "sma", label: "Simple Moving Average (SMA)" },
              { value: "ema", label: "Exponential Moving Average (EMA)" },
              { value: "wma", label: "Weighted Moving Average (WMA)" },
              { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" },
              { value: "hma", label: "Hull Moving Average (HMA)" }
            ],
            description: "Select the indicator to cross with"
          },
          period: {
            name: "Period",
            type: "number",
            default: 20,
            min: 1,
            max: 500,
            step: 1,
            description: "Number of bars used in calculation"
          },
        }
      },
      {
        value: "crosses_below_indicator",
        label: "Crosses Below Indicator",
        description: "When HMA crosses below another indicator",
        requiresValue: true,
        valueType: "select",
        options: [
          { value: "sma", label: "Simple Moving Average (SMA)" },
          { value: "ema", label: "Exponential Moving Average (EMA)" },
          { value: "wma", label: "Weighted Moving Average (WMA)" },
          { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" },
          { value: "hma", label: "Hull Moving Average (HMA)" }
        ],
        customInput: true,
        syncKey: "crossover_indicator",
        logicParams: {
          indicator: {
            name: "Indicator",
            type: "select",
            default: "sma",
            options: [
              { value: "sma", label: "Simple Moving Average (SMA)" },
              { value: "ema", label: "Exponential Moving Average (EMA)" },
              { value: "wma", label: "Weighted Moving Average (WMA)" },
              { value: "vwma", label: "Volume Weighted Moving Average (VWMA)" },
              { value: "hma", label: "Hull Moving Average (HMA)" }
            ],
            description: "Select the indicator to cross with"
          },
          period: {
            name: "Period",
            type: "number",
            default: 20,
            min: 1,
            max: 500,
            step: 1,
            description: "Number of bars used in calculation"
          },
        }
      },
    ],
    defaultLogic: "crosses_above_price",
  },
 
  keltner: {
    name: "Keltner Channel",
    description: "Volatility-based envelope set above and below an EMA.",
    category: "volatility",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 20,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars for EMA calculation",
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },
      multiplier: {
        name: "Multiplier",
        type: "number",
        default: 2,
        min: 0.1,
        max: 10,
        step: 0.1,
        description: "Multiplier for ATR to set channel width",
      },
    },
    logicOptions: [
      {
        value: "close_crosses_above_upper",
        label: "Close Crosses Above Upper Band",
        description: "When price closes above the upper Keltner band",
        requiresValue: false,
      },
      {
        value: "close_crosses_below_lower",
        label: "Close Crosses Below Lower Band",
        description: "When price closes below the lower Keltner band",
        requiresValue: false,
      },
      {
        value: "inside_channel",
        label: "Price Inside Channel",
        description: "When price is inside the Keltner channel",
        requiresValue: false,
      },
    ],
    defaultLogic: "close_crosses_above_upper",
  },

  choppiness: {
    name: "Choppiness Index",
    description: "Quantifies whether the market is trending or ranging.",
    category: "volatility",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 14,
        min: 2,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",
      },
    },
    logicOptions: [
      {
        value: "greater_than_value",
        label: "Greater Than Value",
        description: "When Choppiness Index is above a threshold",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        customInput: true,
      },
      {
        value: "less_than_value",
        label: "Less Than Value",
        description: "When Choppiness Index is below a threshold",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        customInput: true,
      }
    ],
    defaultLogic: "greater_than_value",
  },

  atr: {
    name: "Average True Range",
    description: "Measures market volatility by decomposing the entire range of an asset price for that period.",
    category: "volatility",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 14,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },

    },
    logicOptions: [
      {
        value: "crosses_above",
        label: "Crosses Above",
        description: "When ATR crosses above a specified value",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 2,
        customInput: false,
        inputLabel: "ATR Value",
      },
      {
        value: "crosses_below",
        label: "Crosses Below",
        description: "When ATR crosses below a specified value",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 1,
        customInput: false,
        syncKey: "atr_value"
      },
      {
        value: ">",
        label: "Greater Than",
        description: "When ATR is greater than a specified value",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 2,
        customInput: true,
      },
      {
        value: "<",
        label: "Less Than",
        description: "When ATR is less than a specified value",
        requiresValue: true,
        valueType: "number",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 1,
        customInput: true,
      }
    ],
    defaultLogic: "crosses_above",
  },

  parabolic_sar: {
    name: "Parabolic SAR",
    description: "Trend-following indicator that identifies potential reversals in price direction.",
    category: "trend",
    parameters: {
      start: {
        name: "Start",
        type: "number",
        default: 0.02,
        min: 0.01,
        max: 20,
        step: 0.01,
        description: "Acceleration factor",
      },
      increment: {
        name: "Increment",
        type: "number",
        default: 0.02,
        min: 0.01,
        max: 20,
        step: 0.01,
        description: "Increment for acceleration factor",
      },
      maximum: {
        name: "Maximum",
        type: "number",
        default: 0.2,
        min: 0.1,
        max: 20,
        step: 0.01,
        description: "Maximum acceleration factor",
      },
    },
    logicOptions: [
      {
        value: "crosses_above_price",
        label: "Crosses Above Price",
        description: "When SAR crosses above price (bearish)",
        requiresValue: false,
      },
      {
        value: "crosses_below_price",
        label: "Crosses Below Price",
        description: "When SAR crosses below price (bullish)",
        requiresValue: false,
      },
      {
        value: "trend_change_bullish",
        label: "Trend Change Bullish",
        description: "When SAR changes from bearish to bullish",
        requiresValue: false,
      },
      {
        value: "trend_change_bearish",
        label: "Trend Change Bearish",
        description: "When SAR changes from bullish to bearish",
       
        requiresValue: false
      }
    ],
    defaultLogic: "crosses_below_price",
  },

  bbp: {
    name: "Bollinger Bands %B",
    description: "Measures where price is relative to Bollinger Bands.",
    category: "volatility",
    parameters: {
      period: {
        name: "Period",
        type: "number",
        default: 20,
        min: 1,
        max: 100,
        step: 1,
        description: "Number of bars used in calculation",
      },
      source: {
        name: "Source",
        type: "select",
        default: "close",
        options: [
          { value: "close", label: "Close" },
          { value: "open", label: "Open" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ],
        description: "Price data point to use in calculation",
      },
      stdev: {
        name: "Standard Deviations",
        type: "number",
        default: 2,
        min: 1,
        max: 20,
        step: 1,
        description: "Number of standard deviations to use in calculation",

      }
    },
    logicOptions: [
      {
        value: "crosses_above_zero",
        label: "Crosses Above Zero",
        description: "When Momentum crosses above zero",
        requiresValue: false
      },
      {
        value: "crosses_below_zero",
        label: "Crosses Below Zero",
        description: "When Momentum crosses below zero",
        requiresValue: false
      },
      {
        value: "crosses_above",
        label: "Crosses Above",
        description: "When Momentum crosses above a specified value",
        requiresValue: true,
        valueType: "number",
        min: -5000,
        max: 5000,
        step: 1,
        defaultValue: 0,
        customInput: false,
        syncKey: "momentum_value"
      },
      {
        value: "crosses_below",
        label: "Crosses Below",
        description: "When Momentum crosses below a specified value",
        requiresValue: true,
        valueType: "number",
        min: -5000,
        max: 5000,
        step: 1,
        defaultValue: 0,
        customInput: false,
        syncKey: "momentum_value"
      }
    ],
    defaultLogic: "crosses_above_zero",
  },
  }
export default indicatorMetadata
