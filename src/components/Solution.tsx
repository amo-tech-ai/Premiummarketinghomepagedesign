import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { ArrowRight } from 'lucide-react';

export function Solution() {
  const { ref, isInView } = useInView();

  const steps = [
    { label: 'Strategy', color: 'bg-[#E85D4A]' },
    { label: 'Priorities', color: 'bg-[#6B6560]' },
    { label: 'Fundraising', color: 'bg-[#9B9490]' },
    { label: 'Decisions', color: 'bg-[#1a1614]' }
  ];

  return (
    <section ref={ref} className="py-32 px-6 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-[#1a1614] mb-6" style={{ fontFamily: 'Crimson Pro, serif' }}>
            StartupAI is your operating system for building and raising.
          </h2>
          <p className="text-lg text-[#6B6560] font-light max-w-2xl mx-auto leading-relaxed">
            A single, guided flow that connects your strategy to daily execution—keeping you focused, funded, and moving forward.
          </p>
        </motion.div>

        {/* System Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            {steps.map((step, index) => (
              <div key={step.label} className="flex items-center gap-4 md:gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className={`${step.color} w-28 h-28 rounded-xl flex items-center justify-center text-white shadow-sm`}>
                    <span className="font-light" style={{ fontFamily: 'Crimson Pro, serif' }}>{step.label}</span>
                  </div>
                </motion.div>
                
                {index < steps.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="hidden md:block"
                  >
                    <ArrowRight className="w-5 h-5 text-[#E8E3DD]" strokeWidth={1.5} />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-[#9B9490] font-light text-sm">
              Everything connected. Nothing forgotten.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
