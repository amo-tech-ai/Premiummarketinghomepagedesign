import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface PagePlaceholderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
}

export function PagePlaceholder({ icon: Icon, title, description, features }: PagePlaceholderProps) {
  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center">
      <div className="text-center max-w-2xl px-6">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#E85D4A]/10 to-[#F59E0B]/10 flex items-center justify-center">
          <Icon className="w-10 h-10 text-[#E85D4A]" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-light text-[#1a1614] mb-4" style={{ fontFamily: 'Crimson Pro, serif' }}>
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg text-[#6B6560] font-light mb-8 leading-relaxed">
          {description}
        </p>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F59E0B]/10 text-[#F59E0B] rounded-full mb-8">
          <Construction className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-sm font-light">Coming Soon</span>
        </div>

        {/* Features Preview */}
        {features && features.length > 0 && (
          <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6 mb-8">
            <h3 className="text-sm font-light text-[#9B9490] uppercase tracking-wide mb-4">
              Planned Features
            </h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-left">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E85D4A] flex-shrink-0" />
                  <span className="text-sm text-[#6B6560] font-light">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Back to Dashboard */}
        <Link
          to="/app/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1614] text-white rounded-lg hover:bg-[#2a2422] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-sm font-light">Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
