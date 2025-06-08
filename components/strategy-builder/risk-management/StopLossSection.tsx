import { Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StopLossFields } from "./StopLossFields";
import { StopLossRule, RiskManagementConfig } from "../types";

interface StopLossSectionProps {
  config: RiskManagementConfig;
  stopLossRules: {
    update: (id: string, updates: Partial<StopLossRule>) => void;
    remove: (id: string) => void;
    add: () => void;
  };
}

export function StopLossSection({ config, stopLossRules }: StopLossSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold">Stop Loss</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Automatically exit a trade to limit losses</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {config.stopLoss.map((rule) => (
        <Card key={rule.id} className="border-2 border-dashed">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={(checked) => stopLossRules.update(rule.id, { enabled: checked })}
                />
                <Label>Enabled</Label>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => stopLossRules.remove(rule.id)}
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
                    stopLossRules.update(rule.id, {
                      type: value as StopLossRule["type"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="atr">ATR Multiple</SelectItem>
                    <SelectItem value="fixed-dollar">Fixed Dollar</SelectItem>
                    <SelectItem value="time">Time-Based Stop Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <StopLossFields rule={rule} updateStopLossRule={stopLossRules.update} />
          </CardContent>
        </Card>
      ))}
      {config.stopLoss.length === 0 && (
        <Button variant="outline" onClick={stopLossRules.add} className="w-full">
          Add Stop Loss Rule
        </Button>
      )}
    </div>
  );
}
