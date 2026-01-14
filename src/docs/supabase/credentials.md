# Supabase Credentials

⚠️ **IMPORTANT:** Never commit service role keys to version control!

---

## Project Information

**Project URL:** `https://ouverjherohazwadfgud.supabase.co`  
**Project Reference ID:** `ouverjherohazwadfgud`

---

## API Keys

### Anon/Public Key (Safe for Client-Side)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dmVyamhlcm9oYXp3YWRmZ3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MzYzNzIsImV4cCI6MjA3ODMxMjM3Mn0.jicjCmB_flZc_H_io0-v5fVHPzgf5gkj-4wdvcRXfQk
```

**Usage:**
- Client-side code (React app)
- Public API calls
- Subject to RLS policies
- Safe to expose in frontend

### Service Role Key (⚠️ NEVER EXPOSE)
**Location:** Supabase Dashboard → Settings → API  
**Storage:** Store in environment variables or secrets manager  
**Usage:**
- Edge Functions only
- Server-side operations
- Bypasses RLS
- Full database access

---

## Environment Variables

### Frontend (.env)
```bash
VITE_SUPABASE_URL=https://ouverjherohazwadfgud.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dmVyamhlcm9oYXp3YWRmZ3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MzYzNzIsImV4cCI6MjA3ODMxMjM3Mn0.jicjCmB_flZc_H_io0-v5fVHPzgf5gkj-4wdvcRXfQk
```

### Edge Functions (.env for local development)
```bash
SUPABASE_URL=https://ouverjherohazwadfgud.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<get-from-dashboard>
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91dmVyamhlcm9oYXp3YWRmZ3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI3MzYzNzIsImV4cCI6MjA3ODMxMjM3Mn0.jicjCmB_flZc_H_io0-v5fVHPzgf5gkj-4wdvcRXfQk
```

---

## Connection Strings

### Database URL (Postgres)
```
postgresql://postgres:[YOUR-PASSWORD]@db.ouverjherohazwadfgud.supabase.co:5432/postgres
```

**Get password from:** Supabase Dashboard → Settings → Database

### Pooler (Recommended for serverless)
```
postgresql://postgres:[YOUR-PASSWORD]@db.ouverjherohazwadfgud.supabase.co:6543/postgres?pgbouncer=true
```

---

## API Endpoints

### REST API
```
https://ouverjherohazwadfgud.supabase.co/rest/v1/
```

### GraphQL (if enabled)
```
https://ouverjherohazwadfgud.supabase.co/graphql/v1
```

### Realtime
```
wss://ouverjherohazwadfgud.supabase.co/realtime/v1
```

### Storage
```
https://ouverjherohazwadfgud.supabase.co/storage/v1
```

### Edge Functions
```
https://ouverjherohazwadfgud.supabase.co/functions/v1/
```

---

## Authentication

### Default Providers Enabled
- [x] Email/Password
- [ ] Google OAuth
- [ ] GitHub OAuth
- [ ] Magic Link

### JWT Secret
**Location:** Supabase Dashboard → Settings → API  
**Usage:** Verifying JWTs server-side

---

## Security Configuration

### Allowed Origins (CORS)
Add your domains in: Dashboard → Settings → API → CORS

**Development:**
- `http://localhost:5173`
- `http://localhost:3000`

**Production:**
- `https://yourdomain.com`
- `https://app.yourdomain.com`

---

## Rate Limits (Free Tier)

- **API Requests:** 500,000/month
- **Database Size:** 500 MB
- **Bandwidth:** 5 GB
- **Edge Function Invocations:** 500,000/month

**Upgrade:** If you hit limits, upgrade to Pro plan

---

## Backup & Recovery

### Automated Backups
- **Frequency:** Daily (on Pro plan)
- **Retention:** 7 days
- **Location:** Dashboard → Database → Backups

### Manual Backup
```bash
# Export schema
supabase db dump --schema > backup.sql

# Export data
supabase db dump --data-only > data.sql
```

---

## Monitoring

### Metrics Dashboard
https://supabase.com/dashboard/project/ouverjherohazwadfgud/reports

**Monitor:**
- API requests/sec
- Database connections
- Storage usage
- Edge Function invocations

---

## Team Access

### Current Team Members
- [Add team members here]

### Invite New Members
Dashboard → Settings → Team → Invite

---

## Support

### Documentation
- https://supabase.com/docs

### Community
- https://github.com/supabase/supabase/discussions
- https://discord.supabase.com

### Direct Support (Pro/Enterprise)
- support@supabase.com

---

**Last Updated:** January 13, 2025  
**Maintained By:** Development Team
