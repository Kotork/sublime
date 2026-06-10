"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import type { Locale } from "@/lib/i18n/locale";
import { canonicalDashboardSegmentToLocalized } from "@/lib/i18n/localized-paths";
import { useTRPC } from "@/trpc/client";
import { TRPCClientError } from "@trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

function formatDate(value: string | null | undefined, fallback: string) {
  if (value == null || value === "") return fallback;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return fallback;
  return d.toLocaleString();
}

export function ContactDetailSheet({
  contactId,
  open,
  onOpenChange,
}: {
  contactId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dict = useDictionary();
  const copy = dict.pages.dashboard.contacts;
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const params = useParams<{ lang: string }>();
  const lang = (params?.lang ?? "pt") as Locale;
  const submissionsBase = `/${lang}/dashboard/${canonicalDashboardSegmentToLocalized(
    lang,
    "form-submissions",
  )}`;

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [nif, setNif] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    ...trpc.contacts.get.queryOptions({ id: contactId ?? "" }),
    enabled: open && contactId !== null,
  });

  useEffect(() => {
    if (data?.contact) {
      setName(data.contact.name ?? "");
      setCompany(data.contact.company ?? "");
      setNif(data.contact.nif ?? "");
    }
  }, [data?.contact]);

  const notFound =
    isError &&
    error instanceof TRPCClientError &&
    error.data?.code === "NOT_FOUND";

  useEffect(() => {
    if (notFound && open) {
      toast.error(copy.notFound);
      onOpenChange(false);
    }
  }, [notFound, open, copy.notFound, onOpenChange]);

  const updateMutation = useMutation(
    trpc.contacts.update.mutationOptions({
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: trpc.contacts.get.queryKey({ id: contactId ?? "" }),
          }),
          queryClient.invalidateQueries({
            queryKey: trpc.contacts.list.queryKey(),
          }),
        ]);
        toast.success(copy.saveSuccess);
      },
      onError: (err) => {
        toast.error(
          err instanceof TRPCClientError ? err.message : copy.saveError,
        );
      },
    }),
  );

  const isDirty = useMemo(() => {
    if (!data?.contact) return false;
    return (
      name !== (data.contact.name ?? "") ||
      company !== (data.contact.company ?? "") ||
      nif !== (data.contact.nif ?? "")
    );
  }, [data?.contact, name, company, nif]);

  function handleSave() {
    if (!contactId) return;
    updateMutation.mutate({ id: contactId, name, company, nif });
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 overflow-y-auto sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle>{copy.detailTitle}</SheetTitle>
          <SheetDescription>{copy.detailDescription}</SheetDescription>
        </SheetHeader>

        {isLoading && (
          <div className="flex flex-col gap-4 py-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        )}

        {isError && !notFound && (
          <p className="text-destructive py-6 text-sm" role="alert">
            {copy.loadError}
          </p>
        )}

        {!isLoading && !isError && data?.contact && (
          <div className="flex flex-1 flex-col gap-6 py-6">
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-name">{copy.name}</Label>
                <Input
                  id="contact-name"
                  value={name}
                  placeholder={copy.fieldNamePlaceholder}
                  onChange={(e) => setName(e.target.value)}
                  disabled={updateMutation.isPending}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-company">{copy.company}</Label>
                <Input
                  id="contact-company"
                  value={company}
                  placeholder={copy.fieldCompanyPlaceholder}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={updateMutation.isPending}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-nif">{copy.nif}</Label>
                <Input
                  id="contact-nif"
                  value={nif}
                  placeholder={copy.fieldNifPlaceholder}
                  inputMode="numeric"
                  onChange={(e) => setNif(e.target.value)}
                  disabled={updateMutation.isPending}
                />
              </div>
            </div>

            <Separator />

            <dl className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex flex-col gap-0.5">
                <dt className="text-muted-foreground">{copy.phone}</dt>
                <dd>{data.contact.phone || copy.emptyValue}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-muted-foreground">{copy.email}</dt>
                <dd>{data.contact.email || copy.emptyValue}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-muted-foreground">{copy.readOnlyConsent}</dt>
                <dd>{formatDate(data.contact.consent, copy.emptyValue)}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-muted-foreground">
                  {copy.readOnlyCreatedAt}
                </dt>
                <dd>{formatDate(data.contact.createdAt, copy.emptyValue)}</dd>
              </div>
              <div className="flex flex-col gap-0.5">
                <dt className="text-muted-foreground">
                  {copy.readOnlyUpdatedAt}
                </dt>
                <dd>{formatDate(data.contact.updatedAt, copy.emptyValue)}</dd>
              </div>
            </dl>

            <Separator />

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">{copy.submissionsTitle}</h3>
              {data.submissions.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  {copy.submissionsEmpty}
                </p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {data.submissions.map((submission) => {
                    const formTypeLabel =
                      copy.formType[
                        submission.formType as keyof typeof copy.formType
                      ] ?? submission.formType;
                    const stateLabel =
                      copy.state[
                        submission.state as keyof typeof copy.state
                      ] ?? submission.state;
                    return (
                      <li key={submission.id}>
                        <Link
                          href={`${submissionsBase}?submissionId=${submission.id}`}
                          className="hover:bg-accent flex items-center justify-between gap-2 rounded-md border p-3 text-sm transition-colors"
                        >
                          <span className="flex flex-col gap-1">
                            <span className="flex items-center gap-2">
                              <Badge variant="secondary" className="font-normal">
                                {formTypeLabel}
                              </Badge>
                              <span className="text-muted-foreground text-xs">
                                {stateLabel}
                              </span>
                            </span>
                            {submission.subject ? (
                              <span className="text-muted-foreground">
                                {submission.subject}
                              </span>
                            ) : null}
                          </span>
                          <span className="text-muted-foreground shrink-0 text-xs">
                            {formatDate(submission.createdAt, copy.emptyValue)}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}

        {!isLoading && !isError && data?.contact && (
          <SheetFooter>
            <Button
              type="button"
              onClick={handleSave}
              disabled={!isDirty || updateMutation.isPending}
            >
              {updateMutation.isPending ? copy.saving : copy.save}
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
