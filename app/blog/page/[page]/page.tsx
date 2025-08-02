import { prisma } from "@/prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import HighlightedSpan from "@/components/HighlightedSpan";
import { BlogPagination } from "@/components/BlogPagination";
import { calculatePagination } from "@/lib/pagination";

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
    },
  });

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center gap-2 text-center sm:py-16">
        {/* <h1>
            Welcome to <HighlightedSpan>NextNative</HighlightedSpan>'s Blog
          </h1> */}
        <h1 className="text-[44px] leading-[60px] font-[600] md:text-[74px] md:leading-[91px]">
          Welcome to <HighlightedSpan>NextNative</HighlightedSpan>'s Blog
        </h1>
        <p className="mt-7 max-w-2xl text-xl leading-relaxed">
          Guides, tutorials, and tips for building cross-platform mobile apps
          faster with web frameworks.
        </p>
      </div>
      <div className="prose prose-h1:text-5xl prose-h2:mt-7 mx-auto flex max-w-full flex-col items-center py-10">
        {posts.length > 0 ? (
          <>
            {/* <PaginationInfo
            currentPage={paginationInfo.currentPage}
            totalPages={paginationInfo.totalPages}
            totalItems={paginationInfo.totalItems}
            startIndex={paginationInfo.startIndex}
            endIndex={paginationInfo.endIndex}
          /> */}

            <ul className="grid list-none grid-cols-1 gap-8 space-y-10 p-0 md:grid-cols-2">
              {posts.map((post) => {
                const formattedDate = new Date(
                  post.createdAt,
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });

                return (
                  <li key={post.id}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group no-underline"
                    >
                      <div>
                        {post.image && (
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={800}
                            height={400}
                            className="mb-3 rounded-lg transition-transform duration-200 group-hover:scale-[1.01]"
                            quality={50}
                            sizes={"(max-width: 1200px) 60vw, 15vw"}
                            style={{
                              boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)",
                            }}
                          />
                        )}
                        <h2 className="group-hover:text-primary transition-colors duration-200">
                          {post.title}
                        </h2>
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
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">No blog posts found.</p>
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
