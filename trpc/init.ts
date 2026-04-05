import { initTRPC } from "@trpc/server";

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
