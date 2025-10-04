import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convert Website to App | Free Website-to-App Preview Tool",
  description:
    "Turn your website into real iOS & Android apps using Capacitor. Preview your site in a mobile frame and follow our 3-step guide to publish with NextNative.",
  metadataBase: new URL("https://nextnative.dev"),
  alternates: { canonical: "/convert-website-to-app" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://nextnative.dev/convert-website-to-app",
    siteName: "NextNative",
    title: "Convert Website to App – iOS & Android with Capacitor",
    description:
      "Wrap your website with a native shell, add icons & splash, and publish to the App Store and Google Play.",
    images: [
      {
        url: "/og/convert-website-to-app.png",
        width: 1200,
        height: 630,
        alt: "Convert Website to App – NextNative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Convert Website to App | NextNative",
    description:
      "Free preview tool + 3-step guide to ship your web app to the App Store and Google Play.",
    images: ["/og/convert-website-to-app.png"],
  },
  keywords: [
    "convert website to app",
    "website into app",
    "turn website into app",
    "make website into app",
    "convert website to app for free",
    "next.js to mobile app",
    "capacitor website to app",
  ],
};

export default function ConvertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
