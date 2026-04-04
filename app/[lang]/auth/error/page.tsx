import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary } from "../../dictionaries";
import type { Locale } from "@/lib/i18n/locale";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { error: dict } = dictionary.auth;
  const paramsResolved = await searchParams;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{dict.title}</CardTitle>
            </CardHeader>
            <CardContent>
              {paramsResolved?.error ? (
                <p className="text-sm text-muted-foreground">
                  {dict.codePrefix} {paramsResolved.error}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {dict.unspecified}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
