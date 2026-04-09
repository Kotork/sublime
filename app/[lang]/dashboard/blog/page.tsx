"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

const STATUS_VARIANTS: Record<
  string,
  "default" | "secondary" | "outline" | "warning"
> = {
  draft: "outline",
  published: "default",
  archived: "secondary",
};

export default function DashboardBlogList() {
  const params = useParams<{ lang: string }>();
  const lang = params.lang;
  const router = useRouter();
  const trpc = useTRPC();

  const { data: posts, isLoading } = useQuery(
    trpc.blog.list.queryOptions({ limit: 100, offset: 0 }),
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog posts</h1>
        <Button size="sm" asChild>
          <Link href={`/${lang}/dashboard/blog/new`}>
            <Plus className="size-4 mr-1" />
            New post
          </Link>
        </Button>
      </div>

      {isLoading && (
        <p className="text-muted-foreground text-sm">Loading posts...</p>
      )}

      {!isLoading && (!posts || posts.length === 0) && (
        <div className="rounded-xl border bg-card p-12 text-center text-muted-foreground">
          <p className="mb-4">No blog posts yet.</p>
          <Button size="sm" asChild>
            <Link href={`/${lang}/dashboard/blog/new`}>Create your first post</Link>
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
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {post.title || "Untitled"}
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
                {STATUS_LABELS[post.status] ?? post.status}
              </Badge>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
