import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { CheckCircle } from 'lucide-react';

export function StrategySession() {
  const { ref, isInView } = useInView();

  const inputCards = [
    'Product & customer',
    'Business model & GTM motion',
    'Runway & burn rate',
    'Fundraising stage & timeline',
    'Team size & capacity',
    '6-month goals'
  ];

  return (
    <section ref={ref} className="py-32 px-6 lg:px-16 bg-white/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Explanation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-[#E85D4A]/10 border border-[#E85D4A]/20 rounded-full">
              <span className="text-xs text-[#E85D4A] font-light">Step 1</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
              Capture your strategy{' '}
              <span className="text-[#6B6560]">(20 minutes)</span>
            </h2>
            <p className="text-lg text-[#6B6560] font-light leading-relaxed">
              StartupAI starts by understanding your startup — not guessing.
            </p>

            <div className="pt-6">
              <div className="bg-[#F5F1ED] border border-[#E8E3DD] rounded-xl p-6">
                <p className="text-sm text-[#1a1614] font-light">
                  <strong className="font-normal">This is the only setup step.</strong> Everything else is automatic.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Wizard UI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-2xl p-8 shadow-sm">
              <div className="space-y-4">
                {inputCards.map((card, index) => (
                  <motion.div
                    key={card}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white border border-[#E8E3DD] rounded-lg hover:border-[#E85D4A]/30 transition-colors"
                  >
                    <div className="w-5 h-5 bg-[#E85D4A]/10 border border-[#E85D4A]/30 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-[#E85D4A]" strokeWidth={2} />
                    </div>
                    <span className="text-sm text-[#1a1614] font-light">{card}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#E8E3DD]">
                <div className="flex gap-2">
                  <div className="flex-1 h-1 bg-[#E85D4A] rounded-full"></div>
                  <div className="flex-1 h-1 bg-[#E8E3DD] rounded-full"></div>
                  <div className="flex-1 h-1 bg-[#E8E3DD] rounded-full"></div>
                </div>
                <p className="text-xs text-[#9B9490] font-light mt-3">Step 1 of 3</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
