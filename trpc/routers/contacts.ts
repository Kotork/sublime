import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createAdminClient } from "@/lib/supabase/admin";
import { escapeIlikePattern } from "../lib/ilike";
import { createTRPCRouter, authenticatedProcedure } from "../init";

const listSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(10),
  /** Case-insensitive match on name, email, phone or company (ilike). */
  search: z.string().max(200).optional(),
});

const idSchema = z.object({ id: z.string().uuid() });

const nifValue = z
  .string()
  .trim()
  .transform((value) => value.replace(/\s/g, ""))
  .refine((value) => value === "" || /^\d{9}$/.test(value), {
    message: "Indique um NIF válido (9 dígitos).",
  });

const updateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().optional(),
  company: z.string().trim().optional(),
  nif: nifValue.optional(),
});

type ContactListItem = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  company: string | null;
  nif: string | null;
};

type ContactDetail = ContactListItem & {
  consent: string | null;
  createdAt: string;
  updatedAt: string;
};

type ContactSubmission = {
  id: string;
  formType: string;
  state: string;
  subject: string | null;
  createdAt: string;
};

export const contactsRouter = createTRPCRouter({
  list: authenticatedProcedure.input(listSchema).query(
    async ({
      input,
    }): Promise<{
      items: ContactListItem[];
      total: number;
      page: number;
      pageSize: number;
    }> => {
      const admin = createAdminClient();
      const offset = (input.page - 1) * input.pageSize;

      let query = admin
        .from("contacts")
        .select("id, name, phone, email, company, nif", { count: "exact" })
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .range(offset, offset + input.pageSize - 1);

      // Commas break PostgREST `or()` argument parsing; strip for safe patterns.
      const searchTerm = (input.search?.trim() ?? "").replace(/,/g, " ");
      if (searchTerm.length > 0) {
        const pattern = `%${escapeIlikePattern(searchTerm)}%`;
        query = query.or(
          `name.ilike.${pattern},email.ilike.${pattern},phone.ilike.${pattern},company.ilike.${pattern}`,
        );
      }

      const { data, error, count } = await query;
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      return {
        items: (data ?? []) as ContactListItem[],
        total: count ?? 0,
        page: input.page,
        pageSize: input.pageSize,
      };
    },
  ),

  get: authenticatedProcedure.input(idSchema).query(
    async ({
      input,
    }): Promise<{ contact: ContactDetail; submissions: ContactSubmission[] }> => {
      const admin = createAdminClient();

      const { data: contact, error } = await admin
        .from("contacts")
        .select("id, name, phone, email, company, nif, consent, created_at, updated_at")
        .eq("id", input.id)
        .is("deleted_at", null)
        .maybeSingle();
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      if (!contact) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Contact not found" });
      }

      const { data: submissions, error: submissionsError } = await admin
        .from("form_submissions")
        .select("id, form_type, state, subject, created_at")
        .eq("contact_id", input.id)
        .order("created_at", { ascending: false });
      if (submissionsError) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: submissionsError.message,
        });
      }

      return {
        contact: {
          id: contact.id as string,
          name: contact.name as string | null,
          phone: contact.phone as string | null,
          email: contact.email as string | null,
          company: contact.company as string | null,
          nif: contact.nif as string | null,
          consent: contact.consent as string | null,
          createdAt: contact.created_at as string,
          updatedAt: contact.updated_at as string,
        },
        submissions: (submissions ?? []).map((s) => ({
          id: s.id as string,
          formType: s.form_type as string,
          state: s.state as string,
          subject: s.subject as string | null,
          createdAt: s.created_at as string,
        })),
      };
    },
  ),

  update: authenticatedProcedure
    .input(updateSchema)
    .mutation(async ({ input }): Promise<{ ok: true }> => {
      const admin = createAdminClient();

      const patch: Record<string, string | null> = {};
      if (input.name !== undefined) patch.name = input.name || null;
      if (input.company !== undefined) patch.company = input.company || null;
      if (input.nif !== undefined) patch.nif = input.nif || null;

      const { data, error } = await admin
        .from("contacts")
        .update(patch)
        .eq("id", input.id)
        .is("deleted_at", null)
        .select("id")
        .maybeSingle();
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      if (!data) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Contact not found" });
      }
      return { ok: true as const };
    }),

  softDelete: authenticatedProcedure
    .input(idSchema)
    .mutation(async ({ input }): Promise<{ ok: true }> => {
      const admin = createAdminClient();

      // Soft delete and free the unique phone/email so future submissions can
      // create a fresh contact. form_submissions are intentionally preserved.
      const { data, error } = await admin
        .from("contacts")
        .update({ deleted_at: new Date().toISOString(), phone: null, email: null })
        .eq("id", input.id)
        .is("deleted_at", null)
        .select("id")
        .maybeSingle();
      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      if (!data) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Contact not found" });
      }
      return { ok: true as const };
    }),
});
