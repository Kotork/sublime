"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const BRAND = "#0F5E7F";
const AUTOPLAY_MS = 6000;

const SLIDES = [
  {
    id: "sustainable-construction",
    title: "A nova geração de edifícios sustentáveis",
    description:
      "Com a solução de LSF, estamos a construir uma nova geração de edifícios que combinam eficiência e sustentabilidade.",
    ctaLabel: "Descubra a nossa abordagem",
    ctaHref: "#about",
    imageSrc:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80",
    imageAlt:
      "Edifício sustentável com moderno edifício e uma grua contra um céu claro",
  },
  {
    id: "green-innovation",
    title: "Construindo um futuro mais sustentável",
    description:
      "O nosso compromisso com o meio ambiente impulsiona cada projeto. Desde materiais sustentáveis até projetos eficientes em energia, a sustentabilidade é o nosso núcleo.",
    ctaLabel: "Sabe mais sobre a nossa abordagem",
    ctaHref: "#projects",
    imageSrc:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    imageAlt:
      "Arquitetura sustentável residencial moderna com paisagens naturais",
  },
] as const;

export function Hero() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const autoplayRef = useRef(
    Autoplay({ delay: AUTOPLAY_MS, stopOnInteraction: true }),
  );

  const goTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
      setUserInteracted(true);
    },
    [api],
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    const onPointerDown = () => {
      setUserInteracted(true);
    };

    onSelect();
    api.on("select", onSelect);
    api.on("pointerDown", onPointerDown);

    return () => {
      api.off("select", onSelect);
      api.off("pointerDown", onPointerDown);
    };
  }, [api]);

  return (
    <section
      aria-label="Featured highlights"
      className="relative w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden"
    >
      <div
        className="relative h-[70vh] min-h-[500px] max-h-[800px] w-full"
        onMouseEnter={() => autoplayRef.current.stop()}
        onMouseLeave={() => autoplayRef.current.reset()}
      >
        <Carousel
          aria-live={userInteracted ? "polite" : "off"}
          className="h-full [&>div:first-child]:h-full [&>div:first-child>div]:h-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[autoplayRef.current]}
          setApi={setApi}
        >
          <CarouselContent className="ml-0 h-full">
            {SLIDES.map((slide, index) => (
              <CarouselItem
                key={slide.id}
                className="h-full basis-full pl-0"
                id={`hero-slide-${index}`}
              >
                <article className="relative h-full w-full">
                  <Image
                    alt={slide.imageAlt}
                    className="object-cover"
                    draggable={false}
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
                    <div className="mx-auto w-full max-w-5xl px-5 sm:px-8 md:px-14 lg:px-[calc(1.5rem+2.5rem+0.75rem)]">
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
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious
            className={cn(
              "pointer-events-auto z-10 h-10 w-10 border-0 bg-white/90 text-foreground shadow-md hover:bg-white",
              "hidden lg:inline-flex",
              "top-1/2 left-3 -translate-y-1/2 md:left-6",
            )}
            variant="secondary"
          />
          <CarouselNext
            className={cn(
              "pointer-events-auto z-10 h-10 w-10 border-0 bg-white/90 text-foreground shadow-md hover:bg-white",
              "hidden lg:inline-flex",
              "top-1/2 right-3 -translate-y-1/2 md:right-6",
            )}
            variant="secondary"
          />
        </Carousel>

        <div
          aria-label="Slide indicators"
          className="pointer-events-auto absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2 px-4"
          role="group"
        >
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              aria-controls={`hero-slide-${index}`}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              aria-pressed={index === current}
              className={cn(
                "h-2.5 rounded-full transition-all",
                index === current
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
