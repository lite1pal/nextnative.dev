import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ComparisonCTA() {
  const comparisons = [
    {
      title: "Next.js vs React Native",
      slug: "nextjs-vs-react-native",
      description: "Web-first vs mobile-first approach",
    },
    {
      title: "Capacitor vs Flutter",
      slug: "capacitor-vs-flutter",
      description: "Web tech vs Dart framework",
    },
    {
      title: "PWA vs Native App",
      slug: "pwa-vs-native-app",
      description: "Distribution and capabilities",
    },
  ];

  return (
    <section className="from-primary/5 to-primary/10 my-16 rounded-3xl bg-gradient-to-br p-8 md:my-32 md:p-12">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
          Not sure which framework to choose?
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          Compare Next.js with other mobile frameworks to make the right
          decision for your project.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {comparisons.map((comparison) => (
          <Link
            key={comparison.slug}
            href={`/comparisons/${comparison.slug}`}
            className="group hover:border-primary rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
          >
            <h3 className="group-hover:text-primary mb-2 font-semibold text-gray-900 dark:text-white">
              {comparison.title}
            </h3>
            <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
              {comparison.description}
            </p>
            <div className="text-primary flex items-center gap-1 text-sm font-medium">
              Compare now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/comparisons"
          className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white transition-all"
        >
          View all comparisons
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
