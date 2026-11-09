import React from 'react';
import { CrewMember } from '../simulation/SimulationModels';
import { X, Volume2, Sparkles, Rocket } from 'lucide-react';

interface MeetCrewProps {
  crew: CrewMember[];
  onClose: () => void;
  onStartAdventure: () => void;
  onSpeak?: (text: string) => void;
}

export const MeetCrewModal: React.FC<MeetCrewProps> = ({
  crew,
  onClose,
  onStartAdventure,
  onSpeak
}) => {
  return (
    <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center p-3 sm:p-5">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md pointer-events-auto" onClick={onClose}></div>

      <div className="relative pointer-events-auto w-full max-w-3xl max-h-[92dvh] overflow-y-auto bg-slate-950/95 border-2 border-cyan-500/60 rounded-3xl p-5 sm:p-7 shadow-[0_0_60px_rgba(6,182,212,0.3)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🧑‍🚀</span>
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono text-cyan-400 tracking-wider uppercase font-bold">
                // OUTPOST LUNAR EXPEDITION CREW
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-100">
                MEET YOUR ASTRONAUT TEAM
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

        {/* Crew Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {crew.map((member) => (
            <div
              key={member.id}
              className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between gap-3 text-left hover:border-cyan-400/60 transition-all hover:scale-[1.02]"
            >
              <div>
                {/* Avatar & Emoji Badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-2xl shadow-lg border border-white/20`}>
                    {member.emoji}
                  </div>
                  {onSpeak && (
                    <button
                      onClick={() => onSpeak(`${member.name}, ${member.title}. ${member.catchphrase}`)}
                      className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
                      title="Listen"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <h3 className="font-extrabold text-sm text-slate-100">{member.name}</h3>
                <div className="text-[10px] font-mono text-cyan-300 font-bold uppercase">{member.title}</div>
                <p className="text-[11px] text-slate-300 mt-1.5 leading-snug font-sans">
                  {member.responsibilities}
                </p>
              </div>

              {/* Catchphrase Bubble */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2 text-[10px] text-cyan-200/90 italic font-mono">
                "{member.catchphrase}"
              </div>
            </div>
          ))}
        </div>

        {/* Footer with Big Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <div className="text-xs text-slate-300 font-sans text-center sm:text-left">
            Every astronaut depends on your leadership. Make choices that protect the whole team!
          </div>

          <button
            onClick={onStartAdventure}
            className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all active:scale-95"
          >
            <Rocket className="w-4 h-4" />
            <span>LET'S GO TO THE MISSION MAP</span>
          </button>
        </div>

      </div>
    </div>
  );
};

