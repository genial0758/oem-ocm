import React, { useState, useEffect } from 'react';
import { Mail, Phone, Building2, UserCircle2, ArrowUpRight, FolderHeart, Calendar, CheckSquare, Trash2, Send, HeartHandshake } from 'lucide-react';
import { CustomProjectSpec, Proposal } from '../types';
import { MATERIALS, FORMULATIONS, PACKAGING_OPTIONS } from '../data';

interface InquiryFormProps {
  currentSpec: CustomProjectSpec;
  onSubmitSuccess: () => void;
}

export default function InquiryForm({ currentSpec, onSubmitSuccess }: InquiryFormProps) {
  // Input form state
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // Proposals history local storage
  const [history, setHistory] = useState<Proposal[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  // Load history from localstorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('yiying_proposals');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse saved proposals', err);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !email) {
      alert('Please fill out all required fields: Company, Contact Name, and Email.');
      return;
    }

    const newId = `YY-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newProposal: Proposal = {
      id: newId,
      companyName,
      contactName,
      email,
      phone,
      notes,
      spec: { ...currentSpec },
      submittedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'PENDING_REVIEW'
    };

    const nextHistory = [newProposal, ...history];
    localStorage.setItem('yiying_proposals', JSON.stringify(nextHistory));
    setHistory(nextHistory);
    setSubmittedId(newId);

    // Reset fields
    setCompanyName('');
    setContactName('');
    setEmail('');
    setPhone('');
    setNotes('');

    // Trigger success callback
    onSubmitSuccess();
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextHistory = history.filter(p => p.id !== id);
    localStorage.setItem('yiying_proposals', JSON.stringify(nextHistory));
    setHistory(nextHistory);
  };

  const getMaterialName = (id: string) => MATERIALS.find(m => m.id === id)?.name || id;
  const getFormulaName = (id: string) => FORMULATIONS.find(f => f.id === id)?.name || id;
  const getPackageName = (id: string) => PACKAGING_OPTIONS.find(p => p.id === id)?.name || id;

  return (
    <section id="inquiry-section" className="py-20 md:py-28 bg-[#151d1c]/5 border-b border-[#b9cac7]/30">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#006a65] font-semibold tracking-widest uppercase block mb-3">
            Procurement Portal
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-[#151d1c] tracking-tight">
            Ready to scale your hygiene brand?
          </h2>
          <p className="font-sans text-[#3a4a48] text-sm md:text-base max-w-xl mx-auto mt-4 leading-relaxed">
            Partner with Yiying Hygiene for clinical OEM/ODM precision. Submit your configured product specifications to our biological laboratory team today.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Left Panel: Proposal submission success or form inputs */}
          <div className="lg:col-span-7 bg-white border border-[#b9cac7] rounded-xl p-6 md:p-8 text-left">
            
            {submittedId ? (
              <div className="py-8 text-center space-y-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-[#edf6f3] text-[#006a65] rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans text-xl md:text-2xl font-bold text-[#151d1c]">
                    Technical RFQ Submitted Successfully!
                  </h3>
                  <p className="font-mono text-xs text-[#006a65] font-bold tracking-widest">
                    ID: {submittedId}
                  </p>
                  <p className="font-sans text-xs text-[#3a4a48] max-w-sm mx-auto leading-relaxed">
                    We have registered your chemical formulations and fiber substrate coordinates. Our clinical engineering department will email you a complete structural feasibility analysis in 24 hours.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => { setShowHistory(true); setSubmittedId(null); }}
                    className="px-6 py-2.5 bg-[#006a65]/5 hover:bg-[#006a65]/10 text-[#006a65] font-mono text-xs font-bold rounded cursor-pointer border border-[#006a65]/20"
                  >
                    View Active Proposals History
                  </button>
                  <button
                    onClick={() => setSubmittedId(null)}
                    className="px-6 py-2.5 bg-[#006a65] hover:bg-[#00504c] text-white text-xs font-sans font-bold rounded cursor-pointer"
                  >
                    Configure Another Project
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-between items-center pb-3 border-b border-[#edf6f3] mb-4">
                  <span className="font-mono text-xs text-[#6a7a78] font-bold uppercase tracking-wider">
                    SPECIFICATION INQUIRY FORM
                  </span>
                  <span className="text-[10px] text-red-500 font-mono">* Required fields</span>
                </div>

                {/* Company & Name */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#6a7a78] uppercase mb-1.5 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g., Global Hygiene Corp"
                      className="w-full bg-[#f2fbf9]/30 border border-[#b9cac7]/60 p-2.5 rounded text-sm focus:border-[#006a65] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#6a7a78] uppercase mb-1.5 flex items-center gap-1">
                      <UserCircle2 className="w-3.5 h-3.5" />
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g., Sarah Jenkins"
                      className="w-full bg-[#f2fbf9]/30 border border-[#b9cac7]/60 p-2.5 rounded text-sm focus:border-[#006a65] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#6a7a78] uppercase mb-1.5 flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@hygienecorp.com"
                      className="w-full bg-[#f2fbf9]/30 border border-[#b9cac7]/60 p-2.5 rounded text-sm focus:border-[#006a65] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#6a7a78] uppercase mb-1.5 flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5" />
                      Telephone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 912-4022"
                      className="w-full bg-[#f2fbf9]/30 border border-[#b9cac7]/60 p-2.5 rounded text-sm focus:border-[#006a65] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Notes/Queries */}
                <div>
                  <label className="block text-xs font-mono font-bold text-[#6a7a78] uppercase mb-1.5">
                    Custom Formulation / Chemical Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Describe any proprietary ingredients, scent ratios, custom organic materials, or certification requirements here..."
                    className="w-full bg-[#f2fbf9]/30 border border-[#b9cac7]/60 p-2.5 rounded text-sm focus:border-[#006a65] focus:outline-none"
                  />
                </div>

                {/* Terms Disclaimer line */}
                <div className="text-[11px] text-[#6a7a78] leading-tight pt-2">
                  By submitting this request, you authorize Yiying Hygiene biological labs to log the selected GSM coordinates and formula stability coefficients to compute feasibility audits.
                </div>

                {/* Send action Button */}
                <button
                  type="submit"
                  className="w-full bg-[#006a65] hover:bg-[#00504c] text-white py-3 rounded font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
                >
                  <span>Submit Technical Request for Quote</span>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            )}

          </div>

          {/* Right Panel: Spec reference metadata or history dashboard logs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* active current Spec Reference */}
            <div className="bg-[#e7f0ed]/70 p-6 rounded-xl border border-[#b9cac7] text-left">
              <span className="font-mono text-[10px] text-[#006a65] font-bold tracking-widest block uppercase mb-4">
                Injected Specification payload:
              </span>
              <div className="space-y-4 font-sans text-xs">
                <div>
                  <span className="text-[#6a7a78] block text-[10px]">PROJECT REFERENCE TITLE</span>
                  <span className="font-medium text-[#151d1c] text-sm">{currentSpec.title || 'Clinical Spec Draft'}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#6a7a78] block text-[10px]">BASE SUBSTRATE</span>
                    <span className="font-semibold text-[#151d1c]">{getMaterialName(currentSpec.materialId)}</span>
                  </div>
                  <div>
                    <span className="text-[#6a7a78] block text-[10px]">MATERIAL DENSITY</span>
                    <span className="font-mono font-bold text-[#006a65]">{currentSpec.gsm} GSM</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#6a7a78] block text-[10px]">REAGENT LIQUID</span>
                    <span className="font-semibold text-[#151d1c] line-clamp-1">{getFormulaName(currentSpec.formulationId)}</span>
                  </div>
                  <div>
                    <span className="text-[#6a7a78] block text-[10px]">SHIPPING OUTPOST</span>
                    <span className="font-medium text-[#151d1c] line-clamp-1">{currentSpec.targetMarket}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard history logs toggle */}
            <div className="bg-white border border-[#b9cac7] rounded-xl overflow-hidden text-left shadow-sm">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="w-full p-4 flex justify-between items-center bg-[#edf6f3]/40 border-b border-[#edf6f3] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FolderHeart className="w-4 h-4 text-[#006a65]" />
                  <span className="font-mono text-xs font-bold text-[#3a4a48]">
                    Client Request Vault ({history.length})
                  </span>
                </div>
                <span className="text-[10px] text-[#006a65] font-mono hover:underline">
                  {showHistory ? 'Hide List' : 'Expand Workspace Logs'}
                </span>
              </button>

              {showHistory && (
                <div className="p-4 max-h-[300px] overflow-y-auto space-y-3.5 divide-y divide-[#edf6f3]/60">
                  {history.length === 0 ? (
                    <p className="text-xs text-center text-[#6a7a78] py-8">
                      No configurations saved in this workspace yet. Submit a sample template to start database logging.
                    </p>
                  ) : (
                    history.map((prop, index) => (
                      <div key={prop.id} className={`text-xs ${index > 0 ? 'pt-4' : ''}`}>
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <span className="font-mono font-semibold text-[#006a65]">{prop.id}</span>
                            <span className="text-[10px] text-[#6a7a78] ml-2 block sm:inline">{prop.submittedAt}</span>
                          </div>
                          <button
                            onClick={(e) => deleteHistoryItem(prop.id, e)}
                            className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 cursor-pointer"
                            title="Delete configuration log"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-[11px] font-sans text-[#3a4a48]/90">
                          <div><span className="text-[#6a7a78]">Client:</span> {prop.companyName}</div>
                          <div><span className="text-[#6a7a78]">Qty:</span> {prop.spec.orderQuantity.toLocaleString()} U</div>
                          <div className="col-span-2 line-clamp-1"><span className="text-[#6a7a78]">Compound:</span> {getFormulaName(prop.spec.formulationId)}</div>
                        </div>
                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="text-[9px] bg-amber-50 text-amber-700 font-mono px-1.5 py-0.5 rounded border border-amber-200">
                            Status: PENDING REVIEW
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
