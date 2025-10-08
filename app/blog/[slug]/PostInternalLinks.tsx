// components/PostFooterLinks.tsx
"use client";

import { trackEvent } from "@/services/custom-analytics";
import Link from "next/link";

type Item = { href: string; label: string };
type Props = {
  title?: string;
  links?: Item[];
  showDocs?: boolean;
};

export default function PostInternalLinks({
  title = "Explore more",
  showDocs = true,
  links = [
    { href: "/tutorials", label: "Next.js + Capacitor Tutorials" },
    { href: "/comparisons", label: "Framework Comparisons" },
    { href: "/alternatives", label: "NextNative Alternatives" },
    { href: "/use-cases", label: "Real Use-Cases" },
    { href: "/free-tools", label: "Free Tools" },
    ...(showDocs ? [{ href: "/docs", label: "Full Documentation" }] : []),
  ],
}: Props) {
  return (
    <section className="mt-10 border-t pt-6">
      <h3 className="mb-3 text-base font-medium">{title}</h3>
      <ul className="grid gap-2 sm:grid-cols-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="hover:text-foreground text-gray-600 underline-offset-2 transition-colors hover:underline"
              onClick={() => trackEvent?.(`PostFooter_${l.href}_clicked`)}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
