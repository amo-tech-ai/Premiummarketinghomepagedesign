import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F4] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-2xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
              StartupAI
            </h1>
          </Link>
          <h2 className="text-3xl font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Start your journey
          </h2>
          <p className="text-[#6B6560] font-light">
            Create your account in seconds
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-[#6B6560] mb-2 font-light">Company Name</label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E8E3DD] rounded-lg focus:outline-none focus:border-[#E85D4A] transition-colors font-light"
              placeholder="Your Startup"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#6B6560] mb-2 font-light">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E8E3DD] rounded-lg focus:outline-none focus:border-[#E85D4A] transition-colors font-light"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-[#6B6560] mb-2 font-light">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-[#E8E3DD] rounded-lg focus:outline-none focus:border-[#E85D4A] transition-colors font-light"
              placeholder="Minimum 6 characters"
              minLength={6}
              required
            />
            <p className="text-xs text-[#9B9490] mt-1 font-light">At least 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#1a1614] text-white rounded-lg hover:bg-[#2a2422] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 group"
          >
            {loading ? 'Creating account...' : 'Create account'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm text-[#6B6560] font-light">
            Already have an account?{' '}
            <Link to="/login" className="text-[#E85D4A] hover:underline">
              Sign in
            </Link>
          </p>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
