import { HowItWorksHero } from '../components/how-it-works/HowItWorksHero';
import { StrategySession } from '../components/how-it-works/StrategySession';
import { StrategyEngine } from '../components/how-it-works/StrategyEngine';
import { DailyDashboard } from '../components/how-it-works/DailyDashboard';
import { AICoach } from '../components/how-it-works/AICoach';
import { FeaturesOverview } from '../components/how-it-works/FeaturesOverview';
import { FlowSummary } from '../components/how-it-works/FlowSummary';
import { FinalCTA } from '../components/how-it-works/FinalCTA';
import { useNavigate } from 'react-router-dom';

export function HowItWorksPage() {
  const navigate = useNavigate();
  
  return (
    <>
      <HowItWorksHero onNavigate={() => navigate('/')} />
      <StrategySession />
      <StrategyEngine />
      <DailyDashboard />
      <AICoach />
      <FeaturesOverview />
      <FlowSummary />
      <FinalCTA />
    </>
  );
}