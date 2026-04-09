-- Desktop sidebar width/hover preference (synced across devices).

alter table public.user_preferences
  add column sidebar_behavior text not null default 'expand_on_hover';

alter table public.user_preferences
  add constraint user_preferences_sidebar_behavior_check
  check (sidebar_behavior in ('expanded', 'collapsed', 'expand_on_hover'));
