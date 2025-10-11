import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 },
      );
    }

    // Here you would typically:
    // 1. Save email to your database
    // 2. Send a welcome email
    // 3. Track the conversion in analytics

    // For now, we'll just log it
    console.log("Playground access granted to:", email);

    // You could also send to your email service
    // await sendToEmailService(email, "playground-access");

    return NextResponse.json({
      success: true,
      message: "Access granted",
    });
  } catch (error) {
    console.error("Error granting playground access:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
