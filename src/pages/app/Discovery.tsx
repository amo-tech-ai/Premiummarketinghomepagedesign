import { ThreePanelLayout } from '../../components/dashboard/ThreePanelLayout';
import { PagePlaceholder } from '../../components/common/PagePlaceholder';
import { Search } from 'lucide-react';

export function Discovery() {
  const mainPanel = (
    <PagePlaceholder
      icon={Search}
      title="Discovery & Prospecting"
      description="AI-powered investor and contact search engine. Find the right investors, partners, and customers with intelligent match scoring."
      features={[
        'Natural language search',
        'AI match scoring and ranking',
        'Investor database with filters',
        'Export to CRM',
        'Connection path suggestions'
      ]}
    />
  );

  const rightPanel = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
          Search Tips
        </h2>
        <p className="text-sm text-[#6B6560] font-light leading-relaxed mb-4">
          Use natural language to find investors who match your criteria.
        </p>
        <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-lg p-4">
          <p className="text-xs text-[#9B9490] font-light mb-2">Example query:</p>
          <p className="text-sm text-[#1a1614] font-light italic">
            "Series A investors in fintech who invest in NYC"
          </p>
        </div>
      </div>
    </div>
  );

  return <ThreePanelLayout mainPanel={mainPanel} rightPanel={rightPanel} />;
}
