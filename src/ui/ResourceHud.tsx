import React from 'react';
import { ResourceState } from '../simulation/SimulationModels';
import {
  Zap,
  Droplets,
  Apple,
  Wind,
  Heart,
  Map,
  Volume2,
  VolumeX,
  RotateCcw,
  Trophy,
  Sparkles,
  Play
} from 'lucide-react';

interface ResourceHudProps {
  resources: ResourceState;
  currentChallengeName?: string;
  totalScore: number;
  totalStars: number;
  unlockedBadgeCount: number;
  totalBadgeCount: number;
  isMuted: boolean;
  onOpenMap: () => void;
  onOpenBadges: () => void;
  onOpenAskOrbit: () => void;
  onToggleMute: () => void;
  onResetCamera: () => void;
}

export const ResourceHud: React.FC<ResourceHudProps> = ({
  resources,
  currentChallengeName,
  totalScore,
  totalStars,
  unlockedBadgeCount,
  totalBadgeCount,
  isMuted,
  onOpenMap,
  onOpenBadges,
  onOpenAskOrbit,
  onToggleMute,
  onResetCamera
}) => {
  const getPillStatus = (val: number) => {
    if (val <= 30) return { color: 'text-red-400 border-red-500/60 bg-red-950/60 animate-pulse', smiley: '😨' };
    if (val <= 60) return { color: 'text-amber-400 border-amber-500/50 bg-amber-950/50', smiley: '😐' };
    return { color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/30', smiley: '😊' };
  };

  const pwr = getPillStatus(resources.power);
  const h2o = getPillStatus(resources.water);
  const food = getPillStatus(resources.food);
  const o2 = getPillStatus(resources.oxygen);
  const crew = getPillStatus(resources.crewSafety);

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-2 sm:p-3 safe-pad-top safe-pad-left safe-pad-right pointer-events-none flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-2">
      
      {/* Top Left: Logo + Mission Map Nav */}
      <div className="flex items-center justify-between gap-2">
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-cyan-500/50 rounded-2xl px-3 py-1.5 shadow-xl">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-cyan-400 object-cover shrink-0"
          />
          <div className="min-w-0">
            <div className="text-[10px] sm:text-xs font-black text-cyan-300 font-mono tracking-wider truncate flex items-center gap-1.5">
              <span>OUTPOST</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0"></span>
            </div>
            <div className="text-[10px] text-slate-300 font-mono truncate">
              {currentChallengeName || 'Lunar Rescue Quest'}
            </div>
          </div>

          {/* Mission Map Button */}
          <button
            onClick={onOpenMap}
            className="ml-1 px-3 py-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            title="Open Mission Map"
          >
            <Map className="w-3.5 h-3.5" />
            <span>MAP</span>
          </button>
        </div>

        {/* Top Right Quick Controls */}
        <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-2xl p-1 shadow-xl shrink-0">
          {/* Badges Case */}
          <button
            onClick={onOpenBadges}
            className="px-2.5 py-1 text-slate-200 hover:text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
            title="View Badges"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-[11px]">{unlockedBadgeCount}/{totalBadgeCount}</span>
          </button>

          {/* Ask ORBIT */}
          <button
            onClick={onOpenAskOrbit}
            className="px-2.5 py-1 text-slate-200 hover:text-cyan-300 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
            title="Ask ORBIT"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline text-[11px]">ASK ORBIT</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="p-1.5 text-slate-300 hover:text-cyan-300 rounded-lg transition-colors"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Reset Camera */}
          <button
            onClick={onResetCamera}
            className="p-1.5 text-slate-300 hover:text-cyan-300 rounded-lg transition-colors"
            title="Reset 3D Overview"
          >
            <RotateCcw className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Center 5 Vital Resource Indicators with Smileys */}
      <div className="pointer-events-auto flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar bg-slate-900/90 backdrop-blur-md border border-slate-700/70 rounded-2xl px-3 py-1.5 shadow-xl">
        
        {/* Power */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold shrink-0 ${pwr.color}`}>
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>PWR {Math.round(resources.power)}%</span>
          <span>{pwr.smiley}</span>
        </div>

        {/* Water */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold shrink-0 ${h2o.color}`}>
          <Droplets className="w-3.5 h-3.5 text-blue-400" />
          <span>H₂O {Math.round(resources.water)}%</span>
          <span>{h2o.smiley}</span>
        </div>

        {/* Food */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold shrink-0 ${food.color}`}>
          <Apple className="w-3.5 h-3.5 text-lime-400" />
          <span>FOOD {Math.round(resources.food)}%</span>
          <span>{food.smiley}</span>
        </div>

        {/* Oxygen */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold shrink-0 ${o2.color}`}>
          <Wind className="w-3.5 h-3.5 text-cyan-300" />
          <span>O₂ {Math.round(resources.oxygen)}%</span>
          <span>{o2.smiley}</span>
        </div>

        {/* Crew Safety */}
        <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-xs font-mono font-bold shrink-0 ${crew.color}`}>
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>CREW {Math.round(resources.crewSafety)}%</span>
          <span>{crew.smiley}</span>
        </div>

        {/* Score PTS */}
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl border border-purple-500/40 bg-purple-950/40 text-purple-300 text-xs font-mono font-black shrink-0">
          <span>{totalScore} PTS</span>
        </div>

      </div>

    </header>
  );
};
