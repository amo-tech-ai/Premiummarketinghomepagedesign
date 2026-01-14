import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Eye, Zap, Sliders, DollarSign, CheckCircle, Boxes } from 'lucide-react';

export function Benefits() {
  const { ref, isInView } = useInView();

  const benefits = [
    {
      icon: Eye,
      title: 'Clarity',
      description: 'See the full picture. Know what matters most at every stage.'
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Make faster decisions with context and confidence.'
    },
    {
      icon: Sliders,
      title: 'Control',
      description: 'Stay in the driver seat. Adjust priorities as you learn.'
    },
    {
      icon: DollarSign,
      title: 'Runway-aware decisions',
      description: 'Every choice informed by your current financial reality.'
    },
    {
      icon: CheckCircle,
      title: 'Consistency',
      description: 'Execute on your strategy daily, not just during quarterly reviews.'
    },
    {
      icon: Boxes,
      title: 'Less tool chaos',
      description: 'One system instead of ten. Less context switching, more building.'
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
            What changes when you have a{' '}
            <span className="text-[#E85D4A]">single source of truth</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group bg-white/60 backdrop-blur-sm p-8 rounded-xl border border-[#E8E3DD] hover:border-[#E85D4A]/30 transition-all shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 bg-[#F5F1ED] rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#E85D4A]/10 transition-colors">
                <benefit.icon className="w-5 h-5 text-[#6B6560] group-hover:text-[#E85D4A] transition-colors" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-normal text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>{benefit.title}</h3>
              <p className="text-[#6B6560] font-light leading-relaxed text-sm">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
