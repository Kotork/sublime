"use client";

import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

const STATUS_VARIANTS: Record<
  string,
  "default" | "secondary" | "outline" | "warning"
> = {
  draft: "outline",
  published: "default",
  archived: "secondary",
};

export default function DashboardBlogList() {
  const dict = useDictionary();
  const copy = dict.pages.dashboard.blog;
  const params = useParams<{ lang: string }>();
  const lang = params.lang;
  const router = useRouter();
  const trpc = useTRPC();

  const statusLabels: Record<string, string> = {
    draft: copy.statusDraft,
    published: copy.statusPublished,
    archived: copy.statusArchived,
  };

  const { data: posts, isLoading } = useQuery(
    trpc.blog.list.queryOptions({ limit: 100, offset: 0 }),
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

      {isLoading && (
        <p className="text-muted-foreground text-sm">{copy.loading}</p>
      )}

      {!isLoading && (!posts || posts.length === 0) && (
        <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
          <p className="mb-4">{copy.empty}</p>
          <Button size="sm" asChild>
            <Link href={`/${lang}/dashboard/blog/new`}>{copy.createFirst}</Link>
          </Button>
        </div>
      )}

      {posts && posts.length > 0 && (
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
      )}
    </div>
  );
}
