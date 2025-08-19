// app/sitemap.ts
import { prisma } from "@/prisma/client";
import type { MetadataRoute } from "next";

export const revalidate = 600; // 10 minutes in seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true, updatedAt: true },
  });

  const docs = [
    "https://docs.nextnative.dev",
    "https://docs.nextnative.dev/tutorials/ship-in-5-minutes",
    "https://docs.nextnative.dev/tutorials/ionic-router",
    "https://docs.nextnative.dev/tutorials/native-device-features",
    "https://docs.nextnative.dev/tutorials/splash-screen",
    "https://docs.nextnative.dev/tutorials/onboarding-flow",
    "https://docs.nextnative.dev/features/database",
    "https://docs.nextnative.dev/features/nextjs-api",
    "https://docs.nextnative.dev/features/authorization",
    "https://docs.nextnative.dev/features/in-app-purchases",
    "https://docs.nextnative.dev/features/push-notifications",
    "https://docs.nextnative.dev/preparing-for-deployment/rename-your-app",
    "https://docs.nextnative.dev/preparing-for-deployment/change-app-icon",
    "https://docs.nextnative.dev/preparing-for-deployment/build-app-for-production",
    "https://docs.nextnative.dev/components/screen-container",
    "https://docs.nextnative.dev/components/modal",
  ];

  const freeTools = [
    "https://nextnative.dev/free-tools/app-icon-splash-generator",
  ];

  return [
    {
      url: "https://nextnative.dev/",
      lastModified: new Date(),
    },
    {
      url: "https://nextnative.dev/blog",
      lastModified: new Date(),
    },
    {
      url: "https://nextnative.dev/showcase",
      lastModified: new Date(),
    },
    {
      url: "https://nextnative.dev/contact",
      lastModified: new Date(),
    },
    {
      url: "https://nextnative.dev/pricing",
      lastModified: new Date(),
    },

    ...docs.map((doc) => ({
      url: doc,
      lastModified: new Date(),
    })),

    ...posts.map((post) => ({
      url: `https://nextnative.dev/blog/${post.slug}`,
      lastModified: post.updatedAt,
    })),

    ...freeTools.map((freeTool) => ({
      url: freeTool,
      lastModified: new Date("2025-08-19"),
      changeFrequency: "weekly",
    })),
  ];
}
