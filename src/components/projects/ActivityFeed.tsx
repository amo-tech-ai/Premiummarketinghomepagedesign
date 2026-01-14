import { CheckCircle2, Target, UserPlus, MessageSquare, AlertCircle } from 'lucide-react';
import type { Activity } from '../../types/projects';

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'task_completed':
        return <CheckCircle2 className="w-4 h-4 text-[#10B981]" strokeWidth={1.5} />;
      case 'milestone_added':
        return <Target className="w-4 h-4 text-[#E85D4A]" strokeWidth={1.5} />;
      case 'member_added':
        return <UserPlus className="w-4 h-4 text-[#6B6560]" strokeWidth={1.5} />;
      case 'comment':
        return <MessageSquare className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.5} />;
      default:
        return <AlertCircle className="w-4 h-4 text-[#9B9490]" strokeWidth={1.5} />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6">
      <h3 className="text-sm font-light text-[#9B9490] uppercase tracking-wide mb-4">
        Recent Activity
      </h3>

      <div className="space-y-4">
        {activities.slice(0, 5).map((activity) => (
          <div key={activity.id} className="flex gap-3">
            {/* Icon */}
            <div className="w-8 h-8 rounded-full bg-[#F5F1ED] flex items-center justify-center flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#1a1614] font-light leading-relaxed mb-1">
                {activity.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#9B9490] font-light">
                <span>{activity.userName}</span>
                <span>•</span>
                <span>{formatTimestamp(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length > 5 && (
        <button className="w-full mt-4 py-2 text-xs text-[#E85D4A] hover:text-[#d54939] transition-colors font-light">
          View all activity →
        </button>
      )}
    </div>
  );
}
