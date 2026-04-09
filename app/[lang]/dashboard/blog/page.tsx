"use client";

import { Suspense, useEffect } from "react";
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
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

const PAGE_SIZE = 10;

const STATUS_VARIANTS: Record<
  string,
  "default" | "secondary" | "outline" | "warning"
> = {
  draft: "outline",
  published: "default",
  archived: "secondary",
};

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

  const statusLabels: Record<string, string> = {
    draft: copy.statusDraft,
    published: copy.statusPublished,
    archived: copy.statusArchived,
  };

  const { data, isLoading } = useQuery(
    trpc.blog.list.queryOptions({ limit: PAGE_SIZE, offset }),
  );

  const posts = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    if (!isLoading && total > 0 && page > totalPages) {
      router.replace(`${pathname}?page=${totalPages}`);
    }
  }, [isLoading, total, page, totalPages, pathname, router]);

  function pageHref(p: number) {
    return `${pathname}?page=${p}`;
  }

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
                    <Link href={pageHref(page - 1)}>
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
                    <Link href={pageHref(page + 1)}>
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
