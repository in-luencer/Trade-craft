"use client"

import { useState } from "react"
import { Save } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Strategy } from "./types"
import { generatePineScript } from "./pine-script-generator"
import { generatePseudocode } from "./pseudocode-generator"


interface StrategyPreviewProps {
  strategy: Strategy
}

export default function StrategyPreview({ strategy }: StrategyPreviewProps) {
  const [symbol, setSymbol] = useState("BTCUSD")
  const [isSaving, setIsSaving] = useState(false)
  const router = useRouter()

  const saveStrategy = async () => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/strategies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: strategy.name,
          description: strategy.description,
          entryLong: {
            conditionGroups: strategy.entryLong.conditionGroups.map(group => ({
              operator: group.operator,
              conditions: group.conditions.map(condition => ({
                indicator: condition.indicator,
                parameter: condition.parameter,
                logic: condition.logic,
                value: condition.value,
                timeframe: condition.timeframe,
                params: condition.params
              }))
            }))
          },
          entryShort: {
            conditionGroups: strategy.entryShort.conditionGroups.map(group => ({
              operator: group.operator,
              conditions: group.conditions.map(condition => ({
                indicator: condition.indicator,
                parameter: condition.parameter,
                logic: condition.logic,
                value: condition.value,
                timeframe: condition.timeframe,
                params: condition.params
              }))
            }))
          },
          exitLong: {
            conditionGroups: strategy.exitLong.conditionGroups.map(group => ({
              operator: group.operator,
              conditions: group.conditions.map(condition => ({
                indicator: condition.indicator,
                parameter: condition.parameter,
                logic: condition.logic,
                value: condition.value,
                timeframe: condition.timeframe,
                params: condition.params
              }))
            }))
          },
          exitShort: {
            conditionGroups: strategy.exitShort.conditionGroups.map(group => ({
              operator: group.operator,
              conditions: group.conditions.map(condition => ({
                indicator: condition.indicator,
                parameter: condition.parameter,
                logic: condition.logic,
                value: condition.value,
                timeframe: condition.timeframe,
                params: condition.params
              }))
            }))
          },
          riskManagement: strategy.riskManagement
        })
      })

      if (!response.ok) {
        throw new Error("Failed to save strategy")
      }

      router.push("/strategies")
    } catch (error) {
      console.error("Error saving strategy:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{strategy.name}</CardTitle>
            <Button onClick={saveStrategy} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" /> {isSaving ? "Saving..." : "Save Strategy"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pine">
            <TabsList>
              <TabsTrigger value="pine">Pine Script</TabsTrigger>
              <TabsTrigger value="pseudocode">Pseudocode</TabsTrigger>
            </TabsList>
            <TabsContent value="pine" className="mt-4">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                <code>{generatePineScript(strategy)}</code>
              </pre>
            </TabsContent>
            <TabsContent value="pseudocode" className="mt-4">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
                <code>{generatePseudocode(strategy)}</code>
              </pre>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
