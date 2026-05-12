import { Hero } from "@/components/hero";
import { HomeAboutIntro } from "@/components/home-about-intro";
import { HomeNewsIntro } from "@/components/home-news-intro";
import { HomeNewsletter } from "@/components/home-newsletter";
import { HomePartnersIntro } from "@/components/home-partners-intro";
import { HomeProcessSteps } from "@/components/home-process-steps";
import { HomeServicesIntro } from "@/components/home-services-intro";
import { HomeValueProposition } from "@/components/home-value-proposition";
import { ScrollReveal } from "@/components/scroll-reveal";
import type { Locale } from "@/lib/i18n/locale";
import { isValidLocale } from "@/lib/i18n/locale";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: langParam } = await params;
  if (!isValidLocale(langParam)) {
    notFound();
  }
  const lang = langParam as Locale;

  return (
    <div className="flex flex-col gap-12 md:gap-16">
      <Hero />
      <main className="flex flex-1 flex-col gap-12 md:gap-16">
        {/* <HomeValueProposition /> */}
        <ScrollReveal>
          <HomeServicesIntro lang={lang} />
        </ScrollReveal>
        <ScrollReveal>
          <HomeAboutIntro aboutHref={`/${lang}/sobre-nos`} />
        </ScrollReveal>
        <ScrollReveal>
          <HomeProcessSteps />
        </ScrollReveal>
        <ScrollReveal>
          <HomePartnersIntro lang={lang} />
        </ScrollReveal>
        <ScrollReveal>
          <HomeNewsIntro lang={lang} />
        </ScrollReveal>
        <ScrollReveal>
          <HomeNewsletter lang={lang} />
        </ScrollReveal>
      </main>
    </div>
  );
}
