import "server-only";

import { cache } from "react";

import { createCallerFactory, createTRPCContext } from "./init";
import { appRouter } from "./routers/_app";

const createCaller = createCallerFactory(appRouter);

export const getTRPCCaller = cache(async () =>
  createCaller(await createTRPCContext()),
);
