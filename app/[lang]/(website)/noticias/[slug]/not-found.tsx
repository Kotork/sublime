"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function NoticiaPostNotFound() {
  const params = useParams<{ lang?: string }>();
  const lang = params?.lang ?? "en";
  const listHref = `/${lang}/noticias`;
  const isPt = lang === "pt";

  return (
    <div className="py-20 text-center">
      <h1 className="mb-4 text-3xl font-bold">
        {isPt ? "Notícia não encontrada" : "Article not found"}
      </h1>
      <p className="mb-8 text-muted-foreground">
        {isPt
          ? "A notícia que procura não existe ou deixou de estar disponível."
          : "The article you are looking for does not exist or is no longer available."}
      </p>
      <Link
        href={listHref}
        className="text-sm text-primary underline hover:text-primary/80"
      >
        {isPt ? "← Voltar às notícias" : "← Back to news"}
      </Link>
    </div>
  );
}
