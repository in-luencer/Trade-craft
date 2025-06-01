"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Strategy {
  name: string
  type: string
  parameters: Record<string, any>
  indicators: string[]
}

interface StrategyContextType {
  strategyName: string
  setStrategyName: (name: string) => void
  strategyId: string
  setStrategyId: (id: string) => void
  isPublic: boolean
  setIsPublic: (isPublic: boolean) => void
  indicators: string[]
  setIndicators: (indicators: string[]) => void
}

const defaultStrategy: Strategy = {
  name: '',
  type: '',
  parameters: {},
  indicators: []
}

const StrategyContext = createContext<StrategyContextType>({
  strategyName: "",
  setStrategyName: () => {},
  strategyId: "",
  setStrategyId: () => {},
  isPublic: false,
  setIsPublic: () => {},
  indicators: [],
  setIndicators: () => {},
})

export function StrategyProvider({ children }: { children: ReactNode }) {
  const [strategyName, setStrategyName] = useState<string>("")
  const [strategyId, setStrategyId] = useState<string>("")
  const [isPublic, setIsPublic] = useState<boolean>(false)
  const [indicators, setIndicators] = useState<string[]>([])

  useEffect(() => {
    const storedStrategyName = localStorage.getItem("strategyName")
    const storedStrategyId = localStorage.getItem("strategyId")
    const storedIsPublic = localStorage.getItem("isPublic") === "true"
    const storedIndicators = localStorage.getItem("indicators")

    if (storedStrategyName) setStrategyName(storedStrategyName)
    if (storedStrategyId) setStrategyId(storedStrategyId)
    if (storedIsPublic) setIsPublic(storedIsPublic)
    if (storedIndicators) setIndicators(JSON.parse(storedIndicators))
  }, [])

  useEffect(() => {
    if (strategyName) localStorage.setItem("strategyName", strategyName)
    if (strategyId) localStorage.setItem("strategyId", strategyId)
    localStorage.setItem("isPublic", isPublic.toString())
    if (indicators.length > 0) localStorage.setItem("indicators", JSON.stringify(indicators))
  }, [strategyName, strategyId, isPublic, indicators])

  return (
    <StrategyContext.Provider
      value={{
        strategyName,
        setStrategyName,
        strategyId,
        setStrategyId,
        isPublic,
        setIsPublic,
        indicators,
        setIndicators,
      }}
    >
      {children}
    </StrategyContext.Provider>
  )
}

export function useStrategy() {
  const context = useContext(StrategyContext)
  if (context === undefined) {
    throw new Error('useStrategy must be used within a StrategyProvider')
  }
  return context
}
