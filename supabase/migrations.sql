-- ============================================================
-- Run this entire file in your Supabase SQL Editor
-- (Project → SQL Editor → New query → paste → Run)
-- ============================================================


-- ─────────────────────────────────────────────────────────────
-- 1. PROFILES
-- ─────────────────────────────────────────────────────────────
create table if not exists profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  name          text,
  email         text,
  whatsapp      text,
  university    text,
  branch        text,
  year          text,
  referral_code text,
  created_at    timestamptz default now()
);

alter table profiles enable row level security;

drop policy if exists "profiles_select_own" on profiles;
drop policy if exists "profiles_update_own" on profiles;
drop policy if exists "profiles_insert_own" on profiles;

create policy "profiles_select_own"  on profiles for select  using (auth.uid() = id);
create policy "profiles_insert_own"  on profiles for insert  with check (auth.uid() = id);
create policy "profiles_update_own"  on profiles for update  using (auth.uid() = id);


-- ─────────────────────────────────────────────────────────────
-- 2. ASSIGNMENTS
-- ─────────────────────────────────────────────────────────────
create table if not exists assignments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  title       text not null,
  subject     text,
  description text,
  deadline    date,
  -- status lifecycle:
  -- "Pending Payment" → student submitted, awaiting payment
  -- "Pending"         → paid, under expert review
  -- "In Progress"     → expert solving
  -- "Completed"       → solution ready
  status      text default 'Pending Payment',
  created_at  timestamptz default now()
);

alter table assignments enable row level security;

drop policy if exists "assignments_select_own" on assignments;
drop policy if exists "assignments_insert_own" on assignments;
drop policy if exists "assignments_update_own" on assignments;

create policy "assignments_select_own" on assignments for select using (auth.uid() = user_id);
create policy "assignments_insert_own" on assignments for insert with check (auth.uid() = user_id);
-- students can only update their own; status changes from backend use service role
create policy "assignments_update_own" on assignments for update using (auth.uid() = user_id);


-- ─────────────────────────────────────────────────────────────
-- 3. FILES  (attachments uploaded with an assignment)
-- ─────────────────────────────────────────────────────────────
create table if not exists files (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid references assignments(id) on delete cascade,
  file_name    text,
  file_url     text,
  created_at   timestamptz default now()
);

alter table files enable row level security;

drop policy if exists "files_select_own" on files;
drop policy if exists "files_insert_own" on files;

create policy "files_select_own" on files for select
  using (
    exists (
      select 1 from assignments a
      where a.id = files.project_id and a.user_id = auth.uid()
    )
  );

create policy "files_insert_own" on files for insert
  with check (
    exists (
      select 1 from assignments a
      where a.id = files.project_id and a.user_id = auth.uid()
    )
  );


-- ─────────────────────────────────────────────────────────────
-- 4. PAYMENTS
-- ─────────────────────────────────────────────────────────────
create table if not exists payments (
  id                   uuid primary key default gen_random_uuid(),
  user_id              uuid references auth.users(id) on delete cascade,
  assignment_id        uuid references assignments(id) on delete set null,
  razorpay_order_id    text unique,
  razorpay_payment_id  text,
  razorpay_signature   text,
  amount               integer,          -- in paise (₹1 = 100 paise)
  status               text default 'pending', -- pending | paid | failed
  created_at           timestamptz default now()
);

alter table payments enable row level security;

drop policy if exists "payments_select_own" on payments;
drop policy if exists "payments_insert_own" on payments;

create policy "payments_select_own" on payments for select using (auth.uid() = user_id);
-- insert is done by backend service role; no insert RLS needed for students


-- ─────────────────────────────────────────────────────────────
-- 5. STORAGE BUCKET  (run separately if bucket doesn't exist)
-- ─────────────────────────────────────────────────────────────
-- Create a public bucket named "assignments" in:
-- Supabase Dashboard → Storage → New Bucket → name: assignments → Public: ON
-- Then add this policy in Storage → assignments → Policies:
--
--   Policy: "Allow authenticated uploads"
--   For INSERT, using: (auth.role() = 'authenticated')
