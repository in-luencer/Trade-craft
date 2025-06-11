// Helper components for rendering Stop Loss fields
import { StopLossRule } from "../types";
import { Input } from "../../ui/input";

export function StopLossFields({ rule, updateStopLossRule }: { rule: StopLossRule, updateStopLossRule: (id: string, updates: Partial<StopLossRule>) => void }) {
  switch (rule.type) {
    
    case "atr":
      return (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">ATR Period</label>
            <Input
              type="number"
              value={rule.atrPeriod || 14}
              onChange={e => updateStopLossRule(rule.id, { atrPeriod: Number.parseInt(e.target.value) || 14 })}
              min="1"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">ATR Multiplier</label>
            <Input
              type="number"
              value={rule.atrMultiplier || 2}
              onChange={e => updateStopLossRule (rule.id, { atrMultiplier: Number.parseFloat(e.target.value) || 2 })}
              min="0.1"
              step="0.1"
            />
          </div>
        </div>
      );
    case "time":
      return (
        <div className="space-y-2 mt-4">
          <label>Time (HH:MM)</label>
            <div className="flex gap-2">
            <Input
              type="number"
              min={0}
              max={23}
              value={typeof rule.value === "number" ? Math.floor(rule.value / 60) : ""}
              onChange={e => {
              const hours = Number.parseInt(e.target.value) || 0;
              const minutes = typeof rule.value === "number" ? rule.value % 60 : 0;
              updateStopLossRule(rule.id, { value: hours * 60 + minutes });
              }}
              placeholder="HH"
              className="w-16"
            />
            <Input
              type="number"
              min={0}
              max={59}
              value={typeof rule.value === "number" ? rule.value % 60 : ""}
              onChange={e => {
              const minutes = Number.parseInt(e.target.value) || 0;
              const hours = typeof rule.value === "number" ? Math.floor(rule.value / 60) : 0;
              updateStopLossRule(rule.id, { value: hours * 60 + minutes });
              }}
              placeholder="MM"
              className="w-16"
            />
            </div>
        </div>
      );
    case "fixed-dollar":
      return (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Fixed Dollar Amount</label>
            <Input
              type="number"
              value={rule.lookbackPeriod || 20}
              onChange={e => updateStopLossRule(rule.id, { lookbackPeriod: Number.parseInt(e.target.value) || 20 })}
              min="1"
              step="1"
            />
          </div>
        </div>
      );
    case "percentage":
      return (
        <div className="space-y-2 mt-4">
          <label>Stop Loss Percentage (%)</label>
          <Input
            type="number"
            value={rule.value ?? ''}
            onChange={e => updateStopLossRule(rule.id, { value: e.target.value === '' ? undefined : Number.parseFloat(e.target.value) })}
            min="0.01"
            step="0.01"
            placeholder="Enter stop loss %"
          />
        </div>
      );
    default:
      return null;
  }
}
