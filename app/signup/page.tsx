"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, Eye, EyeOff, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()

    // Get form elements
    const form = e.target as HTMLFormElement
    const password = form.password.value

    // Validate password
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/
    if (!passwordRegex.test(password)) {
      alert("Password must be at least 8 characters and contain at least one number")
      return
    }

    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to survey page after signup
      router.push("/survey")
    }, 1500)
  }

  return (
    <div className="container flex h-screen max-w-md items-center justify-center">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="name" placeholder="John Doe" className="pl-9" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="john@example.com" className="pl-9" required />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <span className="text-xs text-muted-foreground">Min 8 characters, at least 1 number</span>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-9"
                  required
                  pattern="^(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$"
                  title="Password must be at least 8 characters and contain at least one number"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary underline underline-offset-4">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
