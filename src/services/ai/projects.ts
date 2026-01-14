import type { Project, ProjectAnalysis, ProjectRisk } from '../../types/projects';

// Mock AI service for project analysis
// Will be replaced with real Gemini API calls

export async function getProjectAnalysis(
  projects: Project[]
): Promise<ProjectAnalysis> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Calculate global health (weighted average)
  const activeProjects = projects.filter(p => p.status === 'in_progress');
  const totalHealth = activeProjects.reduce((sum, p) => sum + (p.health || 0), 0);
  const globalHealth = activeProjects.length > 0 
    ? Math.round(totalHealth / activeProjects.length) 
    : 100;

  // Mock project scores (in real app, Gemini calculates these)
  const projectScores: Record<string, number> = {};
  projects.forEach(project => {
    projectScores[project.id] = project.health;
  });

  // Generate insights
  const insights = [
    'Series A Fundraising is progressing well but needs updated financials',
    'MVP AI Agent is at risk due to technical complexity - consider breaking into smaller milestones',
    'GTM Launch is on track for January completion',
    'Resource allocation is imbalanced - Sarah Chen is overcommitted on 3 high-priority projects'
  ];

  // Generate recommendations
  const recommendations = [
    'Prioritize completing MVP before expanding investor pipeline',
    'Add 1-2 engineering resources to accelerate AI Agent development',
    'Update Series A deck with Q4 metrics by end of week',
    'Redistribute Sarah\'s workload to prevent bottlenecks'
  ];

  // Identify risks
  const risks: ProjectRisk[] = [
    {
      projectId: 'proj-2',
      severity: 'medium',
      type: 'timeline',
      description: 'MVP AI Agent is 2 weeks behind schedule due to API integration complexity'
    },
    {
      projectId: 'proj-1',
      severity: 'low',
      type: 'dependency',
      description: 'Fundraising deck needs updated financials before next investor meeting'
    },
    {
      projectId: 'proj-4',
      severity: 'medium',
      type: 'resource',
      description: 'Only 1 person assigned - needs backup for continuity'
    }
  ];

  return {
    globalHealth,
    insights,
    projectScores,
    recommendations,
    risks
  };
}

export async function suggestProjectTasks(
  project: Project
): Promise<string[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Mock task suggestions based on project type
  const taskSuggestions: Record<string, string[]> = {
    fundraising: [
      'Update pitch deck with Q4 metrics',
      'Schedule intro calls with warm leads',
      'Prepare data room documentation',
      'Draft term sheet negotiation strategy',
      'Plan investor update cadence'
    ],
    product: [
      'Define API endpoints and data models',
      'Build authentication flow',
      'Implement core feature MVP',
      'Write unit tests for critical paths',
      'Deploy to staging environment'
    ],
    internal: [
      'Set up project tracking system',
      'Define success metrics and KPIs',
      'Schedule weekly team check-ins',
      'Document process workflows',
      'Create risk mitigation plan'
    ],
    client: [
      'Kick-off meeting with stakeholders',
      'Gather requirements and scope',
      'Create project timeline',
      'Weekly status updates',
      'Final deliverable review'
    ]
  };

  return taskSuggestions[project.type] || taskSuggestions.internal;
}
