"use client";

function Spend5Minutes() {
  return (
    <div
      className={`text-gray mx-auto flex max-w-[764px] flex-col gap-6 py-6 text-[24px] leading-[48px] font-[500] transition-all duration-700 max-sm:pb-16 md:py-20 xl:gap-10 xl:text-[40px] xl:leading-[68px]`}
    >
      <div>
        Setup your cross-platform mobile app in just{" "}
        <span className="text-foreground">3-5 minutes</span> and immediately
        start
        <span className="text-foreground">
          {" "}
          building your app's unique features.
        </span>
      </div>

      {/* <div>
        <span className="text-foreground">
          Skip the boring configuration of{" "}
        </span>
        authentication, database setup, API integration, and native mobile
        capabilities.
      </div> */}

      <div>
        Skip <span className="text-foreground">the boring parts:</span>
      </div>
      <div className="flex flex-col">
        <div>🔐 Auth & secure backend</div>
        <div>🗄️ Database & storage</div>
        <div>🔌 API integration</div>
        <div>📱 Native mobile capabilities</div>
      </div>

      <div>
        Turn <span className="text-foreground">weeks of setup</span> into
        <span className="text-foreground">
          {" "}
          minutes of productive development!
        </span>
      </div>
    </div>
  );
}

export default Spend5Minutes;
