"use client";

import { useState } from "react";

export default function AppPrivacyPolicyGenerator() {
  const [appName, setAppName] = useState("MyApp");
  const [developerName, setDeveloperName] = useState("John Doe");
  const [collectsData, setCollectsData] = useState(true);
  const [usesAnalytics, setUsesAnalytics] = useState(true);
  const [usesAds, setUsesAds] = useState(false);
  const [contactEmail, setContactEmail] = useState("support@example.com");

  const generatePolicy = () => {
    return `
# Privacy Policy for ${appName}

${appName} is developed and published by ${developerName}. This Privacy Policy explains how we handle your information when you use the app.

## Information We Collect
${
  collectsData
    ? `${appName} may collect limited personal or usage information necessary to provide a better experience.`
    : `${appName} does not collect any personal information from users.`
}

${
  usesAnalytics
    ? `We may use analytics services (such as Firebase Analytics) to understand how users interact with the app.`
    : `No analytics tools are used in ${appName}.`
}

${
  usesAds
    ? `This app displays ads, which may use anonymous identifiers for ad personalization.`
    : `This app does not display advertisements or use ad networks.`
}

## How We Use Information
We use any collected data solely to improve app functionality and user experience. Data is not shared with third parties unless required by law.

## Your Rights
You can contact us at ${contactEmail} to request deletion of your data or ask questions about this policy.

## Changes to This Policy
This policy may be updated occasionally. We recommend checking this page periodically for changes.

_Last updated: ${new Date().toLocaleDateString()}_
    `.trim();
  };

  const policyText = generatePolicy();

  const downloadPolicy = () => {
    const blob = new Blob([policyText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "privacy-policy.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-2xl py-16">
      <h1 className="mb-3 text-center text-4xl font-bold text-gray-900 dark:text-white">
        App Privacy Policy Generator 🔒
      </h1>
      <p className="mb-10 text-center text-gray-600 dark:text-gray-400">
        Instantly generate a privacy policy for your iOS, Android, or web app.
        Perfect for App Store and Google Play submissions.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col text-left">
          <span className="mb-1 font-medium">App Name</span>
          <input
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>

        <label className="flex flex-col text-left">
          <span className="mb-1 font-medium">Developer Name / Company</span>
          <input
            value={developerName}
            onChange={(e) => setDeveloperName(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={collectsData}
            onChange={(e) => setCollectsData(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-gray-400 text-green-600 focus:ring-green-600"
          />
          <span className="text-gray-800 dark:text-gray-200">
            Collects user data
          </span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={usesAnalytics}
            onChange={(e) => setUsesAnalytics(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-gray-400 text-green-600 focus:ring-green-600"
          />
          <span className="text-gray-800 dark:text-gray-200">
            Uses analytics tools
          </span>
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={usesAds}
            onChange={(e) => setUsesAds(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-gray-400 text-green-600 focus:ring-green-600"
          />
          <span className="text-gray-800 dark:text-gray-200">
            Shows advertisements
          </span>
        </label>

        <label className="flex flex-col text-left sm:col-span-2">
          <span className="mb-1 font-medium">Contact Email</span>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>
      </div>

      <div className="mt-10">
        <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          Generated Privacy Policy
        </h2>
        <textarea
          readOnly
          value={policyText}
          className="h-96 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 font-mono text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => navigator.clipboard.writeText(policyText)}
            className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
          >
            Copy
          </button>
          <button
            onClick={downloadPolicy}
            className="rounded-xl border border-green-600 px-4 py-2 font-semibold text-green-600 hover:bg-green-50 dark:hover:bg-gray-800"
          >
            Download
          </button>
        </div>
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
