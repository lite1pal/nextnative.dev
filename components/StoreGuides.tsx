import Image from "next/image";
import Subheading from "./Subheading";

function StoreGuides() {
  return (
    <div className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Subheading
            heading1="Publishing guides"
            heading2="included"
            className="text-start md:text-center md:items-center"
          />
          <p className="mt-6 text-lg max-w-2xl text-start md:text-center self-start w-fit md:mx-auto">
            No need to figure it out on your own. Learn exactly how to pass App
            Store and Play Store checks.{" "}
            {/* <span className="hidden">Based on real submissions.</span> */}
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* App Store Guide */}
          <div className="rounded-2xl bg-white p-6">
            <div className="flex items-center mb-10 gap-3">
              <div className="w-12 h-12 flex justify-center items-center">
                <Image
                  src="/store-guides/app-store-icon.png"
                  alt="App Store icon"
                  className="object-cover"
                  width={48}
                  height={48}
                />
              </div>
              <h3 className="font-semibold text-2xl text-gray-900">
                App Store Guide
              </h3>
            </div>

            <div className="mb-10">
              <Image
                src="/store-guides/app-store-guide.png"
                alt="App Store submission guide"
                width={400}
                height={400}
                className="w-full object-cover rounded-lg"
              />
            </div>

            <ul className="text-gray-600 text-base space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                App Store review guidelines
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Metadata & screenshots
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Common rejection fixes
              </li>
            </ul>
          </div>

          {/* Google Play Guide */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 flex justify-center items-center">
                <Image
                  src="/store-guides/google-play-icon.png"
                  alt="Google Play icon"
                  className="object-cover"
                  width={36}
                  height={36}
                />
              </div>
              <h3 className="font-semibold text-2xl text-gray-900">
                Google Play Guide
              </h3>
            </div>

            <div className="mb-10">
              <Image
                src="/store-guides/google-play-guide.png"
                alt="Google Play submission guide"
                width={400}
                height={400}
                className="w-full object-cover rounded-lg"
              />
            </div>

            <ul className="text-gray-600 text-base space-y-3">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Play Console setup
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Signing & security
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                Release management
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center flex flex-col md:flex-row gap-6 md:gap-10 text-lg justify-center">
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
          <p className="text-gray-500 text-sm"></p>
        </div>
      </div>
    </div>
  );
}

export default StoreGuides;
