-- Returns storage usage metrics for the dashboard usage banner.
-- Callable only via service_role (Next.js server with SUPABASE_SERVICE_ROLE_KEY).

create or replace function public.get_dashboard_storage_metrics()
returns jsonb
language sql
stable
security definer
set search_path = public, storage
as $$
  select jsonb_build_object(
    'file_storage_bytes',
    coalesce(
      (select sum((metadata->>'size')::bigint) from storage.objects),
      0
    ),
    'database_bytes',
    pg_database_size(current_database())
  );
$$;

revoke all on function public.get_dashboard_storage_metrics() from public;
revoke all on function public.get_dashboard_storage_metrics() from anon;
revoke all on function public.get_dashboard_storage_metrics() from authenticated;
grant execute on function public.get_dashboard_storage_metrics() to service_role;
