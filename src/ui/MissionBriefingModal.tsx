import React from 'react';
import { QuestChallenge, CrewMember } from '../simulation/SimulationModels';
import { X, AlertTriangle, ShieldAlert, Target, Play, Volume2, ArrowLeft } from 'lucide-react';

interface BriefingProps {
  challenge: QuestChallenge;
  speaker: CrewMember;
  onClose: () => void;
  onLaunchChallenge: () => void;
  onSpeak?: (text: string) => void;
}

export const MissionBriefingModal: React.FC<BriefingProps> = ({
  challenge,
  speaker,
  onClose,
  onLaunchChallenge,
  onSpeak
}) => {
  const getDangerBadge = () => {
    switch (challenge.dangerLevel) {
      case 'CRITICAL':
        return 'text-red-400 bg-red-950/80 border-red-500/60 animate-pulse';
      case 'HIGH':
        return 'text-amber-400 bg-amber-950/80 border-amber-500/60';
      default:
        return 'text-cyan-400 bg-cyan-950/80 border-cyan-500/60';
    }
  };

  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center p-3 sm:p-5">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md pointer-events-auto" onClick={onClose}></div>

      <div className="relative pointer-events-auto w-full max-w-2xl max-h-[92dvh] overflow-y-auto bg-slate-950/95 border-2 border-cyan-500/60 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Back to Map"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono text-cyan-400 tracking-wider uppercase font-bold">
                // MISSION BRIEFING • CHALLENGE #{challenge.id}
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-100">
                {challenge.name}
              </h2>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${getDangerBadge()}`}>
            {challenge.dangerLevel} DANGER
          </div>
        </div>

        {/* Location & Tagline */}
        <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
          <span>📍 Location: <strong className="text-cyan-300">{challenge.locationName}</strong></span>
        </div>

        {/* Crew Speaker Dialogue Box */}
        <div className="bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900/90 border border-cyan-500/40 rounded-2xl p-4 flex items-start gap-3.5 shadow-lg">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${speaker.color} flex items-center justify-center text-2xl shrink-0 border border-white/20 shadow-md`}>
            {speaker.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs text-cyan-300 uppercase tracking-wide">
                {speaker.name} ({speaker.title})
              </span>
              {onSpeak && (
                <button
                  onClick={() => onSpeak(`${speaker.name} says: ${challenge.speakerQuote}`)}
                  className="p-1 rounded-lg text-slate-400 hover:text-cyan-300 transition-colors"
                  title="Listen"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-100 font-sans font-medium leading-relaxed italic">
              "{challenge.speakerQuote}"
            </p>
          </div>
        </div>

        {/* Problem Story Description */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
          {challenge.visualProblem}
        </div>

        {/* Mission Objective Callout */}
        <div className="bg-cyan-950/40 border border-cyan-500/40 rounded-2xl p-3 flex items-center gap-2.5 text-xs text-cyan-200 font-sans">
          <Target className="w-5 h-5 text-cyan-400 shrink-0" />
          <div>
            <strong>Objective:</strong> {challenge.learningObjective}
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-2xl border border-slate-700 transition-colors"
          >
            RETURN TO MAP
          </button>

          <button
            onClick={onLaunchChallenge}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>START MISSION CHALLENGE</span>
          </button>
        </div>

      </div>
    </div>
  );
};

