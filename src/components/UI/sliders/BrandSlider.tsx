import { brands } from "@/constants/brands";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const BrandSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const currentRef = sliderRef.current;
    currentRef?.addEventListener("scroll", handleScroll);
    return () => currentRef?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="rounded-lg bg-white py-6">
      <div className="relative">
        <div
          {...swipeHandlers}
          ref={sliderRef}
          className="hide-scrollbar flex gap-4 overflow-x-auto scroll-smooth py-2"
          style={{ scrollbarWidth: "none" }}
        >
          {brands.map((brand, index) => (
            <div
              key={index}
              className="flex h-28 w-[270px] flex-shrink-0 items-center gap-4 overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md"
            >
              <Image
                className="h-full w-28 object-cover"
                src={brand.image}
                width={300}
                height={300}
                alt={brand.name}
              />
              <div>
                <div className="line-clamp-2 text-sm font-semibold">
                  {brand.name}
                </div>
                {brand.hasStore && (
                  <button className="mt-1 text-xs font-medium text-blue-500">
                    Visit the store {">"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {showLeftArrow && (
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/80 shadow-sm hover:bg-white/90 md:flex"
            aria-label="Previous categories"
            style={{ backdropFilter: "blur(4px)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {showRightArrow && (
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/80 shadow-sm hover:bg-white/90 md:flex"
            aria-label="Next categories"
            style={{ backdropFilter: "blur(4px)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default BrandSlider;
