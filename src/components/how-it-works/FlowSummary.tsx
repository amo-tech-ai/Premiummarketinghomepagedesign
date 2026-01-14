import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { ArrowRight } from 'lucide-react';

export function FlowSummary() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-32 px-6 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-[#1a1614] mb-6" style={{ fontFamily: 'Crimson Pro, serif' }}>
            A clear mental model
          </h2>
        </motion.div>

        {/* Flowchart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-2xl p-12 shadow-sm"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {[
              { label: 'Answer once', color: 'bg-[#E85D4A]' },
              { label: 'System runs daily', color: 'bg-[#1a1614]' },
              { label: 'You execute with confidence', color: 'bg-[#6B6560]' }
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                  className={`${step.color} px-8 py-6 rounded-xl text-white text-center shadow-sm min-w-[200px]`}
                >
                  <span className="font-light" style={{ fontFamily: 'Crimson Pro, serif' }}>
                    {step.label}
                  </span>
                </motion.div>
                {index < 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                  >
                    <ArrowRight className="w-6 h-6 text-[#E8E3DD] hidden md:block" strokeWidth={1.5} />
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Supporting Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-lg text-[#6B6560] font-light max-w-2xl mx-auto leading-relaxed">
            StartupAI removes the overhead of running a startup — so you can focus on building it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
