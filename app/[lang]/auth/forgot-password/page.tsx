import { ForgotPasswordForm } from "./forgot-password-form";
import { getDictionary } from "../../dictionaries";
import type { Locale } from "@/lib/i18n/locale";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <ForgotPasswordForm
          lang={lang as Locale}
          forgotPassword={dictionary.auth.forgotPassword}
        />
      </div>
    </div>
  );
}
