"use client";

import IPhoneMockup from "@/components/note-taking/iphone-mockup";
import { trackEvent } from "@/services/custom-analytics";
import { Wrench } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import toast from "react-hot-toast";

const apps = [
  {
    logo: "/showcase/logo-lastinghabits.png", // Add to your /public folder
    name: "Lasting Habits: A Habit Tracker",
    description:
      "Build habits that last. A minimal tracker with daily streaks and reminders.",
    image: "/showcase/lastinghabits.png", // Add to your /public folder
    storeLinks: {
      appStore: "https://apps.apple.com/ua/app/lasting-habits/id6736766976",
      googlePlay: "soon",
    },
  },
  {
    logo: "/showcase/sproutly-logo.png",
    name: "Sproutly: AI Plant Identifier",
    description:
      "An AI-powered plant identification app. Snap a photo and get instant plant care tips.",
    image: "/showcase/sproutly-premium-screen.jpg", // Add to your /public folder
    storeLinks: {
      appStore:
        "https://apps.apple.com/ua/app/sproutly-ai-plant-identifier/id6748902696",
      googlePlay: "soon",
    },
  },
  // {
  //   logo: "/showcase/logo-pomodoro.png",
  //   name: "Pomodoro Timer",
  //   description:
  //     "A focused pomodoro timer app with work and break sessions. Do more in less time!",
  //   image: "/showcase/pomodoro.png", // Add to your /public folder
  //   storeLinks: {
  //     appStore: "",
  //     googlePlay: "",
  //   },
  // },
  // {
  //   logo: "/showcase/logo-thinknest.png",
  //   name: "ThinkNestAI",
  //   description:
  //     "A note-taking app powered by AI. Write, summarize, and organize your thoughts.",
  //   // image: "/showcase/pomodoro.png", // Add to your /public folder
  //   realDemo: NoteList,
  //   storeLinks: {
  //     appStore: "",
  //     googlePlay: "",
  //   },
  // },
];

function Apps() {
  return (
    <div className="xl:grid gap-10 rounded-xl gap-y-20 xl:grid-cols-2">
      {apps.map((app: any) => (
        <article key={app.name} className="flex flex-col items-center gap-4">
          {/* Heading + description */}
          <div className="text-center flex flex-col gap-3 max-w-md">
            <div className="flex justify-center mb-4">
              {app.logo && (
                <Image
                  src={app.logo}
                  alt={`${app.name} logo`}
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
              )}
            </div>
            <h3 className="text-3xl font-semibold">{app.name}</h3>
            <p className="text-gray  font-[500] text-lg mt-3">
              {app.description}
            </p>
          </div>

          {/* Store buttons */}
          <div className="flex flex-col -space-y-10 md:space-y-0 md:flex-row items-center md:h-32 gap-3">
            {app.storeLinks?.appStore && (
              <a
                href={app.storeLinks.appStore}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent(`App_store_${app.name}_clicked`);
                }}
              >
                <Image
                  src="/showcase/download-on-the-app-store.svg"
                  width={200}
                  height={200}
                  alt="Download on the App Store"
                />
              </a>
            )}
            <div
              onClick={() => {
                toast.success("Coming soon to Google Play!", {
                  duration: 3000,
                  position: "top-center",
                  className: "text-xl",
                });
                trackEvent(`Google_Play_${app.name}_clicked`);
              }}
              className="cursor-pointer"
              aria-label="Download on Google Play"
            >
              <Image
                src="/showcase/download-on-google-play.webp"
                width={247}
                height={247}
                alt="Download on Google Play"
              />
            </div>
          </div>

          <div className="max-sm:left-12 max-sm:max-h-[770px] relative">
            <IPhoneMockup isDark={false}>
              {app.realDemo ? (
                <app.realDemo />
              ) : (
                <div>
                  <Image
                    src={app.image}
                    alt={app.name}
                    width={400}
                    height={800}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
            </IPhoneMockup>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Apps;
