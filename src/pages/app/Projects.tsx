import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, List, Calendar, Search } from 'lucide-react';
import { ThreePanelLayout } from '../../components/dashboard/ThreePanelLayout';
import { MetricCard } from '../../components/dashboard/MetricCard';
import { ProjectFilters, ProjectFilterState } from '../../components/projects/ProjectFilters';
import { ProjectCard } from '../../components/projects/ProjectCard';
import { ProjectInsights } from '../../components/projects/ProjectInsights';
import { getMockProjects, getProjectMetrics } from '../../services/data/mockProjects';
import { getProjectAnalysis } from '../../services/ai/projects';
import type { Project, ProjectAnalysis, ProjectMetrics } from '../../types/projects';

export function Projects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [metrics, setMetrics] = useState<ProjectMetrics | null>(null);
  const [analysis, setAnalysis] = useState<ProjectAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'timeline'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    try {
      const mockProjects = getMockProjects();
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
      
      const projectMetrics = getProjectMetrics(mockProjects);
      setMetrics(projectMetrics);

      // Load AI analysis in background
      setAnalysisLoading(true);
      const projectAnalysis = await getProjectAnalysis(mockProjects);
      setAnalysis(projectAnalysis);
      setAnalysisLoading(false);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleFilterChange(filters: ProjectFilterState) {
    let filtered = [...projects];

    if (filters.status.length > 0) {
      filtered = filtered.filter(p => filters.status.includes(p.status));
    }
    if (filters.type.length > 0) {
      filtered = filtered.filter(p => filters.type.includes(p.type));
    }
    if (filters.priority.length > 0) {
      filtered = filtered.filter(p => filters.priority.includes(p.priority));
    }
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }

  function handleSearch(query: string) {
    setSearchQuery(query);
    let filtered = [...projects];

    if (query) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }

  const leftPanelContent = (
    <ProjectFilters onFilterChange={handleFilterChange} />
  );

  const mainPanel = (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
          Project Overview
        </h1>
        <p className="text-sm text-[#6B6560] font-light">
          Manage your projects, timelines, and deliverables
        </p>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-white/60 border border-[#E8E3DD] rounded-lg p-1">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md text-sm font-light transition-colors flex items-center gap-2 ${
              viewMode === 'list' 
                ? 'bg-white text-[#1a1614] shadow-sm' 
                : 'text-[#9B9490] hover:text-[#1a1614]'
            }`}
          >
            <List className="w-4 h-4" strokeWidth={1.5} />
            List View
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 rounded-md text-sm font-light transition-colors flex items-center gap-2 ${
              viewMode === 'timeline' 
                ? 'bg-white text-[#1a1614] shadow-sm' 
                : 'text-[#9B9490] hover:text-[#1a1614]'
            }`}
          >
            <Calendar className="w-4 h-4" strokeWidth={1.5} />
            Timeline
          </button>
        </div>

        {/* New Project */}
        <button
          onClick={() => navigate('/app/projects/new')}
          className="px-4 py-2 bg-[#1a1614] text-white rounded-lg hover:bg-[#2a2422] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          <span className="text-sm font-light">New Project</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9B9490]" strokeWidth={1.5} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search projects..."
          className="w-full pl-12 pr-4 py-3 bg-white/60 border border-[#E8E3DD] rounded-lg focus:outline-none focus:border-[#E85D4A] transition-colors font-light text-sm"
        />
      </div>

      {/* Metrics */}
      {metrics && (
        <div className="grid grid-cols-4 gap-4">
          <MetricCard
            label="Overall Completion"
            value={`${metrics.overallCompletion}%`}
            colorClass="text-[#1a1614]"
          />
          <MetricCard
            label="Active Projects"
            value={metrics.activeProjects}
            colorClass="text-[#1a1614]"
          />
          <MetricCard
            label="Milestones At Risk"
            value={metrics.milestonesAtRisk}
            colorClass={metrics.milestonesAtRisk > 0 ? 'text-[#E85D4A]' : 'text-[#10B981]'}
          />
          <MetricCard
            label="Tasks Completed"
            value={metrics.tasksCompleted}
            colorClass="text-[#10B981]"
          />
        </div>
      )}

      {/* Projects List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Active Projects
          </h2>
          <span className="text-sm text-[#9B9490] font-light">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[#E8E3DD] border-t-[#E85D4A] rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[#6B6560] font-light">Loading projects...</p>
            </div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-12 text-center">
            <p className="text-[#9B9490] font-light mb-4">No projects found</p>
            <button
              onClick={() => navigate('/app/projects/new')}
              className="px-6 py-2 bg-[#1a1614] text-white rounded-lg hover:bg-[#2a2422] transition-colors text-sm font-light"
            >
              Create your first project
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={(id) => navigate(`/app/projects/${id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const rightPanel = (
    <ProjectInsights analysis={analysis} loading={analysisLoading} />
  );

  return <ThreePanelLayout leftPanelContent={leftPanelContent} mainPanel={mainPanel} rightPanel={rightPanel} />;
}