import { useState } from 'react';
import { Ruler, Globe2, ShieldCheck, Factory, Anchor, Plane, Clock, Landmark } from 'lucide-react';
import { LOGISTICS_DESTINATIONS } from '../data';

export default function CapacityDashboard() {
  const [selectedDestInd, setSelectedDestInd] = useState<number>(0);
  const selectedDest = LOGISTICS_DESTINATIONS[selectedDestInd];

  return (
    <section className="py-20 bg-[#edf6f3]/50 border-b border-[#b9cac7]/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Core Stats Bento Block */}
        <div className="bg-white border border-[#b9cac7] rounded-xl p-8 md:p-12 mb-12 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y-0 divide-x-0 sm:divide-x divide-[#b9cac7]/30 text-center">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center p-4">
              <span className="p-3 bg-[#e7f0ed] text-[#006a65] rounded-full mb-4">
                <Factory className="w-6 h-6" />
              </span>
              <div className="font-sans text-3xl md:text-4xl font-extrabold text-[#006a65] tracking-tight">
                50k+
              </div>
              <div className="font-mono text-[10px] text-[#3a4a48] font-bold tracking-widest uppercase mt-2.5">
                Daily Line Capacity
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center p-4">
              <span className="p-3 bg-[#e7f0ed] text-[#006a65] rounded-full mb-4">
                <Ruler className="w-6 h-6" />
              </span>
              <div className="font-sans text-3xl md:text-4xl font-extrabold text-[#006a65] tracking-tight">
                12
              </div>
              <div className="font-mono text-[10px] text-[#3a4a48] font-bold tracking-widest uppercase mt-2.5">
                Production Lines
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center p-4">
              <span className="p-3 bg-[#e7f0ed] text-[#006a65] rounded-full mb-4">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <div className="font-sans text-3xl md:text-4xl font-extrabold text-[#006a65] tracking-tight">
                100%
              </div>
              <div className="font-mono text-[10px] text-[#3a4a48] font-bold tracking-widest uppercase mt-2.5">
                QC Pass Ratio
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center p-4">
              <span className="p-3 bg-[#e7f0ed] text-[#006a65] rounded-full mb-4">
                <Globe2 className="w-6 h-6" />
              </span>
              <div className="font-sans text-3xl md:text-4xl font-extrabold text-[#006a65] tracking-tight">
                45+
              </div>
              <div className="font-mono text-[10px] text-[#3a4a48] font-bold tracking-widest uppercase mt-2.5">
                Export Nations
              </div>
            </div>

          </div>
        </div>

        {/* Global Logistics Simulator */}
        <div className="grid md:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto text-left">
          
          {/* Logistics selector panel */}
          <div className="md:col-span-6 bg-white border border-[#b9cac7] rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Anchor className="w-4 h-4 text-[#006a65]" />
                <span className="font-mono text-xs text-[#006a65] font-bold uppercase tracking-wider">Multi-Port Shipping Management</span>
              </div>
              
              <h3 className="font-sans text-lg font-bold text-[#151d1c] mb-2">Maritime Transit Calculator</h3>
              <p className="font-sans text-xs text-[#3a4a48] leading-relaxed mb-6">
                Our plant coordinates container loading directly to global deep-water hub terminals. Pick a destination target region to evaluate typical ocean transit time and duty bounds:
              </p>

              {/* Transit Destination list */}
              <div className="space-y-2">
                {LOGISTICS_DESTINATIONS.map((dest, i) => (
                  <button
                    key={dest.region}
                    onClick={() => setSelectedDestInd(i)}
                    className={`w-full p-3 rounded text-xs font-sans text-left flex items-center justify-between border cursor-pointer transition-all ${
                      selectedDestInd === i
                        ? 'bg-[#006a65]/5 border-[#006a65] text-[#006a65] font-semibold'
                        : 'bg-white hover:bg-[#edf6f3]/30 border-[#b9cac7]/30 text-[#3a4a48]'
                    }`}
                  >
                    <span>{dest.region}</span>
                    <span className="font-mono text-[10px] text-[#6a7a78]">PORT: {dest.primaryPort.split('/')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#edf6f3] text-[10px] font-mono text-[#6a7a78]/80 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Ocean freight transit timelines exclude regulatory custom clearances.</span>
            </div>
          </div>

          {/* Transit Result Panel */}
          <div className="md:col-span-6 bg-white border border-[#b9cac7] rounded-lg p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-[#edf6f3]">
                <span className="font-mono text-xs text-[#6a7a78] font-bold">CALCULATED MARINE ROUTING</span>
                <span className="text-[9px] bg-[#edf6f3] text-[#3a4a48] font-mono px-2 py-0.5 rounded uppercase">
                  Port: Shanghai Outward
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#6a7a78] uppercase block tracking-wider mb-1">
                  Primary Receiving Terminal
                </span>
                <span className="font-sans text-xl font-bold text-[#151d1c]">
                  {selectedDest.primaryPort}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-mono text-[#6a7a78] uppercase block tracking-wider mb-1">
                    Ocean Transit Time
                  </span>
                  <span className="font-sans text-2xl font-black text-[#006a65] font-mono">
                    ~{selectedDest.transitTimeDays} Days
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#6a7a78] uppercase block tracking-wider mb-1">
                    Estimated Duty Tarrif
                  </span>
                  <span className="font-sans text-lg font-bold text-[#151d1c] font-mono">
                    {selectedDest.dutyEstimate}
                  </span>
                </div>
              </div>

              {/* Step Checklist of customs */}
              <div className="bg-[#f2fbf9]/60 border border-[#b9cac7]/30 rounded p-4 text-xs font-sans text-[#3a4a48] space-y-2">
                <div className="font-bold text-[#006a65] flex items-center gap-1.5 mb-1">
                  <Landmark className="w-3.5 h-3.5" />
                  International Logistics package
                </div>
                <div className="flex justify-between">
                  <span>Export Customs Declaration:</span>
                  <span className="font-mono font-semibold">YY-PRE-APPROVED</span>
                </div>
                <div className="flex justify-between">
                  <span>UN flammability coding (Hazmat):</span>
                  <span className="font-mono text-[#6a7a78]">Standard compliant</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-[#6a7a78] font-sans italic pt-4">
              * Yiying Hygiene operates comprehensive FOB (Free On Board) and CIF (Cost, Insurance & Freight) shipping options.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
