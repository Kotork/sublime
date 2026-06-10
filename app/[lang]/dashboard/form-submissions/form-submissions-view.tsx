"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import { FORM_TYPES, type FormTypeName } from "@/lib/forms/schemas";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

import { FormSubmissionsTable } from "./form-submissions-table";
import { SubmissionDetailSheet } from "./submission-detail-sheet";

function isFormType(value: string | null): value is FormTypeName {
  return value !== null && (FORM_TYPES as readonly string[]).includes(value);
}

export function FormSubmissionsView() {
  const dict = useDictionary();
  const copy = dict.pages.dashboard.formSubmissions;
  const trpc = useTRPC();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlTab = searchParams.get("tab");
  const initialTab: FormTypeName = isFormType(urlTab) ? urlTab : "quote";
  const initialSubmissionId = searchParams.get("submissionId");

  const [tab, setTab] = useState<FormTypeName>(initialTab);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<
    string | null
  >(initialSubmissionId);
  const [sheetOpen, setSheetOpen] = useState<boolean>(
    Boolean(initialSubmissionId),
  );

  function buildUrl(params: {
    tab?: FormTypeName;
    submissionId?: string | null;
  }) {
    const next = new URLSearchParams(searchParams.toString());
    if (params.tab !== undefined) next.set("tab", params.tab);
    if (params.submissionId !== undefined) {
      if (params.submissionId === null) next.delete("submissionId");
      else next.set("submissionId", params.submissionId);
    }
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  // Resolve the correct tab for a deep-linked submission (?submissionId=...).
  const deepLink = useQuery({
    ...trpc.formSubmissions.get.queryOptions({
      id: initialSubmissionId ?? "",
    }),
    enabled: initialSubmissionId !== null,
  });

  useEffect(() => {
    const formType = deepLink.data?.formType;
    if (formType && isFormType(formType)) {
      setTab(formType);
      router.replace(buildUrl({ tab: formType }), { scroll: false });
    }
    // Run only when the deep-linked submission resolves.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepLink.data?.formType]);

  function handleTabChange(value: string) {
    if (!isFormType(value)) return;
    setTab(value);
    router.replace(buildUrl({ tab: value }), { scroll: false });
  }

  function openSubmission(id: string) {
    setSelectedSubmissionId(id);
    setSheetOpen(true);
    router.replace(buildUrl({ submissionId: id }), { scroll: false });
  }

  function handleSheetOpenChange(open: boolean) {
    setSheetOpen(open);
    if (!open) {
      setSelectedSubmissionId(null);
      router.replace(buildUrl({ submissionId: null }), { scroll: false });
    }
  }

  return (
    <>
      <Tabs value={tab} onValueChange={handleTabChange}>
        <TabsList>
          {FORM_TYPES.map((formType) => (
            <TabsTrigger key={formType} value={formType}>
              {copy.formType[formType]}
            </TabsTrigger>
          ))}
        </TabsList>
        {FORM_TYPES.map((formType) => (
          <TabsContent key={formType} value={formType} className="mt-4">
            <FormSubmissionsTable
              formType={formType}
              onOpenSubmission={openSubmission}
            />
          </TabsContent>
        ))}
      </Tabs>

      <SubmissionDetailSheet
        submissionId={selectedSubmissionId}
        open={sheetOpen}
        onOpenChange={handleSheetOpenChange}
      />
    </>
  );
}
