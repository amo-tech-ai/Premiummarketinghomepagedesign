import { Filter } from 'lucide-react';
import { useState } from 'react';

interface ProjectFiltersProps {
  onFilterChange: (filters: ProjectFilterState) => void;
}

export interface ProjectFilterState {
  status: string[];
  type: string[];
  priority: string[];
}

export function ProjectFilters({ onFilterChange }: ProjectFiltersProps) {
  const [filters, setFilters] = useState<ProjectFilterState>({
    status: [],
    type: [],
    priority: []
  });

  const statusOptions = [
    { value: 'in_progress', label: 'In Progress' },
    { value: 'planning', label: 'Planning' },
    { value: 'on_hold', label: 'On Hold' },
    { value: 'completed', label: 'Completed' }
  ];

  const typeOptions = [
    { value: 'internal', label: 'Internal' },
    { value: 'fundraising', label: 'Fundraising' },
    { value: 'product', label: 'Product' },
    { value: 'client', label: 'Client' }
  ];

  const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  function toggleFilter(category: keyof ProjectFilterState, value: string) {
    const newFilters = { ...filters };
    if (newFilters[category].includes(value)) {
      newFilters[category] = newFilters[category].filter(v => v !== value);
    } else {
      newFilters[category] = [...newFilters[category], value];
    }
    setFilters(newFilters);
    onFilterChange(newFilters);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-5 h-5 text-[#6B6560]" strokeWidth={1.5} />
          <h2 className="text-lg font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Filters
          </h2>
        </div>
      </div>

      {/* Status */}
      <div>
        <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-3">Status</p>
        <div className="space-y-2">
          {statusOptions.map(option => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.status.includes(option.value)}
                onChange={() => toggleFilter('status', option.value)}
                className="w-4 h-4 rounded border-[#E8E3DD] text-[#E85D4A] focus:ring-[#E85D4A]/20"
              />
              <span className="text-sm text-[#6B6560] font-light group-hover:text-[#1a1614]">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-3">Type</p>
        <div className="space-y-2">
          {typeOptions.map(option => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.type.includes(option.value)}
                onChange={() => toggleFilter('type', option.value)}
                className="w-4 h-4 rounded border-[#E8E3DD] text-[#E85D4A] focus:ring-[#E85D4A]/20"
              />
              <span className="text-sm text-[#6B6560] font-light group-hover:text-[#1a1614]">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Priority */}
      <div>
        <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-3">Priority</p>
        <div className="space-y-2">
          {priorityOptions.map(option => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.priority.includes(option.value)}
                onChange={() => toggleFilter('priority', option.value)}
                className="w-4 h-4 rounded border-[#E8E3DD] text-[#E85D4A] focus:ring-[#E85D4A]/20"
              />
              <span className="text-sm text-[#6B6560] font-light group-hover:text-[#1a1614]">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.status.length > 0 || filters.type.length > 0 || filters.priority.length > 0) && (
        <button
          onClick={() => {
            const emptyFilters = { status: [], type: [], priority: [] };
            setFilters(emptyFilters);
            onFilterChange(emptyFilters);
          }}
          className="text-sm text-[#E85D4A] hover:text-[#d54939] transition-colors font-light"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
