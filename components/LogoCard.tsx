import React, { useState } from 'react';
import { generateLogo } from '../services/geminiService';
import { Button } from './Button';

interface LogoCardProps {
  name: string;
  industry: string;
  tone: string;
}

export const LogoCard: React.FC<LogoCardProps> = ({ name, industry, tone }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const url = await generateLogo(name, industry, tone);
      setLogoUrl(url);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Generation failed. Try again?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-slate-200 overflow-hidden group hover:shadow-[6px_6px_0px_0px_rgba(203,213,225,1)] transition-all duration-300 hover:-translate-y-1 transform" style={{ transformStyle: 'preserve-3d' }}>
      <div className="aspect-square bg-slate-200/50 flex items-center justify-center relative overflow-hidden shadow-inner">
        {logoUrl ? (
          <div className="flex flex-col items-center justify-center w-full h-full bg-white p-6">
            <img
              src={logoUrl}
              alt={`${name} logo`}
              className="w-24 h-24 object-contain mb-4 drop-shadow-lg"
            />
            <span className="text-lg font-bold tracking-wide text-slate-800">
              {name}
            </span>
          </div>
        ) : loading ? (
          <div className="w-full h-full bg-white flex flex-col items-center justify-center p-4 text-center">
            <svg className="w-8 h-8 text-indigo-400 animate-spin mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Crafting...</span>
          </div>
        ) : (
          <div className="p-6 text-center w-full h-full flex items-center justify-center bg-white/50">
            <Button 
              variant="outline" 
              className="bg-white border-slate-300 text-slate-600 text-xs px-3 py-2"
              onClick={handleGenerate}
            >
              Generate Logo
            </Button>
          </div>
        )}
        {errorMsg && (
          <div className="absolute inset-0 bg-red-50 flex flex-col items-center justify-center p-4 text-center gap-2 border-2 border-red-200 rounded-t-2xl">
            <p className="text-[10px] text-red-600 font-bold leading-tight uppercase tracking-widest">Error</p>
            <p className="text-[11px] text-slate-700 font-medium leading-relaxed">{errorMsg}</p>
            <button 
              onClick={handleGenerate} 
              className="mt-1 text-indigo-600 font-bold text-[11px] uppercase tracking-tighter hover:underline"
            >
              Retry Generation
            </button>
          </div>
        )}
      </div>
      <div className="p-3 border-t-2 border-slate-200 bg-white flex justify-between items-center">
        <span className="font-bold text-slate-800 truncate pr-2">{name}</span>
        {logoUrl && (
          <a 
            href={logoUrl} 
            download={`${name}-logo.png`}
            className="text-slate-400 hover:text-indigo-600 transition-colors p-1 hover:bg-indigo-50 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          </a>
        )}
      </div>
    </div>
  );
};