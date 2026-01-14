import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { Target, Users, AlertTriangle } from 'lucide-react';

export function DailyDashboard() {
  const { ref, isInView } = useInView();

  const explanationCards = [
    {
      icon: Target,
      title: 'Priorities ranked by impact',
      description: 'Based on runway, goals, and deadlines.'
    },
    {
      icon: Users,
      title: 'Fundraising actions surfaced',
      description: 'Never miss a follow-up or warm intro.'
    },
    {
      icon: AlertTriangle,
      title: 'Risks flagged early',
      description: 'Before they cost weeks of runway.'
    }
  ];

  return (
    <section ref={ref} className="py-32 px-6 lg:px-16 bg-white/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-2xl p-8 shadow-sm">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-[#E8E3DD]">
                <div>
                  <h4 className="text-sm font-normal text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
                    Today's Dashboard
                  </h4>
                  <p className="text-xs text-[#9B9490] font-light mt-1">Tuesday, Jan 13</p>
                </div>
                <div className="w-2 h-2 bg-[#6FCF97] rounded-full"></div>
              </div>

              {/* Top 3 Priorities */}
              <div className="space-y-3 mb-6">
                <h5 className="text-xs text-[#9B9490] font-light uppercase tracking-wide">Top 3 Priorities</h5>
                {[
                  { title: 'Follow up with Sequoia intro', priority: 'High', color: 'bg-[#E85D4A]' },
                  { title: 'Ship API beta to first customer', priority: 'High', color: 'bg-[#E85D4A]' },
                  { title: 'Review hiring pipeline', priority: 'Medium', color: 'bg-[#9B9490]' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-white border border-[#E8E3DD] rounded-lg">
                    <div className={`w-1 h-8 ${item.color} rounded-full`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-[#1a1614] font-light">{item.title}</p>
                      <p className="text-xs text-[#9B9490] font-light">{item.priority} priority</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Panel */}
              <div className="bg-[#F5F1ED] border border-[#E8E3DD] rounded-lg p-4">
                <p className="text-xs text-[#6B6560] font-light mb-2">💡 Why this matters</p>
                <p className="text-sm text-[#1a1614] font-light leading-relaxed">
                  Sequoia intro expires in 3 days. With 4 months runway, closing this round is your top priority.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right - Explanation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8 order-1 lg:order-2"
          >
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-[#6B6560]/10 border border-[#6B6560]/20 rounded-full">
                <span className="text-xs text-[#6B6560] font-light">Step 3</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light text-[#1a1614]" style={{ fontFamily: 'Crimson Pro, serif' }}>
                Get clear priorities{' '}
                <span className="text-[#E85D4A]">every day</span>
              </h2>
            </div>

            <div className="space-y-4">
              {explanationCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-xl p-6"
                >
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-[#F5F1ED] rounded-lg flex items-center justify-center flex-shrink-0">
                      <card.icon className="w-5 h-5 text-[#6B6560]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-base font-normal text-[#1a1614] mb-1" style={{ fontFamily: 'Crimson Pro, serif' }}>
                        {card.title}
                      </h4>
                      <p className="text-sm text-[#6B6560] font-light">{card.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
