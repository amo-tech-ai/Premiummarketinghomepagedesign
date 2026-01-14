import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { Sparkles } from 'lucide-react';

export function AICoach() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-32 px-6 lg:px-16">
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
              <span className="text-xs text-[#E85D4A] font-light">Step 4</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
              Make better decisions,{' '}
              <span className="text-[#E85D4A]">faster</span>
            </h2>

            <div className="bg-[#F5F1ED] border border-[#E8E3DD] rounded-xl p-6">
              <p className="text-sm text-[#1a1614] font-light">
                <strong className="font-normal">Not generic advice.</strong> Decisions based on your numbers.
              </p>
            </div>
          </motion.div>

          {/* Right - Conversational UI */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-2xl p-8 shadow-sm">
              {/* User Prompt */}
              <div className="mb-6">
                <div className="bg-[#1a1614] text-white rounded-xl p-4">
                  <p className="text-sm font-light">
                    Should we take this enterprise deal or ship the API first?
                  </p>
                </div>
              </div>

              {/* AI Response */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#E85D4A] to-[#D94A38] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="bg-white border border-[#E8E3DD] rounded-lg p-4">
                      <p className="text-sm text-[#1a1614] font-normal mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
                        Recommendation: Ship the API first
                      </p>
                      <p className="text-sm text-[#6B6560] font-light leading-relaxed">
                        With 4 months runway and no committed enterprise revenue, velocity matters more than a single deal.
                      </p>
                    </div>

                    <div className="bg-white border border-[#E8E3DD] rounded-lg p-4">
                      <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-2">Reasoning</p>
                      <ul className="space-y-2">
                        {[
                          'API unlocks 3 more customers in pipeline',
                          'Enterprise deal has 8-week sales cycle',
                          'Current burn rate: $40k/month'
                        ].map((reason, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-[#6B6560] font-light">
                            <span className="text-[#E85D4A] mt-0.5">•</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#F5F1ED] border border-[#E8E3DD] rounded-lg p-4">
                      <p className="text-xs text-[#9B9490] font-light uppercase tracking-wide mb-2">Action Plan</p>
                      <p className="text-sm text-[#1a1614] font-light">
                        Ship API by Friday. Keep enterprise lead warm with bi-weekly updates.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
