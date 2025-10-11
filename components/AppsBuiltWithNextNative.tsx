"use client";

import Apps from "@/app/showcase/apps";
import Subheading from "./Subheading";
import Button from "./Button";
import Link from "next/link";
import { trackEvent } from "@/services/custom-analytics";

function AppsBuiltWithNextNative() {
  return (
    <div className="relative overflow-hidden pt-20 pb-0">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Subheading
            heading1="Mobile apps built and published"
            heading2="with NextNative"
            className="text-start md:items-center md:text-center"
          />
          <p className="mt-6 w-fit max-w-2xl self-start text-start text-lg md:mx-auto md:text-center">
            These mobile apps were created using the exact same starter and
            deployed with ease.
            {/* <span className="hidden">Based on real submissions.</span> */}
          </p>
        </div>

        <div className="flex flex-col items-center gap-10 rounded-xl sm:bg-white sm:py-10">
          <Apps />
          <Link
            onClick={() => trackEvent("SeeMoreApps_clicked")}
            href="/showcase"
            className="w-full max-w-sm"
          >
            <Button className="w-full py-4" variant="secondary">
              See more apps
            </Button>
          </Link>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default AppsBuiltWithNextNative;
