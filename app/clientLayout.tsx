"use client"

import type React from "react"
import { useEffect, useState } from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import { usePathname } from "next/navigation"
import emailjs from "@emailjs/browser"
import { emailjsConfig } from "./config/emailjs"

import { ThemeProvider } from "@/components/theme-provider"
import { MobileNav } from "@/components/ui/mobile-nav"
import { MessageSquare } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const inter = Inter({ subsets: ["latin"] })

interface EmailJSResponse {
  status: number;
  text: string;
}

// Updated to send feedback using EmailJS directly
const sendFeedback = async (feedback: string) => {
  try {
    const { serviceId, templateId, publicKey, templateParams } = emailjsConfig;

    // Validate configuration
    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS configuration is incomplete');
    }

    // Initialize EmailJS with error handling
    try {
      await emailjs.init(publicKey);
    } catch (initError) {
      console.error('Failed to initialize EmailJS:', initError);
      throw new Error('Failed to initialize email service');
    }

    const params = {
      ...templateParams,
      message: feedback,
      feedback: feedback,
      email: templateParams.email,
      reply_to: templateParams.reply_to
    };

    console.log('Attempting to send email with params:', params);

    // Send email with timeout
    const response = await Promise.race([
      emailjs.send(serviceId, templateId, params),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Email send timeout')), 10000)
      )
    ]) as EmailJSResponse;

    console.log('EmailJS response:', response);

    if (response && response.status === 200) {
      console.log("Feedback sent successfully!", response);
      alert("Thank you for your feedback!");
    } else {
      throw new Error(`EmailJS returned unexpected response: ${JSON.stringify(response)}`);
    }
  } catch (error: unknown) {
    console.error("Failed to send feedback:", error);
    let errorMessage = "An unexpected error occurred. Please try again later.";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object') {
      errorMessage = JSON.stringify(error);
    }
    
    alert(`Failed to send feedback: ${errorMessage}`);
  }
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Determine if the current route is an authenticated route
  useEffect(() => {
    const authenticatedRoutes = [
      "/dashboard",
      "/builder",
      "/backtest",
      "/marketplace",
      "/settings",
      "/survey",
      "/strategy-choice",
      "/backtest-satisfaction",
    ]

    const isAuthRoute = authenticatedRoutes.some((route) => pathname?.startsWith(route))
    const isAuthPage = pathname === "/login" || pathname === "/signup"

    setIsAuthenticated(isAuthRoute && !isAuthPage)
  }, [pathname])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen">
        {/* Public header - only shown on public pages */}
        {!isAuthenticated && pathname !== "/login" && pathname !== "/signup" && (
          <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
              <Link href="/" className="flex items-center space-x-3 group">
                {/* Candlestick chart icon as SVG */}
                <span className="inline-flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="20" width="3" height="10" rx="1.5" fill="#2196F3"/>
                    <rect x="13" y="14" width="3" height="10" rx="1.5" fill="#2196F3"/>
                    <rect x="18" y="8" width="3" height="10" rx="1.5" fill="#2196F3"/>
                    <rect x="23" y="8" width="3" height="10" rx="1.5" fill="#F44336"/>
                    <rect x="28" y="14" width="3" height="10" rx="1.5" fill="#F44336"/>
                    <rect x="33" y="20" width="3" height="10" rx="1.5" fill="#F44336"/>
                  </svg>
                </span>
                <span className="font-extrabold text-xl tracking-tight text-foreground">Trade Crafter</span>
              </Link>
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary underline-offset-4 hover:underline px-2 py-1 rounded-md">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 shadow-none"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </header>
        )}

        {/* Authenticated header - only shown on authenticated pages */}
        {isAuthenticated && (
          <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
              <div className="flex items-center gap-6">
                <Link href="/dashboard" className="flex items-center space-x-3 group">
                  {/* Candlestick chart icon as SVG */}
                  <span className="inline-flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="20" width="3" height="10" rx="1.5" fill="#2196F3"/>
                      <rect x="13" y="14" width="3" height="10" rx="1.5" fill="#2196F3"/>
                      <rect x="18" y="8" width="3" height="10" rx="1.5" fill="#2196F3"/>
                      <rect x="23" y="8" width="3" height="10" rx="1.5" fill="#F44336"/>
                      <rect x="28" y="14" width="3" height="10" rx="1.5" fill="#F44336"/>
                      <rect x="33" y="20" width="3" height="10" rx="1.5" fill="#F44336"/>
                    </svg>
                  </span>
                  <span className="font-extrabold text-xl tracking-tight text-foreground">Trade Crafter</span>
                </Link>
                <nav className="hidden items-center space-x-5 text-sm font-medium md:flex">
                  <Link href="/dashboard" className="transition-colors hover:text-primary underline-offset-4 hover:underline px-2 py-1 rounded-md">
                    Dashboard
                  </Link>
                  <Link href="/marketplace" className="transition-colors hover:text-primary underline-offset-4 hover:underline px-2 py-1 rounded-md">
                    Marketplace
                  </Link>
                  <Link href="/builder" className="transition-colors hover:text-primary underline-offset-4 hover:underline px-2 py-1 rounded-md">
                    Builder
                  </Link>
                  <Link href="/backtest" className="transition-colors hover:text-primary underline-offset-4 hover:underline px-2 py-1 rounded-md">
                    Backtest
                  </Link>
                  <Link href="/settings" className="transition-colors hover:text-primary underline-offset-4 hover:underline px-2 py-1 rounded-md">
                    Settings
                  </Link>
                </nav>
              </div>
              <div className="flex-1 md:hidden">
                <MobileNav />
              </div>
            </div>
          </header>
        )}

        {children}

        {/* Feedback Form */}
        <div className="mt-8 rounded-lg border p-6 max-w-lg mx-auto">
          <div className="flex items-center space-x-3">
            <MessageSquare className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">We Value Your Feedback</h3>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Have suggestions to improve our onboarding process? Let us know!
          </p>
          <Textarea
            id="feedback-textarea"
            className="mt-3 w-full resize-none"
            placeholder="Your feedback helps us improve..."
            rows={4}
          />
          <Button
            variant="outline"
            size="default"
            className="mt-3 w-full"
            onClick={() => {
              const feedbackElement = document.getElementById("feedback-textarea") as HTMLTextAreaElement
              const feedback = feedbackElement?.value || ""
              if (feedback.trim()) {
                sendFeedback(feedback)
              } else {
                alert("Please enter your feedback before submitting.")
              }
            }}
          >
            Submit Feedback
          </Button>
        </div>
      </div>
    </ThemeProvider>
  )
}
