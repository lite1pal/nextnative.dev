import { Suspense } from "react";
import CTA from "./CTA";
import Subheading from "./Subheading";
import CTASkeleton from "./CTASkeleton";
import { AvatarList } from "./AvatarList";
import RatingSvg from "./RatingSvg";
import LovedByMakers from "./LovedByMakers";
import LovedByMakersSkeleton from "./LovedByMakersSkeleton";

interface CallToActionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  className?: string;
}

function CallToAction({
  title,
  subtitle,
  buttonText,
  className,
}: CallToActionProps) {
  return (
    <div
      className={`flex flex-col gap-10 py-12 md:items-center md:py-36 md:text-center ${className}`}
    >
      <Subheading
        heading1={title}
        heading2={subtitle}
        className="md:items-center"
      />
      <div className="relative flex flex-col gap-10 sm:items-center">
        <CTA className="md:items-center" />
        <div className="flex gap-5 sm:gap-2">
          <div className="relative -top-1.5">
            <AvatarList />
          </div>
          <div className="flex flex-col">
            <RatingSvg />
            <LovedByMakers />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
