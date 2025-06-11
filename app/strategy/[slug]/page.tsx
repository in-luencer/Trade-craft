import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Star, Shield, Zap, TrendingUp, BarChart4, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Strategy Product | Trade Crafter",
  description: "Premium trading strategy details and purchase page."
}

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
      { icon: TrendingUp, label: "Win Rate", value: "72%" },
      { icon: Shield, label: "Max Drawdown", value: "4.2%" },
      { icon: Zap, label: "Avg. Trades/Month", value: "18" },
      { icon: Star, label: "User Rating", value: "4.9/5" }
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
      { icon: TrendingUp, label: "Win Rate", value: "68%" },
      { icon: Shield, label: "Max Drawdown", value: "5.1%" },
      { icon: Zap, label: "Avg. Trades/Month", value: "22" },
      { icon: Star, label: "User Rating", value: "4.8/5" }
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
      { icon: TrendingUp, label: "Win Rate", value: "65%" },
      { icon: Shield, label: "Max Drawdown", value: "6.0%" },
      { icon: Zap, label: "Avg. Trades/Month", value: "15" },
      { icon: Star, label: "User Rating", value: "4.7/5" }
    ],
    price: "$29.99",
    image: "/logo.png"
  }
}

export default function StrategyProductPage({ params }: { params: { slug: string } }) {
  const product = STRATEGY_DATA[params.slug as keyof typeof STRATEGY_DATA]

  if (!product) {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-0 pt-20 sm:pt-28">
        <div className="container relative mx-auto flex flex-col items-center justify-center px-4 text-center">
          <div className="mb-8 flex flex-col items-center gap-4">
            {/* Full-width product image banner, scrollable horizontally on mobile */}
            <div className="w-full max-w-5xl mx-auto overflow-x-auto rounded-2xl shadow-xl mb-6 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
              <img src={product.image.replace('logo.png', 'placeholder.jpg')} alt={product.title} className="w-full h-64 sm:h-80 object-cover object-center min-w-[600px]" />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{product.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-primary to-purple-400 bg-clip-text text-transparent drop-shadow-xl">
              {product.title}
            </h1>
            <p className="max-w-2xl text-lg sm:text-xl text-muted-foreground font-medium">
              {product.description}
            </p>
            {/* Brief Description */}
            <p className="max-w-2xl text-base sm:text-lg text-zinc-300 mt-2">
              Unlock the full potential of your trading with this expertly crafted strategy, designed for both beginners and professionals seeking consistent results and robust risk management.
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
              ))}
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button size="lg" className="text-lg px-8 py-4 font-bold shadow-lg bg-gradient-to-r from-yellow-400 via-primary to-purple-400 text-zinc-900 hover:scale-105 transition-transform">
                Purchase for {product.price}
              </Button>
            </div>
          </div>
          {/* Scrollable stats section */}
          <div className="mt-12 flex flex-col items-center gap-6 w-full max-w-3xl">
            <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent">
              <div className="flex gap-6 min-w-[600px] sm:min-w-0 sm:grid sm:grid-cols-4 w-full">
                {product.stats.map((stat, idx) => (
                  <div key={idx} className="rounded-2xl bg-gradient-to-br from-primary/10 to-[#23233a]/40 p-6 shadow-lg flex flex-col items-center min-w-[140px]">
                    <stat.icon className="h-8 w-8 text-yellow-400 mb-2" />
                    <span className="text-xl font-bold">{stat.value}</span>
                    <span className="text-sm text-zinc-400">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 via-primary to-purple-400 bg-clip-text text-transparent">What makes this strategy premium?</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-4 rounded-xl bg-gradient-to-br from-primary/10 to-[#23233a]/40 p-6 shadow-lg">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                  <BarChart4 className="h-6 w-6 text-yellow-500" />
                </div>
                <span className="text-lg font-semibold text-zinc-100">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Owner Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-primary/5 rounded-2xl shadow-lg p-8 flex flex-col sm:flex-row items-center gap-6">
          <img src="/placeholder-user.jpg" alt="Owner" className="h-20 w-20 rounded-full object-cover border-4 border-primary/30 shadow" />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-xl font-bold mb-1">Alex Morgan</h3>
            <p className="text-zinc-300 mb-2">Lead Quantitative Strategist & Founder</p>
            <p className="text-zinc-400 text-base">Alex is a seasoned trader and developer with over 10 years of experience in building algorithmic trading systems. His strategies have helped thousands of traders achieve consistent results in various markets.</p>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">What users are saying</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl bg-primary/10 p-6 shadow flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <img src="/placeholder-user.jpg" alt="User" className="h-8 w-8 rounded-full object-cover" />
                <span className="font-semibold text-zinc-200">Priya S.</span>
                <span className="text-xs text-yellow-400 flex items-center gap-1 ml-2">{[...Array(5)].map((_,i)=>(<Star key={i} className="h-3 w-3" />))} 5.0</span>
              </div>
              <p className="text-zinc-300">“This strategy changed my trading game. The risk management is top-notch and results are consistent.”</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-6 shadow flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <img src="/placeholder-user.jpg" alt="User" className="h-8 w-8 rounded-full object-cover" />
                <span className="font-semibold text-zinc-200">Michael T.</span>
                <span className="text-xs text-yellow-400 flex items-center gap-1 ml-2">{[...Array(5)].map((_,i)=>(<Star key={i} className="h-3 w-3" />))} 5.0</span>
              </div>
              <p className="text-zinc-300">“Easy to use and very effective. I love the transparency and the support from the creator.”</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (Dropdown/Accordion) */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 via-primary to-purple-400 bg-clip-text text-transparent">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <details className="rounded-lg bg-primary/10 p-4 group" open>
              <summary className="font-semibold mb-1 cursor-pointer text-zinc-100 group-open:mb-2">How do I install and use this strategy?</summary>
              <p className="text-zinc-300">After purchase, you’ll receive step-by-step instructions and support to integrate the strategy with your Trade Crafter account.</p>
            </details>
            <details className="rounded-lg bg-primary/10 p-4 group">
              <summary className="font-semibold mb-1 cursor-pointer text-zinc-100 group-open:mb-2">Is there a refund policy?</summary>
              <p className="text-zinc-300">Yes, we offer a 7-day money-back guarantee if you’re not satisfied with the results.</p>
            </details>
            <details className="rounded-lg bg-primary/10 p-4 group">
              <summary className="font-semibold mb-1 cursor-pointer text-zinc-100 group-open:mb-2">Can I customize the strategy parameters?</summary>
              <p className="text-zinc-300">Absolutely! All strategies are fully customizable to fit your trading style and risk tolerance.</p>
            </details>
            <details className="rounded-lg bg-primary/10 p-4 group">
              <summary className="font-semibold mb-1 cursor-pointer text-zinc-100 group-open:mb-2">Do I get updates if the strategy improves?</summary>
              <p className="text-zinc-300">Yes, you’ll receive free updates and improvements for all purchased strategies.</p>
            </details>
          </div>
        </div>
      </section>

      {/* Message Owner Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-primary/5 rounded-2xl shadow-lg p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-zinc-900 mb-2">Contact the Owner</h2>
          <form className="flex flex-col gap-3">
            <input type="text" placeholder="Your Name" className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 bg-white" required />
            <input type="email" placeholder="Your Email" className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 bg-white" required />
            <textarea placeholder="Your message to the owner..." className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 bg-white min-h-[80px]" required />
            <Button type="submit" className="w-full mt-2">Send Message</Button>
          </form>
        </div>
      </section>

      {/* Report Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-2xl shadow-lg p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-red-700 mb-2">Report or File a Complaint</h2>
          <form className="flex flex-col gap-3">
            <input type="text" placeholder="Your Name" className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 bg-white" required />
            <input type="email" placeholder="Your Email" className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 bg-white" required />
            <textarea placeholder="Describe your complaint..." className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 bg-white min-h-[80px]" required />
            <Button type="submit" variant="destructive" className="w-full mt-2">Submit Complaint</Button>
          </form>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="w-full flex justify-center py-12 bg-gradient-to-r from-yellow-400 via-primary to-purple-400 border-t border-zinc-200">
        <Button size="lg" className="text-lg px-8 py-4 font-bold shadow-lg bg-zinc-900 text-white hover:scale-105 transition-transform">
          Purchase for {product.price}
        </Button>
      </div>
    </div>
  )
}
