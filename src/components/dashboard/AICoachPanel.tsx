import { Sparkles, AlertTriangle } from 'lucide-react';
import type { AICoachInsights } from '../../types/dashboard';

interface AICoachPanelProps {
  insights: AICoachInsights;
}

export function AICoachPanel({ insights }: AICoachPanelProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#E85D4A]" strokeWidth={1.5} />
          <h2 className="text-lg font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            AI Coach
          </h2>
        </div>
        <p className="text-xs text-[#9B9490] font-light">
          Strategic guidance powered by AI
        </p>
      </div>

      {/* Focus Area */}
      <div className="bg-gradient-to-br from-[#E85D4A]/5 to-[#F59E0B]/5 border border-[#E85D4A]/20 rounded-xl p-5">
        <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-2">
          Focus Area
        </p>
        <p className="text-sm text-[#1a1614] font-light leading-relaxed">
          {insights.focusArea}
        </p>
      </div>

      {/* Risk Radar */}
      {insights.riskRadar.length > 0 && (
        <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-[#E85D4A]" strokeWidth={1.5} />
            <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide">
              Risk Radar
            </p>
          </div>
          <ul className="space-y-2">
            {insights.riskRadar.map((risk, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-[#1a1614] font-light">
                <span className="text-[#E85D4A] mt-1">•</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Suggested Steps */}
      {insights.suggestedSteps.length > 0 && (
        <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-5">
          <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-3">
            Suggested Steps
          </p>
          <ul className="space-y-2">
            {insights.suggestedSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-[#1a1614] font-light">
                <span className="w-5 h-5 rounded-full bg-[#E85D4A]/10 flex items-center justify-center text-xs text-[#E85D4A] flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
