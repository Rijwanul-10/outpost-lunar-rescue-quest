import React from 'react';
import { Rocket, Users, HelpCircle, BookOpen, Sparkles, ShieldCheck } from 'lucide-react';

interface WelcomeProps {
  onStartAdventure: () => void;
  onMeetCrew: () => void;
  onHowToPlay: () => void;
  onOpenCredits: () => void;
}

export const WelcomeScreen: React.FC<WelcomeProps> = ({
  onStartAdventure,
  onMeetCrew,
  onHowToPlay,
  onOpenCredits
}) => {
  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-4 sm:p-6 overflow-y-auto">
      {/* Top Bar: NASA Badge & Credits */}
      <div className="pointer-events-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 bg-slate-950/85 backdrop-blur-md border border-cyan-500/40 rounded-2xl px-3.5 py-2 shadow-xl">
          <img
            src="/images/logo.png"
            alt="NASA Space Apps"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-cyan-400 object-cover shrink-0"
          />
          <div className="text-[10px] sm:text-[11px] font-mono tracking-wider">
            <span className="text-cyan-400 font-bold block">NASA SPACE APPS 2026</span>
            <span className="text-slate-300 hidden xs:block">LUNAR RESCUE QUEST</span>
          </div>
        </div>

        <button
          onClick={onOpenCredits}
          className="pointer-events-auto bg-slate-900/85 hover:bg-slate-800 backdrop-blur-md border border-slate-700/60 rounded-2xl px-3 py-2 text-xs text-slate-300 flex items-center gap-1.5 transition-colors shadow-lg active:scale-95"
        >
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">CREDITS & </span>
          <span>LICENSES</span>
        </button>
      </div>

      {/* Main Center Welcome Card */}
      <div className="pointer-events-auto w-full max-w-xl mx-auto text-center flex flex-col items-center gap-4 bg-slate-950/90 backdrop-blur-md border-2 border-cyan-500/60 p-6 sm:p-8 rounded-3xl shadow-[0_0_70px_rgba(6,182,212,0.3)] animate-in fade-in zoom-in-95 duration-300 my-auto">
        
        {/* Animated Subtitle Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/60 text-cyan-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)]">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
          <span>LUNAR RESCUE QUEST</span>
        </div>

        {/* Main Title */}
        <div className="space-y-1">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-200 to-blue-400">
            OUTPOST
          </h1>
          <p className="text-xs sm:text-sm font-mono text-cyan-300 font-bold tracking-wide">
            Lead Your Crew. Face the Unknown. Save the Mission. 🚀
          </p>
        </div>

        {/* Story Hook for Children */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
          <p className="font-bold text-cyan-200 text-sm sm:text-base mb-1">
            "Your astronaut crew needs a commander!"
          </p>
          <p className="text-slate-300 text-xs">
            Solar storms, meteor showers, and water leaks are threatening the lunar base. Can you guide Alex, Mia, Leo, and ORBIT through 6 space challenges and keep everyone safe?
          </p>
        </div>

        {/* Action Buttons: Large and Rounded */}
        <div className="w-full flex flex-col gap-2.5 pt-1">
          {/* Start Adventure Button */}
          <button
            onClick={onStartAdventure}
            className="w-full py-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black text-base sm:text-lg rounded-2xl flex items-center justify-center gap-3 transition-all shadow-[0_0_35px_rgba(6,182,212,0.5)] hover:scale-[1.02] active:scale-95"
          >
            <Rocket className="w-5 h-5" />
            <span>START ADVENTURE</span>
          </button>

          {/* Secondary Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={onMeetCrew}
              className="py-3 px-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              <span>MEET YOUR CREW</span>
            </button>

            <button
              onClick={onHowToPlay}
              className="py-3 px-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>HOW TO PLAY</span>
            </button>
          </div>
        </div>

        {/* Friendly Interaction Tip */}
        <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 pt-1">
          Touch or Drag to Orbit in 3D • Tap Any Module to Inspect • 100% Kid-Safe & Educational
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] sm:text-[11px] font-mono text-slate-400 pb-1">
        NASA SPACE APPS 2026 • 3D THREE.JS SIMULATION • DETERMINISTIC ENGINE
      </div>
    </div>
  );
};

