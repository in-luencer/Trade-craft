import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const strategy = await request.json()

    // In a real app, you would save this to a database
    console.log("Saving strategy:", strategy)

    // Simulate a successful save
    return NextResponse.json({
      success: true,
      message: "Strategy saved successfully",
      id: "strategy-" + Date.now(),
    })
  } catch (error) {
    console.error("Error saving strategy:", error)
    return NextResponse.json({ success: false, message: "Failed to save strategy" }, { status: 500 })
  }
}

export async function GET() {
  // In a real app, you would fetch strategies from a database
  return NextResponse.json({
    strategies: [
      {
        id: "strategy-1",
        name: "Moving Average Crossover",
        description: "A simple moving average crossover strategy",
        createdAt: new Date().toISOString(),
      },
      {
        id: "strategy-2",
        name: "RSI Oscillator",
        description: "A strategy based on RSI oversold and overbought conditions",
        createdAt: new Date().toISOString(),
      },
    ],
  })
}
