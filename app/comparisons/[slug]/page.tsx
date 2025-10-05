import { notFound } from "next/navigation";
import { comparisons, type ComparisonData } from "./comparisons-data";
import type { Metadata } from "next";
import HighlightedSpan from "@/components/HighlightedSpan";
import { Check, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";
import CTA from "@/components/CTA";
import CTASkeleton from "@/components/CTASkeleton";

// Generate static params for all comparisons
export async function generateStaticParams() {
  return comparisons.map((comparison) => ({
    slug: comparison.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);

  if (!comparison) return {};

  return {
    title: comparison.metaTitle,
    description: comparison.metaDescription,
    alternates: {
      canonical: `https://nextnative.dev/comparisons/${slug}`,
    },
    openGraph: {
      title: comparison.metaTitle,
      description: comparison.metaDescription,
      url: `https://nextnative.dev/comparisons/${slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: comparison.metaTitle,
      description: comparison.metaDescription,
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comparison = comparisons.find((c) => c.slug === slug);

  if (!comparison) {
    notFound();
  }

  // Generate FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comparison.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </Script>

      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/comparisons" className="hover:text-primary">
          Comparisons
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900 dark:text-white">
          {comparison.title}
        </span>
      </nav>

      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
          {comparison.option1.name} vs {comparison.option2.name}
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          {comparison.summary}
        </p>
      </header>

      {/* Quick Answer */}
      <div className="bg-primary/10 mb-12 rounded-2xl p-6 md:p-8">
        <h2 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
          Quick Answer
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {comparison.quickAnswer}
        </p>
      </div>

      {/* Comparison Table */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          Feature Comparison
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  Feature
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {comparison.option1.name}
                </th>
                <th className="p-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                  {comparison.option2.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.features.map((feature, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 dark:border-gray-800"
                >
                  <td className="p-4 font-medium text-gray-900 dark:text-white">
                    {feature.feature}
                  </td>
                  <td
                    className={`p-4 ${
                      feature.winner === "option1" ? "bg-primary/5" : ""
                    }`}
                  >
                    {typeof feature.option1 === "boolean" ? (
                      feature.option1 ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-600" />
                      )
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature.option1}
                      </span>
                    )}
                  </td>
                  <td
                    className={`p-4 ${
                      feature.winner === "option2" ? "bg-primary/5" : ""
                    }`}
                  >
                    {typeof feature.option2 === "boolean" ? (
                      feature.option2 ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <X className="h-5 w-5 text-red-600" />
                      )
                    ) : (
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature.option2}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pros and Cons */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Pros & Cons
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {/* Option 1 */}
          <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {comparison.option1.name}
            </h3>
            <div className="mb-6">
              <h4 className="mb-3 font-medium text-green-700 dark:text-green-400">
                Pros
              </h4>
              <ul className="space-y-2">
                {comparison.option1Pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {pro}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-medium text-red-700 dark:text-red-400">
                Cons
              </h4>
              <ul className="space-y-2">
                {comparison.option1Cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {con}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Option 2 */}
          <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              {comparison.option2.name}
            </h3>
            <div className="mb-6">
              <h4 className="mb-3 font-medium text-green-700 dark:text-green-400">
                Pros
              </h4>
              <ul className="space-y-2">
                {comparison.option2Pros.map((pro, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {pro}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-medium text-red-700 dark:text-red-400">
                Cons
              </h4>
              <ul className="space-y-2">
                {comparison.option2Cons.map((con, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <X className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {con}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* When to Use */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          When to Use Each
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-primary/5 rounded-2xl p-6">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Choose {comparison.option1.name}
            </h3>
            <ul className="space-y-3">
              {comparison.whenToUse.option1.map((use, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ChevronRight className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {use}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gray-100 p-6 dark:bg-gray-800">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Choose {comparison.option2.name}
            </h3>
            <ul className="space-y-3">
              {comparison.whenToUse.option2.map((use, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ChevronRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-600 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {use}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mb-16">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {comparison.faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-700"
            >
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                {faq.question}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Conclusion */}
      <section className="mb-16">
        <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          Conclusion
        </h2>
        <div className="rounded-2xl bg-white p-6">
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {comparison.conclusion}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-white p-8 text-center md:p-12">
        <h2 className="mb-4 text-3xl font-bold">{comparison.cta.text}</h2>
        <p className="mb-6 text-lg opacity-90">{comparison.cta.description}</p>
        <Suspense fallback={<CTASkeleton />}>
          <CTA />
        </Suspense>
      </section>

      {/* Related Comparisons */}
      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Related Comparisons
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons
            .filter((c) => c.slug !== slug)
            .slice(0, 3)
            .map((related) => (
              <Link
                key={related.slug}
                href={`/comparisons/${related.slug}`}
                className="group hover:border-primary rounded-xl border bg-white p-4 transition-all hover:shadow-lg dark:border-gray-700"
              >
                <h3 className="group-hover:text-primary mb-2 font-semibold text-gray-900 dark:text-white">
                  {related.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {related.option1.name} vs {related.option2.name}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
