import SocialProof from "@/components/SocialProof";
import PricingSection from "@/components/PricingSection";
import WastedTime from "@/components/WastedTime";
import Spend5Minutes from "@/components/Spend5Minutes";
import QuickStart from "@/components/QuickStart";
import CallToAction from "@/components/CallToAction";
import FAQ from "@/components/FAQ";
import DemoVideo from "@/components/DemoVideo";
import Testimonial from "@/components/Testimonial";
import SetupByDefault from "@/components/SetupByDefault";
import Image from "next/image";
import { ReactNode } from "react";
import Subheading from "@/components/Subheading";
import HeroSection2 from "@/components/HeroSection2";
import { ChevronUp } from "lucide-react";
import ShowcaseSection from "@/components/ShowcaseSection";
import LazyVideo from "@/components/LazyVideo";
import StoreGuides from "@/components/StoreGuides";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <div>
      <HeroSection2 />
      <div className="grid xl:hidden grid-cols-1 items-center lg:grid-cols-2 gap-8 sm:gap-16">
        <div className="max-w-xl mx-auto">
          <Image
            className="w-full h-full z-10 relative object-cover"
            src="/hero-section-tools.png"
            alt="Tools included in NextNative"
            priority
            width={600}
            height={600}
            sizes="(max-width: 1279px) 80vw, 0vw"
            quality={25}
          />
        </div>
      </div>

      <Testimonial
        imgSrc={""}
        letters="S"
        name="Happy customer"
        description=""
        showStars
        url="https://microlaunch.net/p/nextnative"
        testimonial={
          <div>
            Insane product & a great founder behind it - I've been trying to
            mess around creating mobile apps &{" "}
            <span className="bg-primary p-1 rounded text-white font-[500]">
              I'm getting there bit by bit w/ this helping me hugely!!
            </span>
          </div>
        }
      />

      <QuickStart />

      <DemoVideo />

      <div className="text-center md:mb-16 max-md:mt-24">
        <Subheading
          heading1="See what"
          heading2="you can build"
          className="text-start md:text-center md:items-center"
        />

        <p className="mt-6 text-lg max-w-2xl text-start md:text-center self-start w-fit md:mx-auto">
          Real apps. Real features. Fully cross-platform.
        </p>
      </div>

      <ShowcaseSection />

      <SocialProof />
      <Testimonial
        imgSrc={"/testimonials/vitaliy.jpeg"}
        name="Vitalii Zabrodskyi"
        description="Senior .NET Developer"
        showStars
        testimonial={
          <div>
            I’m really pumped about it! The setup seems super easy, and I{" "}
            <span className="bg-primary p-1 rounded text-white font-[500]">
              can’t wait to finally build my app!
            </span>
            <br /> <br />{" "}
            <a
              target="_blank"
              href="https://x.com/nextnative"
              className="text-blue-600"
            >
              @nextnative
            </a>{" "}
            by{" "}
            <a
              target="_blank"
              href="https://x.com/shipwithdenis"
              className="text-blue-600"
            >
              @shipwithdenis
            </a>{" "}
            is such a phenomenal tool!
            <br /> <br /> Wow, just wow!
          </div>
        }
      />
      <WastedTime />

      <SetupByDefault />

      <div className="flex flex-col gap-28 sm:gap-52 py-16 sm:py-32">
        {features.map((feature, index) => (
          <FeatureSection
            key={index}
            heading1={feature.heading1}
            heading2={feature.heading2}
            description={feature.description}
            isImageLeft={feature.isImageLeft}
            src={feature.src}
            alt={feature.alt}
          />
        ))}
      </div>

      <div className="mx-auto w-fit flex flex-col items-center my-16 gap-3">
        <ChevronUp className="text-gray" />
        <div className="flex items-center gap-6 py-4 px-6 pr-10 bg-white rounded-full">
          <Image
            src={"/testimonials/dagobert.jpg"}
            alt="Dagobert X profile picture"
            width={100}
            height={100}
            className="rounded-full object-cover w-[80px] h-[80px]"
            sizes="25vw"
          />
          <div className="flex flex-col text-xl gap-1">
            <p className="font-[500]">Love the ambition behind this</p>
            <p className="text-gray">Dagobert — Entrepreneur</p>
          </div>
        </div>
      </div>

      <StoreGuides />

      <Spend5Minutes />

      <PricingSection />

      <TestimonialsSection />

      <CallToAction
        title="Start building in minutes."
        subtitle="Save weeks of work."
        buttonText="Launch mobile apps"
      />
      <FAQ />
    </div>
  );
}

