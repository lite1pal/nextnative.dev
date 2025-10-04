import type { Metadata } from "next";
import { Suspense } from "react";
import NextNativeCardSkeleton from "../blog/[slug]/NextNativeCardSkeleton";
import NextNativeCard from "../blog/[slug]/NextNativeCard";

export const metadata: Metadata = {
  title: "Free Tools for Mobile App Developers | NextNative",
  description:
    "A growing collection of free tools to build and publish mobile apps faster: icon & splash generator, privacy policy, PWA manifest, revenue calculator, and more.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: { canonical: "/free-tools" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: "https://nextnative.dev/free-tools",
    siteName: "NextNative",
    title: "Free Tools for Mobile App Developers",
    description:
      "Generate app icons, manifests, policies and more. Ship faster with Next.js + Capacitor.",
    images: [
      {
        url: "/og/free-tools.png",
        width: 1200,
        height: 630,
        alt: "Free Tools – NextNative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Tools for Mobile App Developers | NextNative",
    description:
      "Instant generators for app icons, splash screens, privacy policy, PWA manifest, and more.",
    images: ["/og/free-tools.png"],
  },
  keywords: [
    "free app developer tools",
    "mobile app tools",
    "app icon generator",
    "splash screen generator",
    "pwa manifest generator",
    "privacy policy generator for apps",
    "app revenue calculator",
    "capacitor next.js tools",
  ],
};

export default function FreeToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      {children}
      <div className="mx-auto mt-10 max-w-xl">
        <Suspense fallback={<NextNativeCardSkeleton />}>
          <NextNativeCard post={{ slug: "free-tool" }} />
        </Suspense>
      </div>
    </main>
  );
}
