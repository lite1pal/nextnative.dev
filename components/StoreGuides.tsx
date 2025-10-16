import Image from "next/image";
import Subheading from "./Subheading";

function StoreGuides() {
  return (
    <div className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Subheading
            heading1="Publishing guides"
            heading2="included"
            className="text-start md:items-center md:text-center"
          />
          <p className="mt-6 w-fit max-w-2xl self-start text-start text-lg md:mx-auto md:text-center">
            No need to figure it out on your own. Learn exactly how to pass App
            Store and Google Play checks.{" "}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {/* App Store Guide */}
          <div
            style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
            className="max-h-[500px] rounded-2xl bg-white p-6"
          >
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center">
                <Image
                  src="/store-guides/app-store-icon.png"
                  alt="App Store icon"
                  className="object-cover"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">
                App Store Guide
              </h3>
            </div>

            <div className="mb-10">
              <Image
                src="/store-guides/app-store-guide.png"
                alt="App Store submission guide"
                width={400}
                height={400}
                className="w-full rounded-lg object-cover"
              />
            </div>

            <ul className="space-y-3 text-base text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                App Store review guidelines
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                Metadata & screenshots
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                Common rejection fixes
              </li>
            </ul>
          </div>

          {/* Google Play Guide */}
          <div
            style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
            className="rounded-2xl bg-white p-6"
          >
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center">
                <Image
                  src="/store-guides/google-play-icon.png"
                  alt="Google Play icon"
                  className="object-cover"
                  width={36}
                  height={36}
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Google Play Guide
              </h3>
            </div>

            <div className="mb-10">
              <Image
                src="/store-guides/google-play-guide.png"
                alt="Google Play submission guide"
                width={400}
                height={400}
                className="w-full rounded-lg object-cover"
              />
            </div>

            <ul className="space-y-3 text-base text-gray-600">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                Play Console setup
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                Signing & security
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                Release management
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-6 text-center text-lg md:flex-row md:gap-10">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
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
            </svg>{" "}
            Step-by-step guides
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
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
            </svg>{" "}
            Real screenshots
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
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
            </svg>{" "}
            Troubleshooting tips
          </div>
          <p className="text-sm text-gray-500"></p>
        </div>
      </div>
    </div>
  );
}

export default StoreGuides;
