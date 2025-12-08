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
                한식으로 푸짐하게 준비될 예정입니다.<br />
                (음료 주류 포함)
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
                자유시간
              </p>
            </div>
          </div>
        </div>

        {/* Dress Code Section */}
        <div className="mb-8 sm:mb-10">
          {/* Decorative bar */}
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-800/30 to-transparent"></div>
            <div className="mx-4 w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-800/30 to-transparent"></div>
          </div>

          {/* Dress Code Content */}
          <div className="text-center px-4">
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
              Dress Code
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-2">
              {/* Ugly Sweater */}
              <div className="flex items-center">
                <span className="text-sm sm:text-base text-gray-800">Ugly sweater</span>
              </div>

              <span className="text-gray-500">or</span>

              {/* Red */}
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full border border-red-600"></div>
                <span className="text-sm sm:text-base text-gray-800">red</span>
              </div>

              <span className="text-gray-400">/</span>

              {/* Green */}
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border border-green-600"></div>
                <span className="text-sm sm:text-base text-gray-800">green point</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 italic mt-1">
              (not Mandatory)
            </p>
          </div>
        </div>

        {/* Location & Fee */}
        <div className="border-t border-gray-800/20 pt-4 sm:pt-6 grid grid-cols-2 gap-4 sm:gap-8">
          {/* Location & Contact */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1 sm:mb-2">
              <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">
                Location
              </h3>
              <button
                onClick={() => {
                  const address = "56 Field Ave, Hicksville, NY 11801";
                  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                  window.open(mapsUrl, '_blank');
                }}
                className="p-1.5 sm:p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors group"
                aria-label="Open in Google Maps"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-800">
              56 Field Ave
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-800 mb-2 sm:mb-4">
              Hicksville, NY 11801
            </p>

            <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
              Contact
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-800">Dowan Kim</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-800 mb-1 sm:mb-2">(347) 210-1245</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-800">Seoyeon Park</p>
            <p className="text-xs sm:text-sm md:text-base text-gray-800">(347) 537-8866</p>
          </div>

          {/* Fee */}
          <div className="text-center">
            <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
              Fee
            </h3>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              $80
            </p>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-2 sm:mb-3">
              (맛있는 음식과 음료 준비)
            </p>
            <div className="flex justify-center">
              <img
                src="/zelle.jpg"
                alt="Zelle QR Code"
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 object-contain rounded-lg shadow-lg"
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
