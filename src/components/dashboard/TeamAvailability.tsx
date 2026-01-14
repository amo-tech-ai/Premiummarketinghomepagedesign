import { Users, UserPlus } from 'lucide-react';
import type { TeamMember } from '../../types/dashboard';

interface TeamAvailabilityProps {
  team: TeamMember[];
  onManageTeam: () => void;
}

export function TeamAvailability({ team, onManageTeam }: TeamAvailabilityProps) {
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#1a1614]" strokeWidth={1.5} />
          <h3 className="text-base font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Team
          </h3>
        </div>
        <button
          onClick={onManageTeam}
          className="text-xs text-[#E85D4A] hover:text-[#d54939] transition-colors font-light"
        >
          Manage →
        </button>
      </div>

      <div className="space-y-3">
        {team.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E85D4A] to-[#F59E0B] flex items-center justify-center text-white text-sm font-light">
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#1a1614] font-light">{member.name}</p>
              <p className="text-xs text-[#9B9490] font-light">{member.role}</p>
            </div>
            <div className={`w-2 h-2 rounded-full ${member.status === 'active' ? 'bg-[#10B981]' : 'bg-[#9B9490]'}`} />
          </div>
        ))}

        <button
          onClick={onManageTeam}
          className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-[#E8E3DD] rounded-lg hover:border-[#E85D4A]/30 hover:bg-[#E85D4A]/5 transition-colors text-[#9B9490] hover:text-[#E85D4A]"
        >
          <UserPlus className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-sm font-light">Invite Member</span>
        </button>
      </div>
    </div>
  );
}
