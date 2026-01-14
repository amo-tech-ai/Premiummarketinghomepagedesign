# Database Setup Guide

Complete step-by-step guide to set up the StartupAI database on Supabase.

---

## Prerequisites

- [x] Supabase project created
- [x] Credentials documented in [credentials.md](./credentials.md)
- [ ] Supabase CLI installed
- [ ] Local environment configured

---

## Step 1: Install Supabase CLI

### macOS/Linux
```bash
brew install supabase/tap/supabase
```

### npm (all platforms)
```bash
npm install -g supabase
```

### Verify installation
```bash
supabase --version
```

---

## Step 2: Link Your Project

```bash
# Login to Supabase
supabase login

# Link to remote project
supabase link --project-ref ouverjherohazwadfgud

# Pull current schema (if any)
supabase db pull
```

---

## Step 3: Run Migrations

### Option A: Via Supabase Dashboard (Easiest)

1. Go to: https://supabase.com/dashboard/project/ouverjherohazwadfgud/editor
2. Click "New Query"
3. Copy and paste migration files in order:
   - [001_initial_schema.sql](./migrations/001_initial_schema.sql)
   - [002_rls_policies.sql](./migrations/002_rls_policies.sql)
   - [003_seed_data.sql](./migrations/003_seed_data.sql)
4. Run each migration

### Option B: Via CLI (Recommended for Teams)

```bash
# Navigate to project root
cd /path/to/startup-ai

# Run all migrations
supabase db push

# Or run individually
psql -h db.ouverjherohazwadfgud.supabase.co \
     -U postgres \
     -d postgres \
     -f docs/supabase/migrations/001_initial_schema.sql
```

---

## Step 4: Verify Tables Created

### Via Dashboard
1. Go to Table Editor: https://supabase.com/dashboard/project/ouverjherohazwadfgud/editor
2. Verify these tables exist:
   - organizations
   - profiles
   - tasks
   - crm_contacts
   - crm_deals
   - projects

### Via SQL
```sql
-- List all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Check RLS status
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
```

---

## Step 5: Test RLS Policies

### Create Test Users
```sql
-- Via Supabase Dashboard → Authentication → Users → Add User

-- Create user 1 (org 1)
-- Email: test1@example.com
-- Password: test123456

-- Create user 2 (org 2)  
-- Email: test2@example.com
-- Password: test123456
```

### Test Org Isolation
```sql
-- Set session as user 1
SET request.jwt.claims.sub = '<user-1-id>';

-- Try to read user 2's data (should return empty)
SELECT * FROM tasks WHERE org_id = '<org-2-id>';
-- Expected: 0 rows

-- Read own org data (should work)
SELECT * FROM tasks WHERE org_id = '<org-1-id>';
-- Expected: Shows data
```

---

## Step 6: Configure Auth Settings

### Email Settings
1. Go to: https://supabase.com/dashboard/project/ouverjherohazwadfgud/auth/templates
2. Customize email templates:
   - Confirmation email
   - Reset password
   - Magic link

### Providers
1. Go to: https://supabase.com/dashboard/project/ouverjherohazwadfgud/auth/providers
2. Enable providers as needed:
   - ✅ Email (already enabled)
   - ⬜ Google OAuth (optional)
   - ⬜ GitHub OAuth (optional)

### URL Configuration
1. Go to: https://supabase.com/dashboard/project/ouverjherohazwadfgud/auth/url-configuration
2. Set redirect URLs:
   - **Site URL:** `http://localhost:5173` (dev) / `https://yourdomain.com` (prod)
   - **Redirect URLs:** 
     - `http://localhost:5173/**`
     - `https://yourdomain.com/**`

---

## Step 7: Set Up Realtime (Optional)

### Enable Realtime for Tables
```sql
-- Enable realtime for tasks
alter publication supabase_realtime add table tasks;

-- Enable realtime for deals
alter publication supabase_realtime add table crm_deals;
```

### Or via Dashboard
1. Go to: https://supabase.com/dashboard/project/ouverjherohazwadfgud/database/replication
2. Toggle on tables you need

---

## Step 8: Create Indexes for Performance

```sql
-- Already created in migration, but verify:
SELECT indexname, tablename 
FROM pg_indexes 
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- Should see indexes like:
-- idx_tasks_org_status
-- idx_tasks_org_priority
-- idx_contacts_org
-- etc.
```

---

## Step 9: Set Up Storage Buckets (Optional)

### For profile avatars, pitch decks, etc.

```sql
-- Create buckets
insert into storage.buckets (id, name, public)
values 
  ('avatars', 'avatars', true),
  ('documents', 'documents', false);

-- Create storage policies
create policy "Users can upload own avatar"
  on storage.objects for insert
  with check (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Anyone can view avatars"
  on storage.objects for select
  using (bucket_id = 'avatars');
```

---

## Step 10: Verify Setup

### Checklist
- [ ] All tables created
- [ ] RLS enabled on all tables
- [ ] Policies prevent cross-org access (tested)
- [ ] Indexes created
- [ ] Triggers working (updated_at)
- [ ] Auth configured
- [ ] Seed data inserted (optional)
- [ ] Storage buckets created (if needed)

### Test Query
```sql
-- This should work for authenticated users in their org
SELECT 
  t.id,
  t.title,
  t.priority,
  t.due_at,
  p.full_name as assigned_to_name
FROM tasks t
LEFT JOIN profiles p ON t.assigned_to = p.id
WHERE t.org_id = (
  SELECT org_id FROM profiles WHERE id = auth.uid()
)
ORDER BY t.priority DESC, t.due_at ASC
LIMIT 10;
```

---

## Troubleshooting

### Issue: Tables not created
**Solution:** Check SQL editor for errors, run migrations one at a time

### Issue: RLS blocking everything
**Solution:** Verify user is authenticated, check policies syntax

### Issue: Can't connect via CLI
**Solution:** 
```bash
# Re-login
supabase logout
supabase login

# Re-link
supabase link --project-ref ouverjherohazwadfgud
```

### Issue: Performance slow
**Solution:** 
- Check indexes are created
- Use `EXPLAIN ANALYZE` on slow queries
- Consider upgrading plan if hitting connection limits

---

## Next Steps

1. ✅ Database setup complete
2. → [Deploy Edge Functions](./EDGE_FUNCTIONS.md)
3. → [Configure local development](./LOCAL_DEVELOPMENT.md)
4. → Start building the app!

---

## Maintenance

### Regular Tasks
- **Weekly:** Review slow query log
- **Monthly:** Check storage usage
- **Quarterly:** Review and optimize indexes

### Backups
```bash
# Manual backup
supabase db dump > backup_$(date +%Y%m%d).sql

# Restore from backup
psql -h db.ouverjherohazwadfgud.supabase.co \
     -U postgres \
     -d postgres \
     < backup_20250113.sql
```

---

**Setup Complete!** 🎉  
Your database is ready for development.
