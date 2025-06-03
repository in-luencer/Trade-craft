
"use client"

import { useState, useEffect } from "react"
import { Trash2, Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

import type { IndicatorCondition } from "./strategy-builder"
import indicatorMetadata from "./indicator-metadata"

interface IndicatorLogicEngineProps {
  condition: IndicatorCondition
  onChange: (updatedCondition: IndicatorCondition) => void
  onRemove: () => void
}

export default function IndicatorLogicEngine({ condition, onChange, onRemove }: IndicatorLogicEngineProps) {
  const indicator = indicatorMetadata[condition.indicator]
  const selectedLogic = indicator?.logicOptions.find((opt) => opt.value === condition.logic)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize parameter values and condition.value from metadata defaults - FIXED
  useEffect(() => {
    if (indicator && !isInitialized) {
      const initialValues: Record<string, any> = {}
      Object.entries(indicator.parameters).forEach(([key, param]) => {
        initialValues[key] = condition.params?.[key] ?? param.default
      })

      onChange({
        ...condition,
        params: initialValues,
        value:
          condition.value ||
          indicator.logicOptions.find((opt) => opt.value === condition.logic)?.defaultValue?.toString() ||
          "0",
      })

      setIsInitialized(true)
    }
  }, [condition.indicator, isInitialized]) // Fixed dependencies

  // Reset initialization when indicator changes
  useEffect(() => {
    setIsInitialized(false)
  }, [condition.indicator])

  const handleIndicatorChange = (value: string) => {
    const newIndicator = indicatorMetadata[value]
    if (newIndicator) {
      const initialParams = Object.entries(newIndicator.parameters).reduce(
        (acc: Record<string, any>, [key, param]) => ({
          ...acc,
          [key]: param.default,
        }),
        {},
      )

      onChange({
        ...condition,
        indicator: value,
        logic: newIndicator.defaultLogic || newIndicator.logicOptions[0].value,
        value: newIndicator.logicOptions[0]?.defaultValue?.toString() || "0",
        params: initialParams,
      })
      setIsInitialized(false) // Reset initialization for new indicator
    }
  }

  const handleLogicChange = (value: string) => {
    const newLogic = indicator?.logicOptions.find((opt) => opt.value === value)
    onChange({
      ...condition,
      logic: value,
      value: condition.value || newLogic?.defaultValue?.toString() || "0",
    })
  }

  const handleValueChange = (value: string) => {
    const numericValue = Number(value)
    if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
      onChange({
        ...condition,
        value: numericValue.toString(),
      })
    }
  }

  const handleParamChange = (paramName: string, value: any) => {
    const updatedParams = {
      ...condition.params,
      [paramName]: value,
    }
    onChange({
      ...condition,
      params: updatedParams,
    })
  }

  const handleLogicParamChange = (paramName: string, value: any) => {
    console.log("Logic param change:", paramName, value)

    const updatedParams = {
      ...condition.params,
      [paramName]: value,
      // If setting secondary indicator, ensure default period
      ...(paramName === "indicator" && !condition.params?.crossPeriod
        ? { crossPeriod: indicatorMetadata[value]?.parameters?.period?.default || 50 }
        : {}),
    }

    onChange({
      ...condition,
      params: updatedParams,
    })
  }

  if (!indicator) return null

  // Separate standard and advanced parameters
  const standardParams = Object.entries(indicator.parameters).filter(([_, param]) => !param.advanced)
  const advancedParams = Object.entries(indicator.parameters).filter(([_, param]) => param.advanced)

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="space-y-4">
                <h3 className="text-sm font-bold">Select Indicator</h3>

                
                <Select value={condition.indicator} onValueChange={handleIndicatorChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(indicatorMetadata).map(([key, meta]) => (
                      <SelectItem key={key} value={key}>
                        {meta.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{indicator.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button variant="ghost" size="sm" onClick={onRemove} className="h-8 px-2 text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Standard Parameters */}
          {standardParams.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Parameters</h3>
              <div className="grid grid-cols-2 gap-4">
                {standardParams.map(
                  ([key, param]) =>
                    (typeof param.showIf !== "function" || param.showIf(condition.params ?? {})) && (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center gap-1">
                          <Label>{param.name}</Label>
                          {param.description && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{param.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                        {param.type === "select" ? (
                          <Select
                            value={condition.params?.[key]?.toString() || param.default.toString()}
                            onValueChange={(value) => handleParamChange(key, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {param.options?.map((option) => (
                                <SelectItem
                                  key={typeof option === "string" ? option : option.value}
                                  value={typeof option === "string" ? option : option.value}
                                >
                                  {typeof option === "string" ? option : option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : param.type === "number" ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <Input
                                type="number"
                                value={condition.params?.[key]?.toString() || param.default.toString()}
                                onChange={(e) => handleParamChange(key, Number.parseFloat(e.target.value))}
                                min={param.min}
                                max={param.max}
                                step={param.step}
                                className="w-full"
                              />
                              <span className="text-xs text-muted-foreground ml-2 w-12 text-right">
                                {condition.params?.[key] || param.default}
                              </span>
                            </div>
                            {param.min !== undefined && param.max !== undefined && (
                              <Slider
                                value={[Number(condition.params?.[key] || param.default)]}
                                min={param.min}
                                max={param.max}
                                step={param.step}
                                onValueChange={(values) => handleParamChange(key, values[0])}
                              />
                            )}
                          </div>
                        ) : param.type === "boolean" ? (
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={Boolean(condition.params?.[key] ?? param.default)}
                              onCheckedChange={(checked) => handleParamChange(key, checked)}
                            />
                            <span className="text-sm text-muted-foreground">
                              {Boolean(condition.params?.[key] ?? param.default) ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                        ) : (
                          <Input
                            type="text"
                            value={condition.params?.[key]?.toString() || param.default.toString()}
                            onChange={(e) => handleParamChange(key, e.target.value)}
                          />
                        )}
                      </div>
                    ),
                )}
              </div>
            </div>
          )}

          {/* Advanced Parameters */}
          {advancedParams.length > 0 && (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="advanced-params">
                <AccordionTrigger className="text-sm font-medium">Advanced Parameters</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    {advancedParams.map(([key, param]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex items-center gap-1">
                          <Label>{param.name}</Label>
                          {param.description && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{param.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                        {param.type === "select" ? (
                          <Select
                            value={condition.params?.[key]?.toString() || param.default.toString()}
                            onValueChange={(value) => handleParamChange(key, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {param.options?.map((option) => (
                                <SelectItem
                                  key={typeof option === "string" ? option : option.value}
                                  value={typeof option === "string" ? option : option.value}
                                >
                                  {typeof option === "string" ? option : option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : param.type === "number" ? (
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <Input
                                type="number"
                                value={condition.params?.[key]?.toString() || param.default.toString()}
                                onChange={(e) => handleParamChange(key, Number.parseFloat(e.target.value))}
                                min={param.min}
                                max={param.max}
                                step={param.step}
                                className="w-full"
                              />
                              <span className="text-xs text-muted-foreground ml-2 w-12 text-right">
                                {condition.params?.[key] || param.default}
                              </span>
                            </div>
                            {param.min !== undefined && param.max !== undefined && (
                              <Slider
                                value={[Number(condition.params?.[key] || param.default)]}
                                min={param.min}
                                max={param.max}
                                step={param.step}
                                onValueChange={(values) => handleParamChange(key, values[0])}
                              />
                            )}
                          </div>
                        ) : param.type === "boolean" ? (
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={Boolean(condition.params?.[key] ?? param.default)}
                              onCheckedChange={(checked) => handleParamChange(key, checked)}
                            />
                            <span className="text-sm text-muted-foreground">
                              {Boolean(condition.params?.[key] ?? param.default) ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                        ) : (
                          <Input
                            type="text"
                            value={condition.params?.[key]?.toString() || param.default.toString()}
                            onChange={(e) => handleParamChange(key, e.target.value)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}

          {/* Logic Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Logic</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Logic Dropdown */}
              <div className="space-y-2">
                <Label>Logic</Label>
                <Select value={condition.logic} onValueChange={handleLogicChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {indicator.logicOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedLogic?.description && (
                  <p className="text-sm text-muted-foreground">{selectedLogic.description}</p>
                )}
              </div>

              {/* Additional Input for Volume Indicator */}
              {condition.indicator === "volume" && (
                <div className="space-y-2">
                  <Label>Average Volume Bar</Label>
                  <Input
                    type="number"
                    value={condition.params?.averageVolumeBar || ""}
                    onChange={(e) => handleParamChange("averageVolumeBar", Number(e.target.value))}
                    min={1}
                    max={100}
                    step={1}
                    placeholder="Enter number of bars"
                  />
                </div>
              )}

              {/* Additional Input for Custom Logic */}
              {selectedLogic?.customInput &&
                condition.indicator !== "sma" &&
                condition.indicator !== "ema" &&
                condition.indicator !== "wma" &&
                condition.indicator !== "hma" && (
                  <div className="space-y-2">
                    <h1>RSI</h1>
                    <Label>{selectedLogic.inputLabel || "Custom Value"}</Label>
                    <Input
                      type={selectedLogic.valueType === "number" ? "number" : "text"}
                      value={condition.value || selectedLogic.defaultValue || ""}
                      onChange={(e) => handleValueChange(e.target.value)}
                      min={selectedLogic.min}
                      max={selectedLogic.max}
                      step={selectedLogic.step}
                    />
                  </div>
                )}
            </div>

            {/* Secondary Indicator Parameters for Custom Logic */}
            {selectedLogic?.customInput && selectedLogic?.logicParams && (
              <div className="space-y-4 mt-4">
                <h3 className="text-sm font-medium">Additional Parameters</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedLogic.logicParams).map(([key, param]) => (
                    <div key={key} className="space-y-2">
                      <Label>{param.name}</Label>
                      {param.type === "select" ? (
                        <Select
                          value={condition.params?.[key] || param.default}
                          onValueChange={(value) => handleLogicParamChange(key, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {param.options?.map((option) => (
                             
                              <SelectItem key={option.value} value={option.value}
                                 
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : 
                      (
                       <div className="">
                        <Input
                          type="number"
                          value={condition.params?.[key] || param.default}
                          onChange={(e) => handleLogicParamChange(key, Number(e.target.value))}
                          min={param.min}
                          max={param.max}
                          step={param.step}

                        
                        />  </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
