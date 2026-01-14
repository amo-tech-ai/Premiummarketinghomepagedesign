import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F4] px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-2xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
              StartupAI
            </h1>
          </Link>
          <h2 className="text-3xl font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Welcome back
          </h2>
          <p className="text-[#6B6560] font-light">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-8 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600">
              {error}
            </div>
          )}

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
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[#1a1614] text-white rounded-lg hover:bg-[#2a2422] transition-colors disabled:opacity-50 flex items-center justify-center gap-2 group"
          >
            {loading ? 'Signing in...' : 'Sign in'}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-sm text-[#6B6560] font-light">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#E85D4A] hover:underline">
              Sign up
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
