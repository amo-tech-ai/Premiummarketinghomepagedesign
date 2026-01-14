import { ThreePanelLayout } from '../../components/dashboard/ThreePanelLayout';
import { PagePlaceholder } from '../../components/common/PagePlaceholder';
import { Briefcase } from 'lucide-react';

export function CRM() {
  const mainPanel = (
    <PagePlaceholder
      icon={Briefcase}
      title="Deals & CRM"
      description="Investor relationship management and deal pipeline tracking. Manage conversations, track progress, and get AI-powered outreach suggestions."
      features={[
        'Deal pipeline with stages',
        'Contact management',
        'Interaction timeline',
        'AI outreach suggestions',
        'Follow-up automation',
        'Email integration'
      ]}
    />
  );

  const rightPanel = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
          CRM Intelligence
        </h2>
        <p className="text-sm text-[#6B6560] font-light leading-relaxed">
          AI analyzes your conversations and suggests optimal follow-up timing and talking points.
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
