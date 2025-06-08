// Helper component for rendering Take Profit fields
import { TakeProfitRule } from "../types";
import { Input } from "../../ui/input";

export function TakeProfitFields({ rule, updateTakeProfitRule }: { rule: TakeProfitRule, updateTakeProfitRule: (id: string, updates: Partial<TakeProfitRule>) => void }) {
  switch (rule.type) {
    case "r:r":
      return (
        <div className="space-y-2 mt-4">
          <label className="block text-sm font-medium ">Risk-Reward Ratio</label>
          <Input
            type="number"
            value={rule.riskRewardRatio || 2}
            onChange={e => updateTakeProfitRule(rule.id, { riskRewardRatio: Number.parseFloat(e.target.value) || 2 })}
            min="0.1"
            step="0.1"
          />
        </div>
      );
    case "atr":
      return (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">ATR Period</label>
            <Input
              type="number"
              value={rule.atrPeriod || 14}
              onChange={e => updateTakeProfitRule(rule.id, { atrPeriod: Number.parseInt(e.target.value) || 14 })}
              min="1"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">ATR Multiplier</label>
            <Input
              type="number"
              value={rule.atrMultiplier || 2}
              onChange={e => updateTakeProfitRule(rule.id, { atrMultiplier: Number.parseFloat(e.target.value) || 2 })}
              min="0.1"
              step="0.1"
            />
          </div>
        </div>
      );
    case "percentage":
      return (
        <div className="space-y-2 mt-4">
          <label className="block text-sm font-medium text-gray-700">Take Profit Percentage (%)</label>
          <Input
            type="number"
            value={rule.value ?? ''}
            onChange={e => updateTakeProfitRule(rule.id, { value: e.target.value === '' ? undefined : Number.parseFloat(e.target.value) })}
            min="0.01"
            step="0.01"
            placeholder="Enter take profit %"
          />
        </div>
      );
    default:
      return null;
  }
}
