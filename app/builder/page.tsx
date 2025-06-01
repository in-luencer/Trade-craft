import type { Metadata } from "next"

import StrategyBuilder from "@/components/strategy-builder"

export const metadata: Metadata = {
  title: "Strategy Builder",
  description: "Build your trading strategy visually without code",
}

export default function BuilderPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Strategy Builder</h1>
        <p className="text-muted-foreground">Create your trading strategy visually without code</p>
      </div>
      <StrategyBuilder />
    </div>
  )
}
