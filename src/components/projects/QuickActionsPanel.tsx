import { Plus, Target, Sparkles, FileText } from 'lucide-react';

interface QuickActionsPanelProps {
  onAddTask?: () => void;
  onAddMilestone?: () => void;
  onGeneratePlan?: () => void;
  onExportReport?: () => void;
}

export function QuickActionsPanel({ onAddTask, onAddMilestone, onGeneratePlan, onExportReport }: QuickActionsPanelProps) {
  const actions = [
    {
      label: 'Add Task',
      icon: Plus,
      onClick: onAddTask,
      color: 'bg-[#E85D4A]/10 text-[#E85D4A] hover:bg-[#E85D4A]/20'
    },
    {
      label: 'Add Milestone',
      icon: Target,
      onClick: onAddMilestone,
      color: 'bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20'
    },
    {
      label: 'Generate Plan',
      icon: Sparkles,
      onClick: onGeneratePlan,
      color: 'bg-[#F59E0B]/10 text-[#F59E0B] hover:bg-[#F59E0B]/20'
    },
    {
      label: 'Export Report',
      icon: FileText,
      onClick: onExportReport,
      color: 'bg-[#6B6560]/10 text-[#6B6560] hover:bg-[#6B6560]/20'
    }
  ];

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6">
      <h3 className="text-sm font-light text-[#9B9490] uppercase tracking-wide mb-4">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={action.onClick}
              className={`flex flex-col items-center gap-2 p-4 rounded-lg transition-colors ${action.color}`}
            >
              <Icon className="w-5 h-5" strokeWidth={1.5} />
              <span className="text-xs font-light">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
