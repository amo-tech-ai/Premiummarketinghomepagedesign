import { Sparkles, AlertTriangle, TrendingUp } from 'lucide-react';
import type { ProjectAnalysis } from '../../types/projects';

interface ProjectInsightsProps {
  analysis: ProjectAnalysis | null;
  loading: boolean;
}

export function ProjectInsights({ analysis, loading }: ProjectInsightsProps) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#E85D4A] animate-pulse" strokeWidth={1.5} />
          <h2 className="text-lg font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            AI Insights
          </h2>
        </div>
        <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6">
          <p className="text-sm text-[#9B9490] font-light">Analyzing projects...</p>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#E85D4A]" strokeWidth={1.5} />
          <h2 className="text-lg font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            AI Insights
          </h2>
        </div>
        <p className="text-xs text-[#9B9490] font-light">
          Strategic project analysis
        </p>
      </div>

      {/* Global Health */}
      <div className="bg-gradient-to-br from-[#E85D4A]/5 to-[#F59E0B]/5 border border-[#E85D4A]/20 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide">
            Portfolio Health
          </p>
          <TrendingUp className="w-4 h-4 text-[#10B981]" strokeWidth={1.5} />
        </div>
        <p className="text-4xl font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
          {analysis.globalHealth}
          <span className="text-lg text-[#9B9490] ml-1">/ 100</span>
        </p>
        <div className="w-full h-2 bg-white/50 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              analysis.globalHealth >= 80 ? 'bg-[#10B981]' :
              analysis.globalHealth >= 60 ? 'bg-[#F59E0B]' : 'bg-[#E85D4A]'
            }`}
            style={{ width: `${analysis.globalHealth}%` }}
          />
        </div>
      </div>

      {/* Risks */}
      {analysis.risks.length > 0 && (
        <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-[#E85D4A]" strokeWidth={1.5} />
            <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide">
              Active Alerts ({analysis.risks.length})
            </p>
          </div>
          <ul className="space-y-3">
            {analysis.risks.map((risk, index) => {
              const severityColors = {
                high: 'text-[#E85D4A]',
                medium: 'text-[#F59E0B]',
                low: 'text-[#9B9490]'
              };
              return (
                <li key={index} className="flex items-start gap-2">
                  <span className={`${severityColors[risk.severity]} mt-1 flex-shrink-0`}>•</span>
                  <div className="flex-1">
                    <p className="text-sm text-[#1a1614] font-light">{risk.description}</p>
                    <p className="text-xs text-[#9B9490] font-light mt-1 capitalize">
                      {risk.type} · {risk.severity} severity
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-5">
          <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-3">
            Recommendations
          </p>
          <ul className="space-y-2">
            {analysis.recommendations.slice(0, 3).map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E85D4A]/10 flex items-center justify-center text-xs text-[#E85D4A] flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-sm text-[#1a1614] font-light">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Insights */}
      {analysis.insights.length > 0 && (
        <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-5">
          <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-3">
            Key Insights
          </p>
          <ul className="space-y-2">
            {analysis.insights.slice(0, 3).map((insight, index) => (
              <li key={index} className="text-sm text-[#6B6560] font-light leading-relaxed">
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
