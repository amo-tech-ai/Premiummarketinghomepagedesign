import type { ProjectDetail, Milestone, Task, Activity } from '../../types/projects';

export function getMockProjectDetail(projectId: string): ProjectDetail {
  // For demo, return detailed data for "mvp-v1" project
  if (projectId === 'mvp-v1') {
    return {
      id: 'mvp-v1',
      name: 'MVP Development',
      description: 'Core product development focusing on essential features for initial launch. Includes user authentication, dashboard, and basic analytics.',
      status: 'active',
      type: 'internal',
      priority: 'high',
      healthScore: 78,
      progress: 65,
      startDate: '2025-01-01',
      dueDate: '2025-03-31',
      budget: 50000,
      spent: 32500,
      team: [
        {
          id: 'u1',
          name: 'Sarah Chen',
          role: 'Lead Developer',
          email: 'sarah@startup.ai',
          avatar: 'SC'
        },
        {
          id: 'u2',
          name: 'Mike Johnson',
          role: 'Frontend Engineer',
          email: 'mike@startup.ai',
          avatar: 'MJ'
        },
        {
          id: 'u3',
          name: 'Emily Davis',
          role: 'Designer',
          email: 'emily@startup.ai',
          avatar: 'ED'
        }
      ],
      tags: ['Product', 'Engineering', 'Q1 2025'],
      milestones: [
        {
          id: 'm1',
          projectId: 'mvp-v1',
          name: 'Project Setup & Architecture',
          description: 'Initialize project, setup infrastructure, define architecture',
          dueDate: '2025-01-15',
          status: 'completed',
          progress: 100,
          tasksTotal: 5,
          tasksCompleted: 5,
          order: 1
        },
        {
          id: 'm2',
          projectId: 'mvp-v1',
          name: 'Authentication & User Management',
          description: 'Build login, signup, session management, and user profiles',
          dueDate: '2025-02-01',
          status: 'completed',
          progress: 100,
          tasksTotal: 8,
          tasksCompleted: 8,
          order: 2
        },
        {
          id: 'm3',
          projectId: 'mvp-v1',
          name: 'Dashboard & Analytics',
          description: 'Core dashboard with metrics, charts, and data visualization',
          dueDate: '2025-02-20',
          status: 'in-progress',
          progress: 75,
          tasksTotal: 12,
          tasksCompleted: 9,
          order: 3
        },
        {
          id: 'm4',
          projectId: 'mvp-v1',
          name: 'API Integration & Testing',
          description: 'Third-party integrations, API development, comprehensive testing',
          dueDate: '2025-03-15',
          status: 'upcoming',
          progress: 20,
          tasksTotal: 10,
          tasksCompleted: 2,
          order: 4
        },
        {
          id: 'm5',
          projectId: 'mvp-v1',
          name: 'Production Deployment',
          description: 'Final QA, performance optimization, production deployment',
          dueDate: '2025-03-31',
          status: 'upcoming',
          progress: 0,
          tasksTotal: 6,
          tasksCompleted: 0,
          order: 5
        }
      ],
      tasks: [
        // Milestone 1 tasks (all completed)
        {
          id: 't1',
          projectId: 'mvp-v1',
          milestoneId: 'm1',
          title: 'Setup Git repository and CI/CD',
          description: 'Initialize repo, configure GitHub Actions',
          status: 'completed',
          priority: 'high',
          assigneeId: 'u1',
          dueDate: '2025-01-05',
          createdAt: '2025-01-01',
          completedAt: '2025-01-04'
        },
        {
          id: 't2',
          projectId: 'mvp-v1',
          milestoneId: 'm1',
          title: 'Define database schema',
          description: 'Design tables, relationships, indexes',
          status: 'completed',
          priority: 'high',
          assigneeId: 'u1',
          dueDate: '2025-01-08',
          createdAt: '2025-01-01',
          completedAt: '2025-01-07'
        },
        {
          id: 't3',
          projectId: 'mvp-v1',
          milestoneId: 'm1',
          title: 'Setup development environment',
          description: 'Configure local dev, Docker, environment variables',
          status: 'completed',
          priority: 'medium',
          assigneeId: 'u2',
          dueDate: '2025-01-10',
          createdAt: '2025-01-01',
          completedAt: '2025-01-09'
        },
        
        // Milestone 3 tasks (in progress)
        {
          id: 't4',
          projectId: 'mvp-v1',
          milestoneId: 'm3',
          title: 'Build main dashboard layout',
          description: 'Three-panel layout with navigation',
          status: 'completed',
          priority: 'high',
          assigneeId: 'u2',
          dueDate: '2025-02-05',
          createdAt: '2025-02-01',
          completedAt: '2025-02-04'
        },
        {
          id: 't5',
          projectId: 'mvp-v1',
          milestoneId: 'm3',
          title: 'Implement metrics cards',
          description: 'KPI cards with real-time data',
          status: 'completed',
          priority: 'high',
          assigneeId: 'u2',
          dueDate: '2025-02-10',
          createdAt: '2025-02-01',
          completedAt: '2025-02-09'
        },
        {
          id: 't6',
          projectId: 'mvp-v1',
          milestoneId: 'm3',
          title: 'Create chart components',
          description: 'Line, bar, pie charts using Recharts',
          status: 'in-progress',
          priority: 'medium',
          assigneeId: 'u2',
          dueDate: '2025-02-15',
          createdAt: '2025-02-01'
        },
        {
          id: 't7',
          projectId: 'mvp-v1',
          milestoneId: 'm3',
          title: 'Design dashboard UI/UX',
          description: 'Wireframes, mockups, user flows',
          status: 'completed',
          priority: 'high',
          assigneeId: 'u3',
          dueDate: '2025-02-08',
          createdAt: '2025-02-01',
          completedAt: '2025-02-07'
        },
        {
          id: 't8',
          projectId: 'mvp-v1',
          milestoneId: 'm3',
          title: 'Add data filtering',
          description: 'Date range, category filters',
          status: 'in-progress',
          priority: 'medium',
          assigneeId: 'u2',
          dueDate: '2025-02-18',
          createdAt: '2025-02-05'
        },
        {
          id: 't9',
          projectId: 'mvp-v1',
          milestoneId: 'm3',
          title: 'Optimize dashboard performance',
          description: 'Lazy loading, memoization, caching',
          status: 'todo',
          priority: 'medium',
          assigneeId: 'u1',
          dueDate: '2025-02-20',
          createdAt: '2025-02-10'
        },
        
        // Milestone 4 tasks (upcoming)
        {
          id: 't10',
          projectId: 'mvp-v1',
          milestoneId: 'm4',
          title: 'Integrate payment gateway',
          description: 'Stripe integration for subscriptions',
          status: 'in-progress',
          priority: 'high',
          assigneeId: 'u1',
          dueDate: '2025-03-05',
          createdAt: '2025-02-15'
        },
        {
          id: 't11',
          projectId: 'mvp-v1',
          milestoneId: 'm4',
          title: 'Setup analytics tracking',
          description: 'Google Analytics, event tracking',
          status: 'todo',
          priority: 'medium',
          assigneeId: 'u2',
          dueDate: '2025-03-08',
          createdAt: '2025-02-15'
        },
        {
          id: 't12',
          projectId: 'mvp-v1',
          milestoneId: 'm4',
          title: 'Write API documentation',
          description: 'OpenAPI spec, example requests',
          status: 'todo',
          priority: 'low',
          assigneeId: 'u1',
          dueDate: '2025-03-12',
          createdAt: '2025-02-15'
        },
        
        // Unassigned tasks
        {
          id: 't13',
          projectId: 'mvp-v1',
          title: 'Fix mobile responsive issues',
          description: 'Dashboard not rendering properly on mobile',
          status: 'todo',
          priority: 'high',
          dueDate: '2025-02-25',
          createdAt: '2025-02-12'
        }
      ],
      aiInsights: {
        healthScore: 78,
        risks: [
          'Dashboard milestone is 25% behind schedule',
          '3 high-priority tasks have no assignee',
          'Budget utilization at 65%, on track to exceed by 15%'
        ],
        recommendations: [
          'Assign mobile responsive issues to frontend engineer',
          'Consider pushing API Integration milestone by 1 week',
          'Schedule code review for dashboard components',
          'Add automated testing to reduce QA time in final milestone'
        ],
        nextActions: [
          'Complete chart components implementation',
          'Assign unassigned high-priority tasks',
          'Review budget allocation for final milestones'
        ]
      },
      activity: [
        {
          id: 'a1',
          type: 'task_completed',
          description: 'Completed "Design dashboard UI/UX"',
          userId: 'u3',
          userName: 'Emily Davis',
          timestamp: '2025-02-07T14:30:00Z'
        },
        {
          id: 'a2',
          type: 'task_completed',
          description: 'Completed "Implement metrics cards"',
          userId: 'u2',
          userName: 'Mike Johnson',
          timestamp: '2025-02-09T16:45:00Z'
        },
        {
          id: 'a3',
          type: 'comment',
          description: 'Added comment: "Charts looking good, will finish by EOW"',
          userId: 'u2',
          userName: 'Mike Johnson',
          timestamp: '2025-02-12T10:15:00Z'
        },
        {
          id: 'a4',
          type: 'member_added',
          description: 'Added Emily Davis to project team',
          userId: 'u1',
          userName: 'Sarah Chen',
          timestamp: '2025-02-01T09:00:00Z'
        }
      ]
    };
  }
  
  // Return empty project detail for unknown IDs
  return {
    id: projectId,
    name: 'Project Not Found',
    description: '',
    status: 'active',
    type: 'internal',
    priority: 'medium',
    healthScore: 0,
    progress: 0,
    startDate: '',
    dueDate: '',
    team: [],
    tags: [],
    milestones: [],
    tasks: [],
    aiInsights: {
      healthScore: 0,
      risks: [],
      recommendations: [],
      nextActions: []
    },
    activity: []
  };
}

export function calculateDaysLeft(dueDate: string): number {
  const due = new Date(dueDate);
  const now = new Date();
  const diff = due.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function getTasksByMilestone(tasks: Task[], milestoneId?: string): Task[] {
  return tasks.filter(task => task.milestoneId === milestoneId);
}
