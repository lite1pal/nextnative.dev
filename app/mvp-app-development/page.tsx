import ShowcaseSection from "@/components/ShowcaseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Button from "@/components/Button";
import HighlightedSpan from "@/components/HighlightedSpan";
import { CheckIcon, ChevronUp, Phone, Rocket } from "lucide-react";
import CallToAction from "@/components/CallToAction";
import PricingSection from "@/components/PricingSection";

const features = [
  {
    name: "Save time",
    description: "Our startup MVP development process takes weeks, not months.",
  },
  {
    name: "Lower costs",
    description: "One codebase → web and mobile apps.",
  },
  {
    name: "Avoid rejections",
    description:
      "We’ve successfully published apps to the App Store & Google Play.",
  },
  {
    name: "Scale later",
    description:
      "Once your minimum viable product is live, we’ll help you expand features fast.",
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
    name: "Web to mobile conversion",
    description:
      "Already have a Next.js app? We’ll convert it into a cross-platform MVP mobile app.",
    icon: Phone,
  },
  {
    name: "App Store & Google Play launch",
    description: "We handle the submission process and avoid common pitfalls.",
    icon: CheckIcon,
  },
  {
    name: "Scalable architecture",
    description: "Build now, grow later. Start simple, scale fast.",
    icon: ChevronUp,
  },
];

const timeline = [
  {
    name: "Discovery",
    description: "Define your goals and core features.",
    step: "1",
  },
  {
    name: "Build",
    description: "Develop your MVP app with Next.js + Capacitor.",
    step: "2",
  },
  {
    name: "Test",
    description: "Ensure smooth performance on web, iOS, and Android.",
    step: "3",
  },
  {
    name: "Launch",
    description: "Publish to the App Store & Google Play.",
    step: "4",
  },
];

export default function Page() {
  return null;
  return (
    <>
      {/* Hero Section */}
      <div className="relative mx-auto flex flex-col items-center justify-center py-12 text-center md:py-20 md:pt-16">
        <div className="flex w-full max-w-4xl flex-col gap-8 md:gap-9">
          <div className="flex flex-col gap-6 md:gap-9">
            <h1 className="text-4xl leading-tight font-[600] tracking-tighter md:text-6xl">
              Build your MVP app faster. <br />
              From idea to App Store{" "}
              <HighlightedSpan>in weeks.</HighlightedSpan>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
              We help startups and teams with MVP app development. Whether you
              need to build a minimum viable product from scratch or convert an
              existing Next.js project to mobile, we’ll get you live on iOS and
              Android, stress-free.
            </p>
          </div>
          <Button variant="primary" className="mx-auto">
            <a href="https://cal.com/denis-tarasenko/30min">Book a Call</a>
          </Button>
        </div>
      </div>

      {/* Why MVP Development With Us? */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Launch your MVP the right way
        </h2>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-4 lg:max-w-none lg:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="text-lg leading-7 font-semibold">
                <CheckIcon />
                <span className="ml-8">{feature.name}</span>
              </dt>
              <dd className="text-muted-foreground mt-1 flex flex-auto flex-col text-base leading-7">
                <p className="ml-8 flex-auto">{feature.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* What We Offer */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            MVP app development services
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {services.map((service) => (
              <div key={service.name} className="relative pl-16">
                <dt className="text-base leading-7 font-semibold">
                  <div className="bg-primary absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-lg">
                    <service.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {service.name}
                </dt>
                <dd className="text-muted-foreground mt-2 text-base leading-7">
                  {service.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Process (Steps) */}
      <div className="py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Our MVP development process
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <ol className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((item) => (
              <li
                key={item.name}
                className="flex flex-col items-center text-center"
              >
                <div className="border-primary text-primary flex h-12 w-12 items-center justify-center rounded-full border-2 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
                <p className="text-muted-foreground mt-1">{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Pricing & Engagement */}
      <div className="py-16 text-center sm:py-24">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Flexible MVP development pricing
        </h2>
        <div className="mx-auto mt-8 max-w-2xl">
          <p className="text-muted-foreground text-lg">
            <strong>Daily rate:</strong> Hire us at AUD $600/day for flexible
            MVP development.
          </p>
          <p className="text-muted-foreground mt-4 text-lg">
            <strong>Fixed package:</strong> We can also provide a flat fee for a
            complete MVP build.
          </p>
        </div>
        <div className="mt-10">
          <Button variant="primary">
            <a href="https://cal.com/denis-tarasenko/30min">Get a Quote</a>
          </Button>
        </div>
      </div>

      <PricingSection />

      {/* Social Proof / Trust */}
      <ShowcaseSection />
      <TestimonialsSection />
      <div className="py-12 text-center">
        <p className="text-muted-foreground text-lg">
          Trusted by startups and indie founders building their first MVP.
        </p>
      </div>

      <CallToAction
        title="Ready to build your MVP?"
        subtitle="Faster, simpler, and with less risk."
        buttonText="Launch mobile apps"
      />
    </>
  );
}

function HeroSection() {
  return <div></div>;
}
