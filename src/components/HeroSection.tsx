"use client";

import LeafDecoration from "./LeafDecoration";

export default function HeroSection() {
  const scrollToNext = () => {
    document.getElementById("details")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="snap-section h-screen bg-[#F5C518] relative flex flex-col justify-center items-center px-4 sm:px-8 overflow-hidden">
      {/* Presentation Button */}
      <a
        href="/presentation"
        className="absolute top-4 sm:top-6 right-4 sm:right-6 px-4 sm:px-6 py-2 sm:py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-sm sm:text-base rounded-lg shadow-lg transition-colors z-20"
      >
        Presentation
      </a>

      {/* Vertical text on the right - hidden on small mobile */}
      <div className="hidden sm:block absolute right-4 md:right-6 top-1/2 -translate-y-1/2 vertical-text text-white/30 text-4xl sm:text-6xl md:text-8xl font-bold tracking-widest select-none">
        NY National Guard
      </div>

      {/* Main content */}
      <div className="text-center z-10 max-w-2xl px-4">
        <p className="text-lg sm:text-xl md:text-2xl font-serif text-gray-800 mb-2 tracking-wide">
          YOU&apos;RE
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-gray-900 mb-4 sm:mb-6 font-serif italic">
          Invited
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-800 tracking-wider">
          DEC 13, 2025
        </p>
      </div>

      {/* Leaf decoration */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-28 sm:bottom-32 md:bottom-24">
        <LeafDecoration />
      </div>

      {/* Bottom left event name */}
      <div className="absolute left-4 sm:left-6 md:left-12 bottom-16 sm:bottom-8 md:bottom-12">
        <p className="font-korean-script text-2xl sm:text-3xl md:text-4xl text-gray-900">
          진규형과 아이들
        </p>
        <p className="font-korean-script text-xl sm:text-2xl md:text-3xl text-gray-900 -mt-1">
          연말모임
        </p>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
        aria-label="Scroll to next section"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    </section>
  );
}
