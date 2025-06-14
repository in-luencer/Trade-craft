'use client'

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowRight, Star, Shield, Zap, TrendingUp, BarChart4, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Stat {
  icon: any
  label: string
  value: string
}

interface Strategy {
  title: string
  badge: string
  description: string
  rating: number
  reviews: number
  features: string[]
  stats: Stat[]
  price: string
  image: string
  slug?: string
  faqs?: Array<{ question: string; answer: string }>
  videos?: string[] // <-- add videos property
}

interface StrategyProductClientProps {
  params: { slug: string }
  staticProduct: Strategy
  previewData?: Strategy
}

export default function StrategyProductClient({ params, staticProduct, previewData }: StrategyProductClientProps) {
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    async function fetchStrategies() {
      try {
        // TODO: Implement getUploadedStrategies
        const uploaded: Strategy[] = [] // await getUploadedStrategies()
        setStrategies([
          { ...staticProduct, slug: params.slug },
          ...uploaded,
        ])
      } catch (error) {
        console.error('Error fetching strategies:', error)
      }
    }
    fetchStrategies()
  }, [params.slug, staticProduct])

  // Use preview data if available, otherwise use the found strategy or static product
  const product = previewData || strategies.find(s => s.slug === params.slug) || staticProduct

  // Icon mapping for stats
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    TrendingUp,
    Shield,
    Zap,
    Star,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-0 pt-20 sm:pt-28">
        <div className="container relative mx-auto flex flex-col items-center justify-center px-4 text-center">
          <div className="mb-8 flex flex-col items-center gap-4">
            {/* Full-width product image banner, scrollable horizontally on mobile */}
            <div className="w-full max-w-5xl mx-auto mb-6">
              <div className="flex flex-row gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent snap-x pb-4">
                {/* Photo on the left, always visible first */}
                <div className="flex-none flex items-center justify-center w-[350px] aspect-[9/12] bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 rounded-3xl overflow-hidden snap-start relative z-10 shadow-2xl">
                  {mounted ? (
                    <img src={product.image.replace('logo.png', 'placeholder.jpg')} alt={product.title} className="w-full h-full object-cover object-center" />
                  ) : (
                    <div className="w-full h-full bg-zinc-800 animate-pulse" />
                  )}
                </div>
                {/* Video on the right, only visible when scrolled */}
                {Array.isArray(product.videos) && product.videos.length > 0 && (
                  <div className="flex-none flex items-center justify-center w-[350px] aspect-[9/12] bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 rounded-3xl overflow-hidden snap-end relative shadow-2xl">
                    {mounted ? (
                      <video src={product.videos[0]} controls className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 animate-pulse" />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{product.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-yellow-400 via-primary to-purple-400 bg-clip-text text-transparent drop-shadow-xl">
              {product.title}
            </h1>
            {/* Use only the product.description from props */}
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
                    {iconMap[stat.icon] ? (
                      React.createElement(iconMap[stat.icon], { className: "h-8 w-8 text-yellow-400 mb-2" })
                    ) : null}
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
            {product.features?.map((feature: string, idx: number) => (
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
        <div className="max-w-2xl mx-auto bg-primary/5 rounded-2xl shadow-lg p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <img src="/placeholder-user.jpg" alt="Owner" className="h-20 w-20 rounded-full object-cover border-4 border-primary/30 shadow" />
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold mb-1">Alex Morgan</h3>
              <p className="text-zinc-300 mb-2">Lead Quantitative Strategist & Founder</p>
              <p className="text-zinc-400 text-base">Alex is a seasoned trader and developer with over 10 years of experience in building algorithmic trading systems. His strategies have helped thousands of traders achieve consistent results in various markets.</p>
            </div>
          </div>
          <div className="border-t border-primary/10 pt-6">
            <h2 className="text-xl font-bold text-black-300 mb-4">Contact the Owner</h2>
            <form className="flex flex-col gap-3">
              <textarea placeholder="Your message to the owner..." className="rounded-md border border-zinc-300 px-4 py-2 min-h-[80px] bg-transparent text-zinc-100" required />
              <Button type="submit" className="w-full mt-2 bg-primary/90 hover:bg-primary/70">Send Message</Button>
            </form>
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
              <p className="text-zinc-300">"This strategy changed my trading game. The risk management is top-notch and results are consistent."</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-6 shadow flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-1">
                <img src="/placeholder-user.jpg" alt="User" className="h-8 w-8 rounded-full object-cover" />
                <span className="font-semibold text-zinc-200">Michael T.</span>
                <span className="text-xs text-yellow-400 flex items-center gap-1 ml-2">{[...Array(5)].map((_,i)=>(<Star key={i} className="h-3 w-3" />))} 5.0</span>
              </div>
              <p className="text-zinc-300">"Easy to use and very effective. I love the transparency and the support from the creator."</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 via-primary to-purple-400 bg-clip-text text-transparent">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {product.faqs?.map((faq: { question: string; answer: string }, idx: number) => (
              <details key={idx} className="rounded-lg bg-primary/10 p-4 group" open={idx === 0}>
                <summary className="font-semibold mb-1 cursor-pointer text-zinc-100 group-open:mb-2">{faq.question}</summary>
                <p className="text-zinc-300">{faq.answer}</p>
              </details>
            ))}
            {/* fallback for static FAQ if no faqs */}
            {!product.faqs && (
              <>
                <details className="rounded-lg bg-primary/10 p-4 group" open>
                  <summary className="font-semibold mb-1 cursor-pointer text-zinc-100 group-open:mb-2">How do I install and use this strategy?</summary>
                  <p className="text-zinc-300">After purchase, you'll receive step-by-step instructions and support to integrate the strategy with your Trade Crafter account.</p>
                </details>
                <details className="rounded-lg bg-primary/10 p-4 group">
                  <summary className="font-semibold mb-1 cursor-pointer text-zinc-100 group-open:mb-2">Is there a refund policy?</summary>
                  <p className="text-zinc-300">Yes, we offer a 7-day money-back guarantee if you're not satisfied with the results.</p>
                </details>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="w-full flex justify-center py-12 bg-gradient-to-r from-yellow-400 via-primary to-purple-400 border-t border-zinc-200">
        <Button size="lg" className="text-lg px-8 py-4 font-bold shadow-lg bg-zinc-900 text-white hover:text-zinc-800 hover:bg-gradient-to-r from-yellow-400 via-primary to-purple-400 transition-transform">
          Purchase for {product.price}
        </Button>
      </div>

      {/* Report Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-2xl shadow-lg p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-red-900 mb-2">Report the strategy</h2>
          <form className="flex flex-col gap-3">
            <input type="text" placeholder="Your Name" className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 bg-white" required />
            <input type="email" placeholder="Your Email" className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 bg-white" required />
            <textarea placeholder="Describe your complaint..." className="rounded-md border border-zinc-300 px-4 py-2 text-zinc-900 bg-white min-h-[80px]" required />
            <Button type="submit" variant="destructive" className="w-full mt-2">Submit Complaint</Button>
          </form>
        </div>
      </section>
    </div>
  )
}
