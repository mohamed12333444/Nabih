create extension if not exists "pgcrypto";

create type public.task_status as enum ('pending', 'in_progress', 'completed', 'archived');
create type public.task_priority as enum ('low', 'medium', 'high', 'urgent');
create type public.task_source as enum ('typed', 'voice', 'upload', 'ai');
create type public.reminder_status as enum ('scheduled', 'sent', 'failed', 'canceled');
create type public.notification_channel as enum ('whatsapp', 'telegram', 'email', 'push');
create type public.subscription_plan as enum ('free', 'pro', 'business');
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'canceled');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  locale text not null default 'ar-EG',
  timezone text not null default 'Africa/Cairo',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  status public.task_status not null default 'pending',
  priority public.task_priority not null default 'medium',
  source public.task_source not null default 'typed',
  due_at timestamptz,
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.reminders (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  remind_at timestamptz not null,
  channel public.notification_channel not null default 'push',
  status public.reminder_status not null default 'scheduled',
  provider_message_id text,
  failure_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.ai_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  provider text not null,
  model text not null,
  operation text not null,
  request jsonb not null default '{}'::jsonb,
  response jsonb not null default '{}'::jsonb,
  error text,
  created_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.uploaded_voice_files (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  storage_bucket text not null,
  storage_path text not null,
  original_name text not null,
  mime_type text not null,
  size_bytes bigint not null,
  transcript text,
  language text,
  duration_seconds numeric,
  created_task_id uuid references public.tasks(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  plan public.subscription_plan not null default 'free',
  status public.subscription_status not null default 'active',
  provider text,
  provider_customer_id text,
  provider_subscription_id text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index idx_tasks_user_status_due on public.tasks(user_id, status, due_at) where deleted_at is null;
create index idx_reminders_due_status on public.reminders(remind_at, status) where deleted_at is null;
create index idx_ai_logs_user_created on public.ai_logs(user_id, created_at desc) where deleted_at is null;
create index idx_voice_files_user_created on public.uploaded_voice_files(user_id, created_at desc) where deleted_at is null;
create index idx_subscriptions_user_status on public.subscriptions(user_id, status) where deleted_at is null;

alter table public.profiles enable row level security;
alter table public.tasks enable row level security;
alter table public.reminders enable row level security;
alter table public.ai_logs enable row level security;
alter table public.uploaded_voice_files enable row level security;
alter table public.subscriptions enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id and deleted_at is null);
create policy "tasks_select_own" on public.tasks for select using (auth.uid() = user_id and deleted_at is null);
create policy "tasks_insert_own" on public.tasks for insert with check (auth.uid() = user_id);
create policy "reminders_select_own" on public.reminders for select using (auth.uid() = user_id and deleted_at is null);
create policy "subscriptions_select_own" on public.subscriptions for select using (auth.uid() = user_id and deleted_at is null);
