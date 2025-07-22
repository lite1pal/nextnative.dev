import Apps from "@/app/showcase/apps";
import Subheading from "./Subheading";

function AppsBuiltWithNextNative() {
  return (
    <div className="pt-20 pb-0 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Subheading
            heading1="Mobile apps built and published"
            heading2="with NextNative"
            className="text-start md:text-center md:items-center"
          />
          <p className="mt-6 text-lg max-w-2xl text-start md:text-center self-start w-fit md:mx-auto">
            These mobile apps were created using the exact same starter and
            deployed with ease.
            {/* <span className="hidden">Based on real submissions.</span> */}
          </p>
        </div>

        <div className="sm:bg-white rounded-xl sm:py-10">
          <Apps />
        </div>
      </div>
    </div>
  );
}

export default AppsBuiltWithNextNative;
