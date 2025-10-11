import { ratelimit } from "@/lib/rate-limiter";
import { trackEvent } from "@/services/custom-analytics";
import { sendMessageToTelegram } from "@/services/telegram";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // ✅ Rate limit by IP
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") ?? "anonymous";
  const { success: allowed } = await ratelimit.limit(ip);

  if (!allowed) {
    trackEvent(`⛔ Rate limited IP: ${ip}`, false);
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

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

    sendMessageToTelegram("✅ New playground access request: " + email);

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
