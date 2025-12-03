import LovedByMakers from "./LovedByMakers";
import { AvatarList } from "./AvatarList";
import RatingSvg from "./RatingSvg";

function HeroSection({
  heading,
  paragraph,
  leftTop,
  rightTop,
  leftBottom,
  rightBottom,
  ctaButton,
  includeRatingStars = true,
}: {
  heading: string | React.ReactNode;
  paragraph: string;
  leftTop: React.ReactNode;
  rightTop: React.ReactNode;
  leftBottom: React.ReactNode;
  rightBottom: React.ReactNode;
  ctaButton: React.ReactNode;
  includeRatingStars?: boolean;
}) {
  return (
    <div className="relative mx-auto flex flex-col items-center justify-center py-12 md:py-20 md:pt-16">
      <div className="hidden w-full items-center justify-between pb-10 xl:flex">
        <div className="rotate-[-7deg]">{leftTop}</div>
        <div className="rotate-[7deg]">{rightTop}</div>
      </div>

      <div className="pointer-events-none absolute bottom-14 hidden w-full items-center justify-between xl:flex">
        <div className="relative -left-16 rotate-[-15deg] pb-10">
          {leftBottom}
        </div>
        <div className="relative -right-16 rotate-[15deg]">{rightBottom}</div>
      </div>

      <div className="flex w-full max-w-[946.5px] flex-col gap-8 md:gap-[45px] xl:items-center xl:text-center">
        <div className="flex flex-col gap-6 md:gap-[36px] xl:items-center xl:text-center">
          <div className="flex flex-col items-center">
            <Heading>{heading}</Heading>
          </div>

          <Paragraph>{paragraph}</Paragraph>
        </div>

        {ctaButton}

        {includeRatingStars && (
          <div className="-mt-2.5 flex items-center gap-3 max-sm:-ml-2.5 sm:gap-2">
            <AvatarList priority />
            <div className="flex flex-col">
              <RatingSvg priority />
              <LovedByMakers />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSection;

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-[44px] leading-[60px] font-[600] md:text-[74px] md:leading-[91px]">
      {children}
    </h1>
  );
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-[654.36px] text-base leading-relaxed sm:text-lg md:text-[22px]">
      {children}
    </p>
  );
}
