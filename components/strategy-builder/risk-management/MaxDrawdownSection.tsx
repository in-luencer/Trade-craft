import { Info, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RiskManagementConfig } from "../types";

interface MaxDrawdownSectionProps {
  config: RiskManagementConfig;
  updateConfig: (newConfig: Partial<RiskManagementConfig>) => void;
}

export function MaxDrawdownSection({ config, updateConfig }: MaxDrawdownSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold">Max Drawdown</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Set maximum loss limits for daily, weekly, and monthly periods</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {(typeof config.maxDrawdown === 'number' || typeof config.maxDailyLoss === 'number' || typeof config.maxMonthlyDrawdown === 'number') ? (
        <Card className="border-2 border-dashed">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={typeof config.maxDrawdown === 'number' || typeof config.maxDailyLoss === 'number' || typeof config.maxMonthlyDrawdown === 'number'}
                  onCheckedChange={checked => {
                    if (!checked) {
                      updateConfig({ maxDrawdown: undefined, maxDailyLoss: undefined, maxMonthlyDrawdown: undefined })
                    }
                  }}
                />
                <Label>Enabled</Label>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateConfig({ maxDrawdown: undefined, maxDailyLoss: undefined, maxMonthlyDrawdown: undefined })}
                className="h-8 px-2 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Daily Max Drawdown (%)</Label>
                <Input
                  type="number"
                  value={config.maxDailyLoss || ''}
                  onChange={e => updateConfig({ maxDailyLoss: Number(e.target.value) })}
                  min="0"
                  step="0.1"
                  placeholder="e.g. 5"
                />
              </div>
              <div className="space-y-2">
                <Label>Weekly Max Drawdown (%)</Label>
                <Input
                  type="number"
                  value={config.maxDrawdown || ''}
                  onChange={e => updateConfig({ maxDrawdown: Number(e.target.value) })}
                  min="0"
                  step="0.1"
                  placeholder="e.g. 10"
                />
              </div>
              <div className="space-y-2">
                <Label>Monthly Max Drawdown (%)</Label>
                <Input
                  type="number"
                  value={config.maxMonthlyDrawdown || ''}
                  onChange={e => updateConfig({ maxMonthlyDrawdown: Number(e.target.value) })}
                  min="0"
                  step="0.1"
                  placeholder="e.g. 20"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button variant="outline" onClick={() => updateConfig({ maxDrawdown: 10, maxDailyLoss: 5, maxMonthlyDrawdown: 20 })} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Max Drawdown
        </Button>
      )}
    </div>
  );
}
