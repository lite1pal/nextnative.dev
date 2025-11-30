"use client";

import { trackEvent } from "@/services/custom-analytics";
import Link from "next/link";

function CTABlogButton({ post }: { post: { slug: string } }) {
  return (
    <Link
      onClick={() => {
        trackEvent(`BlogPostCTA_${post.slug}_clicked`);
      }}
      href="/"
      className="bg-primary hover:text-primary border-primary mt-4 inline-block rounded-lg border-2 px-4 py-2 font-medium text-white hover:bg-white lg:px-16 lg:py-3 lg:text-xl"
      data-fast-goal={`extra_try_free_cta_clicked`}
    >
      Learn more
    </Link>
  );
}

export default CTABlogButton;
