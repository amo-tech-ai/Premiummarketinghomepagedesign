import type { DashboardData } from '../../types/dashboard';

// Mock dashboard data for development
// This will be replaced with real Supabase queries

export function getMockDashboardData(): DashboardData {
  return {
    nextBestAction: {
      title: 'Loading...',
      reason: 'Analyzing your startup data...',
      urgency: 'medium'
    },
    metrics: {
      mrr: 0,
      mrrChange: 0,
      activeUsers: 0,
      usersChange: 0,
      runwayMonths: 8,
      runwayChange: -5,
      profileScore: 20
    },
    workflows: [
      {
        id: 'fundraising',
        name: 'Fundraising Workflow',
        status: 'in_progress',
        progress: 35,
        dueDate: '2025-02-15'
      },
      {
        id: 'gtm',
        name: 'GTM Workflow',
        status: 'in_progress',
        progress: 60,
        dueDate: '2025-01-30'
      },
      {
        id: 'product',
        name: 'Product Roadmap',
        status: 'not_started',
        progress: 0
      }
    ],
    materials: [
      {
        id: '1',
        name: 'Series A Deck.pdf',
        type: 'pitch_deck',
        lastUpdated: '2025-01-10',
        status: 'complete'
      },
      {
        id: '2',
        name: 'Financial Model.xlsx',
        type: 'financial_model',
        lastUpdated: '2025-01-05',
        status: 'in_progress'
      },
      {
        id: '3',
        name: 'One-Pager.pdf',
        type: 'one_pager',
        lastUpdated: '2024-12-20',
        status: 'outdated'
      }
    ],
    team: [
      {
        id: '1',
        name: 'Sarah Chen',
        role: 'Co-Founder',
        status: 'active'
      },
      {
        id: '2',
        name: 'Marcus Lee',
        role: 'CTO',
        status: 'active'
      },
      {
        id: '3',
        name: 'Jessica Park',
        role: 'Head of Growth',
        status: 'pending'
      }
    ],
    aiInsights: {
      focusArea: 'Loading insights...',
      riskRadar: [],
      suggestedSteps: []
    }
  };
}
