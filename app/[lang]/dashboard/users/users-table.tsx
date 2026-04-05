"use client";

import { DataTableColumnHeader } from "@/components/shared/data-table/components/data-table-column-header";
import { DataTable } from "@/components/shared/data-table/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import { useTRPC } from "@/trpc/client";
import type { AppRouter } from "@/trpc/routers/_app";
import { TRPCClientError } from "@trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import type { inferRouterOutputs } from "@trpc/server";
import { UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

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
  const queryClient = useQueryClient();

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const { data, isLoading, error, isError } = useQuery(
    trpc.users.list.queryOptions(undefined),
  );

  const inviteMutation = useMutation(
    trpc.users.invite.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: trpc.users.list.queryKey(undefined),
        });
        toast.success(copy.inviteSuccess);
        setInviteOpen(false);
        setInviteEmail("");
      },
      onError: (err) => {
        toast.error(
          err instanceof TRPCClientError ? err.message : copy.inviteError,
        );
      },
    }),
  );

  const unauthorized =
    isError &&
    error instanceof TRPCClientError &&
    (error.data?.code === "UNAUTHORIZED" || error.data?.httpStatus === 401);

  const columns = useMemo<ColumnDef<UserRow>[]>(
    () => [
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={copy.email} />
        ),
        cell: ({ row }) => (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{row.original.email || "—"}</span>
            {row.original.waitingForVerification ? (
              <Badge variant="warning" className="font-normal">
                {copy.verificationBadge}
              </Badge>
            ) : null}
          </div>
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
    [
      copy.createdAt,
      copy.displayName,
      copy.email,
      copy.lastSignIn,
      copy.verificationBadge,
    ],
  );

  const rows = data ?? [];

  return (
    <div className="flex flex-col gap-4">
      {!unauthorized && (
        <>
          <div className="flex justify-end">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => setInviteOpen(true)}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              {copy.inviteUser}
            </Button>
          </div>

          <Dialog
            open={inviteOpen}
            onOpenChange={(open) => {
              setInviteOpen(open);
              if (!open) setInviteEmail("");
            }}
          >
            <DialogContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  inviteMutation.mutate({ email: inviteEmail });
                }}
              >
                <DialogHeader>
                  <DialogTitle>{copy.inviteDialogTitle}</DialogTitle>
                  <DialogDescription>
                    {copy.inviteDialogDescription}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="invite-email">{copy.inviteEmailLabel}</Label>
                    <Input
                      id="invite-email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      disabled={inviteMutation.isPending}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setInviteOpen(false)}
                    disabled={inviteMutation.isPending}
                  >
                    {copy.inviteCancel}
                  </Button>
                  <Button type="submit" disabled={inviteMutation.isPending}>
                    {copy.inviteSubmit}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </>
      )}

      {isLoading && (
        <p className="text-muted-foreground text-sm">{copy.loading}</p>
      )}

      {isError && (
        <p className="text-destructive text-sm" role="alert">
          {unauthorized ? copy.signInRequired : copy.loadError}
        </p>
      )}

      {!isLoading && !isError && (
        <DataTable
          columns={columns}
          data={rows}
          filterColumnId="email"
          filterPlaceholder={copy.filterPlaceholder}
        />
      )}
    </div>
  );
}
