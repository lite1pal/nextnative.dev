"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import PostsGrid from "@/app/blog/posts-grid";

interface LoadMorePostsProps {
  initialPosts: any[];
  totalPages: number;
  tag?: string; // For tag-specific loading
}

export default function LoadMorePosts({
  initialPosts,
  totalPages,
  tag,
}: LoadMorePostsProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalPages > 1);

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const url = tag 
        ? `/api/blog/posts?page=${nextPage}&tag=${encodeURIComponent(tag)}`
        : `/api/blog/posts?page=${nextPage}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.posts && data.posts.length > 0) {
        setPosts(prevPosts => [...prevPosts, ...data.posts]);
        setCurrentPage(nextPage);
        setHasMore(nextPage < totalPages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Posts Grid */}
      <PostsGrid posts={posts} />

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={loadMorePosts}
            disabled={loading}
            variant="outline"
            size="lg"
            className="px-8 py-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More Posts"
            )}
          </Button>
        </div>
      )}
      
     
    </div>
  );
}
