import { ThreePanelLayout } from '../../components/dashboard/ThreePanelLayout';
import { PagePlaceholder } from '../../components/common/PagePlaceholder';
import { FileText } from 'lucide-react';

export function Documents() {
  const mainPanel = (
    <PagePlaceholder
      icon={FileText}
      title="Pitch Decks & Documents"
      description="Strategic documentation hub with competitive intelligence, pitch deck management, and AI-powered insights for investor materials."
      features={[
        'Pitch deck library and version control',
        'Competitive intelligence documents',
        'Market research and analysis',
        'AI document generation',
        'Export to multiple formats'
      ]}
    />
  );

  const rightPanel = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
          AI Insights
        </h2>
        <p className="text-sm text-[#6B6560] font-light leading-relaxed">
          Get AI-powered suggestions for improving your pitch deck, competitive positioning, and market analysis.
        </p>
      </div>
    </div>
  );

  return <ThreePanelLayout mainPanel={mainPanel} rightPanel={rightPanel} />;
}
