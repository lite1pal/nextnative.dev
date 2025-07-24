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
    <div className="py-10 sm:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Subheading
            heading1="How fast can"
            heading2="you start?"
            className="text-start md:text-center md:items-center"
          />
          <p className="mt-6 text-lg max-w-2xl text-start md:text-center self-start w-fit md:mx-auto">
            Clone. Install. Run.
          </p>
        </div>

        <div className="max-w-xl mx-auto space-y-6">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium text-sm flex-shrink-0 mt-1">
                {step.number}
              </div>
              <div className="flex-1">
                <div
                  style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
                  className="bg-white rounded-lg px-4 py-6"
                >
                  <code className="text-gray-900 font-[500] text-base font-mono">
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

        <Image
          src="/launch-in-2-days-optimized.webp"
          alt="Launch in 2 Days"
          width={1920}
          height={1080}
          className="rounded-[20px] w-full mt-12 sm:mb-12 mx-auto"
          onClick={() => trackEvent("Launched_in_2_days_clicked")}
        />
      </div>
    </div>
  );
}

export default QuickStart;
