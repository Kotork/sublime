"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/lib/i18n/locale";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentPropsWithoutRef, useState } from "react";

import pt from "@/dictionaries/pt.json";
type SignUpFormDict = (typeof pt)["auth"]["signUp"];

export function SignUpForm({
  className,
  lang,
  dict,
  ...props
}: {
  lang: Locale;
  dict: SignUpFormDict;
} & ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError(dict.passwordsMismatch);
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/${lang}/dashboard`,
        },
      });
      if (error) throw error;
      router.push(`/${lang}/auth/sign-up-success`);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : dict.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{dict.title}</CardTitle>
          <CardDescription>{dict.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{dict.emailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={dict.emailPlaceholder}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{dict.passwordLabel}</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">
                    {dict.repeatPasswordLabel}
                  </Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? dict.submitting : dict.submit}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {dict.hasAccount}{" "}
              <Link
                href={`/${lang}/auth/login`}
                className="underline underline-offset-4"
              >
                {dict.signIn}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
