import type { NextBestAction, AICoachInsights } from '../../types/dashboard';

// Mock AI service - will be replaced with real Gemini API calls
// For now, returns intelligent mock data based on profile state

export async function getNextBestAction(
  profile: any,
  tasks: any[]
): Promise<NextBestAction> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Mock logic based on common startup scenarios
  const scenarios: NextBestAction[] = [
    {
      title: 'Update your Investor Deck',
      reason: 'Your pitch deck hasn\'t been updated in 2 weeks. Investors you met at the conference need the latest version with Q4 metrics.',
      urgency: 'high'
    },
    {
      title: 'Follow up with Sequoia intro',
      reason: 'Sarah from Sequoia requested your deck 3 days ago. Following up now increases your response rate by 47%.',
      urgency: 'high'
    },
    {
      title: 'Complete Financial Model',
      reason: 'Your runway analysis is incomplete. Having accurate projections will help you make better hiring and spending decisions.',
      urgency: 'medium'
    },
    {
      title: 'Ship Beta to First Customer',
      reason: 'Acme Corp is waiting for API access. Getting them live this week creates momentum for Q1 expansion deals.',
      urgency: 'high'
    },
    {
      title: 'Schedule Investor Check-ins',
      reason: 'It\'s been 6 weeks since your last investor update. Regular communication keeps you top of mind for intros.',
      urgency: 'medium'
    }
  ];

  // Return random scenario (in production, this would be AI-driven)
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

export async function getDashboardInsights(
  profile: any
): Promise<AICoachInsights> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));

  return {
    focusArea: 'Your fundraising momentum is strong, but execution metrics need attention. Focus on shipping product to validate your pitch story.',
    riskRadar: [
      'Runway drops below 6 months in 8 weeks',
      '2 key investor follow-ups overdue',
      'Product beta delayed by 2 weeks'
    ],
    suggestedSteps: [
      'Update investor deck with Q4 metrics',
      'Schedule check-in with top 3 leads',
      'Ship MVP to first design partner'
    ]
  };
}

// Will be implemented with real Gemini API
export async function getWorkflowSuggestions(
  workflow: string,
  profile: any
): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    'Update your target investor list',
    'Prepare warm intro requests',
    'Schedule practice pitch sessions'
  ];
}
