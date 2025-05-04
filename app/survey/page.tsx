"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

export default function SurveyPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3
  const [surveyData, setSurveyData] = useState({
    riskTolerance: "moderate",
    maxDrawdown: [15],
    features: {
      backtesting: true,
      automation: true,
      alerts: false,
      optimization: false,
      portfolio: false,
      reporting: false,
    },
    featureRequest: "",
    existingStrategy: "no",
    strategyDescription: "",
  })

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // When survey is complete, redirect based on existing strategy answer
      if (surveyData.existingStrategy === "yes") {
        router.push("/builder")
      } else {
        router.push("/strategy-choice")
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateSurveyData = (field, value) => {
    setSurveyData({
      ...surveyData,
      [field]: value,
    })
  }

  const updateFeature = (feature, checked) => {
    setSurveyData({
      ...surveyData,
      features: {
        ...surveyData.features,
        [feature]: checked,
      },
    })
  }

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to in_luencer</h1>
        <p className="text-muted-foreground">Let's personalize your experience</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`flex h-2 w-full ${
                index < currentStep ? "bg-primary" : "bg-muted"
              } ${index === 0 ? "rounded-l-full" : ""} ${index === totalSteps - 1 ? "rounded-r-full" : ""}`}
            ></div>
          ))}
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
      </div>

      {/* Step 1: Risk Tolerance */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>What's your risk tolerance?</CardTitle>
            <CardDescription>This helps us customize your risk management settings</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={surveyData.riskTolerance}
              onValueChange={(value) => updateSurveyData("riskTolerance", value)}
            >
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <RadioGroupItem value="conservative" id="conservative" />
                <div className="flex-1">
                  <Label htmlFor="conservative" className="font-medium">
                    Conservative
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I prefer consistent small wins and minimal losses, even if it means smaller overall returns
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <RadioGroupItem value="moderate" id="moderate" />
                <div className="flex-1">
                  <Label htmlFor="moderate" className="font-medium">
                    Moderate
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I'm okay with some losses if it means better overall returns in the long run
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <RadioGroupItem value="aggressive" id="aggressive" />
                <div className="flex-1">
                  <Label htmlFor="aggressive" className="font-medium">
                    Aggressive
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I want high returns and am willing to accept larger drawdowns and volatility
                  </p>
                </div>
              </div>
            </RadioGroup>

            <div className="mt-6 space-y-2">
              <Label>Maximum Drawdown You Can Tolerate</Label>
              <div className="pt-2">
                <Slider
                  value={surveyData.maxDrawdown}
                  onValueChange={(value) => updateSurveyData("maxDrawdown", value)}
                  max={50}
                  step={5}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5% (Very Conservative)</span>
                <span>25% (Moderate)</span>
                <span>50% (Aggressive)</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Your selected max drawdown: <span className="font-medium">{surveyData.maxDrawdown}%</span>
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={nextStep}>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 2: Feature Preferences */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>What features are most important to you?</CardTitle>
            <CardDescription>Select all that apply</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <Checkbox
                  id="backtesting"
                  checked={surveyData.features.backtesting}
                  onCheckedChange={(checked) => updateFeature("backtesting", checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="backtesting" className="font-medium">
                    Advanced Backtesting
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Test strategies against historical data with detailed metrics
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <Checkbox
                  id="automation"
                  checked={surveyData.features.automation}
                  onCheckedChange={(checked) => updateFeature("automation", checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="automation" className="font-medium">
                    Automated Trading
                  </Label>
                  <p className="text-sm text-muted-foreground">Connect to exchanges for automated execution</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <Checkbox
                  id="alerts"
                  checked={surveyData.features.alerts}
                  onCheckedChange={(checked) => updateFeature("alerts", checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="alerts" className="font-medium">
                    Custom Alerts
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for trading opportunities</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <Checkbox
                  id="optimization"
                  checked={surveyData.features.optimization}
                  onCheckedChange={(checked) => updateFeature("optimization", checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="optimization" className="font-medium">
                    Strategy Optimization
                  </Label>
                  <p className="text-sm text-muted-foreground">Automatically find optimal parameters</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <Checkbox
                  id="portfolio"
                  checked={surveyData.features.portfolio}
                  onCheckedChange={(checked) => updateFeature("portfolio", checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="portfolio" className="font-medium">
                    Portfolio Management
                  </Label>
                  <p className="text-sm text-muted-foreground">Manage multiple strategies as a portfolio</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <Checkbox
                  id="reporting"
                  checked={surveyData.features.reporting}
                  onCheckedChange={(checked) => updateFeature("reporting", checked)}
                />
                <div className="flex-1">
                  <Label htmlFor="reporting" className="font-medium">
                    Performance Reporting
                  </Label>
                  <p className="text-sm text-muted-foreground">Detailed reports and analytics on your trading</p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="feature-request">Feature Request (Optional)</Label>
              <Textarea
                id="feature-request"
                placeholder="Is there a feature you'd like to see that's not listed above?"
                value={surveyData.featureRequest}
                onChange={(e) => updateSurveyData("featureRequest", e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Step 3: Existing Strategy */}
      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Do you have an existing trading strategy?</CardTitle>
            <CardDescription>Let us know how to proceed</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={surveyData.existingStrategy}
              onValueChange={(value) => updateSurveyData("existingStrategy", value)}
            >
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <RadioGroupItem value="yes" id="yes-strategy" />
                <div className="flex-1">
                  <Label htmlFor="yes-strategy" className="font-medium">
                    Yes, I have a strategy
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I want to implement my existing strategy in in_luencer
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <RadioGroupItem value="no" id="no-strategy" />
                <div className="flex-1">
                  <Label htmlFor="no-strategy" className="font-medium">
                    No, I need help creating one
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    I'd like to explore pre-built strategies or create a new one
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                <RadioGroupItem value="partial" id="partial-strategy" />
                <div className="flex-1">
                  <Label htmlFor="partial-strategy" className="font-medium">
                    I have some ideas
                  </Label>
                  <p className="text-sm text-muted-foreground">I have a partial strategy that needs refinement</p>
                </div>
              </div>
            </RadioGroup>

            <div className="mt-6 space-y-2">
              <Label htmlFor="strategy-description">Briefly describe your strategy (optional)</Label>
              <Textarea
                id="strategy-description"
                className="w-full rounded-md border p-2"
                rows={4}
                placeholder="E.g., I use moving average crossovers with RSI confirmation..."
                value={surveyData.strategyDescription}
                onChange={(e) => updateSurveyData("strategyDescription", e.target.value)}
              ></Textarea>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>
              Complete <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Feedback Form */}
      <div className="mt-8 rounded-lg border p-4">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <h3 className="font-medium">We Value Your Feedback</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Have suggestions to improve our onboarding process? Let us know!
        </p>
        <Textarea className="mt-2" placeholder="Your feedback helps us improve..." rows={2} />
        <Button variant="outline" size="sm" className="mt-2">
          Submit Feedback
        </Button>
      </div>
    </div>
  )
}
