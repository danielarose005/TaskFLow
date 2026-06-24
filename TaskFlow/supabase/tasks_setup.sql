create extension if not exists "pgcrypto";

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  completed boolean not null default false,
  created_at timestamp not null default now()
);

alter table public.tasks enable row level security;

drop policy if exists "Allow anonymous task reads" on public.tasks;
drop policy if exists "Allow anonymous task inserts" on public.tasks;
drop policy if exists "Allow anonymous task updates" on public.tasks;
drop policy if exists "Allow anonymous task deletes" on public.tasks;

create policy "Allow anonymous task reads"
on public.tasks
for select
to anon
using (true);

create policy "Allow anonymous task inserts"
on public.tasks
for insert
to anon
with check (true);

create policy "Allow anonymous task updates"
on public.tasks
for update
to anon
using (true)
with check (true);

create policy "Allow anonymous task deletes"
on public.tasks
for delete
to anon
using (true);
