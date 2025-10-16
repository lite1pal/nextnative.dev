"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; level: string }[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -70% 0px", // trigger a bit before heading hits top
        threshold: 0,
      },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav className="rounded-x mt-8 p-5">
      <div className="mb-5 flex items-center gap-2 text-lg font-medium uppercase">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg> */}
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-5">
        {headings.slice(0, 4).map((h) => (
          <li key={h.id} className={h.level === "h3" ? "ml-4" : ""}>
            <a
              href={`#${h.id}`}
              className={`block transition-colors ${
                activeId === h.id
                  ? "text-primary font-[500]"
                  : "hover:text-primary text-gray-600"
              }`}
            >
              {h.text.replaceAll("#", "")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
