import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

// In-memory storage for strategies (replace with database in production)
let strategies: any[] = []

export async function POST(request: Request) {
  try {
    const strategy = await request.json()
    
    // Generate a unique ID for the strategy
    const id = uuidv4()
    
    // Add metadata
    const strategyWithMetadata = {
      ...strategy,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "active",
      version: 1,
    }

    // Store the strategy
    strategies.push(strategyWithMetadata)

    // Log the complete strategy data
    console.log("Saving strategy:", JSON.stringify(strategyWithMetadata, null, 2))

    // Validate required fields
    if (!strategy.name || !strategy.description) {
      return NextResponse.json(
        { success: false, message: "Strategy name and description are required" },
        { status: 400 }
      )
    }

    // Validate entry/exit rules
    if (!strategy.entryLong?.conditionGroups || !strategy.entryShort?.conditionGroups ||
        !strategy.exitLong?.conditionGroups || !strategy.exitShort?.conditionGroups) {
      return NextResponse.json(
        { success: false, message: "Entry and exit rules are required" },
        { status: 400 }
      )
    }

    // Validate risk management
    if (!strategy.riskManagement) {
      return NextResponse.json(
        { success: false, message: "Risk management configuration is required" },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      message: "Strategy saved successfully",
      id,
      strategy: strategyWithMetadata,
    })
  } catch (error) {
    console.error("Error saving strategy:", error)
    return NextResponse.json(
      { success: false, message: "Failed to save strategy" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // In a real app, you would fetch strategies from a database
    return NextResponse.json({
      success: true,
      strategies: strategies.map(strategy => ({
        id: strategy.id,
        name: strategy.name,
        description: strategy.description,
        entryLong: strategy.entryLong,
        entryShort: strategy.entryShort,
        exitLong: strategy.exitLong,
        exitShort: strategy.exitShort,
        riskManagement: strategy.riskManagement,
        createdAt: strategy.createdAt,
        updatedAt: strategy.updatedAt,
        status: strategy.status,
        version: strategy.version,
      })),
    })
  } catch (error) {
    console.error("Error fetching strategies:", error)
    return NextResponse.json(
      { success: false, message: "Failed to fetch strategies" },
      { status: 500 }
    )
  }
}
