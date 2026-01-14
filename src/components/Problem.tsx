import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Brain, TrendingDown, Clock } from 'lucide-react';

export function Problem() {
  const { ref, isInView } = useInView();

  const problems = [
    {
      icon: Brain,
      title: 'Decision fatigue',
      description: 'Every day brings a hundred choices with incomplete information and limited time.'
    },
    {
      icon: TrendingDown,
      title: 'Fundraising drift',
      description: 'Pitching and building pull you in opposite directions. Focus scatters.'
    },
    {
      icon: Clock,
      title: 'Runway pressure',
      description: 'The clock ticks. You need clarity on what matters most, right now.'
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-[#1a1614] mb-6" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Founders dont fail because of effort.{' '}
            <span className="text-[#6B6560]">They fail from scattered execution.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/60 backdrop-blur-sm p-10 rounded-xl border border-[#E8E3DD] shadow-sm"
            >
              <div className="w-10 h-10 bg-[#F5F1ED] rounded-lg flex items-center justify-center mb-5">
                <problem.icon className="w-5 h-5 text-[#6B6560]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-normal text-[#1a1614] mb-3" style={{ fontFamily: 'Crimson Pro, serif' }}>{problem.title}</h3>
              <p className="text-[#6B6560] font-light leading-relaxed text-sm">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
