"use client";

import Link from "next/link";
import Button from "./Button";
import Logo from "./Logo";
import { useState, useEffect } from "react";
import { trackEvent } from "@/services/custom-analytics";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blog");
  const isComponentPage = pathname.startsWith("/components");

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (!event.target.closest(".navbar")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const updateScrolled = () => {
      if (isBlog) setScrolled(window.scrollY > 10);
    };

    // Run once on mount to check initial position
    updateScrolled();

    // Then listen to scroll events
    window.addEventListener("scroll", updateScrolled);
    return () => window.removeEventListener("scroll", updateScrolled);
  }, [isBlog]);

  return (
    <div
      className={cn(
        "navbar sticky top-0 z-50 flex items-center justify-between py-4 transition-all duration-300 md:py-5",
        scrolled && isBlog
          ? "top-3 mx-auto rounded-full bg-white px-8 shadow-xl md:py-4"
          : "bg-transparent",
      )}
    >
      <div onClick={() => setIsMenuOpen(false)}>
        <Logo />
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop navigation */}
      <div className="hidden items-center gap-8 md:flex lg:gap-14">
        <Link
          href="/showcase"
          onClick={() => {
            trackEvent("Navbar_Showcase_clicked");
          }}
          className="hover:text-primary cursor-pointer text-base transition-colors md:text-lg"
        >
          Showcase
        </Link>
        <Link
          onClick={() => {
            trackEvent("Navbar_Docs_clicked");
          }}
          href="https://nextnative.dev/docs"
          className="hover:text-primary text-base transition-colors md:text-lg"
        >
          Docs
        </Link>
        <Link
          href="/#pricing"
          onClick={(e) => {
            e.preventDefault();
            trackEvent("Navbar_pricing clicked");

            const el = document.getElementById("pricing");
            if (el) {
              el.scrollIntoView();
            } else {
              window.location.href = "/#pricing";
            }
          }}
          className="hover:text-primary text-base transition-colors md:text-lg"
        >
          Pricing
        </Link>
        <Link
          href="/#faq"
          onClick={() => {
            trackEvent("Navbar_FAQ_clicked");
          }}
          className="hover:text-primary cursor-pointer text-base transition-colors md:text-lg"
        >
          FAQ
        </Link>
        <Link
          href="/blog"
          onClick={() => {
            trackEvent("Navbar_Blog_clicked");
          }}
          className="hover:text-primary cursor-pointer text-base transition-colors md:text-lg"
        >
          Blog
        </Link>

        {isComponentPage ? (
          <Link
            href="/"
            onClick={() => {
              trackEvent("Navbar_ComponentPage_UnlockAllComponents_clicked");
            }}
          >
            <Button variant="primary" className="py-2 md:px-8 md:py-2">
              Unlock all components
            </Button>
          </Link>
        ) : (
          <Link
            href="/playground"
            onClick={() => {
              trackEvent("Navbar_TryForFree_clicked");
              window?.datafast("try_for_free_clicked_from_navbar");
            }}
          >
            <Button variant="secondary">Try for free</Button>
          </Link>
        )}
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 left-0 z-50 flex flex-col gap-4 bg-white p-4 shadow-lg md:hidden">
          <Link
            href="/showcase"
            onClick={() => {
              setIsMenuOpen(false);
              trackEvent("Navbar_Showcase_clicked");
            }}
            className="hover:text-primary cursor-pointer text-base transition-colors md:text-lg"
          >
            Showcase
          </Link>
          <Link
            onClick={() => {
              setIsMenuOpen(false);
              trackEvent("Navbar_Docs_clicked");
            }}
            href="https://nextnative.dev/docs"
            className="hover:text-primary text-base transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/#pricing"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              trackEvent("Navbar_pricing clicked");

              const el = document.getElementById("pricing");
              if (el) {
                el.scrollIntoView();
              } else {
                // fallback: go to home with hash if not already on /
                window.location.href = "/#pricing";
              }
            }}
            className="hover:text-primary text-base transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            onClick={() => {
              setIsMenuOpen(false);
              trackEvent("Navbar_Blog_clicked");
            }}
            className="hover:text-primary cursor-pointer text-base transition-colors md:text-lg"
          >
            Blog
          </Link>
          <Link
            href="/#faq"
            onClick={() => {
              setIsMenuOpen(false);
              trackEvent("Navbar_FAQ_clicked");
            }}
            className="hover:text-primary cursor-pointer text-base transition-colors md:text-lg"
          >
            FAQ
          </Link>

          <Link
            href="/playground"
            onClick={() => {
              setIsMenuOpen(false);
              trackEvent("Navbar_TryForFree_clicked");
              window?.datafast("try_for_free_clicked_from_navbar");
            }}
          >
            <Button variant="secondary">Try for free</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
