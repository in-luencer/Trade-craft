import Link from "next/link"
import {
  ArrowRight,
  BarChart4,
  Bot,
  LineChartIcon as ChartLine,
  Clock,
  DollarSign,
  LineChart,
  Shield,
  TrendingUp,
  Lock,
  CheckCircle,
  Users,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Build <span className="text-primary">Trading Strategies</span> Without Code
                </h1>
                <p className="mt-6 max-w-md text-lg text-muted-foreground">
                  Create, backtest, and deploy professional trading strategies with our visual builder. No coding
                  required.
                </p>
              </div>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <Shield className="mr-1 h-4 w-4 text-primary" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4 text-primary" />
                  <span>Setup in Minutes</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-primary" />
                  <span>Free to Start</span>
                </div>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
              <div className="relative rounded-lg border bg-card p-4 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Strategy Performance</h3>
                  <span className="text-sm text-muted-foreground">Last 30 days</span>
                </div>
                <div className="h-64 rounded-md bg-muted p-4">
                  <div className="flex h-full items-center justify-center">
                    <LineChart className="h-32 w-32 text-primary/40" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="rounded-md bg-primary/10 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Win Rate</p>
                    <p className="text-lg font-bold text-primary">68.5%</p>
                  </div>
                  <div className="rounded-md bg-primary/10 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Profit</p>
                    <p className="text-lg font-bold text-primary">+24.5%</p>
                  </div>
                  <div className="rounded-md bg-primary/10 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Trades</p>
                    <p className="text-lg font-bold text-primary">54</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How in_luencer Works</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Build, test, and deploy your trading strategies in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-2 border-primary/10">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">1. Build Your Strategy</h3>
                <p className="text-muted-foreground">
                  Use our visual builder to create trading strategies with technical indicators, entry/exit rules, and
                  risk management.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/10">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BarChart4 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">2. Backtest & Optimize</h3>
                <p className="text-muted-foreground">
                  Test your strategy against historical data to validate performance and optimize parameters for better
                  results.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/10">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">3. Deploy & Automate</h3>
                <p className="text-muted-foreground">
                  Deploy your strategy to receive trading signals or connect to exchanges for fully automated trading.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Why Choose in_luencer</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The all-in-one platform for traders of all experience levels
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <ChartLine className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">No Coding Required</h3>
              <p className="text-muted-foreground">
                Build complex strategies with our intuitive visual interface, no programming skills needed.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Advanced Risk Management</h3>
              <p className="text-muted-foreground">
                Protect your capital with sophisticated risk management tools tailored to your risk tolerance.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <BarChart4 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Comprehensive Backtesting</h3>
              <p className="text-muted-foreground">
                Test your strategies against historical data with detailed performance metrics and analysis.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Automated Trading</h3>
              <p className="text-muted-foreground">
                Connect to popular exchanges and automate your trading strategies or receive custom alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <div className="relative h-full w-full overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-primary/10"></div>
                <div className="flex h-full items-center justify-center">
                  <User className="h-32 w-32 text-primary/40" />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-3xl font-bold">Our Founder's Story</h2>
              <p className="mb-6 text-muted-foreground">
              I was you—a beginner trader losing money with every random YouTube strategy I tried. I’d stare at charts for hours, hoping for a breakthrough... but all I got was emotional burnout and a blown-up account.
              I knew there had to be a better way.
              </p>
              <p className="mb-6 text-muted-foreground">
              So I locked in. I studied the markets, mastered Pine Script, and built my own custom strategies. No noise. No hype. Just data-backed logic. The results? I finally started winning consistently—and with control.
              Now, I’ve turned that same system into a tool.</p>
              <p className="mb-6 text-muted-foreground">
               A SaaS platform built for traders like you—so you never have to trade blindly again.
              No more guesswork. Just your strategy. Your rules. Your edge.
              Let’s flip the script—together.
              </p>
              <p className="font-medium">- Anandhu, Founder & CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced with Urgency */}
      <section className="bg-primary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to Transform Your Trading?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Join thousands of traders who have improved their results with in_luencer's strategy builder and backtesting
            tools.
          </p>
          <div className="mx-auto mt-6 max-w-md rounded-lg border border-primary/20 bg-card p-4 shadow-lg">
            <div className="mb-4 flex items-center justify-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Limited Time Offer</span>
            </div>
            <p className="mb-4 text-center font-medium">
              Only <span className="text-primary">7 free strategy templates</span> left this month!
            </p>
            <div className="mt-4 flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">No credit card required. Free plan available.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-bold">in_luencer</h3>
              <p className="text-sm text-muted-foreground">
                The all-in-one platform for creating, testing, and deploying trading strategies without code.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} in_luencer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
