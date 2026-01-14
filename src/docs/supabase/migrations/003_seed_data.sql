-- ================================================
-- StartupAI Database Schema - Seed Data
-- Migration 003: Sample Data for Development
-- ================================================

-- ⚠️ WARNING: This is for development/demo only
-- DO NOT run in production with real user data

-- ================================================
-- DEMO ORGANIZATION
-- ================================================

insert into organizations (id, name, slug)
values (
  '00000000-0000-0000-0000-000000000001',
  'Demo Startup',
  'demo-startup'
)
on conflict (id) do nothing;

-- ================================================
-- SAMPLE PROJECTS
-- ================================================

insert into projects (org_id, name, description, status, health_score, start_date, target_date)
values 
  (
    '00000000-0000-0000-0000-000000000001',
    'MVP Launch',
    'Build and ship the minimum viable product to first customers',
    'active',
    75,
    '2025-01-01',
    '2025-03-31'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Seed Fundraise',
    'Raise $2M seed round from top VCs',
    'active',
    60,
    '2025-01-15',
    '2025-04-30'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'First 10 Customers',
    'Acquire and onboard first 10 paying customers',
    'active',
    50,
    '2025-02-01',
    '2025-05-31'
  )
on conflict do nothing;

-- ================================================
-- SAMPLE TASKS
-- ================================================

insert into tasks (org_id, title, description, priority, status, category, phase, due_at, project_id)
select 
  '00000000-0000-0000-0000-000000000001',
  task.title,
  task.description,
  task.priority,
  task.status,
  task.category,
  task.phase,
  task.due_at,
  p.id
from (
  values
    -- High priority tasks
    ('Follow up with Sequoia intro', 'Sarah forwarded intro on Monday - send pitch deck and schedule call', 'high', 'in_progress', 'fundraising', 3, now() + interval '2 days'),
    ('Ship API beta to first customer', 'Acme Corp is waiting for API access - deploy to staging first', 'high', 'in_progress', 'product', 2, now() + interval '5 days'),
    ('Review hiring pipeline', 'Interview 3 engineering candidates this week', 'medium', 'backlog', 'hiring', 1, now() + interval '7 days'),
    
    -- Medium priority
    ('Update pitch deck with new metrics', 'Add MRR chart and customer logos', 'medium', 'backlog', 'fundraising', 2, now() + interval '10 days'),
    ('Set up customer onboarding flow', 'Create welcome sequence and tutorial videos', 'medium', 'backlog', 'product', 1, now() + interval '14 days'),
    ('Schedule coffee with advisor', 'Get feedback on go-to-market strategy', 'low', 'backlog', 'startup', 1, now() + interval '21 days'),
    
    -- Completed examples
    ('Create LinkedIn post about launch', 'Announce beta launch to network', 'medium', 'completed', 'marketing', 5, now() - interval '2 days'),
    ('Send investor update email', 'Monthly update to existing investors', 'low', 'completed', 'fundraising', 5, now() - interval '5 days')
) as task(title, description, priority, status, category, phase, due_at)
cross join lateral (
  select id from projects 
  where org_id = '00000000-0000-0000-0000-000000000001'
  limit 1
) p
on conflict do nothing;

-- ================================================
-- SAMPLE CRM CONTACTS
-- ================================================

insert into crm_contacts (org_id, full_name, email, company, title, type, linkedin_url, last_contact_at, next_followup_at)
values
  -- Investors
  (
    '00000000-0000-0000-0000-000000000001',
    'Sarah Chen',
    'sarah@sequoia.com',
    'Sequoia Capital',
    'Partner',
    'investor',
    'https://linkedin.com/in/sarahchen',
    now() - interval '3 days',
    now() + interval '2 days'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'Marcus Johnson',
    'marcus@a16z.com',
    'Andreessen Horowitz',
    'General Partner',
    'investor',
    'https://linkedin.com/in/marcusjohnson',
    now() - interval '10 days',
    now() + interval '5 days'
  ),
  
  -- Customers
  (
    '00000000-0000-0000-0000-000000000001',
    'Emily Rodriguez',
    'emily@acme.co',
    'Acme Corp',
    'VP Product',
    'customer',
    'https://linkedin.com/in/emilyrodriguez',
    now() - interval '1 day',
    now() + interval '7 days'
  ),
  (
    '00000000-0000-0000-0000-000000000001',
    'David Kim',
    'david@techco.io',
    'TechCo',
    'CTO',
    'customer',
    'https://linkedin.com/in/davidkim',
    now() - interval '5 days',
    now() + interval '3 days'
  ),
  
  -- Advisors
  (
    '00000000-0000-0000-0000-000000000001',
    'Jennifer Walsh',
    'jen@founder.com',
    'Founder Network',
    'Executive Coach',
    'advisor',
    'https://linkedin.com/in/jenniferwalsh',
    now() - interval '14 days',
    now() + interval '7 days'
  )
