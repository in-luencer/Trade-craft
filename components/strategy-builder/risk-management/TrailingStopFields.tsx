// Helper component for rendering Trailing Stop fields
import { TrailingStopRule } from "../types";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../ui/select";

export function TrailingStopFields({ rule, updateTrailingStopRule }: { rule: TrailingStopRule, updateTrailingStopRule: (id: string, updates: Partial<TrailingStopRule>) => void }) {
  switch (rule.type) {
    case "atr":
      return (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Input
              type="number"
              value={rule.atrPeriod || 14}
              onChange={e => updateTrailingStopRule(rule.id, { atrPeriod: Number.parseInt(e.target.value) || 14 })}
              min="1"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <Label>ATR Multiplier</Label>
            <Input
              type="number"
              value={rule.atrMultiplier || 2}
              onChange={e => updateTrailingStopRule(rule.id, { atrMultiplier: Number.parseFloat(e.target.value) || 2 })}
              min="0.1"
              step="0.1"
            />
          </div>
          <div className="space-y-2">
            <Label>Activation Threshold (%)</Label>
            <Input
              type="number"
              value={rule.activationThreshold || 1}
              onChange={e => updateTrailingStopRule(rule.id, { activationThreshold: Number.parseFloat(e.target.value) || 1 })}
              min="0.1"
              step="0.1"
            />
          </div>
        </div>
      );
    case "parabolic":
      return (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Acceleration Factor</Label>
            <Input
              type="number"
              value={rule.accelerationFactor || 0.02}
              onChange={e => updateTrailingStopRule(rule.id, { accelerationFactor: Number.parseFloat(e.target.value) || 0.02 })}
              min="0.01"
              step="0.01"
            />
          </div>
          <div className="space-y-2">
            <Label>Max Acceleration</Label>
            <Input
              type="number"
              value={rule.maxAcceleration || 0.2}
              onChange={e => updateTrailingStopRule(rule.id, { maxAcceleration: Number.parseFloat(e.target.value) || 0.2 })}
              min="0.01"
              step="0.01"
            />
          </div>
        </div>
      );
    case "moving-average":
      return (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Select
              value={rule.maType || "ema"}
              onValueChange={value => updateTrailingStopRule(rule.id, { maType: value as "sma" | "ema" | "wma" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select MA Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sma">SMA</SelectItem>
                <SelectItem value="ema">EMA</SelectItem>
                <SelectItem value="wma">WMA</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>MA Period</Label>
            <Input
              type="number"
              value={rule.maPeriod || 20}
              onChange={e => updateTrailingStopRule(rule.id, { maPeriod: Number.parseInt(e.target.value) || 20 })}
              min="1"
              step="1"
            />
          </div>
        </div>
      );
    default:
      return null;
  }
}
