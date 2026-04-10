import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description:
    "Política de privacidade e tratamento de dados pessoais da SublimePT.",
};

export default function PoliticaPrivacidadePage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-5 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Política de privacidade
      </h1>
      <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
        Conteúdo legal em preparação.
      </p>
    </main>
  );
}
