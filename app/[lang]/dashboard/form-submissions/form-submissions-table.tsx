"use client";

import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import type { FormTypeName } from "@/lib/forms/schemas";
import { useTRPC } from "@/trpc/client";
import type { AppRouter } from "@/trpc/routers/_app";
import { TRPCClientError } from "@trpc/client";
import { useQuery } from "@tanstack/react-query";
import type { inferRouterOutputs } from "@trpc/server";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
} from "lucide-react";

type SubmissionRow =
  inferRouterOutputs<AppRouter>["formSubmissions"]["list"]["items"][number];

type SortBy =
  | "contact"
  | "subject"
  | "message"
  | "state"
  | "location"
  | "origin";

type SortDir = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [10, 20, 25, 30, 40, 50];

const MESSAGE_MAX_CHARS = 200;

function SortableHeader({
  label,
  column,
  sortBy,
  sortDir,
  onSort,
  ascLabel,
  descLabel,
  className,
}: {
  label: string;
  column: SortBy;
  sortBy: SortBy | null;
  sortDir: SortDir;
  onSort: (column: SortBy) => void;
  ascLabel: string;
  descLabel: string;
  className?: string;
}) {
  const active = sortBy === column;
  const Icon = !active ? ChevronsUpDown : sortDir === "asc" ? ArrowUp : ArrowDown;
  return (
    <TableHead className={className} aria-sort={active ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="-ml-2 h-8 data-[active=true]:text-foreground"
        data-active={active}
        onClick={() => onSort(column)}
        aria-label={active && sortDir === "asc" ? descLabel : ascLabel}
      >
        {label}
        <Icon className="ml-1 h-4 w-4" />
      </Button>
    </TableHead>
  );
}

export function FormSubmissionsTable({
  formType,
  onOpenSubmission,
}: {
  formType: FormTypeName;
  onOpenSubmission: (id: string) => void;
}) {
  const dict = useDictionary();
  const copy = dict.pages.dashboard.formSubmissions;
  const trpc = useTRPC();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  // Debounce the search input and reset to the first page on a new term.
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, isLoading, isError, error } = useQuery(
    trpc.formSubmissions.list.queryOptions({
      formType,
      page,
      pageSize,
      search: search || undefined,
      sortBy: sortBy ?? "createdAt",
      sortDir: sortBy ? sortDir : "desc",
    }),
  );

  const unauthorized =
    isError &&
    error instanceof TRPCClientError &&
    (error.data?.code === "UNAUTHORIZED" || error.data?.httpStatus === 401);

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  const totalLabel = useMemo(
    () => copy.totalCount.replace("{count}", String(total)),
    [copy.totalCount, total],
  );

  function handleSort(column: SortBy) {
    if (sortBy === column) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
    setPage(1);
  }

  function renderContact(contact: SubmissionRow["contact"]) {
    if (!contact) return copy.emptyValue;
    const hasSecondary = contact.phone || contact.email;
    return (
      <div className="flex flex-col">
        <span className="font-medium">{contact.name || copy.emptyValue}</span>
        {hasSecondary ? (
          <span className="text-muted-foreground text-xs">
            {[contact.phone, contact.email].filter(Boolean).join(" · ")}
          </span>
        ) : null}
      </div>
    );
  }

  function renderMessage(message: string | null) {
    if (!message) return copy.emptyValue;
    if (message.length <= MESSAGE_MAX_CHARS) {
      return <span className="wrap-break-word">{message}</span>;
    }
    const truncated = `${message.slice(0, MESSAGE_MAX_CHARS)}…`;
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="cursor-help text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {truncated}
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm whitespace-pre-wrap">
          {message}
        </TooltipContent>
      </Tooltip>
    );
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
        <TooltipProvider delayDuration={200}>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableHeader
                    label={copy.columnContact}
                    column="contact"
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onSort={handleSort}
                    ascLabel={copy.sortAscending}
                    descLabel={copy.sortDescending}
                  />
                  <SortableHeader
                    label={copy.columnSubject}
                    column="subject"
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onSort={handleSort}
                    ascLabel={copy.sortAscending}
                    descLabel={copy.sortDescending}
                  />
                  <SortableHeader
                    label={copy.columnMessage}
                    column="message"
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onSort={handleSort}
                    ascLabel={copy.sortAscending}
                    descLabel={copy.sortDescending}
                  />
                  <SortableHeader
                    label={copy.columnState}
                    column="state"
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onSort={handleSort}
                    ascLabel={copy.sortAscending}
                    descLabel={copy.sortDescending}
                  />
                  <SortableHeader
                    label={copy.columnLocation}
                    column="location"
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onSort={handleSort}
                    ascLabel={copy.sortAscending}
                    descLabel={copy.sortDescending}
                  />
                  <SortableHeader
                    label={copy.columnOrigin}
                    column="origin"
                    sortBy={sortBy}
                    sortDir={sortDir}
                    onSort={handleSort}
                    ascLabel={copy.sortAscending}
                    descLabel={copy.sortDescending}
                  />
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      {copy.empty}
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((submission) => (
                    <TableRow
                      key={submission.id}
                      className="cursor-pointer"
                      onClick={() => onOpenSubmission(submission.id)}
                    >
                      <TableCell>{renderContact(submission.contact)}</TableCell>
                      <TableCell>
                        {submission.subject || copy.emptyValue}
                      </TableCell>
                      <TableCell className="max-w-md align-top">
                        {renderMessage(submission.message)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">
                          {copy.state[
                            submission.state as keyof typeof copy.state
                          ] ?? submission.state}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {submission.location || copy.emptyValue}
                      </TableCell>
                      <TableCell>{submission.origin || copy.emptyValue}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TooltipProvider>
      )}

      {!isLoading && !isError && (
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
      )}
    </div>
  );
}
