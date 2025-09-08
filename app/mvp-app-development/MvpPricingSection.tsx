"use client";

import Button from "@/components/Button";
import HighlightedSpan from "@/components/HighlightedSpan";
import StarburstSign from "@/components/StarburstSign";
import Subheading from "@/components/Subheading";
import usePurchaseStats from "@/hooks/use-purchase-stats";
import Link from "next/link";

interface PricingFeature {
  text: string | React.ReactNode;
}

const pricingFeatures: PricingFeature[] = [
  { text: "Next.js boilerplate" },
  { text: "Secure backend" },
  { text: "Database" },
  { text: "Authentication" },
  { text: "Push notifications" },
  { text: "Onboarding flow" },
  { text: "In-App Purchases & Subscriptions" },
  { text: "App Store/Google Play guides" },
  { text: "3 months email support" },
  { text: "Lifetime updates" },
];

const pricingFeaturesStarter: PricingFeature[] = [
  { text: "Next.js boilerplate" },
  // { text: "3 real apps included" },
  { text: "Secure backend" },
  { text: "Database" },
  { text: "Authentication" },
  { text: "Push notifications" },
  { text: "Onboarding flow" },
  { text: "In-App Purchases & Subscriptions" },
  { text: "Lifetime updates" },
];

function MvpPricingSection() {
  const { customersCount, discountLimit } = usePurchaseStats();

  return (
    <div
      id="pricing"
      className="mx-auto flex max-w-[1000px] flex-col items-center gap-4 py-12 text-center md:py-20"
    >
      <Subheading
        heading1="One-time payment,"
        heading2="lifetime value"
        className="text-start md:items-center md:text-center"
      />

      <div className="mt-6 flex w-full flex-col gap-6 md:mt-10 md:flex-row md:px-4">
        <div className="order-2 mx-auto flex w-full max-w-[500px] flex-col gap-1 sm:order-1">
          <div
            style={{
              boxShadow:
                "0px 288px 115px rgba(0, 0, 0, 0.01), 0px 162px 97px rgba(0, 0, 0, 0.02), 0px 72px 72px rgba(0, 0, 0, 0.03), 0px 18px 40px rgba(0, 0, 0, 0.04)",
            }}
            className="h-full w-full rounded-[32px] bg-white p-6 md:p-10"
          >
            <div className="flex h-full flex-col gap-6 md:gap-8">
              <h3 className="w-fit text-xl font-[500] sm:text-2xl md:text-[32px]">
                Starter
              </h3>

              <div className="flex gap-1">
                <span className="text-gray text-lg line-through sm:text-xl md:text-2xl">
                  $249
                </span>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl leading-none font-[500] sm:text-4xl md:text-[54px]">
                    $125
                  </h3>
                  <span className="text-gray text-lg sm:text-xl md:text-2xl">
                    /forever
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-grow flex-col gap-3 font-[500] md:gap-4">
                {pricingFeaturesStarter.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-base sm:text-lg md:text-xl"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-start">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <Link href="https://cal.com/nextnative/30min" target="_blank">
                  <Button
                    variant="primary"
                    className="mt-7 flex w-full items-center justify-center gap-2 py-4 text-[18px]"
                  >
                    Book a call now
                  </Button>
                </Link>

                <span className="text-gray font-[500]">
                  Pay once, build unlimited apps!
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 mx-auto flex w-full max-w-[500px] flex-col gap-1 sm:order-2">
          <div
            style={{
              boxShadow:
                "0px 288px 115px rgba(0, 0, 0, 0.01), 0px 162px 97px rgba(0, 0, 0, 0.02), 0px 72px 72px rgba(0, 0, 0, 0.03), 0px 18px 40px rgba(0, 0, 0, 0.04)",
            }}
            className="border-primary h-full w-full rounded-[32px] border-2 bg-white p-6 md:p-10"
          >
            <div className="flex h-full flex-col gap-6 md:gap-8">
              <h3 className="w-fit text-xl font-[500] sm:text-2xl md:text-[32px]">
                All-in
              </h3>

              <div className="flex gap-1">
                <span className="text-gray text-lg line-through sm:text-xl md:text-2xl">
                  $299
                </span>
                <div className="flex items-end gap-2">
                  <h3 className="text-3xl leading-none font-[500] sm:text-4xl md:text-[54px]">
                    <HighlightedSpan>$149</HighlightedSpan>
                  </h3>
                  <span className="text-gray text-lg sm:text-xl md:text-2xl">
                    /forever
                  </span>
                </div>
              </div>

              <div className="flex w-full flex-grow flex-col gap-3 font-[500] md:gap-4">
                {pricingFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-base sm:text-lg md:text-xl"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-primary"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-start">{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <Link
                  href="https://cal.com/nextnative/30min"
                  target="_blank"
                  className="w-full"
                >
                  <Button
                    variant="primary"
                    className="mt-7 flex w-full items-center justify-center gap-2 py-4 text-[18px]"
                  >
                    Book a call now
                  </Button>
                </Link>

                <span className="text-gray font-[500]">
                  Pay once, build unlimited apps!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MvpPricingSection;
