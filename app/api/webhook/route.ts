import { prisma } from "@/prisma/client";
import { trackEvent } from "@/services/custom-analytics";
import { sendWelcomeEmail } from "@/services/resend";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { Webhook } from "standardwebhooks";

const webhook = new Webhook(process.env.DODOPAYMENTS_WEBHOOK_SECRET!);

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const rawBody = await request.text();

    const webhookHeaders = {
      "webhook-id": headersList.get("webhook-id") || "",
      "webhook-signature": headersList.get("webhook-signature") || "",
      "webhook-timestamp": headersList.get("webhook-timestamp") || "",
    };

    await webhook.verify(rawBody, webhookHeaders);
    const payload = JSON.parse(rawBody) as any;

    if (!payload.data?.customer?.email) {
      throw new Error("Missing customer email in payload");
    }

    if (
      payload.data.payload_type === "Payment" &&
      payload.type === "payment.succeeded" &&
      !payload.data.subscription_id
    ) {
      trackEvent(
        "💰 Payment_succeeded - " + payload.data.customer.email + " 🎉",
        false,
      );
      console.log("Payment succeeded");
      await prisma.purchase.create({
        data: {
          paymentId: payload.data.payment_id,
          email: payload.data.customer.email,
        },
      });
      // Update customer count
      await prisma.globalNumber.update({
        where: {
          id: "99c3a4be-4565-451b-813e-82bf381568d7",
          title: "customers",
        },
        data: { value: { increment: 1 } },
      });

      // Send welcome email
      try {
        const emailResult = await sendWelcomeEmail({
          email: payload.data.customer.email,
          link: `https://nextnative.dev/thank-you?payment_id=${payload.data.payment_id}&status=succeeded`,
        });

        if (emailResult.success) {
          trackEvent(
            "📧 Welcome email sent - " + payload.data.customer.email + " ✉️",
            false,
          );
          console.log("Welcome email sent successfully");
        } else {
          trackEvent(
            "📧 Welcome email failed - " + payload.data.customer.email + " ❌",
            false,
          );
          console.error("Failed to send welcome email:", emailResult.message);
        }
      } catch (emailError) {
        trackEvent(
          "📧 Welcome email error - " + payload.data.customer.email + " 💥",
          false,
        );
        console.error("Welcome email error:", emailError);
      }

      revalidatePath("/api/customers-count");
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    trackEvent("💰 Error on webhook - " + err.message + " 💔", false);
    return NextResponse.json({ message: "Webhook failed" }, { status: 500 });
  }
}
