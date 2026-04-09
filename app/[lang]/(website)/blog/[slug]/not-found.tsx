import Link from "next/link";

export default function BlogPostNotFound() {
  return (
    <div className="py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">Post not found</h1>
      <p className="text-muted-foreground mb-8">
        The post you are looking for does not exist or has been removed.
      </p>
      <Link
        href="/"
        className="text-sm text-primary underline hover:text-primary/80"
      >
        &larr; Back to blog
      </Link>
    </div>
  );
}
