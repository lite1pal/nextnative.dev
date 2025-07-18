import Subheading from "./Subheading";
import Testimonial from "./Testimonial";

function TestimonialsSection() {
  return (
    <div className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Subheading
            heading1="Loved by"
            heading2="developers"
            className="text-start md:text-center md:items-center"
          />
        </div>

        <Testimonial
          imgSrc={"/testimonials/preetam.jpg"}
          name="Preetam Nath"
          description="Developer"
          url="https://microlaunch.net/p/nextnative"
          className="sm:py-10"
          testimonial={
            <div>
              Love this product. I was searching for a way to turn my existing
              Nextjs projects into mobile apps without rebuilding them using
              React Native/Expo. That's how I found NextNative and felt really
              blessed{" "}
              <span className="bg-primary p-1 rounded text-white font-[500]">
                that a product like this exists!
              </span>
            </div>
          }
          showStars
        />
        <Testimonial
          imgSrc={"/testimonials/terry.jpg"}
          name="Terry Carson"
          description="Developer"
          url="https://microlaunch.net/p/nextnative"
          className="sm:py-10"
          testimonial={
            <div>
              NextNative is a great tool for rapidly developing cross-platform
              mobile apps, especially if you are coming from a Next.js
              background. It provides a structured starting point with modern
              tooling to get your project{" "}
              <span className="bg-primary p-1 rounded text-white font-[500]">
                off the ground quickly.
              </span>
            </div>
          }
          showStars
        />
        <Testimonial
          imgSrc={"/testimonials/sergey.jpg"}
          name="Sergey Nazarov"
          description="Developer"
          url="https://microlaunch.net/p/nextnative"
          className="sm:py-10 w-fit"
          testimonial={<div>the best boilerplate for mobile apps</div>}
          showStars
        />
      </div>
    </div>
  );
}

export default TestimonialsSection;
