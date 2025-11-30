import Image from "next/image";
import HorizontalLine from "./HorizontalLine";

function SocialProof() {
  return (
    <div className="flex flex-col gap-12 py-6 max-sm:mt-16 md:flex-row md:items-center md:py-28">
      <div className="flex w-[200px] flex-col gap-4">
        <p className="text-[28px] font-[500]">Featured on</p>
        <HorizontalLine className="w-[94px]" />
      </div>

      <div className="flex w-full items-center justify-evenly gap-16">
        <div className="flex shrink-0 items-center gap-2">
          <Image
            src="/featured-on/producthunt.webp"
            alt="Product Hunt"
            width={40}
            height={40}
            className="h-12 w-12 md:h-16 md:w-16"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Image
            src="/featured-on/microlaunch.svg"
            alt="Microlaunch"
            width={40}
            height={40}
            className="h-12 w-12 md:h-16 md:w-16"
          />
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <Image
            src="/x-logo.svg"
            alt="X (formerly Twitter)"
            width={40}
            height={40}
            className="h-12 w-12 md:h-16 md:w-16"
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Image
            src="/featured-on/reddit.webp"
            alt="Reddit"
            width={40}
            height={40}
            className="h-12 w-12 md:h-16 md:w-16"
          />
        </div>
      </div>
    </div>
  );
}

export default SocialProof;
