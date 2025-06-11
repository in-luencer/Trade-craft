import { Info, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PositionSizingFields } from "./PositionSizingFields";
import { PositionSizingRule, RiskManagementConfig } from "../types";

interface PositionSizingSectionProps {
  config: import("../types").RiskManagementConfig;
  positionSizingRules: {
    update: (id: string, updates: Partial<import("../types").PositionSizingRule>) => void;
    remove: (id: string) => void;
    add: () => void;
  };
}

export function PositionSizingSection({ config, positionSizingRules }: PositionSizingSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold">Position Sizing</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Rules to determine the size of each position</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {config.positionSizing.map((rule) => (
        <Card key={rule.id} className="border-2 border-dashed">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={(checked) => positionSizingRules.update(rule.id, { enabled: checked })}
                />
                <Label>Enabled</Label>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => positionSizingRules.remove(rule.id)}
                className="h-8 px-2 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select
                  value={rule.type}
                  onValueChange={(value) =>
                    positionSizingRules.update(rule.id, {
                      type: value as PositionSizingRule["type"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed-amount">Fixed Amount</SelectItem>
                    <SelectItem value="fixed-units">Fixed Units</SelectItem>
                    <SelectItem value="percentage">Percentage of Equity</SelectItem>
                    <SelectItem value="risk-based">Risk-Based</SelectItem>
                    <SelectItem value="kelly">Kelly Criterion</SelectItem>
                    <SelectItem value="volatility-based">Volatility Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <PositionSizingFields rule={rule} updatePositionSizingRule={positionSizingRules.update} />
          </CardContent>
        </Card>
      ))}
      {config.positionSizing.length === 0 && (
        <Button variant="outline" onClick={positionSizingRules.add} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Position Sizing Rule
        </Button>
      )}
    </div>
  );
}
