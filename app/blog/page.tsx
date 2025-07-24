import { prisma } from "@/prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import HighlightedSpan from "@/components/HighlightedSpan";
import { BlogPagination } from "@/components/BlogPagination";
import { calculatePagination } from "@/lib/pagination";

interface BlogListPageProps {
  searchParams: any;
}

export async function generateMetadata({
  searchParams,
}: BlogListPageProps): Promise<Metadata> {
  const params = await Promise.resolve(searchParams);
  const page = parseInt(params.page || "1", 10);

  const baseTitle = "NextNative Blog";
  const baseDescription =
    "Guides, tutorials, and tips for building mobile apps with Next.js and Capacitor";

  const title = page > 1 ? `${baseTitle} - Page ${page}` : baseTitle;
  const description =
    page > 1 ? `${baseDescription} - Page ${page}` : baseDescription;
  const url = `https://nextnative.dev/blog${page > 1 ? `?page=${page}` : ""}`;

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

export default async function BlogListPage({
  searchParams,
}: BlogListPageProps) {
  const params = await Promise.resolve(searchParams);
  const pageParam = params.page;
  const page = parseInt(pageParam || "1", 10);

  // Validate page parameter
  if (pageParam && (isNaN(page) || page < 1)) {
    redirect("/blog");
  }

  const postsPerPage = 6;

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
    },
  });

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="prose prose-h1:text-5xl max-w-full items-center flex flex-col mx-auto py-10">
        <h1>
          Welcome to <HighlightedSpan>NextNative</HighlightedSpan>'s Blog
        </h1>
        <p className="text-gray prose-p:text-xl">
          Guides, tutorials, and tips for building mobile apps with Next.js and
          Capacitor.
        </p>

        {posts.length > 0 ? (
          <>
            {/* <PaginationInfo
            currentPage={paginationInfo.currentPage}
            totalPages={paginationInfo.totalPages}
            totalItems={paginationInfo.totalItems}
            startIndex={paginationInfo.startIndex}
            endIndex={paginationInfo.endIndex}
          /> */}

            <ul className="list-none p-0 space-y-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => {
                const formattedDate = new Date(
                  post.createdAt
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <li key={post.id}>
                    <Link href={`/blog/${post.slug}`} className="no-underline">
                      <div>
                        {post.image && (
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={800}
                            height={400}
                            className="rounded-lg mb-3"
                            quality={50}
                            sizes={"(max-width: 1200px) 60vw, 15vw"}
                          />
                        )}
                        <h2>{post.title}</h2>
                        <p className="text-gray text-sm">{formattedDate}</p>
                        <p>{post.description}</p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No blog posts found.</p>
          </div>
        )}
      </div>

      <BlogPagination
        currentPage={paginationInfo.currentPage}
        totalPages={paginationInfo.totalPages}
      />
    </div>
  );
}
