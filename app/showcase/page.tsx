import HighlightedSpan from "@/components/HighlightedSpan";
import Apps from "./apps";

export const metadata = {
  title: "Mobile App Showcase | Built with NextNative",
  description:
    "See real mobile apps built with the NextNative Starter Kit. Published to the App Store and Google Play — including habit trackers and productivity tools.",
  openGraph: {
    title: "NextNative Mobile Apps",
    description:
      "Explore real iOS and Android apps built using Next.js + Capacitor.",
    images: [
      {
        url: "/showcase/og-showcase.png",
        width: 1200,
        height: 630,
        alt: "Showcase of apps built with NextNative",
      },
    ],
  },
};

export default function ShowcasePage() {
  return (
    <div className="py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col gap-6 mb-12">
          <h1 className="text-4xl font-[500]">
            Mobile apps built with <HighlightedSpan>NextNative</HighlightedSpan>
          </h1>
          {/* <p className="text-gray text-lg">
            Real mobile apps published to the App Store and Google Play.
          </p> */}
        </div>
        <div className="bg-white rounded-xl py-10">
          <Apps />
        </div>
      </div>
    </div>
  );
}
