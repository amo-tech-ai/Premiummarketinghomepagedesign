import { FileText, Clock } from 'lucide-react';
import type { Material } from '../../types/dashboard';

interface PitchMaterialsProps {
  materials: Material[];
  onViewMaterial: (id: string) => void;
}

export function PitchMaterials({ materials, onViewMaterial }: PitchMaterialsProps) {
  const statusConfig = {
    complete: { color: 'text-[#10B981]', bg: 'bg-[#10B981]/10' },
    in_progress: { color: 'text-[#F59E0B]', bg: 'bg-[#F59E0B]/10' },
    outdated: { color: 'text-[#E85D4A]', bg: 'bg-[#E85D4A]/10' }
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
          Pitch Materials
        </h3>
        <button className="text-xs text-[#E85D4A] hover:text-[#d54939] transition-colors font-light">
          View All →
        </button>
      </div>

      <div className="space-y-3">
        {materials.map((material) => (
          <button
            key={material.id}
            onClick={() => onViewMaterial(material.id)}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#FAF7F4] transition-colors text-left"
          >
            <div className={`w-8 h-8 rounded-lg ${statusConfig[material.status].bg} flex items-center justify-center flex-shrink-0`}>
              <FileText className={`w-4 h-4 ${statusConfig[material.status].color}`} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#1a1614] font-light truncate">{material.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <Clock className="w-3 h-3 text-[#9B9490]" strokeWidth={1.5} />
                <p className="text-xs text-[#9B9490] font-light">
                  {new Date(material.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-light capitalize ${statusConfig[material.status].bg} ${statusConfig[material.status].color}`}>
              {material.status.replace('_', ' ')}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
