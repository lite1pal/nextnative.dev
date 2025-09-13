"use client";

import { useEffect, useState, useCallback, type ReactNode } from "react";
import { X } from "lucide-react";

type MobileCTAClientProps = {
  children: ReactNode; // <- pass your Server Component here
  showAfterPx?: number; // when to show on scroll (default 350)
  storageKey?: string; // session storage key (default 'nn-mobile-cta-dismissed')
};

export default function MobileCTAClient({
  children,
  showAfterPx = 350,
  storageKey = "nn-mobile-cta-dismissed",
}: MobileCTAClientProps) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // detect mobile
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // show after scroll & respect dismissal
  useEffect(() => {
    if (!isMobile) return;
    if (sessionStorage.getItem(storageKey) === "1") return;

    const onScroll = () => {
      if (window.scrollY >= showAfterPx) setVisible(true);
    };
    onScroll(); // handle reload mid-page
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile, showAfterPx, storageKey]);

  const close = useCallback(() => {
    sessionStorage.setItem(storageKey, "1");
    setVisible(false);
  }, [storageKey]);

  if (!isMobile || !visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-2 z-40 animate-[nnSlideUp_.25s_ease-out] px-3 sm:hidden"
      role="dialog"
      aria-label="Mobile call to action"
    >
      <div className="relative mx-auto w-full max-w-md">
        <button
          aria-label="Close"
          onClick={close}
          className="absolute top-3 right-3 rounded-full p-1 text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-700"
        >
          <X size={18} className="font-[500]" />
        </button>

        {/* Server component content goes here */}
        {children}
      </div>

      <div className="h-2" />
      <style jsx global>{`
        @keyframes nnSlideUp {
          from {
            transform: translateY(12px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
