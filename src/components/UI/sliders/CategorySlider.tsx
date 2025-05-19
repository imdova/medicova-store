"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback, JSX } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import { Categories } from "@/constants/categouries";

const CategorySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [visibleCards, setVisibleCards] = useState(8);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Calculate visible cards based on screen size
  const updateVisibleCards = useCallback(() => {
    const width = window.innerWidth;
    let cards = 4;
    if (width < 500) cards = 2;
    else if (width < 768) cards = 2;
    else if (width < 1024) cards = 3;
    else if (width < 1280) cards = 8;
    else cards = 8;
    setVisibleCards(cards);
  }, []);

  useEffect(() => {
    updateVisibleCards();
    const handleResize = () => {
      updateVisibleCards();
      // Reset index on resize to prevent empty space
      setCurrentIndex(0);
      if (sliderRef.current) {
        controls.start({ x: 0 });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateVisibleCards, controls]);

  const totalSlides = Math.ceil(Categories.length / visibleCards);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, visibleCards, isDragging]);

  // Scroll to specific index
  const scrollToIndex = useCallback(
    (index: number) => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const newPosition = -index * containerWidth;

      controls.start({
        x: newPosition,
        transition: { duration: 0.5, ease: "easeOut" },
      });

      setCurrentIndex(index);
    },
    [controls],
  );

  const nextSlide = useCallback(() => {
    const newIndex = (currentIndex + 1) % totalSlides;
    scrollToIndex(newIndex);
  }, [currentIndex, totalSlides, scrollToIndex]);

  const prevSlide = useCallback(() => {
    const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    scrollToIndex(newIndex);
  }, [currentIndex, totalSlides, scrollToIndex]);

  // Handle drag events
  const handleDragStart = () => {
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setIsDragging(false);
    setIsAutoPlaying(true);

    if (!containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const dragDistance = info.offset.x;
    const dragVelocity = info.velocity.x;

    // Determine if we should change slides based on drag distance and velocity
    const threshold = containerWidth * 0.2;
    const velocityThreshold = 500;

    if (
      Math.abs(dragDistance) > threshold ||
      Math.abs(dragVelocity) > velocityThreshold
    ) {
      if (dragDistance > 0 || dragVelocity > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      // Return to current slide if drag wasn't significant enough
      controls.start({
        x: -currentIndex * containerWidth,
        transition: { duration: 0.3 },
      });
    }
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 30,
    swipeDuration: 300,
  });

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    hover: { scale: 1.05, transition: { duration: 0.15 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    hover: { scale: 1.1, transition: { duration: 0.1 } },
  };

  return (
    <div
      className="relative overflow-hidden py-12"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      {...handlers}
    >
      <div className="mx-auto max-w-[1400px] px-4">
        {/* Navigation Arrows */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white hover:bg-gray-50 md:flex"
          aria-label="Previous categories"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
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
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white hover:bg-gray-50 md:flex"
          aria-label="Next categories"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
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
        </motion.button>

        {/* Slider container */}
        <div
          ref={containerRef}
          className="relative overflow-hidden py-4"
          style={{
            width: "100%",
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          <motion.div
            ref={sliderRef}
            className="flex"
            style={{
              width: `${totalSlides * 100}%`,
            }}
            drag="x"
            dragConstraints={{
              left: -(
                (totalSlides - 1) *
                (containerRef.current?.clientWidth || 0)
              ),
              right: 0,
            }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={{ x: 0 }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="flex w-full px-2"
                style={{
                  minWidth: `${100 / totalSlides}%`,
                  flex: `0 0 ${100 / totalSlides}%`,
                }}
              >
                {Categories.slice(
                  slideIndex * visibleCards,
                  (slideIndex + 1) * visibleCards,
                ).map((category) => (
                  <motion.div
                    key={category.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="flex-shrink-0 px-2"
                    style={{ width: `${100 / visibleCards}%` }}
                  >
                    <Link
                      href={category.url}
                      className="flex flex-col items-center transition-transform duration-300"
                    >
                      <motion.div
                        className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-[#42a4f522] sm:h-24 sm:w-24"
                        whileHover={{ scale: 1.1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <Image
                          className="h-full w-full object-cover"
                          src={category.image}
                          width={300}
                          height={300}
                          alt={category.title}
                        />
                      </motion.div>
                      <motion.h3 className="hover:text-primary text-center text-sm font-semibold text-gray-800 transition">
                        {category.title}
                      </motion.h3>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;
