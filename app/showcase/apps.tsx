"use client";

import IPhoneMockup from "@/components/note-taking/iphone-mockup";
import { Wrench } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";

const NoteList = dynamic(() => import("@/components/note-taking/note-list"), {
  ssr: false,
});

const apps = [
  {
    logo: "/showcase/logo-lastinghabits.png", // Add to your /public folder
    name: "Lasting Habits: A Habit Tracker",
    description:
      "Build habits that last. A minimal tracker with daily streaks and reminders.",
    image: "/showcase/lastinghabits.png", // Add to your /public folder
    storeLinks: {
      appStore: "https://apps.apple.com/ua/app/lasting-habits/id6736766976",
      googlePlay: "",
    },
  },
  {
    logo: "/showcase/sproutly-logo.png",
    name: "Sproutly: AI Plant Identifier",
    description:
      "An AI-powered plant identification app. Snap a photo and get instant plant care tips.",
    image: "/showcase/sproutly-premium-screen.jpg", // Add to your /public folder
    storeLinks: {
      appStore: "",
      googlePlay: "",
    },
    whereIsIt: "In App Store review, coming soon!",
  },
  {
    logo: "/showcase/logo-pomodoro.png",
    name: "Pomodoro Timer",
    description:
      "A focused pomodoro timer app with work and break sessions. Do more in less time!",
    image: "/showcase/pomodoro.png", // Add to your /public folder
    storeLinks: {
      appStore: "",
      googlePlay: "",
    },
  },
  {
    logo: "/showcase/logo-thinknest.png",
    name: "ThinkNestAI",
    description:
      "A note-taking app powered by AI. Write, summarize, and organize your thoughts.",
    // image: "/showcase/pomodoro.png", // Add to your /public folder
    realDemo: NoteList,
    storeLinks: {
      appStore: "",
      googlePlay: "",
    },
  },
];

function Apps() {
  return (
    <div className="xl:grid bg-white gap-10 rounded-xl gap-y-20 xl:grid-cols-2 py-10">
      {apps.map((app: any) => (
        <article key={app.name} className="flex flex-col items-center gap-4">
          {/* Heading + description */}
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-4">
              {app.logo && (
                <Image
                  src={app.logo}
                  alt={`${app.name} logo`}
                  width={50}
                  height={50}
                  className="rounded-xl"
                />
              )}
            </div>
            <h3 className="text-3xl font-semibold">{app.name}</h3>
            <p className="text-muted-foreground mt-3">{app.description}</p>
          </div>

          {/* Store buttons */}
          <div className="flex gap-3">
            {!app.storeLinks?.appStore && !app.storeLinks?.googlePlay && (
              <span className="text-primary flex items-center gap-1.5 text-lg py-4">
                {app?.whereIsIt || "In development, coming soon!"}
                <Wrench className="size-5" />
              </span>
            )}
            {app.storeLinks?.appStore && (
              <a
                href={app.storeLinks.appStore}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/showcase/download-on-the-app-store.svg"
                  width={200}
                  height={200}
                  alt="Download on the App Store"
                />
              </a>
            )}
            {app.storeLinks?.googlePlay && (
              <a
                href={app.storeLinks.googlePlay}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-300 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3.066 1.932a1.5 1.5 0 0 0-.691 1.36v17.417a1.5 1.5 0 0 0 2.342 1.232l14.235-8.708a1.5 1.5 0 0 0 0-2.56L4.717 1.965a1.5 1.5 0 0 0-1.65-.033zM6.104 4.143l10.574 6.456-2.498 2.499L6.104 4.143zm0 15.714 8.076-4.932-2.498-2.5L6.104 19.857z" />
                </svg>
                Google Play
              </a>
            )}
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
