import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createAdminClient } from "@/lib/supabase/admin";
import { FORM_TYPES } from "@/lib/forms/schemas";
import { escapeIlikePattern } from "../lib/ilike";
import { createTRPCRouter, authenticatedProcedure } from "../init";

const SORT_FIELDS = [
  "contact",
  "subject",
  "message",
  "state",
  "location",
  "origin",
  "createdAt",
] as const;

/** Maps a sort key to its underlying column (contact sorts on the embedded name). */
const SORT_COLUMN: Record<(typeof SORT_FIELDS)[number], string> = {
  contact: "name",
  subject: "subject",
  message: "message",
  state: "state",
  location: "location",
  origin: "origin",
  createdAt: "created_at",
};

const listSchema = z.object({
  formType: z.enum(FORM_TYPES),
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
  /** Case-insensitive match on contact name, email or phone (ilike). */
  search: z.string().max(200).optional(),
  sortBy: z.enum(SORT_FIELDS).default("createdAt"),
  sortDir: z.enum(["asc", "desc"]).default("desc"),
});

const idSchema = z.object({ id: z.string().uuid() });

const updateStateSchema = z.object({
  id: z.string().uuid(),
  state: z.enum(["pending", "done"]),
});

type SubmissionContact = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  company: string | null;
  nif: string | null;
};

type SubmissionListItem = {
  id: string;
  formType: string;
  state: string;
  subject: string | null;
  message: string | null;
  location: string | null;
  origin: string;
  createdAt: string;
  contact: SubmissionContact | null;
};

type SubmissionDetailContact = SubmissionContact & {
  consent: string | null;
  createdAt: string;
  updatedAt: string;
};

type SubmissionDetail = Omit<SubmissionListItem, "contact"> & {
  contact: SubmissionDetailContact | null;
};

/** PostgREST embeds a to-one relation as an object or (rarely) a single-item array. */
function firstRelation<T>(value: T | T[] | null | undefined): T | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export const formSubmissionsRouter = createTRPCRouter({
  list: authenticatedProcedure.input(listSchema).query(
    async ({
      input,
    }): Promise<{
      items: SubmissionListItem[];
      total: number;
      page: number;
      pageSize: number;
    }> => {
      const admin = createAdminClient();
      const offset = (input.page - 1) * input.pageSize;
      const ascending = input.sortDir === "asc";

      let query = admin
        .from("form_submissions")
        .select(
          "id, form_type, state, subject, message, location, origin, created_at, contacts!inner(id, name, phone, email, company, nif, deleted_at)",
          { count: "exact" },
        )
        .eq("form_type", input.formType)
        .is("contacts.deleted_at", null);

      if (input.sortBy === "contact") {
        query = query.order(SORT_COLUMN.contact, {
          referencedTable: "contacts",
          ascending,
        });
      } else {
        query = query.order(SORT_COLUMN[input.sortBy], { ascending });
      }

      // Stable tiebreaker so equal values keep a deterministic order across pages.
      query = query.order("created_at", { ascending: false });

      // Commas break PostgREST `or()` argument parsing; strip for safe patterns.
      const searchTerm = (input.search?.trim() ?? "").replace(/,/g, " ");
      if (searchTerm.length > 0) {
        const pattern = `%${escapeIlikePattern(searchTerm)}%`;
        query = query.or(
          `name.ilike.${pattern},email.ilike.${pattern},phone.ilike.${pattern}`,
          { referencedTable: "contacts" },
        );
      }

      const { data, error, count } = await query.range(
        offset,
        offset + input.pageSize - 1,
      );
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      const items: SubmissionListItem[] = (data ?? []).map((row) => {
        const contact = firstRelation(
          row.contacts as
            | (SubmissionContact & { deleted_at: string | null })
            | (SubmissionContact & { deleted_at: string | null })[]
            | null,
        );
        return {
          id: row.id as string,
          formType: row.form_type as string,
          state: row.state as string,
          subject: row.subject as string | null,
          message: row.message as string | null,
          location: row.location as string | null,
          origin: row.origin as string,
          createdAt: row.created_at as string,
          contact: contact
            ? {
                id: contact.id,
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
                company: contact.company,
                nif: contact.nif,
              }
            : null,
        };
      });

      return {
        items,
        total: count ?? 0,
        page: input.page,
        pageSize: input.pageSize,
      };
    },
  ),

  get: authenticatedProcedure
    .input(idSchema)
    .query(async ({ input }): Promise<SubmissionDetail> => {
      const admin = createAdminClient();

      const { data, error } = await admin
        .from("form_submissions")
        .select(
          "id, form_type, state, subject, message, location, origin, created_at, contacts(id, name, phone, email, company, nif, consent, created_at, updated_at)",
        )
        .eq("id", input.id)
        .maybeSingle();
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Submission not found",
        });
      }

      const contact = firstRelation(
        data.contacts as
          | (SubmissionContact & {
              consent: string | null;
              created_at: string;
              updated_at: string;
            })
          | (SubmissionContact & {
              consent: string | null;
              created_at: string;
              updated_at: string;
            })[]
          | null,
      );

      return {
        id: data.id as string,
        formType: data.form_type as string,
        state: data.state as string,
        subject: data.subject as string | null,
        message: data.message as string | null,
        location: data.location as string | null,
        origin: data.origin as string,
        createdAt: data.created_at as string,
        contact: contact
          ? {
              id: contact.id,
              name: contact.name,
              phone: contact.phone,
              email: contact.email,
              company: contact.company,
              nif: contact.nif,
              consent: contact.consent,
              createdAt: contact.created_at,
              updatedAt: contact.updated_at,
            }
          : null,
      };
    }),

  updateState: authenticatedProcedure
    .input(updateStateSchema)
    .mutation(async ({ input }): Promise<{ ok: true }> => {
      const admin = createAdminClient();

      const { data, error } = await admin
        .from("form_submissions")
        .update({ state: input.state })
        .eq("id", input.id)
        .select("id")
        .maybeSingle();
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Submission not found",
        });
      }
      return { ok: true as const };
    }),
});
