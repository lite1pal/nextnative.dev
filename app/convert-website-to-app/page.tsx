"use client";

import Link from "next/link";
import { useState, useMemo } from "react";

function normalizeUrl(input: string) {
  try {
    const u = new URL(input.startsWith("http") ? input : `https://${input}`);
    return u.origin + u.pathname;
  } catch {
    return "";
  }
}

export default function ConvertWebsiteToAppPage() {
  const [urlInput, setUrlInput] = useState("https://nextnative.dev");
  const [url, setUrl] = useState("https://nextnative.dev");

  const valid = useMemo(() => !!normalizeUrl(urlInput), [urlInput]);

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    const n = normalizeUrl(urlInput);
    if (n) setUrl(n);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* HERO */}
      <section className="flex flex-col gap-6 text-center">
        <h1 className="mb-3 text-4xl font-bold text-gray-900 md:text-5xl">
          Convert Your Website into a Mobile App
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-gray-600">
          Turn any Next.js or web app into real iOS & Android apps using
          Capacitor — no rewrites, no native headaches. Try the preview below.
        </p>
        <form
          onSubmit={handlePreview}
          className="mx-auto mb-10 flex w-full max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://your-website.com"
            className="w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900"
            aria-label="Website URL"
          />
          <button
            type="submit"
            disabled={!valid}
            className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
          >
            Preview
          </button>
        </form>

        {/* PHONE MOCK PREVIEW */}

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          <IPhoneMockup>
            <div className="aspect-[9/19] overflow-hidden bg-white">
              {/* Some sites block iframes via X-Frame-Options; we show a friendly note if so */}
              <iframe
                key={url}
                src={url}
                className="h-full w-full"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
            <p className="mt-2 text-xs text-gray-500">
              If the site doesn’t load in the preview, it likely blocks iframes.
              That’s OK — it will still work inside a native WebView.
            </p>
          </IPhoneMockup>

          {/* <div className="mt-6 rounded-xl bg-gradient-to-br from-green-50 via-green-100/60 to-transparent p-5">
            <h4 className="mb-2 text-lg font-semibold text-green-800">
              🚀 You’re 1 step away from launching a real mobile app
            </h4>
            <p className="mb-4 text-sm text-gray-700">
              Your site already meets 80% of App Store requirements. <br />
              <span className="font-medium text-green-700">
                NextNative
              </span>{" "}
              handles the remaining 20% — icons, splash screens, native APIs,
              store configs, and build pipeline.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                href="/#pricing"
                className="rounded-xl border border-green-600 bg-white px-4 py-3 text-center font-semibold text-green-700 shadow-sm transition hover:scale-[1.01] hover:bg-green-50"
              >
                💚 Get NextNative Kit
              </Link>
              <Link
                href="/docs/tutorials/ship-in-5-minutes"
                className="rounded-xl bg-green-600 px-4 py-3 text-center font-semibold text-white shadow-sm transition hover:scale-[1.01] hover:bg-green-700"
              >
                ⚡ Ship in 5 Minutes
              </Link>
            </div>

            <div className="mt-5 flex items-center justify-center gap-3 text-xs text-gray-500">
              <span>Trusted by indie devs & startups</span>
              <span className="h-1 w-1 rounded-full bg-gray-400"></span>
              <span>Lifetime license • No subscriptions</span>
            </div>
          </div> */}

          <NextNativeUpsellCard />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto mt-16 max-w-5xl">
        <h2 className="mb-4 text-3xl font-semibold text-gray-900">
          How it works
        </h2>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            [
              "1. Wrap with Capacitor",
              "Add a lightweight native shell around your web app.",
            ],
            [
              "2. Configure icons & splash",
              "Generate assets and set your bundle ID.",
            ],
            [
              "3. Build iOS & Android",
              "Open Xcode/Android Studio and submit to the stores.",
            ],
          ].map(([t, d]) => (
            <li
              key={t}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <h3 className="mb-1 font-semibold">{t}</h3>
              <p className="text-gray-600">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-gray-600">
          NextNative bundles all configs and store requirements so your web app
          passes review on the first try. Need native APIs? Enable push
          notifications, camera, file access, in-app purchases and more, all via
          Capacitor plugins.
        </p>
      </section>

      {/* FAQ (visible content) */}
      <section className="mx-auto mt-16 max-w-5xl">
        <h2 className="mb-4 text-3xl font-semibold text-gray-900">FAQ</h2>
        <div className="space-y-4">
          <details className="rounded-xl border border-gray-200 p-4">
            <summary className="cursor-pointer font-medium">
              Will my site work if it blocks iframes?
            </summary>
            <p className="mt-2 text-gray-600">
              Yes. App Store apps use a native WebView, not an iframe. Even if a
              domain sets <code>X-Frame-Options</code>, it will still render in
              the app shell.
            </p>
          </details>
          <details className="rounded-xl border border-gray-200 p-4">
            <summary className="cursor-pointer font-medium">
              Can I access native features like camera or push notifications?
            </summary>
            <p className="mt-2 text-gray-600">
              Absolutely. Capacitor plugins expose camera, files, push,
              biometrics, and more. NextNative includes prewired examples.
            </p>
          </details>
        </div>
      </section>

      {/* JSON-LD for FAQ + HowTo */}
      <script
        type="application/ld+json"
        // FAQ + HowTo schema to boost rich results
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Convert Website to App",
            mainEntity: [
              {
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "Will my site work if it blocks iframes?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. App Store apps use a native WebView, not an iframe. Even if a domain sets X-Frame-Options, it will still render in the app shell.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I access native features like camera or push notifications?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Capacitor plugins expose camera, files, push, biometrics, and more. NextNative includes prewired examples.",
                    },
                  },
                ],
              },
              {
                "@type": "HowTo",
                name: "How to convert a website into a mobile app",
                step: [
                  { "@type": "HowToStep", name: "Wrap with Capacitor" },
                  { "@type": "HowToStep", name: "Configure icons & splash" },
                  { "@type": "HowToStep", name: "Build for iOS & Android" },
                ],
              },
            ],
          }),
        }}
      />
    </div>
  );
}

