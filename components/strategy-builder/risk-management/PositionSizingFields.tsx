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
            onChange={e => {
              const value = e.target.value === '' ? undefined : Number.parseFloat(e.target.value);
              updatePositionSizingRule(rule.id, { 
                value,
                // Clear all other fields
                equityPercentage: undefined,
                riskPerTrade: undefined,
                winRate: undefined,
                payoffRatio: undefined,
                volatilityPeriod: undefined,
                volatilityMultiplier: undefined
              });
            }}
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
            onChange={e => {
              const value = e.target.value === '' ? undefined : Number.parseFloat(e.target.value);
              updatePositionSizingRule(rule.id, { 
                value,
                // Clear all other fields
                equityPercentage: undefined,
                riskPerTrade: undefined,
                winRate: undefined,
                payoffRatio: undefined,
                volatilityPeriod: undefined,
                volatilityMultiplier: undefined
              });
            }}
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
              value={rule.equityPercentage ?? ''}
              onChange={e => {
                const equityPercentage = e.target.value === '' ? undefined : Number.parseFloat(e.target.value);
                updatePositionSizingRule(rule.id, { 
                  equityPercentage,
                  // Clear all other fields
                  value: undefined,
                  riskPerTrade: undefined,
                  winRate: undefined,
                  payoffRatio: undefined,
                  volatilityPeriod: undefined,
                  volatilityMultiplier: undefined
                });
              }}
              min="0.1"
              step="0.1"
            />
          </div>
        </div>
      );
    case "risk-based":
      return (
        <div className="space-y-4 mt-4">
          {(!rule.useStopLossRisk) && (
            <div className="space-y-2">
              <Label>Manual Risk per Trade (%)</Label>
              <Input
                type="number"
                value={rule.riskPerTrade ?? ''}
                onChange={e => {
                  const riskPerTrade = e.target.value === '' ? undefined : Number.parseFloat(e.target.value);
                  updatePositionSizingRule(rule.id, { 
                    riskPerTrade,
                    // Clear all other fields
                    value: undefined,
                    equityPercentage: undefined,
                    winRate: undefined,
                    payoffRatio: undefined,
                    volatilityPeriod: undefined,
                    volatilityMultiplier: undefined
                  });
                }}
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
              value={rule.winRate ?? ''}
              onChange={e => {
                const winRate = e.target.value === '' ? undefined : Number.parseInt(e.target.value);
                updatePositionSizingRule(rule.id, { 
                  winRate,
                  // Clear all other fields
                  value: undefined,
                  equityPercentage: undefined,
                  riskPerTrade: undefined,
                  volatilityPeriod: undefined,
                  volatilityMultiplier: undefined
                });
              }}
              min="1"
              max="99"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <Label>Payoff Ratio</Label>
            <Input
              type="number"
              value={rule.payoffRatio ?? ''}
              onChange={e => {
                const payoffRatio = e.target.value === '' ? undefined : Number.parseFloat(e.target.value);
                updatePositionSizingRule(rule.id, { 
                  payoffRatio,
                  // Clear all other fields
                  value: undefined,
                  equityPercentage: undefined,
                  riskPerTrade: undefined,
                  volatilityPeriod: undefined,
                  volatilityMultiplier: undefined
                });
              }}
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
              value={rule.volatilityPeriod ?? ''}
              onChange={e => {
                const volatilityPeriod = e.target.value === '' ? undefined : Number.parseInt(e.target.value);
                updatePositionSizingRule(rule.id, { 
                  volatilityPeriod,
                  // Clear all other fields
                  value: undefined,
                  equityPercentage: undefined,
                  riskPerTrade: undefined,
                  winRate: undefined,
                  payoffRatio: undefined
                });
              }}
              min="1"
              step="1"
            />
          </div>
          <div className="space-y-2">
            <Label>ATR Multiplier</Label>
            <Input
              type="number"
              value={rule.volatilityMultiplier ?? ''}
              onChange={e => {
                const volatilityMultiplier = e.target.value === '' ? undefined : Number.parseFloat(e.target.value);
                updatePositionSizingRule(rule.id, { 
                  volatilityMultiplier,
                  // Clear all other fields
                  value: undefined,
                  equityPercentage: undefined,
                  riskPerTrade: undefined,
                  winRate: undefined,
                  payoffRatio: undefined
                });
              }}
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
