"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Button", href: "/components/button" },
  // { label: "Input", href: "/components/input" },
  // { label: "Card", href: "/components/card" },
  // { label: "Avatar", href: "/components/avatar" },
  // { label: "Badge / Chip", href: "/components/badge" },
  // { label: "Tabs", href: "/components/tabs" },
  // { label: "Bottom Nav", href: "/components/bottom-nav" },
  // { label: "Search Bar", href: "/components/search-bar" },
  // { label: "Empty State", href: "/components/empty-state" },
  // { label: "Toast", href: "/components/toast" },
  // { label: "Modal", href: "/components/modal" },
  // { label: "Bottom Sheet", href: "/components/bottom-sheet" },
  // { label: "Skeleton", href: "/components/skeleton" },
  // { label: "Auth (Onboarding / Sign In)", href: "/screens/auth" },
  // { label: "Home Feed", href: "/screens/feed" },
  // { label: "Detail + Comments", href: "/screens/detail" },
  // { label: "Pricing / Paywall", href: "/screens/pricing" },
  // { label: "Settings", href: "/screens/settings" },
];

function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="py-6 lg:py-10">
      {/* Top bar (mobile) */}
      <div className="sticky top-0 z-40 mb-4 flex items-center justify-between border-b bg-white/80 px-4 py-3 backdrop-blur lg:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50"
        >
          <Menu className="h-5 w-5" />
          Menu
        </button>
        <div className="text-sm text-gray-500">Components</div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 lg:grid-cols-[260px_1fr] lg:gap-10">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20">
          {/* Mobile drawer */}
          <div
            className={`fixed inset-0 z-50 bg-black/30 transition-opacity lg:hidden ${
              open
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
            onClick={() => setOpen(false)}
          />
          <nav
            className={`fixed top-0 left-0 z-50 flex h-full w-80 flex-col bg-white p-4 shadow-xl transition-transform lg:static lg:h-auto lg:w-auto lg:translate-x-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
            aria-label="Sidebar"
          >
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <span className="text-base font-semibold">Browse</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="rounded-lg border px-2.5 py-2 hover:bg-gray-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ul className="max-h-[70vh] space-y-1 overflow-y-auto pr-1 lg:max-h-none lg:space-y-1.5">
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={[
                        "block rounded-lg px-4 py-2 text-base transition-colors",
                        active
                          ? "border-primary text-primary hover:bg-primary border-2 font-[500] hover:text-white"
                          : "bg-white text-gray-800 hover:bg-gray-100",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
