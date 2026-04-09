"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LexicalRenderer } from "@/components/blog/lexical-renderer";
import { Badge } from "@/ui/badge";
import type { SerializedEditorState } from "lexical";

export default function PreviewBlogPostPage() {
  const params = useParams<{ lang: string; id: string }>();
  const trpc = useTRPC();

  const { data: post, isLoading } = useQuery(
    trpc.blog.getById.queryOptions({ id: params.id })
  );

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
