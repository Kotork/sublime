"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { partnerLogoSrc, type Partner } from "@/lib/home-partners";
import Image from "next/image";

const cardShellClassName =
  "flex h-full w-full flex-col items-center justify-center rounded-xl border border-border bg-card px-4 py-6 text-center shadow-sm outline-none transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:px-5 md:py-7";

type PartnersIntroCardsProps = {
  partners: readonly Partner[];
};

export function PartnersIntroCards({ partners }: PartnersIntroCardsProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5 lg:gap-5">
        {partners.map((partner) => (
          <li key={partner.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  aria-label={partner.name}
                  className={cardShellClassName}
                  tabIndex={0}
                >
                  <figure className="m-0 flex w-full flex-col items-center justify-center">
                    <div className="relative h-16 w-16 md:h-20 md:w-20">
                      <Image
                        alt={`Logótipo ${partner.name}.`}
                        className="object-contain"
                        fill
                        sizes="80px"
                        src={partnerLogoSrc(partner.logoFile)}
                      />
                    </div>
                    <figcaption className="mt-4 flex flex-col gap-1">
                      <span className="text-xs leading-snug text-muted-foreground md:text-sm">
                        {partner.category}
                      </span>
                    </figcaption>
                  </figure>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">{partner.name}</p>
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </TooltipProvider>
  );
}
