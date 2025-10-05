"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AlternativesCTA() {
  const alternatives = [
    { name: "React Native", slug: "react-native-alternative" },
    { name: "Flutter", slug: "flutter-alternative" },
    { name: "Expo", slug: "expo-alternative" },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Looking for a better alternative?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl">
            Skip React Native, Flutter, and Expo. Build mobile apps with web
            technologies you already know.
          </p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {alternatives.map((alt) => (
            <Link
              key={alt.slug}
              href={`/alternatives/${alt.slug}`}
              className="group hover:border-primary/50 rounded-2xl border border-gray-800 bg-gray-950 p-6 transition-all hover:bg-gray-900"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-lg font-semibold md:text-xl">
                  {alt.name}
                </span>
                <ArrowRight className="group-hover:text-primary h-5 w-5 text-gray-400 transition-all group-hover:translate-x-1" />
              </div>
              <p className="text-base text-gray-400">
                See how Next.js + Capacitor compares
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/alternatives"
            className="text-primary inline-flex items-center gap-2 text-lg hover:underline"
          >
            View all alternatives
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
