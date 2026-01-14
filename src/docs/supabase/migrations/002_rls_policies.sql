-- ================================================
-- StartupAI Database Schema - RLS Policies
-- Migration 002: Row Level Security
-- ================================================

-- ================================================
-- ENABLE RLS
-- ================================================

alter table organizations enable row level security;
alter table profiles enable row level security;
alter table projects enable row level security;
alter table tasks enable row level security;
alter table crm_contacts enable row level security;
alter table crm_deals enable row level security;
alter table crm_deal_activities enable row level security;

-- ================================================
-- ORGANIZATIONS POLICIES
-- ================================================

-- Users can view their own organization
create policy "Users can view their organization"
  on organizations for select
  using (
    id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Service role has full access (for Edge Functions)
create policy "Service role full access to organizations"
  on organizations for all
  using (auth.jwt()->>'role' = 'service_role');

-- ================================================
-- PROFILES POLICIES
-- ================================================

-- Users can view all profiles in their org
create policy "Users can view profiles in their org"
  on profiles for select
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can update their own profile
create policy "Users can update own profile"
  on profiles for update
  using (id = auth.uid());

-- Service role full access
create policy "Service role full access to profiles"
  on profiles for all
  using (auth.jwt()->>'role' = 'service_role');

-- ================================================
-- PROJECTS POLICIES
-- ================================================

-- Users can view projects in their org
create policy "Users can view projects in their org"
  on projects for select
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can insert projects in their org
create policy "Users can insert projects in their org"
  on projects for insert
  with check (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can update projects in their org
create policy "Users can update projects in their org"
  on projects for update
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can delete projects in their org
create policy "Users can delete projects in their org"
  on projects for delete
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Service role full access
create policy "Service role full access to projects"
  on projects for all
  using (auth.jwt()->>'role' = 'service_role');

-- ================================================
-- TASKS POLICIES
-- ================================================

-- Users can view tasks in their org
create policy "Users can view tasks in their org"
  on tasks for select
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can insert tasks in their org
create policy "Users can insert tasks in their org"
  on tasks for insert
  with check (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can update tasks in their org
create policy "Users can update tasks in their org"
  on tasks for update
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can delete tasks in their org
create policy "Users can delete tasks in their org"
  on tasks for delete
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Service role full access
create policy "Service role full access to tasks"
  on tasks for all
  using (auth.jwt()->>'role' = 'service_role');

-- ================================================
-- CRM CONTACTS POLICIES
-- ================================================

-- Users can view contacts in their org
create policy "Users can view contacts in their org"
  on crm_contacts for select
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can insert contacts in their org
create policy "Users can insert contacts in their org"
  on crm_contacts for insert
  with check (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can update contacts in their org
create policy "Users can update contacts in their org"
  on crm_contacts for update
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can delete contacts in their org
create policy "Users can delete contacts in their org"
  on crm_contacts for delete
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Service role full access
create policy "Service role full access to crm_contacts"
  on crm_contacts for all
  using (auth.jwt()->>'role' = 'service_role');

-- ================================================
-- CRM DEALS POLICIES
-- ================================================

-- Users can view deals in their org
create policy "Users can view deals in their org"
  on crm_deals for select
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can insert deals in their org
create policy "Users can insert deals in their org"
  on crm_deals for insert
  with check (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can update deals in their org
create policy "Users can update deals in their org"
  on crm_deals for update
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can delete deals in their org
create policy "Users can delete deals in their org"
  on crm_deals for delete
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Service role full access
create policy "Service role full access to crm_deals"
  on crm_deals for all
  using (auth.jwt()->>'role' = 'service_role');

-- ================================================
-- CRM DEAL ACTIVITIES POLICIES
-- ================================================

-- Users can view deal activities in their org
create policy "Users can view deal activities in their org"
  on crm_deal_activities for select
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can insert deal activities in their org
create policy "Users can insert deal activities in their org"
  on crm_deal_activities for insert
  with check (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can update deal activities in their org
create policy "Users can update deal activities in their org"
  on crm_deal_activities for update
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Users can delete deal activities in their org
create policy "Users can delete deal activities in their org"
  on crm_deal_activities for delete
  using (
    org_id in (
      select org_id from profiles 
      where id = auth.uid()
    )
  );

-- Service role full access
create policy "Service role full access to crm_deal_activities"
  on crm_deal_activities for all
  using (auth.jwt()->>'role' = 'service_role');

-- ================================================
-- VERIFICATION
-- ================================================

-- Check RLS is enabled
do $$
declare
  rls_count integer;
begin
  select count(*)
  into rls_count
  from pg_tables
  where schemaname = 'public'
    and rowsecurity = true;
  
  raise notice 'RLS enabled on % tables', rls_count;
end $$;

-- ================================================
-- MIGRATION COMPLETE
-- ================================================

comment on schema public is 'StartupAI schema v002 - RLS policies configured';
