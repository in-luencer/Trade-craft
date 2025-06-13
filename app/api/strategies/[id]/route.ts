// Next.js 15+ expects the context.params to be a Promise<SegmentParams> (see .next/types/app/api/strategies/[id]/route.ts)
// So we need to make the context param type as { params: Promise<{ id: string }> }
// and await context.params.id

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Helper to get id from context.params (which is a Promise)
async function getId(context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  return params.id
}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const id = await getId(context)

    // In a real app, you would fetch this from a database
    // For now, return a mock strategy
    return NextResponse.json({
      id,
      name: "Sample Strategy",
      description: "This is a sample strategy",
      entryLong: {
        id: "entry-long-1",
        conditionGroups: [
          {
            id: "group-1",
            conditions: [
              {
                id: "condition-1",
                indicator: "rsi",
                parameter: "value",
                logic: "less_than",
                value: "30",
                timeframe: "1d",
              },
            ],
            operator: "OR",
          },
        ],
      },
      entryShort: {
        id: "entry-short-1",
        conditionGroups: [
          {
            id: "group-1",
            conditions: [
              {
                id: "condition-1",
                indicator: "rsi",
                parameter: "value",
                logic: "greater_than",
                value: "70",
                timeframe: "1d",
              },
            ],
            operator: "OR",
          },
        ],
      },
      exitLong: {
        id: "exit-long-1",
        conditionGroups: [
          {
            id: "group-1",
            conditions: [
              {
                id: "condition-1",
                indicator: "rsi",
                parameter: "value",
                logic: "greater_than",
                value: "70",
                timeframe: "1d",
              },
            ],
            operator: "OR",
          },
        ],
      },
      exitShort: {
        id: "exit-short-1",
        conditionGroups: [
          {
            id: "group-1",
            conditions: [
              {
                id: "condition-1",
                indicator: "rsi",
                parameter: "value",
                logic: "less_than",
                value: "30",
                timeframe: "1d",
              },
            ],
            operator: "OR",
          },
        ],
      },
      riskManagement: {
        stopLoss: [
          {
            id: "sl-1",
            type: "percentage",
            value: "2",
            enabled: true,
          },
        ],
        takeProfit: [
          {
            id: "tp-1",
            type: "percentage",
            value: "5",
            enabled: true,
          },
        ],
        trailingStop: [],
        positionSizing: [
          {
            id: "ps-1",
            type: "percentage",
            value: "2",
            equityPercentage: 2,
            enabled: true,
          },
        ],
        maxOpenPositions: 3,
        maxDrawdown: 15,
      },
    })
  } catch (error) {
    console.error("Error fetching strategy:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch strategy" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const id = await getId(context)
    const strategy = await request.json()

    // In a real app, you would update this in a database
    console.log(`Updating strategy ${id}:`, strategy)

    return NextResponse.json({
      success: true,
      message: "Strategy updated successfully",
      id,
    })
  } catch (error) {
    console.error("Error updating strategy:", error)
    return NextResponse.json({ success: false, message: "Failed to update strategy" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const id = await getId(context)

    // In a real app, you would delete this from a database
    console.log(`Deleting strategy ${id}`)

    return NextResponse.json({
      success: true,
      message: "Strategy deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting strategy:", error)
    return NextResponse.json({ success: false, message: "Failed to delete strategy" }, { status: 500 })
  }
}
