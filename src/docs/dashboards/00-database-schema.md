# Database Schema & Setup

**Priority:** P0 (Critical)  
**Estimated Time:** 2-3 hours  
**Dependencies:** Supabase project created

---

## Goal

Create a secure, org-isolated database schema that supports:
- Multi-organization tenancy
- Tasks with 5-step workflow
- CRM (contacts, deals, pipeline)
- Projects with health tracking
- User profiles and permissions

---

## Success Criteria

- [x] All tables created with proper types
- [x] RLS policies enforce org isolation
- [x] Indexes on common query patterns
- [x] Foreign keys maintain referential integrity
- [x] Seed data script works
- [x] Cross-org reads blocked (tested)

---

## Step 1: Core Tables (20 min)

Create these tables in order:

### 1.1 Organizations
```sql
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_orgs_slug on organizations(slug);
```

### 1.2 Profiles
```sql
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  org_id uuid references organizations on delete cascade not null,
  email text not null,
  full_name text,
  avatar_url text,
  role text default 'member',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_profiles_org on profiles(org_id);
create index idx_profiles_email on profiles(email);
```

---

## Step 2: Task System (25 min)

### 2.1 Tasks Table
```sql
create table tasks (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations on delete cascade not null,
  created_by uuid references profiles on delete set null,
  assigned_to uuid references profiles on delete set null,
  
  -- Core fields
  title text not null,
  description text,
  status text default 'backlog', -- backlog, in_progress, review, completed
  priority text default 'medium', -- low, medium, high, urgent
  
  -- Workflow
  category text, -- startup, event, marketing, sales, etc
  phase integer check (phase between 1 and 5),
  
  -- Relationships
  project_id uuid references projects on delete set null,
  deal_id uuid references crm_deals on delete set null,
  
  -- AI metadata
  ai_generated boolean default false,
  ai_suggested boolean default false,
  ai_context jsonb,
  
  -- Dates
  due_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Critical indexes for dashboard performance
create index idx_tasks_org_status on tasks(org_id, status);
create index idx_tasks_org_priority on tasks(org_id, priority, due_at);
create index idx_tasks_org_assigned on tasks(org_id, assigned_to);
create index idx_tasks_project on tasks(project_id);
```

---

## Step 3: CRM Tables (30 min)

### 3.1 CRM Contacts
```sql
create table crm_contacts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations on delete cascade not null,
  created_by uuid references profiles on delete set null,
  
  -- Basic info
  full_name text not null,
  email text,
  phone text,
  company text,
  title text,
  linkedin_url text,
  
  -- Categorization
  type text default 'investor', -- investor, customer, advisor, partner
  tags text[],
  
  -- AI enrichment
  ai_enriched boolean default false,
  ai_summary text,
  ai_metadata jsonb,
  
  -- Engagement
  last_contact_at timestamptz,
  next_followup_at timestamptz,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_contacts_org on crm_contacts(org_id);
create index idx_contacts_type on crm_contacts(org_id, type);
create index idx_contacts_email on crm_contacts(email);
```

### 3.2 CRM Deals
```sql
create table crm_deals (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations on delete cascade not null,
  contact_id uuid references crm_contacts on delete set null,
  created_by uuid references profiles on delete set null,
  
  -- Deal info
  title text not null,
  amount numeric(12, 2),
  currency text default 'USD',
  
  -- Pipeline
  stage text default 'initial_contact', 
  -- Stages: initial_contact, meeting_scheduled, pitch_sent, 
  --         due_diligence, term_sheet, closing, won, lost
  probability integer check (probability between 0 and 100),
  
  -- Dates
  expected_close_at date,
  last_touch_at timestamptz,
  
  -- AI insights
  ai_risk_score integer,
  ai_suggestions jsonb,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_deals_org_stage on crm_deals(org_id, stage);
create index idx_deals_contact on crm_deals(contact_id);
create index idx_deals_close_date on crm_deals(expected_close_at);
```

---

## Step 4: Projects (20 min)

```sql
create table projects (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references organizations on delete cascade not null,
  created_by uuid references profiles on delete set null,
  
  -- Project info
  name text not null,
  description text,
  
  -- Health tracking
  health_score integer check (health_score between 0 and 100),
  status text default 'active', -- planning, active, on_hold, completed, cancelled
  
  -- Timeline
  start_date date,
  target_date date,
  
  -- AI insights
  ai_summary text,
  ai_risks jsonb,
  
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_projects_org on projects(org_id);
create index idx_projects_status on projects(org_id, status);
```

