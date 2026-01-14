import { ThreePanelLayout } from '../../components/dashboard/ThreePanelLayout';
import { PagePlaceholder } from '../../components/common/PagePlaceholder';
import { Grid3x3 } from 'lucide-react';

export function LeanCanvas() {
  const mainPanel = (
    <PagePlaceholder
      icon={Grid3x3}
      title="Lean Canvas"
      description="Interactive business model canvas with AI-powered suggestions for validating your business model and identifying gaps."
      features={[
        'Interactive 9-block canvas editor',
        'AI suggestions for each block',
        'Validation and gap analysis',
        'Export to PDF/PNG',
        'Version history and comparison'
      ]}
    />
  );

  const rightPanel = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
          AI Canvas Coach
        </h2>
        <p className="text-sm text-[#6B6560] font-light leading-relaxed">
          Get real-time AI feedback as you fill out your business model canvas.
        </p>
      </div>
    </div>
  );

  return <ThreePanelLayout mainPanel={mainPanel} rightPanel={rightPanel} />;
}
