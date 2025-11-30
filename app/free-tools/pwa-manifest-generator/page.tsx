"use client";

import { useState } from "react";

export default function PwaManifestGenerator() {
  const [appName, setAppName] = useState("My Awesome App");
  const [shortName, setShortName] = useState("AwesomeApp");
  const [themeColor, setThemeColor] = useState("#06B300");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [startUrl, setStartUrl] = useState("/");
  const [display, setDisplay] = useState("standalone");
  const [orientation, setOrientation] = useState("portrait");

  const manifest = {
    name: appName,
    short_name: shortName,
    start_url: startUrl,
    display,
    orientation,
    background_color: backgroundColor,
    theme_color: themeColor,
    icons: [
      {
        src: "icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  const manifestString = JSON.stringify(manifest, null, 2);

  const downloadManifest = () => {
    const blob = new Blob([manifestString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manifest.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-2xl py-16">
      <h1 className="mb-3 text-center text-4xl font-bold text-gray-900">
        PWA Manifest Generator ⚙️
      </h1>
      <p className="mb-10 text-center text-gray-600">
        Generate a valid <code>manifest.json</code> for your Progressive Web
        App. No signup, no backend — just instant copy & download.
      </p>

      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col">
            <span className="mb-1 font-medium">App name</span>
            <input
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Short name</span>
            <input
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Start URL</span>
            <input
              value={startUrl}
              onChange={(e) => setStartUrl(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Display</span>
            <select
              value={display}
              onChange={(e) => setDisplay(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
            >
              <option>standalone</option>
              <option>fullscreen</option>
              <option>minimal-ui</option>
              <option>browser</option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Orientation</span>
            <select
              value={orientation}
              onChange={(e) => setOrientation(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
            >
              <option>portrait</option>
              <option>landscape</option>
            </select>
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Theme color</span>
            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="h-10 w-full cursor-pointer rounded-xl border border-gray-300 bg-white"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Background color</span>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="h-10 w-full cursor-pointer rounded-xl border border-gray-300 bg-white"
            />
          </label>
        </div>

        <div className="mt-10">
          <h2 className="mb-2 text-xl font-semibold text-gray-900">
            Generated manifest.json
          </h2>
          <textarea
            readOnly
            value={manifestString}
            className="h-80 w-full rounded-xl border border-gray-300 bg-gray-50 p-3 font-mono text-sm text-gray-800"
          />
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => navigator.clipboard.writeText(manifestString)}
              className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
            >
              Copy
            </button>
            <button
              onClick={downloadManifest}
              className="rounded-xl border border-green-600 px-4 py-2 font-semibold text-green-600 hover:bg-green-50"
            >
              Download
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-gray-500">
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
    </div>
  );
}
