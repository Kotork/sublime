-- Blog feature: posts, tags, and junction table

-- Status enum
create type public.blog_post_status as enum ('draft', 'published', 'archived');

-- Posts
create table public.blog_posts (
  id          uuid primary key default gen_random_uuid(),
  locale      text not null default 'en',
  slug        text not null,
  title       text not null default '',
  excerpt     text,
  body        jsonb not null default '{}'::jsonb,
  status      public.blog_post_status not null default 'draft',
  published_at timestamptz,
  author_id   uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  constraint blog_posts_locale_slug_unique unique (locale, slug)
);

create index blog_posts_listing_idx
  on public.blog_posts (locale, status, published_at desc);

-- Tags
create table public.tags (
  id   uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null default ''
);

-- Junction
create table public.blog_post_tags (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id  uuid not null references public.tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create index blog_post_tags_tag_idx on public.blog_post_tags (tag_id);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();

-- RLS ----------------------------------------------------------------

alter table public.blog_posts enable row level security;
alter table public.tags enable row level security;
alter table public.blog_post_tags enable row level security;

-- blog_posts: anyone can read published
create policy "Public can read published posts"
  on public.blog_posts for select
  using (status = 'published');

-- blog_posts: authenticated users can do everything
create policy "Authenticated users manage posts"
  on public.blog_posts for all
  to authenticated
  using (true)
  with check (true);

-- tags: anyone can read
create policy "Public can read tags"
  on public.tags for select
  using (true);

-- tags: authenticated users can insert/update
create policy "Authenticated users manage tags"
  on public.tags for all
  to authenticated
  using (true)
  with check (true);

-- blog_post_tags: anyone can read
create policy "Public can read post tags"
  on public.blog_post_tags for select
  using (true);

-- blog_post_tags: authenticated users can manage
create policy "Authenticated users manage post tags"
  on public.blog_post_tags for all
  to authenticated
  using (true)
  with check (true);
