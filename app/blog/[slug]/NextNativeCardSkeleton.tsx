import HighlightedSpan from "@/components/HighlightedSpan";
import Logo from "@/components/Logo";
import CTABlogButton from "./CTABlogButton";
import { AvatarList, RatingSvg } from "@/components/HeroSection2";

function NextNativeCardSkeleton() {
  return (
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className="sticky top-20 rounded-xl p-6 bg-white"
    >
      <div className="text-center items-center flex flex-col">
        <Logo />
        <h3 className="text-xl mt-7 font-semibold">
          Launch mobile apps with <HighlightedSpan>Next.js</HighlightedSpan>
        </h3>
        <p className="text-sm text-gray-600 mt-2">
          Skip native dev. Use Capacitor + Next.js to go live fast.
        </p>
        <CTABlogButton post={{ slug: "" }} />

        <p className="mt-3 text-xs text-pink-600 font-medium">
          🎁 60% off – 5 left
        </p>
        <div className="flex mt-5 gap-2 items-center">
          <div className="relative">
            <AvatarList size="sm" />
          </div>
          <div className="flex flex-col items-start">
            <RatingSvg />
            <div className="font-medium text-xs text-gray-500 pl-2">
              Loved by <span className="text-foreground">20</span> makers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextNativeCardSkeleton;
