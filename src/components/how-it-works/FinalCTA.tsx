import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  const { ref, isInView } = useInView();

  return (
    <section ref={ref} className="py-32 px-6 lg:px-16 bg-white/40">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-br from-[#1a1614] to-[#2a2422] rounded-2xl p-16 shadow-lg"
        >
          <h2 className="text-3xl lg:text-4xl font-light text-white mb-6" style={{ fontFamily: 'Crimson Pro, serif' }}>
            Ready to see it work?
          </h2>
          
          <button className="px-10 py-4 bg-white text-[#1a1614] rounded-md hover:bg-[#FAF7F4] transition-colors font-normal flex items-center gap-2 mx-auto group shadow-sm mb-6">
            Start the Strategy Session
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-sm text-[#9B9490] font-light">
            Free for early founders. Setup in ~20 minutes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
