import type { Metadata } from "next"

import StrategyBuilder from "@/components/strategy-builder"

export const metadata: Metadata = {
  title: "Strategy Builder",
  description: "Build your trading strategy visually without code",
}

export default function BuilderPage() {
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Strategy Builder</h1>
        <p className="text-sm sm:text-base text-muted-foreground text-center sm:text-left">Create your trading strategy visually without code</p>
      </div>
      <div className="overflow-x-auto">
        <StrategyBuilder />
      </div>
    </div>
  )
}
