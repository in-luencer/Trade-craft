import { Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TakeProfitFields } from "./TakeProfitFields";
import { TakeProfitRule, RiskManagementConfig } from "../types";

interface TakeProfitSectionProps {
  config: RiskManagementConfig;
  takeProfitRules: {
    update: (id: string, updates: Partial<TakeProfitRule>) => void;
    remove: (id: string) => void;
    add: () => void;
  };
}

export function TakeProfitSection({ config, takeProfitRules }: TakeProfitSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold">Take Profit</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Automatically exit a trade to lock in profits</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {config.takeProfit.map((rule) => (
        <Card key={rule.id} className="border-2 border-dashed">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={(checked) => takeProfitRules.update(rule.id, { enabled: checked })}
                />
                <Label>Enabled</Label>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => takeProfitRules.remove(rule.id)}
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
                    takeProfitRules.update(rule.id, {
                      type: value as TakeProfitRule["type"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="r:r">Risk Reward ratio</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="atr">ATR Based Target</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <TakeProfitFields rule={rule} updateTakeProfitRule={takeProfitRules.update} />
          </CardContent>
        </Card>
      ))}
      {config.takeProfit.length === 0 && (
        <Button variant="outline" onClick={takeProfitRules.add} className="w-full">
          Add Take Profit Rule
        </Button>
      )}
    </div>
  );
}
