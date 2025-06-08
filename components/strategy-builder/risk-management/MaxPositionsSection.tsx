import { Info, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RiskManagementConfig } from "../types";

interface MaxPositionsSectionProps {
  config: RiskManagementConfig;
  updateConfig: (newConfig: Partial<RiskManagementConfig>) => void;
}

export function MaxPositionsSection({ config, updateConfig }: MaxPositionsSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold">Max Positions</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Set the maximum number of open positions at a time</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {typeof config.maxOpenPositions === 'number' ? (
        <Card className="border-2 border-dashed">
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={typeof config.maxOpenPositions === 'number'}
                  onCheckedChange={checked => {
                    if (!checked) {
                      updateConfig({ maxOpenPositions: undefined })
                    }
                  }}
                />
                <Label>Enabled</Label>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateConfig({ maxOpenPositions: undefined })}
                className="h-8 px-2 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Max Open Positions</Label>
              <Input
                type="number"
                value={config.maxOpenPositions || ''}
                onChange={e => updateConfig({ maxOpenPositions: Number(e.target.value) })}
                min="1"
                step="1"
                placeholder="e.g. 3"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button variant="outline" onClick={() => updateConfig({ maxOpenPositions: 3 })} className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Add Max Positions
        </Button>
      )}
    </div>
  );
}
