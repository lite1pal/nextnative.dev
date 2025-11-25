"use client";

import { useState } from "react";

export default function BundleIdGenerator() {
  const [company, setCompany] = useState("nextnative");
  const [appName, setAppName] = useState("myapp");
  const [bundleId, setBundleId] = useState("com.nextnative.myapp");

  const generateBundleId = (company: string, app: string) => {
    const clean = (str: string) =>
      str
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "")
        .trim();
    const c = clean(company);
    const a = clean(app);
    return `com.${c}.${a}`;
  };

  const handleGenerate = () => {
    const id = generateBundleId(company, appName);
    setBundleId(id);
  };

  return (
    <div className="mx-auto max-w-2xl py-16 text-center">
      <h1 className="mb-3 text-4xl font-bold text-gray-900 dark:text-white">
        iOS Bundle ID Generator 🍎
      </h1>
      <p className="mb-10 text-gray-600 dark:text-gray-400">
        Instantly generate a valid iOS <code>Bundle ID</code> in reverse domain
        format. Perfect for App Store, Xcode, and Capacitor apps.
      </p>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-left">
          <span className="mb-1 font-medium">Company / Domain name</span>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>
        <label className="flex flex-col text-left">
          <span className="mb-1 font-medium">App name</span>
          <input
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>
      </div>

      <button
        onClick={handleGenerate}
        className="mb-6 rounded-xl bg-green-600 px-6 py-2 font-semibold text-white hover:bg-green-700"
      >
        Generate
      </button>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
          Generated Bundle ID
        </h2>
        <p className="mb-4 font-mono text-lg text-green-600 dark:text-green-400">
          {bundleId}
        </p>
        <button
          onClick={() => navigator.clipboard.writeText(bundleId)}
          className="rounded-xl border border-green-600 px-4 py-2 font-semibold text-green-600 hover:bg-green-50 dark:hover:bg-gray-800"
        >
          Copy to Clipboard
        </button>
      </div>

      <p className="mt-10 text-gray-500 dark:text-gray-400">
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
