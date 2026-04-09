"use client";

import { Suspense, useCallback, useDeferredValue, useEffect, useState } from "react";
import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import Image from "next/image";
import { normalizeTagSlug } from "@/lib/blog/tag-slug";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/ui/command";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { ChevronLeft, ChevronRight, ChevronsUpDown, Plus } from "lucide-react";

const PAGE_SIZE = 10;

const VALID_STATUSES = ["draft", "published", "archived"] as const;
type PostStatus = (typeof VALID_STATUSES)[number];

const STATUS_VARIANTS: Record<
  string,
  "default" | "secondary" | "outline" | "warning"
> = {
  draft: "outline",
  published: "default",
  archived: "secondary",
};

type BlogTagFilterProps = {
  copy: {
    filterByTag: string;
    tagFilterAll: string;
  };
  tagFilter: string | undefined;
  statusFilter: PostStatus | undefined;
  buildHref: (p: number, status?: PostStatus, tag?: string) => string;
};

function BlogTagFilter({
  copy,
  tagFilter,
  statusFilter,
  buildHref,
}: BlogTagFilterProps) {
  const trpc = useTRPC();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const { data: tagList = [] } = useQuery(
    trpc.blog.tagSuggestions.queryOptions({
      q: deferredSearch,
      limit: 50,
    }),
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="h-8 min-w-[10rem] justify-between gap-2 font-normal"
        >
          <span className="truncate">
            {tagFilter ?? copy.filterByTag}
          </span>
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="min-w-[min(100vw-2rem,20rem)] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={copy.filterByTag}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandGroup>
              <CommandItem asChild>
                <Link
                  href={buildHref(1, statusFilter)}
                  onClick={() => setOpen(false)}
                >
                  {copy.tagFilterAll}
                </Link>
              </CommandItem>
              {tagList.map((t) => (
                <CommandItem key={t.slug} asChild>
                  <Link
                    href={buildHref(1, statusFilter, t.slug)}
                    onClick={() => setOpen(false)}
                  >
                    <span className="font-medium">{t.slug}</span>
                    {t.name !== t.slug && (
                      <span className="ml-2 text-muted-foreground text-xs">
                        {t.name}
                      </span>
                    )}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function DashboardBlogListContent() {
  const dict = useDictionary();
  const copy = dict.pages.dashboard.blog;
  const params = useParams<{ lang: string }>();
  const lang = params.lang;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const trpc = useTRPC();

  const rawPage = Number(searchParams.get("page"));
  const page = rawPage >= 1 ? Math.floor(rawPage) : 1;
  const offset = (page - 1) * PAGE_SIZE;

  const rawStatus = searchParams.get("status");
  const statusFilter: PostStatus | undefined =
    rawStatus && VALID_STATUSES.includes(rawStatus as PostStatus)
      ? (rawStatus as PostStatus)
      : undefined;

  const rawTag = searchParams.get("tag");
  const tagFilter: string | undefined = (() => {
    if (!rawTag?.trim()) return undefined;
    const n = normalizeTagSlug(rawTag);
    return n || undefined;
  })();

  const statusLabels: Record<string, string> = {
    draft: copy.statusDraft,
    published: copy.statusPublished,
    archived: copy.statusArchived,
  };

  const { data, isLoading } = useQuery(
    trpc.blog.list.queryOptions({
      limit: PAGE_SIZE,
      offset,
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(tagFilter ? { tagSlug: tagFilter } : {}),
    }),
  );

  const posts = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    if (!isLoading && total > 0 && page > totalPages) {
      const params = new URLSearchParams();
      params.set("page", String(totalPages));
      if (statusFilter) params.set("status", statusFilter);
      if (tagFilter) params.set("tag", tagFilter);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [
    isLoading,
    total,
    page,
    totalPages,
    pathname,
    router,
    statusFilter,
    tagFilter,
  ]);

  const buildHref = useCallback(
    (p: number, status?: PostStatus, tag?: string) => {
      const params = new URLSearchParams();
      if (p > 1) params.set("page", String(p));
      if (status) params.set("status", status);
      if (tag) params.set("tag", tag);
      const qs = params.toString();
      return qs ? `${pathname}?${qs}` : pathname;
    },
    [pathname],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{copy.title}</h1>
        <Button size="sm" asChild>
          <Link href={`/${lang}/dashboard/blog/new`}>
            <Plus className="size-4 mr-1" />
            {copy.newPost}
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex gap-2 flex-wrap">
          {([undefined, ...VALID_STATUSES] as const).map((s) => {
            const isActive = statusFilter === s;
            const label =
              s === undefined
                ? copy.statusAll
                : statusLabels[s] ?? s;
            return (
              <Button
                key={s ?? "all"}
                variant={isActive ? "default" : "outline"}
                size="sm"
                className="h-8"
                asChild={!isActive}
                disabled={isActive}
              >
                {isActive ? (
                  <span>{label}</span>
                ) : (
                  <Link href={buildHref(1, s, tagFilter)}>{label}</Link>
                )}
              </Button>
            );
          })}
        </div>
        <BlogTagFilter
          copy={{
            filterByTag: copy.filterByTag,
            tagFilterAll: copy.tagFilterAll,
          }}
          tagFilter={tagFilter}
          statusFilter={statusFilter}
          buildHref={buildHref}
        />
      </div>

      {isLoading && (
        <p className="text-muted-foreground text-sm">{copy.loading}</p>
      )}

      {!isLoading && total === 0 && (
        <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
          <p className="mb-4">{copy.empty}</p>
          <Button size="sm" asChild>
            <Link href={`/${lang}/dashboard/blog/new`}>{copy.createFirst}</Link>
          </Button>
        </div>
      )}

      {posts.length > 0 && (
        <>
          <div className="rounded-xl border divide-y">
            {posts.map((post) => (
              <button
                key={post.id}
                type="button"
                onClick={() =>
                  router.push(`/${lang}/dashboard/blog/${post.id}/edit`)
                }
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors"
              >
                <div
                  className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted"
                  aria-hidden={!post.main_image_url}
                >
                  {post.main_image_url ? (
                    <Image
                      src={post.main_image_url}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {post.title || copy.untitled}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {post.slug} &middot;{" "}
                    {new Date(post.updated_at).toLocaleDateString(lang, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Badge variant={STATUS_VARIANTS[post.status] ?? "outline"}>
                  {statusLabels[post.status] ?? post.status}
                </Badge>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {copy.paginationPage} {page} {copy.paginationOf} {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1"
                  disabled={page <= 1}
                  asChild={page > 1}
                >
                  {page > 1 ? (
                    <Link href={buildHref(page - 1, statusFilter, tagFilter)}>
                      <ChevronLeft className="size-4" />
                      {copy.paginationPrevious}
                    </Link>
                  ) : (
                    <>
                      <ChevronLeft className="size-4" />
                      {copy.paginationPrevious}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1"
                  disabled={page >= totalPages}
                  asChild={page < totalPages}
                >
                  {page < totalPages ? (
                    <Link href={buildHref(page + 1, statusFilter, tagFilter)}>
                      {copy.paginationNext}
                      <ChevronRight className="size-4" />
                    </Link>
                  ) : (
                    <>
                      {copy.paginationNext}
                      <ChevronRight className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function DashboardBlogList() {
  return (
    <Suspense
      fallback={
        <p className="text-muted-foreground text-sm py-8">Loading...</p>
      }
    >
      <DashboardBlogListContent />
    </Suspense>
  );
}
