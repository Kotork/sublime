import { TRPCError } from "@trpc/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { submitFormInputSchema, type SubmitFormInput } from "@/lib/forms/schemas";
import { createTRPCRouter, publicProcedure } from "../init";

type RpcArgs = {
  p_form_type: SubmitFormInput["formType"];
  p_name: string | null;
  p_phone: string | null;
  p_email: string | null;
  p_nif: string | null;
  p_company: string | null;
  p_subject: string | null;
  p_message: string | null;
  p_location: string | null;
  p_origin: string;
};

function buildRpcArgs(input: SubmitFormInput): RpcArgs {
  const base: RpcArgs = {
    p_form_type: input.formType,
    p_name: null,
    p_phone: null,
    p_email: null,
    p_nif: null,
    p_company: null,
    p_subject: null,
    p_message: null,
    p_location: null,
    p_origin: input.origin,
  };

  switch (input.formType) {
    case "quote":
      return {
        ...base,
        p_name: input.nome,
        p_phone: input.telefone,
        p_email: input.email || null,
        p_subject: `Pedido de orçamento para ${input.tipoObra}`,
        p_message: input.mensagem || null,
        p_location: input.localizacao,
      };
    case "newsletter":
      return {
        ...base,
        p_name: input.nome,
        p_email: input.email,
      };
    case "partnership":
      return {
        ...base,
        p_name: input.nome,
        p_phone: input.telefone,
        p_email: input.email,
        p_nif: input.nif,
        p_company: input.empresa,
        p_message: input.mensagem || null,
        p_location: input.localizacao || null,
      };
    case "contact":
      return {
        ...base,
        p_name: input.nome,
        p_phone: input.telemovel || null,
        p_email: input.email,
        p_subject: input.assunto || null,
        p_message: input.mensagem,
      };
  }
}

export const formsRouter = createTRPCRouter({
  submit: publicProcedure
    .input(submitFormInputSchema)
    .mutation(async ({ input }) => {
      const supabase = createAdminClient();
      const { data, error } = await supabase.rpc(
        "submit_form_submission",
        buildRpcArgs(input)
      );

      if (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }

      const row = Array.isArray(data) ? data[0] : data;
      if (!row) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Form submission failed",
        });
      }

      return {
        submissionId: row.submission_id as string,
        contactId: row.contact_id as string,
      };
    }),
});
