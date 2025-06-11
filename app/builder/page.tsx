import type { Metadata } from "next"

import StrategyBuilder from "@/components/strategy-builder"

export const metadata: Metadata = {
  title: "Strategy Builder",
  description: "Build your trading strategy visually without code",
}

export default function BuilderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 space-y-4">
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 animate-fade-in">
              Strategy Builder
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-primary/50 to-primary/20 rounded-full mt-2" />
          </div>
          <p className="text-base sm:text-lg text-muted-foreground/90 text-center sm:text-left max-w-2xl animate-fade-in-up">
            Create your trading strategy visually without code. Design, test, and deploy sophisticated trading algorithms with our intuitive interface.
          </p>
        </div>
        <div className="overflow-x-auto rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm shadow-lg animate-fade-in-up">
          <StrategyBuilder />
        </div>
      </div>
    </div>
  )
}
