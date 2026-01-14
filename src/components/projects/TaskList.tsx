import { CheckCircle2, Circle, AlertCircle, Clock, User } from 'lucide-react';
import type { Task, TeamMember } from '../../types/projects';

interface TaskListProps {
  tasks: Task[];
  team: TeamMember[];
  groupByMilestone?: boolean;
  milestones?: Array<{ id: string; name: string }>;
  onTaskClick?: (task: Task) => void;
  onTaskComplete?: (taskId: string) => void;
}

export function TaskList({ tasks, team, groupByMilestone, milestones, onTaskClick, onTaskComplete }: TaskListProps) {
  const getAssignee = (assigneeId?: string) => {
    return team.find(member => member.id === assigneeId);
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-[#DC2626] bg-[#DC2626]/10';
      case 'medium':
        return 'text-[#F59E0B] bg-[#F59E0B]/10';
      default:
        return 'text-[#9B9490] bg-[#9B9490]/10';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-[#10B981]" strokeWidth={2} />;
      case 'in-progress':
        return <Circle className="w-5 h-5 text-[#E85D4A] fill-current" strokeWidth={2} />;
      case 'blocked':
        return <AlertCircle className="w-5 h-5 text-[#DC2626]" strokeWidth={2} />;
      default:
        return <Circle className="w-5 h-5 text-[#9B9490]" strokeWidth={1.5} />;
    }
  };

  const TaskItem = ({ task }: { task: Task }) => {
    const assignee = getAssignee(task.assigneeId);
    const priorityColor = getPriorityColor(task.priority);

    return (
      <div 
        className="group bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer"
        onClick={() => onTaskClick?.(task)}
      >
        <div className="flex items-start gap-3">
          {/* Status icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (task.status !== 'completed') {
                onTaskComplete?.(task.id);
              }
            }}
            className="mt-0.5 hover:scale-110 transition-transform"
          >
            {getStatusIcon(task.status)}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className={`text-sm font-light ${task.status === 'completed' ? 'line-through text-[#9B9490]' : 'text-[#1a1614]'}`}>
                {task.title}
              </h4>
              <span className={`px-2 py-1 rounded text-xs font-light uppercase ${priorityColor} flex-shrink-0`}>
                {task.priority}
              </span>
            </div>

            {task.description && (
              <p className="text-xs text-[#6B6560] font-light mb-3 line-clamp-2">
                {task.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-xs text-[#9B9490] font-light">
              {/* Assignee */}
              {assignee ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#E85D4A]/10 text-[#E85D4A] flex items-center justify-center text-xs font-light">
                    {assignee.avatar || assignee.name.charAt(0)}
                  </div>
                  <span>{assignee.name}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#DC2626]">
                  <User className="w-4 h-4" strokeWidth={1.5} />
                  <span>Unassigned</span>
                </div>
              )}

              {/* Due date */}
              {task.dueDate && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" strokeWidth={1.5} />
                  <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (groupByMilestone && milestones) {
    // Group tasks by milestone
    const tasksByMilestone = milestones.map(milestone => ({
      milestone,
      tasks: tasks.filter(t => t.milestoneId === milestone.id)
    }));

    // Unassigned tasks
    const unassignedTasks = tasks.filter(t => !t.milestoneId);

    return (
      <div className="space-y-8">
        {tasksByMilestone.map(({ milestone, tasks: milestoneTasks }) => {
          if (milestoneTasks.length === 0) return null;

          return (
            <div key={milestone.id}>
              <h3 className="text-sm font-light text-[#9B9490] uppercase tracking-wide mb-4">
                {milestone.name} ({milestoneTasks.length})
              </h3>
              <div className="space-y-3">
                {milestoneTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          );
        })}

        {unassignedTasks.length > 0 && (
          <div>
            <h3 className="text-sm font-light text-[#9B9490] uppercase tracking-wide mb-4">
              Unassigned to Milestone ({unassignedTasks.length})
            </h3>
            <div className="space-y-3">
              {unassignedTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Simple list
  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
