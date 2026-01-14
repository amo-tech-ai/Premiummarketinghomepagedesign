import type { Project, ProjectMetrics } from '../../types/projects';

export function getMockProjects(): Project[] {
  return [
    {
      id: 'mvp-v1',
      name: 'MVP Development',
      description: 'Core product development focusing on essential features for initial launch.',
      status: 'active',
      type: 'internal',
      priority: 'high',
      healthScore: 78,
      progress: 65,
      startDate: '2025-01-01',
      dueDate: '2025-03-31',
      team: [
        { id: 'u1', name: 'Sarah Chen', role: 'Lead Developer', avatar: 'SC', email: 'sarah@startup.ai' },
        { id: 'u2', name: 'Mike Johnson', role: 'Frontend Engineer', avatar: 'MJ', email: 'mike@startup.ai' },
        { id: 'u3', name: 'Emily Davis', role: 'Designer', avatar: 'ED', email: 'emily@startup.ai' }
      ],
      tags: ['Product', 'Engineering', 'Q1 2025'],
      budget: 50000,
      spent: 32500
    },
    {
      id: 'fundraise-seed',
      name: 'Seed Fundraising',
      description: 'Raising $2M seed round from angel investors and early-stage VCs.',
      status: 'active',
      type: 'client',
      priority: 'high',
      healthScore: 82,
      progress: 45,
      startDate: '2025-01-15',
      dueDate: '2025-04-30',
      team: [
        { id: 'u4', name: 'Alex Founder', role: 'CEO', avatar: 'AF', email: 'alex@startup.ai' },
        { id: 'u5', name: 'Jordan Kim', role: 'CFO', avatar: 'JK', email: 'jordan@startup.ai' }
      ],
      tags: ['Fundraising', 'Growth', 'Q1 2025'],
      budget: 15000,
      spent: 8500
    },
    {
      id: 'customer-research',
      name: 'Customer Discovery',
      description: 'User interviews and market research to validate product-market fit.',
      status: 'active',
      type: 'research',
      priority: 'medium',
      healthScore: 90,
      progress: 80,
      startDate: '2025-01-05',
      dueDate: '2025-02-28',
      team: [
        { id: 'u6', name: 'Taylor Swift', role: 'Product Manager', avatar: 'TS', email: 'taylor@startup.ai' }
      ],
      tags: ['Research', 'Customer Development'],
      budget: 10000,
      spent: 7800
    },
    {
      id: 'marketing-launch',
      name: 'Marketing Website',
      description: 'Design and build marketing site with landing pages and blog.',
      status: 'on-hold',
      type: 'internal',
      priority: 'low',
      healthScore: 65,
      progress: 30,
      startDate: '2025-02-01',
      dueDate: '2025-03-15',
      team: [
        { id: 'u3', name: 'Emily Davis', role: 'Designer', avatar: 'ED', email: 'emily@startup.ai' },
        { id: 'u7', name: 'Chris Lee', role: 'Content Writer', avatar: 'CL', email: 'chris@startup.ai' }
      ],
      tags: ['Marketing', 'Website'],
      budget: 20000,
      spent: 6000
    },
    {
      id: 'beta-testing',
      name: 'Beta Testing Program',
      description: 'Recruit and onboard 50 beta users for product feedback and iteration.',
      status: 'active',
      type: 'internal',
      priority: 'medium',
      healthScore: 72,
      progress: 55,
      startDate: '2025-02-10',
      dueDate: '2025-03-25',
      team: [
        { id: 'u6', name: 'Taylor Swift', role: 'Product Manager', avatar: 'TS', email: 'taylor@startup.ai' },
        { id: 'u1', name: 'Sarah Chen', role: 'Lead Developer', avatar: 'SC', email: 'sarah@startup.ai' }
      ],
      tags: ['Product', 'Testing', 'Feedback'],
      budget: 8000,
      spent: 4400
    }
  ];
}

export function getProjectMetrics(projects: Project[]): ProjectMetrics {
  const activeProjects = projects.filter(p => 
    p.status === 'active'
  ).length;

  const totalProgress = projects.reduce((sum, p) => sum + p.progress, 0);
  const overallCompletion = projects.length > 0 ? Math.round(totalProgress / projects.length) : 0;

  const milestonesAtRisk = projects.filter(p => 
    p.status === 'active' && p.healthScore < 70
  ).length;

  // For overview, we don't have actual task counts, so use dummy number
  const tasksCompleted = projects.length * 15; // Placeholder

  return {
    overallCompletion,
    activeProjects,
    milestonesAtRisk,
    tasksCompleted
  };
}