import { Metadata } from "next";
import BlogCategoryView from "./view";
import { prisma } from "@/prisma/client";
import { Suspense } from "react";

interface BlogTagPageProps {
  params: any;
  searchParams: any;
}

export async function generateMetadata(
  props: BlogTagPageProps,
): Promise<Metadata> {
  const params = await props.params;
  const tag = decodeURIComponent(params.category);
  const tagWithoutDashes = tag.replaceAll("-", " ");

  const baseTitle = `NextNative Blog - ${tagWithoutDashes}`;
  const baseDescription = `${tagWithoutDashes} - Guides, tutorials, and tips for building mobile apps with Next.js and Capacitor`;

  return {
    title: baseTitle,
    description: baseDescription,
    alternates: {
      canonical: `https://nextnative.dev/blog/category/${encodeURIComponent(tag)}`,
    },
    openGraph: {
      title: baseTitle,
      description: baseDescription,
      url: `https://nextnative.dev/blog/category/${encodeURIComponent(tag)}`,
    },
    twitter: {
      card: "summary",
      title: baseTitle,
      description: baseDescription,
    },
  };
}

export const revalidate = 600;

export async function generateStaticParams() {
  // Get all unique tags from blog posts
  const posts = await prisma.blogPost.findMany({
    select: {
      tags: true,
    },
  });

  // Collect unique tags across all posts
  const allTags = Array.from(
    new Set(
      posts.flatMap((p) => Array.isArray(p.tags) ? p.tags : [])
    )
  ).sort();

  return allTags.map((tag) => ({
    category: encodeURIComponent(tag.replaceAll(" ", "-")), // Encode spaces as dashes
  }));
}

export default function BlogCategoryPage(props: BlogTagPageProps) {
  return <Suspense fallback={<div className="flex justify-center items-center py-20">
      <svg
        className="animate-spin h-8 w-8 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    </div>}>
    <BlogCategoryView params={props.params}  />
  </Suspense>
}