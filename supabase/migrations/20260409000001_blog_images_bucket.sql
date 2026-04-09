-- Blog images storage bucket

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Anyone can read images (public bucket)
create policy "Public read blog images"
  on storage.objects for select
  using (bucket_id = 'blog-images');

-- Authenticated users can upload images
create policy "Authenticated users upload blog images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog-images');

-- Authenticated users can delete their own uploads
create policy "Authenticated users delete own blog images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog-images' and (storage.foldername(name))[1] = auth.uid()::text);
