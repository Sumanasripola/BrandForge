
import React, { useState } from 'react';
import { Button } from './Button';
import { QuizQuestion } from '../types';

const QUESTIONS: QuizQuestion[] = [
  {
    id: 'heritage',
    question: 'How does your brand relate to tradition?',
    options: [
      { label: 'Traditional', value: 'established and reliable', description: 'Rooted in history and proven methods.' },
      { label: 'Disruptive', value: 'bold and groundbreaking', description: 'Challenging the status quo.' }
    ]
  },
  {
    id: 'relationship',
    question: 'What is the ideal relationship with your customer?',
    options: [
      { label: 'The Expert', value: 'guiding and professional', description: 'A trusted authority in the field.' },
      { label: 'The Peer', value: 'relatable and friendly', description: 'Like a smart, helpful friend.' }
    ]
  },
  {
    id: 'energy',
    question: 'What is the energy level of the brand?',
    options: [
      { label: 'Calm & Zen', value: 'calm, focused, and minimal', description: 'Quiet efficiency and premium stillness.' },
      { label: 'Dynamic & High-Energy', value: 'dynamic, experimental, and loud', description: 'Vibrant, fast-paced, and bold.' }
    ]
  },
  {
    id: 'visual_preference',
    question: 'Which visual style resonates most?',
    options: [
      { label: 'Minimalist Luxury', value: 'luxury minimalist', description: 'Clean lines, lots of negative space.' },
      { label: 'Organic & Human', value: 'organic and approachable', description: 'Soft textures, hand-drawn elements.' }
    ]
  }
];

interface BrandQuizProps {
  onComplete: (summary: string) => void;
  onClose: () => void;
}

export const BrandQuiz: React.FC<BrandQuizProps> = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [QUESTIONS[currentStep].id]: value };
    setAnswers(newAnswers);
    
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const summary = Object.values(newAnswers).join(', ');
      onComplete(`Preferred Brand Vibe: ${newAnswers.energy}, Style Preference: ${newAnswers.visual_preference}, Heritage: ${newAnswers.heritage}, Relationship: ${newAnswers.relationship}. Overall summary: ${summary}.`);
    }
  };

  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="h-2 bg-slate-100 w-full">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Step {currentStep + 1} of {QUESTIONS.length}</span>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-8 leading-tight">
            {QUESTIONS[currentStep].question}
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {QUESTIONS[currentStep].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className="group p-5 rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 text-left transition-all duration-200"
              >
                <div className="font-bold text-slate-800 group-hover:text-indigo-700 mb-1">{opt.label}</div>
                <div className="text-sm text-slate-500 group-hover:text-indigo-600/80 leading-relaxed">{opt.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="px-8 py-6 bg-slate-50 text-center border-t border-slate-100">
          <p className="text-xs text-slate-400 font-medium italic">Your choices help our AI strategist craft a unique identity.</p>
        </div>
      </div>
    </div>
  );
};
