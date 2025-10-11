"use client";

import { trackEvent } from "@/services/custom-analytics";
import Button from "./Button";
import Link from "next/link";

function CTAButtonSecondary() {
  return (
    <Link
      href="https://nextnative.dev/playground"
      onClick={() => {
        trackEvent("CTA_try_for_free_clicked");
        window?.datafast("try_for_free_clicked_from_herosection");
      }}
    >
      <Button
        variant="primary"
        className="hover:bg-primary border-primary text-primary border-2 bg-transparent px-4 hover:text-white md:px-10"
      >
        Try for Free
      </Button>
    </Link>
  );
}

export default CTAButtonSecondary;
