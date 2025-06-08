import { Info, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RiskManagementConfig } from "../types";

interface TradingSessionFilterSectionProps {
  config: RiskManagementConfig;
  updateConfig: (newConfig: Partial<RiskManagementConfig>) => void;
}

export function TradingSessionFilterSection({ config, updateConfig }: TradingSessionFilterSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold">Trading Session Filter</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Restrict trading to specific sessions or hours</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {config.sessionStart || config.sessionEnd ? (
        <Card className="border-2 border-dashed">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={!!config.sessionStart || !!config.sessionEnd}
                  onCheckedChange={checked => {
                    if (!checked) {
                      updateConfig({ sessionStart: undefined, sessionEnd: undefined })
                    }
                  }}
                />
                <Label>Enabled</Label>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateConfig({ sessionStart: undefined, sessionEnd: undefined })}
                className="h-8 px-2 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Session Start (HH:MM)</Label>
                <Input
                  type="time"
                  value={config.sessionStart || ''}
                  onChange={e => updateConfig({ sessionStart: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Session End (HH:MM)</Label>
                <Input
                  type="time"
                  value={config.sessionEnd || ''}
                  onChange={e => updateConfig({ sessionEnd: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button variant="outline" onClick={() => updateConfig({ sessionStart: '09:00', sessionEnd: '16:00' })} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Trading Session Filter
        </Button>
      )}
    </div>
  );
}
