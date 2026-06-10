import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../init";
import { blogRouter } from "./blog";
import { contactsRouter } from "./contacts";
import { formsRouter } from "./forms";
import { formSubmissionsRouter } from "./form-submissions";
import { preferencesRouter } from "./preferences";
import { usersRouter } from "./users";

export const appRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return { greeting: `hello ${input.text}` };
    }),
  users: usersRouter,
  blog: blogRouter,
  contacts: contactsRouter,
  forms: formsRouter,
  formSubmissions: formSubmissionsRouter,
  preferences: preferencesRouter,
});

export type AppRouter = typeof appRouter;
