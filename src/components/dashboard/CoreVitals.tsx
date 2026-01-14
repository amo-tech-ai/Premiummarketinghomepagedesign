import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface CoreVitalsProps {
  runwayMonths: number;
  profileScore: number;
}

export function CoreVitals({ runwayMonths, profileScore }: CoreVitalsProps) {
  const runwayStatus = runwayMonths > 6 ? 'healthy' : runwayMonths > 3 ? 'warning' : 'critical';
  const profileStatus = profileScore > 70 ? 'healthy' : profileScore > 40 ? 'warning' : 'critical';

  const statusConfig = {
    healthy: { icon: CheckCircle2, color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
    warning: { icon: Clock, color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
    critical: { icon: AlertCircle, color: 'text-[#E85D4A]', bg: 'bg-[#E85D4A]/10' }
  };

  const RunwayIcon = statusConfig[runwayStatus].icon;
  const ProfileIcon = statusConfig[profileStatus].icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-light text-[#1a1614] mb-1" style={{ fontFamily: 'Crimson Pro, serif' }}>
          Core Vitals
        </h2>
        <p className="text-xs text-[#9B9490] font-light">
          Health checks
        </p>
      </div>

      {/* Runway Status */}
      <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-8 h-8 rounded-lg ${statusConfig[runwayStatus].bg} flex items-center justify-center`}>
            <RunwayIcon className={`w-4 h-4 ${statusConfig[runwayStatus].color}`} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-[#9B9490] font-light">Runway</p>
          </div>
        </div>
        <p className="text-2xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
          {runwayMonths} <span className="text-sm text-[#9B9490]">months</span>
        </p>
      </div>

      {/* Profile Completeness */}
      <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-8 h-8 rounded-lg ${statusConfig[profileStatus].bg} flex items-center justify-center`}>
            <ProfileIcon className={`w-4 h-4 ${statusConfig[profileStatus].color}`} strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-xs text-[#9B9490] font-light">Profile</p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            {profileScore}%
          </p>
          <div className="w-full h-1.5 bg-[#F5F1ED] rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                profileStatus === 'healthy' ? 'bg-[#10B981]' : 
                profileStatus === 'warning' ? 'bg-[#F59E0B]' : 'bg-[#E85D4A]'
              }`}
              style={{ width: `${profileScore}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
