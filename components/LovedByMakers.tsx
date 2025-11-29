// async function LovedByMakers() {
//   let customersCount = 20;
//   let isError = false;

//   try {
//     const res = await fetch(`${process.env.API_URL}/customers-count`, {
//       next: { revalidate: 600 },
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch customers count");
//     }
//     const data = await res.json();
//     customersCount = data.count || 20;
//   } catch (error) {
//     console.error("Error calculating discount limit:", error);
//     isError = true;
//   }
//   return (
//     <div className="pl-2 font-medium text-gray-500">
//       Loved by <span className="text-foreground">{customersCount}+</span>{" "}
//       teams/devs
//     </div>
//   );
// }

// export default LovedByMakers;

"use client";

import { useEffect, useState } from "react";

const DEFAULT_COUNT = 45;

export default function LovedByMakers() {
  const [count, setCount] = useState<number>(DEFAULT_COUNT);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customers-count`,
        );
        if (!res.ok) return;

        const data = await res.json();
        if (!cancelled && typeof data.count === "number") {
          setCount(data.count);
        }
      } catch (err) {
        console.error("Error loading customers count:", err);
        // stay on DEFAULT_COUNT
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="pl-2 font-medium text-gray-500">
      Loved by <span className="text-foreground transition-all">{count}+</span>{" "}
      teams/devs
    </div>
  );
}
