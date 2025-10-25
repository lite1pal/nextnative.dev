import { prisma } from "@/prisma/client";
import { trackEvent } from "@/services/custom-analytics";
import { sendWelcomeEmail, sendWelcomeTemplateEmail } from "@/services/resend";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { Webhook } from "standardwebhooks";

const webhook = new Webhook(process.env.DODOPAYMENTS_WEBHOOK_SECRET!);

// Template products
const TEMPLATE_CATALOG: Record<string, { name: string; link: string }> = {
  pdt_eiP4ixzuoeUYrtknt7wZB: {
    name: "Pomodoro App Template",
    link: process.env.POMODORO_TEMPLATE_DOWNLOAD_LINK!,
  },
  pdt_e9mUw084cWnu0tz: {
    name: "Pomodoro App Template Test",
    link: process.env.POMODORO_TEMPLATE_DOWNLOAD_LINK!,
  },
  // add more as you ship them
  // "pdt_XXXX": { name: "Expense Tracker Template", link: process.env.EXPENSE_TEMPLATE_LINK! },
};

// ⚡ NextNative products
const NEXTNATIVE_PRODUCTS: Record<string, { name: string }> = {
  pdt_oJrNhvmTecy5gmoEulOBk: { name: "NextNative All Access" },
  pdt_0qXNmdS7RszEjaA2IDyfM: { name: "NextNative Starter" },
};

function isSucceededOneTimePayment(p: any) {
  return (
    p?.data?.payload_type === "Payment" &&
    p?.type === "payment.succeeded" &&
    !p?.data?.subscription_id
  );
}

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

    // ✅ Ignore non one-time succeeded payments early (prevents 500s from other event types)
    if (!isSucceededOneTimePayment(payload)) {
      await trackEvent(
        "ℹ️ Webhook ignored (not succeeded one-time payment)",
        false,
      );
      return NextResponse.json({ ok: true, ignored: true }, { status: 200 });
    }

    if (!payload.data?.customer?.email) {
      throw new Error("Missing customer email in payload");
    }
    const email = payload.data.customer.email;

    const productId = payload.data?.product_cart?.[0]?.product_id as
      | string
      | undefined;

    if (!productId) {
      await trackEvent("💰 Missing product ID in payload 💔", false);
      throw new Error("Missing product ID in payload");
    }

    // Handle template purchases
    try {
      const tpl = TEMPLATE_CATALOG[productId];
      if (tpl) {
        const { name, link } = tpl;

        await trackEvent(
          `💰 Template_payment_succeeded - ${name} - ${email} 🎉`,
          false,
        );

        // Send welcome email
        try {
          const emailResult = await sendWelcomeTemplateEmail({
            email,
            link,
          });

          if (emailResult.success) {
            trackEvent("📧 Welcome email sent - " + email + " ✉️", false);
            console.log("Welcome email sent successfully");
          } else {
            trackEvent("📧 Welcome email failed - " + email + " ❌", false);
            console.error("Failed to send welcome email:", emailResult.message);
          }
        } catch (emailError) {
          trackEvent("📧 Welcome email error - " + email + " 💥", false);
          console.error("Welcome email error:", emailError);
        }
        return NextResponse.json(
          { message: "Webhook received" },
          { status: 200 },
        );
      }
    } catch (templateError: any) {
      console.error("Template purchase handling error:", templateError);
      trackEvent(
        "💰 Error on webhook - " + templateError.message + " 💔",
        false,
      );
    }

    // Handle NextNative purchases
    const nn = NEXTNATIVE_PRODUCTS[productId];
    if (nn) {
      const { name } = nn;
      await trackEvent(
        `💰 NextNative_payment_succeeded - ${name} - ${email} 🎉`,
        false,
      );
      console.log("Payment succeeded");
      await prisma.purchase.create({
        data: {
          paymentId: payload.data.payment_id,
          email: email,
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
          email,
          link: `https://nextnative.dev/thank-you?payment_id=${payload.data.payment_id}&status=succeeded`,
        });

        if (emailResult.success) {
          trackEvent("📧 Welcome email sent - " + email + " ✉️", false);
          console.log("Welcome email sent successfully");
        } else {
          trackEvent("📧 Welcome email failed - " + email + " ❌", false);
          console.error("Failed to send welcome email:", emailResult.message);
        }
      } catch (emailError) {
        trackEvent("📧 Welcome email error - " + email + " 💥", false);
        console.error("Welcome email error:", emailError);
      }

      revalidatePath("/api/customers-count");
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (err: any) {
    console.error(err);
    await trackEvent("💰 Error on webhook - " + err.message + " 💔", false);
    return NextResponse.json({ message: "Webhook failed" }, { status: 500 });
  }
}
