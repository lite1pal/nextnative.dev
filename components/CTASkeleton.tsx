"use client";

import CTAButton from "./CTAButton";

function CTASkeleton() {
  return (
    <div className={"flex flex-col gap-4 xl:items-center"}>
      <CTAButton />

      <div className="flex flex-col">
        <p className="font-medium text-gray-500 flex items-center gap-2">
          <span className="text-xl">🎁</span>
          <span className="sm:text-xl">
            <span className="text-red-500">50% off</span> for the first 25
            customers, <span className="text-red-500">5 left</span>
          </span>
        </p>
      </div>
    </div>
  );
}

export default CTASkeleton;
