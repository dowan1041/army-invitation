"use client";

import LeafBranch from "./LeafBranch";

export default function DetailsSection() {
  const scrollToNext = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="details" className="snap-section h-screen bg-[#F5C518] relative flex flex-col justify-center items-center px-4 sm:px-8 py-12 sm:py-16 overflow-hidden">
      {/* Vertical title on the right - hidden on small mobile */}
      <div className="hidden sm:block absolute right-20 sm:right-40 md:right-52 top-[80%] rotate-90 origin-right text-white/30 font-bold tracking-widest select-none leading-tight text-4xl sm:text-6xl md:text-8xl">
        <div>진규형과</div>
        <div style={{ marginLeft: '3ch' }}>아이들</div>
        <div style={{ marginLeft: '5ch' }}>연말모임</div>
      </div>

      <div className="max-w-lg w-full text-center">
        {/* Decorative leaf branch */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <LeafBranch />
        </div>

        {/* Schedule */}
        <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10 text-left max-w-md mx-auto px-2">
          <div className="flex items-start gap-4 sm:gap-6">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 w-16 sm:w-20 flex-shrink-0">
              18:00
            </span>
            <div>
              <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Dinner</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                갈비 / 삼겹살 / ...
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 sm:gap-6">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 w-16 sm:w-20 flex-shrink-0">
              19:00
            </span>
            <div>
              <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Ice Breaking</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                자기소개 및 아이스 브레이킹
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 sm:gap-6">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 w-16 sm:w-20 flex-shrink-0">
              21:00
            </span>
            <div>
              <p className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Free Time</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">
                간단한 게임과 담소
              </p>
            </div>
          </div>
        </div>

        {/* Location & Fee */}
        <div className="border-t border-gray-800/20 pt-6 sm:pt-8 flex flex-col gap-6 sm:gap-8 md:flex-row md:gap-12">
          {/* Location */}
          <div className="flex-1 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Location
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-800">
              56 Field Ave
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-4 sm:mb-6">
              Hicksville, NY 11801
            </p>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Contact
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-800">Dowan Kim</p>
            <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-2 sm:mb-3">(347) 210-1245</p>
            <p className="text-sm sm:text-base md:text-lg text-gray-800">Seoyeon Park</p>
            <p className="text-sm sm:text-base md:text-lg text-gray-800">(347) 537-8866</p>
          </div>

          {/* Fee */}
          <div className="flex-1 text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Fee
            </h3>
            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              $80
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 sm:mb-4">
              (많은 맛있는 음식과 음료가 준비될 예정입니다)
            </p>
            <div className="flex justify-center">
              <img
                src="/zelle.jpg"
                alt="Zelle QR Code"
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform"
        aria-label="Scroll to RSVP section"
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
