import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // For deployment, we'll return a mock success response
    // In production, you'd integrate with a database or booking service
    console.log("Booking request:", body)

    return NextResponse.json({
      success: true,
      message: "Booking request received (demo mode)",
    })
  } catch (error) {
    console.error("Booking error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Booking failed",
      },
      { status: 500 },
    )
  }
}
