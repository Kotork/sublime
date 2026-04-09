"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type { SerializedEditorState } from "lexical";
import { toast } from "sonner";

import { useDictionary } from "@/lib/client/providers/dictionary-provider";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { LexicalEditor } from "./lexical-editor";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Badge } from "@/ui/badge";
import { ArrowLeft, X } from "lucide-react";

type BlogPostFormProps = {
  lang: string;
  postId?: string;
  initial?: {
    locale: string;
    slug: string;
    title: string;
    excerpt: string | null;
    body: SerializedEditorState;
    tags: string[];
    status: string;
  };
};

export function BlogPostForm({ lang, postId, initial }: BlogPostFormProps) {
  const router = useRouter();
  const trpc = useTRPC();

  const dictionary = useDictionary();
  const dict = dictionary.pages.dashboard.blog;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [body, setBody] = useState<SerializedEditorState | null>(
    initial?.body ?? null,
  );
  const [tags, setTags] = useState<string[]>(initial?.tags ?? []);
  const [tagInput, setTagInput] = useState("");

  const isEdit = Boolean(postId);

  const createMutation = useMutation(
    trpc.blog.create.mutationOptions({
      onSuccess: (data) => {
        toast.success(dict.toastCreated);
        router.push(`/${lang}/dashboard/blog/${data.id}/edit`);
      },
      onError: (err) => toast.error(err.message),
    }),
  );

  const updateMutation = useMutation(
    trpc.blog.update.mutationOptions({
      onSuccess: () => toast.success(dict.toastSaved),
      onError: (err) => toast.error(err.message),
    }),
  );

  const publishMutation = useMutation(
    trpc.blog.publish.mutationOptions({
      onSuccess: () => {
        toast.success(dict.toastPublished);
        router.refresh();
      },
      onError: (err) => toast.error(err.message),
    }),
  );

  const archiveMutation = useMutation(
    trpc.blog.archive.mutationOptions({
      onSuccess: () => {
        toast.success(dict.toastArchived);
        router.push(`/${lang}/dashboard/blog`);
      },
      onError: (err) => toast.error(err.message),
    }),
  );

  const isSaving =
    createMutation.isPending ||
    updateMutation.isPending ||
    publishMutation.isPending ||
    archiveMutation.isPending;

  const handleSave = useCallback(() => {
    if (!body) return;
    if (isEdit && postId) {
      updateMutation.mutate({
        id: postId,
        title,
        slug,
        excerpt: excerpt || null,
        body: body as unknown as Record<string, unknown>,
        locale: lang,
        tags,
      });
    } else {
      createMutation.mutate({
        title,
        slug,
        excerpt: excerpt || undefined,
        body: body as unknown as Record<string, unknown>,
        locale: lang,
        tags,
      });
    }
  }, [
    body,
    isEdit,
    postId,
    title,
    slug,
    excerpt,
    lang,
    tags,
    createMutation,
    updateMutation,
  ]);

  const handlePublish = useCallback(() => {
    if (!postId) return;
    publishMutation.mutate({ id: postId });
  }, [postId, publishMutation]);

  const handleArchive = useCallback(() => {
    if (!postId) return;
    archiveMutation.mutate({ id: postId });
  }, [postId, archiveMutation]);

  const addTag = useCallback(() => {
    const value = tagInput.trim().toLowerCase();
    if (value && !tags.includes(value)) {
      setTags((prev) => [...prev, value]);
    }
    setTagInput("");
  }, [tagInput, tags]);

  const removeTag = useCallback((tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const autoSlug = useCallback(() => {
    if (!slug && title) {
      setSlug(
        title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      );
    }
  }, [slug, title]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="-ml-2 h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-4" aria-hidden />
            {dict.back}
          </Button>
          <h1 className="text-2xl font-bold">
            {isEdit ? dict.editPost : dict.newPost}
          </h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          {isEdit && initial?.status !== "published" && (
            <Button
              variant="outline"
              size="sm"
              onClick={handlePublish}
              disabled={isSaving}
            >
              {dict.publish}
            </Button>
          )}
          {isEdit && postId && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={`/${lang}/dashboard/blog/${postId}/preview`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.preview}
              </a>
            </Button>
          )}
          {isEdit && initial?.status !== "archived" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleArchive}
              disabled={isSaving}
            >
              {dict.archive}
            </Button>
          )}
          <Button size="sm" onClick={handleSave} disabled={isSaving || !title || !slug}>
            {isSaving ? dict.saving : dict.saveDraft}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">{dict.fieldTitle}</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={autoSlug}
            placeholder={dict.placeholderTitle}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">{dict.fieldSlug}</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={dict.placeholderSlug}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">{dict.fieldExcerpt}</Label>
        <Input
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder={dict.placeholderExcerpt}
        />
      </div>

      <div className="space-y-2">
        <Label>{dict.fieldTags}</Label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder={dict.placeholderTag}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <Button type="button" variant="outline" size="sm" onClick={addTag}>
            {dict.addTag}
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-0.5 hover:text-destructive"
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label>{dict.fieldContent}</Label>
        <LexicalEditor
          initialContent={initial?.body}
          onChange={setBody}
        />
      </div>
    </div>
  );
}
