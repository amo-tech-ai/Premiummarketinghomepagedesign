import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User, Organization, AuthState } from '../types/auth';

// 🔓 DEVELOPMENT MODE - Set to false to re-enable auth
const DEV_MODE_BYPASS_AUTH = true;

// Mock data for development
const DEV_USER: User = {
  id: 'dev-user-123',
  email: 'founder@demo.com',
  full_name: 'Demo Founder',
  avatar_url: undefined
};

const DEV_ORG: Organization = {
  id: 'dev-org-123',
  name: 'Demo Startup',
  slug: 'demo-startup'
};

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, orgName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(DEV_MODE_BYPASS_AUTH ? DEV_USER : null);
  const [org, setOrg] = useState<Organization | null>(DEV_MODE_BYPASS_AUTH ? DEV_ORG : null);
  const [loading, setLoading] = useState(!DEV_MODE_BYPASS_AUTH);

  useEffect(() => {
    if (!DEV_MODE_BYPASS_AUTH) {
      loadSession();
    }
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
    if (DEV_MODE_BYPASS_AUTH) {
      console.log('🔓 DEV MODE: Signup bypassed');
      return;
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Signup failed');

    const { data: orgData } = await supabase
      .from('organizations')
      .insert({
        name: orgName,
        slug: orgName.toLowerCase().replace(/\s+/g, '-')
      })
      .select()
      .single();

    if (!orgData) throw new Error('Failed to create organization');

    await supabase.from('profiles').insert({
      id: authData.user.id,
      org_id: orgData.id,
      email: authData.user.email!,
      role: 'admin'
    });

    await loadUserAndOrg(authData.user.id);
  }

  async function signIn(email: string, password: string) {
    if (DEV_MODE_BYPASS_AUTH) {
      console.log('🔓 DEV MODE: Login bypassed');
      return;
    }

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
    if (DEV_MODE_BYPASS_AUTH) {
      console.log('🔓 DEV MODE: Logout bypassed');
      return;
    }

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}