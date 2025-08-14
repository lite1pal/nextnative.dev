import { prisma } from "@/prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import HighlightedSpan from "@/components/HighlightedSpan";
import { BlogPagination } from "@/components/BlogPagination";
import { calculatePagination } from "@/lib/pagination";
import PostsGrid from "../../posts-grid";
import BlogHeading from "../../blog-heading";
import TagFilter from "../../tag-filter";

interface BlogListPageProps {
  params: any;
}

export async function generateMetadata(
  props: BlogListPageProps,
): Promise<Metadata> {
  const params = await props.params;
  const page = parseInt(params.page || "1", 10);

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

export async function generateStaticParams() {
  const postsPerPage = 4;
  const totalPosts = await prisma.blogPost.count();
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const pages = [];

  for (let i = 2; i <= totalPages; i++) {
    pages.push({ page: i.toString() });
  }

  return pages;
}

export default async function BlogListPage(props: BlogListPageProps) {
  const params = await props.params;
  const pageParam = params.page;
  const page = parseInt(pageParam || "1", 10);

  // Validate page parameter
  if (pageParam && (isNaN(page) || page < 1)) {
    redirect("/blog");
  }

  const postsPerPage = 4;

  // Get total count of posts
  const totalPosts = await prisma.blogPost.count();

  // Calculate pagination info
  const paginationInfo = calculatePagination(page, totalPosts, postsPerPage);

  // Redirect if page number is too high
  if (totalPosts > 0 && page > paginationInfo.totalPages) {
    redirect("/blog");
  }

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
      tags: true,
    },
  });

  // Collect unique tags across all posts
  const allTags = Array.from(
    new Set(
      posts.flatMap((p) => Array.isArray(p.tags) ? p.tags : [])
    )
  ).sort();


  return (
    <div className="flex flex-col items-center gap-5">
      <BlogHeading />

      {/* TAG FILTER BAR */}
      {allTags.length > 0 && (
        <div className="w-full max-w-6xl px-4">
          <TagFilter tags={allTags} />
        </div>
      )}
      
      <PostsGrid posts={posts} />

      <BlogPagination
        currentPage={paginationInfo.currentPage}
        totalPages={paginationInfo.totalPages}
      />
    </div>
  );
}