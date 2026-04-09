"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { BlogPostForm } from "@/components/blog/blog-post-form";
import type { SerializedEditorState } from "lexical";

export default function EditBlogPostPage() {
  const params = useParams<{ lang: string; id: string }>();
  const trpc = useTRPC();

  const { data: post, isLoading } = useQuery(
    trpc.blog.getById.queryOptions({ id: params.id }),
  );

  if (isLoading) {
    return <p className="text-muted-foreground text-sm py-8">Loading...</p>;
  }

  if (!post) {
    return <p className="text-muted-foreground text-sm py-8">Post not found.</p>;
  }

  return (
    <BlogPostForm
      lang={params.lang}
      postId={post.id}
      initial={{
        locale: post.locale,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        body: post.body as unknown as SerializedEditorState,
        tags: post.tags,
        status: post.status,
      }}
    />
  );
}
