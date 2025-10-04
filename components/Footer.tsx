"use client";

import Link from "next/link";
import Logo from "./Logo";
import { trackEvent } from "@/services/custom-analytics";

interface FooterLink {
  label: string;
  href: string;
  target?: string;
}

const productLinks: FooterLink[] = [
  {
    label: "Affiliates - Earn 30%",
    href: "https://nextnative.affonso.io/auth",
    target: "_blank",
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "https://nextnative.dev/docs" },
  { label: "Showcase", href: "/showcase" },
  { label: "Contact", href: "/contact" },
  {
    label: "Free tools",
    href: "/free-tools",
  },
  {
    label: "MVP Agency",
    href: "/mvp-app-development",
  },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "License", href: "/license" },
];

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-[500]">{title}</h3>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            target={link.target || "_self"}
            onClick={() => trackEvent(`Footer_${link.label}_clicked`)}
            className="text-gray hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-gray/20 mt-20 border-t">
      <div className="mx-auto px-4 py-16 md:px-0">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Logo and social section */}
          <div className="col-span-1 flex flex-col gap-6 md:col-span-4">
            <Logo />
            <p className="text-gray">Launch mobile apps faster with Next.js</p>
            <div className="flex gap-4">
              <a
                aria-label="Visit Denis on X"
                onClick={() => trackEvent("Footer_X_clicked")}
                href="https://x.com/shipwithdenis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-foreground transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                aria-label="View GitHub profile"
                onClick={() => trackEvent("Footer_GitHub_clicked")}
                href="https://github.com/lite1pal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-foreground transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </a>
              <a
                aria-label="View LinkedIn profile"
                onClick={() => trackEvent("Footer_LinkedIn_clicked")}
                href="https://www.linkedin.com/in/denis-tarasenko-nextnative/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray hover:text-foreground transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin-icon lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links sections */}
          <div className="col-span-1 md:col-span-8 md:ml-auto">
            <div className="grid grid-cols-2 gap-12">
              <FooterLinkGroup title="Product" links={productLinks} />
              <FooterLinkGroup title="Legal" links={legalLinks} />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-gray/20 mt-16 border-t pt-8">
          <p className="text-gray text-sm">
            © {new Date().getFullYear()} NextNative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
