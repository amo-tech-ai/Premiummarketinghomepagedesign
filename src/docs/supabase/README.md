# Supabase Configuration - Source of Truth

**Project:** StartupAI  
**Status:** Active  
**Last Updated:** January 13, 2025

---

## 📋 Quick Reference

### Project Details
- **Project URL:** `https://ouverjherohazwadfgud.supabase.co`
- **Project ID:** `ouverjherohazwadfgud`
- **Region:** (Check Supabase dashboard)

### API Keys
- **Anon/Public Key:** See [credentials.md](./credentials.md)
- **Service Role Key:** (Add from Supabase dashboard - DO NOT COMMIT)

---

## 🚀 Quick Start

### 1. Environment Setup
Copy credentials to your `.env` file:
```bash
cp docs/supabase/.env.example .env
```

### 2. Install Supabase CLI
```bash
npm install -g supabase
```

### 3. Link Project
```bash
supabase link --project-ref ouverjherohazwadfgud
```

### 4. Run Migrations
```bash
supabase db push
```

---

## 📂 Directory Structure

```
/docs/supabase/
├── README.md                  # This file
├── credentials.md             # API keys and connection info
├── .env.example              # Environment template
├── migrations/               # Database migrations
│   ├── 001_initial_schema.sql
│   ├── 002_rls_policies.sql
│   └── 003_seed_data.sql
├── edge-functions/           # Serverless functions
│   ├── dashboard-summary/
│   ├── ai-insights/
│   └── generate-tasks/
├── policies/                 # RLS policy templates
│   └── org_isolation.sql
└── queries/                  # Common SQL queries
    └── dashboard_data.sql
```

---

## 🔐 Security Checklist

- [x] Anon key documented
- [ ] Service role key stored in 1Password/Secrets Manager
- [ ] RLS enabled on all tables
- [ ] Policies tested with multiple users
- [ ] Edge Functions use service role server-side only
- [ ] `.env` file in `.gitignore`

---

## 🔗 Important Links

- **Dashboard:** https://supabase.com/dashboard/project/ouverjherohazwadfgud
- **SQL Editor:** https://supabase.com/dashboard/project/ouverjherohazwadfgud/editor
- **Table Editor:** https://supabase.com/dashboard/project/ouverjherohazwadfgud/editor
- **Auth Settings:** https://supabase.com/dashboard/project/ouverjherohazwadfgud/auth/users
- **Storage:** https://supabase.com/dashboard/project/ouverjherohazwadfgud/storage/buckets

---

## 📊 Database Status

### Tables Created
- [ ] organizations
- [ ] profiles
- [ ] tasks
- [ ] crm_contacts
- [ ] crm_deals
- [ ] projects

### RLS Status
- [ ] All tables have RLS enabled
- [ ] Org isolation policies active
- [ ] Service role policies configured
- [ ] Tested with multiple orgs

### Edge Functions Deployed
- [ ] dashboard-summary
- [ ] ai-insights
- [ ] generate-tasks
- [ ] crm-followup

---

## 🛠️ Common Commands

### Database
```bash
# Push migrations
supabase db push

# Pull remote changes
supabase db pull

# Reset local database
supabase db reset

# Generate types
supabase gen types typescript --local > types/supabase.ts
```

### Edge Functions
```bash
# Create new function
supabase functions new function-name

# Deploy function
supabase functions deploy function-name

# View logs
supabase functions logs function-name
```

### Local Development
```bash
# Start local Supabase
supabase start

# Stop local Supabase
supabase stop

# Check status
supabase status
```

---

## 🚨 Troubleshooting

### Issue: RLS blocking all queries
**Solution:** Check if user is authenticated and org_id matches

### Issue: Edge Function timeout
**Solution:** Optimize queries, add indexes

### Issue: CORS errors
**Solution:** Check allowed origins in Supabase dashboard

---

## 📝 Next Steps

1. [Create initial schema](./migrations/001_initial_schema.sql)
2. [Configure RLS policies](./migrations/002_rls_policies.sql)
3. [Add seed data](./migrations/003_seed_data.sql)
4. [Deploy Edge Functions](./edge-functions/)
5. Test with real users

---

**For detailed setup instructions, see:**
- [Database Setup](./DATABASE_SETUP.md)
- [Edge Functions Guide](./EDGE_FUNCTIONS.md)
- [Security Best Practices](./SECURITY.md)
