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

export default function CountdownTimer({
  targetISO,
  className = "",
}: CountdownProps) {
  const target = new Date(targetISO);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

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
        Ends in {days} days and {two(hours)}:{two(minutes)}:{two(seconds)}
      </span>
    </div>
  );
}
