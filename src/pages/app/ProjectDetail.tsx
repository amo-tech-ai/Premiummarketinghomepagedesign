import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Edit, 
  Archive, 
  Calendar, 
  TrendingUp, 
  CheckSquare,
  Target,
  Clock,
  BarChart3
} from 'lucide-react';
import { ThreePanelLayout } from '../../components/dashboard/ThreePanelLayout';
import { MilestoneTimeline } from '../../components/projects/MilestoneTimeline';
import { TaskList } from '../../components/projects/TaskList';
import { ProjectHealthCard } from '../../components/projects/ProjectHealthCard';
import { TeamPanel } from '../../components/projects/TeamPanel';
import { QuickActionsPanel } from '../../components/projects/QuickActionsPanel';
import { ActivityFeed } from '../../components/projects/ActivityFeed';
import { getMockProjectDetail, calculateDaysLeft } from '../../services/data/mockProjectDetail';
import type { ProjectDetail } from '../../types/projects';

type TabType = 'overview' | 'milestones' | 'tasks' | 'timeline';

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate('/app/projects');
      return;
    }

    loadProjectDetail(id);
  }, [id, navigate]);

  async function loadProjectDetail(projectId: string) {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const projectData = getMockProjectDetail(projectId);
      setProject(projectData);
    } catch (error) {
      console.error('Failed to load project:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleTaskComplete = (taskId: string) => {
    if (!project) return;

    setProject({
      ...project,
      tasks: project.tasks.map(task => 
        task.id === taskId 
          ? { ...task, status: 'completed', completedAt: new Date().toISOString() }
          : task
      )
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#E8E3DD] border-t-[#E85D4A] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#6B6560] font-light">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAF7F4] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Project Not Found
          </h2>
          <button
            onClick={() => navigate('/app/projects')}
            className="text-[#E85D4A] hover:text-[#d54939] transition-colors text-sm font-light"
          >
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const daysLeft = calculateDaysLeft(project.dueDate);
  const completedTasks = project.tasks.filter(t => t.status === 'completed').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-[#10B981]/10 text-[#10B981]';
      case 'on-hold':
        return 'bg-[#F59E0B]/10 text-[#F59E0B]';
      case 'completed':
        return 'bg-[#6B6560]/10 text-[#6B6560]';
      default:
        return 'bg-[#9B9490]/10 text-[#9B9490]';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[#DC2626]/10 text-[#DC2626]';
      case 'medium':
        return 'bg-[#F59E0B]/10 text-[#F59E0B]';
      default:
        return 'bg-[#9B9490]/10 text-[#9B9490]';
    }
  };

  const tabs: Array<{ id: TabType; label: string; icon: any }> = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'milestones', label: 'Milestones', icon: Target },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'timeline', label: 'Timeline', icon: BarChart3 }
  ];

  const mainPanel = (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/app/projects')}
        className="flex items-center gap-2 text-sm text-[#6B6560] hover:text-[#1a1614] transition-colors font-light"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
        Back to Projects
      </button>

      {/* Header */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-light text-[#1a1614] mb-3" style={{ fontFamily: 'Crimson Pro, serif' }}>
              {project.name}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-light uppercase ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-light uppercase ${getPriorityColor(project.priority)}`}>
                {project.priority} priority
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-light bg-[#E8E3DD] text-[#6B6560]">
                {project.type}
              </span>
            </div>
            <p className="text-[#6B6560] font-light leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-6">
            <button className="px-4 py-2 rounded-lg bg-white/60 border border-[#E8E3DD] flex items-center gap-2 hover:bg-white transition-colors">
              <Edit className="w-4 h-4 text-[#6B6560]" strokeWidth={1.5} />
              <span className="text-sm text-[#6B6560] font-light">Edit</span>
            </button>
            <button className="px-4 py-2 rounded-lg bg-white/60 border border-[#E8E3DD] flex items-center gap-2 hover:bg-white transition-colors">
              <Archive className="w-4 h-4 text-[#6B6560]" strokeWidth={1.5} />
              <span className="text-sm text-[#6B6560] font-light">Archive</span>
            </button>
          </div>
        </div>

        {/* Progress section */}
        <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6">
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div>
              <div className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-2">
                Completion
              </div>
              <div className="text-2xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
                {project.progress}%
              </div>
            </div>
            <div>
              <div className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-2">
                Due Date
              </div>
              <div className="text-sm font-light text-[#1a1614]">
                {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-2">
                Days Left
              </div>
              <div className={`text-2xl font-light ${daysLeft < 7 ? 'text-[#DC2626]' : 'text-[#1a1614]'}`} style={{ fontFamily: 'Crimson Pro, serif' }}>
                {daysLeft}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-2">
                Tasks Completed
              </div>
              <div className="text-2xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
                {completedTasks}/{project.tasks.length}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-3 bg-[#E8E3DD] rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#10B981] transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E8E3DD]">
        <div className="flex gap-6">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#E85D4A] text-[#E85D4A]'
                    : 'border-transparent text-[#9B9490] hover:text-[#6B6560]'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm font-light">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* AI Insights */}
            <div className="bg-gradient-to-br from-[#E85D4A]/5 to-[#F59E0B]/5 border border-[#E85D4A]/20 rounded-xl p-6">
              <h3 className="text-lg font-light text-[#1a1614] mb-4" style={{ fontFamily: 'Crimson Pro, serif' }}>
                AI Recommendations
              </h3>
              <div className="space-y-3">
                {project.aiInsights.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#E85D4A]/10 text-[#E85D4A] flex items-center justify-center text-xs font-light flex-shrink-0">
                      {index + 1}
                    </span>
                    <p className="text-sm text-[#6B6560] font-light leading-relaxed">
                      {rec}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Actions */}
            <div>
              <h3 className="text-lg font-light text-[#1a1614] mb-4" style={{ fontFamily: 'Crimson Pro, serif' }}>
                Next Actions
              </h3>
              <div className="space-y-3">
                {project.aiInsights.nextActions.map((action, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-lg p-4 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#E85D4A] flex-shrink-0" />
                    <p className="text-sm text-[#1a1614] font-light">
                      {action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'milestones' && (
          <MilestoneTimeline 
            milestones={project.milestones}
            onMilestoneClick={(milestone) => console.log('Clicked milestone:', milestone)}
          />
        )}

        {activeTab === 'tasks' && (
          <TaskList
            tasks={project.tasks}
            team={project.team}
            groupByMilestone
            milestones={project.milestones}
            onTaskClick={(task) => console.log('Clicked task:', task)}
            onTaskComplete={handleTaskComplete}
          />
        )}

        {activeTab === 'timeline' && (
          <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-12 text-center">
            <BarChart3 className="w-16 h-16 mx-auto mb-4 text-[#9B9490]" strokeWidth={1} />
            <h3 className="text-xl font-light text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
              Gantt Chart Timeline
            </h3>
            <p className="text-sm text-[#6B6560] font-light mb-6">
              Visual timeline with task dependencies and critical path analysis
            </p>
            <button className="px-6 py-2 bg-[#1a1614] text-white rounded-lg hover:bg-[#2a2422] transition-colors text-sm font-light">
              Coming Soon
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const rightPanel = (
    <div className="space-y-6">
      {/* Project Health */}
      <ProjectHealthCard 
        healthScore={project.aiInsights.healthScore}
        risks={project.aiInsights.risks}
      />

      {/* Team */}
      <TeamPanel 
        team={project.team}
        onAddMember={() => console.log('Add team member')}
      />

      {/* Quick Actions */}
      <QuickActionsPanel
        onAddTask={() => console.log('Add task')}
        onAddMilestone={() => console.log('Add milestone')}
        onGeneratePlan={() => console.log('Generate plan')}
        onExportReport={() => console.log('Export report')}
      />

      {/* Activity Feed */}
      <ActivityFeed activities={project.activity} />
    </div>
  );

  return <ThreePanelLayout mainPanel={mainPanel} rightPanel={rightPanel} />;
}
