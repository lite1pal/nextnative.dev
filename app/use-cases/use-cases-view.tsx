import Link from "next/link";
import { useCases } from "./[slug]/use-cases-data";
import { ChevronRight, Clock, DollarSign } from "lucide-react";
import { Suspense } from "react";
import CTASkeleton from "@/components/CTASkeleton";
import CTA from "@/components/CTA";

const categories = [
  {
    id: "health",
    name: "Health & Fitness",
    description: "Workout tracking, nutrition apps, and wellness platforms",
    icon: "💪",
  },
  {
    id: "commerce",
    name: "E-commerce & Delivery",
    description: "Shopping apps, food delivery, and marketplace platforms",
    icon: "🛍️",
  },
  {
    id: "social",
    name: "Social & Community",
    description: "Social networks, messaging, and community platforms",
    icon: "👥",
  },
  {
    id: "education",
    name: "Education & Learning",
    description: "E-learning platforms, courses, and educational tools",
    icon: "📚",
  },
  {
    id: "productivity",
    name: "Productivity & Tools",
    description: "Task managers, note-taking, and productivity apps",
    icon: "✅",
  },
];

const categoryColors = {
  health: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  commerce: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  social:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  education:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  productivity:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  entertainment:
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
};

function UseCasesView() {
  return (
    <>
      {/* Category Sections */}
      <div className="space-y-20">
        {categories.map((category) => {
          const categoryUseCases = useCases.filter(
            (useCase) => useCase.category === category.id,
          );

          if (categoryUseCases.length === 0) return null;

          return (
            <section key={category.id}>
              {/* Category Header */}
              <div className="mb-10">
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-5xl">{category.icon}</span>
                  <h2 className="text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
                    {category.name}
                  </h2>
                </div>
                <p className="text-xl text-gray-600 md:text-2xl dark:text-gray-400">
                  {category.description}
                </p>
              </div>

              {/* Use Cases Grid */}
              <div className="grid gap-8 md:grid-cols-2">
                {categoryUseCases.map((useCase) => (
                  <Link
                    key={useCase.slug}
                    href={`/use-cases/${useCase.slug}`}
                    className="group hover:border-primary rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
                  >
                    {/* Icon & Category Badge */}
                    <div className="mb-5 flex items-center justify-between">
                      <span className="text-5xl">{useCase.icon}</span>
                      <span
                        className={`rounded-full px-4 py-1.5 text-base font-medium ${
                          categoryColors[useCase.category]
                        }`}
                      >
                        {useCase.category.charAt(0).toUpperCase() +
                          useCase.category.slice(1)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="group-hover:text-primary mb-4 text-xl leading-tight font-semibold text-gray-900 md:text-2xl dark:text-white">
                      {useCase.title}
                    </h3>

                    {/* Summary */}
                    <p className="mb-6 line-clamp-3 text-base leading-relaxed text-gray-600 md:text-lg dark:text-gray-400">
                      {useCase.summary}
                    </p>

                    {/* Key Features Preview */}
                    <div className="mb-6 space-y-3">
                      <p className="text-base font-medium text-gray-900 dark:text-gray-300">
                        Key features:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {useCase.keyFeatures
                          .slice(0, 4)
                          .map((feature, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            >
                              <span>{feature.icon}</span>
                              <span>{feature.title}</span>
                            </span>
                          ))}
                        {useCase.keyFeatures.length > 4 && (
                          <span className="bg-primary/10 text-primary inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium">
                            +{useCase.keyFeatures.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Time & Cost Savings */}
                    <div className="mb-6 grid grid-cols-2 gap-4 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
                      <div>
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-4 w-4" />
                          <span>Save Time</span>
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {useCase.timeSavings}
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <DollarSign className="h-4 w-4" />
                          <span>Save Cost</span>
                        </div>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {useCase.costSavings}
                        </div>
                      </div>
                    </div>

                    {/* View Details Link */}
                    <div className="group-hover:text-primary flex items-center gap-2 text-base font-medium text-gray-900 transition-colors dark:text-white">
                      View Full Details
                      <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA Section */}
      {/* <div className="bg-primary/10 mt-24 rounded-3xl p-12 text-center">
        <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
          Ready to Build Your App?
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 md:text-2xl dark:text-gray-400">
          Get NextNative and start building your mobile app today. All use cases
          included with code examples and best practices.
        </p>
        <Link
          href="/#pricing"
          className="bg-primary hover:bg-primary/90 inline-flex items-center gap-2 rounded-full px-10 py-5 text-xl font-semibold text-white transition-colors"
        >
          Get Started
          <ChevronRight className="h-6 w-6" />
        </Link>
      </div> */}

      {/* Bottom CTA */}
      <div className="mt-16 rounded-2xl bg-white p-16 text-center">
        <h2 className="mb-4 text-5xl font-bold text-gray-900">
          Ready to build your mobile app?
        </h2>
        <p className="mb-6 text-lg text-gray-700">
          NextNative provides everything you need to ship iOS and Android apps
          with Next.js + Capacitor in minutes.
        </p>

        <Suspense fallback={<CTASkeleton />}>
          <Link href="/">
            <CTA />
          </Link>
        </Suspense>
      </div>

      {/* Why Choose NextNative */}
      <section className="mt-24">
        <h2 className="mb-12 text-center text-4xl font-bold text-gray-900 md:text-5xl dark:text-white">
          Why choose NextNative?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-4 text-5xl">⚡</div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
              Fast Development
            </h3>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Launch in weeks, not months. Pre-built components and features
              ready to use.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-4 text-5xl">💰</div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
              Cost Effective
            </h3>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Save $20,000-100,000 compared to custom development or hiring
              agencies.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="mb-4 text-5xl">🚀</div>
            <h3 className="mb-3 text-2xl font-semibold text-gray-900 dark:text-white">
              Production Ready
            </h3>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Battle-tested code, best practices, and everything you need for
              app stores.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default UseCasesView;
