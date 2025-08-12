"use client";

import dynamic from "next/dynamic";
import ComponentWrapper from "../component-wrapper";
import Heading from "../heading";

const ApplePodcasts = dynamic(() => import("./apple-podcasts"), { ssr: false });

function ScreenPage() {
  return (
    <div className="mb-12 flex flex-col gap-10">
      <Heading paragraph="Find all sorts of screens for your mobile app.">
        Screens
      </Heading>

      <div className="flex flex-col gap-10">
        <ComponentWrapper
          isDark
          heading="Apple Podcasts Screens"
          codeExample={``}
          fullMockup
        >
          <div>
            <ApplePodcasts />
          </div>
        </ComponentWrapper>
      </div>
    </div>
  );
}

export default ScreenPage;
