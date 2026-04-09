import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/locale";
import { InfoIcon } from "lucide-react";
import { FetchDataSteps } from "@/components/tutorial/fetch-data-steps";
import { Suspense } from "react";
import { getDictionary } from "../dictionaries";
import { StorageUsageBanner } from "./_components/storage-usage-banner/storage-usage-banner";

async function UserDetails() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return JSON.stringify(data.claims, null, 2);
}

export default async function ProtectedPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <Suspense>
        <StorageUsageBanner dict={dictionary.pages.dashboard.storageUsage} />
      </Suspense>
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          <Suspense>
            <UserDetails />
          </Suspense>
        </pre>
      </div>
      <div>
        <h2 className="font-bold text-2xl mb-4">Next steps</h2>
        <FetchDataSteps />
      </div>
    </div>
  );
}
