"use client";

import { Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LexicalRenderer } from "@/components/blog/lexical-renderer";
import { Badge } from "@/ui/badge";
import type { SerializedEditorState } from "lexical";

function allowlistedHttpsImageUrl(raw: string | null | undefined): string | null {
  if (!raw?.trim()) return null;
  try {
    const u = new URL(raw.trim());
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return u.href;
  } catch {
    return null;
  }
}

function PreviewBlogPostContent() {
  const params = useParams<{ lang: string; id: string }>();
  const searchParams = useSearchParams();
  const trpc = useTRPC();

  const queryImageUrl = allowlistedHttpsImageUrl(searchParams.get("main_image"));

  const { data: post, isLoading } = useQuery(
    trpc.blog.getById.queryOptions({ id: params.id }),
  );

  const imageUrl =
    queryImageUrl ?? allowlistedHttpsImageUrl(post?.main_image_url ?? null);

  if (isLoading) {
    return <p className="text-muted-foreground text-sm py-8">Loading...</p>;
  }

  if (!post) {
    return (
      <p className="text-muted-foreground text-sm py-8">Post not found.</p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      {post.status !== "published" && (
        <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
          Preview &mdash; this post is not published yet.
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{post.title}</h1>
        {imageUrl && (
          <div className="relative mb-6 w-full overflow-hidden rounded-xl bg-muted aspect-video">
            {/* eslint-disable-next-line @next/next/no-img-element -- reliable preview for any https image URL (incl. unsaved query override) */}
            <img
              src={imageUrl}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
          <Badge variant={post.status === "published" ? "default" : "outline"}>
            {post.status}
          </Badge>
          {post.published_at && (
            <time dateTime={post.published_at}>
              {new Date(post.published_at).toLocaleDateString(params.lang, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {post.tags.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </header>

      <LexicalRenderer
        content={post.body as unknown as SerializedEditorState}
      />
    </div>
  );
}

export default function PreviewBlogPostPage() {
  return (
    <Suspense
      fallback={
        <p className="text-muted-foreground text-sm py-8">Loading...</p>
      }
    >
      <PreviewBlogPostContent />
    </Suspense>
  );
}
