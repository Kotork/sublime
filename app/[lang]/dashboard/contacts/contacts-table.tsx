"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import { useTRPC } from "@/trpc/client";
import type { AppRouter } from "@/trpc/routers/_app";
import { TRPCClientError } from "@trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { inferRouterOutputs } from "@trpc/server";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { ContactDetailSheet } from "./contact-detail-sheet";

type ContactRow = inferRouterOutputs<AppRouter>["contacts"]["list"]["items"][number];

const PAGE_SIZE_OPTIONS = [10, 20, 25, 30, 40, 50];

export function ContactsTable() {
  const dict = useDictionary();
  const copy = dict.pages.dashboard.contacts;
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null,
  );
  const [sheetOpen, setSheetOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState<ContactRow | null>(
    null,
  );

  // Debounce the search input and reset to the first page on a new term.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError, error } = useQuery(
    trpc.contacts.list.queryOptions({
      page,
      pageSize,
      search: search || undefined,
    }),
  );

  const unauthorized =
    isError &&
    error instanceof TRPCClientError &&
    (error.data?.code === "UNAUTHORIZED" || error.data?.httpStatus === 401);

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const deleteMutation = useMutation(
    trpc.contacts.softDelete.mutationOptions({
      onSuccess: async () => {
        // If we just removed the last row on a page beyond the first, step back.
        if (items.length === 1 && page > 1) {
          setPage((p) => p - 1);
        }
        if (contactToDelete && contactToDelete.id === selectedContactId) {
          setSheetOpen(false);
          setSelectedContactId(null);
        }
        await queryClient.invalidateQueries({
          queryKey: trpc.contacts.list.queryKey(),
        });
        toast.success(copy.deleteSuccess);
        setContactToDelete(null);
      },
      onError: (err) => {
        toast.error(
          err instanceof TRPCClientError ? err.message : copy.deleteError,
        );
      },
    }),
  );

  const totalLabel = useMemo(
    () => copy.totalCount.replace("{count}", String(total)),
    [copy.totalCount, total],
  );

  function openContact(id: string) {
    setSelectedContactId(id);
    setSheetOpen(true);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <Input
          placeholder={copy.searchPlaceholder}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="max-w-sm"
        />
        <span className="text-muted-foreground text-sm">{totalLabel}</span>
      </div>

      {isLoading && (
        <p className="text-muted-foreground text-sm">{copy.loading}</p>
      )}

      {isError && (
        <p className="text-destructive text-sm" role="alert">
          {unauthorized ? copy.signInRequired : copy.loadError}
        </p>
      )}

      {!isLoading && !isError && (
        <>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{copy.name}</TableHead>
                  <TableHead>{copy.phone}</TableHead>
                  <TableHead>{copy.email}</TableHead>
                  <TableHead>{copy.company}</TableHead>
                  <TableHead className="text-right">{copy.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      {copy.empty}
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((contact) => (
                    <TableRow
                      key={contact.id}
                      className="cursor-pointer"
                      onClick={() => openContact(contact.id)}
                    >
                      <TableCell className="font-medium">
                        {contact.name || copy.emptyValue}
                      </TableCell>
                      <TableCell>{contact.phone || copy.emptyValue}</TableCell>
                      <TableCell>{contact.email || copy.emptyValue}</TableCell>
                      <TableCell>
                        {contact.company || contact.nif ? (
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {contact.company || copy.emptyValue}
                            </span>
                            {contact.nif ? (
                              <span className="text-muted-foreground text-xs">
                                {contact.nif}
                              </span>
                            ) : null}
                          </div>
                        ) : (
                          copy.emptyValue
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          aria-label={copy.deleteContactAria}
                          title={copy.deleteContactAria}
                          onClick={(e) => {
                            e.stopPropagation();
                            setContactToDelete(contact);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end gap-6 lg:gap-8">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">{copy.rowsPerPage}</p>
              <Select
                value={`${pageSize}`}
                onValueChange={(value) => {
                  setPageSize(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={`${pageSize}`} />
                </SelectTrigger>
                <SelectContent side="top">
                  {PAGE_SIZE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={`${option}`}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[110px] items-center justify-center text-sm font-medium">
              {`${copy.paginationPage} ${page} ${copy.paginationOf} ${pageCount}`}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => setPage(1)}
                disabled={page <= 1}
              >
                <span className="sr-only">{copy.goToFirstPage}</span>
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                <span className="sr-only">{copy.goToPreviousPage}</span>
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page >= pageCount}
              >
                <span className="sr-only">{copy.goToNextPage}</span>
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => setPage(pageCount)}
                disabled={page >= pageCount}
              >
                <span className="sr-only">{copy.goToLastPage}</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </>
      )}

      <Dialog
        open={contactToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setContactToDelete(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{copy.deleteConfirmTitle}</DialogTitle>
            <DialogDescription>
              {copy.deleteConfirmDescription.replace(
                "{name}",
                contactToDelete?.name ||
                  contactToDelete?.email ||
                  contactToDelete?.phone ||
                  copy.emptyValue,
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setContactToDelete(null)}
              disabled={deleteMutation.isPending}
            >
              {copy.deleteCancel}
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteMutation.isPending || !contactToDelete}
              onClick={() => {
                if (contactToDelete) {
                  deleteMutation.mutate({ id: contactToDelete.id });
                }
              }}
            >
              {copy.deleteConfirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ContactDetailSheet
        contactId={selectedContactId}
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
          if (!open) setSelectedContactId(null);
        }}
      />
    </div>
  );
}
