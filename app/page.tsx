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
import { ChevronUp } from "lucide-react";
import ShowcaseSection from "@/components/ShowcaseSection";
import LazyVideo from "@/components/LazyVideo";
import StoreGuides from "@/components/StoreGuides";
import TestimonialsSection, {
  testimonials,
} from "@/components/TestimonialsSection";
import AppsBuiltWithNextNative from "@/components/AppsBuiltWithNextNative";
import VideoTestimonial from "@/components/VideoTestimonial";
import type { Metadata } from "next";
import Script from "next/script";
import HighlightedSpan from "@/components/HighlightedSpan";
import HeroSection from "@/components/HeroSection";
import ToolCard from "@/components/ToolCard";
import CTA from "@/components/CTA";
import { AvatarList } from "@/components/AvatarList";
import RatingSvg from "@/components/RatingSvg";
import LovedByMakers from "@/components/LovedByMakers";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://nextnative.dev",
  },
};

export default function Home() {
  const videoTestimonial = testimonials.find(
    (testimonial) => testimonial.type === "video" && testimonial.name === "Leo",
  );
  return (
    <div>
      <Script id="structured-data" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "NextNative",
          url: "https://nextnative.dev",
          description:
            "NextNative helps developers launch iOS and Android apps using the same codebase they use for web. Built on Next.js + Capacitor.",
        })}
      </Script>

      <HeroSection
        heading={
          <>
            Launch mobile apps <span className="sm:hidden">10x</span> faster
            with <HighlightedSpan>Next.js</HighlightedSpan>
          </>
        }
        paragraph="Skip React Native. Use the web tools you already know, combined with Capacitor, to launch cross-platform apps in days."
        leftTop={
          <ToolCard
            tool="Next.js"
            bullets={["API Routes", "A single codebase"]}
            img="/tools/nextjs-dark.webp"
          />
        }
        rightTop={
          <ToolCard
            tool="Capacitor"
            bullets={["Native functionality", "Cross-platform support"]}
            img="/tools/cap-small.webp"
          />
        }
        leftBottom={
          <ToolCard
            tool="Tailwind"
            bullets={["Utility classes", "Responsive design"]}
            img="/tools/tailwind.webp"
          />
        }
        rightBottom={
          <ToolCard
            tool="RevenueCat"
            bullets={["One-time payments", "Subscriptions"]}
            img="/tools/revenuecat-small.webp"
          />
        }
        ctaButton={<CTA />}
      />

      <Testimonial
        imgSrc={"/testimonials/vitaliy.webp"}
        name="Vitalii Zabrodskyi"
        description="Senior .NET Developer"
        showStars
        testimonial={
          <div>
            The setup seems super easy, and I{" "}
            <span className="bg-primary rounded p-1 font-[500] text-white">
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

      <QuickStart />

      <div className="text-center max-md:mt-24 md:mb-16">
        <Subheading
          heading1="See what"
          heading2="you can build in days"
          className="text-start md:items-center md:text-center"
        />

        <p className="mt-6 w-fit max-w-2xl self-start text-start text-lg md:mx-auto md:text-center">
          Real apps. Real features. Fully cross-platform.
        </p>
      </div>

      <ShowcaseSection />

      <div className="flex flex-col gap-10 max-sm:mt-16 sm:items-center">
        <CTA />
        <div className="flex items-center gap-5 sm:gap-2">
          <AvatarList />
          <div className="flex flex-col">
            <RatingSvg />
            <LovedByMakers />
          </div>
        </div>
      </div>

      <SocialProof />

      <Testimonial
        imgSrc={""}
        letters="S"
        name="Happy customer"
        showStars
        url="https://microlaunch.net/p/nextnative"
        testimonial={
          <div>
            Insane product & a great founder behind it - I've been trying to
            mess around creating mobile apps &{" "}
            <span className="bg-primary rounded p-1 font-[500] text-white">
              I'm getting there bit by bit w/ this helping me hugely!!
            </span>
          </div>
        }
      />

      <WastedTime />

      <SetupByDefault />

      <Testimonial
        imgSrc={"/testimonials/terry.webp"}
        name="Terry Carson"
        description="Developer"
        showStars
        testimonial={
          <div>
            NextNative is a great tool for{" "}
            <span className="bg-primary rounded p-1 font-[500] text-white">
              rapidly developing
            </span>{" "}
            cross-platform mobile apps, especially if you are coming from a
            Next.js background.
            <br />
            <br />
            It provides a structured starting point with modern tooling to get
            your project{" "}
            <span className="bg-primary rounded p-1 font-[500] text-white">
              off the ground quickly.
            </span>
          </div>
        }
      />

      <AppsBuiltWithNextNative />

      <div className="mt-10 flex flex-col gap-10 sm:items-center">
        <CTA />
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

      <DemoVideo />

      <div className="flex flex-col gap-28 py-16 sm:gap-52 sm:py-32">
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

      <div className="flex flex-col gap-10 sm:mt-10 sm:items-center">
        <CTA />
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

      <div className="mx-auto my-16 flex w-fit flex-col items-center gap-3">
        <ChevronUp className="text-gray" />
        <div className="flex items-center gap-6 rounded-full bg-white px-6 py-4 pr-10">
          <Image
            src={"/testimonials/dagobert.webp"}
            alt="Dagobert X profile picture"
            width={100}
            height={100}
            className="h-[80px] w-[80px] rounded-full object-cover"
            sizes="25vw"
          />
          <div className="flex flex-col gap-1 text-xl">
            <p className="font-[500]">Love the ambition behind this</p>
            <p className="text-gray text-sm sm:text-xl">
              Dagobert — Entrepreneur
            </p>
          </div>
        </div>
      </div>

      <StoreGuides />

      <Spend5Minutes />

      <div className="mx-auto mt-16 mb-16 max-w-2xl">
        <VideoTestimonial
          name={videoTestimonial?.name as string}
          videoSrc={videoTestimonial?.videoSrc!}
          testimonial={videoTestimonial?.testimonial}
          showStars={videoTestimonial?.showStars}
          className="my-0 max-w-none"
        />
      </div>

      <PricingSection />

      <TestimonialsSection />

      <div className="mb-10 flex flex-col gap-10 sm:mt-10 sm:items-center">
        <CTA />
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

      <FAQ />
      <CallToAction
        title="Start building in minutes."
        subtitle="Save weeks of work."
        buttonText="Launch mobile apps"
      />
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
    heading1: "Secure API routes",
    heading2: "in the same codebase",
    description: (
      <>
        Add and manage secure API routes right in the same codebase! <br />
        <br /> Keep everything unified and efficient with Next.js power.
      </>
    ),
    isImageLeft: false,
    src: "/section-videos/api-section.mp4",
    alt: "API routes demonstration",
  },
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
    <div className="grid gap-12 xl:grid-cols-2 xl:gap-36">
      {isImageLeft ? (
        <>
          <LazyVideo src={src} alt={src} />
          <div className="order-1 flex flex-col gap-10 xl:order-2">
            <Subheading heading1={heading1} heading2={heading2} />
            <p className="max-w-xl text-base leading-relaxed sm:text-lg md:text-2xl">
              {description}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="order-1 flex flex-col gap-10 xl:order-1">
            <Subheading heading1={heading1} heading2={heading2} />
            <p className="max-w-xl text-base leading-relaxed sm:text-lg md:text-2xl">
              {description}
            </p>
          </div>
          <LazyVideo src={src} alt={src} />
        </>
      )}
    </div>
  );
};
