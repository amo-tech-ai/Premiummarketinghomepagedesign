import { ThreePanelLayout } from '../../components/dashboard/ThreePanelLayout';
import { PagePlaceholder } from '../../components/common/PagePlaceholder';
import { CheckSquare } from 'lucide-react';

export function Tasks() {
  const mainPanel = (
    <PagePlaceholder
      icon={CheckSquare}
      title="Execution Hub"
      description="Global task management across all projects. Track priorities, manage deadlines, and get AI-powered suggestions for what to work on next."
      features={[
        'Cross-project task view',
        'Priority and deadline tracking',
        'AI task generation',
        'Bulk operations',
        'Task dependencies',
        'Time tracking (future)'
      ]}
    />
  );

  const rightPanel = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
          Task Intelligence
        </h2>
        <p className="text-sm text-[#6B6560] font-light leading-relaxed">
          AI analyzes your workload and suggests the most impactful tasks to focus on.
        </p>
      </div>

      <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-5">
        <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-3">
          Coming In Phase 2
        </p>
        <p className="text-sm text-[#6B6560] font-light">
          Expected delivery: Week of January 20, 2025
        </p>
      </div>
    </div>
  );

  return <ThreePanelLayout mainPanel={mainPanel} rightPanel={rightPanel} />;
}
