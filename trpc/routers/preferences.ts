import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, authenticatedProcedure } from "../init";

const upsertInput = z
  .object({
    locale: z.enum(["en", "pt"]).optional(),
    theme: z.enum(["light", "dark", "system"]).optional(),
  })
  .refine(
    (v) => v.locale !== undefined || v.theme !== undefined,
    "At least one of locale or theme is required",
  );

export const preferencesRouter = createTRPCRouter({
  get: authenticatedProcedure.query(async ({ ctx }) => {
    const {
      data: { user },
    } = await ctx.supabase.auth.getUser();
    if (!user) return null;
    const { data, error } = await ctx.supabase
      .from("user_preferences")
      .select("locale, theme, updated_at")
      .eq("user_id", user.id)
      .maybeSingle();
    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
    return data;
  }),

  upsert: authenticatedProcedure.input(upsertInput).mutation(async ({ ctx, input }) => {
    const {
      data: { user },
    } = await ctx.supabase.auth.getUser();
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const { data: existing } = await ctx.supabase
      .from("user_preferences")
      .select("locale, theme")
      .eq("user_id", user.id)
      .maybeSingle();

    const locale = input.locale ?? existing?.locale ?? "en";
    const theme = input.theme ?? existing?.theme ?? "light";

    const { error } = await ctx.supabase.from("user_preferences").upsert(
      {
        user_id: user.id,
        locale,
        theme,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return { locale, theme };
  }),
});