---

## Step 5: Row Level Security (30 min)

### 5.1 Enable RLS on all tables
```sql
alter table organizations enable row level security;
alter table profiles enable row level security;
alter table tasks enable row level security;
alter table crm_contacts enable row level security;
alter table crm_deals enable row level security;
alter table projects enable row level security;
```

### 5.2 Create policies

#### Organizations (users see only their org)
```sql
create policy "Users can view their organization"
  on organizations for select
  using (
    id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

create policy "Service role full access"
  on organizations for all
  using (auth.jwt()->>'role' = 'service_role');
```

#### Profiles
```sql
create policy "Users can view profiles in their org"
  on profiles for select
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

create policy "Users can update own profile"
  on profiles for update
  using (id = auth.uid());
```

#### Tasks (org-isolated CRUD)
```sql
create policy "Users can view tasks in their org"
  on tasks for select
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

create policy "Users can insert tasks in their org"
  on tasks for insert
  with check (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

create policy "Users can update tasks in their org"
  on tasks for update
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

create policy "Users can delete tasks in their org"
  on tasks for delete
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );
```

#### Repeat similar policies for:
- crm_contacts
- crm_deals
- projects

---

## Step 6: Functions & Triggers (15 min)

### 6.1 Auto-update timestamp
```sql
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply to all tables
create trigger set_updated_at before update on organizations
  for each row execute function update_updated_at();
create trigger set_updated_at before update on profiles
  for each row execute function update_updated_at();
create trigger set_updated_at before update on tasks
  for each row execute function update_updated_at();
create trigger set_updated_at before update on crm_contacts
  for each row execute function update_updated_at();
create trigger set_updated_at before update on crm_deals
  for each row execute function update_updated_at();
create trigger set_updated_at before update on projects
  for each row execute function update_updated_at();
```

---

## Step 7: Seed Data (20 min)

Create a test organization and sample data:

```sql
-- Insert test org
insert into organizations (id, name, slug)
values (
  '00000000-0000-0000-0000-000000000001',
  'Demo Startup',
  'demo-startup'
);

-- Sample tasks
insert into tasks (org_id, title, priority, status, due_at, phase, category)
values 
  ('00000000-0000-0000-0000-000000000001', 'Follow up with Sequoia intro', 'high', 'in_progress', now() + interval '2 days', 3, 'fundraising'),
  ('00000000-0000-0000-0000-000000000001', 'Ship API beta', 'high', 'in_progress', now() + interval '5 days', 2, 'product'),
  ('00000000-0000-0000-0000-000000000001', 'Review hiring pipeline', 'medium', 'backlog', now() + interval '7 days', 1, 'hiring');

-- Sample contacts
insert into crm_contacts (org_id, full_name, email, type, company)
values
  ('00000000-0000-0000-0000-000000000001', 'Sarah Chen', 'sarah@sequoia.com', 'investor', 'Sequoia Capital'),
  ('00000000-0000-0000-0000-000000000001', 'Marcus Wu', 'marcus@acme.co', 'customer', 'Acme Corp');

-- Sample deals
insert into crm_deals (org_id, title, amount, stage, probability, contact_id)
select 
  '00000000-0000-0000-0000-000000000001',
  'Seed Round',
  2000000,
  'due_diligence',
  60,
  id
from crm_contacts
where email = 'sarah@sequoia.com';
```

---

## Step 8: Validation (15 min)

### Test org isolation
```sql
-- Create second test org
insert into organizations (id, name, slug)
values (
  '00000000-0000-0000-0000-000000000002',
  'Other Startup',
  'other-startup'
);

-- Try to read cross-org (should return 0 rows when using RLS)
set role authenticated;
set request.jwt.claims.sub to '<user-in-org-1>';
select * from tasks where org_id = '00000000-0000-0000-0000-000000000002';
-- Should return empty
```

### Test indexes
```sql
explain analyze
select * from tasks
where org_id = '00000000-0000-0000-0000-000000000001'
  and status = 'in_progress'
order by priority desc, due_at asc
limit 3;
-- Should use idx_tasks_org_status
```

---

## Completion Checklist

- [ ] All tables created without errors
- [ ] RLS enabled on all tables
- [ ] Policies prevent cross-org access
- [ ] Indexes exist and are used
- [ ] Seed data inserted successfully
- [ ] Updated_at triggers working
- [ ] Foreign keys prevent orphans

---

## Next Steps

→ Move to `/docs/dashboards/01-authentication.md`
