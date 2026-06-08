import { useState, useEffect } from 'react';
import { Menu, X, Shield, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onStartProject: () => void;
  onContactClick: () => void;
}

export default function Navbar({ onStartProject, onContactClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur shadow-sm border-b border-[#b9cac7] py-3' 
        : 'bg-[#ffffff]/90 md:bg-white/70 backdrop-blur-sm border-b border-[#b9cac7]/30 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex justify-between items-center">
        {/* Brand Name & Identity */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 rounded bg-[#006a65] flex items-center justify-center text-white font-mono font-bold text-lg">Y</div>
          <div>
            <div id="nav-brand-title" className="font-sans text-xl md:text-2xl font-bold text-[#006a65] tracking-tight">
              Yiying Hygiene
            </div>
            <div className="text-[9px] font-mono tracking-widest uppercase text-[#3a4a48] -mt-1 block">Clinical OEM/ODM</div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-sans font-medium text-sm text-[#3a4a48]">
          <a href="#" className="hover:text-[#006a65] transition-colors duration-150">Home</a>
          <a href="#" className="hover:text-[#006a65] transition-colors duration-150">About</a>
          <span className="text-[#006a65] font-semibold border-b-2 border-[#006a65] pb-[6px] tracking-tight cursor-default">
            OEM/ODM
          </span>
          <a href="#" className="hover:text-[#006a65] transition-colors duration-150">Products</a>
          <a href="#" className="hover:text-[#006a65] transition-colors duration-150">Factory & Quality</a>
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            id="nav-contact-btn"
            onClick={onContactClick} 
            className="text-xs px-4 py-2 border border-[#6a7a78] text-[#3a4a48] hover:bg-[#edf5f3] rounded transition-all font-mono tracking-tight"
          >
            Technical Inquiry
          </button>
          <button 
            id="nav-primary-cta"
            onClick={onStartProject}
            className="bg-[#006a65] hover:bg-[#00504c] text-white text-xs px-5 py-2.5 rounded font-medium transition-all shadow-sm flex items-center gap-1.5 active:scale-[0.98]"
          >
            Start Project <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            id="nav-hamburger"
            onClick={() => setIsOpen(!isOpen)} 
            className="text-[#151d1c]/80 hover:text-[#006a65]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white/95 border-b border-[#b1cac7] px-6 py-4 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-3 font-sans font-medium text-[#3a4a48]">
            <a href="#" className="py-1 hover:text-[#006a65]" onClick={() => setIsOpen(false)}>Home</a>
            <a href="#" className="py-1 hover:text-[#006a65]" onClick={() => setIsOpen(false)}>About</a>
            <span className="py-1 text-[#006a65] font-bold border-l-2 border-[#006a65] pl-2">OEM/ODM Capabilities</span>
            <a href="#" className="py-1 hover:text-[#006a65]" onClick={() => setIsOpen(false)}>Products</a>
            <a href="#" className="py-1 hover:text-[#006a65]" onClick={() => setIsOpen(false)}>Factory & Quality</a>
          </div>
          <div className="pt-3 border-t border-[#edf5f3] flex flex-col gap-2.5">
            <button 
              onClick={() => { setIsOpen(false); onContactClick(); }}
              className="w-full text-center py-2.5 border border-[#6a7a78] text-[#3a4a48] rounded text-sm font-mono"
            >
              Technical Inquiry
            </button>
            <button 
              onClick={() => { setIsOpen(false); onStartProject(); }}
              className="w-full text-center py-2.5 bg-[#006a65] text-white rounded text-sm font-medium"
            >
              Start Your Custom Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
