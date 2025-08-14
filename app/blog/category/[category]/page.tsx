import { prisma } from "@/prisma/client";
import { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { calculatePagination } from "@/lib/pagination";
import LoadMorePosts from "@/components/LoadMorePosts";
import BlogHeading from "../../blog-heading";
import TagFilter from "../../tag-filter";

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

export default async function BlogCategoryPage(props: BlogTagPageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  
  const tag = decodeURIComponent(params.category);

  const tagWithoutDashes = tag.replaceAll("-", " ");

  const page = parseInt(searchParams.page || "1", 10);

  // Validate page parameter
  if (searchParams.page && (isNaN(page) || page < 1)) {
    redirect(`/blog/category/${encodeURIComponent(tag)}`);
  }

  const postsPerPage = 6;

  // Get total count of posts with this tag
  const totalPosts = await prisma.blogPost.count({
    where: {
      tags: {
        has: tagWithoutDashes
      },
    },
  });

  // If no posts found with this tag, return 404
  if (totalPosts === 0) {
    notFound();
  }

  // Calculate pagination info
  const paginationInfo = calculatePagination(page, totalPosts, postsPerPage);

  // Redirect if page number is too high
  if (page > paginationInfo.totalPages) {
    redirect(`/blog/category/${encodeURIComponent(tag)}`);
  }

  // Fetch posts for current page with the specific tag
  const posts = await prisma.blogPost.findMany({
    where: {
      tags: {
        has: tagWithoutDashes,
      },
    },
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
      
      {/* Current tag indicator */}
      <div className="w-full max-w-6xl px-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {tagWithoutDashes} category
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {totalPosts} {totalPosts === 1 ? 'post' : 'posts'} found
          </p>
        </div>
      </div>

      {/* TAG FILTER BAR */}
      {allTags.length > 0 && (
        <div className="w-full max-w-6xl px-4">
          <TagFilter tags={allTags} currentTag={tagWithoutDashes} />
        </div>
      )}

      <LoadMorePosts
        initialPosts={posts}
        totalPages={paginationInfo.totalPages}
        tag={tagWithoutDashes}
      />
    </div>
  );
}
