import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FlaskConical, Cpu, ShieldCheck, Microscope, Layers, Package, Container, BadgeAlert, Sparkles } from 'lucide-react';

export default function ProcessTimeline() {
  const [activePhase, setActivePhase] = useState<number>(1);

  const phases = [
    {
      number: 1,
      title: 'Phase 01: Concept & R&D',
      description: 'Custom formulation development in our specialized, sterile laboratories. We optimize for high clinical efficacy, skin sensitivity, and structural material compatibility.',
      icon: FlaskConical,
      specTitle: 'TECHNICAL SPEC',
      specItems: [
        'Formula Stability & Oxidation Testing',
        'Microbiological Challenge Assessment',
        'Scent & Active Bio-Ingredient Pairing',
        'pH Balancing & Preservative Optimization',
        'Dermal Patch/Sensitivity Pre-validation'
      ],
      highlights: {
        time: '7-14 Days',
        assets: 'Clinical Biosafety Cabinets',
        regulation: 'Dermatest Std'
      }
    },
    {
      number: 2,
      title: 'Phase 02: Precision Manufacturing',
      description: 'Mass production in our high-capacity environment operating to strict ISO standards. Our flexible lines seamlessly accommodate small-batch clinical trials as well as massive retail distribution volume.',
      icon: Cpu,
      specTitle: 'PRODUCTION ASSETS',
      specItems: [
        '12 Fully Automatic Sachet & Flow-pack Lines',
        'Medical-Grade Class 100k Cleanroom Airflow',
        'High-Speed Packaging & Over-wrapping',
        'Dynamic Multi-Lane Substrate Slitting',
        'Deionized Pure Water Supply Line (EDI)'
      ],
      highlights: {
        time: '50,000 Wipes / Hr',
        assets: '12 Auto-Flowlines',
        regulation: 'ISO 22716 GMP'
      }
    },
    {
      number: 3,
      title: 'Phase 03: Quality Control & Logistics',
      description: 'Every chemical batch undergoes rigorous analytical testing. In the final stage, we compile complete compliance documentation and coordinate multi-port global logistics for rapid export.',
      icon: ShieldCheck,
      specTitle: 'GLOBAL COMPLIANCE',
      specItems: [
        'FDA NDC, CE, & EPA Registered Documentation',
        'Full Batch Traceability via QR & Serial Mapping',
        'Multi-Port Logistics & Port of Clearance Handling',
        'Compressive Strength & Leakage Vacuum Testing',
        'Custom Material Safety Data Sheets (MSDS)'
      ],
      highlights: {
        time: '24/7 Dispatch',
        assets: 'Vaccuum Chamber Testers',
        regulation: 'EPA / CE Certs'
      }
    }
  ];

  return (
    <section id="process-section" className="py-20 md:py-28 bg-[#ffffff] border-b border-[#b9cac7]/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#006a65] font-semibold tracking-widest uppercase block mb-3">
            Lifecycle Management
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#151d1c] tracking-tight">
            Our Integrated OEM/ODM Process
          </h2>
          <p className="font-sans text-[#3a4a48] text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            From molecular validation to shipping containers. We operate with standard operating procedures to guarantee absolute sterile consistency.
          </p>
        </div>

        {/* Phase Toggle Tabs (B2B Control Panel Theme) */}
        <div className="flex justify-center flex-wrap gap-2.5 max-w-2xl mx-auto mb-12">
          {phases.map((phase) => {
            const IconComponent = phase.icon;
            const isActive = activePhase === phase.number;

            return (
              <button
                key={phase.number}
                onClick={() => setActivePhase(phase.number)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded text-xs font-mono font-medium border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#006a65]/5 border-[#006a65] text-[#006a65]'
                    : 'bg-[#f2fbf9]/50 border-[#b9cac7]/40 text-[#3a4a48] hover:bg-[#edf6f3]'
                }`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  isActive ? 'bg-[#006a65] text-white' : 'bg-[#b9cac7] text-white'
                }`}>
                  {phase.number}
                </span>
                <span>PHASE 0{phase.number}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Interactive Workspace */}
        <div className="grid md:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Phase Detailed Description */}
          <div className="md:col-span-7 flex flex-col justify-between bg-[#f2fbf9]/60 border border-[#b9cac7]/50 rounded-lg p-8 md:p-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="p-3 bg-[#006a65]/10 text-[#006a65] rounded">
                  {(() => {
                    const Component = phases[activePhase - 1].icon;
                    return <Component className="w-6 h-6 animate-pulse" />;
                  })()}
                </span>
                <div>
                  <h3 className="font-sans text-xl md:text-2xl font-bold text-[#151d1c]">
                    {phases[activePhase - 1].title}
                  </h3>
                  <div className="text-[10px] font-mono tracking-widest text-[#006a65] uppercase">
                    Stage ISO Standard
                  </div>
                </div>
              </div>

              <p className="font-sans text-[#3a4a48] text-sm md:text-base leading-relaxed mb-8">
                {phases[activePhase - 1].description}
              </p>

              {/* Specs Card Grid (Tonal Layers) */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white border border-[#b9cac7]/30 rounded p-4 text-left">
                  <span className="block text-[9px] font-mono text-[#3a4a48]/70 uppercase tracking-widest mb-1">
                    Cycle Duration
                  </span>
                  <span className="font-sans font-bold text-sm text-[#006a65]">
                    {phases[activePhase - 1].highlights.time}
                  </span>
                </div>
                <div className="bg-white border border-[#b9cac7]/30 rounded p-4 text-left">
                  <span className="block text-[9px] font-mono text-[#3a4a48]/70 uppercase tracking-widest mb-1">
                    Key Equipment
                  </span>
                  <span className="font-sans font-semibold text-xs text-[#151d1c] line-clamp-1">
                    {phases[activePhase - 1].highlights.assets}
                  </span>
                </div>
                <div className="bg-white border border-[#b9cac7]/30 rounded p-4 text-left">
                  <span className="block text-[9px] font-mono text-[#3a4a48]/70 uppercase tracking-widest mb-1">
                    Certification
                  </span>
                  <span className="font-sans font-bold text-xs text-[#006a65] line-clamp-1">
                    {phases[activePhase - 1].highlights.regulation}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#b9cac7]/30 flex items-center gap-2 text-xs font-mono text-[#3a4a48]/70">
              <Sparkles className="w-3.5 h-3.5 text-[#006a65]" />
              <span>Configure your base choices below to see automated timeline updates!</span>
            </div>
          </div>

          {/* Technical Spec List */}
          <div className="md:col-span-5 bg-white border border-[#b9cac7] rounded-lg p-8">
            <div className="flex justify-between items-center pb-4 border-b border-[#edf6f3] mb-6">
              <span className="font-mono text-xs text-[#6a7a78] font-bold tracking-wider">
                {phases[activePhase - 1].specTitle}
              </span>
              <span className="text-[10px] bg-[#edf6f3] text-[#3a4a48] font-mono px-2 py-0.5 rounded">
                COMPLIANCE LOG
              </span>
            </div>

            <ul className="space-y-4 text-left">
              {phases[activePhase - 1].specItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 grupo text-sm font-sans text-[#3a4a48]">
                  <span className="w-5 h-5 rounded-full bg-[#f2fbf9] border border-[#006a65]/40 text-[#006a65] flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5 font-mono">
                    {index + 1}
                  </span>
                  <span className="font-medium text-[#151d1c]">{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-[#edf6f3]/80 rounded p-4 mt-8 border border-[#b9cac7]/30 flex items-center gap-3">
              <Microscope className="w-5 h-5 text-[#006a65] shrink-0" />
              <div className="text-left">
                <div className="text-[10px] font-mono text-[#3a4a48] font-bold uppercase tracking-wider">Sterile Assurance</div>
                <div className="text-xs text-[#3a4a48]/80 font-sans leading-tight mt-0.5">Tested in zero-contamination laminar environments.</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
