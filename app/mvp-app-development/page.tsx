import ShowcaseSection from "@/components/ShowcaseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Button from "@/components/Button";
import HighlightedSpan from "@/components/HighlightedSpan";
import {
  ChartNoAxesCombined,
  CheckIcon,
  ChevronUp,
  CircleSlash2,
  Clock,
  DollarSignIcon,
  Phone,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import Subheading from "@/components/Subheading";
import Image from "next/image";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "MVP App Development Services | Build Your Minimum Viable Product Fast",
  description:
    "We help startups and teams with MVP app development. Launch your minimum viable product faster with Next.js + Capacitor. From scratch or web-to-mobile conversion — get your app live on iOS and Android, stress-free.",
  keywords: [
    "MVP app development",
    "build MVP",
    "startup MVP development",
    "minimum viable product",
    "Next.js mobile app",
    "web to mobile conversion",
  ],
  openGraph: {
    title: "MVP App Development Services",
    description:
      "From idea to App Store in weeks. Build your MVP app with Next.js + Capacitor. Trusted process to avoid rejections and launch faster.",
    url: "https://nextnative.dev/mvp-app-development",
    siteName: "NextNative",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MVP App Development Services | NextNative",
    description:
      "Build your minimum viable product with Next.js + Capacitor. From scratch or web-to-mobile conversion, get your app live on iOS & Android in weeks.",
  },
};

const features = [
  {
    name: "Save time",
    description: "Our startup MVP development process takes weeks, not months.",
    icon: Clock,
  },
  {
    name: "Lower costs",
    description: "One codebase → web and mobile apps.",
    icon: DollarSignIcon,
  },
  {
    name: "Avoid rejections",
    description: "We’ve shipped to the App Store & Google Play repeatedly.",
    icon: CircleSlash2,
  },
  {
    name: "Scale later",
    description: "Start simple; add features fast once you have traction.",
    icon: ChartNoAxesCombined,
  },
];

const services = [
  {
    name: "MVP from scratch",
    description:
      "We design, develop, and launch your MVP application end-to-end.",
    icon: Rocket,
  },
  {
    name: "Web → mobile conversion",
    description:
      "Already have a Next.js app? We’ll convert it into a cross-platform mobile app.",
    icon: Phone,
  },
  {
    name: "Store submissions",
    description: "We handle App Store & Google Play submission and fixes.",
    icon: CheckIcon,
  },
  {
    name: "Scalable architecture",
    description: "Solid foundations so you can iterate without rewrites.",
    icon: ChevronUp,
  },
];

const Section = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`relative mx-auto max-w-7xl px-4 md:px-6 ${className}`}>
    {children}
  </section>
);

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-2xl bg-white p-6 shadow-[0_18px_40px_rgba(0,0,0,0.04)] transition-transform duration-200 hover:-translate-y-[2px] md:p-8 ${className}`}
  >
    {children}
  </div>
);

export default function Page() {
  return (
    <>
      <HeroSection
        heading={
          <>
            Build your MVP app faster. <br />
            From idea to App Store <br />
            <HighlightedSpan>in weeks.</HighlightedSpan>
          </>
        }
        paragraph="We help startups and teams with MVP app development. Whether you need to build a minimum viable product from scratch or convert an existing Next.js project to mobile, we’ll get you live on iOS and Android — stress-free."
        leftTop={
          <div className="h-[121.4px]">
            <Image
              src="/mvp-agency/appstore-icon-min.webp"
              className="w-[190px]"
              width={300}
              height={300}
              alt="App Store Icon"
            />
          </div>
        }
        rightTop={
          <Link
            href="https://apps.apple.com/ua/app/sproutly-ai-plant-identifier/id6748902696"
            target="_blank"
            className="flex h-[121.4px] w-fit items-center justify-center"
          >
            <Image
              src="/mvp-agency/sproutly-distributed-min.png"
              width={200}
              height={800}
              className="h-full w-full scale-[1.2] rotate-[-7deg] rounded-[10px] object-cover"
              alt="Sproutly: AI Plant Identifier on the App Store"
            />
          </Link>
        }
        leftBottom={
          <div
            style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
            className="flex h-[121.4px] w-fit items-center justify-center rounded-[20px] bg-white px-10"
          >
            <div role="list" className="flex flex-col gap-1 font-[500]">
              <div className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-[18px]">
                  Ready <HighlightedSpan>in weeks</HighlightedSpan>, not months
                </div>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-primary"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-[18px]">
                  Avoid App Store{" "}
                  <span className="font-[500] text-red-500">rejections</span>
                </div>
              </div>
            </div>
          </div>
        }
        rightBottom={
          <Image
            src="/mvp-agency/googleplay-icon-min.webp"
            className="w-[190px] rotate-[-15deg]"
            width={300}
            height={300}
            alt="Google Play Icon"
          />
        }
        ctaButton={
          <Link href="https://cal.com/nextnative/30min" target="_blank">
            <Button variant="primary">Book a call now</Button>
          </Link>
        }
        includeRatingStars={false}
      />

      {/* Why MVP with us */}
      <Section className="py-20 md:py-24">
        <div className="md:text-center">
          <Subheading
            heading1="Launch your MVP"
            heading2="the right way"
            className="text-start md:items-center md:text-center"
          />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-balance text-gray-600">
            Stop wasting time on configuration. Start with a production-ready
            foundation and focus on what makes your app unique.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <Card key={f.name}>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-xl p-3">
                  <f.icon className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold md:text-xl">
                    {f.name}
                  </h3>
                  <p className="mt-1 text-gray-600">{f.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section className="py-16 md:py-20">
        <div className="text-center">
          <Subheading
            heading1="MVP app"
            heading2="development services"
            className="text-start md:items-center md:text-center"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((s) => (
            <Card key={s.name}>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-xl p-3">
                  <s.icon className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-semibold md:text-xl">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-gray-600">{s.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="py-16 md:py-20">
        <TestimonialsSection />
      </Section>

      {/* Showcase */}
      <Section className="py-12 md:py-16">
        <div className="md:text-center">
          <Subheading
            heading1="See what"
            heading2="you can get in weeks"
            className="text-start md:items-center md:text-center"
          />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-balance text-gray-600">
            Real apps. Real features. Fully cross-platform.
          </p>
        </div>
        <div className="mt-10">
          <ShowcaseSection />
        </div>
      </Section>

      <div
        className={`flex flex-col gap-10 py-12 md:items-center md:py-36 md:text-center`}
      >
        <Subheading
          heading1="Ready to build your MVP?"
          heading2="Let's turn your idea into a reality."
          className="text-start md:items-center md:text-center"
        />
        <div className="relative">
          <Link href="https://cal.com/nextnative/30min" target="_blank">
            <Button variant="primary">Book a call now</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
