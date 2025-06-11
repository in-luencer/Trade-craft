"use client"

import { Plus, Trash2, ChevronDown, ChevronUp, Info } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import type { ConditionGroup, IndicatorLogic, IndicatorType, IndicatorCondition, PositionRule } from "./types"
import IndicatorLogicEngine from "./indicator-logic-engine"
import type { IndicatorMetadata, LogicOption } from "./indicator-metadata"

interface EntryExitNodeProps {
  positionRule: PositionRule
  onChange: (updatedRule: PositionRule) => void
  title?: string
}

const EntryExitNode = ({ positionRule, onChange, title = "Entry/Exit Rules" }: EntryExitNodeProps) => {
  const groups = positionRule.conditionGroups

  const addConditionGroup = () => {
    const newGroup: ConditionGroup = {
      id: "group-" + Date.now(),
      conditions: [
        {
          id: "condition-" + Date.now(),
          indicator: "rsi",
          logic: "less_than",
          value: "30",
          timeframe: "1d",
          params: {
            period: 14,
            source: "close"
          },
        },
      ],
      operator: "or",
    }

    onChange({
      ...positionRule,
      conditionGroups: [...groups, newGroup]
    })
  }

  const removeConditionGroup = (groupId: string) => {
    onChange({
      ...positionRule,
      conditionGroups: groups.filter((group) => group.id !== groupId)
    })
  }

  const updateConditionGroup = (groupId: string, updatedGroup: Partial<ConditionGroup>) => {
    onChange({
      ...positionRule,
      conditionGroups: groups.map((group) =>
        group.id === groupId ? { ...group, ...updatedGroup } : group
      ),
    })
  }

  return (
    <div className="space-y-6">
      {positionRule.conditionGroups.map((group, groupIndex) => (
        <div key={group.id} className="space-y-4">
          <Card className="border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg transition-all duration-200 hover:shadow-xl">
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-lg bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                      {title} {groupIndex + 1}
                    </h4>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Configure your trading conditions for {title.toLowerCase()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {groups.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeConditionGroup(group.id)}
                      className="h-8 px-2 text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-6">
                  {group.conditions.map((condition, conditionIndex) => (
                    <div key={condition.id} className="space-y-4">
                      <IndicatorLogicEngine
                        condition={condition}
                        onChange={(updatedCondition) => {
                          const updatedConditions = [...group.conditions]
                          updatedConditions[conditionIndex] = updatedCondition
                          updateConditionGroup(group.id, { conditions: updatedConditions })
                        }}
                        onRemove={() => {
                          const updatedConditions = group.conditions.filter((_, i) => i !== conditionIndex)
                          updateConditionGroup(group.id, { conditions: updatedConditions })
                        }}
                      />

                      {conditionIndex < group.conditions.length - 1 && (
                        <div className="flex justify-center">
                          <Badge variant="outline" className="px-4 py-2 font-medium text-sm bg-muted/50">
                            OR
                          </Badge>
                        </div>
                      )}

                      {conditionIndex === group.conditions.length - 1 && (
                        <div className="flex justify-between items-center pt-4">
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm text-muted-foreground">Timeframe</h4>
                            <Select
                              value={condition.timeframe}
                              onValueChange={(value: string) => {
                                const updatedCondition = { ...condition, timeframe: value }
                                const updatedConditions = [...group.conditions]
                                updatedConditions[conditionIndex] = updatedCondition
                                updateConditionGroup(group.id, { conditions: updatedConditions })
                              }}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1m">1 Minute</SelectItem>
                                <SelectItem value="5m">5 Minutes</SelectItem>
                                <SelectItem value="15m">15 Minutes</SelectItem>
                                <SelectItem value="30m">30 Minutes</SelectItem>
                                <SelectItem value="45m">45 Minutes</SelectItem>
                                <SelectItem value="1h">1 Hour</SelectItem>
                                <SelectItem value="2h">2 Hours</SelectItem>
                                <SelectItem value="4h">4 Hours</SelectItem>
                                <SelectItem value="1d">1 Day</SelectItem>
                                <SelectItem value="1w">1 Week</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newCondition: IndicatorCondition = {
                                id: "condition-" + Date.now(),
                                indicator: "rsi",
                                logic: "less_than",
                                value: "30",
                                timeframe: "1d",
                                params: {
                                  period: 14,
                                  source: "close",
                                },
                              }
                              const updatedConditions = [...group.conditions, newCondition]
                              updateConditionGroup(group.id, { conditions: updatedConditions })
                            }}
                            className="ml-auto hover:bg-primary/10"
                          >
                            <Plus className="h-4 w-4 mr-2" /> Add Condition
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {groupIndex < groups.length - 1 && (
            <div className="flex justify-center">
              <Badge variant="outline" className="px-4 py-2 font-medium text-sm bg-muted/50">
                OR
              </Badge>
            </div>
          )}
        </div>
      ))}

      <Button
        variant="outline"
        onClick={addConditionGroup}
        className="w-full hover:bg-primary/10 transition-colors duration-200"
      >
        <Plus className="h-4 w-4 mr-2" /> Add Alternative Condition Group
      </Button>
    </div>
  )
}

export default EntryExitNode