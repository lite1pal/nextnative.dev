import { cn } from "@/lib/utils";
import { ExternalLink, PersonStanding } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import { RatingSvg } from "./HeroSection2";

function Testimonial({
  name,
  description,
  testimonial,
  imgSrc,
  className = "",
  time,
  showStars = false,
  letters,
  url,
}: {
  name: string;
  description: string;
  testimonial: ReactNode;
  imgSrc?: string;
  className?: string;
  time?: string;
  showStars?: boolean;
  letters?: string;
  url?: string;
}) {
  return (
    <div
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
      className={cn(
        `flex flex-col rounded-2xl px-10 bg-white text-lg md:text-[22px] gap-6 mx-auto max-w-[759.07px] py-8 sm:py-16 my-16`,
        className
      )}
    >
      <div className="flex max-sm:flex-wrap items-center gap-4">
        <div
          className={`${imgSrc ? "w-[80px] h-[80px]" : "w-[50px] h-[50px]"} relative shrink-0`}
        >
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt="Profile picture"
              width={100}
              height={100}
              className="rounded-full object-cover w-[80px] h-[80px]"
              sizes="25vw"
            />
          ) : (
            <div className="rounded-full flex items-center justify-center bg-green-400 object-cover w-[50px] h-[50px]">
              {/* <div className="bg-indigo-400 rounded-full w-[50px] h-[50px]"></div> */}
              {letters}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="font-[500]">{name}</p>
          <p className="text-gray">{description}</p>
        </div>
        {showStars && (
          <div className="mt-1">
            <RatingSvg />
          </div>
        )}

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener"
            className="text-gray ml-auto"
            aria-label="Visit external link"
          >
            <ExternalLink className="size-5" />
          </a>
        )}
      </div>

      <blockquote className="leading-9 sm:leading-10">{testimonial}</blockquote>

      <time className="text-base text-gray">{time}</time>
    </div>
  );
}

export default Testimonial;
