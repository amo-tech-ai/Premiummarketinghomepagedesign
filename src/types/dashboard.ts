// Dashboard Data Types

export interface NextBestAction {
  title: string;
  reason: string;
  urgency: 'high' | 'medium' | 'low';
}

export interface DashboardMetrics {
  mrr: number;
  mrrChange: number; // percentage
  activeUsers: number;
  usersChange: number; // percentage
  runwayMonths: number;
  runwayChange: number; // percentage
  profileScore: number; // percentage
}

export interface WorkflowStatus {
  id: string;
  name: string;
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number; // 0-100
  dueDate?: string;
}

export interface Material {
  id: string;
  name: string;
  type: 'pitch_deck' | 'financial_model' | 'business_plan' | 'one_pager';
  lastUpdated: string;
  status: 'complete' | 'in_progress' | 'outdated';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: 'active' | 'pending';
}

export interface AICoachInsights {
  focusArea: string;
  riskRadar: string[];
  suggestedSteps: string[];
}

export interface DashboardData {
  nextBestAction: NextBestAction;
  metrics: DashboardMetrics;
  workflows: WorkflowStatus[];
  materials: Material[];
  team: TeamMember[];
  aiInsights: AICoachInsights;
}
