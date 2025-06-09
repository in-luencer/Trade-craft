"use client"
import { cleanPositionRule } from "./utils";
import { useState } from "react"
import { Copy, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

import type { StrategyConfig } from "./strategy-builder"

interface StrategyJsonExporterProps {
  strategy: StrategyConfig
}

export default function StrategyJsonExporter({ strategy }: StrategyJsonExporterProps) {
  const [showFormatted, setShowFormatted] = useState(true)
  const [copied, setCopied] = useState(false)

  // Enhanced JSON export that includes all parameters properly structured
  const exportStrategy = () => {
    const exportData = {
      ...strategy,
      exportedAt: new Date().toISOString(),
      version: "2.0",
      metadata: {
        totalConditions: getTotalConditions(),
        indicatorsUsed: getUniqueIndicators(),
        hasSecondaryIndicators: hasSecondaryIndicators(),
      },
      // Ensure all condition parameters are properly exported
      entryLong: {
        ...strategy.entryLong,
        conditionGroups: strategy.entryLong.conditionGroups.map((group) => ({
          ...group,
          conditions: group.conditions.map((condition) => ({
            ...condition,
            params: {
              ...condition.params,
              // Extract secondary indicator parameters
              ...(condition.params &&
                Object.keys(condition.params)
                  .filter((key) => key.startsWith("secondary_"))
                  .reduce(
                    (acc, key) => {
                      const cleanKey = key.replace("secondary_", "")
                      acc[`secondaryIndicator_${cleanKey}`] = condition.params![key]
                      return acc
                    },
                    {} as Record<string, any>,
                  )),
            },
          })),
        })),
      },
      entryShort: {
        ...strategy.entryShort,
        conditionGroups: strategy.entryShort.conditionGroups.map((group) => ({
          ...group,
          conditions: group.conditions.map((condition) => ({
            ...condition,
            params: {
              ...condition.params,
              // Extract secondary indicator parameters
              ...(condition.params &&
                Object.keys(condition.params)
                  .filter((key) => key.startsWith("secondary_"))
                  .reduce(
                    (acc, key) => {
                      const cleanKey = key.replace("secondary_", "")
                      acc[`secondaryIndicator_${cleanKey}`] = condition.params![key]
                      return acc
                    },
                    {} as Record<string, any>,
                  )),
            },
          })),
        })),
      },
      exitLong: {
        ...strategy.exitLong,
        conditionGroups: strategy.exitLong.conditionGroups.map((group) => ({
          ...group,
          conditions: group.conditions.map((condition) => ({
            ...condition,
            params: {
              ...condition.params,
              // Extract secondary indicator parameters
              ...(condition.params &&
                Object.keys(condition.params)
                  .filter((key) => key.startsWith("secondary_"))
                  .reduce(
                    (acc, key) => {
                      const cleanKey = key.replace("secondary_", "")
                      acc[`secondaryIndicator_${cleanKey}`] = condition.params![key]
                      return acc
                    },
                    {} as Record<string, any>,
                  )),
            },
          })),
        })),
      },
      exitShort: {
        ...strategy.exitShort,
        conditionGroups: strategy.exitShort.conditionGroups.map((group) => ({
          ...group,
          conditions: group.conditions.map((condition) => ({
            ...condition,
            params: {
              ...condition.params,
              // Extract secondary indicator parameters
              ...(condition.params &&
                Object.keys(condition.params)
                  .filter((key) => key.startsWith("secondary_"))
                  .reduce(
                    (acc, key) => {
                      const cleanKey = key.replace("secondary_", "")
                      acc[`secondaryIndicator_${cleanKey}`] = condition.params![key]
                      return acc
                    },
                    {} as Record<string, any>,
                  )),
            },
          })),
        })),
      },
    }

    return exportData
  }

  const getTotalConditions = () => {
    return (
      strategy.entryLong.conditionGroups.reduce((sum, group) => sum + group.conditions.length, 0) +
      strategy.entryShort.conditionGroups.reduce((sum, group) => sum + group.conditions.length, 0) +
      strategy.exitLong.conditionGroups.reduce((sum, group) => sum + group.conditions.length, 0) +
      strategy.exitShort.conditionGroups.reduce((sum, group) => sum + group.conditions.length, 0)
    )
  }

  const getUniqueIndicators = () => {
    const indicators = new Set<string>()

    const collectIndicators = (conditionGroups: any[]) => {
      conditionGroups.forEach((group) => {
        group.conditions.forEach((condition: any) => {
          indicators.add(condition.indicator)
          // Also collect secondary indicators
          if (condition.params?.secondary_indicator) {
            indicators.add(condition.params.secondary_indicator)
          }
        })
      })
    }

    collectIndicators(strategy.entryLong.conditionGroups)
    collectIndicators(strategy.entryShort.conditionGroups)
    collectIndicators(strategy.exitLong.conditionGroups)
    collectIndicators(strategy.exitShort.conditionGroups)

    return Array.from(indicators)
  }

  const hasSecondaryIndicators = () => {
    const checkForSecondary = (conditionGroups: any[]) => {
      return conditionGroups.some((group) =>
        group.conditions.some(
          (condition: any) =>
            condition.params && Object.keys(condition.params).some((key) => key.startsWith("secondary_")),
        ),
      )
    }

    return (
      checkForSecondary(strategy.entryLong.conditionGroups) ||
      checkForSecondary(strategy.entryShort.conditionGroups) ||
      checkForSecondary(strategy.exitLong.conditionGroups) ||
      checkForSecondary(strategy.exitShort.conditionGroups)
    )
  }

  const jsonString = showFormatted ? JSON.stringify(exportStrategy(), null, 2) : JSON.stringify(exportStrategy())

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const downloadJson = () => {
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${strategy.name.replace(/\s+/g, "_")}_strategy.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Strategy JSON Export
          <div className="flex items-center space-x-2">
            <Label htmlFor="formatted-toggle" className="text-sm">
              Formatted
            </Label>
            <Switch id="formatted-toggle" checked={showFormatted} onCheckedChange={setShowFormatted} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Button onClick={copyToClipboard} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button onClick={downloadJson} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        <Textarea
          value={jsonString}
          readOnly
          className="min-h-[400px] font-mono text-xs"
          placeholder="Strategy JSON will appear here..."
        />

        <div className="text-sm text-muted-foreground">
          <p>Total Conditions: {getTotalConditions()}</p>
          <p>Indicators Used: {getUniqueIndicators().join(", ")}</p>
          <p>Has Secondary Indicators: {hasSecondaryIndicators() ? "Yes" : "No"}</p>
        </div>
      </CardContent>
    </Card>
  )
}
