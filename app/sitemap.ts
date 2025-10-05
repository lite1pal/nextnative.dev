// app/sitemap.ts
import { prisma } from "@/prisma/client";
import type { MetadataRoute } from "next";
import { comparisons } from "./comparisons/[slug]/comparisons-data";

export const revalidate = 600; // 10 minutes in seconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.blogPost.findMany({
    select: { slug: true, updatedAt: true },
  });

  const lastModified = new Date("2025-10-04");

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
    "https://nextnative.dev/free-tools/app-privacy-policy-generator",
    "https://nextnative.dev/free-tools/pwa-manifest-generator",
    "https://nextnative.dev/free-tools/capacitor-config-generator",
    "https://nextnative.dev/free-tools/ios-bundle-id-generator",
    "https://nextnative.dev/free-tools/app-idea-generator",
    "https://nextnative.dev/free-tools/app-name-generator",
    "https://nextnative.dev/free-tools/app-store-metadata-generator",
    "https://nextnative.dev/free-tools/app-store-screenshot-generator",
    "https://nextnative.dev/free-tools/play-store-privacy-policy",
  ];

  const comparisonUrls = comparisons.map(
    (comparison) => `https://nextnative.dev/comparisons/${comparison.slug}`,
  );

  return [
    {
      url: "https://nextnative.dev/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://nextnative.dev/blog",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://nextnative.dev/convert-website-to-app",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://nextnative.dev/showcase",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://nextnative.dev/contact",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: "https://nextnative.dev/pricing",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://nextnative.dev/mvp-app-development",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://nextnative.dev/comparisons",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    ...posts.map((post) => ({
      url: `https://nextnative.dev/blog/${post.slug}`,
      lastModified: post.updatedAt,
    })),

    ...freeTools.map((freeTool) => ({
      url: freeTool,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    })),

    ...docs.map((doc) => ({
      url: doc,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    })),

    ...comparisonUrls.map((url) => ({
      url,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    })),
  ];
}
