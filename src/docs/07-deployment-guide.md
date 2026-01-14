# Deployment Guide - StartupAI

**Environment:** Production  
**Platform:** Vercel + Supabase  
**Last Updated:** January 13, 2025

---

## 🎯 DEPLOYMENT ARCHITECTURE

```
┌─────────────────────────────────────────────────┐
│                   Users                          │
└───────────────┬─────────────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────────────┐
│         Vercel Edge Network (CDN)                │
│  • Static assets (HTML, CSS, JS, images)        │
│  • Edge caching                                   │
│  • Global distribution                            │
└───────────────┬─────────────────────────────────┘
                │
                ↓
┌─────────────────────────────────────────────────┐
│          React Application (SPA)                 │
│  • Client-side routing                           │
│  • Dynamic UI rendering                          │
│  • State management                              │
└─────┬───────────────────────────────────────┬───┘
      │                                       │
      ↓                                       ↓
┌────────────────┐                  ┌──────────────────┐
│   Supabase     │                  │  Gemini API      │
│  • PostgreSQL  │                  │  • AI Insights   │
│  • Auth        │                  │  • Task Gen      │
│  • RLS         │                  │  • Analysis      │
│  • Edge Fns    │                  └──────────────────┘
└────────────────┘
```

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### 1. Environment Setup
- [ ] Production environment variables set
- [ ] API keys secured (not in code)
- [ ] Database credentials configured
- [ ] Domain purchased
- [ ] SSL certificate ready (auto with Vercel)

### 2. Code Quality
- [ ] All TypeScript errors fixed
- [ ] ESLint warnings resolved
- [ ] Prettier formatting applied
- [ ] No console.logs in production
- [ ] Source maps configured

### 3. Testing
- [ ] Manual testing complete
- [ ] Critical user flows verified
- [ ] Mobile responsiveness checked
- [ ] Cross-browser testing done
- [ ] Performance audit passed

### 4. Database
- [ ] Migrations applied
- [ ] RLS policies deployed
- [ ] Seed data loaded (optional)
- [ ] Indexes created
- [ ] Backups configured

---

## 🚀 STEP-BY-STEP DEPLOYMENT

### PHASE 1: Database Setup (30 minutes)

#### 1.1 Deploy Supabase Migrations
```bash
# Login to Supabase
supabase login

# Link to remote project
supabase link --project-ref ouverjherohazwadfgud

# Push migrations
supabase db push
```

**Or manually:**
1. Go to https://supabase.com/dashboard/project/ouverjherohazwadfgud/editor
2. Open SQL Editor
3. Run migrations in order:
   - `001_initial_schema.sql`
   - `002_rls_policies.sql`
   - `003_seed_data.sql` (optional)

#### 1.2 Verify Database
```sql
-- Check tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Expected: organizations, profiles, projects, tasks, 
--           crm_contacts, crm_deals, crm_deal_activities

-- Test RLS
-- Try to query another org's data (should fail)
```

#### 1.3 Configure Connection Pooling
1. Dashboard → Settings → Database
2. Enable Connection Pooling
3. Use pooler URL for serverless functions
4. Copy connection string

---

### PHASE 2: Vercel Deployment (20 minutes)

#### 2.1 Install Vercel CLI
```bash
npm install -g vercel
```

#### 2.2 Login and Link Project
```bash
# Login
vercel login

# Link project (first time only)
vercel link
# Choose: Create new project
# Name: startupai
# Framework: Vite
```

#### 2.3 Configure Environment Variables
```bash
# Set production environment variables
vercel env add VITE_SUPABASE_URL production
# Enter: https://ouverjherohazwadfgud.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Enter: eyJhbGc...

vercel env add VITE_GEMINI_API_KEY production
# Enter: [your Gemini API key]
```

**Or via dashboard:**
1. https://vercel.com/dashboard
2. Select project → Settings → Environment Variables
3. Add variables for Production

#### 2.4 Deploy to Production
```bash
# Build and deploy
vercel --prod

# Output:
# ✅ Production: https://startupai.vercel.app
```

#### 2.5 Set Custom Domain
```bash
# Add custom domain
vercel domains add startupai.com

# Configure DNS:
# Type: A Record
# Name: @
# Value: 76.76.21.21

# Type: CNAME
# Name: www
# Value: cname.vercel-dns.com
```

---

### PHASE 3: Post-Deployment Verification (15 minutes)

#### 3.1 Smoke Tests
```bash
# Test these URLs manually:
https://startupai.com
https://startupai.com/how-it-works
https://startupai.com/login
https://startupai.com/signup
https://startupai.com/app/dashboard
https://startupai.com/app/projects
```

