import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/app/Dashboard';
import { Projects } from './pages/app/Projects';
import { ProjectDetail } from './pages/app/ProjectDetail';
import { Wizard } from './pages/app/Wizard';
import { CompanyProfile } from './pages/app/CompanyProfile';
import { UserProfile } from './pages/app/UserProfile';
import { Documents } from './pages/app/Documents';
import { LeanCanvas } from './pages/app/LeanCanvas';
import { Discovery } from './pages/app/Discovery';
import { CRM } from './pages/app/CRM';
import { Tasks } from './pages/app/Tasks';
import { Settings } from './pages/app/Settings';
import { ComingSoon } from './pages/app/ComingSoon';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-[#FAF7F4] min-h-screen">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<><HomePage /><Footer /></>} />
            <Route path="/how-it-works" element={<><HowItWorksPage /><Footer /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected app routes */}
            <Route path="/app/*" element={
              <ProtectedRoute>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:id" element={<ProjectDetail />} />
                  <Route path="wizard" element={<Wizard />} />
                  <Route path="company-profile" element={<CompanyProfile />} />
                  <Route path="profile" element={<UserProfile />} />
                  <Route path="documents" element={<Documents />} />
                  <Route path="lean-canvas" element={<LeanCanvas />} />
                  <Route path="discovery" element={<Discovery />} />
                  <Route path="crm" element={<CRM />} />
                  <Route path="tasks" element={<Tasks />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
                </Routes>
              </ProtectedRoute>
            } />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}