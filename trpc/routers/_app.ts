import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../init";
import { blogRouter } from "./blog";
import { usersRouter } from "./users";

export const appRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return { greeting: `hello ${input.text}` };
    }),
  users: usersRouter,
  blog: blogRouter,
});

export type AppRouter = typeof appRouter;
