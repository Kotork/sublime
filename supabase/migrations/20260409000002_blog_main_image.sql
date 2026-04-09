-- Main image for listings, hero, and social sharing (public URL from blog-images bucket)

alter table public.blog_posts
  add column if not exists main_image_url text;

comment on column public.blog_posts.main_image_url is
  'Cover image URL (Supabase Storage public URL) for listings, hero, and OG/Twitter cards';
