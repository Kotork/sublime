import { cn } from "@/lib/utils";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import Image from "next/image";

/** Placeholder — construction professionals at a building site (Unsplash). */
export const SOBRE_NOS_COMPANY_STORY_IMAGE_SRC = "/images/sobre-nos/intro.png";

export const SOBRE_NOS_COMPANY_STORY_IMAGE_ALT =
  "Dois profissionais da construção cumprimentam-se num estaleiro de obras, com capacetes de proteção e equipamento de segurança.";

const BODY_CLASS =
  "text-pretty text-base leading-relaxed text-foreground md:text-lg";

export function SobreNosCompanyStory() {
  return (
    <section
      aria-labelledby="about-us-company-story-heading"
      className="w-full bg-background"
    >
      <div
        className={cn(
          "mx-auto w-full px-4 sm:px-5",
          WEBSITE_CONTENT_COLUMN_CLASS
        )}
      >
        <h2 className="sr-only" id="about-us-company-story-heading">
          História e atuação da SublimePT na construção civil
        </h2>
        <div className="grid w-full min-w-0 gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-12 lg:gap-x-16 lg:gap-y-14">
          <figure className="relative m-0 aspect-4/3 w-full min-w-0 overflow-hidden rounded-sm">
            <Image
              alt={SOBRE_NOS_COMPANY_STORY_IMAGE_ALT}
              className="object-cover rounded-lg"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              src={SOBRE_NOS_COMPANY_STORY_IMAGE_SRC}
            />
          </figure>
          <div
            className={cn(
              "flex min-w-0 flex-col gap-4 md:gap-16 md:self-center",
              BODY_CLASS
            )}
          >
            <p>
              A SublimePT nasceu da paixão pela construção e pela vontade de
              fazer diferente. Em poucos anos, consolidámos uma equipa jovem e
              dinâmica, preparada para responder com agilidade às necessidades
              de cada cliente.
            </p>
            <p>
              Atuamos no segmento de obras particulares em regime de empreitada,
              com especial foco na construção e remodelação de moradias e
              edifícios multifamiliares, garantindo sempre rigor, proximidade e
              compromisso com os resultados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
