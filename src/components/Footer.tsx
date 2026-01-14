import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-[#E8E3DD] bg-white/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
              StartupAI
            </h3>
            <p className="text-sm text-[#6B6560] font-light leading-relaxed">
              The AI operating system for founders building and raising.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-normal text-[#1a1614] mb-4" style={{ fontFamily: 'Crimson Pro, serif' }}>
              Product
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/how-it-works" className="text-sm text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/app/dashboard" className="text-sm text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/app/tasks" className="text-sm text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
                  Tasks
                </Link>
              </li>
              <li>
                <Link to="/app/contacts" className="text-sm text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
                  CRM
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-normal text-[#1a1614] mb-4" style={{ fontFamily: 'Crimson Pro, serif' }}>
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-normal text-[#1a1614] mb-4" style={{ fontFamily: 'Crimson Pro, serif' }}>
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[#E8E3DD] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#9B9490] font-light">
            © 2025 StartupAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/" className="text-xs text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
              Home
            </Link>
            <Link to="/login" className="text-xs text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
              Sign in
            </Link>
            <Link to="/signup" className="text-xs text-[#6B6560] hover:text-[#E85D4A] transition-colors font-light">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}