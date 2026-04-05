import { initTRPC, TRPCError } from "@trpc/server";

import { createClient } from "@/lib/supabase/server";

export async function createTRPCContext() {
  const supabase = await createClient();
  return { supabase };
}

type Context = Awaited<ReturnType<typeof createTRPCContext>>;

const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;

export const authenticatedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const {
    data: { user },
  } = await ctx.supabase.auth.getUser();
  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({ ctx });
});
