import { Plus, Mail } from 'lucide-react';
import type { TeamMember } from '../../types/projects';

interface TeamPanelProps {
  team: TeamMember[];
  onAddMember?: () => void;
}

export function TeamPanel({ team, onAddMember }: TeamPanelProps) {
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-light text-[#9B9490] uppercase tracking-wide">
          Team Members ({team.length})
        </h3>
        <button
          onClick={onAddMember}
          className="w-7 h-7 rounded-lg bg-[#E85D4A]/10 text-[#E85D4A] flex items-center justify-center hover:bg-[#E85D4A]/20 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>

      <div className="space-y-3">
        {team.map((member) => (
          <div key={member.id} className="flex items-center gap-3 group">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E85D4A]/20 to-[#F59E0B]/20 flex items-center justify-center text-sm font-light text-[#E85D4A] flex-shrink-0">
              {member.avatar || member.name.split(' ').map(n => n[0]).join('')}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-light text-[#1a1614] truncate">
                {member.name}
              </div>
              <div className="text-xs text-[#9B9490] font-light truncate">
                {member.role}
              </div>
            </div>

            {/* Email button */}
            <button 
              className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg bg-white border border-[#E8E3DD] flex items-center justify-center hover:bg-[#F5F1ED] transition-all"
              onClick={() => window.location.href = `mailto:${member.email}`}
            >
              <Mail className="w-4 h-4 text-[#6B6560]" strokeWidth={1.5} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
