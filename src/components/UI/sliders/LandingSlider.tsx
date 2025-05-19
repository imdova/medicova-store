"use client";
import { useState, useEffect, useCallback } from "react";
import DynamicButton from "../Buttons/DynamicButton";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { Slide } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SliderLandingProps = {
  slides: Slide[];
  showNavigation?: boolean;
  showText?: boolean;
  showButtons?: boolean;
  autoPlay?: boolean;
  slideDuration?: number;
  showProgressBar?: boolean;
};

const LandingSlider = ({
  slides,
  showNavigation = true,
  showText = true,
  showButtons = true,
  autoPlay = true,
  slideDuration = 5000,
  showProgressBar,
}: SliderLandingProps) => {
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [pageLoading, setPageLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Show loader only on page reload
  useEffect(() => {
    const timer = setTimeout(() => setPageLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide with progress indicator
  useEffect(() => {
    if (!isAutoPlaying) {
      setProgress(0);
      return;
    }

    let startTime: number | undefined;
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newProgress = (elapsed / slideDuration) * 100;
      setProgress(Math.min(newProgress, 100));

      if (elapsed < slideDuration) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };

    const startAnimation = () => {
      setProgress(0);
      startTime = undefined;
      animationFrameId = requestAnimationFrame(animateProgress);
      timeoutId = setTimeout(() => {
        nextSlide();
      }, slideDuration);
    };

    startAnimation();

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentIndex, isAutoPlaying, slideDuration]);

  const nextSlide = useCallback(() => {
    setCurrentIndex([(currentIndex + 1) % slides.length, 1]);
  }, [currentIndex, slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex([(currentIndex - 1 + slides.length) % slides.length, -1]);
  }, [currentIndex, slides.length]);

  const goToSlide = (index: number) => {
    const direction = index > currentIndex ? 1 : -1;
    setCurrentIndex([index, direction]);
  };

  // Swipe handlers for mobile
  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: 0.3, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.5, ease: "backOut" },
    },
  };

  return (
    <section className="relative" {...handlers}>
      <div
        className={`relative h-[250px] overflow-hidden rounded-md lg:h-[350px] ${
          pageLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 h-full w-full"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(autoPlay)}
          >
            {/* Background Image with overlay */}
            <div
              className="absolute inset-0 h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  typeof slides[currentIndex].image === "string"
                    ? slides[currentIndex].image
                    : slides[currentIndex].image.src
                })`,
              }}
            >
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Text Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="relative flex h-full w-full items-center justify-center text-white"
            >
              <div className="container mx-auto px-4">
                <div className="flex max-w-[600px] flex-col items-center md:items-start lg:ml-10">
                  {showText && (
                    <>
                      <motion.h2
                        variants={textVariants}
                        className="mb-2 text-center text-2xl font-bold leading-tight drop-shadow-lg md:text-start md:text-4xl lg:text-5xl"
                      >
                        {slides[currentIndex].title}
                      </motion.h2>
                      {slides[currentIndex].subtitle && (
                        <motion.p
                          variants={textVariants}
                          className="mb-6 text-center text-lg font-medium md:text-start md:text-xl"
                        >
                          {slides[currentIndex].subtitle}
                        </motion.p>
                      )}
                    </>
                  )}

                  {showButtons && slides[currentIndex].url && (
                    <motion.div variants={buttonVariants}>
                      <DynamicButton
                        href={slides[currentIndex].url}
                        label={slides[currentIndex].buttonText || "Shop Now"}
                        className="w-[200px] lg:w-[300px]"
                        variant="white"
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {showNavigation && (
          <>
            <button
              onClick={prevSlide}
              className="group absolute -left-1 top-0 flex h-full items-center"
            >
              <svg
                width="44"
                height="502"
                viewBox="0 0 44 502"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="duration-400 inline-block h-full w-auto origin-left scale-x-100 transition-transform group-hover:scale-x-[1.5]"
              >
                <path
                  className="fill-white/10 transition duration-200 group-hover:fill-white"
                  d="M0.999973 501C32.9999 301.5 42.9999 308 42.9999 252.5C42.9999 197 29.4999 189 1.00002 0.999996L0.999973 501Z"
                  fill="rgba(255,255,255,.4)"
                ></path>
              </svg>
              <ChevronLeft
                className="invisible text-black opacity-0 transition duration-200 group-hover:visible group-hover:-translate-x-5 group-hover:opacity-100"
                size={25}
              />
            </button>
            <button
              onClick={nextSlide}
              className="group absolute -right-7 top-0 flex h-full items-center justify-start"
            >
              <svg
                width="44"
                height="501"
                viewBox="0 0 44 501"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="duration-400 inline-block h-full w-auto origin-right scale-x-100 transition-transform group-hover:scale-x-[1.5]"
              >
                <path
                  className="fill-white/10 transition duration-200 group-hover:fill-white"
                  d="M42.9999 0.5C11 200 1 193.5 1 249C1 304.5 14.5 312.5 42.9999 500.5V0.5Z"
                  fill="rgba(255,255,255,.4)"
                ></path>
              </svg>
              <ChevronRight
                className="invisible -translate-x-24 text-black opacity-0 transition duration-200 group-hover:visible group-hover:-translate-x-6 group-hover:opacity-100"
                size={25}
              />
            </button>
          </>
        )}

        {/* Progress Bar */}
        {showProgressBar && isAutoPlaying && (
          <div className="absolute left-0 right-0 top-0 z-10 h-1 bg-white/20">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}

        {/* Dots Navigation */}
        {showNavigation && (
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2 space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className="group relative cursor-pointer rounded-full p-2"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div
                  className={`absolute inset-0 left-1/2 top-1/2 h-1 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all ${
                    currentIndex === index
                      ? "bg-primary"
                      : "bg-white/50 group-hover:bg-white/70"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LandingSlider;
