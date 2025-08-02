import { BlogPagination } from "@/components/BlogPagination";
import HighlightedSpan from "@/components/HighlightedSpan";
import Image from "next/image";
import Link from "next/link";

export default function BlogViewPage({
  posts,
  paginationInfo,
}: {
  posts: any[];
  paginationInfo: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    startIndex: number;
    endIndex: number;
  };
}) {
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
