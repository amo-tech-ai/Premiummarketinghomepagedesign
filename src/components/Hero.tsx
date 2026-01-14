import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F4] via-[#F5F1ED] to-[#E8E3DD] opacity-60" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#E85D4A]" strokeWidth={1.5} />
              <span className="text-sm text-[#6B6560] font-light">AI-Powered Startup Operations</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl font-light text-[#1a1614] mb-6 leading-tight" style={{ fontFamily: 'Crimson Pro, serif' }}>
              StartupAI
            </h1>
            
            <h2 className="text-3xl lg:text-4xl font-light text-[#1a1614] mb-6 leading-tight" style={{ fontFamily: 'Crimson Pro, serif' }}>
              Your AI Operating System for Building Startups
            </h2>

            {/* Description */}
            <p className="text-lg text-[#6B6560] font-light max-w-xl leading-relaxed">
              StartupAI turns the chaos of building and fundraising into a clear, actionable operating system—so you can focus on what matters.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link to="/signup" className="px-8 py-4 bg-[#1a1614] text-white rounded-md hover:bg-[#2a2422] transition-colors flex items-center gap-2 group">
                Start Strategy Session
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/how-it-works" className="text-[#1a1614] hover:text-[#E85D4A] transition-colors font-light">
                How it works →
              </Link>
            </div>

            {/* Trust */}
            <p className="text-sm text-[#9B9490] font-light">
              Trusted by founders at pre-seed through Series A
            </p>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/60 backdrop-blur-sm border border-[#E8E3DD] rounded-2xl p-8 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-sm font-light text-[#6B6560]">Dashboard</div>
                  <div className="w-2 h-2 bg-[#6FCF97] rounded-full"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-[#1a1614] rounded-full w-3/4"></div>
                  <div className="h-3 bg-[#E8E3DD] rounded-full w-full"></div>
                  <div className="h-3 bg-[#E8E3DD] rounded-full w-5/6"></div>
                </div>
                <div className="space-y-3 pt-6">
                  <div className="h-2 bg-[#E85D4A]/20 rounded-full w-2/3"></div>
                  <div className="h-2 bg-[#E85D4A]/10 rounded-full w-1/2"></div>
                </div>
                <div className="space-y-3 pt-6">
                  <div className="h-2 bg-[#E8E3DD] rounded-full w-full"></div>
                  <div className="h-2 bg-[#E8E3DD] rounded-full w-4/5"></div>
                  <div className="h-2 bg-[#E8E3DD] rounded-full w-3/5"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}