const features = [
  {
    heading1: "Splash screen",
    heading2: "",
    description: (
      <>
        Super simple, yet powerful! <br />
        <br /> Swap in your logo, and you’re good to launch with a stunning
        first impression.
      </>
    ),
    isImageLeft: false,
    src: "/section-videos/splash-section.mp4",
    alt: "Splash screen demonstration",
  },
  {
    heading1: "Onboarding screen",
    heading2: "",
    description: (
      <>
        Hook users right away! <br />
        <br /> Deliver value from the start with a smooth, engaging onboarding
        experience.
      </>
    ),
    isImageLeft: true,
    src: "/section-videos/onboarding-section.mp4",
    alt: "Onboarding process demonstration",
  },
  {
    heading1: "API routes",
    heading2: "in the same codebase",
    description: (
      <>
        Add and manage API routes right in the same codebase! <br />
        <br /> Keep everything unified and efficient with Next.js power.
      </>
    ),
    isImageLeft: false,
    src: "/section-videos/api-section.mp4",
    alt: "API routes demonstration",
  },
  // {
  //   heading1: "Payments",
  //   heading2: "",
  //   description: (
  //     <>
  //       Turn your app into a money-maker! <br />
  //       <br /> Easily set up subscriptions and in-app purchases with RevenueCat,
  //       and use already designed pricing screens for you to get started with.
  //     </>
  //   ),
  //   isImageLeft: true,
  //   src: "/section-videos/payments-section.mp4",
  //   alt: "Payments setup demonstration",
  // },
  // {
  //   heading1: "Offline Storage Support",
  //   heading2: "",
  //   description: (
  //     <>
  //       Keep your app running anytime! <br />
  //       <br /> Move to offline database quickly at any point, ensuring users
  //       stay productive even without an internet connection.
  //     </>
  //   ),
  //   isImageLeft: false,
  //   src: "/section-videos/offline-storage-section.mp4",
  //   alt: "Offline storage support demonstration",
  // },
  {
    heading1: "Authentication",
    heading2: "",
    description: (
      <>
        Effortlessly authenticate your users. <br />
        <br /> Let users log in with their favorite social accounts using
        Firebase Auth, making onboarding a breeze.
      </>
    ),
    isImageLeft: true,
    src: "/section-videos/signin-section-optimized.mp4",
    alt: "Authentication demonstration",
  },
  {
    heading1: "Native-like",
    heading2: "page transitions",
    description: (
      <>
        Deliver a polished, app-like experience! <br />
        <br /> Add fluid, native-style page transitions with included components
        that use Ionic underhood, keeping your users engaged and delighted.
      </>
    ),
    isImageLeft: false,
    src: "/section-videos/transitions-section-optimized.mp4",
    alt: "Native-like page transitions demonstration",
  },
  {
    heading1: "In-App Purchases",
    heading2: "& Subscriptions",
    description: (
      <>
        Monetize your app effortlessly! <br />
        <br /> Set up in-app purchases and subscriptions with RevenueCat, and
        use pre-designed screens to get started quickly.
      </>
    ),
    isImageLeft: true,
    src: "/section-videos/iap-section.MP4",
    alt: "In-App Purchases demonstration",
  },
];

const FeatureSection = ({
  heading1,
  heading2,
  description,
  isImageLeft = false,
  src = "/section-videos/onboarding-section.mp4",
  alt = "Onboarding process demonstration",
}: {
  heading1: string;
  heading2: string;
  description: ReactNode;
  isImageLeft: boolean;
  src: string;
  alt?: string;
}) => {
  return (
    <div className="grid xl:grid-cols-2 gap-12 xl:gap-36">
      {isImageLeft ? (
        <>
          <LazyVideo src={src} alt={src} />
          <div className="flex flex-col gap-10 order-1 xl:order-2">
            <Subheading heading1={heading1} heading2={heading2} />
            <p className="text-base max-w-xl sm:text-lg md:text-2xl leading-relaxed">
              {description}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-10 order-1 xl:order-1">
            <Subheading heading1={heading1} heading2={heading2} />
            <p className="text-base max-w-xl sm:text-lg md:text-2xl leading-relaxed">
              {description}
            </p>
          </div>
          <LazyVideo src={src} alt={src} />
        </>
      )}
    </div>
  );
};
