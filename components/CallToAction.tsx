import CTA from "./CTA";
import Subheading from "./Subheading";
import { AvatarList } from "./AvatarList";
import RatingSvg from "./RatingSvg";
import LovedByMakers from "./LovedByMakers";
import CTAWithSocialProof from "./CTAWithSocialProof";

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
      <CTAWithSocialProof />
    </div>
  );
}

export default CallToAction;