import HighlightedSpan from "@/components/HighlightedSpan";
import LogoSymbol from "@/components/LogoSymbol";
import { AvatarList } from "@/components/AvatarList";
import RatingSvg from "@/components/RatingSvg";
import IPhoneMockup from "@/components/note-taking/iphone-mockup";

function NextNativeUpsellCard() {
  return (
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className="border-primary h-fit rounded-xl border-2 bg-white p-6"
    >
      <div className="flex flex-col items-center gap-1.5 text-center">
        <div className="flex items-center gap-3">
          <LogoSymbol />
        </div>

        <h4 className="mt-6 text-2xl font-semibold text-gray-900">
          Turn this preview into a real app
          <br /> with <HighlightedSpan>NextNative</HighlightedSpan>
        </h4>

        <p className="mt-2 max-w-md text-base text-gray-600">
          You’re already <strong>85%</strong> there. NextNative handles the
          final stretch: icons, splash screens, native APIs, store configs, and
          production builds.
        </p>

        <Link
          href="/#pricing"
          className="mx-auto mt-5 rounded-xl bg-green-600 px-4 py-3 text-center font-semibold text-white shadow-sm transition hover:scale-[1.01] hover:bg-green-700"
        >
          ⚡ Get NextNative now
        </Link>

        {/* Social proof */}
        <div className="mt-5 flex items-center gap-2">
          <div className="relative">
            <AvatarList size="sm" />
          </div>
          <div className="flex flex-col items-start">
            <RatingSvg />
            <div className="pl-2 text-sm font-medium text-gray-500">
              Loved by <strong>35+</strong> teams & indie devs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
