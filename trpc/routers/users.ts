import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createAdminClient } from "@/lib/supabase/admin";
import { createTRPCRouter, authenticatedProcedure } from "../init";

const inviteEmailSchema = z.object({
  email: z.string().email(),
});

function displayNameFromMetadata(
  meta: Record<string, unknown> | null | undefined,
): string {
  if (!meta || typeof meta !== "object") return "";
  const candidates = [
    meta.full_name,
    meta.name,
    meta.display_name,
    meta.preferred_username,
  ];
  for (const v of candidates) {
    if (typeof v === "string" && v.trim() !== "") return v.trim();
  }
  return "";
}

export const usersRouter = createTRPCRouter({
  list: authenticatedProcedure.query(async () => {
    const admin = createAdminClient();
    const { data, error } = await admin.auth.admin.listUsers({
      perPage: 1000,
      page: 1,
    });
    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }
    return data.users.map((u) => {
      const email = u.email ?? "";
      const waitingForVerification = Boolean(
        email && !u.email_confirmed_at,
      );
      return {
        id: u.id,
        email,
        displayName: displayNameFromMetadata(
          u.user_metadata as Record<string, unknown> | null,
        ),
        createdAt: u.created_at,
        lastSignInAt: u.last_sign_in_at,
        waitingForVerification,
      };
    });
  }),

  invite: authenticatedProcedure
    .input(inviteEmailSchema)
    .mutation(async ({ input }) => {
      const admin = createAdminClient();
      const { data, error } = await admin.auth.admin.inviteUserByEmail(
        input.email.trim(),
      );
      if (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }
      return { userId: data.user?.id ?? null };
    }),
});
