-- ================================================
-- StartupAI Database Schema - Initial Setup
-- Migration 001: Core Tables
-- ================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ================================================
-- ORGANIZATIONS
-- ================================================

create table organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  
  -- Metadata
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table organizations is 'Multi-tenant organizations';

create index idx_orgs_slug on organizations(slug);

-- ================================================
-- PROFILES (User Profiles)
-- ================================================

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  org_id uuid references organizations on delete cascade not null,
  
  -- Basic info
  email text not null,
  full_name text,
  avatar_url text,
  
  -- Role within org
  role text default 'member' check (role in ('admin', 'member', 'viewer')),
  
  -- Metadata
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table profiles is 'User profiles linked to auth.users';

create index idx_profiles_org on profiles(org_id);
create index idx_profiles_email on profiles(email);

-- ================================================
-- PROJECTS
-- ================================================

create table projects (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations on delete cascade not null,
  created_by uuid references profiles on delete set null,
  
  -- Project info
  name text not null,
  description text,
  
  -- Status tracking
  status text default 'active' check (status in ('planning', 'active', 'on_hold', 'completed', 'cancelled')),
  health_score integer check (health_score between 0 and 100),
  
  -- Timeline
  start_date date,
  target_date date,
  completed_date date,
  
  -- AI insights
  ai_summary text,
  ai_risks jsonb default '[]'::jsonb,
  
  -- Metadata
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table projects is 'Startup projects and initiatives';

create index idx_projects_org on projects(org_id);
create index idx_projects_status on projects(org_id, status);
create index idx_projects_target_date on projects(target_date) where status = 'active';

-- ================================================
-- TASKS
-- ================================================

create table tasks (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations on delete cascade not null,
  created_by uuid references profiles on delete set null,
  assigned_to uuid references profiles on delete set null,
  
  -- Core fields
  title text not null,
  description text,
  status text default 'backlog' check (status in ('backlog', 'in_progress', 'review', 'completed', 'cancelled')),
  priority text default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  
  -- Workflow metadata
  category text, -- startup, event, marketing, sales, product, hiring, fundraising, ops
  phase integer check (phase between 1 and 5), -- 5-step workflow system
  
  -- Relationships
  project_id uuid references projects on delete set null,
  parent_task_id uuid references tasks on delete set null, -- for subtasks
  
  -- AI metadata
  ai_generated boolean default false,
  ai_suggested boolean default false,
  ai_priority_score integer,
  ai_context jsonb,
  
  -- Dates
  due_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  
  -- Metadata
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table tasks is 'Tasks with 5-step workflow support';

-- Critical indexes for dashboard performance
create index idx_tasks_org_status on tasks(org_id, status);
create index idx_tasks_org_priority on tasks(org_id, priority, due_at);
create index idx_tasks_org_assigned on tasks(org_id, assigned_to);
create index idx_tasks_project on tasks(project_id);
create index idx_tasks_due_soon on tasks(due_at) where status != 'completed' and due_at is not null;
create index idx_tasks_parent on tasks(parent_task_id);

-- ================================================
-- CRM CONTACTS
-- ================================================

create table crm_contacts (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations on delete cascade not null,
  created_by uuid references profiles on delete set null,
  
  -- Basic info
  full_name text not null,
  email text,
  phone text,
  company text,
  title text,
  
  -- Social
  linkedin_url text,
  twitter_url text,
  
  -- Categorization
  type text default 'investor' check (type in ('investor', 'customer', 'advisor', 'partner', 'candidate', 'other')),
  tags text[] default '{}'::text[],
  
  -- AI enrichment
  ai_enriched boolean default false,
  ai_summary text,
  ai_metadata jsonb,
  
  -- Engagement tracking
  last_contact_at timestamptz,
  next_followup_at timestamptz,
  contact_frequency text, -- weekly, biweekly, monthly, quarterly
  
  -- Notes
  notes text,
  
  -- Metadata
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table crm_contacts is 'CRM contacts (investors, customers, advisors)';

create index idx_contacts_org on crm_contacts(org_id);
create index idx_contacts_type on crm_contacts(org_id, type);
create index idx_contacts_email on crm_contacts(email);
create index idx_contacts_company on crm_contacts(company);
create index idx_contacts_next_followup on crm_contacts(next_followup_at) where next_followup_at is not null;

-- ================================================
-- CRM DEALS (Pipeline)
-- ================================================

create table crm_deals (
  id uuid primary key default uuid_generate_v4(),
  org_id uuid references organizations on delete cascade not null,
  contact_id uuid references crm_contacts on delete set null,
  created_by uuid references profiles on delete set null,
  
  -- Deal info
  title text not null,
  amount numeric(12, 2),
  currency text default 'USD',
  
  -- Pipeline stage
  stage text default 'initial_contact' check (stage in (
    'initial_contact',
    'meeting_scheduled',
    'pitch_sent',
    'due_diligence',
    'term_sheet',
    'closing',
    'won',
    'lost'
  )),
  probability integer check (probability between 0 and 100) default 50,
  
  -- Dates
  expected_close_at date,
  actual_close_at date,
  last_touch_at timestamptz,
  
  -- Loss/Win tracking
  lost_reason text,
  won_details text,
  
  -- AI insights
  ai_risk_score integer check (ai_risk_score between 0 and 100),
  ai_suggestions jsonb default '[]'::jsonb,
  ai_next_action text,
  
  -- Notes
  notes text,
  
  -- Metadata
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table crm_deals is 'Investment and sales pipeline';

create index idx_deals_org_stage on crm_deals(org_id, stage);
create index idx_deals_contact on crm_deals(contact_id);
create index idx_deals_close_date on crm_deals(expected_close_at);
create index idx_deals_last_touch on crm_deals(last_touch_at);
create index idx_deals_active on crm_deals(org_id) where stage not in ('won', 'lost');

-- ================================================
-- DEAL ACTIVITIES (for tracking interactions)
-- ================================================

create table crm_deal_activities (
  id uuid primary key default uuid_generate_v4(),
  deal_id uuid references crm_deals on delete cascade not null,
  org_id uuid references organizations on delete cascade not null,
  created_by uuid references profiles on delete set null,
  
  -- Activity info
  type text not null check (type in ('call', 'email', 'meeting', 'note', 'pitch', 'follow_up', 'other')),
  subject text,
  description text,
  
  -- Outcome
  outcome text, -- positive, neutral, negative
  
  -- Next action
  next_action text,
  next_action_due timestamptz,
  
  -- Metadata
  created_at timestamptz default now() not null
);

comment on table crm_deal_activities is 'Activity log for deals';

create index idx_deal_activities_deal on crm_deal_activities(deal_id);
create index idx_deal_activities_org on crm_deal_activities(org_id);
create index idx_deal_activities_created on crm_deal_activities(created_at desc);

-- ================================================
-- TRIGGERS: Auto-update timestamps
-- ================================================

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on organizations
  for each row execute function update_updated_at();

create trigger set_updated_at before update on profiles
  for each row execute function update_updated_at();

create trigger set_updated_at before update on projects
  for each row execute function update_updated_at();

create trigger set_updated_at before update on tasks
  for each row execute function update_updated_at();

create trigger set_updated_at before update on crm_contacts
  for each row execute function update_updated_at();

create trigger set_updated_at before update on crm_deals
  for each row execute function update_updated_at();

-- ================================================
-- MIGRATION COMPLETE
-- ================================================

comment on schema public is 'StartupAI schema v001 - Initial tables created';
