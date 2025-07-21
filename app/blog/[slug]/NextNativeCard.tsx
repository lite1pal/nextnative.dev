import HighlightedSpan from "@/components/HighlightedSpan";
import Logo from "@/components/Logo";
import CTABlogButton from "./CTABlogButton";
import { AvatarList, RatingSvg } from "@/components/HeroSection2";
import LogoSymbol from "@/components/LogoSymbol";
import Link from "next/link";

async function NextNativeCard({ post }: { post: { slug: string } }) {
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
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className="sticky top-20 rounded-xl p-6 bg-white"
    >
      <div className="text-center items-center flex flex-col">
        <Link href="/" className="flex items-center gap-4">
          <div className="relative top-[2px]">
            <LogoSymbol />
          </div>
          {/* <p className="text-2xl font-[500]">nextnative</p> */}
        </Link>
        <h3 className="text-2xl mt-7 font-semibold">
          Launch mobile apps 10x faster with{" "}
          <HighlightedSpan>Next.js</HighlightedSpan>
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Skip native dev. Use Next.js + Capacitor to go live fast.
        </p>
        <CTABlogButton post={{ slug: post.slug }} />
        {isError ? (
          <p className="mt-3 text-xs text-pink-600 font-medium">
            🎁 50% off limited offer
          </p>
        ) : (
          <p className="mt-3 text-xs text-pink-600 font-medium">
            🎁 50% off – {discountLimit - customersCount} left
          </p>
        )}
        <div className="flex mt-5 gap-2 items-center">
          <div className="relative">
            <AvatarList size="sm" />
          </div>
          <div className="flex flex-col items-start">
            <RatingSvg />
            <div className="font-medium text-xs text-gray-500 pl-2">
              Loved by{" "}
              {!isError && (
                <span className="text-foreground">{customersCount}</span>
              )}{" "}
              makers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextNativeCard;
