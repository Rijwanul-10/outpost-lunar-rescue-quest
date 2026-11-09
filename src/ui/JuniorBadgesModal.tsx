import React from 'react';
import { JuniorBadge } from '../simulation/SimulationModels';
import { X, Award, CheckCircle2, Lock, Sparkles, Trophy } from 'lucide-react';

interface JuniorBadgesModalProps {
  badges: JuniorBadge[];
  onClose: () => void;
}

export const JuniorBadgesModal: React.FC<JuniorBadgesModalProps> = ({ badges, onClose }) => {
  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="absolute inset-0 z-[60] pointer-events-none flex items-center justify-center p-3 sm:p-5">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md pointer-events-auto" onClick={onClose}></div>

      <div className="relative pointer-events-auto w-full max-w-2xl max-h-[88dvh] overflow-y-auto bg-slate-950/95 border-2 border-amber-500/60 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(245,158,11,0.3)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-950/70 border border-amber-500/60 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono text-amber-400 tracking-wider uppercase">
                // JUNIOR ASTRONAUT BADGE CASE
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-100 flex items-center gap-2">
                <span>MISSION ACHIEVEMENTS</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950/70 text-amber-300 border border-amber-500/50">
                  {unlockedCount} / {badges.length} UNLOCKED
                </span>
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

        {/* Badge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                badge.unlocked
                  ? 'bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-slate-950 border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : 'bg-slate-950/50 border-slate-800/80 opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 border ${
                badge.unlocked
                  ? 'bg-amber-950/80 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'bg-slate-900 border-slate-700 text-slate-500'
              }`}>
                {badge.unlocked ? badge.emoji : <Lock className="w-5 h-5 text-slate-500" />}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className={`text-xs sm:text-sm font-bold truncate ${badge.unlocked ? 'text-amber-200' : 'text-slate-400'}`}>
                    {badge.title}
                  </h3>
                  {badge.unlocked && (
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 shrink-0 font-bold">
                      <CheckCircle2 className="w-3 h-3" /> EARNED
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed font-sans">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Encouraging Footer */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center text-xs text-slate-300 font-sans flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Keep exploring the Moon and making smart systems decisions to unlock all junior badges!</span>
        </div>

      </div>
    </div>
  );
};

