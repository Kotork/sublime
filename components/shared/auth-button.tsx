import Link from "next/link";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/locale";
import { LogoutButton } from "../logout-button";
import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import { getLocaleFromPathname } from "@/lib/utils/pathname";

export async function AuthButton({}: {}) {
  const supabase = await createClient();
  const dict = await useDictionary();

  const lang = getLocaleFromPathname(window.location.pathname);

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;
  const email = typeof user?.email === "string" ? user.email : "";

  return user ? (
    <div className="flex items-center gap-4">
      {dict.components["authButton"].loggedInGreeting.replace("{email}", email)}
      <LogoutButton label={dict.components["authButton"].logout} />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href={`/${lang}/auth/login`}>{dict.auth.login.title}</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href={`/${lang}/auth/sign-up`}>{dict.auth.signUp.title}</Link>
      </Button>
    </div>
  );
}
