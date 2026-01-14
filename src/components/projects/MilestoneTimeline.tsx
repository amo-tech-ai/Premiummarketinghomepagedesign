import { Check, Circle, AlertCircle, Clock } from 'lucide-react';
import type { Milestone } from '../../types/projects';

interface MilestoneTimelineProps {
  milestones: Milestone[];
  onMilestoneClick?: (milestone: Milestone) => void;
}

export function MilestoneTimeline({ milestones, onMilestoneClick }: MilestoneTimelineProps) {
  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order);

  const getStatusIcon = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="w-5 h-5" strokeWidth={2} />;
      case 'in-progress':
        return <Circle className="w-5 h-5 fill-current" strokeWidth={2} />;
      case 'at-risk':
        return <AlertCircle className="w-5 h-5" strokeWidth={2} />;
      default:
        return <Clock className="w-5 h-5" strokeWidth={1.5} />;
    }
  };

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'text-[#10B981] bg-[#10B981]/10';
      case 'in-progress':
        return 'text-[#E85D4A] bg-[#E85D4A]/10';
      case 'at-risk':
        return 'text-[#DC2626] bg-[#DC2626]/10';
      default:
        return 'text-[#9B9490] bg-[#9B9490]/10';
    }
  };

  const getStatusLabel = (status: Milestone['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'at-risk':
        return 'At Risk';
      default:
        return 'Upcoming';
    }
  };

  return (
    <div className="space-y-6">
      {sortedMilestones.map((milestone, index) => {
        const isLast = index === sortedMilestones.length - 1;
        const statusColor = getStatusColor(milestone.status);

        return (
          <div key={milestone.id} className="relative">
            {/* Timeline line */}
            {!isLast && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-[#E8E3DD]" />
            )}

            {/* Milestone card */}
            <div className="flex gap-4">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-full ${statusColor} flex items-center justify-center flex-shrink-0 relative z-10`}>
                {getStatusIcon(milestone.status)}
              </div>

              {/* Content */}
              <div 
                className="flex-1 bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-5 hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => onMilestoneClick?.(milestone)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-light text-[#1a1614] mb-1" style={{ fontFamily: 'Crimson Pro, serif' }}>
                      {milestone.name}
                    </h3>
                    <p className="text-sm text-[#6B6560] font-light">
                      {milestone.description}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-light ${statusColor}`}>
                    {getStatusLabel(milestone.status)}
                  </span>
                </div>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#9B9490] font-light">
                      {milestone.tasksCompleted} of {milestone.tasksTotal} tasks completed
                    </span>
                    <span className="text-xs font-light text-[#1a1614]">
                      {milestone.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#E8E3DD] rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        milestone.status === 'completed' ? 'bg-[#10B981]' :
                        milestone.status === 'at-risk' ? 'bg-[#DC2626]' :
                        'bg-[#E85D4A]'
                      }`}
                      style={{ width: `${milestone.progress}%` }}
                    />
                  </div>
                </div>

                {/* Due date */}
                <div className="flex items-center gap-2 text-xs text-[#6B6560] font-light">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                  <span>Due {new Date(milestone.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
