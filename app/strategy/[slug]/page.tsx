import Link from "next/link"
import { Button } from "@/components/ui/button"
import StrategyProductClient from "./StrategyProductClient"

// Dummy data for demonstration; replace with real data fetching logic
const STRATEGY_DATA = {
  "premium-ma-crossover": {
    title: "Premium Moving Average Crossover",
    badge: "Premium",
    description: "A refined trend-following strategy with advanced risk management.",
    rating: 4.9,
    reviews: 128,
    features: [
      "Advanced trend-following logic",
      "Dynamic risk management",
      "Optimized for multiple markets",
      "Easy integration with Trade Crafter platform"
    ],
    stats: [
      { icon: "TrendingUp", label: "Win Rate", value: "72%" },
      { icon: "Shield", label: "Max Drawdown", value: "4.2%" },
      { icon: "Zap", label: "Avg. Trades/Month", value: "18" },
      { icon: "Star", label: "User Rating", value: "4.9/5" }
    ],
    price: "$49.99",
    image: "/logo.png"
  },
  "rsi-momentum": {
    title: "RSI Momentum Strategy",
    badge: "Popular",
    description: "Sophisticated RSI-based strategy for momentum trading.",
    rating: 4.8,
    reviews: 95,
    features: [
      "Momentum detection using RSI",
      "Customizable parameters",
      "Backtested on multiple assets",
      "Real-time alerts"
    ],
    stats: [
      { icon: "TrendingUp", label: "Win Rate", value: "68%" },
      { icon: "Shield", label: "Max Drawdown", value: "5.1%" },
      { icon: "Zap", label: "Avg. Trades/Month", value: "22" },
      { icon: "Star", label: "User Rating", value: "4.8/5" }
    ],
    price: "$39.99",
    image: "/logo.png"
  },
  "macd-divergence": {
    title: "MACD Divergence Strategy",
    badge: "New",
    description: "Advanced MACD divergence strategy for market reversals.",
    rating: 4.7,
    reviews: 64,
    features: [
      "Professional trend reversal detection",
      "MACD-based entry/exit logic",
      "Risk management included",
      "Detailed documentation"
    ],
    stats: [
      { icon: "TrendingUp", label: "Win Rate", value: "65%" },
      { icon: "Shield", label: "Max Drawdown", value: "6.0%" },
      { icon: "Zap", label: "Avg. Trades/Month", value: "15" },
      { icon: "Star", label: "User Rating", value: "4.7/5" }
    ],
    price: "$29.99",
    image: "/logo.png"
  }
}

// Next.js 15+ expects params to be a Promise<{ slug: string }>
// so we need to make the prop type: { params: Promise<{ slug: string }> }
// and await params

export default async function StrategyProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const staticProduct = STRATEGY_DATA[slug as keyof typeof STRATEGY_DATA]

  if (!staticProduct) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Strategy Not Found</h1>
        <p className="text-muted-foreground mb-6">The strategy you are looking for does not exist.</p>
        <Button asChild>
          <Link href="/marketplace">Back to Marketplace</Link>
        </Button>
      </div>
    )
  }

  return <StrategyProductClient params={{ slug }} staticProduct={staticProduct} />
}
