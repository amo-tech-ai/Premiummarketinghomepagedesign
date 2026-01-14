import { Zap, AlertCircle } from 'lucide-react';
import type { NextBestAction } from '../../types/dashboard';

interface NextBestActionCardProps {
  action: NextBestAction;
  onTakeAction: () => void;
}

export function NextBestActionCard({ action, onTakeAction }: NextBestActionCardProps) {
  const urgencyColors = {
    high: 'bg-[#E85D4A]',
    medium: 'bg-[#F59E0B]',
    low: 'bg-[#10B981]'
  };

  const urgencyLabels = {
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority'
  };

  return (
    <div className="bg-gradient-to-br from-[#1a1614] to-[#2a2422] rounded-xl p-8 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E85D4A]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E85D4A]/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#E85D4A]" strokeWidth={2} />
            </div>
            <div>
              <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide">
                Next Best Action
              </p>
              <div className={`inline-flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-full text-xs font-light ${urgencyColors[action.urgency]} bg-opacity-20 text-white`}>
                <div className={`w-1.5 h-1.5 rounded-full ${urgencyColors[action.urgency]}`} />
                {urgencyLabels[action.urgency]}
              </div>
            </div>
          </div>
        </div>

        {/* Action */}
        <h2 className="text-2xl font-light mb-4 leading-snug" style={{ fontFamily: 'Crimson Pro, serif' }}>
          {action.title}
        </h2>

        {/* Reason */}
        <p className="text-sm text-[#E8E3DD] font-light leading-relaxed mb-6">
          {action.reason}
        </p>

        {/* CTA */}
        <button
          onClick={onTakeAction}
          className="px-6 py-3 bg-white text-[#1a1614] rounded-lg hover:bg-[#FAF7F4] transition-colors font-light text-sm"
        >
          Take Action →
        </button>
      </div>
    </div>
  );
}
