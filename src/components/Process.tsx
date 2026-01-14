import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Sparkles, LayoutDashboard, Target } from 'lucide-react';

export function Process() {
  const { ref, isInView } = useInView();

  const steps = [
    {
      number: '01',
      icon: Sparkles,
      title: 'Strategy session',
      description: 'Start with a guided conversation. Define your vision, goals, and constraints. StartupAI builds your roadmap.',
      color: 'from-[#E85D4A] to-[#D94A38]'
    },
    {
      number: '02',
      icon: LayoutDashboard,
      title: 'Daily dashboard',
      description: 'Every morning, see exactly what matters. Your priorities, fundraising status, and key decisions—all in one view.',
      color: 'from-[#6B6560] to-[#5B5550]'
    },
    {
      number: '03',
      icon: Target,
      title: 'AI coach',
      description: 'When you are stuck, ask. Get context-aware guidance on strategy, fundraising, hiring, and execution.',
      color: 'from-[#1a1614] to-[#2a2422]'
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6 lg:px-16 bg-white/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-[#1a1614] mb-6" style={{ fontFamily: 'Crimson Pro, serif' }}>
            From first input to daily momentum
          </h2>
          <p className="text-lg text-[#6B6560] font-light max-w-2xl mx-auto">
            Three steps to transform chaos into clarity.
          </p>
        </motion.div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-sm`}>
                      <step.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-white border border-[#E8E3DD] rounded-full w-10 h-10 flex items-center justify-center shadow-sm">
                      <span className="text-xs font-light text-[#6B6560]">{step.number}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white/60 backdrop-blur-sm p-8 rounded-xl border border-[#E8E3DD] shadow-sm">
                  <h3 className="text-xl font-normal text-[#1a1614] mb-3" style={{ fontFamily: 'Crimson Pro, serif' }}>{step.title}</h3>
                  <p className="text-[#6B6560] font-light leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-10 top-20 w-px h-12 bg-gradient-to-b from-[#E8E3DD] to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
