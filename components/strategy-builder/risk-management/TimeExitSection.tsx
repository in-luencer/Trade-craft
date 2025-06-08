import { Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TimeExitFields } from "./TimeExitFields";
import { TimeExitRule, RiskManagementConfig } from "../types";

interface TimeExitSectionProps {
  config: RiskManagementConfig;
  timeExitRules: {
    update: (id: string, updates: Partial<TimeExitRule>) => void;
    remove: (id: string) => void;
    add: () => void;
  };
}

export function TimeExitSection({ config, timeExitRules }: TimeExitSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold">Time-Based Exit</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Exit a trade after a specific time period or at a specific time</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {config.timeExit.map((rule) => (
        <Card key={rule.id} className="border-2 border-dashed">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={(checked) => timeExitRules.update(rule.id, { enabled: checked })}
                />
                <Label>Enabled</Label>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => timeExitRules.remove(rule.id)}
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
                    timeExitRules.update(rule.id, {
                      type: value as TimeExitRule["type"],
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bars">Number of Bars</SelectItem>
                    <SelectItem value="time">Specific Time</SelectItem>
                    <SelectItem value="date">Specific Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <TimeExitFields rule={rule} updateTimeExitRule={timeExitRules.update} />
          </CardContent>
        </Card>
      ))}
      {config.timeExit.length === 0 && (
        <Button variant="outline" onClick={timeExitRules.add} className="w-full">
          Add Time Exit Rule
        </Button>
      )}
    </div>
  );
}
