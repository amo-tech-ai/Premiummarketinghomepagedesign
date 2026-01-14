import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';

export function StrategyEngine() {
  const { ref, isInView } = useInView();

  const nodes = [
    { label: 'Daily\nPriorities', angle: 0, color: 'bg-[#E85D4A]' },
    { label: 'Investor\nPipeline', angle: 72, color: 'bg-[#6B6560]' },
    { label: 'Decisions', angle: 144, color: 'bg-[#9B9490]' },
    { label: 'Deck &\nPlan', angle: 216, color: 'bg-[#E85D4A]/70' },
    { label: 'Tasks', angle: 288, color: 'bg-[#1a1614]' }
  ];

  return (
    <section ref={ref} className="py-32 px-6 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#1a1614]/10 border border-[#1a1614]/20 rounded-full">
            <span className="text-xs text-[#1a1614] font-light">Step 2 — Core Differentiation</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Your strategy becomes a{' '}
            <span className="text-[#E85D4A]">living system</span>
          </h2>
        </motion.div>

        {/* Central Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-2xl p-16 shadow-sm">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Central Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-[#1a1614] to-[#2a2422] rounded-full flex items-center justify-center shadow-lg"
                style={{ boxShadow: '0 0 60px rgba(232, 93, 74, 0.15)' }}
              >
                <span className="text-white text-center text-sm font-light whitespace-pre-line" style={{ fontFamily: 'Crimson Pro, serif' }}>
                  Startup{'\n'}Strategy
                </span>
              </motion.div>

              {/* Connected Nodes */}
              {nodes.map((node, index) => {
                const radius = 180;
                const x = Math.cos((node.angle - 90) * Math.PI / 180) * radius;
                const y = Math.sin((node.angle - 90) * Math.PI / 180) * radius;

                return (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                    }}
                  >
                    <div className={`${node.color} w-24 h-24 rounded-xl flex items-center justify-center text-white shadow-sm`}>
                      <span className="text-center text-xs font-light whitespace-pre-line">
                        {node.label}
                      </span>
                    </div>
                    {/* Connection Line */}
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: '200px', height: '200px' }}>
                      <line
                        x1="100"
                        y1="100"
                        x2={100 - x}
                        y2={100 - y}
                        stroke="#E8E3DD"
                        strokeWidth="1"
                        opacity="0.5"
                      />
                    </svg>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-[#6B6560] font-light max-w-2xl mx-auto">
            Every feature pulls from the same strategy — so nothing drifts or contradicts.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
