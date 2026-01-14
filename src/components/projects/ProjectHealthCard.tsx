import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface ProjectHealthCardProps {
  healthScore: number;
  risks: string[];
}

export function ProjectHealthCard({ healthScore, risks }: ProjectHealthCardProps) {
  const getHealthColor = (score: number) => {
    if (score >= 80) return { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]', border: 'border-[#10B981]/20' };
    if (score >= 60) return { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', border: 'border-[#F59E0B]/20' };
    return { bg: 'bg-[#DC2626]/10', text: 'text-[#DC2626]', border: 'border-[#DC2626]/20' };
  };

  const getHealthLabel = (score: number) => {
    if (score >= 80) return 'Healthy';
    if (score >= 60) return 'Fair';
    return 'At Risk';
  };

  const colors = getHealthColor(healthScore);

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-light text-[#9B9490] uppercase tracking-wide">
          Project Health
        </h3>
        {healthScore >= 70 ? (
          <TrendingUp className="w-5 h-5 text-[#10B981]" strokeWidth={1.5} />
        ) : (
          <TrendingDown className="w-5 h-5 text-[#DC2626]" strokeWidth={1.5} />
        )}
      </div>

      {/* Health score */}
      <div className="flex items-baseline gap-3">
        <div className={`text-5xl font-light ${colors.text}`} style={{ fontFamily: 'Crimson Pro, serif' }}>
          {healthScore}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-[#6B6560] font-light">/ 100</span>
          <span className={`text-xs font-light ${colors.text}`}>
            {getHealthLabel(healthScore)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-[#E8E3DD] rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-500 ${colors.text.replace('text-', 'bg-')}`}
          style={{ width: `${healthScore}%` }}
        />
      </div>

      {/* Risks */}
      {risks.length > 0 && (
        <div className="pt-4 border-t border-[#E8E3DD]">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.5} />
            <h4 className="text-xs font-light text-[#9B9490] uppercase tracking-wide">
              Active Risks ({risks.length})
            </h4>
          </div>
          <div className="space-y-2">
            {risks.slice(0, 3).map((risk, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] flex-shrink-0 mt-1.5" />
                <p className="text-xs text-[#6B6560] font-light leading-relaxed">
                  {risk}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
