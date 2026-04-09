"use client";

import { useParams } from "next/navigation";
import { BlogPostForm } from "@/components/blog/blog-post-form";

export default function NewBlogPostPage() {
  const params = useParams<{ lang: string }>();
  return <BlogPostForm lang={params.lang} />;
}
