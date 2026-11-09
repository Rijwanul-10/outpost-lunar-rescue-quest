import React from 'react';
import { QuestBadge, ResourceState } from '../simulation/SimulationModels';
import { Trophy, Star, Award, CheckCircle2, RotateCcw, Compass, Sparkles, Rocket } from 'lucide-react';

interface CompleteProps {
  totalScore: number;
  totalStars: number;
  finalResources: ResourceState;
  badges: QuestBadge[];
  onPlayAgain: () => void;
  onFreeRoam: () => void;
}

export const MissionCompleteModal: React.FC<CompleteProps> = ({
  totalScore,
  totalStars,
  finalResources,
  badges,
  onPlayAgain,
  onFreeRoam
}) => {
  const unlockedBadges = badges.filter(b => b.unlocked);

  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center p-3 sm:p-5">
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md pointer-events-auto"></div>

      <div className="relative pointer-events-auto w-full max-w-2xl max-h-[92dvh] overflow-y-auto bg-slate-950/95 border-2 border-emerald-500/70 rounded-3xl p-5 sm:p-7 shadow-[0_0_80px_rgba(16,185,129,0.35)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header Celebration */}
        <div className="text-center space-y-2 border-b border-slate-800 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-xs font-mono font-bold shadow-lg">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>MISSION ACCOMPLISHED!</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-cyan-200 to-amber-200">
            LUNAR BASE RESCUED!
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 font-sans max-w-md mx-auto">
            Alex, Mia, Leo, and ORBIT salute you! Thanks to your smart leadership, our entire astronaut team and Moon outpost are safe!
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">TOTAL SCORE</div>
            <div className="text-lg sm:text-xl font-black text-purple-300 font-mono mt-0.5">{totalScore} PTS</div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">QUEST STARS</div>
            <div className="text-lg sm:text-xl font-black text-amber-400 font-mono mt-0.5 flex items-center justify-center gap-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{totalStars} / 18</span>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">CREW SAFETY</div>
            <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono mt-0.5">
              {Math.round(finalResources.crewSafety)}% SAFE
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 text-center">
            <div className="text-[10px] font-mono text-slate-400 uppercase">BADGES EARNED</div>
            <div className="text-lg sm:text-xl font-black text-cyan-300 font-mono mt-0.5">
              {unlockedBadges.length} / {badges.length}
            </div>
          </div>
        </div>

        {/* Badges Earned Ribbon */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 border border-amber-500/50 rounded-2xl p-4 space-y-2.5">
          <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 uppercase">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>ASTRONAUT MEDALS & BADGES:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {badges.map(b => (
              <div
                key={b.id}
                className={`p-2 rounded-xl border flex items-center gap-2 text-xs font-bold ${
                  b.unlocked
                    ? 'bg-amber-950/60 border-amber-400/60 text-amber-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                }`}
              >
                <span className="text-lg">{b.emoji}</span>
                <span className="truncate">{b.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Junior Astronaut Diploma Callout */}
        <div className="bg-slate-900/80 border border-cyan-500/40 rounded-2xl p-3.5 text-center text-xs text-slate-200 font-sans space-y-1">
          <div className="font-bold text-cyan-300 text-sm">🎓 NASA Space Apps Challenge 2026 Diploma</div>
          <p className="text-slate-300 text-xs">
            Awarded to <strong>Junior Commander</strong> for demonstrated excellence in systems thinking, resource balancing, and astronaut team protection on the Moon!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-2xl text-xs font-mono text-slate-300 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>PLAY CAMPAIGN AGAIN</span>
          </button>

          <button
            onClick={onFreeRoam}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>FREE ROAM 3D BASE</span>
          </button>
        </div>

      </div>
    </div>
  );
};

