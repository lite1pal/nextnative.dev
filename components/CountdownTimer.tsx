"use client";

import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetISO: string;
  className?: string;
}

function getTimeLeft(target: Date) {
  const total = Math.max(0, target.getTime() - Date.now());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

type TimeLeft = ReturnType<typeof getTimeLeft> | null;

export default function CountdownTimer({
  targetISO,
  className = "",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(null);

  useEffect(() => {
    const target = new Date(targetISO);

    // set initial value on client
    setTimeLeft(getTimeLeft(target));

    const id = setInterval(() => {
      setTimeLeft(getTimeLeft(target));
    }, 1000);

    return () => clearInterval(id);
  }, [targetISO]);

  // what both server and client render initially (no Date.now here)
  if (!timeLeft) {
    return (
      <div
        className={`rounded-full bg-white p-2 px-8 text-xl text-black ${className}`}
      >
        <span className="font-medium">Offer ends soon…</span>
      </div>
    );
  }

  const { days, hours, minutes, seconds, total } = timeLeft;

  if (total <= 0) {
    return (
      <div
        className={`rounded-full bg-gray-900 px-3 py-1 text-white shadow-sm ${className}`}
      >
        Offer ended
      </div>
    );
  }

  const two = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      aria-live="polite"
      className={`rounded-full bg-white p-2 px-8 text-xl text-black ${className}`}
    >
      <span className="font-medium">
        Ends in {days} day and {two(hours)}:{two(minutes)}:{two(seconds)}
      </span>
    </div>
  );
}
