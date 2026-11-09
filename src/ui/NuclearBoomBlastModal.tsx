import React, { useEffect, useState } from 'react';
import { AudioEngine } from '../audio/AudioEngine';
import { MobileBridge } from '../mobile/mobileBridge';
import { Flame, AlertOctagon, RotateCcw, ShieldAlert, Sparkles } from 'lucide-react';

interface NuclearBoomProps {
  onReturnToBase: () => void;
}

export const NuclearBoomBlastModal: React.FC<NuclearBoomProps> = ({ onReturnToBase }) => {
  const [stage, setStage] = useState<'flash' | 'fireball' | 'shockwave' | 'evacuation'>('flash');
  const [blastProgress, setBlastProgress] = useState<number>(0);

  useEffect(() => {
    // 1. Play massive synthesized nuclear boom & haptics
    const audio = AudioEngine.getInstance();
    audio.playNuclearBoomExplosion();
    MobileBridge.getInstance().hapticNotification('error');

    // 2. Blast Stages Progression
    const t1 = setTimeout(() => setStage('fireball'), 350);
    const t2 = setTimeout(() => setStage('shockwave'), 1200);
    const t3 = setTimeout(() => setStage('evacuation'), 2400);

    // 3. Progress bar ticker
    const interval = setInterval(() => {
      setBlastProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2.5; // ~4 seconds total
      });
    }, 100);

    // 4. Auto-return to base after 4.2s
    const autoReturn = setTimeout(() => {
      onReturnToBase();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(autoReturn);
      clearInterval(interval);
    };
  }, [onReturnToBase]);

  // Generate randomized flying fiery embers
  const embers = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i / 24) * 360;
    const distance = 160 + (i % 4) * 90;
    const size = 8 + (i % 3) * 8;
    const delay = (i % 5) * 0.08;
    return { id: i, angle, distance, size, delay };
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-auto select-none bg-black">
      
      {/* 1. Blinding Initial Nuclear Flash */}
      {stage === 'flash' && (
        <div className="absolute inset-0 bg-white animate-out fade-out duration-500 z-50"></div>
      )}

      {/* 2. Fiery Background Pulsing Wash */}
      <div className={`absolute inset-0 transition-all duration-700 ${
        stage === 'flash'
          ? 'bg-amber-100'
          : stage === 'fireball'
          ? 'bg-gradient-to-b from-orange-600 via-red-700 to-black animate-pulse'
          : 'bg-gradient-to-b from-red-950 via-slate-950 to-black'
      }`}></div>

      {/* 3. Screen Shake & Expanding Nuclear Shockwave Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Shockwave Ring 1 */}
        <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border-[8px] border-amber-400/80 shadow-[0_0_80px_rgba(245,158,11,0.9)] animate-ping duration-1000"></div>

        {/* Shockwave Ring 2 */}
        <div className="w-[450px] h-[450px] sm:w-[750px] sm:h-[750px] rounded-full border-[6px] border-red-500/60 shadow-[0_0_120px_rgba(239,68,68,0.8)] animate-ping duration-1500 delay-200"></div>

        {/* Central Exploding Fireball Mushroom */}
        <div className="relative flex items-center justify-center">
          <div className="w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-gradient-to-r from-yellow-300 via-orange-500 to-red-600 blur-2xl opacity-90 animate-pulse scale-125"></div>
          <div className="absolute w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-yellow-200 blur-xl opacity-95 animate-ping duration-700"></div>
          <div className="absolute w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-white blur-md animate-bounce-subtle"></div>
        </div>

        {/* Flying Fiery Embers & Debris */}
        {embers.map(e => (
          <div
            key={e.id}
            className="absolute rounded-full bg-gradient-to-t from-orange-500 to-yellow-300 shadow-[0_0_12px_rgba(245,158,11,1)]"
            style={{
              width: `${e.size}px`,
              height: `${e.size}px`,
              transform: `rotate(${e.angle}deg) translate(${e.distance}px) rotate(-${e.angle}deg)`,
              transition: 'transform 2.2s cubic-bezier(0.1, 0.8, 0.2, 1), opacity 2.5s ease-out',
              opacity: stage === 'evacuation' ? 0 : 0.95
            }}
          />
        ))}
      </div>

      {/* 4. Nuclear Explosion UI Banner & Comic Text */}
      <div className="relative z-40 max-w-xl mx-auto px-5 py-6 text-center flex flex-col items-center gap-4 animate-in zoom-in-75 duration-300">
        
        {/* Top Danger Flasher */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/90 border-2 border-red-500 text-red-200 text-xs sm:text-sm font-mono font-black shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-bounce">
          <ShieldAlert className="w-5 h-5 text-red-400 animate-spin" />
          <span>⚠️ NUCLEAR OVERLOAD BLAST! ⚠️</span>
          <Flame className="w-5 h-5 text-amber-400" />
        </div>

        {/* Comic Explosion Boom Title */}
        <div className="relative">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-orange-400 to-red-600 drop-shadow-[0_8px_16px_rgba(0,0,0,1)] uppercase">
            💥 BOOOOM! 💥
          </h1>
          <div className="text-lg sm:text-2xl font-black text-amber-300 font-mono tracking-wider drop-shadow-md mt-1">
            TIME EXPIRED!
          </div>
        </div>

        {/* Explanation Card */}
        <div className="w-full bg-slate-950/85 backdrop-blur-md border-2 border-red-500/70 rounded-3xl p-4 sm:p-5 shadow-[0_0_40px_rgba(239,68,68,0.4)] text-left flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-red-400 text-xs font-mono font-bold uppercase">
            <AlertOctagon className="w-4 h-4 text-red-400" />
            <span>CRITICAL REACTION TIMEOUT</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-100 font-sans leading-relaxed">
            The decision countdown ran out! Without an immediate command, unshielded systems experienced an explosive runaway reaction that blasted across the surface!
          </p>

          <div className="bg-emerald-950/70 border border-emerald-500/50 rounded-2xl p-3 flex items-center gap-3">
            <span className="text-2xl">🛸</span>
            <div className="text-xs text-emerald-200 font-sans">
              <strong className="text-emerald-300 font-bold block">EMERGENCY ESCAPE PODS DEPLOYED:</strong>
              Automatic safety protocols shielded Alex, Mia, and Leo, beaming everyone safely back to the outpost!
            </div>
          </div>
        </div>

        {/* Evacuation Progress Bar & Button */}
        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-full bg-slate-900/90 rounded-full h-3 border border-red-500/50 overflow-hidden shadow-inner">
            <div
              className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300 h-full rounded-full transition-all duration-100"
              style={{ width: `${blastProgress}%` }}
            />
          </div>

          <button
            onClick={onReturnToBase}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 hover:from-amber-300 hover:to-red-500 text-slate-950 font-black text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(245,158,11,0.6)] active:scale-95 transition-all"
          >
            <RotateCcw className="w-5 h-5 text-slate-950" />
            <span>RETURN SAFELY TO MOON BASE</span>
          </button>
        </div>

      </div>

    </div>
  );
};
