-- Form submission persistence: contacts + form_submissions, plus an atomic
-- submit_form_submission() RPC that resolves/merges the contact and records
-- the submission in a single transaction.

-- Enums --------------------------------------------------------------

create type public.form_type as enum ('quote', 'newsletter', 'partnership', 'contact');

create type public.submission_state as enum ('pending', 'done');

-- Contacts -----------------------------------------------------------
-- A person. phone and email are unique (nullable until provided);
-- nif is intentionally NOT unique. consent is set once and never overwritten.

create table public.contacts (
  id         uuid primary key default gen_random_uuid(),
  name       text,
  phone      text unique,
  email      text unique,
  nif        text,
  company    text,
  consent    timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger contacts_updated_at
  before update on public.contacts
  for each row execute function public.set_updated_at();

-- Form submissions ---------------------------------------------------

create table public.form_submissions (
  id         uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.contacts (id) on delete restrict,
  form_type  public.form_type not null,
  state      public.submission_state not null default 'pending',
  subject    text,
  message    text,
  location   text,
  origin     text not null,
  created_at timestamptz not null default now()
);

create index form_submissions_contact_id_idx
  on public.form_submissions (contact_id);

create index form_submissions_form_type_created_at_idx
  on public.form_submissions (form_type, created_at desc);

create index form_submissions_state_created_at_idx
  on public.form_submissions (state, created_at desc);

-- RLS ----------------------------------------------------------------
-- Enable RLS with no anon/authenticated policies. All writes go through
-- the SECURITY DEFINER RPC below, called by the Next.js server with the
-- service_role key. Read policies are deferred until the dashboard exists.

alter table public.contacts enable row level security;
alter table public.form_submissions enable row level security;

-- Atomic submit RPC --------------------------------------------------
-- Resolves the contact (match on phone OR email; on conflict prefer the
-- phone match and merge the email-matched duplicate), fills only empty
-- contact fields, sets consent once, then inserts the submission.

create or replace function public.submit_form_submission(
  p_form_type public.form_type,
  p_name      text,
  p_phone     text,
  p_email     text,
  p_nif       text,
  p_company   text,
  p_subject   text,
  p_message   text,
  p_location  text,
  p_origin    text
)
returns table (submission_id uuid, contact_id uuid)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name     text := nullif(btrim(p_name), '');
  v_phone    text := nullif(btrim(p_phone), '');
  v_email    text := lower(nullif(btrim(p_email), ''));
  v_nif      text := nullif(btrim(p_nif), '');
  v_company  text := nullif(btrim(p_company), '');
  v_subject  text := nullif(btrim(p_subject), '');
  v_message  text := nullif(btrim(p_message), '');
  v_location text := nullif(btrim(p_location), '');
  v_origin   text := nullif(btrim(p_origin), '');
  v_phone_id uuid;
  v_email_id uuid;
  v_survivor uuid;
  v_loser    uuid;
  v_loser_row public.contacts%rowtype;
  v_submission_id uuid;
begin
  if v_origin is null then
    raise exception 'origin is required';
  end if;

  -- Lookup by phone, then email.
  if v_phone is not null then
    select id into v_phone_id from public.contacts where phone = v_phone limit 1;
  end if;
  if v_email is not null then
    select id into v_email_id from public.contacts where email = v_email limit 1;
  end if;

  -- Decide survivor (and any loser to merge), preferring the phone match.
  if v_phone_id is not null and v_email_id is not null then
    v_survivor := v_phone_id;
    if v_phone_id <> v_email_id then
      v_loser := v_email_id;
    end if;
  elsif v_phone_id is not null then
    v_survivor := v_phone_id;
  elsif v_email_id is not null then
    v_survivor := v_email_id;
  end if;

  if v_survivor is null then
    -- No match: create a new contact with consent set now.
    insert into public.contacts (name, phone, email, nif, company, consent)
    values (v_name, v_phone, v_email, v_nif, v_company, now())
    returning id into v_survivor;
  else
    -- Conflict: merge the email-matched loser into the phone-matched survivor.
    -- Delete the loser first to free its UNIQUE phone/email before copying.
    if v_loser is not null then
      select * into v_loser_row from public.contacts where id = v_loser;

      update public.form_submissions as fs
        set contact_id = v_survivor
        where fs.contact_id = v_loser;

      delete from public.contacts where id = v_loser;

      update public.contacts set
        name    = coalesce(name, v_loser_row.name),
        phone   = coalesce(phone, v_loser_row.phone),
        email   = coalesce(email, v_loser_row.email),
        nif     = coalesce(nif, v_loser_row.nif),
        company = coalesce(company, v_loser_row.company),
        consent = coalesce(consent, v_loser_row.consent)
      where id = v_survivor;
    end if;

    -- Fill only empty fields from the incoming submission; set consent once.
    update public.contacts set
      name    = coalesce(name, v_name),
      phone   = coalesce(phone, v_phone),
      email   = coalesce(email, v_email),
      nif     = coalesce(nif, v_nif),
      company = coalesce(company, v_company),
      consent = coalesce(consent, now())
    where id = v_survivor;
  end if;

  insert into public.form_submissions
    (contact_id, form_type, state, subject, message, location, origin)
  values
    (v_survivor, p_form_type, 'pending', v_subject, v_message, v_location, v_origin)
  returning id into v_submission_id;

  submission_id := v_submission_id;
  contact_id := v_survivor;
  return next;
end;
$$;

revoke all on function public.submit_form_submission(
  public.form_type, text, text, text, text, text, text, text, text, text
) from public;
revoke all on function public.submit_form_submission(
  public.form_type, text, text, text, text, text, text, text, text, text
) from anon;
revoke all on function public.submit_form_submission(
  public.form_type, text, text, text, text, text, text, text, text, text
) from authenticated;
grant execute on function public.submit_form_submission(
  public.form_type, text, text, text, text, text, text, text, text, text
) to service_role;
