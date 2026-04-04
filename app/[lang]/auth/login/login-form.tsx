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
import { useState } from "react";

import pt from "@/dictionaries/pt.json";
type LoginFormCopy = (typeof pt)["auth"]["login"];

export function LoginForm({
  className,
  lang,
  login,
  ...props
}: {
  lang: Locale;
  login: LoginFormCopy;
} & React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push(`/${lang}/dashboard`);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : login.genericError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{login.title}</CardTitle>
          <CardDescription>{login.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{login.emailLabel}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={login.emailPlaceholder}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{login.passwordLabel}</Label>
                  <Link
                    href={`/${lang}/auth/forgot-password`}
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    {login.forgotPassword}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? login.submitting : login.submit}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {login.noAccount}{" "}
              <Link
                href={`/${lang}/auth/sign-up`}
                className="underline underline-offset-4"
              >
                {login.signUp}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
