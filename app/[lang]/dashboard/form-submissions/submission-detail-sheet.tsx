"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useTRPC } from "@/trpc/client";
import { TRPCClientError } from "@trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type SubmissionState = "pending" | "done";

const SUBMISSION_STATES: SubmissionState[] = ["pending", "done"];

function formatDate(value: string | null | undefined, fallback: string) {
  if (value == null || value === "") return fallback;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return fallback;
  return d.toLocaleString();
}

export function SubmissionDetailSheet({
  submissionId,
  open,
  onOpenChange,
}: {
  submissionId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const dict = useDictionary();
  const copy = dict.pages.dashboard.formSubmissions;
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [state, setState] = useState<SubmissionState>("pending");

  const { data, isLoading, isError, error } = useQuery({
    ...trpc.formSubmissions.get.queryOptions({ id: submissionId ?? "" }),
    enabled: open && submissionId !== null,
  });

  useEffect(() => {
    if (data) {
      setState(data.state === "done" ? "done" : "pending");
    }
  }, [data]);

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
    trpc.formSubmissions.updateState.mutationOptions({
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: trpc.formSubmissions.get.queryKey({
              id: submissionId ?? "",
            }),
          }),
          queryClient.invalidateQueries({
            queryKey: trpc.formSubmissions.list.queryKey(),
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

  const isDirty = data ? state !== data.state : false;

  function handleSave() {
    if (!submissionId) return;
    updateMutation.mutate({ id: submissionId, state });
  }

  const contact = data?.contact ?? null;
  const formTypeLabel = data
    ? (copy.formType[data.formType as keyof typeof copy.formType] ??
      data.formType)
    : "";

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
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}

        {isError && !notFound && (
          <p className="text-destructive py-6 text-sm" role="alert">
            {copy.loadError}
          </p>
        )}

        {!isLoading && !isError && data && (
          <div className="flex flex-1 flex-col gap-6 py-6">
            <div className="grid gap-2">
              <Label htmlFor="submission-state">{copy.fieldState}</Label>
              <Select
                value={state}
                onValueChange={(value) => setState(value as SubmissionState)}
                disabled={updateMutation.isPending}
              >
                <SelectTrigger id="submission-state">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUBMISSION_STATES.map((value) => (
                    <SelectItem key={value} value={value}>
                      {copy.state[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">
                {copy.submissionSectionTitle}
              </h3>
              <dl className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex flex-col gap-0.5">
                  <dt className="text-muted-foreground">{copy.fieldFormType}</dt>
                  <dd>
                    <Badge variant="secondary" className="font-normal">
                      {formTypeLabel}
                    </Badge>
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-muted-foreground">{copy.fieldSubject}</dt>
                  <dd>{data.subject || copy.emptyValue}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-muted-foreground">{copy.fieldMessage}</dt>
                  <dd className="whitespace-pre-wrap wrap-break-word">
                    {data.message || copy.emptyValue}
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-muted-foreground">{copy.fieldLocation}</dt>
                  <dd>{data.location || copy.emptyValue}</dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-muted-foreground">{copy.fieldOrigin}</dt>
                  <dd className="wrap-break-word">
                    {data.origin || copy.emptyValue}
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5">
                  <dt className="text-muted-foreground">
                    {copy.fieldSubmittedAt}
                  </dt>
                  <dd>{formatDate(data.createdAt, copy.emptyValue)}</dd>
                </div>
              </dl>
            </div>

            <Separator />

            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-medium">{copy.contactSectionTitle}</h3>
              {contact ? (
                <dl className="grid grid-cols-1 gap-3 text-sm">
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-muted-foreground">{copy.fieldName}</dt>
                    <dd>{contact.name || copy.emptyValue}</dd>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-muted-foreground">{copy.fieldPhone}</dt>
                    <dd>{contact.phone || copy.emptyValue}</dd>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-muted-foreground">{copy.fieldEmail}</dt>
                    <dd className="wrap-break-word">
                      {contact.email || copy.emptyValue}
                    </dd>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-muted-foreground">{copy.fieldCompany}</dt>
                    <dd>{contact.company || copy.emptyValue}</dd>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-muted-foreground">{copy.fieldNif}</dt>
                    <dd>{contact.nif || copy.emptyValue}</dd>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-muted-foreground">{copy.fieldConsent}</dt>
                    <dd>{formatDate(contact.consent, copy.emptyValue)}</dd>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-muted-foreground">
                      {copy.fieldContactCreatedAt}
                    </dt>
                    <dd>{formatDate(contact.createdAt, copy.emptyValue)}</dd>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <dt className="text-muted-foreground">
                      {copy.fieldContactUpdatedAt}
                    </dt>
                    <dd>{formatDate(contact.updatedAt, copy.emptyValue)}</dd>
                  </div>
                </dl>
              ) : (
                <p className="text-muted-foreground text-sm">
                  {copy.contactDeleted}
                </p>
              )}
            </div>
          </div>
        )}

        {!isLoading && !isError && data && (
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
