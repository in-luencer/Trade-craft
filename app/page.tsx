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

      {/* Testimonials Section - Enhanced */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Real Results from Our Users</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of traders who have improved their trading with in_luencer
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 h-12 w-12 rounded-full bg-primary/20"></div>
                  <div>
                    <h4 className="font-bold">Michael T.</h4>
                    <p className="text-sm text-muted-foreground">Day Trader</p>
                  </div>
                </div>
                <div className="mb-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "in_luencer has completely transformed my trading. I've gone from inconsistent results to a structured
                  approach with measurable performance. My win rate increased by 32% in just 3 months!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 h-12 w-12 rounded-full bg-primary/20"></div>
                  <div>
                    <h4 className="font-bold">Sarah K.</h4>
                    <p className="text-sm text-muted-foreground">Swing Trader</p>
                  </div>
                </div>
                <div className="mb-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "As someone with no coding experience, I never thought I could create automated strategies. in_luencer
                  made it possible and my results speak for themselves. I'm up 28% YTD using their templates!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center">
                  <div className="mr-4 h-12 w-12 rounded-full bg-primary/20"></div>
                  <div>
                    <h4 className="font-bold">David R.</h4>
                    <p className="text-sm text-muted-foreground">Crypto Trader</p>
                  </div>
                </div>
                <div className="mb-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-primary" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground">
                  "The backtesting capabilities are incredible. I've optimized my strategies to perform in different
                  market conditions with confidence. My drawdowns are now 65% smaller than before!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-full bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Bank-Level Security</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-full bg-primary/10 p-3">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Data Protection</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">Verified Results</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">10,000+ Users</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-2 rounded-full bg-primary/10 p-3">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">24/7 Support</span>
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
                After losing over $50,000 in the markets due to emotional trading and lack of a systematic approach, our
                founder set out to create a platform that would help traders of all levels build, test, and deploy
                professional trading strategies without needing to code.
              </p>
              <p className="mb-6 text-muted-foreground">
                "I created in_luencer to solve the problems I faced as a trader. I wanted to make algorithmic trading
                accessible to everyone, not just programmers and quants. Today, thousands of traders use our platform to
                trade with confidence and consistency."
              </p>
              <p className="font-medium">- Alex Chen, Founder & CEO</p>
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
