import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: number;
  suffix?: string;
  colorClass?: string;
}

export function MetricCard({ label, value, change, suffix, colorClass = 'text-[#1a1614]' }: MetricCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;
  
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6">
      <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-3">
        {label}
      </p>
      
      <div className="flex items-end justify-between">
        <div>
          <p className={`text-3xl font-light ${colorClass}`} style={{ fontFamily: 'Crimson Pro, serif' }}>
            {value}
            {suffix && <span className="text-lg ml-1 text-[#9B9490]">{suffix}</span>}
          </p>
        </div>
        
        {change !== undefined && change !== 0 && (
          <div className={`flex items-center gap-1 text-xs font-light ${
            isPositive ? 'text-[#10B981]' : isNegative ? 'text-[#E85D4A]' : 'text-[#9B9490]'
          }`}>
            {isPositive && <TrendingUp className="w-3 h-3" strokeWidth={2} />}
            {isNegative && <TrendingDown className="w-3 h-3" strokeWidth={2} />}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
}
