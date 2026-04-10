import { LoginForm } from "./login-form";
import { getDictionary } from "../../dictionaries";
import type { Locale } from "@/lib/i18n/locale";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Button variant="ghost" className="w-fit gap-2 px-2" asChild>
          <Link href={`/${lang}`}>
            <ArrowLeft />
            {dictionary.auth.login.backToWebsite}
          </Link>
        </Button>
        <LoginForm lang={lang as Locale} dict={dictionary.auth.login} />
      </div>
    </div>
  );
}
