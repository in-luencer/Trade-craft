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

import type { IndicatorType, IndicatorCondition, IndicatorParams } from "./components/strategy-builder/types";
import type { IndicatorParameter } from "./components/strategy-builder/indicator-metadata";
import indicatorMetadata from "./indicator-metadata"

interface IndicatorLogicEngineProps {
  condition: IndicatorCondition
  onChange: (updatedCondition: IndicatorCondition) => void
  onRemove: () => void
}

// Utility: Type guard for IndicatorType
function isIndicatorType(value: string): value is IndicatorType {
  return Object.keys(indicatorMetadata).includes(value)
}

// Utility: Get default indicator params for a type
const defaultIndicatorParams: IndicatorParams = { period: 14, source: "close" }

export default function IndicatorLogicEngine({ condition, onChange, onRemove }: IndicatorLogicEngineProps) {
  // Fix: Use correct type for indicator
  const indicator = indicatorMetadata[condition.indicator]
  const selectedLogic = indicator?.logicOptions.find((opt) => opt.value === condition.logic)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize parameter values and condition.value from metadata defaults - FIXED
  useEffect(() => {
    if (indicator && !isInitialized) {
      const initialValues: Record<string, any> = {}
      Object.entries(indicator.parameters).forEach(([key, param]: [string, IndicatorParameter]) => {
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
        (acc: Record<string, any>, [key, param]: [string, IndicatorParameter]) => ({
          ...acc,
          [key]: param.default,
        }),
        {},
      )

      onChange({
        ...condition,
        indicator: value as IndicatorType,
        logic: newIndicator.defaultLogic || newIndicator.logicOptions[0].value,
        value: newIndicator.logicOptions[0]?.defaultValue?.toString() || "0",
        params: initialParams,
      })
      setIsInitialized(false) // Reset initialization for new indicator
    }
  }
  const handleLogicChange = (value: string) => {
    const newLogic = indicator?.logicOptions.find((opt) => opt.value === value)
    // Always use our dedicated 'value' property, not a shared sync via params[syncKey]
    onChange({
      ...condition,
      logic: value,
      value: newLogic?.defaultValue?.toString() || "0", // Always reset to the new logic's default value if changing
    })
  }

  const handleValueChange = (value: string) => {
    const numericValue = Number(value)
    if (!isNaN(numericValue)) {
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
      // Use prefixed parameter names for secondary indicators to avoid conflicts
      [`secondary_${paramName}`]: value,
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
                  ([key, param]: [string, IndicatorParameter]) =>
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
                              {param.options?.map((option: string | { value: string; label: string }) => (
                                typeof option === "string" ? (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ) : (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                )
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
                    {advancedParams.map(([key, param]: [string, IndicatorParameter]) => (
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
                              {param.options?.map((option: string | { value: string; label: string }) => (
                                typeof option === "string" ? (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ) : (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                )
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
              {selectedLogic?.customInput && condition.indicator !== "vwma" && (
                <div className="space-y-2">
                  <Label>{selectedLogic.inputLabel || "Custom Value"}</Label>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <Input
                        type={selectedLogic.valueType === "number" ? "number" : "text"}
                        value={condition.value || selectedLogic.defaultValue || ""}
                        onChange={(e) => handleValueChange(e.target.value)}
                        min={selectedLogic.min}
                        max={selectedLogic.max}
                        step={selectedLogic.step}
                        className="w-full"
                      />
                      <span className="text-xs text-muted-foreground ml-2 w-12 text-right">
                        {condition.value || selectedLogic.defaultValue || ""}
                      </span>
                    </div>
                    {selectedLogic.min !== undefined && selectedLogic.max !== undefined && (
                      <Slider
                        value={[Number(condition.value || selectedLogic.defaultValue || 0)]}
                        min={selectedLogic.min}
                        max={selectedLogic.max}
                        step={selectedLogic.step}
                        onValueChange={(values) => handleValueChange(values[0].toString())}
                      />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Indicator Parameters for Custom Logic */}
            {selectedLogic?.customInput && selectedLogic?.logicParams && (
              <div className="space-y-4 mt-4">
                <h3 className="text-sm font-medium">Secondary Indicator Parameters</h3>




                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedLogic.logicParams).map(([key, param]: [string, IndicatorParameter]) => (
                    <div key={key} className="space-y-2">
                      <Label>{param.name}</Label>
                      {param.type === "select" ? (
                        <Select
                          value={condition.params?.[`secondary_${key}`]|| param.default}
                          onValueChange={(value) => handleLogicParamChange(key, value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {param.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <Input
                              type="number"
                              value={condition.params?.[`secondary_${key}`] || param.default}
                              onChange={(e) => handleLogicParamChange(key, Number(e.target.value))}
                              min={param.min}
                              max={param.max}
                              step={param.step}
                              className="w-full"
                            />
                            <span className="text-xs text-muted-foreground ml-2 w-12 text-right">
                              {condition.params?.[`secondary_${key}`] || param.default}
                            </span>
                          </div>
                          {param.min !== undefined && param.max !== undefined && (
                            <Slider
                              value={[Number(condition.params?.[`secondary_${key}`]|| param.default)]}
                              min={param.min}
                              max={param.max}
                              step={param.step}
                              onValueChange={(values) => handleLogicParamChange(key, values[0])}
                            />
                          )}
                        </div>
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
