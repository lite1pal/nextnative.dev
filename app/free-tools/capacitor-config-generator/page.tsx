"use client";

import { useState } from "react";

export default function CapacitorConfigGenerator() {
  const [appName, setAppName] = useState("MyApp");
  const [appId, setAppId] = useState("com.example.myapp");
  const [webDir, setWebDir] = useState("out");
  const [bundledWebRuntime, setBundledWebRuntime] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [serverUrl, setServerUrl] = useState("");

  const config = {
    appId,
    appName,
    webDir,
    bundledWebRuntime,
    backgroundColor,
    ...(serverUrl ? { server: { url: serverUrl } } : {}),
    plugins: {
      SplashScreen: {
        launchShowDuration: 2000,
        backgroundColor,
        androidSplashResourceName: "splash",
        androidScaleType: "CENTER_CROP",
        showSpinner: false,
      },
    },
  };

  const configString = `import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = ${JSON.stringify(config, null, 2)};

export default config;`;

  const downloadConfig = () => {
    const blob = new Blob([configString], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "capacitor.config.ts";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-3 text-center text-4xl font-bold text-gray-900 dark:text-white">
        Capacitor Config Generator ⚙️
      </h1>
      <p className="mb-10 text-center text-gray-600 dark:text-gray-400">
        Generate a valid <code>capacitor.config.ts</code> for your Next.js or
        web project. Copy, customize, and use it instantly in your app.
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
          <span className="mb-1 font-medium">App ID (Bundle ID)</span>
          <input
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            placeholder="com.example.myapp"
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>

        <label className="flex flex-col text-left">
          <span className="mb-1 font-medium">Web Directory</span>
          <input
            value={webDir}
            onChange={(e) => setWebDir(e.target.value)}
            placeholder="out or build"
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>

        <label className="flex flex-col text-left">
          <span className="mb-1 font-medium">Background Color</span>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="h-10 w-full cursor-pointer rounded-xl border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
          />
        </label>

        <label className="flex flex-col text-left">
          <span className="mb-1 font-medium">Server URL (optional)</span>
          <input
            value={serverUrl}
            onChange={(e) => setServerUrl(e.target.value)}
            placeholder="https://my-app.vercel.app"
            className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </label>

        <div className="flex items-center justify-start space-x-3 pt-6">
          <input
            id="bundled"
            type="checkbox"
            checked={bundledWebRuntime}
            onChange={(e) => setBundledWebRuntime(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-gray-400 text-green-600 focus:ring-green-600"
          />
          <label
            htmlFor="bundled"
            className="cursor-pointer text-gray-800 dark:text-gray-200"
          >
            Include bundled web runtime
          </label>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          Generated capacitor.config.ts
        </h2>
        <textarea
          readOnly
          value={configString}
          className="h-96 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 font-mono text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => navigator.clipboard.writeText(configString)}
            className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
          >
            Copy
          </button>
          <button
            onClick={downloadConfig}
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
