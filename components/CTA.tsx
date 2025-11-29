// import { cn } from "@/lib/utils";
// import CTAButton from "./CTAButton";
// import CTAButtonSecondary from "./CTASecondary";

// async function CTA({ className }: { className?: string }) {
//   let customersCount = 20;
//   let discountLimit = 25;
//   let isError = false;

//   try {
//     const res = await fetch(`${process.env.API_URL}/customers-count`, {
//       next: { revalidate: 84600 },
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch customers count");
//     }
//     const data = await res.json();
//     customersCount = data.count || 20;

//     discountLimit = Math.ceil((customersCount + 1) / 5) * 5;
//   } catch (error) {
//     console.error("Error calculating discount limit:", error);
//     isError = true;
//   }

//   return (
//     <div className={cn("flex flex-col gap-4 xl:items-center", className)}>
//       <div className="flex flex-col gap-3 md:flex-row">
//         <CTAButton />
//         <CTAButtonSecondary />
//       </div>

//       {isError ? (
//         <ErrorCase />
//       ) : (
//         <div className="flex flex-col">
//           <p className="flex items-center gap-2 font-medium text-gray-500">
//             <span className="text-xl">🎁</span>
//             <span className="sm:text-xl">
//               <span className="text-red-500">50% off</span> for the first{" "}
//               {discountLimit} customers,{" "}
//               <span className="text-red-500">
//                 {discountLimit - customersCount} left
//               </span>
//             </span>
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default CTA;

// function ErrorCase() {
//   return (
//     <div className="flex flex-col">
//       <p className="flex items-center gap-2 font-medium text-gray-500">
//         <span className="text-xl">🎁</span>
//         <span className="sm:text-xl">
//           <span className="text-red-500">40% off </span>limited time offer
//         </span>
//       </p>
//     </div>
//   );
// }
"use client";

import { cn } from "@/lib/utils";
import CTAButton from "./CTAButton";
import CTAButtonSecondary from "./CTASecondary";

export default function CTA({ className }: { className?: string }) {
  // const [customersCount, setCustomersCount] = useState<number | null>(null);
  // const [discountLimit, setDiscountLimit] = useState<number | null>(null);
  // const [error, setError] = useState(false);

  // useEffect(() => {
  //   let cancelled = false;

  //   async function load() {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/customers-count`,
  //       );
  //       if (!res.ok) throw new Error();

  //       const data = await res.json();
  //       if (cancelled) return;

  //       const count = data.count ?? 20;
  //       const limit = Math.ceil((count + 1) / 5) * 5;

  //       setCustomersCount(count);
  //       setDiscountLimit(limit);
  //     } catch (err) {
  //       if (!cancelled) setError(true);
  //     }
  //   }

  //   load();
  //   return () => {
  //     cancelled = true;
  //   };
  // }, []);

  // const count = customersCount;
  // const limit = discountLimit;

  // const message = error
  //   ? {
  //       discount: "50% off",
  //       text: "limited time offer",
  //     }
  //   : count != null && limit != null
  //     ? {
  //         discount: "50% off",
  //         // text: `for the first ${limit} customers, ${limit - count} left`,
  //         text: `limited launch discount`,
  //       }
  //     : {
  //         // temporary loading state (instant)
  //         discount: "50% off",
  //         text: "limited launch discount",
  //       };

  const message = { discount: "50% off", text: "limited launch discount" };

  return (
    <div className={cn("flex flex-col gap-4 xl:items-center", className)}>
      <div className="flex flex-col gap-3 md:flex-row">
        <CTAButton />
        <CTAButtonSecondary />
      </div>

      <p className="flex items-center gap-2 font-medium text-gray-500">
        <span className="text-xl">🎁</span>
        <span className="sm:text-xl">
          <span className="text-red-500">{message.discount}</span>{" "}
          {message.text}
        </span>
      </p>
    </div>
  );
}
