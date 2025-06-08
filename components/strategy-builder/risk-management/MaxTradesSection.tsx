import { Info, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RiskManagementConfig } from "../types";

interface MaxTradesSectionProps {
  config: RiskManagementConfig;
  updateConfig: (newConfig: Partial<RiskManagementConfig>) => void;
}

export function MaxTradesSection({ config, updateConfig }: MaxTradesSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold">Max Trades</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Limit the number of trades per day or week</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {(typeof config.maxTradesPerDay === 'number' || typeof config.maxTradesPerWeek === 'number') ? (
        <Card className="border-2 border-dashed">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={typeof config.maxTradesPerDay === 'number' || typeof config.maxTradesPerWeek === 'number'}
                  onCheckedChange={checked => {
                    if (!checked) {
                      updateConfig({ maxTradesPerDay: undefined, maxTradesPerWeek: undefined })
                    }
                  }}
                />
                <Label>Enabled</Label>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateConfig({ maxTradesPerDay: undefined, maxTradesPerWeek: undefined })}
                className="h-8 px-2 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Max Trades Per Day</Label>
                <Input
                  type="number"
                  value={config.maxTradesPerDay || ''}
                  onChange={e => updateConfig({ maxTradesPerDay: Number(e.target.value) })}
                  min="0"
                  step="1"
                  placeholder="e.g. 5"
                />
              </div>
              <div className="space-y-2">
                <Label>Max Trades Per Week</Label>
                <Input
                  type="number"
                  value={config.maxTradesPerWeek || ''}
                  onChange={e => updateConfig({ maxTradesPerWeek: Number(e.target.value) })}
                  min="0"
                  step="1"
                  placeholder="e.g. 20"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button variant="outline" onClick={() => updateConfig({ maxTradesPerDay: 5, maxTradesPerWeek: 20 })} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Max Trades
        </Button>
      )}
    </div>
  );
}
