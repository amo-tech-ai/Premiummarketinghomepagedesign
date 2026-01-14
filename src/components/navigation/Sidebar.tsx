import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  Building2,
  User,
  FileText,
  Grid3x3,
  Search,
  Briefcase,
  CheckSquare,
  Settings,
  LogOut
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
  icon: LucideIcon;
  section: 'platform' | 'workspace';
}

const menuItems: MenuItem[] = [
  { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard, section: 'platform' },
  { label: 'Projects', path: '/app/projects', icon: FolderKanban, section: 'platform' },
  { label: 'Startup Profile', path: '/app/wizard', icon: Sparkles, section: 'platform' },
  { label: 'Edit Company', path: '/app/company-profile', icon: Building2, section: 'platform' },
  { label: 'User Profile', path: '/app/profile', icon: User, section: 'platform' },
  { label: 'Pitch Decks', path: '/app/documents', icon: FileText, section: 'platform' },
  { label: 'Lean Canvas', path: '/app/lean-canvas', icon: Grid3x3, section: 'platform' },
  { label: 'Discovery', path: '/app/discovery', icon: Search, section: 'platform' },
  { label: 'Deals', path: '/app/crm', icon: Briefcase, section: 'platform' },
  { label: 'Execution', path: '/app/tasks', icon: CheckSquare, section: 'platform' },
  { label: 'Settings', path: '/app/settings', icon: Settings, section: 'workspace' }
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, org, signOut } = useAuth();

  const platformItems = menuItems.filter(item => item.section === 'platform');
  const workspaceItems = menuItems.filter(item => item.section === 'workspace');

  const isActive = (path: string) => {
    if (path === '/app/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="w-60 min-h-screen bg-white border-r border-[#E8E3DD] p-6 flex flex-col sticky top-0">
      {/* Logo */}
      <div className="mb-8">
        <Link to="/app/dashboard">
          <h1 className="text-lg font-light text-[#1a1614] mb-1" style={{ fontFamily: 'Crimson Pro, serif' }}>
            StartupAI
          </h1>
          <p className="text-xs text-[#9B9490] font-light">Operating System v14</p>
        </Link>
      </div>

      {/* Platform Section */}
      <nav className="flex-1 space-y-6">
        <div>
          <h2 className="text-xs uppercase tracking-wide text-[#9B9490] font-light mb-3 px-3">
            Platform
          </h2>
          <div className="space-y-1">
            {platformItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-[#E85D4A]/10 text-[#E85D4A]'
                      : 'text-[#6B6560] hover:text-[#1a1614] hover:bg-[#F5F1ED]'
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm font-light">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Workspace Section */}
        <div>
          <h2 className="text-xs uppercase tracking-wide text-[#9B9490] font-light mb-3 px-3">
            Workspace
          </h2>
          <div className="space-y-1">
            {workspaceItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-[#E85D4A]/10 text-[#E85D4A]'
                      : 'text-[#6B6560] hover:text-[#1a1614] hover:bg-[#F5F1ED]'
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  <span className="text-sm font-light">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Footer */}
      <div className="pt-6 border-t border-[#E8E3DD] space-y-3">
        <div className="px-3">
          <p className="text-sm font-light text-[#1a1614]">
            {user?.full_name || 'Demo Founder'}
          </p>
          <p className="text-xs text-[#9B9490] font-light">
            {org?.name || 'Demo Startup'}
          </p>
        </div>
        
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#6B6560] hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-sm font-light">Sign out</span>
        </button>
      </div>
    </div>
  );
}
