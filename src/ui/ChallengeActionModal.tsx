import React, { useState, useEffect } from 'react';
import { QuestChallenge, QuestChoice } from '../simulation/SimulationModels';
import { Eye, EyeOff, CheckCircle, Play, Sparkles, AlertTriangle, Clock } from 'lucide-react';
import { AudioEngine } from '../audio/AudioEngine';

interface ActionProps {
  challenge: QuestChallenge;
  onExecuteChoice: (choice: QuestChoice) => void;
  onTimeExpired: () => void;
  onPeek3DChange?: (peeking: boolean) => void;
}

const ACTION_TIMEOUT_SECONDS = 20;

export const ChallengeActionModal: React.FC<ActionProps> = ({
  challenge,
  onExecuteChoice,
  onTimeExpired,
  onPeek3DChange
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<'A' | 'B' | 'C'>(challenge.choices[0].id);
  const [peek3D, setPeek3D] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(ACTION_TIMEOUT_SECONDS);

  // Countdown Timer Hook
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeExpired();
          return 0;
        }
        // Play countdown audio tick
        AudioEngine.getInstance().playCountdownTick(prev <= 6);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeExpired]);

  const handleTogglePeek = (val: boolean) => {
    setPeek3D(val);
    onPeek3DChange?.(val);
  };

  const selectedChoice = challenge.choices.find(c => c.id === selectedChoiceId) || challenge.choices[0];

  if (peek3D) {
    return (
      <div className="absolute bottom-6 right-6 z-30 pointer-events-auto flex items-center gap-3">
        {/* Floating Timer Pill in Peek Mode */}
        <div className={`px-4 py-2.5 rounded-2xl border-2 flex items-center gap-2 font-mono text-xs sm:text-sm font-black shadow-2xl backdrop-blur-md ${
          timeLeft <= 5
            ? 'bg-red-950/95 border-red-500 text-red-200 animate-pulse'
            : timeLeft <= 10
            ? 'bg-amber-950/90 border-amber-500 text-amber-300'
            : 'bg-slate-950/90 border-cyan-400 text-cyan-300'
        }`}>
          <Clock className={`w-4 h-4 ${timeLeft <= 5 ? 'text-red-400 animate-spin' : 'text-cyan-400'}`} />
          <span>⏱️ {timeLeft}s REMAINING</span>
        </div>

        <button
          onClick={() => handleTogglePeek(false)}
          className="px-5 py-3 bg-slate-950/95 hover:bg-slate-900 border-2 border-cyan-400 text-cyan-300 font-black text-xs sm:text-sm rounded-2xl flex items-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.5)] animate-bounce-subtle"
        >
          <EyeOff className="w-4 h-4" />
          <span>SHOW ACTION CHOICES</span>
        </button>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center p-3 sm:p-5">
      {/* Soft vignette backdrop so 3D background stays visible */}
      <div className="absolute inset-0 bg-slate-950/40 pointer-events-auto"></div>

      {/* Main Container */}
      <div className="relative pointer-events-auto w-full max-w-3xl max-h-[92dvh] overflow-y-auto bg-slate-950/95 border-2 border-cyan-500/60 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-2xl shrink-0">{challenge.choices[0]?.icon || '🚨'}</span>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-[11px] font-mono text-cyan-400 tracking-wider uppercase font-bold truncate">
                // ACTIVE RESCUE CHALLENGE #{challenge.id}
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-100 truncate">
                {challenge.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Countdown Timer Display Pill */}
            <div className={`px-3 py-1.5 rounded-2xl border-2 flex items-center gap-1.5 font-mono text-xs font-black shadow-lg transition-all ${
              timeLeft <= 5
                ? 'bg-red-950/90 border-red-500 text-red-200 animate-pulse scale-105 shadow-[0_0_20px_rgba(239,68,68,0.7)]'
                : timeLeft <= 10
                ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                : 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
            }`}>
              <Clock className={`w-3.5 h-3.5 ${timeLeft <= 5 ? 'animate-spin text-red-400' : 'text-cyan-400'}`} />
              <span>{timeLeft}s</span>
            </div>

            <button
              type="button"
              onClick={() => handleTogglePeek(true)}
              className="text-xs text-cyan-300 font-mono bg-cyan-950/80 hover:bg-cyan-900 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-cyan-400/50 flex items-center gap-1.5 transition-colors"
              title="Inspect 3D Base Unobstructed"
            >
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="font-bold hidden sm:inline">PEEK 3D BASE</span>
            </button>
          </div>
        </div>

        {/* Countdown Progress Bar */}
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800 -mt-1">
          <div
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${
              timeLeft <= 5
                ? 'bg-gradient-to-r from-red-600 to-amber-500 animate-pulse'
                : timeLeft <= 10
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                : 'bg-gradient-to-r from-cyan-400 to-blue-500'
            }`}
            style={{ width: `${(timeLeft / ACTION_TIMEOUT_SECONDS) * 100}%` }}
          />
        </div>

        {/* The Question Prompt */}
        <div className="bg-gradient-to-r from-blue-950/60 via-cyan-950/50 to-slate-900/60 border border-cyan-500/40 rounded-2xl p-3.5 text-center">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wide mb-0.5">
            COMMANDER DECISION POINT:
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-slate-100 font-sans">
            "{challenge.question}"
          </h3>
        </div>

        {/* 3 Large, Clearly Understandable Decision Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {challenge.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            return (
              <div
                key={choice.id}
                onClick={() => setSelectedChoiceId(choice.id)}
                className={`rounded-2xl p-4 cursor-pointer transition-all border-2 flex flex-col justify-between gap-3 text-left ${
                  isSelected
                    ? 'bg-gradient-to-b from-cyan-950/90 via-slate-900 to-slate-950 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] ring-2 ring-cyan-400/60 scale-[1.02]'
                    : 'bg-slate-900/75 hover:bg-slate-850 border-slate-700/80 opacity-85 hover:opacity-100 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{choice.icon}</span>
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black font-mono border ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 border-cyan-300'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {choice.id}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-100 line-clamp-2">
                    {choice.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed font-sans line-clamp-3">
                    {choice.description}
                  </p>
                </div>

                <div className={`py-1.5 rounded-xl text-center text-xs font-mono font-bold transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md'
                    : 'bg-slate-800/80 text-slate-400'
                }`}>
                  {isSelected ? '✓ SELECTED' : 'TAP TO CHOOSE'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer: Big Execute Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="text-xs text-slate-300 font-sans text-center sm:text-left">
            Selected: <strong className="text-cyan-300 font-bold">{selectedChoice.title}</strong>
          </div>

          <button
            onClick={() => onExecuteChoice(selectedChoice)}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>EXECUTE ACTION & SIMULATE</span>
          </button>
        </div>

      </div>
    </div>
  );
};

