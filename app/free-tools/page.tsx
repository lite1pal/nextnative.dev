import HighlightedSpan from "@/components/HighlightedSpan";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

function Page() {
  const tools = [
    {
      title: "App Icon & Splash Screen Generator",
      description:
        "Upload one image to instantly generate all required iOS and Android app icons and splash screens.",
      link: "/free-tools/app-icon-splash-generator",
    },
    {
      title: "App Revenue Calculator",
      description:
        "Estimate your app's net revenue after App Store, Google Play, and RevenueCat fees.",
      link: "/free-tools/app-revenue-calculator",
    },
    {
      title: "PWA Manifest Generator",
      description: "Generate a valid PWA manifest.json file in seconds.",
      link: "/free-tools/pwa-manifest-generator",
    },
    // {
    //   title: "Capacitor Config Builder",
    //   description:
    //     "Quickly create a valid capacitor.config.ts file for your Next.js app with plugin options and environment presets.",
    //   link: "/free-tools/config-builder",
    // },
    // {
    //   title: "App Store Checklist Generator",
    //   description:
    //     "Get a personalized checklist to make sure your app passes Apple and Google Play reviews without rejections.",
    //   link: "/free-tools/publish-checklist",
    // },
    // {
    //   title: "Compatibility Checker",
    //   description:
    //     "Paste your Next.js repo link and check if your setup is ready for Capacitor and native deployment.",
    //   link: "/free-tools/compatibility-checker",
    // },
  ];

  return (
    <div className="mx-auto w-full max-w-[962px] px-4 py-12 xl:max-w-[1260px] xl:px-0">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            Free tools for <HighlightedSpan>mobile development</HighlightedSpan>
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600 dark:text-gray-400">
            A growing collection of free tools to help you build, test, and
            publish mobile apps faster — powered by Next.js + Capacitor.
          </p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.link}
              className="group rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <h3 className="group-hover:text-primary mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {tool.title}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {tool.description}
              </p>

              <button className="text-primary mt-10 flex cursor-pointer items-center gap-1 text-xl font-[500]">
                Use tool{" "}
                <ArrowRight
                  className="mt-0.5 transition-transform group-hover:translate-x-1"
                  size={20}
                />
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
