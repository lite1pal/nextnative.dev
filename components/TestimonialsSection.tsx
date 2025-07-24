import Subheading from "./Subheading";
import VideoTestimonial from "./VideoTestimonial";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { RatingSvg } from "./HeroSection2";
import Testimonial from "./Testimonial";

export const testimonials = [
  {
    type: "text",
    imgSrc: "/testimonials/preetam.jpg",
    name: "Preetam Nath",
    description: "Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        Love this product.
        <br />
        <br />I was searching for a way to turn my existing Nextjs projects into
        mobile apps without rebuilding them using React Native/Expo.
        <br />
        <br />
        That's how I found NextNative and felt really blessed that{" "}
        <span className="bg-primary p-1 rounded text-white font-[500]">
          a product like this exists!
        </span>
      </div>
    ),
    showStars: true,
  },
  // {
  //   type: "text",
  //   imgSrc: "/testimonials/dagobert.jpg",
  //   name: "Dagobert",
  //   description: "Entrepreneur",
  //   testimonial: <div>Love the ambition behind this</div>,
  //   showStars: false,
  // },

  {
    type: "text",
    name: "",
    letters: "Q",
    // description: "Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        NextNative is{" "}
        <span className="bg-primary p-1 rounded text-white font-[500]">
          a simple and easy approach
        </span>{" "}
        to building your apps... a perfect app💪
      </div>
    ),
    showStars: true,
  },
  {
    type: "text",
    imgSrc: "/testimonials/terry.jpg",
    name: "Terry Carson",
    description: "Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        NextNative is a great tool for{" "}
        <span className="bg-primary p-1 rounded text-white font-[500]">
          rapidly developing
        </span>{" "}
        cross-platform mobile apps, especially if you are coming from a Next.js
        background.
        <br />
        <br />
        It provides a structured starting point with modern tooling to get your
        project{" "}
        <span className="bg-primary p-1 rounded text-white font-[500]">
          off the ground quickly.
        </span>
      </div>
    ),
    showStars: true,
  },
  {
    type: "text",
    imgSrc: "",
    name: "Happy Customer",
    letters: "S",
    description: "Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        Insane product & a great founder behind it - I've been trying to mess
        around creating mobile apps &{" "}
        <span className="bg-primary p-1 rounded text-white font-[500]">
          I'm getting there bit by bit w/ this helping me hugely!!
        </span>
      </div>
    ),
    showStars: true,
  },
  {
    type: "video",
    name: "Leo",
    description: "Developer",
    videoSrc: "/testimonials/Product Review for Next Native.mp4",
    testimonial: (
      <div>
        "Thank you so much. I bought your product and I freaking loved it!!!{" "}
        <br /> <br />
        I'm free finally as I'm no longer relying for FE developer to hook up my
        backend.
        <br />
        <br />I can do this myself."
      </div>
    ),
    showStars: true,
  },
  {
    type: "text",
    imgSrc: "/testimonials/sergey.jpg",
    name: "Sergey Nazarov",
    description: "Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        <span className="bg-primary p-1 rounded text-white font-[500]">
          the best boilerplate
        </span>{" "}
        for mobile apps
      </div>
    ),
    showStars: true,
  },
  {
    type: "text",
    imgSrc: "/testimonials/vitaliy.jpeg",
    name: "Vitalii Zabrodskyi",
    description: "Senior .NET Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        I’m really pumped about it! The setup seems super easy, and I{" "}
        <span className="bg-primary p-1 rounded text-white font-[500]">
          can’t wait to finally build my app!
        </span>
        <br /> <br />{" "}
        <a
          target="_blank"
          href="https://x.com/nextnative"
          className="text-blue-600"
        >
          @nextnative
        </a>{" "}
        by{" "}
        <a
          target="_blank"
          href="https://x.com/shipwithdenis"
          className="text-blue-600"
        >
          @shipwithdenis
        </a>{" "}
        is such a phenomenal tool!
        <br /> <br /> Wow, just wow!
      </div>
    ),
    showStars: true,
  },

  {
    type: "text",
    imgSrc: "/testimonials/unnamed-2.jpg",
    name: "",
    // description: "Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        The integration with Next.js is smooth, letting you spin up mobile-ready
        experiences incredibly fast.
        <br />
        <br />
        <span className="bg-primary p-1 rounded text-white font-[500]">
          Perfect for devs who want speed
        </span>{" "}
        without sacrificing flexibility.
      </div>
    ),
    showStars: true,
  },
];

function TestimonialsSection() {
  return (
    <div className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Subheading
            heading1="Loved by"
            heading2="developers"
            className="text-start md:text-center md:items-center"
          />
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 md:columns-2 gap-6 space-y-6">
          {testimonials.map((testimonial, index) => {
            if (testimonial.type === "video") {
              return (
                <div key={index} className="break-inside-avoid">
                  <VideoTestimonial
                    name={testimonial.name}
                    videoSrc={testimonial.videoSrc!}
                    testimonial={testimonial.testimonial}
                    showStars={testimonial.showStars}
                    className="my-0 max-w-none"
                  />
                </div>
              );
            }

            return (
              <div key={index} className="break-inside-avoid">
                <Testimonial
                  imgSrc={testimonial.imgSrc}
                  name={testimonial.name}
                  description={testimonial.description}
                  url={testimonial.url}
                  letters={testimonial.letters}
                  testimonial={testimonial.testimonial}
                  showStars={testimonial.showStars}
                  className="my-0 max-w-none py-8 sm:py-8 px-8"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