on conflict do nothing;

-- ================================================
-- SAMPLE CRM DEALS
-- ================================================

insert into crm_deals (org_id, contact_id, title, amount, currency, stage, probability, expected_close_at, last_touch_at)
select
  '00000000-0000-0000-0000-000000000001',
  c.id,
  deal.title,
  deal.amount,
  deal.currency,
  deal.stage,
  deal.probability,
  deal.expected_close_at,
  deal.last_touch_at
from (
  values
    ('sarah@sequoia.com', 'Seed Round - Sequoia', 2000000.00, 'USD', 'due_diligence', 60, '2025-04-15'::date, now() - interval '3 days'),
    ('marcus@a16z.com', 'Seed Round - a16z', 1500000.00, 'USD', 'pitch_sent', 40, '2025-04-30'::date, now() - interval '10 days'),
    ('emily@acme.co', 'Acme Corp - Annual Contract', 50000.00, 'USD', 'closing', 80, '2025-02-15'::date, now() - interval '1 day'),
    ('david@techco.io', 'TechCo - Pilot Program', 25000.00, 'USD', 'pitch_sent', 50, '2025-03-01'::date, now() - interval '5 days')
) as deal(contact_email, title, amount, currency, stage, probability, expected_close_at, last_touch_at)
inner join crm_contacts c on c.email = deal.contact_email
on conflict do nothing;

-- ================================================
-- SAMPLE DEAL ACTIVITIES
-- ================================================

insert into crm_deal_activities (deal_id, org_id, type, subject, description, outcome, next_action, next_action_due)
select
  d.id,
  '00000000-0000-0000-0000-000000000001',
  activity.type,
  activity.subject,
  activity.description,
  activity.outcome,
  activity.next_action,
  activity.next_action_due
from (
  values
    ('Seed Round - Sequoia', 'meeting', 'Partner meeting', 'Presented deck to Sarah and 2 other partners. Very positive response.', 'positive', 'Send updated financials and customer references', now() + interval '2 days'),
    ('Seed Round - Sequoia', 'email', 'Deck sent', 'Sent pitch deck v3 with updated metrics', 'neutral', 'Follow up on feedback', now() + interval '7 days'),
    ('Acme Corp - Annual Contract', 'call', 'Contract discussion', 'Discussed pricing and implementation timeline', 'positive', 'Send final proposal', now() + interval '3 days')
) as activity(deal_title, type, subject, description, outcome, next_action, next_action_due)
inner join crm_deals d on d.title = activity.deal_title
on conflict do nothing;

-- ================================================
-- UPDATE PROJECT HEALTH SCORES
-- (Based on task completion)
-- ================================================

update projects
set health_score = (
  select 
    case 
      when count(*) = 0 then 100
      else (count(*) filter (where status = 'completed')::float / count(*) * 100)::integer
    end
  from tasks
  where tasks.project_id = projects.id
)
where org_id = '00000000-0000-0000-0000-000000000001';

-- ================================================
-- VERIFICATION
-- ================================================

do $$
declare
  task_count integer;
  contact_count integer;
  deal_count integer;
begin
  select count(*) into task_count from tasks where org_id = '00000000-0000-0000-0000-000000000001';
  select count(*) into contact_count from crm_contacts where org_id = '00000000-0000-0000-0000-000000000001';
  select count(*) into deal_count from crm_deals where org_id = '00000000-0000-0000-0000-000000000001';
  
  raise notice 'Seed data created:';
  raise notice '  - % tasks', task_count;
  raise notice '  - % contacts', contact_count;
  raise notice '  - % deals', deal_count;
end $$;

-- ================================================
-- MIGRATION COMPLETE
-- ================================================

comment on schema public is 'StartupAI schema v003 - Seed data loaded';
