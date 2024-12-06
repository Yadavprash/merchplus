"use client"
import { useState, useEffect, useCallback } from "react";
import {  ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
    {
      image: "/placeholder.svg?height=600&width=1200",
      title: "Welcome to Merch Plus",
      description:
        "Discover the best collection of anime merchandise. From figurines to apparel, we've got it all!",
    },
    {
      image: "/placeholder.svg?height=600&width=1200",
      title: "New Arrivals",
      description: "Check out our latest anime collectibles and merchandise!",
    },
    {
      image: "/placeholder.svg?height=600&width=1200",
      title: "Limited Time Offer",
      description: "Get 20% off on all manga series this week only!",
    },
  ];
  
  

function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const handleSlideChange = useCallback(
      (direction: "prev" | "next") => {
        setCurrentSlide((prev) =>
          direction === "next"
            ? (prev + 1) % slides.length
            : (prev - 1 + slides.length) % slides.length
        );
      },
      [slides.length]
    );
  
    useEffect(() => {
      const timer = setInterval(() => handleSlideChange("next"), 5000);
      return () => clearInterval(timer);
    }, [handleSlideChange]);
  
    return (
      <section className="w-full bg-black rounded relative ">
        <div className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded overflow-hidden">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
        >
          <source src="/videos/Landing2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <div className="text-center text-white space-y-4 max-w-4xl px-4">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
                  {slide.title}
                </h1>
                <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-100"
                    href="/catalog"
                  >
                    Shop Now
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white bg-opacity-20 px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-opacity-30"
                    href="#"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Navigation */}
      <button
        onClick={() => handleSlideChange("prev")}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-lg hover:bg-opacity-75"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
      <button
        onClick={() => handleSlideChange("next")}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 shadow-lg hover:bg-opacity-75"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      </section>
    );
  }

export default HeroSection;