import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

// 🔓 DEVELOPMENT MODE - Set to false to re-enable auth
const DEV_MODE_BYPASS_AUTH = true;

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  // 🔓 Development bypass - skip all auth checks
  if (DEV_MODE_BYPASS_AUTH) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F4]">
        <div className="text-[#6B6560] text-lg font-light">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}