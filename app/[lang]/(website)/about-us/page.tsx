import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "A SublimePT é uma empresa de construção civil focada em soluções sustentáveis, construção e remodelação de moradias e edifícios multifamiliares.",
};

export default function AboutUsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-5 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Sobre nós
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
        Conteúdo da página em breve.
      </p>
    </main>
  );
}
