"use client"

import LoadMorePosts from "@/components/LoadMorePosts";
import BlogHeading from "./blog-heading";
import TagFilter from "./tag-filter";
import { BlogPagination } from "@/components/BlogPagination";
import PostsGrid from "./posts-grid";

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

