// app/sitemap.ts
import { prisma } from "@/prisma/client";
import type { MetadataRoute } from "next";

export const revalidate = 600; // 10 minutes in seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true, updatedAt: true },
  });

  const docs = [
    "https://nextnative.dev/docs",
    "https://nextnative.dev/docs/tutorials/ship-in-5-minutes",
    "https://nextnative.dev/docs/tutorials/ionic-router",
    "https://nextnative.dev/docs/tutorials/native-device-features",
    "https://nextnative.dev/docs/tutorials/splash-screen",
    "https://nextnative.dev/docs/tutorials/onboarding-flow",
    "https://nextnative.dev/docs/features/database",
    "https://nextnative.dev/docs/features/nextjs-api",
    "https://nextnative.dev/docs/features/authorization",
    "https://nextnative.dev/docs/features/in-app-purchases",
    "https://nextnative.dev/docs/features/push-notifications",
    "https://nextnative.dev/docs/preparing-for-deployment/rename-your-app",
    "https://nextnative.dev/docs/preparing-for-deployment/change-app-icon",
    "https://nextnative.dev/docs/preparing-for-deployment/build-app-for-production",
    "https://nextnative.dev/docs/components/screen-container",
    "https://nextnative.dev/docs/components/modal",
  ];

  const freeTools = [
    "https://nextnative.dev/free-tools",
    "https://nextnative.dev/free-tools/app-icon-splash-generator",
    "https://nextnative.dev/free-tools/app-revenue-calculator",
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
    {
      url: "https://nextnative.dev/mvp-app-development",
      lastModified: new Date(),
    },

    ...posts.map((post) => ({
      url: `https://nextnative.dev/blog/${post.slug}`,
      lastModified: post.updatedAt,
    })),

    ...freeTools.map((freeTool) => ({
      url: freeTool,
      lastModified: new Date("2025-10-04"),
      changeFrequency: "weekly",
    })),

    ...docs.map((doc) => ({
      url: doc,
      lastModified: new Date(),
    })),
  ];
}
