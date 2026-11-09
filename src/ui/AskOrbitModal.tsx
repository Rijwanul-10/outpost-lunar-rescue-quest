import React, { useState } from 'react';
import { AskOrbitItem } from '../simulation/SimulationModels';
import { X, Sparkles, MessageCircleQuestion, Volume2, ChevronRight, BookOpen } from 'lucide-react';

interface AskOrbitModalProps {
  questions: AskOrbitItem[];
  onClose: () => void;
  onSpeak?: (text: string) => void;
}

export const AskOrbitModal: React.FC<AskOrbitModalProps> = ({ questions, onClose, onSpeak }) => {
  const [selectedQuestion, setSelectedQuestion] = useState<AskOrbitItem>(questions[0]);

  const handleSelect = (q: AskOrbitItem) => {
    setSelectedQuestion(q);
    if (onSpeak) {
      onSpeak(`${q.shortAnswer} ${q.deepDive}`);
    }
  };

  return (
    <div className="absolute inset-0 z-[60] pointer-events-none flex items-center justify-center p-3 sm:p-5">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md pointer-events-auto" onClick={onClose}></div>

      <div className="relative pointer-events-auto w-full max-w-3xl max-h-[90dvh] overflow-y-auto bg-slate-950/95 border-2 border-cyan-500/60 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl overflow-hidden border border-cyan-400 bg-slate-900 flex items-center justify-center shrink-0">
              <img src="/images/orbit_advisor.jpg" alt="ORBIT" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono text-cyan-400 tracking-wider uppercase">
                // ORBIT AI MISSION ADVISOR • KID SPACE GUIDE
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-100 flex items-center gap-2">
                <span>ASK ORBIT ABOUT THE MOON!</span>
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
          
          {/* Question List (Left Column) */}
          <div className="md:col-span-2 flex flex-col gap-2 max-h-[50vh] overflow-y-auto no-scrollbar">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider px-1">
              CHOOSE A QUESTION:
            </div>
            {questions.map(q => {
              const isSelected = selectedQuestion.id === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => handleSelect(q)}
                  className={`text-left p-3 rounded-2xl border text-xs transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-cyan-950/70 text-cyan-200 border-cyan-400/80 shadow-[0_0_15px_rgba(6,182,212,0.3)] font-bold'
                      : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800/80 border-slate-800'
                  }`}
                >
                  <span className="text-base shrink-0">{q.emoji}</span>
                  <span className="flex-1 truncate">{q.question}</span>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Answer Card (Right Column) */}
          <div className="md:col-span-3 bg-gradient-to-br from-slate-900/95 via-slate-950 to-slate-950 border border-cyan-500/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 shadow-inner">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                  <span className="text-lg">{selectedQuestion.emoji}</span>
                  <span>{selectedQuestion.question}</span>
                </span>
                {onSpeak && (
                  <button
                    onClick={() => onSpeak(`${selectedQuestion.shortAnswer} ${selectedQuestion.deepDive}`)}
                    className="p-1.5 rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 transition-colors"
                    title="Speak Answer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Kid summary callout */}
              <div className="bg-cyan-950/50 border border-cyan-500/50 rounded-xl p-3 text-sm font-bold text-cyan-200 flex items-center gap-2">
                <span>💡</span>
                <span>"{selectedQuestion.shortAnswer}"</span>
              </div>

              {/* Deep dive explanation */}
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans space-y-2">
                <p>{selectedQuestion.deepDive}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3 h-3 text-cyan-400" />
              <span>NASA Artemis Data & Lunar Science Foundation</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

