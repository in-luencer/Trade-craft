import { Info, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RiskManagementConfig } from "../types";

interface LeverageSectionProps {
  config: RiskManagementConfig;
  updateConfig: (newConfig: Partial<RiskManagementConfig>) => void;
}

export function LeverageSection({ config, updateConfig }: LeverageSectionProps) {
  return (
    <div className="space-y-4 mt-8">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold">Leverage</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Enable and set the leverage ratio for your trades</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {(!config.leverageEnabled || config.leverageEnabled === undefined) && (
        <Button variant="outline" onClick={() => updateConfig({ leverageEnabled: true })} className="w-full mb-4">
          <Plus className="h-4 w-4 mr-2" /> Add Leverage
        </Button>
      )}
      {config.leverageEnabled && (
        <Card className="border-2 border-dashed">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={!!config.leverageEnabled}
                  onCheckedChange={(checked) => updateConfig({ leverageEnabled: checked })}
                />
                <Label>Enable Leverage</Label>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => updateConfig({ leverageEnabled: false, leverageRatio: 1 })}
                className="h-8 px-2 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Leverage Ratio</Label>
              <Select
                value={String(config.leverageRatio ?? 1)}
                onValueChange={(value) => updateConfig({ leverageRatio: Number(value) })}
                disabled={!config.leverageEnabled}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select leverage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1x (No Leverage)</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                  <SelectItem value="3">3x</SelectItem>
                  <SelectItem value="5">5x</SelectItem>
                  <SelectItem value="10">10x</SelectItem>
                  <SelectItem value="20">20x</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
