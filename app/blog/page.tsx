import { prisma } from "@/prisma/client";
import { Metadata } from "next";
import { calculatePagination } from "@/lib/pagination";
import BlogViewPage from "./view";

export async function generateMetadata(): Promise<Metadata> {
  const page = 1; // Default to page 1

  const baseTitle = "NextNative Blog";
  const baseDescription =
    "Guides, tutorials, and tips for building mobile apps with Next.js and Capacitor";

  const title = page > 1 ? `${baseTitle} - Page ${page}` : baseTitle;
  const description =
    page > 1 ? `${baseDescription} - Page ${page}` : baseDescription;

  const url =
    page === 1
      ? "https://nextnative.dev/blog"
      : `https://nextnative.dev/blog/page/${page}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export const revalidate = 600;

export default async function BlogListPage() {
  const page = 1; // Default to page 1

  const postsPerPage = 4;

  // Get total count of posts
  const totalPosts = await prisma.blogPost.count();

  // Calculate pagination info
  const paginationInfo = calculatePagination(page, totalPosts, postsPerPage);

  // Fetch posts for current page
  const posts = await prisma.blogPost.findMany({
    skip: paginationInfo.startIndex,
    take: postsPerPage,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      image: true,
      createdAt: true,
    },
  });

  return <BlogViewPage posts={posts} paginationInfo={paginationInfo} />;
}