#### 3.2 Critical User Flows
- [ ] Signup → Dashboard (should work)
- [ ] Login → Dashboard (should work)
- [ ] Dashboard loads (should show widgets)
- [ ] Projects page loads (should show list)
- [ ] Click project (should navigate)
- [ ] Logout (should return to home)

#### 3.3 Performance Check
```bash
# Run Lighthouse audit
npm install -g lighthouse

lighthouse https://startupai.com \
  --view \
  --preset=desktop

# Targets:
# Performance: > 90
# Accessibility: > 90
# Best Practices: > 90
# SEO: > 90
```

#### 3.4 Error Monitoring
```bash
# Check for errors in:
# 1. Vercel Logs
vercel logs startupai --prod

# 2. Supabase Logs
# Dashboard → Logs → API Logs

# 3. Browser Console
# Open site, check for errors
```

---

## 🔐 SECURITY CONFIGURATION

### Supabase Security

#### Enable RLS on All Tables
```sql
-- Verify RLS enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- All should show: rowsecurity = true
```

#### Configure Auth Settings
1. Dashboard → Authentication → Settings
2. **Site URL:** https://startupai.com
3. **Redirect URLs:** 
   - https://startupai.com/**
   - http://localhost:5173/** (for local dev)
4. **Email Templates:** Customize signup/reset emails
5. **Rate Limiting:** Enable (prevent abuse)

#### API Keys Management
1. **Anon Key:** Public (used in frontend)
2. **Service Role Key:** Secret (never expose)
3. **JWT Secret:** Keep secure (for token verification)

### Vercel Security Headers
Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

## 📊 MONITORING SETUP

### Vercel Analytics
```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to App.tsx
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <>
      <Analytics />
      {/* rest of app */}
    </>
  );
}

# Deploy
vercel --prod
```

### Error Tracking with Sentry
```bash
# Install Sentry
npm install @sentry/react

# Initialize
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://your-dsn@sentry.io/project-id",
  environment: "production",
  tracesSampleRate: 1.0,
});

# Wrap app with error boundary
<Sentry.ErrorBoundary fallback={<ErrorFallback />}>
  <App />
</Sentry.ErrorBoundary>
```

### Uptime Monitoring
Use: https://uptimerobot.com
- Monitor main pages every 5 minutes
- Alert via email/SMS on downtime
- Check SSL certificate expiry

---

## 🔄 CI/CD PIPELINE

### Automatic Deployments
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
      
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

### Preview Deployments
```bash
# Every pull request gets a preview URL
vercel

# Output: https://startupai-git-feature-branch.vercel.app

# Test preview before merging to main
```

---

## 🚨 ROLLBACK PROCEDURE

### Quick Rollback (< 1 minute)
```bash
# List recent deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-id]

# Or via dashboard:
# 1. Go to Deployments
# 2. Find previous stable deployment
# 3. Click "Promote to Production"
```

### Database Rollback (5-10 minutes)
```bash
# Restore from backup
# 1. Dashboard → Database → Backups
# 2. Select backup point
# 3. Click "Restore"
# 4. Confirm

# Or via CLI:
supabase db dump > backup.sql
psql [connection-string] < backup.sql
```

---

## 📈 POST-LAUNCH MONITORING

### First 24 Hours
- [ ] Check error rate every hour
- [ ] Monitor performance metrics
- [ ] Watch for spike in traffic
- [ ] Review user signups
- [ ] Check database load

### First Week
- [ ] Daily error log review
- [ ] Performance trend analysis
- [ ] User feedback collection
- [ ] Bug prioritization
- [ ] Feature usage tracking

### Ongoing
- [ ] Weekly deployment schedule
- [ ] Monthly performance review
- [ ] Quarterly security audit
- [ ] Dependency updates
- [ ] Database optimization

---

## 🎯 PRODUCTION URLS

### Primary
- **App:** https://app.startupai.com
- **Marketing:** https://startupai.com
- **Status:** https://status.startupai.com

### Admin
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Supabase Dashboard:** https://supabase.com/dashboard/project/ouverjherohazwadfgud
- **Analytics:** https://vercel.com/analytics

---

## ✅ DEPLOYMENT COMPLETE

Once deployed:
1. ✅ Share production URL with team
2. ✅ Announce launch
3. ✅ Monitor for first 24 hours
4. ✅ Gather feedback
5. ✅ Plan iteration 1

**Production URL:** https://startupai.com  
**Status:** Ready for users 🚀
