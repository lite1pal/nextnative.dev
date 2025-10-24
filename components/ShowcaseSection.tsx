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
      className="relative flex h-[500px] justify-center space-x-[-200px] max-md:left-10 max-md:scale-[0.6] sm:h-full md:py-16"
    >
      <div className="rotate-[-30deg]">
        <IPhoneMockup isDark={false}>
          <div>
            <Image
              src={"/showcase/lastinghabits.png"}
              alt={"Note-taking app screenshot"}
              width={400}
              height={800}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </IPhoneMockup>
      </div>
      <div className="z-20 rotate-[0deg]">
        <IPhoneMockup isDark={true}>
          <div>
            <Image
              src={"/showcase/sproutly-premium-screen.jpg"}
              alt={"AI Plant identification app screenshot"}
              width={400}
              height={800}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </IPhoneMockup>
      </div>
      <div className="rotate-[30deg] max-sm:relative max-sm:top-10">
        <IPhoneMockup isDark={false}>
          <div>
            <Image
              src={"/showcase/bill-organizer/screen-3-2.png"}
              alt={"Bill Organizer - Matcharge"}
              width={400}
              height={800}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </IPhoneMockup>
      </div>
    </Link>
  );
}

export default ShowcaseSection;
