import { useState, useEffect } from 'react';
import { Sliders, HelpCircle, CheckCircle2, FileVideo, Download, Copy, RefreshCw, Printer, AlertTriangle, Info, FlaskConical, Archive, Coins, CalendarDays, Check } from 'lucide-react';
import { CustomProjectSpec, Material, Formulation, PackagingOption } from '../types';
import { MATERIALS, FORMULATIONS, PACKAGING_OPTIONS } from '../data';

interface SpecConfiguratorProps {
  spec: CustomProjectSpec;
  onChange: (updatedSpec: CustomProjectSpec) => void;
  onProceedToProposal: () => void;
}

export default function SpecConfigurator({ spec, onChange, onProceedToProposal }: SpecConfiguratorProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'dims' | 'formula' | 'package'>('dims');

  const selectedMaterial = MATERIALS.find(m => m.id === spec.materialId) || MATERIALS[0];
  const selectedFormula = FORMULATIONS.find(f => f.id === spec.formulationId) || FORMULATIONS[0];
  const selectedPackage = PACKAGING_OPTIONS.find(p => p.id === spec.packagingId) || PACKAGING_OPTIONS[0];

  // Side Calculations
  const [pricingEstimate, setPricingEstimate] = useState({ unitCostUSD: 0.12, totalCostUSD: 12000, leadTimeDays: 21 });

  useEffect(() => {
    // A sophisticated algorithmic calculator mimicking real B2B pricing model
    const materialCost = selectedMaterial.costFactor * (spec.gsm / 50) * 0.05;
    const sizeMultiplier = (spec.sheetWidth * spec.sheetHeight) / (150 * 150);
    const formulationCost = spec.formulationId === 'medical-sanitizer-75' ? 0.04 : (spec.formulationId === 'salicylic-exfoliation' ? 0.035 : 0.015);
    const packagingCost = selectedPackage.multiplier * (spec.hasLid ? 1.25 : 1.0);
    
    // Scale discount based on volume (logarithmic or linear step)
    let volumeDiscount = 1.0;
    if (spec.orderQuantity >= 500000) volumeDiscount = 0.82;
    else if (spec.orderQuantity >= 250000) volumeDiscount = 0.88;
    else if (spec.orderQuantity >= 100000) volumeDiscount = 0.93;
    else if (spec.orderQuantity >= 50000) volumeDiscount = 0.97;

    const calculatedUnitCost = Number(((materialCost * sizeMultiplier + formulationCost + packagingCost) * volumeDiscount).toFixed(4));
    const calculatedTotalCost = Math.round(calculatedUnitCost * spec.orderQuantity);
    
    // Lead time formula (R&D + Line setup + production time)
    const productionRatePerDay = 80000; // units per day per line allocated
    const calculatedProductionDays = Math.ceil(spec.orderQuantity / productionRatePerDay) + 14; // 14 days baseline setup
    
    setPricingEstimate({ 
      unitCostUSD: calculatedUnitCost, 
      totalCostUSD: calculatedTotalCost,
      leadTimeDays: Math.max(14, calculatedProductionDays)
    });
  }, [spec, selectedMaterial, selectedFormula, selectedPackage]);

  const handleUpdate = <K extends keyof CustomProjectSpec>(key: K, value: CustomProjectSpec[K]) => {
    const nextSpec = { ...spec, [key]: value };
    // Auto reset hasLid if packaging doesn't support it
    if (key === 'packagingId') {
      const pkg = PACKAGING_OPTIONS.find(p => p.id === value as string);
      if (pkg && !pkg.lidToggle) {
        nextSpec.hasLid = false;
      }
    }
    onChange(nextSpec);
  };

  const copyTechnicalSheet = () => {
    const text = `
========================================
TECHNICAL DATA SHEET SUMMARY
Yiying Hygiene OEM/ODM Custom Proposal
========================================
Project Reference: YY-${spec.sheetWidth}X${spec.sheetHeight}-SPEC
Base Substrate: ${selectedMaterial.name}
Substrate Density: ${spec.gsm} GSM
Dimensions: ${spec.sheetWidth}mm x ${spec.sheetHeight}mm (Area: ${spec.sheetWidth * spec.sheetHeight} mm²)

Chemical Formulation: ${selectedFormula.name}
Scent Pairing Class: ${selectedFormula.scentPairing}
Active Antibacterial agents: ${selectedFormula.activeIngredients.join(', ')}

Packaging Method: ${selectedPackage.name}
Reinforced Plastic Lid: ${spec.hasLid ? 'Yes' : 'No'}
Intended Batch Quantity: ${spec.orderQuantity.toLocaleString()} Units

Target Export Region: ${spec.targetMarket}
----------------------------------------
ESTIMATED LOGISTICS METRICS:
Approximate Unit Cost: $${pricingEstimate.unitCostUSD.toFixed(3)} USD
Frictional Total Valuation: $${pricingEstimate.totalCostUSD.toLocaleString()} USD
Operational Lead Time: ${pricingEstimate.leadTimeDays} Days
Stability Rating: ${selectedFormula.stabilityTestingClass}
========================================
Yiying Hygiene - Clinical Reliability.
    `;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="spec-configurator" className="py-20 md:py-28 bg-[#white] border-b border-[#b9cac7]/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#006a65] font-semibold tracking-widest uppercase block mb-3">
            Interactive R&D Lab
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#151d1c] tracking-tight">
            Configure Your Product Specifications
          </h2>
          <p className="font-sans text-[#3a4a48] text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Adjust physical traits, chemical properties, safety barriers, and packaging. View real-time technical compliance reports and cost projections instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Specification Workspace */}
          <div className="lg:col-span-7 bg-[#f2fbf9]/40 border border-[#b9cac7]/60 rounded-xl p-6 md:p-8 space-y-8">
            
            {/* Step 1: Base Material selector */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#3a4a48] mb-4">
                Step 1: Substrate Base Material Selection
              </label>
              <div className="grid grid-cols-2 gap-3">
                {MATERIALS.map((material) => (
                  <button
                    key={material.id}
                    onClick={() => handleUpdate('materialId', material.id)}
                    className={`p-4 rounded border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      spec.materialId === material.id
                        ? 'border-[#006a65] bg-[#006a65]/5 shadow-sm'
                        : 'border-[#b9cac7]/40 bg-white hover:border-[#006a65]/50'
                    }`}
                  >
                    <div>
                      <div className="font-sans font-bold text-sm text-[#151d1c] flex items-center gap-2">
                        <span>{material.name}</span>
                        {spec.materialId === material.id && <span className="w-1.5 h-1.5 rounded-full bg-[#006a65]" />}
                      </div>
                      <div className="text-[10px] font-mono text-[#6a7a78] mt-1 uppercase">
                        {material.absorbency} ABSORBENCY
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <hr className="border-[#b9cac7]/20" />

            {/* Tabs for detailed specifications config */}
            <div className="flex border-b border-[#b9cac7]/30">
              <button
                onClick={() => setActiveTab('dims')}
                className={`py-2 px-4 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'dims' 
                    ? 'border-[#006a65] text-[#006a65]' 
                    : 'border-transparent text-[#6a7a78] hover:text-[#006a65]'
                }`}
              >
                DIMENSIONS & DENSITY
              </button>
              <button
                onClick={() => setActiveTab('formula')}
                className={`py-2 px-4 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'formula' 
                    ? 'border-[#006a65] text-[#006a65]' 
                    : 'border-transparent text-[#6a7a78] hover:text-[#006a65]'
                }`}
              >
                BIOLOGICAL REAGENTS
              </button>
              <button
                onClick={() => setActiveTab('package')}
                className={`py-2 px-4 text-xs font-mono font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'package' 
                    ? 'border-[#006a65] text-[#006a65]' 
                    : 'border-transparent text-[#6a7a78] hover:text-[#006a65]'
                }`}
              >
                PACKAGING & VOLUME
              </button>
            </div>

            {/* Tab Panel 1: Dims & GSM */}
            {activeTab === 'dims' && (
              <div className="space-y-6 pt-4 animate-in fade-in duration-300">
                {/* GSM Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-sans font-bold text-[#151d1c] flex items-center gap-1.5">
                      Wipe Density (GSM)
                      <HelpCircle className="w-3.5 h-3.5 text-[#6a7a78]" title="Grams per Square Meter: affects thickness, durability, and soft quotient" />
                    </span>
                    <span className="font-mono text-sm font-bold text-[#006a65]">{spec.gsm} GSM</span>
                  </div>
                  <input
                    type="range"
                    min="35"
                    max="85"
                    step="5"
                    value={spec.gsm}
                    onChange={(e) => handleUpdate('gsm', parseInt(e.target.value))}
                    className="w-full accent-[#006a65] h-1 bg-[#b9cac7]/40 rounded-full"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#6a7a78] mt-1.5">
                    <span>35 (Lighter/Travel)</span>
                    <span>55 (Standard Retail)</span>
                    <span>85 (Heaviest Clinical)</span>
                  </div>
                </div>

                {/* Dimensions (Width and Height in parallel) */}
                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Width Sliders */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-sans font-bold text-[#151d1c]">Sheet Width</span>
                      <span className="font-mono text-sm font-bold text-[#006a65]">{spec.sheetWidth} mm</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="220"
                      step="5"
                      value={spec.sheetWidth}
                      onChange={(e) => handleUpdate('sheetWidth', parseInt(e.target.value))}
                      className="w-full accent-[#006a65] h-1 bg-[#b9cac7]/40 rounded-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[#6a7a78] mt-1.5">
                      <span>100 mm (Min sachet)</span>
                      <span>220 mm (Max)</span>
                    </div>
                  </div>

                  {/* Height Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-sans font-bold text-[#151d1c]">Sheet Height</span>
                      <span className="font-mono text-sm font-bold text-[#006a65]">{spec.sheetHeight} mm</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="220"
                      step="5"
                      value={spec.sheetHeight}
                      onChange={(e) => handleUpdate('sheetHeight', parseInt(e.target.value))}
                      className="w-full accent-[#006a65] h-1 bg-[#b9cac7]/40 rounded-full"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-[#6a7a78] mt-1.5">
                      <span>100 mm (Cosmetic)</span>
                      <span>220 mm (Max Clean)</span>
                    </div>
                  </div>
                </div>

                {/* Substrate Area indicator */}
                <div className="bg-white border border-[#b9cac7]/30 rounded p-4 text-xs font-sans text-[#3a4a48] flex items-center gap-3">
                  <div className="p-2.5 bg-[#edf6f3] text-[#006a65] rounded font-bold font-mono">
                    {((spec.sheetWidth * spec.sheetHeight) / 100).toFixed(0)}cm²
                  </div>
                  <div>
                    <div className="font-bold text-[#151d1c]">Calculated Surface Coverage Area</div>
                    <div className="text-[11px] text-[#6a7a78] mt-0.5">Optimized for even solution absorption and zero linting tension.</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Panel 2: Formulations */}
            {activeTab === 'formula' && (
              <div className="space-y-6 pt-4 animate-in fade-in duration-300">
                <div className="grid gap-3.5">
                  {FORMULATIONS.map((formula) => (
                    <div
                      key={formula.id}
                      onClick={() => handleUpdate('formulationId', formula.id)}
                      className={`p-4 rounded border text-left flex items-start gap-4 transition-all cursor-pointer ${
                        spec.formulationId === formula.id
                          ? 'border-[#006a65] bg-[#006a65]/5'
                          : 'border-[#b9cac7]/40 bg-white hover:border-[#006a65]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        checked={spec.formulationId === formula.id}
                        onChange={() => {}} // click handler is on parent div
                        className="mt-1 accent-[#006a65]"
                      />
                      <div className="space-y-1">
                        <div className="font-sans font-bold text-sm text-[#151d1c] flex items-center gap-2">
                          {formula.name}
                        </div>
                        <p className="font-sans text-xs text-[#3a4a48] leading-normal">
                          {formula.description}
                        </p>
                        <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-2 text-[10px] font-mono text-[#006a65]">
                          <span>PHARMACY GRADE: {formula.activeIngredients.join(', ')}</span>
                          <span className="text-[#6a7a78]">|</span>
                          <span>STABILITY: {formula.stabilityTestingClass}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab Panel 3: Packaging & Batch Size */}
            {activeTab === 'package' && (
              <div className="space-y-6 pt-4 animate-in fade-in duration-300">
                
                {/* Package selector */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#6a7a78] uppercase mb-3">
                    Packaging Enclosure Type
                  </label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {PACKAGING_OPTIONS.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => handleUpdate('packagingId', pkg.id)}
                        className={`p-4 rounded border text-left flex flex-col justify-between h-36 transition-all cursor-pointer ${
                          spec.packagingId === pkg.id
                            ? 'border-[#006a65] bg-[#006a65]/5 shadow-sm'
                            : 'border-[#b9cac7]/40 bg-white hover:border-[#006a65]/50'
                        }`}
                      >
                        <span className="text-xs font-sans font-bold text-[#151d1c] block">{pkg.name}</span>
                        <div className="mt-2">
                          <div className="text-[10px] font-mono text-[#3a4a48]/70 block mt-1">
                            Sheets: {pkg.sheetCountRange}
                          </div>
                          <p className="text-[10px] text-[#6a7a78] line-clamp-2 leading-relaxed mt-2.5">
                            {pkg.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-toggle: Plastic Flip Cap Lid (only if supported) */}
                {selectedPackage.lidToggle && (
                  <div className="bg-white border border-[#b9cac7]/30 rounded-lg p-4 flex items-center justify-between">
                    <div className="text-left">
                      <div className="text-xs font-sans font-bold text-[#151d1c]">Exquisite Plastic Flip-Cap Lid</div>
                      <div className="text-[11px] text-[#6a7a78] mt-0.5">Adds plastic vapor barrier locks to preserve fragrance and shelf wetness lifespan.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={spec.hasLid}
                        onChange={(e) => handleUpdate('hasLid', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#b9cac7]/40 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#b9cac7]/50 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#006a65]"></div>
                    </label>
                  </div>
                )}

                {/* Slider: Order Volume */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-sans font-bold text-[#151d1c]">Annual Order Target volume (units)</span>
                    <span className="font-mono text-sm font-bold text-[#006a65]">{spec.orderQuantity.toLocaleString()} Units</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="10000"
                    value={spec.orderQuantity}
                    onChange={(e) => handleUpdate('orderQuantity', parseInt(e.target.value))}
                    className="w-full accent-[#006a65] h-1 bg-[#b9cac7]/40 rounded-full"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#6a7a78] mt-1.5">
                    <span>10k (Trial batch)</span>
                    <span>100k (Standard Retail)</span>
                    <span>1M (Enterprise maximum discount)</span>
                  </div>
                </div>

                {/* Target Market selection */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#6a7a78] uppercase mb-2">
                    Primary Regional Distribution Outpost
                  </label>
                  <select
                    value={spec.targetMarket}
                    onChange={(e) => handleUpdate('targetMarket', e.target.value)}
                    className="bg-white border border-[#b9cac7]/60 text-sm font-sans text-[#151d1c] w-full rounded p-2.5 focus:border-[#006a65] focus:outline-none"
                  >
                    <option value="Asia-Pacific & ASEAN">Asia-Pacific & ASEAN (Singapore / Tokyo / Sydney)</option>
                    <option value="North America">North America (Los Angeles / Toronto / New York)</option>
                    <option value="European Union">European Union (Rotterdam / Frankfurt / Paris)</option>
                    <option value="Middle East & GCC">Middle East & GCC (Jebel Ali / Dubai / Riyadh)</option>
                    <option value="South America">South America (Manzanillo / Sao Paulo)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Spec Title Edit Field so they can name their configuration! */}
            <div className="pt-4 border-t border-[#b9cac7]/30">
              <label className="block text-xs font-mono font-bold text-[#6a7a78] uppercase mb-2">
                Custom Formulation Project Reference Name
              </label>
              <input
                type="text"
                value={spec.title}
                onChange={(e) => handleUpdate('title', e.target.value)}
                placeholder="e.g., Premium Baby Wipes Bamboo Alpha"
                className="w-full bg-white border border-[#b9cac7]/60 p-2.5 rounded font-sans text-sm focus:border-[#006a65] focus:outline-none"
              />
            </div>

          </div>

          {/* Right Panel: Technical Quote & dynamic data sheet */}
          <div className="lg:col-span-5 h-full space-y-6">
            
            {/* dynamic B2B Quotation Summary Card */}
            <div className="bg-[#151d1c] text-white rounded-xl p-8 border border-white/5 shadow-xl text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ddd4]/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
                <span className="font-mono text-xs text-[#006f69] font-bold tracking-widest uppercase">
                  ACTIVE QUOTE PROJECT
                </span>
                <span className="text-[9px] bg-[#006a65] text-white font-mono px-2 py-0.5 rounded tracking-widest uppercase">
                  FOB Clear
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                    Estimate Unit Price Ratio
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-mono text-3xl font-bold text-[#1efcf1]">
                      ${pricingEstimate.unitCostUSD.toFixed(3)}
                    </span>
                    <span className="text-white/60 text-xs font-sans">USD per wipe pack</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                      Estimated Production Valuation
                    </div>
                    <div className="text-lg font-bold font-mono mt-0.5 text-white">
                      ${pricingEstimate.totalCostUSD.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                      Procurement Lead Time
                    </div>
                    <div className="text-lg font-bold font-mono mt-0.5 text-[#1efcf1] flex items-center gap-1.5">
                      {pricingEstimate.leadTimeDays} Days
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 text-xs font-sans text-white/70 space-y-2">
                  <div className="flex justify-between">
                    <span>Base Formulation Safety Audit</span>
                    <span className="font-bold text-[#1efcf1]">COMPLIANT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard Logistics Clearance</span>
                    <span className="text-white/90">Multi-port pre-authorized</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chemical Bio-Safety Stability</span>
                    <span className="text-white/90">{selectedFormula.stabilityTestingClass.split('(')[0]}</span>
                  </div>
                </div>

                {/* Proceed Button */}
                <button
                  id="spec-proceed-btn"
                  onClick={onProceedToProposal}
                  className="w-full bg-[#1efcf1] hover:bg-[#00ddd4] text-[#00201e] py-3.5 rounded font-bold text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md"
                >
                  Request Official OEM Proposal
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Technical Specification Summary Sheet */}
            <div className="bg-white border border-[#b9cac7] rounded-xl p-6 text-left relative overflow-hidden">
              <div className="flex justify-between items-center pb-3 border-b border-[#edf6f3] mb-4">
                <span className="font-mono text-xs text-[#3a4a48] font-bold tracking-wide">
                  TECHNICAL SPEC DATA SHEET
                </span>
                <span className="text-[10px] bg-[#f2fbf9] text-[#006a65] font-mono px-2 py-0.5 rounded border border-[#006a65]/20">
                  REF: YY-SPEC-ACTIVE
                </span>
              </div>

              {/* Data Specifications Grid */}
              <div className="space-y-4 text-xs font-sans text-[#3a4a48]">
                <div className="flex justify-between py-1.5 border-b border-[#edf6f3]/60">
                  <span className="text-[#6a7a78]">Project Ref:</span>
                  <span className="font-medium text-[#151d1c]">{spec.title || 'Untitled YY Spec'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#edf6f3]/60">
                  <span className="text-[#6a7a78]">Substrate / Fiber:</span>
                  <span className="font-medium text-[#151d1c]">{selectedMaterial.name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#edf6f3]/60">
                  <span className="text-[#6a7a78]">Thickness density:</span>
                  <span className="font-medium text-[#151d1c] font-mono">{spec.gsm} GSM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#edf6f3]/60">
                  <span className="text-[#6a7a78]">Dimensions Area:</span>
                  <span className="font-medium text-[#151d1c] font-mono">{spec.sheetWidth}mm × {spec.sheetHeight}mm</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#edf6f3]/60">
                  <span className="text-[#6a7a78]">Biological Complex:</span>
                  <span className="font-medium text-[#151d1c] line-clamp-1">{selectedFormula.name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#edf6f3]/60">
                  <span className="text-[#6a7a78]">Active Ingredients:</span>
                  <span className="font-medium text-[#006a65] line-clamp-1">{selectedFormula.activeIngredients.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#edf6f3]/60">
                  <span className="text-[#6a7a78]">Packaging Vessel:</span>
                  <span className="font-medium text-[#151d1c]">{selectedPackage.name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#edf6f3]/60">
                  <span className="text-[#6a7a78]">Hermetic Lid Guard:</span>
                  <span className="font-medium text-[#151d1c]">{spec.hasLid ? 'Reinforced Vapor Lid Cap' : 'Adhesive Peel Label Only'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#edf6f3]/60">
                  <span className="text-[#6a7a78]">Target Volume:</span>
                  <span className="font-mono font-bold text-[#151d1c]">{spec.orderQuantity.toLocaleString()} units</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#6a7a78]">Delivery Target Outpost:</span>
                  <span className="font-medium text-[#151d1c]">{spec.targetMarket}</span>
                </div>
              </div>

              {/* Copy / Print Utilities */}
              <div className="grid grid-cols-2 gap-3.5 mt-6 pt-4 border-t border-[#edf6f3]">
                <button
                  id="spec-copy-btn"
                  onClick={copyTechnicalSheet}
                  className="py-2 px-3 border border-[#b9cac7] hover:border-[#006a65] text-[#3a4a48] hover:text-[#006a65] rounded text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied System' : 'Copy Spec Raw'}</span>
                </button>
                <button
                  id="spec-print-btn"
                  onClick={() => window.print()}
                  className="py-2 px-3 border border-[#b9cac7] hover:border-[#006a65] text-[#3a4a48] hover:text-[#006a65] rounded text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Sheet</span>
                </button>
              </div>

              {/* Dynamic warning system based on high-chemical formulas */}
              {spec.formulationId === 'medical-sanitizer-75' && (
                <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200 text-[10px] font-sans text-amber-800 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-left">HazMat Clearance Notice</span>
                    75% Alcohol content formulations require Class 3 UN 3175 flammable cargo ocean container logs and special maritime port transit declarations.
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
