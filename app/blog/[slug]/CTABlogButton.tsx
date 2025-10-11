"use client";

import { trackEvent } from "@/services/custom-analytics";
import Link from "next/link";

function CTABlogButton({ post }: { post: { slug: string } }) {
  return (
    <Link
      onClick={() => {
        trackEvent(`BlogPostCTA_${post.slug}_clicked`);
      }}
      href="/playground"
      className="bg-primary hover:text-primary border-primary mt-4 inline-block rounded-lg border px-4 py-2 font-medium text-white transition-colors hover:bg-white"
      data-fast-goal={`extra_try_free_cta_clicked`}
    >
      Try for Free
    </Link>
  );
}

export default CTABlogButton;
