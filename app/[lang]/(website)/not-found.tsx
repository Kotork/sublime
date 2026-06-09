import CenterSection from "@/components/center-section";
import { CtaBannerAlt } from "@/components/cta-banner-alt";
import { Button } from "@/components/ui/button";
import { WebsiteSplitPageHero } from "@/components/website-split-page-hero";
import { WEBSITE_CONTENT_COLUMN_CLASS } from "@/lib/website-layout";
import {
  defaultLocale,
  type Locale,
  isValidLocale,
} from "@/lib/i18n/locale";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { getDictionary } from "../dictionaries";

const NOT_FOUND_HERO_IMAGE_SRC =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80";

async function getNotFoundLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  return defaultLocale;
}

export default async function WebsiteNotFoundPage() {
  const lang = await getNotFoundLocale();
  const dict = await getDictionary(lang);
  const content = dict.website.notFound;

  return (
    <main>
      <WebsiteSplitPageHero
        eyebrow={content.eyebrow}
        headingId="website-not-found-heading"
        imageAlt={content.heroImageAlt}
        imageSrc={NOT_FOUND_HERO_IMAGE_SRC}
        titleLines={
          content.titleLines as [string, string, ...string[]]
        }
      />
      <CenterSection
        variant="featured"
        srTitle={content.sectionTitle}
        description={content.sectionDescription}
      />
      <div
        className={cn(
          "flex justify-center px-4 pb-14 md:pb-20",
          WEBSITE_CONTENT_COLUMN_CLASS,
          "mx-auto"
        )}
      >
        <Button
          asChild
          className="h-auto min-h-11 px-6 py-3 text-sm font-bold sm:text-base"
        >
          <Link href={`/${lang}`}>{content.homeButton}</Link>
        </Button>
      </div>
      <CtaBannerAlt
        buttonLabel={content.contactButton}
        href={`/${lang}/contactos`}
        title={content.ctaTitle}
      />
    </main>
  );
}
