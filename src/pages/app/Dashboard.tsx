import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ThreePanelLayout } from '../../components/dashboard/ThreePanelLayout';
import { CoreVitals } from '../../components/dashboard/CoreVitals';
import { NextBestActionCard } from '../../components/dashboard/NextBestActionCard';
import { MetricCard } from '../../components/dashboard/MetricCard';
import { WorkflowCard } from '../../components/dashboard/WorkflowCard';
import { PitchMaterials } from '../../components/dashboard/PitchMaterials';
import { TeamAvailability } from '../../components/dashboard/TeamAvailability';
import { AICoachPanel } from '../../components/dashboard/AICoachPanel';
import { getMockDashboardData } from '../../services/data/mockData';
import { getNextBestAction, getDashboardInsights } from '../../services/ai/dashboard';
import type { DashboardData } from '../../types/dashboard';
import { Bell, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { user, org } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData>(getMockDashboardData());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    setLoading(true);
    
    try {
      // Start with mock data
      const mockData = getMockDashboardData();
      setData(mockData);

      // Load AI insights in parallel
      const [nba, insights] = await Promise.all([
        getNextBestAction(null, []),
        getDashboardInsights(null)
      ]);

      // Update with AI data
      setData(prev => ({
        ...prev,
        nextBestAction: nba,
        aiInsights: insights
      }));
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  }

  const leftPanelContent = (
    <CoreVitals 
      runwayMonths={data.metrics.runwayMonths}
      profileScore={data.metrics.profileScore}
    />
  );

  const mainPanel = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-[#1a1614] mb-1" style={{ fontFamily: 'Crimson Pro, serif' }}>
            {org?.name || 'My Startup'}
          </h1>
          <p className="text-sm text-[#6B6560] font-light">
            Your startup command center
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-lg bg-white/60 border border-[#E8E3DD] flex items-center justify-center hover:bg-white transition-colors">
            <Bell className="w-5 h-5 text-[#6B6560]" strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => navigate('/app/profile')}
            className="px-4 py-2 rounded-lg bg-white/60 border border-[#E8E3DD] flex items-center gap-2 hover:bg-white transition-colors"
          >
            <Settings className="w-4 h-4 text-[#6B6560]" strokeWidth={1.5} />
            <span className="text-sm text-[#6B6560] font-light">Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Next Best Action */}
      <NextBestActionCard 
        action={data.nextBestAction}
        onTakeAction={() => console.log('Take action clicked')}
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard
          label="MRR"
          value={data.metrics.mrr === 0 ? '$0' : `$${data.metrics.mrr.toLocaleString()}`}
          change={data.metrics.mrrChange}
          colorClass="text-[#1a1614]"
        />
        <MetricCard
          label="Active Users"
          value={data.metrics.activeUsers}
          change={data.metrics.usersChange}
          colorClass="text-[#1a1614]"
        />
        <MetricCard
          label="Runway"
          value={data.metrics.runwayMonths}
          suffix="Mo"
          change={data.metrics.runwayChange}
          colorClass={data.metrics.runwayMonths > 6 ? 'text-[#10B981]' : 'text-[#E85D4A]'}
        />
        <MetricCard
          label="Profile Score"
          value={`${data.metrics.profileScore}%`}
          colorClass="text-[#1a1614]"
        />
      </div>

      {/* Active Workflows */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Active Workflows
          </h2>
          <button className="text-sm text-[#E85D4A] hover:text-[#d54939] transition-colors font-light">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {data.workflows.slice(0, 2).map((workflow) => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              onViewWorkflow={(id) => navigate(`/app/workflows/${id}`)}
            />
          ))}
        </div>
      </div>

      {/* Materials & Team */}
      <div className="grid grid-cols-2 gap-6">
        <PitchMaterials
          materials={data.materials}
          onViewMaterial={(id) => console.log('View material:', id)}
        />
        <TeamAvailability
          team={data.team}
          onManageTeam={() => navigate('/app/team')}
        />
      </div>
    </div>
  );

  const rightPanel = (
    <AICoachPanel insights={data.aiInsights} />
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#E8E3DD] border-t-[#E85D4A] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#6B6560] font-light">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return <ThreePanelLayout leftPanelContent={leftPanelContent} mainPanel={mainPanel} rightPanel={rightPanel} />;
}