// Helper component for rendering Time Exit fields
import { TimeExitRule } from "../types";
import { Input } from "../../ui/input";

export function TimeExitFields({ rule, updateTimeExitRule }: { rule: TimeExitRule, updateTimeExitRule: (id: string, updates: Partial<TimeExitRule>) => void }) {
  switch (rule.type) {
    case "bars":
      return (
        <div className="space-y-2 mt-4">
          <label>Number of Bars</label>
          <Input
            type="number"
            value={rule.value}
            onChange={e => updateTimeExitRule(rule.id, { value: Number.parseInt(e.target.value) || 20 })}
            min="1"
            step="1"
          />
        </div>
      );
    case "time":
      return (
        <div className="space-y-2 mt-4">
          <label>Time (HH:MM)</label>
          <Input
            type="time"
            value={new Date(rule.value * 60 * 1000).toISOString().slice(11, 16)}
            onChange={e => {
              const [hours, minutes] = e.target.value.split(':').map(Number);
              if (!isNaN(hours) && !isNaN(minutes)) {
                updateTimeExitRule(rule.id, { value: hours * 60 + minutes });
              }
            }}
          />
        </div>
      );
    case "date":
      return (
        <div className="space-y-2 mt-4">
          <label>Date (YYYY-MM-DD)</label>
          <Input
            type="date"
            value={new Date(rule.value * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            onChange={e => {
              const date = new Date(e.target.value);
              if (!isNaN(date.getTime())) {
                updateTimeExitRule(rule.id, { value: Math.floor(date.getTime() / (24 * 60 * 60 * 1000)) });
              }
            }}
          />
        </div>
      );
    default:
      return null;
  }
}
