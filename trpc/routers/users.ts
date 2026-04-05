import { TRPCError } from "@trpc/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createTRPCRouter, authenticatedProcedure } from "../init";

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
    return data.users.map((u) => ({
      id: u.id,
      email: u.email ?? "",
      displayName: displayNameFromMetadata(
        u.user_metadata as Record<string, unknown> | null,
      ),
      createdAt: u.created_at,
      lastSignInAt: u.last_sign_in_at,
    }));
  }),
});
