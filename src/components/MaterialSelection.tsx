import { useState } from 'react';
import { Leaf, Cpu, Grid, Sparkles, ChevronRight, Check } from 'lucide-react';
import { Material } from '../types';
import { MATERIALS } from '../data';

interface MaterialSelectionProps {
  selectedMaterialId: string;
  onSelectBase: (materialId: string) => void;
}

export default function MaterialSelection({ selectedMaterialId, onSelectBase }: MaterialSelectionProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Map string tags to Lucide elements dynamically
  const renderMaterialIcon = (iconName: string) => {
    switch (iconName) {
      case 'eco':
        return <Leaf className="w-8 h-8 text-[#006a65]" />;
      case 'precision_manufacturing':
        return <Cpu className="w-8 h-8 text-[#006a65]" />;
      case 'texture':
        return <Grid className="w-8 h-8 text-[#006a65]" />;
      default:
        return <Sparkles className="w-8 h-8 text-[#006a65]" />;
    }
  };

  return (
    <section id="materials-section" className="py-20 md:py-28 bg-[#edf6f3]/50 border-b border-[#b9cac7]/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="text-left">
            <span className="font-mono text-xs text-[#006a65] font-semibold tracking-widest uppercase block mb-3">
              Material Library
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#151d1c] tracking-tight">
              Advanced Base Selection
            </h2>
          </div>
          <p className="font-sans text-[#3a4a48] text-sm md:text-base max-w-md text-left leading-relaxed">
            Choose from our curated raw hygiene material substrates, engineered for specific skin-irritability regulations, fluid absorption rates, and mechanical cleaning tasks.
          </p>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {MATERIALS.map((material: Material) => {
            const isSelected = selectedMaterialId === material.id;
            const isHovered = hoveredId === material.id;

            return (
              <div
                key={material.id}
                onMouseEnter={() => setHoveredId(material.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`bg-white p-7 rounded-lg border transition-all duration-300 flex flex-col justify-between text-left relative ${
                  isSelected
                    ? 'border-[#006a65] ring-2 ring-[#006a65]/20 shadow-md transform -translate-y-1'
                    : 'border-[#b9cac7]/50 hover:border-[#006a65]/60 hover:shadow-sm'
                }`}
              >
                {/* Active indicator tags */}
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-[#006a65] text-white rounded-full p-1 shadow">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}

                {/* Substrate Details */}
                <div>
                  <div className="mb-5 bg-[#f2fbf9] w-14 h-14 rounded flex items-center justify-center">
                    {renderMaterialIcon(material.icon)}
                  </div>

                  <h3 className="font-sans text-lg font-bold text-[#151d1c] mb-2">
                    {material.name}
                  </h3>

                  <p className="font-sans text-xs text-[#3a4a48] leading-relaxed mb-6 h-12 overflow-hidden">
                    {material.description}
                  </p>

                  {/* Character Bullet points */}
                  <ul className="space-y-2 mb-6 border-t border-[#edf6f3] pt-4">
                    {material.characteristics.map((char, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs font-sans text-[#3a4a48]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006a65]" />
                        <span>{char}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Metric Logs */}
                <div>
                  {/* Sustainability score bar */}
                  <div className="mb-4 bg-[#edf6f3] rounded p-3 border border-[#b9cac7]/20">
                    <div className="flex justify-between items-center text-[10px] font-mono mb-1 text-[#3a4a48]/80">
                      <span>BIODEGRADABILITY INDEX</span>
                      <span className="font-bold text-[#006a65]">{material.sustainabilityScore}%</span>
                    </div>
                    <div className="w-full bg-[#b9cac7]/40 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#006a65] h-full rounded-full transition-all duration-500"
                        style={{ width: `${material.sustainabilityScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#edf6f3] flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[11px] font-mono">
                      <span className="text-[#6a7a78]">ABSORBENCY</span>
                      <span className="text-[#006a65] font-bold">{material.absorbency}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-mono">
                      <span className="text-[#6a7a78]">DURABILITY</span>
                      <span className="text-[#006a65] font-bold">{material.durability}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-mono">
                      <span className="text-[#6a7a78]">FRICTION</span>
                      <span className="text-[#006a65] font-bold">{material.friction}</span>
                    </div>
                  </div>

                  {/* Select button */}
                  <button
                    id={`select-base-${material.id}`}
                    onClick={() => onSelectBase(material.id)}
                    className={`w-full mt-6 py-2.5 rounded text-xs font-mono tracking-tight font-medium border flex items-center justify-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#006a65] text-white border-[#006a65]'
                        : 'bg-transparent border-[#707977] text-[#3a4a48] hover:bg-[#006a65]/5 hover:border-[#006a65]'
                    }`}
                  >
                    <span>{isSelected ? 'Selected As Base' : 'Load Into Spec Config'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
