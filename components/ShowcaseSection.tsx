"use client";

import Link from "next/link";
import IPhoneMockup from "./note-taking/iphone-mockup";
import { trackEvent } from "@/services/custom-analytics";
import Image from "next/image";

function ShowcaseSection() {
  return (
    <Link
      href="/showcase"
      onClick={() => {
        trackEvent("Demo_Apps_Showcase_clicked");
      }}
      id="interactive-demo"
      className="flex justify-center max-md:scale-[0.6] h-[500px] max-md:left-10 relative sm:h-full md:py-16 space-x-[-200px]"
    >
      <div className="rotate-[-30deg]">
        <IPhoneMockup isDark={false}>
          <div>
            <Image
              src={"/showcase/lastinghabits.png"}
              alt={"Note-taking app screenshot"}
              width={400}
              height={800}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </IPhoneMockup>
      </div>
      <div className="rotate-[0deg] z-20">
        <IPhoneMockup isDark={true}>
          <div>
            <Image
              src={"/showcase/sproutly-premium-screen.jpg"}
              alt={"AI Plant identification app screenshot"}
              width={400}
              height={800}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </IPhoneMockup>
      </div>
      <div className="rotate-[30deg]">
        <IPhoneMockup isDark={false}>
          <div>
            <Image
              src={"/showcase/pomodoro-dark.png"}
              alt={"Note-taking app screenshot"}
              width={400}
              height={800}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </IPhoneMockup>
      </div>
    </Link>
  );
}

export default ShowcaseSection;
