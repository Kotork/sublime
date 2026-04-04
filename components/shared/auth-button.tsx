import Link from "next/link";
import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/locale";
import { LogoutButton } from "../logout-button";

import pt from "@/dictionaries/pt.json";
type AuthButtonDict = (typeof pt)["components"]["authButton"];

export async function AuthButton({
  lang,
  dict,
}: {
  lang: Locale;
  dict: AuthButtonDict;
}) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;
  const email =
    typeof user?.email === "string" ? user.email : "";

  return user ? (
    <div className="flex items-center gap-4">
      {dict.loggedInGreeting.replace("{email}", email)}
      <LogoutButton label={dict.logout} lang={lang} />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href={`/${lang}/auth/login`}>{dict.signIn}</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href={`/${lang}/auth/sign-up`}>{dict.signUp}</Link>
      </Button>
    </div>
  );
}
