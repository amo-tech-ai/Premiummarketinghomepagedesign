// Project Data Types

export type ProjectStatus = 'active' | 'on-hold' | 'completed' | 'archived';
export type ProjectType = 'internal' | 'client' | 'research';
export type ProjectPriority = 'high' | 'medium' | 'low';

export type MilestoneStatus = 'upcoming' | 'in-progress' | 'completed' | 'at-risk';
export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'blocked';
export type TaskPriority = 'high' | 'medium' | 'low';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  email: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  name: string;
  description: string;
  dueDate: string;
  status: MilestoneStatus;
  progress: number; // 0-100
  tasksTotal: number;
  tasksCompleted: number;
  order: number;
}

export interface Task {
  id: string;
  projectId: string;
  milestoneId?: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  dueDate?: string;
  createdAt: string;
  completedAt?: string;
  dependencies?: string[]; // task IDs
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  type: ProjectType;
  priority: ProjectPriority;
  healthScore: number; // 0-100
  progress: number; // 0-100
  startDate: string;
  dueDate: string;
  team: TeamMember[];
  tags: string[];
  budget?: number;
  spent?: number;
}

export interface ProjectDetail extends Project {
  milestones: Milestone[];
  tasks: Task[];
  aiInsights: {
    healthScore: number;
    risks: string[];
    recommendations: string[];
    nextActions: string[];
  };
  activity: Activity[];
}

export interface Activity {
  id: string;
  type: 'task_completed' | 'milestone_added' | 'member_added' | 'comment' | 'status_change';
  description: string;
  userId: string;
  userName: string;
  timestamp: string;
}

export interface ProjectMetrics {
  overallCompletion: number;
  activeProjects: number;
  milestonesAtRisk: number;
  tasksCompleted: number;
}

export interface ProjectAnalysis {
  portfolioHealth: number;
  risks: Array<{
    projectId: string;
    projectName: string;
    risk: string;
    severity: 'high' | 'medium' | 'low';
  }>;
  recommendations: string[];
}