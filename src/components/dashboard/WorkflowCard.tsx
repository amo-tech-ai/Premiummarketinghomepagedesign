import { Clock, CheckCircle2, Circle } from 'lucide-react';
import type { WorkflowStatus } from '../../types/dashboard';

interface WorkflowCardProps {
  workflow: WorkflowStatus;
  onViewWorkflow: (id: string) => void;
}

export function WorkflowCard({ workflow, onViewWorkflow }: WorkflowCardProps) {
  const statusConfig = {
    not_started: { icon: Circle, color: 'text-[#9B9490]', bg: 'bg-[#9B9490]/10' },
    in_progress: { icon: Clock, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
    completed: { icon: CheckCircle2, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' }
  };

  const config = statusConfig[workflow.status];
  const StatusIcon = config.icon;

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6 hover:border-[#E85D4A]/30 transition-colors cursor-pointer"
         onClick={() => onViewWorkflow(workflow.id)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center`}>
            <StatusIcon className={`w-5 h-5 ${config.color}`} strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-sm font-light text-[#1a1614]">{workflow.name}</h3>
            <p className="text-xs text-[#9B9490] font-light capitalize mt-0.5">
              {workflow.status.replace('_', ' ')}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9B9490] font-light">Progress</span>
          <span className="text-[#1a1614] font-light">{workflow.progress}%</span>
        </div>
        <div className="w-full h-2 bg-[#F5F1ED] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#E85D4A] to-[#F59E0B] transition-all duration-500"
            style={{ width: `${workflow.progress}%` }}
          />
        </div>
      </div>

      {workflow.dueDate && (
        <p className="text-xs text-[#9B9490] font-light mt-3">
          Due {new Date(workflow.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      )}
    </div>
  );
}
