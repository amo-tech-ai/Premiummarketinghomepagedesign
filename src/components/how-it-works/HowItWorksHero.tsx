import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HowItWorksHeroProps {
  onNavigate: () => void;
}

export function HowItWorksHero({ onNavigate }: HowItWorksHeroProps) {
  return (
    <section className="min-h-[90vh] flex items-center px-6 lg:px-16 py-20">
      <div className="max-w-6xl mx-auto w-full">
        {/* Back Link */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={onNavigate}
          className="flex items-center gap-2 text-[#6B6560] hover:text-[#E85D4A] transition-colors mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-light">Back to home</span>
        </motion.button>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center space-y-8"
        >
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-light leading-tight text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
              How StartupAI works
            </h1>
            <p className="text-xl text-[#6B6560] font-light max-w-3xl mx-auto leading-relaxed">
              From one strategy session to daily execution and fundraising momentum — all in one guided system.
            </p>
          </div>

          {/* System Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-12"
          >
            <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-2xl p-12 shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                {[
                  { label: 'Strategy\nSession', color: 'bg-[#E85D4A]' },
                  { label: 'Strategy\nEngine', color: 'bg-[#1a1614]' },
                  { label: 'Daily\nDashboard', color: 'bg-[#6B6560]' },
                  { label: 'Execution', color: 'bg-[#9B9490]' },
                  { label: 'Fundraising\nProgress', color: 'bg-[#E85D4A]/70' }
                ].map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`${step.color} w-32 h-32 rounded-xl flex items-center justify-center text-white shadow-sm`}>
                      <span className="text-center text-sm font-light whitespace-pre-line" style={{ fontFamily: 'Crimson Pro, serif' }}>
                        {step.label}
                      </span>
                    </div>
                    {index < 4 && (
                      <ArrowRight className="hidden md:block w-5 h-5 text-[#E8E3DD]" strokeWidth={1.5} />
                    )}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-[#9B9490] font-light mt-8">
                End-to-end system flow — thin lines, soft curves, central emphasis on Strategy Engine
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}