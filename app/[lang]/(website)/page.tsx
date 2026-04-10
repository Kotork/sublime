import { CtaBanner } from "@/components/cta-banner";
import { Hero } from "@/components/hero";
import { HomeAboutIntro } from "@/components/home-about-intro";
import { HomeServicesIntro } from "@/components/home-services-intro";
import { HomeValueProposition } from "@/components/home-value-proposition";
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
        <HomeValueProposition />
        <HomeAboutIntro aboutHref={`/${lang}/about-us`} />
        <HomeServicesIntro lang={lang} />
        <CtaBanner
          buttonLabel="Peça o seu orçamento"
          dialogTitle="Pedido de orçamento"
          title="Vai construir ou remodelar casa?"
        />
      </main>
    </div>
  );
}
