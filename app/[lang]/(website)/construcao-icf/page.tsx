import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construção em ICF",
  description:
    "Construção com formulários de betão isolados (ICF) para conforto térmico e eficiência energética.",
};

export default function ConstrucaoIcfPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-5 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Construção em ICF
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
        Conteúdo da página em breve.
      </p>
    </main>
  );
}
