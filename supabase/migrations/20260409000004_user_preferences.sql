-- Per-user UI preferences (locale, theme) for cross-device sync.

create table public.user_preferences (
  user_id uuid primary key references auth.users (id) on delete cascade,
  locale text not null,
  theme text not null,
  updated_at timestamptz not null default now(),
  constraint user_preferences_locale_check check (locale in ('en', 'pt')),
  constraint user_preferences_theme_check check (theme in ('light', 'dark', 'system'))
);

create index user_preferences_updated_at_idx on public.user_preferences (updated_at desc);

alter table public.user_preferences enable row level security;

create policy "Users can read own preferences"
  on public.user_preferences for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own preferences"
  on public.user_preferences for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update own preferences"
  on public.user_preferences for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create trigger user_preferences_updated_at
  before update on public.user_preferences
  for each row execute function public.set_updated_at();
