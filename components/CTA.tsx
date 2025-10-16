import { cn } from "@/lib/utils";
import CTAButton from "./CTAButton";
import CTAButtonSecondary from "./CTASecondary";

async function CTA({ className }: { className?: string }) {
  let customersCount = 20;
  let discountLimit = 25;
  let isError = false;

  try {
    const res = await fetch(`${process.env.API_URL}/customers-count`, {
      next: { revalidate: 84600 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch customers count");
    }
    const data = await res.json();
    customersCount = data.count || 20;

    discountLimit = Math.ceil((customersCount + 1) / 5) * 5;
  } catch (error) {
    console.error("Error calculating discount limit:", error);
    isError = true;
  }

  return (
    <div className={cn("flex flex-col gap-4 xl:items-center", className)}>
      <div className="flex flex-col gap-3 md:flex-row">
        <CTAButton />
        <CTAButtonSecondary />
      </div>

      {isError ? (
        <ErrorCase />
      ) : (
        <div className="flex flex-col">
          <p className="flex items-center gap-2 font-medium text-gray-500">
            <span className="text-xl">🎁</span>
            <span className="sm:text-xl">
              <span className="text-red-500">40% off</span> for the first{" "}
              {discountLimit} customers,{" "}
              <span className="text-red-500">
                {discountLimit - customersCount} left
              </span>
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default CTA;

function ErrorCase() {
  return (
    <div className="flex flex-col">
      <p className="flex items-center gap-2 font-medium text-gray-500">
        <span className="text-xl">🎁</span>
        <span className="sm:text-xl">
          <span className="text-red-500">40% off </span>limited time offer
        </span>
      </p>
    </div>
  );
}
