import { Hero } from '../components/Hero';
import { Problem } from '../components/Problem';
import { Solution } from '../components/Solution';
import { Benefits } from '../components/Benefits';
import { Features } from '../components/Features';
import { Process } from '../components/Process';
import { useEffect } from 'react';

export function HomePage() {
  useEffect(() => {
    document.title = 'StartupAI - AI Operating System for Founders';
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <Benefits />
      <Features />
      <Process />
    </div>
  );
}