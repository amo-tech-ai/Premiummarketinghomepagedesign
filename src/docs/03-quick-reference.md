# Quick Reference Guide

**For:** Developers implementing StartupAI  
**Last Updated:** January 13, 2025

---

## Essential Commands

### Development
```bash
npm run dev              # Start dev server (localhost:5173)
npm run build           # Build for production
npm run preview         # Preview production build
```

### Database
```bash
supabase link           # Link to remote project
supabase db push        # Push migrations
supabase db pull        # Pull remote schema
supabase gen types      # Generate TypeScript types
```

### Edge Functions
```bash
supabase functions new NAME      # Create function
supabase functions deploy NAME   # Deploy function
supabase functions logs NAME     # View logs
```

---

## Key URLs

### Development
- **Local:** http://localhost:5173
- **Supabase Project:** https://supabase.com/dashboard/project/ouverjherohazwadfgud

### Supabase Dashboard
- **SQL Editor:** /editor
- **Table Editor:** /editor  
- **Auth Users:** /auth/users
- **Edge Functions:** /functions
- **Storage:** /storage/buckets

---

## Environment Variables

### Required
```
VITE_SUPABASE_URL=https://ouverjherohazwadfgud.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### Optional
```
SUPABASE_SERVICE_ROLE_KEY=xxx    # Edge Functions only
GEMINI_API_KEY=xxx               # AI features
```

---

## File Locations

### Documentation
- Overall status: `/docs/PROGRESS.md`
- Next actions: `/docs/NEXT_STEPS.md`
- This overview: `/docs/01-overview.md`
- Credentials: `/docs/supabase/credentials.md`

### Implementation Guides
- Database: `/docs/dashboards/00-database-schema.md`
- Auth: `/docs/dashboards/01-authentication.md`
- Dashboard: `/docs/dashboards/02-main-dashboard.md`

### Migrations
- Schema: `/docs/supabase/migrations/001_initial_schema.sql`
- RLS: `/docs/supabase/migrations/002_rls_policies.sql`
- Seed: `/docs/supabase/migrations/003_seed_data.sql`

---

## Common Tasks

### Add New Page
1. Create `/pages/YourPage.tsx`
2. Add route in `/App.tsx`
3. Test navigation

### Add Dashboard Widget
1. Create `/components/dashboard/YourWidget.tsx`
2. Import in `/pages/app/Dashboard.tsx`
3. Position in 3-panel layout

### Query Supabase
```typescript
const { data, error } = await supabase
  .from('table_name')
  .select('*')
  .eq('org_id', org.id);
```

### Update with RLS
```typescript
await supabase
  .from('tasks')
  .update({ status: 'completed' })
  .eq('id', taskId);
  // RLS auto-enforces org_id
```

---

## Troubleshooting

### "No tables found"
→ Run migrations in SQL Editor

### "RLS blocking queries"
→ Check user is authenticated  
→ Verify org_id matches

### "CORS errors"
→ Add origin in Supabase dashboard

### "Environment variables undefined"
→ Restart dev server  
→ Check `.env` exists

---

## Code Patterns

### Use Auth Context
```typescript
const { user, org, signIn, signOut } = useAuth();
```

### Protected Route
```typescript
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

### Load Data Hook
```typescript
useEffect(() => {
  if (org) loadData();
}, [org]);
```

---

## Testing Checklist

### Before Commit
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Mobile responsive
- [ ] Loading states present
- [ ] Empty states handled

### Before Deploy
- [ ] All tests pass
- [ ] Build succeeds
- [ ] Environment variables set
- [ ] Migrations applied
- [ ] Edge Functions deployed

---

## Support Resources

- **Supabase Docs:** https://supabase.com/docs
- **React Router:** https://reactrouter.com
- **Tailwind CSS:** https://tailwindcss.com
- **Motion:** https://motion.dev

---

**Need help?** Check `/docs/NEXT_STEPS.md` for detailed guidance
