import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import { prisma } from "@/prisma/client";
import { trackEvent } from "@/services/custom-analytics";
import { z } from "zod";

const GITHUB_OWNER = "lite1pal";
const GITHUB_REPO = "nextnative_boilerplate";

const schema = z.object({
  githubUsername: z.string().min(1).max(39),
  paymentId: z.string().min(5),
});

export async function POST(request: Request) {
  try {
    // const { paymentId, githubUsername } = await request.json();
    // if (!paymentId || !githubUsername) {
    //   return NextResponse.json(
    //     { error: "Missing paymentId or githubUsername" },
    //     { status: 400 }
    //   );
    // }
    const body = await request.json();

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { githubUsername, paymentId } = parsed.data;

    const payment = await fetch(
      `https://live.dodopayments.com/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DODO_SECRET!}`,
        },
      }
    );

    if (!payment.ok) {
      return NextResponse.json(
        { error: "Invalid or unsuccessful payment" },
        { status: 403 }
      );
    }

    const paymentData = await payment.json();
    if (paymentData.status !== "succeeded") {
      return NextResponse.json(
        { error: "Invalid or unsuccessful payment" },
        { status: 403 }
      );
    }

    // ✅ Prevent duplicate invites
    const existingPurchase = await prisma.purchase.findFirst({
      where: { paymentId },
    });
    if (existingPurchase?.isInvited) {
      return NextResponse.json({ error: "Already invited" }, { status: 409 });
    }

    // Check if the GitHub token is available
    if (!process.env.GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GitHub token is not configured" },
        { status: 500 }
      );
    }

    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

    // Invite user to the repository
    await octokit.repos.addCollaborator({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      username: githubUsername,
      permission: "pull",
    });

    trackEvent(`💌 User invited to repo - ${githubUsername}`, false);

    if (existingPurchase) {
      await prisma.purchase.update({
        where: { id: existingPurchase.id },
        data: { isInvited: true, githubUsername },
      });
    } else {
      await prisma.purchase.create({
        data: {
          paymentId,
          githubUsername,
          isInvited: true,
        },
      });
    }

    return NextResponse.json(
      { message: "Invitation sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    trackEvent("💰 Error on submit-username - " + error.message + " 💔", false);
    console.error("Error processing username:", error);
    return NextResponse.json(
      { error: "Failed to process username" },
      { status: 500 }
    );
  }
}
