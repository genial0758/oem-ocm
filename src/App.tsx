import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProcessTimeline from './components/ProcessTimeline';
import MaterialSelection from './components/MaterialSelection';
import SpecConfigurator from './components/SpecConfigurator';
import CapacityDashboard from './components/CapacityDashboard';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';
import { CustomProjectSpec } from './types';

export default function App() {
  // Master specification builder state
  const [spec, setSpec] = useState<CustomProjectSpec>({
    title: 'Custom Wet Wipe Brand Spec',
    materialId: 'biodegradable-fiber',
    gsm: 50,
    sheetWidth: 150,
    sheetHeight: 180,
    formulationId: 'pure-water-99',
    packagingId: 'resealable-flowpack',
    hasLid: true,
    orderQuantity: 100000,
    targetMarket: 'European Union'
  });

  // Action: Smooth scrolling to targeted UI blocks
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Action: Pick material base from curation library and load it dynamically
  const handleSelectMaterialBase = (materialId: string) => {
    setSpec(prev => ({ ...prev, materialId }));
    setTimeout(() => {
      scrollToSection('spec-configurator');
    }, 100);
  };

  return (
    <div id="clinical-root-wrapper" className="min-h-screen flex flex-col font-sans selection:bg-[#006a65]/10 selection:text-[#006a65]">
      
      {/* Top Fixed Control Station */}
      <Navbar 
        onStartProject={() => scrollToSection('spec-configurator')} 
        onContactClick={() => scrollToSection('inquiry-section')}
      />

      <main className="flex-grow">
        {/* Hero Clinical Banner */}
        <Hero 
          onStartProject={() => scrollToSection('spec-configurator')}
          onViewSpecs={() => scrollToSection('materials-section')}
        />

        {/* Interactive process phases */}
        <ProcessTimeline />

        {/* Curated Material Library Base selection */}
        <MaterialSelection 
          selectedMaterialId={spec.materialId}
          onSelectBase={handleSelectMaterialBase}
        />

        {/* Active Specification & Quotation Builder */}
        <SpecConfigurator 
          spec={spec}
          onChange={setSpec}
          onProceedToProposal={() => {
            scrollToSection('inquiry-section');
          }}
        />

        {/* Live production output and Shipping delay calculators */}
        <CapacityDashboard />

        {/* Inquiry proposal logging workspace */}
        <InquiryForm 
          currentSpec={spec}
          onSubmitSuccess={() => {
            // Success handler can log info or let the user review vault
          }}
        />
      </main>

      {/* Corporate directory and bulletins */}
      <Footer />
      
    </div>
  );
}
