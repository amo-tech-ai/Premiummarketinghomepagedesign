import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { Target, TrendingUp, DollarSign, Map, CheckCircle, MessageSquare } from 'lucide-react';

export function FeaturesOverview() {
  const { ref, isInView } = useInView();

  const features = [
    {
      icon: Target,
      title: 'Intelligent Prioritization',
      description: 'AI-ranked tasks based on impact, runway, and strategic goals.'
    },
    {
      icon: TrendingUp,
      title: 'Investor Pipeline',
      description: 'Track conversations, manage intros, and never miss a follow-up.'
    },
    {
      icon: DollarSign,
      title: 'Runway Intelligence',
      description: 'Every decision informed by your current financial reality.'
    },
    {
      icon: Map,
      title: 'Roadmap Alignment',
      description: 'Daily work connects directly to quarterly milestones.'
    },
    {
      icon: CheckCircle,
      title: 'Fundraising Readiness',
      description: 'Track deck versions, metrics, and pitch preparation.'
    },
    {
      icon: MessageSquare,
      title: 'GTM Coaching',
      description: 'Context-aware guidance on sales, marketing, and growth.'
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6 lg:px-16 bg-white/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-[#1a1614] mb-6" style={{ fontFamily: 'Crimson Pro, serif' }}>
            A complete system,{' '}
            <span className="text-[#E85D4A]">not just features</span>
          </h2>
          <p className="text-lg text-[#6B6560] font-light max-w-2xl mx-auto">
            Summarize capabilities without overwhelming — emphasis on outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-8 hover:border-[#E85D4A]/30 transition-all hover:shadow-md"
            >
              <div className="w-10 h-10 bg-[#F5F1ED] rounded-lg flex items-center justify-center mb-5">
                <feature.icon className="w-5 h-5 text-[#6B6560]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-normal text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>
                {feature.title}
              </h3>
              <p className="text-sm text-[#6B6560] font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
