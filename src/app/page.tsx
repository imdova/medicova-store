"use client";
import LandingImg_1 from "@/assets/images/landing-1.jpeg";
import LandingImg_2 from "@/assets/images/landing-2.jpeg";
import LandingSlider from "@/components/UI/sliders/LandingSlider";
import CategorySlider from "@/components/UI/sliders/CategorySlider";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const slides = [
  {
    title: "Summer Collection 2023",
    subtitle: "Discover our latest fashion trends",
    buttonText: "Shop Now",
    url: "/summer-collection",
    image: LandingImg_1,
  },
  {
    title: "Limited Time Offer",
    subtitle: "Get 30% off on selected items",
    buttonText: "View Deals",
    url: "/special-offers",
    image: LandingImg_2,
  },
  {
    title: "New Arrivals",
    subtitle: "Fresh styles for every occasion",
    buttonText: "Explore",
    url: "/new-arrivals",
    image: LandingImg_2,
  },
];
export default function Home() {
  useScrollAnimation();
  return (
    <div className="relative">
      <div className="container mx-auto px-6 lg:max-w-[1500px]">
        {/* landing content  */}
        <LandingSlider slides={slides} />
        <CategorySlider />
      </div>
    </div>
  );
}
