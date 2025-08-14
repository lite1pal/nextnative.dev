"use client"

import { BlogPagination } from "@/components/BlogPagination";
import HighlightedSpan from "@/components/HighlightedSpan";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PostsGrid from "./posts-grid";
import BlogHeading from "./blog-heading";

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

export function TagFilter({ tags }: { tags: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const active = sp.get("tag") ?? "all";

  const setTag = (t: string | null) => {
    const params = new URLSearchParams(sp.toString());
    if (!t || t === "all") {
      params.delete("tag");
    } else {
      params.set("tag", t);
    }
    // reset pagination when changing tag
    params.delete("page");
    const q = params.toString();
    router.push(q ? `${pathname}?${q}` : pathname);
  };

  const basePill =
    "inline-flex cursor-pointer items-center rounded-2xl px-4 py-2 text-sm font-medium " +
    "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "bg-[#CDEBFF] text-black";

  const activePill =
    "bg-primary text-white";

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => setTag("all")}
        className={`${basePill} ${active === "all" ? activePill : ""}`}
      >
        All
      </button>

      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => setTag(tag)}
          className={`${basePill} ${active === tag ? activePill : ""}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
