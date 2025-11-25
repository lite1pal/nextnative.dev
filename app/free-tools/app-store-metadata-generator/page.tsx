"use client";

import { useMemo, useState } from "react";

type Out = {
  iosTitle: string;
  iosSubtitle: string;
  iosKeywords: string; // CSV (<=100 chars guidance)
  iosDescription: string;

  gpShort: string; // <=80 chars guidance
  gpLong: string;

  categories: string[];
  checklist: string[];
};

const clamp = (s: string, n: number) =>
  s.length <= n ? s : s.slice(0, n - 1) + "…";
const sanitize = (s: string) => s.replace(/\s+/g, " ").trim();
const csv = (arr: string[]) =>
  arr
    .map((x) =>
      x
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim(),
    )
    .filter(Boolean)
    .join(", ");

export default function AppStoreMetadataGenerator() {
  const [name, setName] = useState("NextNative Starter");
  const [oneLiner, setOneLiner] = useState(
    "Ship your Next.js app to iOS & Android with Capacitor.",
  );
  const [features, setFeatures] = useState(
    "Push notifications; Camera & files; In-app purchases; Offline mode",
  );
  const [audience, setAudience] = useState(
    "indie makers, web developers, startups",
  );
  const [keywords, setKeywords] = useState(
    "next.js, capacitor, mobile app, app store, pwa",
  );
  const [tone, setTone] = useState<"friendly" | "professional" | "playful">(
    "friendly",
  );

  const out: Out = useMemo(() => {
    const fList = sanitize(features)
      .split(/[;,\n]/)
      .map((s) => sanitize(s))
      .filter(Boolean)
      .slice(0, 10);

    const kwBase = sanitize(keywords)
      .split(/[;,]/)
      .map((k) => sanitize(k))
      .filter(Boolean);

    // Expand keywords lightly from features/audience
    const extra = [
      ...fList.map((f) => f.split(" ")[0]),
      ...audience.split(/[,\n]/).map((a) => sanitize(a).split(" ")[0]),
    ]
      .map((x) => x.toLowerCase())
      .filter(Boolean);

    const kwAll = Array.from(new Set([...kwBase, ...extra])).slice(0, 20);
    let kwCsv = csv(kwAll);
    if (kwCsv.length > 100) {
      // Trim to ~100 chars (Apple limit)
      kwCsv = kwCsv.slice(0, 100).replace(/[, ]+[^,]*$/, "");
    }

    // Title/subtitle heuristics
    const title = clamp(name, 30);
    const subRaw =
      oneLiner ||
      `${name} — ${fList[0] || "Mobile app"} for ${audience.split(",")[0] || "everyone"}`;
    const subtitle = clamp(subRaw, 30);

    // Tone presets
    const toneLead =
      tone === "friendly"
        ? "Simple, fast, and built for you."
        : tone === "playful"
          ? "No fuss, just ship."
          : "Reliable, documented, production-ready.";

    const sentences = [
      `${name} helps ${audience} ${oneLiner.toLowerCase().replace(/\.$/, "")}.`,
      `Key features include ${fList.slice(0, 3).join(", ")}${
        fList.length > 3 ? `, and more` : ""
      }.`,
      `Built for modern web teams: ${toneLead}`,
      `Start now and publish to the App Store and Google Play.`,
    ];

    const iosDescription = clamp(
      [
        sentences[0],
        "",
        "FEATURES",
        `• ${fList.join("\n• ")}`,
        "",
        sentences[2],
        "",
        sentences[3],
      ].join("\n"),
      4000,
    );

    const gpShort = clamp(oneLiner, 80);
    const gpLong = clamp(
      [
        oneLiner,
        "",
        `Who is it for: ${audience}.`,
        "",
        "Features:",
        ...fList.map((f) => `• ${f}`),
        "",
        toneLead,
        "Get started today.",
      ].join("\n"),
      4000,
    );

    const cats = [
      "Developer Tools",
      "Productivity",
      "Utilities",
      "Business",
      "Education",
    ];

    const checklist = [
      "Screenshots: 6+ per platform (different features)",
      "App icon: 1024×1024 (no transparency)",
      "Privacy policy URL",
      "Short & long description proofread",
      "Accurate age rating & permissions",
      "Keywords (iOS) within 100 chars",
    ];

    return {
      iosTitle: title,
      iosSubtitle: subtitle,
      iosKeywords: kwCsv,
      iosDescription,
      gpShort,
      gpLong,
      categories: cats,
      checklist,
    };
  }, [name, oneLiner, features, audience, keywords, tone]);

  const bundle = useMemo(() => {
    const meta = {
      ios: {
        title: out.iosTitle,
        subtitle: out.iosSubtitle,
        keywords: out.iosKeywords,
        description: out.iosDescription,
        suggestedCategories: out.categories.slice(0, 2),
      },
      googlePlay: {
        shortDescription: out.gpShort,
        fullDescription: out.gpLong,
        suggestedCategories: out.categories.slice(0, 2),
      },
    };
    return JSON.stringify(meta, null, 2);
  }, [out]);

  const download = () => {
    const blob = new Blob([bundle], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "app-store-metadata.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-5xl py-16">
      <h1 className="mb-2 text-center text-4xl font-bold text-gray-900 dark:text-white">
        App Store Metadata Generator 📝
      </h1>
      <p className="mb-10 text-center text-gray-600 dark:text-gray-400">
        Create iOS & Google Play titles, subtitles, keywords, and descriptions
        from a few fields. Copy or download JSON.
      </p>

      {/* Inputs */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col">
          <span className="mb-1 font-medium">App name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <span className="mt-1 text-xs text-gray-400">
            Max 30 chars for iOS title
          </span>
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-medium">One-line value (tagline)</span>
          <input
            value={oneLiner}
            onChange={(e) => setOneLiner(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>

        <label className="flex flex-col sm:col-span-2">
          <span className="mb-1 font-medium">
            Core features (separate with commas or semicolons)
          </span>
          <input
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-medium">Primary audience</span>
          <input
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-medium">
            Seed keywords (comma-separated)
          </span>
          <input
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
          <span className="mt-1 text-xs text-gray-400">
            We’ll format a 100-char iOS keywords CSV
          </span>
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-medium">Tone</span>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as any)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <option value="friendly">Friendly</option>
            <option value="professional">Professional</option>
            <option value="playful">Playful</option>
          </select>
        </label>
      </div>

      {/* Outputs */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="iOS App Store">
          <Field label="Title (≤30)">
            <code className="break-words">{out.iosTitle}</code>
          </Field>
          <Field label="Subtitle (≤30)">
            <code className="break-words">{out.iosSubtitle}</code>
          </Field>
          <Field label="Keywords CSV (≤100)">
            <textarea readOnly value={out.iosKeywords} className="textarea" />
          </Field>
          <Field label="Full description (≤4000)">
            <textarea
              readOnly
              value={out.iosDescription}
              className="textarea h-56"
            />
          </Field>
        </Card>

        <Card title="Google Play">
          <Field label="Short description (≤80)">
            <textarea readOnly value={out.gpShort} className="textarea" />
          </Field>
          <Field label="Full description (≤4000)">
            <textarea readOnly value={out.gpLong} className="textarea h-56" />
          </Field>
        </Card>

        <Card title="Suggestions">
          <Field label="Suggested categories">
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
              {out.categories.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Field>
          <Field label="Screenshot checklist">
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
              {out.checklist.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </Field>
        </Card>

        <Card title="Download JSON">
          <textarea readOnly value={bundle} className="textarea h-48" />
          <div className="mt-3 flex justify-center gap-3">
            <button
              onClick={() => navigator.clipboard.writeText(bundle)}
              className="btn-primary bg-green-600 text-white hover:bg-green-700"
            >
              Copy
            </button>
            <button onClick={download} className="btn-outline text-green-700">
              Download
            </button>
          </div>
        </Card>
      </div>

      <p className="mt-10 text-center text-gray-500 dark:text-gray-400">
        Built with ❤️ by{" "}
        <a
          href="https://nextnative.dev"
          className="font-semibold text-green-600 underline hover:text-green-700"
        >
          NextNative.dev
        </a>{" "}
        team.
      </p>
    </div>
  );
}

/* ---------- tiny presentational helpers ---------- */
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      {children}
    </section>
  );
}
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>
      {children}
    </div>
  );
}

/* utility classes for textareas & buttons */
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // no-op
    }
  }
}
