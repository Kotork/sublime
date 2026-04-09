"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const BRAND = "#0F5E7F";
const AUTOPLAY_MS = 6000;

const SLIDES = [
  {
    id: "sustainable-construction",
    title: "The New Generation of Sustainable Buildings",
    description:
      "With a hybrid solution of wood and concrete, we are building a new generation of buildings that combine efficiency and sustainability.",
    ctaLabel: "Discover Our Approach",
    ctaHref: "#about",
    imageSrc:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
    imageAlt:
      "Construction site with modern sustainable building and crane against a clear sky",
  },
  {
    id: "green-innovation",
    title: "Building a Greener Future",
    description:
      "Our commitment to the environment drives every project. From eco-friendly materials to energy-efficient designs, sustainability is at our core.",
    ctaLabel: "View Our Projects",
    ctaHref: "#projects",
    imageSrc:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    imageAlt:
      "Contemporary eco-friendly residential architecture with natural landscaping",
  },
] as const;

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setUserInteracted(true);
    setCurrentSlide(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const goNext = useCallback(() => {
    goTo(currentSlide + 1);
  }, [currentSlide, goTo]);

  const goPrev = useCallback(() => {
    goTo(currentSlide - 1);
  }, [currentSlide, goTo]);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      className="relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden"
    >
      <div
        className="relative h-[70vh] min-h-[500px] max-h-[800px] w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          aria-live={userInteracted ? "polite" : "off"}
          className="relative h-full w-full"
        >
          {SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <article
                key={slide.id}
                aria-hidden={!isActive}
                aria-roledescription="slide"
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-in-out",
                  isActive ? "z-1 opacity-100" : "z-0 opacity-0 pointer-events-none",
                )}
                id={`hero-slide-${index}`}
                role="group"
              >
                <Image
                  alt={slide.imageAlt}
                  className="object-cover"
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  src={slide.imageSrc}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-black/75 via-black/40 to-black/20"
                />
                <div className="absolute inset-0 flex items-center">
                  <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
                    <div className="max-w-[600px] text-left text-white">
                      {index === 0 ? (
                        <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                          {slide.title}
                        </h1>
                      ) : (
                        <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                          {slide.title}
                        </h2>
                      )}
                      <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
                        {slide.description}
                      </p>
                      <Button
                        asChild
                        className="mt-6 w-full border-0 text-white shadow-md hover:opacity-90 sm:w-auto"
                        size="lg"
                        style={{ backgroundColor: BRAND }}
                      >
                        <Link href={slide.ctaHref}>{slide.ctaLabel}</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-0 z-2 flex items-center justify-between px-3 md:px-6">
          <button
            aria-label="Previous slide"
            className="pointer-events-auto hidden rounded-full bg-white/90 p-2 text-foreground shadow-md transition hover:bg-white md:inline-flex"
            onClick={goPrev}
            type="button"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            aria-label="Next slide"
            className="pointer-events-auto hidden rounded-full bg-white/90 p-2 text-foreground shadow-md transition hover:bg-white md:inline-flex"
            onClick={goNext}
            type="button"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>

        <div
          aria-label="Slide indicators"
          className="pointer-events-auto absolute inset-x-0 bottom-6 z-2 flex justify-center gap-2 px-4"
          role="group"
        >
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              aria-controls={`hero-slide-${index}`}
              aria-pressed={index === currentSlide}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              className={cn(
                "h-2.5 rounded-full transition-all",
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/50 hover:bg-white/70",
              )}
              onClick={() => goTo(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
