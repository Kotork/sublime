"use client";

import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  delay?: number;
  start?: string;
};

export function ScrollReveal({
  children,
  className,
  y = 40,
  duration = 0.8,
  delay = 0,
  start = "top 85%",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const target = containerRef.current;
      if (!target) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          normalMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const conditions = context.conditions as
            | { reduceMotion?: boolean; normalMotion?: boolean }
            | undefined;
          const reduceMotion = Boolean(conditions?.reduceMotion);

          if (reduceMotion) {
            gsap.set(target, { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.from(target, {
            autoAlpha: 0,
            y,
            duration,
            delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: target,
              start,
              once: true,
            },
          });
        }
      );

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn(className)}
      style={{ visibility: "hidden" }}
    >
      {children}
    </div>
  );
}
