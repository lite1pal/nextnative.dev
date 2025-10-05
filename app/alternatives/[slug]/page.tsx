import { alternatives } from "./alternatives-data";
import { tutorials } from "../../tutorials/[slug]/tutorials-data";
import { comparisons } from "../../comparisons/[slug]/comparisons-data";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  ChevronRight,
  Minus,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import CTASkeleton from "@/components/CTASkeleton";
import CTA from "@/components/CTA";

export async function generateStaticParams() {
  return alternatives.map((alt) => ({
    slug: alt.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const alternative = alternatives.find((alt) => alt.slug === params.slug);

  if (!alternative) {
    return {};
  }

  return {
    title: alternative.metaTitle,
    description: alternative.metaDescription,
    metadataBase: new URL("https://nextnative.dev"),
    alternates: {
      canonical: `/alternatives/${alternative.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    openGraph: {
      title: alternative.metaTitle,
      description: alternative.metaDescription,
      url: `https://nextnative.dev/alternatives/${alternative.slug}`,
      siteName: "NextNative",
      type: "article",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "NextNative - Build mobile apps with Next.js",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: alternative.metaTitle,
      description: alternative.metaDescription,
      images: ["/opengraph-image.png"],
    },
  };
}

export default function AlternativePage({
  params,
}: {
  params: { slug: string };
}) {
  const alternative = alternatives.find((alt) => alt.slug === params.slug);

  if (!alternative) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: alternative.metaTitle,
    description: alternative.metaDescription,
    author: {
      "@type": "Organization",
      name: "NextNative",
      url: "https://nextnative.dev",
    },
    publisher: {
      "@type": "Organization",
      name: "NextNative",
      logo: {
        "@type": "ImageObject",
        url: "https://nextnative.dev/opengraph-image.png",
      },
    },
    datePublished: "2025-01-01",
    dateModified: "2025-01-01",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-10 flex items-center gap-2 text-base text-gray-600 md:text-lg dark:text-gray-400">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link
            href="/alternatives"
            className="hover:text-primary transition-colors"
          >
            Alternatives
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-white">
            {alternative.alternativeName} Alternative
          </span>
        </nav>

        {/* Header */}
        <header className="mb-16">
          <div className="mb-6 text-base text-gray-500 dark:text-gray-400">
            Alternative to {alternative.alternativeName}
          </div>
          <h1 className="mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-6xl lg:text-7xl dark:text-white">
            {alternative.heroHeading}
          </h1>

          {/* Last Updated */}
          <div className="mb-6">
            <span className="flex items-center gap-2 text-lg text-gray-600 dark:text-gray-400">
              <Calendar className="h-5 w-5" />
              Updated {alternative.lastUpdated}
            </span>
          </div>

          <p className="text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-400">
            {alternative.heroDescription}
          </p>
        </header>

        {/* Quick Answer */}
        <div className="mb-16 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Quick Answer
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-400">
            {alternative.quickAnswer}
          </p>
        </div>

        {/* Summary */}
        <div className="mb-20">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            NextNative vs {alternative.alternativeName}
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-400">
            {alternative.summary}
          </p>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                  <th className="px-6 py-5 text-base font-semibold text-gray-900 md:text-lg dark:text-white">
                    Feature
                  </th>
                  <th className="px-6 py-5 text-base font-semibold text-gray-900 md:text-lg dark:text-white">
                    NextNative
                  </th>
                  <th className="px-6 py-5 text-base font-semibold text-gray-900 md:text-lg dark:text-white">
                    {alternative.alternativeName}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {alternative.features.map((feature, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-5 text-base font-medium text-gray-900 md:text-lg dark:text-white">
                      {feature.feature}
                    </td>
                    <td className="px-6 py-5 text-base md:text-lg">
                      <div
                        className={`flex items-start gap-2 ${
                          feature.winner === "nextNative"
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {feature.winner === "nextNative" ? (
                          <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0" />
                        ) : feature.winner === "tie" ? (
                          <Minus className="mt-1 h-5 w-5 flex-shrink-0" />
                        ) : null}
                        <span>
                          {typeof feature.nextNative === "boolean"
                            ? feature.nextNative
                              ? "Yes"
                              : "No"
                            : feature.nextNative}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-base md:text-lg">
                      <div
                        className={`flex items-start gap-2 ${
                          feature.winner === "alternative"
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {feature.winner === "alternative" ? (
                          <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0" />
                        ) : feature.winner === "tie" ? (
                          <Minus className="mt-1 h-5 w-5 flex-shrink-0" />
                        ) : null}
                        <span>
                          {typeof feature.alternative === "boolean"
                            ? feature.alternative
                              ? "Yes"
                              : "No"
                            : feature.alternative}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* When to Choose */}
        <div className="mb-20 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-green-200 bg-green-50 p-8 dark:border-green-900/30 dark:bg-green-950/20">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              Choose NextNative if:
            </h3>
            <ul className="space-y-3">
              {alternative.whyChooseNextNative.map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-base leading-relaxed text-gray-700 md:text-lg dark:text-gray-300">
                    {reason}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
            <h3 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              Stick with {alternative.alternativeName} if:
            </h3>
            <ul className="space-y-3">
              {alternative.whenStickWithAlternative.map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="mt-1 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <span className="text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-400">
                    {reason}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Migration Path */}
        <div className="mb-20">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            {alternative.migrationPath.title}
          </h2>
          <div className="space-y-4">
            {alternative.migrationPath.steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <div className="bg-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="pt-1 text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-400">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-20">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {alternative.faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900"
              >
                <h3 className="mb-4 text-xl font-semibold text-gray-900 md:text-2xl dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="mb-16 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm md:p-10 dark:border-gray-700 dark:bg-gray-900">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Conclusion
          </h2>
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-400">
            {alternative.conclusion}
          </p>
        </div>

        {/* CTA Section */}
        <div className="mb-16 rounded-3xl bg-white p-16 text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            {alternative.cta.text}
          </h2>
          <p className="mb-10 text-xl md:text-2xl">
            {alternative.cta.description}
          </p>

          <Suspense fallback={<CTASkeleton />}>
            <Link href="/">
              <CTA />
            </Link>
          </Suspense>
        </div>

        {/* Related Tutorials */}
        <div className="border-t border-gray-200 pt-12 dark:border-gray-700">
          <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
            Ready to Get Started?
          </h3>
          <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
            Follow these step-by-step tutorials to build your mobile app
          </p>
          <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tutorials.slice(0, 3).map((tutorial) => (
              <Link
                key={tutorial.slug}
                href={`/tutorials/${tutorial.slug}`}
                className="group hover:border-primary rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
              >
                <h4 className="group-hover:text-primary mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {tutorial.title}
                </h4>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  {tutorial.timeToComplete} • {tutorial.difficulty}
                </p>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  {tutorial.summary}
                </p>
              </Link>
            ))}
          </div>

          {/* Related Comparisons */}
          <h3 className="mb-6 text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
            Compare Mobile Frameworks
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.slice(0, 3).map((comparison) => (
              <Link
                key={comparison.slug}
                href={`/comparisons/${comparison.slug}`}
                className="group hover:border-primary rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
              >
                <h4 className="group-hover:text-primary mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {comparison.title}
                </h4>
                <p className="text-base text-gray-600 dark:text-gray-400">
                  {comparison.option1.name} vs {comparison.option2.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
