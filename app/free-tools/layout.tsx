import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Mobile App Development Tools | NextNative",
  description:
    "Free tools for mobile app developers. Generate app icons, splash screens, and more. No signup required.",
};

export default function FreeToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
