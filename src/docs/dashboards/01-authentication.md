# Authentication & Organization Setup

**Priority:** P0 (Critical)  
**Estimated Time:** 2 hours  
**Dependencies:** Database schema completed

---

## Goal

Implement secure authentication with:
- Email/password signup and login
- Automatic org creation on first signup
- Org context loading
- Protected routes
- Session management

---

## Success Criteria

- [x] User can sign up and auto-create org
- [x] User can log in and see dashboard
- [x] Unauthenticated users redirect to login
- [x] Org context loads on every page
- [x] Logout works and clears session

---

## Step 1: Auth Context (30 min)

### 1.1 Create auth types
```typescript
// /types/auth.ts
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
}

export interface AuthState {
  user: User | null;
  org: Organization | null;
  loading: boolean;
}
```

### 1.2 Create AuthContext
```typescript
// /contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext<AuthState & {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, orgName: string) => Promise<void>;
  signOut: () => Promise<void>;
}>({} as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  // Load session on mount
  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await loadUserAndOrg(session.user.id);
      }
    } finally {
      setLoading(false);
    }
  }

  async function loadUserAndOrg(userId: string) {
    // Fetch profile with org
    const { data: profile } = await supabase
      .from('profiles')
      .select('*, organization:organizations(*)')
      .eq('id', userId)
      .single();

    if (profile) {
      setUser({
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url
      });
      setOrg(profile.organization);
    }
  }

  async function signUp(email: string, password: string, orgName: string) {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Signup failed');

    // 2. Create organization
    const { data: org } = await supabase
      .from('organizations')
      .insert({
        name: orgName,
        slug: orgName.toLowerCase().replace(/\s+/g, '-')
      })
      .select()
      .single();

    if (!org) throw new Error('Failed to create organization');

    // 3. Create profile
    await supabase.from('profiles').insert({
      id: authData.user.id,
      org_id: org.id,
      email: authData.user.email,
      role: 'admin'
    });

    await loadUserAndOrg(authData.user.id);
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    if (data.user) {
      await loadUserAndOrg(data.user.id);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setOrg(null);
  }

  return (
    <AuthContext.Provider value={{ user, org, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

---

## Step 2: Auth Pages (40 min)

### 2.1 Login Page
```typescript
// /pages/Login.tsx
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/app/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F4] px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Welcome back
          </h1>
          <p className="text-[#6B6560] font-light mt-2">
            Sign in to your StartupAI account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-[#6B6560] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E8E3DD] rounded-lg focus:outline-none focus:border-[#E85D4A]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#6B6560] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E8E3DD] rounded-lg focus:outline-none focus:border-[#E85D4A]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#1a1614] text-white rounded-lg hover:bg-[#2a2422] transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>

          <p className="text-center text-sm text-[#6B6560]">
            Don't have an account?{' '}
            <a href="/signup" className="text-[#E85D4A] hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
```

### 2.2 Signup Page
```typescript
// /pages/Signup.tsx
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signUp(email, password, orgName);
      navigate('/app/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F4] px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Start your journey
          </h1>
          <p className="text-[#6B6560] font-light mt-2">
            Create your StartupAI account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-[#6B6560] mb-2">Company Name</label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E8E3DD] rounded-lg focus:outline-none focus:border-[#E85D4A]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#6B6560] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E8E3DD] rounded-lg focus:outline-none focus:border-[#E85D4A]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#6B6560] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E8E3DD] rounded-lg focus:outline-none focus:border-[#E85D4A]"
              minLength={6}
              required
            />
            <p className="text-xs text-[#9B9490] mt-1">Minimum 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#1a1614] text-white rounded-lg hover:bg-[#2a2422] transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <p className="text-center text-sm text-[#6B6560]">
            Already have an account?{' '}
            <a href="/login" className="text-[#E85D4A] hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
```

---

## Step 3: Protected Routes (20 min)

```typescript
// /components/ProtectedRoute.tsx
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F4]">
        <div className="text-[#6B6560]">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
```

---

## Step 4: Update App Routing (20 min)

```typescript
// /App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { Dashboard } from './pages/app/Dashboard';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected app routes */}
          <Route path="/app/*" element={
            <ProtectedRoute>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                {/* More routes coming */}
              </Routes>
            </ProtectedRoute>
          } />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

---

## Step 5: Supabase Client Setup (10 min)

```typescript
// /lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

```.env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## Completion Checklist

- [ ] AuthContext created and provides user/org
- [ ] Login page works
- [ ] Signup page creates org + profile
- [ ] Protected routes redirect when logged out
- [ ] Session persists on page reload
- [ ] Logout clears session
- [ ] Org context available throughout app

---

## Next Steps

→ Move to `/docs/dashboards/02-main-dashboard.md`
