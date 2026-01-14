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
