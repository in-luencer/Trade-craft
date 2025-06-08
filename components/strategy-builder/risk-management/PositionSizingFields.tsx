// Helper component for rendering Position Sizing fields
import { PositionSizingRule } from "../types";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Select } from "../../ui/select";

export function PositionSizingFields({ rule, updatePositionSizingRule }: { rule: PositionSizingRule, updatePositionSizingRule: (id: string, updates: Partial<PositionSizingRule>) => void }) {
  switch (rule.type) {
    case "fixed-units":
      return (
        <div className="space-y-2 mt-4">
          <Label>Fixed Units</Label>
          <Input
            type="number"
            value={rule.value ?? ''}
            onChange={e => updatePositionSizingRule(rule.id, { value: e.target.value === '' ? undefined : Number.parseFloat(e.target.value) })}
            min="0.01"
            step="0.01"
            placeholder="Enter number of units"
          />
        </div>
      );
    case "fixed-amount":
      return (
        <div className="space-y-2 mt-4">
          <Label>Fixed Amount (In USD $)/Trade</Label>
          <Input
            type="number"
            value={rule.value ?? ''}
            onChange={e => updatePositionSizingRule(rule.id, { value: e.target.value === '' ? undefined : Number.parseFloat(e.target.value) })}
            min="1"
            step="1"
            placeholder="Enter fixed amount"
          />
        </div>
      );
    case "percentage":
      return (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Equity Percentage (%)</Label>
            <Input
              type="number"
              value={rule.equityPercentage || 2}
              onChange={e => updatePositionSizingRule(rule.id, { equityPercentage: Number.parseFloat(e.target.value) || 2 })}
              min="0.1"
              step="0.1"
            />
          </div>
        </div>
      );
    case "risk-reward":
      return (
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Max Risk per Trade (%)</Label>
            <Input
              type="number"
              value={rule.maxRisk || 2}
              onChange={e => updatePositionSizingRule(rule.id, { maxRisk: Number.parseFloat(e.target.value) || 2 })}
              min="0.1"
              step="0.1"
              placeholder="e.g. 2"
            />
          </div>
          <div className="space-y-2">
            <Select
              value={rule.useStopLossRisk ? "stoploss" : "manual"}
              onValueChange={value => updatePositionSizingRule(rule.id, { useStopLossRisk: value === "stoploss" })}
            >
              <option value="stoploss">Stop Loss Based</option>
              <option value="manual">Manual</option>
            </Select>
          </div>
          {(!rule.useStopLossRisk) && (
            <div className="space-y-2">
              <Label>Manual Risk per Trade (%)</Label>
              <Input
                type="number"
                value={rule.riskPerTrade || 1}
                onChange={e => updatePositionSizingRule(rule.id, { riskPerTrade: Number.parseFloat(e.target.value) || 1 })}
                min="0.1"
                step="0.1"
                placeholder="e.g. 1"
              />
            </div>
          )}
        </div>
      );
    case "kelly":
      return (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>Win Rate (%)</Label>
            <Input
              type="number"
              value={rule.winRate || 60}
              onChange={e => updatePositionSizingRule(rule.id, { winRate: Number.parseInt(e.target.value) || 60 })}
              min="1"
              max="99"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <Label>Payoff Ratio</Label>
            <Input
              type="number"
              value={rule.payoffRatio || 2}
              onChange={e => updatePositionSizingRule(rule.id, { payoffRatio: Number.parseFloat(e.target.value) || 2 })}
              min="0.1"
              step="0.1"
            />
          </div>
        </div>
      );
    case "volatility-based":
      return (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label>ATR Period</Label>
            <Input
              type="number"
              value={rule.volatilityPeriod || 20}
              onChange={e => updatePositionSizingRule(rule.id, { volatilityPeriod: Number.parseInt(e.target.value) || 20 })}
              min="1"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <Label>ATR Multiplier</Label>
            <Input
              type="number"
              value={rule.volatilityMultiplier || 0.5}
              onChange={e => updatePositionSizingRule(rule.id, { volatilityMultiplier: Number.parseFloat(e.target.value) || 0.5 })}
              min="0.1"
              step="0.1"
            />
          </div>
        </div>
      );
    default:
      return null;
  }
}
