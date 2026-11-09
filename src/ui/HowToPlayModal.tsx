import React from 'react';
import { X, AlertTriangle, Lightbulb, Trophy, CheckCircle2, Rocket } from 'lucide-react';

interface HowToProps {
  onClose: () => void;
  onStartAdventure: () => void;
}

export const HowToPlayModal: React.FC<HowToProps> = ({ onClose, onStartAdventure }) => {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center p-3 sm:p-5">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md pointer-events-auto" onClick={onClose}></div>

      <div className="relative pointer-events-auto w-full max-w-2xl max-h-[90dvh] overflow-y-auto bg-slate-950/95 border-2 border-amber-500/60 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(245,158,11,0.3)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📖</span>
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono text-amber-400 tracking-wider uppercase font-bold">
                // JUNIOR ASTRONAUT FLIGHT MANUAL
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-100">
                HOW TO PLAY OUTPOST
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

        {/* 3 Step Visual Guide for Children */}
        <div className="space-y-3">
          
          {/* Step 1 */}
          <div className="bg-slate-900/80 border border-amber-500/40 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-950/80 border border-amber-500/60 flex items-center justify-center text-amber-400 font-black text-lg shrink-0">
              1
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Spot the Lunar Danger</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                ORBIT and your crew will alert you when a space emergency strikes (solar storms, falling meteorites, or power drops). Read what happened!
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900/80 border border-cyan-500/40 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-500/60 flex items-center justify-center text-cyan-400 font-black text-lg shrink-0">
              2
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-cyan-400" />
                <span>Choose Your Best Action (A, B, or C)</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                You will see 3 big choice cards. Think like a real space commander: What protects your crew's air, water, and power best? Tap to preview in 3D!
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900/80 border border-emerald-500/40 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400 font-black text-lg shrink-0">
              3
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-emerald-400" />
                <span>Save the Base & Earn 3 Stars!</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed font-sans">
                Watch your 3D base survive the challenge! Earn up to 3 stars, unlock special astronaut badges, and learn real NASA space science secrets!
              </p>
            </div>
          </div>

        </div>

        {/* Never Punish Rule Callout */}
        <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-2xl p-3 text-center text-xs text-cyan-200 font-sans">
          💡 <strong>Junior Astronaut Rule:</strong> Astronauts never fail — if an option didn't work, ORBIT will explain why and let you try again!
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-slate-800 flex justify-end">
          <button
            onClick={onStartAdventure}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.4)] transition-all active:scale-95"
          >
            <Rocket className="w-4 h-4" />
            <span>GOT IT, LET'S PLAY!</span>
          </button>
        </div>

      </div>
    </div>
  );
};

