import { motion } from 'motion/react';
import { ArrowRight, FileSpreadsheet, ShieldAlert, CheckCircle2 } from 'lucide-react';
import labImage from '../assets/images/hightech_cleanroom_lab_1781698449019.jpg';

interface HeroProps {
  onStartProject: () => void;
  onViewSpecs: () => void;
}

export default function Hero({ onStartProject, onViewSpecs }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-b from-[#edf6f3] to-white pt-28 pb-16 md:py-32 overflow-hidden border-b border-[#b9cac7]/30">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Typography & Action */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col text-left"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="h-[2px] w-8 bg-[#006a65]"></span>
            <span className="font-mono text-xs text-[#006a65] font-semibold tracking-widest uppercase">
              Manufacturing Excellence
            </span>
          </div>

          <h1 id="hero-title" className="font-sans text-4xl lg:text-5xl font-bold text-[#151d1c] tracking-tight leading-[1.1] mb-6">
            Global Scale.<br />
            <span className="text-[#006a65]">Clinical Precision.</span><br />
            Your Brand.
          </h1>

          <p className="font-sans text-[#3a4a48] text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            Transform your vision into market-leading wet wipes and hygiene products. From advanced formulation R&D in biological labs to flexible, ISO-certified high-capacity manufacturing lines.
          </p>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              id="hero-start-cta"
              onClick={onStartProject}
              className="bg-[#006a65] hover:bg-[#00504c] text-white px-8 py-4 rounded font-medium text-sm transition-all shadow hover:shadow-md flex items-center justify-center gap-2 active:scale-98 group cursor-pointer"
            >
              Start Your Custom Project 
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              id="hero-specs-cta"
              onClick={onViewSpecs}
              className="border border-[#707977] hover:border-[#006a65] text-[#3a4a48] hover:text-[#006a65] px-8 py-4 rounded font-medium text-sm transition-all hover:bg-[#006a65]/5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              View Specifications
            </button>
          </div>

          {/* Precision Badges */}
          <div className="mt-10 pt-8 border-t border-[#b9cac7]/40 grid grid-cols-3 gap-4">
            <div>
              <div className="font-mono text-[#006a65] font-bold text-lg">ISO 9001</div>
              <div className="text-[10px] text-[#3a4a48]/70 tracking-tight font-sans">Certified Quality</div>
            </div>
            <div>
              <div className="font-mono text-[#006a65] font-bold text-lg">Class 100k</div>
              <div className="text-[10px] text-[#3a4a48]/70 tracking-tight font-sans">Cleanroom Ops</div>
            </div>
            <div>
              <div className="font-mono text-[#006a65] font-bold text-lg">EPA / FDA</div>
              <div className="text-[10px] text-[#3a4a48]/70 tracking-tight font-sans">Compliant Lab</div>
            </div>
          </div>
        </motion.div>
        
        {/* Right Side: Sterile Lab Image Frame */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-lg mx-auto md:max-w-none w-full"
        >
          {/* Decorative Back Drop Outline */}
          <div className="absolute -inset-2 rounded border border-[#006a65]/10 -rotate-1 pointer-events-none"></div>
          
          <div className="relative bg-white rounded p-3 border border-[#b9cac7] shadow-xl">
            {/* Camera Frame Corners to express scientific lens feel */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#006a65]"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#006a65]"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#006a65]"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#006a65]"></div>
            
            <img 
              id="hero-lab-image"
              alt="Advanced high-tech sterile cleanroom laboratory and medical-grade manufacturing facility" 
              className="rounded object-cover aspect-video w-full h-[320px] filter saturate-[0.95]" 
              referrerPolicy="no-referrer"
              src={labImage}
            />
            
            {/* Mini floating spec tag */}
            <div className="absolute bottom-6 right-6 bg-[#151d1c]/90 text-white rounded px-3.5 py-1.5 backdrop-blur-sm shadow border border-white/10 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12f9ee] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#12f9ee]"></span>
              </span>
              <span className="font-mono text-[10px] tracking-widest text-[#adebe5]">LINE 07 STABILITY R&D</span>
            </div>
          </div>
          
          {/* Soft background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#006a65]/5 rounded-full blur-3xl -z-10"></div>
        </motion.div>

      </div>
      
      {/* Dynamic slanted element matching design guidelines background accents */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[#006a65]/5 -skew-x-12 transform translate-x-32 hidden md:block select-none pointer-events-none -z-10"></div>
    </section>
  );
}
