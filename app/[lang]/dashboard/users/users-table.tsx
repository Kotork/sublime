"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/components/data-table-column-header";
import { DataTable } from "@/components/shared/data-table/data-table";
import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import { useTRPC } from "@/trpc/client";
import type { AppRouter } from "@/trpc/routers/_app";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { TRPCClientError } from "@trpc/client";
import type { inferRouterOutputs } from "@trpc/server";
import { useMemo } from "react";

type UserRow = inferRouterOutputs<AppRouter>["users"]["list"][number];

function formatDate(value: string | undefined | null) {
  if (value == null || value === "") return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

export function UsersTable() {
  const dict = useDictionary();
  const copy = dict.pages.dashboard.users;
  const trpc = useTRPC();

  const { data, isLoading, error, isError } = useQuery(
    trpc.users.list.queryOptions(undefined),
  );

  const columns = useMemo<ColumnDef<UserRow>[]>(
    () => [
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={copy.email} />
        ),
        cell: ({ row }) => (
          <span className="font-medium">{row.original.email || "—"}</span>
        ),
      },
      {
        accessorKey: "displayName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={copy.displayName} />
        ),
        cell: ({ row }) => row.original.displayName || "—",
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={copy.createdAt} />
        ),
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        accessorKey: "lastSignInAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={copy.lastSignIn} />
        ),
        cell: ({ row }) => formatDate(row.original.lastSignInAt),
      },
    ],
    [copy.createdAt, copy.displayName, copy.email, copy.lastSignIn],
  );

  if (isLoading) {
    return (
      <p className="text-muted-foreground text-sm">{copy.loading}</p>
    );
  }

  if (isError) {
    const unauthorized =
      error instanceof TRPCClientError &&
      (error.data?.code === "UNAUTHORIZED" || error.data?.httpStatus === 401);
    return (
      <p className="text-destructive text-sm" role="alert">
        {unauthorized ? copy.signInRequired : copy.loadError}
      </p>
    );
  }

  const rows = data ?? [];

  return (
    <DataTable
      columns={columns}
      data={rows}
      filterColumnId="email"
      filterPlaceholder={copy.filterPlaceholder}
    />
  );
}
