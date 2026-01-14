import { Users, ArrowRight } from 'lucide-react';
import type { Project } from '../../types/projects';

interface ProjectCardProps {
  project: Project;
  onClick: (projectId: string) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const statusColors = {
    'active': { dot: 'bg-[#F59E0B]', text: 'text-[#F59E0B]' },
    'on-hold': { dot: 'bg-[#6B7280]', text: 'text-[#6B7280]' },
    'completed': { dot: 'bg-[#10B981]', text: 'text-[#10B981]' },
    'archived': { dot: 'bg-[#9B9490]', text: 'text-[#9B9490]' }
  };

  const healthColor = 
    project.healthScore >= 80 ? 'bg-[#10B981]' :
    project.healthScore >= 60 ? 'bg-[#F59E0B]' :
    'bg-[#E85D4A]';

  const priorityBadge = {
    high: { bg: 'bg-[#E85D4A]/10', text: 'text-[#E85D4A]' },
    medium: { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]' },
    low: { bg: 'bg-[#9B9490]/10', text: 'text-[#9B9490]' }
  };

  return (
    <button
      onClick={() => onClick(project.id)}
      className="w-full bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6 hover:border-[#E85D4A]/30 hover:bg-white transition-all text-left group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          {/* Status Dot */}
          <div className={`w-3 h-3 rounded-full ${statusColors[project.status].dot} mt-1.5 flex-shrink-0`} />
          
          <div className="flex-1 min-w-0">
            {/* Project Name */}
            <h3 className="text-base font-light text-[#1a1614] mb-1 group-hover:text-[#E85D4A] transition-colors">
              {project.name}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-[#9B9490] font-light line-clamp-1">
              {project.description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-3 mt-2">
              <span className={`text-xs font-light capitalize ${statusColors[project.status].text}`}>
                {project.status.replace('_', ' ')}
              </span>
              <span className="text-xs text-[#9B9490] font-light">
                {project.type}
              </span>
              {project.dueDate && (
                <span className="text-xs text-[#9B9490] font-light">
                  Due {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Priority Badge */}
        <span className={`px-2 py-1 rounded text-xs font-light capitalize ${priorityBadge[project.priority].bg} ${priorityBadge[project.priority].text} flex-shrink-0`}>
          {project.priority}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9B9490] font-light">Progress</span>
          <span className="text-[#1a1614] font-light">{project.progress}%</span>
        </div>
        <div className="w-full h-2 bg-[#F5F1ED] rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${healthColor}`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Team Avatars */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#9B9490]" strokeWidth={1.5} />
          <div className="flex -space-x-2">
            {project.team.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E85D4A] to-[#F59E0B] flex items-center justify-center text-white text-xs font-light border-2 border-white"
                title={member.name}
              >
                {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
              </div>
            ))}
            {project.team.length > 3 && (
              <div className="w-7 h-7 rounded-full bg-[#F5F1ED] flex items-center justify-center text-[#9B9490] text-xs font-light border-2 border-white">
                +{project.team.length - 3}
              </div>
            )}
          </div>
        </div>

        {/* Health Score */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#9B9490] font-light">Health</span>
          <span className={`text-sm font-light ${project.healthScore >= 80 ? 'text-[#10B981]' : project.healthScore >= 60 ? 'text-[#F59E0B]' : 'text-[#E85D4A]'}`}>
            {project.healthScore}%
          </span>
        </div>
      </div>

      {/* Hover Arrow */}
      <div className="mt-4 pt-4 border-t border-[#E8E3DD] flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-sm text-[#E85D4A] font-light">View details</span>
        <ArrowRight className="w-4 h-4 text-[#E85D4A]" strokeWidth={1.5} />
      </div>
    </button>
  );
}