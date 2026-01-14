import { ThreePanelLayout } from '../../components/dashboard/ThreePanelLayout';
import { PagePlaceholder } from '../../components/common/PagePlaceholder';
import { Sparkles } from 'lucide-react';

export function Wizard() {
  const mainPanel = (
    <PagePlaceholder
      icon={Sparkles}
      title="Startup Profile Wizard"
      description="Multi-step onboarding wizard to set up your startup profile, team, business model, and traction metrics. Get personalized AI recommendations based on your inputs."
      features={[
        '5-step guided wizard (Context, Team, Business, Traction, Summary)',
        'Progress tracking with auto-save',
        'AI validation and suggestions',
        'Profile completeness scoring',
        'Export to pitch deck format'
      ]}
    />
  );

  const rightPanel = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
          About This Feature
        </h2>
        <p className="text-sm text-[#6B6560] font-light leading-relaxed">
          The Startup Profile Wizard helps you systematically document your business, team, and traction to unlock personalized AI insights.
        </p>
      </div>

      <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-5">
        <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-3">
          Coming In Phase 3
        </p>
        <p className="text-sm text-[#6B6560] font-light">
          Expected delivery: Week of January 27, 2025
        </p>
      </div>
    </div>
  );

  return <ThreePanelLayout mainPanel={mainPanel} rightPanel={rightPanel} />;
}
