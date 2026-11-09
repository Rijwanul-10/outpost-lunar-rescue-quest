import React from 'react';
import { QuestChallenge, QuestChoice, ResourceState } from '../simulation/SimulationModels';
import {
  Star,
  CheckCircle2,
  AlertOctagon,
  RotateCcw,
  ArrowRight,
  Lightbulb,
  Trophy,
  Zap,
  Droplets,
  Apple,
  Wind,
  Heart,
  Volume2
} from 'lucide-react';

interface ResultProps {
  challenge: QuestChallenge;
  choice: QuestChoice;
  previousResources: ResourceState;
  updatedResources: ResourceState;
  hasNextChallenge: boolean;
  onNextChallenge: () => void;
  onRetry: () => void;
  onSpeak?: (text: string) => void;
}

export const ChallengeResultModal: React.FC<ResultProps> = ({
  challenge,
  choice,
  previousResources,
  updatedResources,
  hasNextChallenge,
  onNextChallenge,
  onRetry,
  onSpeak
}) => {
  const isBest = choice.isBest;

  const resourcePills = [
    { label: 'POWER', delta: choice.deltaPower, icon: <Zap className="w-3.5 h-3.5 text-amber-400" /> },
    { label: 'WATER', delta: choice.deltaWater, icon: <Droplets className="w-3.5 h-3.5 text-blue-400" /> },
    { label: 'FOOD', delta: choice.deltaFood, icon: <Apple className="w-3.5 h-3.5 text-lime-400" /> },
    { label: 'OXYGEN', delta: choice.deltaOxygen, icon: <Wind className="w-3.5 h-3.5 text-cyan-300" /> },
    { label: 'CREW SAFETY', delta: choice.deltaCrew, icon: <Heart className="w-3.5 h-3.5 text-rose-400" /> }
  ];

  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center p-3 sm:p-5">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md pointer-events-auto"></div>

      <div className="relative pointer-events-auto w-full max-w-2xl max-h-[92dvh] overflow-y-auto bg-slate-950/95 border-2 border-cyan-500/60 rounded-3xl p-5 sm:p-7 shadow-[0_0_70px_rgba(6,182,212,0.35)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header: Stars & Outcome Badge */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border shrink-0 ${
              isBest
                ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-amber-950/80 border-amber-500/60 text-amber-400'
            }`}>
              {isBest ? <CheckCircle2 className="w-6 h-6" /> : <AlertOctagon className="w-6 h-6" />}
            </div>

            <div>
              <div className="text-[10px] sm:text-[11px] font-mono text-cyan-400 tracking-wider uppercase font-bold">
                // MISSION CHALLENGE #{challenge.id} RESULT
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-100">
                {choice.consequenceTitle}
              </h2>
            </div>
          </div>

          {/* Stars & Points Awarded */}
          <div className="text-right">
            <div className="flex items-center gap-1 justify-end mb-1">
              {[1, 2, 3].map((starIdx) => (
                <Star
                  key={starIdx}
                  className={`w-5 h-5 ${
                    starIdx <= choice.stars
                      ? 'text-amber-400 fill-amber-400 animate-bounce-subtle'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>
            <div className="text-xs font-mono font-black text-purple-300">
              +{choice.score} PTS
            </div>
          </div>
        </div>

        {/* ORBIT Feedback Bubble */}
        <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-4 flex items-start gap-3.5 shadow-md">
          <div className="w-11 h-11 rounded-2xl overflow-hidden border border-cyan-400 shrink-0 bg-slate-950">
            <img src="/images/orbit_advisor.jpg" alt="ORBIT" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-bold text-xs text-cyan-300 font-mono">ORBIT ROBOT COMPANION</span>
              {onSpeak && (
                <button
                  onClick={() => onSpeak(choice.consequenceExplanation)}
                  className="p-1 rounded-lg text-slate-400 hover:text-cyan-300 transition-colors"
                  title="Listen"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
              "{choice.consequenceExplanation}"
            </p>
          </div>
        </div>

        {/* Resource Effects Strip */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">
            RESOURCE & TEAM SAFETY DELTAS:
          </div>
          <div className="flex flex-wrap gap-2">
            {resourcePills.map(r => {
              const isPos = r.delta > 0;
              const isNeg = r.delta < 0;
              return (
                <div
                  key={r.label}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 ${
                    isPos
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                      : isNeg
                      ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  {r.icon}
                  <span>{r.label}:</span>
                  <span>{isPos ? `+${r.delta}%` : isNeg ? `${r.delta}%` : 'SAFE'}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* What Did You Learn? (Educational Takeaway) */}
        <div className="bg-gradient-to-r from-blue-950/50 via-slate-900 to-indigo-950/50 border border-blue-500/40 rounded-2xl p-4 flex items-start gap-3 shadow-inner">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-cyan-300 font-mono uppercase tracking-wider">
              WHAT DID YOU LEARN? (NASA SPACE SCIENCE)
            </h4>
            <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
              {challenge.educationalTakeaway}
            </p>
            <p className="text-xs text-cyan-200/90 font-mono italic pt-1">
              🧠 {challenge.reflectionQuestion}
            </p>
          </div>
        </div>

        {/* Action Buttons: Retry vs Next */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={onRetry}
            className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-2xl text-xs font-mono text-slate-300 flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4 text-slate-400" />
            <span>TRY AGAIN (EARN 3 STARS)</span>
          </button>

          <button
            onClick={onNextChallenge}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <span>{hasNextChallenge ? 'NEXT CHALLENGE' : 'VIEW FINAL VICTORY!'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

