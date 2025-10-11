"use client";

import Image from "next/image";
import Subheading from "./Subheading";
import { trackEvent } from "@/services/custom-analytics";

function QuickStart() {
  const steps = [
    {
      number: "1",
      description: "Clone the NextNative boilerplate",
      code: "git clone ...",
    },
    {
      number: "2",
      description: "Install all dependencies",
      code: "npm install",
    },
    {
      number: "3",
      description: "Start developing your mobile app",
      code: "npm run mobile:dev",
    },
  ];

  return (
    <div className="relative overflow-hidden py-10 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Subheading
            heading1="How fast can"
            heading2="you start?"
            className="text-start md:items-center md:text-center"
          />
          <p className="mt-6 w-fit max-w-2xl self-start text-start text-lg md:mx-auto md:text-center">
            Clone. Install. Run.
          </p>
        </div>

        <div className="mx-auto max-w-xl space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-primary mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium text-white">
                {step.number}
              </div>
              <div className="flex-1">
                <div
                  style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
                  className="rounded-lg bg-white px-4 py-6"
                >
                  <code className="font-mono text-base font-[500] text-gray-900">
                    {step.code}
                  </code>
                </div>
                {/* <p className="text-gray-600 text-sm mt-2">{step.description}</p> */}
              </div>
            </div>
          ))}
        </div>

        {/* <HighlightedSpan>
          <div className="flex items-center text-3xl mt-16 justify-center gap-2 md:gap-3">
            That's it! Now it's time to ship viral apps!
          </div>
        </HighlightedSpan> */}

        <a
          href="https://apps.apple.com/ua/app/sproutly-ai-plant-identifier/id6748902696"
          target="_blank"
          onClick={() => trackEvent("Launched_in_2_days_clicked")}
        >
          <Image
            src="/launch-in-2-days-optimized.webp"
            alt="Launch in 2 Days"
            width={1920}
            height={1080}
            className="mx-auto mt-12 w-full rounded-[20px] sm:mb-12"
          />
        </a>
      </div>
    </div>
  );
}

export default QuickStart;
