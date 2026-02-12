import React, { useState } from 'react';
import { BrandInputs, BrandResult, Tone } from './types';
import { generateBrandIdentity } from './services/geminiService';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { LogoCard } from './components/LogoCard';
import { BrandQuiz } from './components/BrandQuiz';

const App: React.FC = () => {
  const [inputs, setInputs] = useState<BrandInputs>({
    businessDescription: '',
    industry: '',
    targetAudience: '',
    tone: Tone.PROFESSIONAL,
    personalitySummary: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BrandResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [activeTab, setActiveTab] = useState<'core' | 'strategy' | 'visual' | 'marketing'>('core');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await generateBrandIdentity(inputs);
      setResult(data);
      setActiveTab('core');
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate brand identity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleQuizComplete = (summary: string) => {
    setInputs(prev => ({ ...prev, personalitySummary: summary }));
    setShowQuiz(false);
  };

  return (
  <div
    className="min-h-screen text-slate-100 pb-20 bg-black bg-cover bg-center bg-fixed"
    style={{
      backgroundImage: "url('https://img.freepik.com/free-photo/abstract-flowing-neon-wave-background_53876-101942.jpg?semt=ais_hybrid&w=740&q=80')"
    }}
  >
    {/* Dark overlay for readability */}
    <div className="fixed inset-0 bg-black/70 backdrop-blur-[2px] -z-10"></div>

    {showQuiz && (
      <BrandQuiz 
        onComplete={handleQuizComplete} 
        onClose={() => setShowQuiz(false)} 
      />
    )}

    {/* Hero Section */}
    <header className="relative bg-indigo-900 text-white pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-800 to-indigo-900"></div>
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-indigo-200 text-sm font-medium mb-8 shadow-lg backdrop-blur-sm border border-white/10">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse"></span>
            BrandCraft - The Startup Branding OS
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-white mb-6 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
            BrandCraft
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Professional brand strategy, customer personas, and marketing kits powered by advanced AI reasoning.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 -mt-20 relative z-10">
        {/* Form Section */}
        <section className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[8px_8px_0px_0px_rgba(79,70,229,0.2)] border-2 border-indigo-100 p-8 md:p-10 mb-16 relative overflow-hidden">
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                <span className="bg-indigo-100 p-2 rounded-xl text-indigo-600 shadow-inner">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </span>
                Identity Builder
              </h2>
              <button 
                onClick={() => setShowQuiz(true)}
                className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-white hover:bg-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl transition-all border-2 border-indigo-200 hover:border-indigo-600 shadow-[3px_3px_0px_0px_rgba(79,70,229,0.2)] hover:shadow-[0px_0px_0px_0px_rgba(79,70,229,1)] hover:-translate-y-0.5 transform"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                {inputs.personalitySummary ? 'Soul Defined' : 'Brand Quiz'}
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Industry</label>
                  <input 
                    type="text" 
                    name="industry"
                    placeholder="e.g. HealthTech, Fashion"
                    value={inputs.industry}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-inner bg-white text-slate-900 placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tone</label>
                  <select 
                    name="tone"
                    value={inputs.tone}
                    onChange={handleInputChange}
className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white text-slate-900 shadow-inner appearance-none cursor-pointer"                  >
                    {Object.values(Tone).map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Target Audience</label>
                <input 
                  type="text" 
                  name="targetAudience"
                  placeholder="e.g. Professional Developers"
                  value={inputs.targetAudience}
                  onChange={handleInputChange}
                  required
className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-inner bg-white text-slate-900 placeholder:text-slate-400"                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Vision & Details</label>
                <textarea 
                  name="businessDescription"
                  rows={4}
                  placeholder="What are you building?"
                  value={inputs.businessDescription}
                  onChange={handleInputChange}
                  required
className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none shadow-inner bg-white text-slate-900 placeholder:text-slate-400"                ></textarea>
              </div>

              {inputs.personalitySummary && (
                <div className="p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200 shadow-[3px_3px_0px_0px_rgba(16,185,129,0.3)]">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1 block flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                    Personality Locked
                  </span>
                  <p className="text-sm text-emerald-800 italic leading-relaxed">{inputs.personalitySummary}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full py-4 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-[0_8px_0px_0px_rgba(67,56,202,1)]" 
                isLoading={loading}
              >
                Initialize Strategy Engine
              </Button>
            </form>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(185,28,28,0.2)]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
              {error}
            </div>
          )}
        </section>

        {/* Results Section */}
        {result && (
          <section id="results" className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white border-2 border-slate-200 rounded-2xl w-fit mx-auto shadow-[4px_4px_0px_0px_rgba(203,213,225,1)] sticky top-4 z-30 mb-12">
              {[
                { id: 'core', label: 'Identity Core', icon: '💎' },
                { id: 'strategy', label: 'Strategy', icon: '🧠' },
                { id: 'visual', label: 'Visual', icon: '🎨' },
                { id: 'marketing', label: 'Marketing', icon: '🚀' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 transform ${
                    activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-[0_4px_0px_0px_rgba(67,56,202,1)] -translate-y-0.5' 
                    : 'text-slate-500 hover:bg-slate-50 hover:-translate-y-0.5'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* IDENTITY CORE */}
            {activeTab === 'core' && (
              <div className="space-y-8">
                <div className="bg-indigo-900 rounded-3xl p-8 md:p-12 text-white shadow-[8px_8px_0px_0px_rgba(30,27,75,1)] relative overflow-hidden border-2 border-indigo-800 transform hover:scale-[1.01] transition-transform">
                  <div className="absolute top-0 right-0 p-12 opacity-5 -z-0">
                    <svg className="w-64 h-64" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                  </div>
                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 block bg-indigo-800/50 px-3 py-1 rounded-full inline-block">Brand Positioning</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight max-w-4xl tracking-tight italic drop-shadow-md">
                      "{result.positioningStatement}"
                    </h2>
                    <div className="flex flex-wrap gap-4">
                      <div className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-sm font-bold shadow-inner">
                         {result.personalityProfile.archetype} Archetype
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card title="Brand Names & Logic" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>}>
                    <div className="space-y-4">
                      {result.brandNames.map((bn, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 group hover:border-indigo-400 transition-all cursor-pointer hover:shadow-md">
                          <div className="font-bold text-lg text-indigo-600 mb-1">{bn.name}</div>
                          <div className="text-sm text-slate-500 leading-relaxed">{bn.meaning}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                  <Card title="Strategic Taglines" icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>}>
                    <div className="space-y-3">
                      {result.taglines.map((tag, i) => (
                        <div key={i} className="p-4 border-2 border-slate-100 rounded-2xl text-slate-800 font-medium hover:bg-indigo-50 hover:border-indigo-300 transition-all cursor-pointer flex items-center gap-3 shadow-sm">
                          <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-[10px] font-bold shadow-inner">{i+1}</span>
                          "{tag}"
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <Card title="Interpretation" icon="📖"><p className="text-sm leading-relaxed text-slate-600 italic">"{result.justification}"</p></Card>
                  <Card title="Mission" icon="🎯"><p className="text-sm leading-relaxed text-slate-600">{result.mission}</p></Card>
                  <Card title="Vision" icon="🚀"><p className="text-sm leading-relaxed text-slate-600">{result.vision}</p></Card>
                </div>
              </div>
            )}

            {/* STRATEGY & PERSONA */}
            {activeTab === 'strategy' && (
              <div className="space-y-12">
                {/* Persona Profile */}
                <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-[6px_6px_0px_0px_rgba(203,213,225,1)] overflow-hidden">
                  <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-indigo-600">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1 block">Ideal Customer Profile</span>
                      <h3 className="text-3xl font-extrabold drop-shadow-sm">{result.customerPersona.name}</h3>
                      <p className="text-slate-400 font-medium">{result.customerPersona.ageRange} • {result.customerPersona.lifestyle}</p>
                    </div>
                    <div className="mt-4 md:mt-0 px-5 py-2 bg-indigo-600 rounded-lg text-xs font-bold tracking-widest uppercase shadow-[0_4px_0px_0px_rgba(67,56,202,1)]">Target Persona</div>
                  </div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner">🎯</span> Core Goals
                      </h4>
                      <ul className="text-sm text-slate-600 space-y-3">
                        {result.customerPersona.goals.map((g, i) => <li key={i} className="flex gap-2"><span>•</span> {g}</li>)}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="w-8 h-8 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shadow-inner">⚠️</span> Pain Points
                      </h4>
                      <ul className="text-sm text-slate-600 space-y-3">
                        {result.customerPersona.painPoints.map((p, i) => <li key={i} className="flex gap-2"><span>•</span> {p}</li>)}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold text-slate-900 flex items-center gap-2 text-sm uppercase tracking-wider">
                        <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner">📱</span> Discovery
                      </h4>
                      <ul className="text-sm text-slate-600 space-y-3">
                        {result.customerPersona.discoveryChannels.map((c, i) => <li key={i} className="flex gap-2"><span>•</span> {c}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Archetype & Voice */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card title="Brand Archetype" icon="🏛️">
                    <div className="space-y-4">
                      <div className="p-6 bg-indigo-50 rounded-2xl border-2 border-indigo-100 text-center shadow-inner">
                        <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">THE SOUL</div>
                        <div className="text-2xl font-black text-indigo-700 uppercase drop-shadow-sm">{result.personalityProfile.archetype}</div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed italic text-center px-4">
                        "Your customers will experience an emotional response of <strong>{result.personalityProfile.emotionalResponse}</strong>."
                      </p>
                    </div>
                  </Card>
                  <Card title="Voice & Tone Guide" icon="🎙️">
                    <div className="space-y-4 text-sm">
                      <div className="mb-4">
                        <span className="font-bold text-slate-800 block mb-1">Tone Style:</span>
                        <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 shadow-inner">{result.brandVoice.style}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-emerald-50 rounded-2xl border-2 border-emerald-200 shadow-[2px_2px_0px_0px_rgba(16,185,129,1)]">
                          <span className="text-[10px] font-bold text-emerald-600 block mb-2 uppercase tracking-widest">Power Words</span>
                          <div className="flex flex-wrap gap-1">
                            {result.brandVoice.wordsToUse.map((w, i) => <span key={i} className="bg-white px-2 py-0.5 rounded-md text-[11px] font-bold text-emerald-700 border border-emerald-100">{w}</span>)}
                          </div>
                        </div>
                        <div className="p-3 bg-red-50 rounded-2xl border-2 border-red-200 shadow-[2px_2px_0px_0px_rgba(185,28,28,1)]">
                          <span className="text-[10px] font-bold text-red-600 block mb-2 uppercase tracking-widest">Forbidden</span>
                          <div className="flex flex-wrap gap-1">
                            {result.brandVoice.wordsToAvoid.map((w, i) => <span key={i} className="bg-white px-2 py-0.5 rounded-md text-[11px] font-bold text-red-700 border border-red-100">{w}</span>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* VISUAL STUDIO */}
            {activeTab === 'visual' && (
              <div className="space-y-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {result.brandNames.map((bn, i) => (
                    <LogoCard 
                      key={i} 
                      name={bn.name} 
                      industry={inputs.industry} 
                      tone={inputs.tone} 
                    />
                  ))}
                </div>

                <Card title="Color Identity" icon="🎨" className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {result.colorPalette.map((color, i) => (
                      <div key={i} className="flex flex-col items-center text-center gap-4 group">
                        <div 
                          className="w-full h-32 rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] border-4 border-white flex items-center justify-center text-[10px] font-bold text-white group-hover:scale-[1.02] group-hover:-translate-y-1 transition-transform transform" 
                          style={{ backgroundColor: color.hex }}
                        >
                          <span className="bg-black/20 px-3 py-1.5 rounded-lg backdrop-blur-sm text-sm tracking-wider border border-white/20">{color.hex}</span>
                        </div>
                        <div>
                          <div className="font-black text-slate-900 uppercase text-sm tracking-widest mb-2">{color.name}</div>
                          <div className="text-sm text-slate-500 leading-relaxed max-w-[200px] mx-auto">{color.emotion}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* MARKETING KIT */}
            {activeTab === 'marketing' && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {Object.entries(result.socialBio).map(([platform, bio]) => (
                    <div key={platform} className="bg-white rounded-3xl border-2 border-slate-200 p-6 shadow-[4px_4px_0px_0px_rgba(203,213,225,1)] hover:-translate-y-1 transition-transform transform">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="p-2 bg-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 shadow-inner">{platform}</span>
                      </div>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed italic">"{bio}"</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-[2rem] border-2 border-slate-200 shadow-[6px_6px_0px_0px_rgba(203,213,225,1)] overflow-hidden group hover:-translate-y-1 transition-transform transform">
                    <div className="bg-indigo-600 p-6 text-white flex justify-between items-center border-b-4 border-indigo-800">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🎉</span>
                        <span className="font-bold tracking-tight">The Launch Post</span>
                      </div>
                      <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full uppercase font-bold tracking-widest">{result.socialStarterKit.launchPost.type}</span>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="p-5 bg-indigo-50 rounded-2xl text-indigo-800 text-sm font-semibold border-2 border-indigo-100 shadow-inner italic">
                        <span className="block mb-2 text-[10px] text-indigo-400 uppercase font-black tracking-[0.1em]">Visual Hook</span>
                        {result.socialStarterKit.launchPost.content}
                      </div>
                      <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap relative">
                        <span className="block mb-2 text-[10px] text-slate-400 uppercase font-black tracking-[0.1em]">Copywriting</span>
                        {result.socialStarterKit.launchPost.caption}
                        <button onClick={() => navigator.clipboard.writeText(result.socialStarterKit.launchPost.caption)} className="absolute top-0 right-0 bg-slate-100 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-slate-200">📋</button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[2rem] border-2 border-slate-200 shadow-[6px_6px_0px_0px_rgba(203,213,225,1)] overflow-hidden group hover:-translate-y-1 transition-transform transform">
                    <div className="bg-emerald-600 p-6 text-white flex justify-between items-center border-b-4 border-emerald-800">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🔥</span>
                        <span className="font-bold tracking-tight">The Engagement Post</span>
                      </div>
                      <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full uppercase font-bold tracking-widest">{result.socialStarterKit.engagementPost.type}</span>
                    </div>
                    <div className="p-8 space-y-6">
                      <div className="p-5 bg-emerald-50 rounded-2xl text-emerald-800 text-sm font-semibold border-2 border-emerald-100 shadow-inner italic">
                        <span className="block mb-2 text-[10px] text-emerald-400 uppercase font-black tracking-[0.1em]">Creative Direction</span>
                        {result.socialStarterKit.engagementPost.content}
                      </div>
                      <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap relative">
                        <span className="block mb-2 text-[10px] text-slate-400 uppercase font-black tracking-[0.1em]">Copywriting</span>
                        {result.socialStarterKit.engagementPost.caption}
                        <button onClick={() => navigator.clipboard.writeText(result.socialStarterKit.engagementPost.caption)} className="absolute top-0 right-0 bg-slate-100 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-slate-200">📋</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-white border-2 border-slate-200 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(203,213,225,1)]">
                  <h4 className="font-black text-slate-900 mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.2em]">
                    <span className="text-xl">#️⃣</span> SEO Hashtags
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {result.socialStarterKit.hashtags.map((h, i) => (
                      <span key={i} className="px-4 py-2 bg-slate-50 text-slate-500 rounded-xl text-sm font-bold border-2 border-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-pointer hover:shadow-[3px_3px_0px_0px_rgba(79,70,229,0.2)] transform hover:-translate-y-0.5">
                        {h.startsWith('#') ? h : `#${h}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

        <footer className="mt-20 border-t border-white/10 py-16 text-center text-slate-400 bg-black/40 backdrop-blur-md shadow-inner">        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-[0_4px_0px_0px_rgba(67,56,202,1)]">B</div>
<span className="font-black text-white text-2xl tracking-tighter uppercase">BrandCraft</span>          </div>
          <p className="mb-6 max-w-sm mx-auto text-sm leading-relaxed">&copy; {new Date().getFullYear()} Startup Branding Automation Engine. Built for the next generation of founders.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;