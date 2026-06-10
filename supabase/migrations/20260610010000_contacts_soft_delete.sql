-- Soft delete for contacts: keep the row (and its form_submissions) but hide it
-- from the CRM and free its unique phone/email so future submissions create a
-- fresh contact. submit_form_submission() must therefore ignore soft-deleted
-- contacts when resolving by phone/email.

alter table public.contacts
  add column deleted_at timestamptz;

-- List queries fetch active contacts ordered by recency.
create index contacts_active_created_at_idx
  on public.contacts (created_at desc)
  where deleted_at is null;

-- Recreate the submit RPC so contact lookups skip soft-deleted rows. Only the
-- two lookup queries change (added `deleted_at is null`); the rest is unchanged.
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

  -- Lookup by phone, then email. Soft-deleted contacts are ignored so their
  -- freed phone/email can be reused by a brand-new contact.
  if v_phone is not null then
    select id into v_phone_id from public.contacts
      where phone = v_phone and deleted_at is null limit 1;
  end if;
  if v_email is not null then
    select id into v_email_id from public.contacts
      where email = v_email and deleted_at is null limit 1;
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
