import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { ArrowRight, Target, TrendingUp, MessageSquare, Calendar, FileText, LineChart } from 'lucide-react';

export function Features() {
  const { ref, isInView } = useInView();

  const features = [
    {
      icon: Target,
      title: 'Strategic roadmap',
      description: 'Your vision translated into actionable milestones and quarterly goals.'
    },
    {
      icon: TrendingUp,
      title: 'Fundraising tracker',
      description: 'Investor pipeline, pitch status, and deck versioning in one place.'
    },
    {
      icon: MessageSquare,
      title: 'AI decision assistant',
      description: 'Ask questions. Get context-aware advice based on your strategy and data.'
    },
    {
      icon: Calendar,
      title: 'Priority planner',
      description: 'Weekly and daily priorities that ladder up to your strategic goals.'
    },
    {
      icon: FileText,
      title: 'Meeting briefs',
      description: 'Auto-generated prep for investor meetings, customer calls, and 1:1s.'
    },
    {
      icon: LineChart,
      title: 'Metrics dashboard',
      description: 'Track what matters: MRR, runway, hiring pipeline, and custom KPIs.'
    }
  ];

  return (
    <section ref={ref} id="features" className="py-32 px-6 lg:px-16 bg-white/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-[#1a1614] mb-6" style={{ fontFamily: 'Crimson Pro, serif' }}>
            A complete operating system for founders
          </h2>
          <p className="text-lg text-[#6B6560] font-light max-w-2xl mx-auto">
            Features designed to keep you focused, funded, and moving forward.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-white/60 backdrop-blur-sm p-8 rounded-xl border border-[#E8E3DD] hover:shadow-md transition-shadow"
            >
              <div className="w-9 h-9 bg-[#F5F1ED] rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-4 h-4 text-[#6B6560]" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-normal text-[#1a1614] mb-2" style={{ fontFamily: 'Crimson Pro, serif' }}>{feature.title}</h3>
              <p className="text-[#6B6560] font-light text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center bg-gradient-to-br from-[#1a1614] to-[#2a2422] rounded-2xl p-16 shadow-lg"
        >
          <h3 className="text-3xl lg:text-4xl font-light text-white mb-6" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Ready to align your strategy and execution?
          </h3>
          <p className="text-base text-[#E8E3DD] font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            Start with a 15-minute strategy session. See your roadmap, priorities, and next steps in one clear view.
          </p>
          <button className="px-10 py-4 bg-white text-[#1a1614] rounded-md hover:bg-[#FAF7F4] transition-colors font-normal flex items-center gap-2 mx-auto group shadow-sm">
            Start the Strategy Session
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-[#9B9490] font-light mt-6">
            No credit card required • 14-day free trial
          </p>
        </motion.div>
      </div>
    </section>
  );
}
