import Link from "next/link";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/server";
import type { Dictionary } from "@/lib/client/providers/dictionary-provider";
import type { Locale } from "@/lib/i18n/locale";
import { LogoutButton } from "../logout-button";

export async function AuthButton({
  lang,
  dictionary,
}: {
  lang: Locale;
  dictionary: Dictionary;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const email = user?.email ?? "";

  const dict = dictionary.components.authButton;

  return user ? (
    <div className="flex items-center gap-4">
      {dict.loggedInGreeting.replace("{email}", email)}
      <LogoutButton label={dict.logout} />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href={`/${lang}/auth/login`}>{dictionary.auth.login.title}</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href={`/${lang}/auth/sign-up`}>{dictionary.auth.signUp.title}</Link>
      </Button>
    </div>
  );
}
