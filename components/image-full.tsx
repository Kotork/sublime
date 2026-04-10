import { cn } from "@/lib/utils";
import Image from "next/image";

export type ImageFullProps = {
  src: string;
  /** Descriptive alt text for accessibility and SEO. */
  alt: string;
  /** When true, preloads the image (use for above-the-fold banners only). */
  priority?: boolean;
  /** Passed to `next/image` `sizes` (default full viewport width). */
  sizes?: string;
  /** Extra classes on the outer full-bleed wrapper. */
  className?: string;
  /** Tailwind classes controlling strip height (default: wide panoramic banner). */
  heightClassName?: string;
};

/**
 * Full-viewport-width image strip. Breaks out of centered content columns
 * using the same pattern as other full-bleed sections.
 */
export function ImageFull({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  className,
  heightClassName = "aspect-[6/1] min-h-[120px] max-h-[360px] sm:min-h-[140px] sm:max-h-[400px]",
}: ImageFullProps) {
  return (
    <figure
      className={cn(
        "relative m-0 w-screen max-w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden",
        className
      )}
    >
      <div className={cn("relative w-full", heightClassName)}>
        <Image
          alt={alt}
          className="object-cover"
          fill
          priority={priority}
          sizes={sizes}
          src={src}
        />
      </div>
    </figure>
  );
}
