"use client";

import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { useState, useRef, ReactNode } from "react";

function VideoTestimonial({
  name,
  testimonial,
  videoSrc,
  className = "",
  showStars = false,
  url,
}: {
  name: string;
  testimonial: ReactNode | string;
  videoSrc: string;
  className?: string;
  showStars?: boolean;
  url?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={cn(
        `flex flex-col rounded-xl bg-white text-lg md:text-[22px] mx-auto max-w-[759.07px] my-16`,
        className
      )}
    >
      {/* Video Section */}
      <div className="relative rounded-t-xl overflow-hidden">
        <video
          ref={videoRef}
          className="w-full h-auto rounded-t-xl"
          poster="/testimonials/jack-poster.jpg"
          onPlay={() => setIsPlaying(true)}
          //   onPause={() => setIsPlaying(false)}
          //   onEnded={() => setIsPlaying(false)}
          controls={isPlaying}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play Button Overlay */}
        {!isPlaying && (
          <div
            className="absolute group inset-0 flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/20 transition-colors"
            onClick={handlePlayPause}
          >
            <div className="bg-primary rounded-full p-4">
              <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        )}

        {/* Name and Stars Overlay */}
        {!isPlaying && (
          <div className="absolute bottom-4 right-4 bg-black/70 rounded-lg px-3 py-2 text-white">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xl">{name}</span>
              {showStars && (
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Testimonial Quote */}
      <div>
        <blockquote className="text-xl md:text-2xl font-medium bg-primary rounded-b-xl px-6 py-6 text-white">
          {testimonial}
        </blockquote>
      </div>
    </div>
  );
}

export default VideoTestimonial;
