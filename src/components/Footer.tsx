import React, { useState } from 'react';
import { MailCheck, Send, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[#edf6f3] border-t border-[#b9cac7]">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
        
        {/* Col 1: Branding */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#006a65] flex items-center justify-center text-white font-mono font-bold text-sm">Y</div>
            <h4 className="font-sans text-lg font-bold text-[#151d1c]">Yiying Hygiene</h4>
          </div>
          <p className="font-sans text-xs text-[#3a4a48] leading-relaxed max-w-sm">
            Precision Manufacturing for Global Heath. Specialized in high-volume, biological-stable private label wet wipes and hygiene substrates.
          </p>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#006a65] font-semibold bg-white rounded p-2 border border-[#b9cac7]/30 w-fit">
            <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
            <span>ISO 9001 / ISO 22716 REGISTERED</span>
          </div>
        </div>

        {/* Col 2: Services */}
        <div>
          <h5 className="font-mono text-xs font-bold text-[#006a65] uppercase tracking-wider mb-4">
            OEM/ODM Services
          </h5>
          <ul className="space-y-2 text-xs font-sans text-[#3a4a48]">
            <li><a href="#" className="hover:text-[#006a65] hover:underline transition-all">OEM Wet Wipe Solutions</a></li>
            <li><a href="#" className="hover:text-[#006a65] hover:underline transition-all">ODM Formula Development</a></li>
            <li><a href="#" className="hover:text-[#006a65] hover:underline transition-all">Chemical R&D Consulting</a></li>
            <li><a href="#" className="hover:text-[#006a65] hover:underline transition-all">Multi-Port Shipping & Logistics</a></li>
            <li><a href="#" className="hover:text-[#006a65] hover:underline transition-all">Laminar Flow Custom Filling</a></li>
          </ul>
        </div>

        {/* Col 3: Compliance */}
        <div>
          <h5 className="font-mono text-xs font-bold text-[#006a65] uppercase tracking-wider mb-4">
            Compliance & Technical
          </h5>
          <ul className="space-y-2 text-xs font-sans text-[#3a4a48]">
            <li><a href="#" className="hover:text-[#006a65] hover:underline transition-all">Zero-Plastics Sustainability Grid</a></li>
            <li><a href="#" className="hover:text-[#006a65] hover:underline transition-all">Technical Material Safety (MSDS)</a></li>
            <li><a href="#" className="hover:text-[#006a65] hover:underline transition-all">Regulatory Outpost Approvals</a></li>
            <li><a href="#" className="hover:text-[#006a65] hover:underline transition-all">Chemical Bio-assessment Records</a></li>
            <li><a href="#" className="hover:text-[#006a65] hover:underline transition-all">Clinical Quality Control Logs</a></li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="space-y-4">
          <h5 className="font-mono text-xs font-bold text-[#006a65] uppercase tracking-wider">
            Newsletter
          </h5>
          <p className="font-sans text-xs text-[#3a4a48] leading-relaxed">
            Subscribe to receive regular industrial hygiene bulletins and technical formulation guides.
          </p>

          {subscribed ? (
            <div className="p-3 bg-white text-[#006a65] border border-[#b9cac7]/30 rounded text-xs font-sans flex items-center gap-2 animate-in fade-in duration-300">
              <MailCheck className="w-4 h-4 text-[#006a65]" />
              <span>Subscription Registered Successfully!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="procurement@brand.com"
                className="bg-white border border-[#b9cac7] focus:border-[#006a65] outline-none text-xs p-2.5 rounded text-[#151d1c] w-full"
              />
              <button 
                type="submit"
                className="bg-[#006a65] hover:bg-[#00504c] text-white p-2.5 rounded cursor-pointer transition-all shrink-0"
                title="Subscribe to bulletin"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Copyright info */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-[#b9cac7]/40 text-center text-xs font-sans text-[#3a4a48]/70">
        <div>© 2024 Yiying Hygiene. All Rights Reserved. Clinical OEM/ODM Wet Wipe Manufacturing Outpost.</div>
        <div className="text-[10px] text-[#6a7a78] font-mono mt-1">SOP Standards of Cleanroom Lab Operations apply globally.</div>
      </div>
    </footer>
  );
}
