// Helper hooks for risk management rule operations
import { useCallback } from "react";
import { RiskManagementConfig, StopLossRule, TakeProfitRule, TrailingStopRule, TimeExitRule, PositionSizingRule } from "../types";

export function useStopLossRules(config: RiskManagementConfig, updateConfig: (c: Partial<RiskManagementConfig>) => void) {
  const add = useCallback(() => {
    const newRule: StopLossRule = { id: `sl-${Date.now()}`, type: "percentage", value: 2, enabled: true };
    updateConfig({ stopLoss: [...config.stopLoss, newRule] });
  }, [config, updateConfig]);
  const update = useCallback((id: string, updates: Partial<StopLossRule>) => {
    updateConfig({ stopLoss: config.stopLoss.map(rule => rule.id === id ? { ...rule, ...updates } : rule) });
  }, [config, updateConfig]);
  const remove = useCallback((id: string) => {
    updateConfig({ stopLoss: config.stopLoss.filter(rule => rule.id !== id) });
  }, [config, updateConfig]);
  return { add, update, remove };
}

export function useTakeProfitRules(config: RiskManagementConfig, updateConfig: (c: Partial<RiskManagementConfig>) => void) {
  const add = useCallback(() => {
    const newRule: TakeProfitRule = { id: `tp-${Date.now()}`, type: "percentage", value: 5, enabled: true };
    updateConfig({ takeProfit: [...config.takeProfit, newRule] });
  }, [config, updateConfig]);
  const update = useCallback((id: string, updates: Partial<TakeProfitRule>) => {
    updateConfig({ takeProfit: config.takeProfit.map(rule => rule.id === id ? { ...rule, ...updates } : rule) });
  }, [config, updateConfig]);
  const remove = useCallback((id: string) => {
    updateConfig({ takeProfit: config.takeProfit.filter(rule => rule.id !== id) });
  }, [config, updateConfig]);
  return { add, update, remove };
}

export function useTrailingStopRules(config: RiskManagementConfig, updateConfig: (c: Partial<RiskManagementConfig>) => void) {
  const add = useCallback(() => {
    const newRule: TrailingStopRule = { id: `ts-${Date.now()}`, type: "percentage", value: 1.5, enabled: true };
    updateConfig({ trailingStop: [...config.trailingStop, newRule] });
  }, [config, updateConfig]);
  const update = useCallback((id: string, updates: Partial<TrailingStopRule>) => {
    updateConfig({ trailingStop: config.trailingStop.map(rule => rule.id === id ? { ...rule, ...updates } : rule) });
  }, [config, updateConfig]);
  const remove = useCallback((id: string) => {
    updateConfig({ trailingStop: config.trailingStop.filter(rule => rule.id !== id) });
  }, [config, updateConfig]);
  return { add, update, remove };
}

export function useTimeExitRules(config: RiskManagementConfig, updateConfig: (c: Partial<RiskManagementConfig>) => void) {
  const add = useCallback(() => {
    const newRule: TimeExitRule = { id: `te-${Date.now()}`, type: "bars", value: 20, enabled: true };
    updateConfig({ timeExit: [...config.timeExit, newRule] });
  }, [config, updateConfig]);
  const update = useCallback((id: string, updates: Partial<TimeExitRule>) => {
    updateConfig({ timeExit: config.timeExit.map(rule => rule.id === id ? { ...rule, ...updates } : rule) });
  }, [config, updateConfig]);
  const remove = useCallback((id: string) => {
    updateConfig({ timeExit: config.timeExit.filter(rule => rule.id !== id) });
  }, [config, updateConfig]);
  return { add, update, remove };
}

export function usePositionSizingRules(config: RiskManagementConfig, updateConfig: (c: Partial<RiskManagementConfig>) => void) {
  const add = useCallback(() => {
    const newRule: PositionSizingRule = { id: `ps-${Date.now()}`, type: "percentage", value: 2, maxRisk: 2, enabled: true };
    updateConfig({ positionSizing: [...config.positionSizing, newRule] });
  }, [config, updateConfig]);
  const update = useCallback((id: string, updates: Partial<PositionSizingRule>) => {
    updateConfig({ positionSizing: config.positionSizing.map(rule => rule.id === id ? { ...rule, ...updates } : rule) });
  }, [config, updateConfig]);
  const remove = useCallback((id: string) => {
    updateConfig({ positionSizing: config.positionSizing.filter(rule => rule.id !== id) });
  }, [config, updateConfig]);
  return { add, update, remove };
}
