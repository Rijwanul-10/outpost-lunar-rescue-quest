import React, { useEffect, useRef, useState } from 'react';
import { LunarSceneManager } from './scene/LunarSceneManager';
import { AudioEngine } from './audio/AudioEngine';
import { SimulationEngine } from './simulation/SimulationEngine';
import {
  SubsystemType,
  QuestChallenge,
  QuestChoice,
  ResourceState,
  SubsystemState,
  QuestBadge,
  CrewMember
} from './simulation/SimulationModels';
import { WelcomeScreen } from './ui/WelcomeScreen';
import { MeetCrewModal } from './ui/MeetCrewModal';
import { HowToPlayModal } from './ui/HowToPlayModal';
import { MissionMapScreen } from './ui/MissionMapScreen';
import { MissionBriefingModal } from './ui/MissionBriefingModal';
import { ChallengeActionModal } from './ui/ChallengeActionModal';
import { ChallengeResultModal } from './ui/ChallengeResultModal';
import { MissionCompleteModal } from './ui/MissionCompleteModal';
import { JuniorBadgesModal } from './ui/JuniorBadgesModal';
import { AskOrbitModal } from './ui/AskOrbitModal';
import { ResourceHud } from './ui/ResourceHud';
import { OrbitCompanionWidget } from './ui/OrbitCompanionWidget';
import { SubsystemInspector } from './ui/SubsystemInspector';
import { CreditsModal } from './ui/CreditsModal';
import { CursorPet } from './ui/CursorPet';
import { NuclearBoomBlastModal } from './ui/NuclearBoomBlastModal';
import { MobileBridge } from './mobile/mobileBridge';

type GameScreen =
  | 'welcome'
  | 'meet_crew'
  | 'how_to_play'
  | 'mission_map'
  | 'briefing'
  | 'challenge_active'
  | 'result'
  | 'mission_complete'
  | 'free_roam';

export const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneManagerRef = useRef<LunarSceneManager | null>(null);

  // Core Adventure Game State
  const [gameScreen, setGameScreen] = useState<GameScreen>('welcome');
  const challenges = SimulationEngine.getChallenges();
  const crew = SimulationEngine.getCrewMembers();

  // Campaign Progress State
  const [completedChallengeIds, setCompletedChallengeIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('outpost_completed_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [starsMap, setStarsMap] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('outpost_stars_map');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [totalScore, setTotalScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('outpost_total_score');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [badges, setBadges] = useState<QuestBadge[]>(() => {
    try {
      const saved = localStorage.getItem('outpost_badges');
      return saved ? JSON.parse(saved) : SimulationEngine.getInitialBadges();
    } catch {
      return SimulationEngine.getInitialBadges();
    }
  });

  // Current Active Challenge
  const [activeChallengeId, setActiveChallengeId] = useState<number>(1);
  const currentChallenge = challenges.find(c => c.id === activeChallengeId) || challenges[0];
  const challengeSpeaker = crew.find(m => m.id === currentChallenge.speakerId) || crew[1];

  // Last Executed Choice & Resources
  const [lastChoice, setLastChoice] = useState<QuestChoice | null>(null);
  const [resources, setResources] = useState<ResourceState>(() => SimulationEngine.getInitialState());
  const [previousResources, setPreviousResources] = useState<ResourceState>(() => SimulationEngine.getInitialState());

  // Subsystems & 3D Inspector
  const [subsystems, setSubsystems] = useState<SubsystemState[]>(() =>
    SimulationEngine.getSubsystems(SimulationEngine.getInitialState())
  );
  const [selectedSubsystem, setSelectedSubsystem] = useState<SubsystemState | null>(null);

  // ORBIT Voice & Mood
  const [orbitMessage, setOrbitMessage] = useState<string>(
    "Welcome, Commander! Tap 'START ADVENTURE' to begin our lunar rescue quest!"
  );
  const [orbitMood, setOrbitMood] = useState<'normal' | 'alarmed' | 'thinking' | 'celebrating'>('normal');

  // Modals
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCredits, setShowCredits] = useState<boolean>(false);
  const [showBadges, setShowBadges] = useState<boolean>(false);
  const [showAskOrbit, setShowAskOrbit] = useState<boolean>(false);
  const [showNuclearBlast, setShowNuclearBlast] = useState<boolean>(false);

  // Save Progress to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('outpost_completed_ids', JSON.stringify(completedChallengeIds));
      localStorage.setItem('outpost_stars_map', JSON.stringify(starsMap));
      localStorage.setItem('outpost_total_score', String(totalScore));
      localStorage.setItem('outpost_badges', JSON.stringify(badges));
    } catch {
      // ignore
    }
  }, [completedChallengeIds, starsMap, totalScore, badges]);

  // Speech Narration Helper
  const speakText = (text: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  // Subsystem Selection in 3D
  const handleSubsystemSelected = (type: SubsystemType) => {
    // When a child clicks on the Science Building (or Science Missions button), show the Challenges!
    if (type === SubsystemType.SCIENCE_LAB) {
      sceneManagerRef.current?.selectSubsystem(SubsystemType.SCIENCE_LAB);
      AudioEngine.getInstance().playSuccessChime();
      MobileBridge.getInstance().hapticNotification('success');

      setSelectedSubsystem(null);
      setGameScreen('mission_map');

      const msg = "Entering Science Lab Mission Command! Choose your space challenge, Commander!";
      setOrbitMessage(msg);
      setOrbitMood('celebrating');
      speakText(msg);
      return;
    }

    const sub = subsystems.find(s => s.type === type) || null;
    setSelectedSubsystem(sub);
    AudioEngine.getInstance().playSubsystemFocus();
    MobileBridge.getInstance().hapticImpact('light');

    if (sub) {
      const msg = `Inspecting ${sub.title}. ${sub.kidExplanation}`;
      setOrbitMessage(msg);
      setOrbitMood('normal');
      sceneManagerRef.current?.selectSubsystem(type);
      speakText(msg);
    }
  };

  // Initialize 3D Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;

    const sceneManager = new LunarSceneManager(containerRef.current, {
      onSubsystemClick: (type: SubsystemType) => {
        handleSubsystemSelected(type);
      },
      onCameraTransitionEnd: () => {
        // Camera move completed
      }
    });

    sceneManagerRef.current = sceneManager;

    // Mobile Back Button Setup
    MobileBridge.getInstance().initialize({
      hasOpenModal: () => {
        return !!selectedSubsystem || showCredits || showBadges || showAskOrbit || gameScreen !== 'welcome';
      },
      closeActiveModal: () => {
        if (showCredits) setShowCredits(false);
        else if (showBadges) setShowBadges(false);
        else if (showAskOrbit) setShowAskOrbit(false);
        else if (selectedSubsystem) {
          setSelectedSubsystem(null);
          sceneManagerRef.current?.selectSubsystem(null);
        } else if (gameScreen === 'briefing' || gameScreen === 'challenge_active' || gameScreen === 'result') {
          setGameScreen('mission_map');
        } else if (gameScreen === 'mission_map' || gameScreen === 'free_roam' || gameScreen === 'meet_crew' || gameScreen === 'how_to_play') {
          setGameScreen('welcome');
        }
      }
    });

    return () => {
      sceneManager.dispose();
      sceneManagerRef.current = null;
    };
  }, []);

  /* ------------------ NAVIGATION FLOW HANDLERS ------------------ */

  const handleStartAdventure = () => {
    MobileBridge.getInstance().hapticImpact('medium');
    const audio = AudioEngine.getInstance();
    audio.playAmbient();
    audio.playSuccessChime();

    sceneManagerRef.current?.startArrivalCinematic();
    setSelectedSubsystem(null);
    setGameScreen('free_roam');
    setOrbitMood('celebrating');
    const msg = "Welcome to the Moon Outpost! Tap the Science Building to view and launch your space challenges!";
    setOrbitMessage(msg);
    speakText(msg);
  };

  const handleSelectChallenge = (id: number) => {
    setActiveChallengeId(id);
    setSelectedSubsystem(null);
    const targetChallenge = challenges.find(c => c.id === id) || challenges[0];

    // Focus 3D camera to location
    sceneManagerRef.current?.selectSubsystem(targetChallenge.cameraSubsystem);
    AudioEngine.getInstance().playBeep(640, 0.1);
    setGameScreen('briefing');

    const speaker = crew.find(m => m.id === targetChallenge.speakerId) || crew[1];
    speakText(`${speaker.name} says: ${targetChallenge.speakerQuote}`);
  };

  const handleLaunchChallenge = () => {
    AudioEngine.getInstance().playCrisis();
    MobileBridge.getInstance().hapticNotification('warning');

    // Set 3D environment to alert / crisis
    sceneManagerRef.current?.setVisualMode('crisis');
    sceneManagerRef.current?.selectSubsystem(currentChallenge.cameraSubsystem);

    setGameScreen('challenge_active');
    setOrbitMood('alarmed');
    const msg = `Alert! ${currentChallenge.name} active! Choose your best action to protect our team!`;
    setOrbitMessage(msg);
    speakText(msg);
  };

  // Nuclear Blast Handlers on Action Timeout
  const handleActionTimeout = () => {
    setShowNuclearBlast(true);
    sceneManagerRef.current?.setVisualMode('crisis');
    setOrbitMood('alarmed');
    const msg = "Emergency alert! Decision timeout triggered an explosive overload! Evacuating to safe base!";
    setOrbitMessage(msg);
    speakText(msg);
  };

  const handleBlastReturnToBase = () => {
    setShowNuclearBlast(false);
    setSelectedSubsystem(null);
    setGameScreen('free_roam');
    sceneManagerRef.current?.setVisualMode('nominal');
    sceneManagerRef.current?.resetToOverview();
    AudioEngine.getInstance().playAmbient();

    setOrbitMood('normal');
    const msg = "Whew! Emergency shields evacuated everyone safely back to the moon base! Remember, Commander: space challenges require quick decisions! Tap the Science Building to try again!";
    setOrbitMessage(msg);
    speakText(msg);
  };

  const handleExecuteChoice = (choice: QuestChoice) => {
    setLastChoice(choice);
    setPreviousResources(resources);

    // Apply deterministic simulation deltas
    const updated: ResourceState = {
      power: Math.max(0, Math.min(100, resources.power + choice.deltaPower)),
      battery: Math.max(0, Math.min(100, resources.battery + choice.deltaPower)),
      water: Math.max(0, Math.min(100, resources.water + choice.deltaWater)),
      food: Math.max(0, Math.min(100, resources.food + choice.deltaFood)),
      oxygen: Math.max(0, Math.min(100, resources.oxygen + choice.deltaOxygen)),
      crewHealth: Math.max(0, Math.min(100, resources.crewHealth + choice.deltaCrew)),
      crewSafety: Math.max(0, Math.min(100, resources.crewSafety + choice.deltaCrew)),
      scienceScore: resources.scienceScore + choice.score
    };
    setResources(updated);
    setSubsystems(SimulationEngine.getSubsystems(updated));

    // Update Score & Stars
    setTotalScore(prev => prev + choice.score);
    setStarsMap(prev => ({
      ...prev,
      [activeChallengeId]: Math.max(prev[activeChallengeId] || 0, choice.stars)
    }));

    // Unlock Badges
    const updatedBadges = badges.map(b => {
      if (b.challengeId === activeChallengeId && choice.isBest) {
        return { ...b, unlocked: true };
      }
      return b;
    });

    // If completed challenge
    if (!completedChallengeIds.includes(activeChallengeId)) {
      setCompletedChallengeIds(prev => [...prev, activeChallengeId]);
    }

    // Check Master Commander badge
    const isCampaignFinished =
      completedChallengeIds.length >= 5 ||
      (completedChallengeIds.length === 5 && !completedChallengeIds.includes(activeChallengeId));
    if (isCampaignFinished) {
      updatedBadges.forEach(b => {
        if (b.id === 'badge_master') b.unlocked = true;
      });
    }
    setBadges(updatedBadges);

    // 3D Visual Consequence Execution
    sceneManagerRef.current?.applyConsequenceState(updated, choice.worldVisualEffect);

    const audio = AudioEngine.getInstance();
    if (choice.isBest) {
      audio.playSuccessChime();
      audio.playAmbient();
      setOrbitMood('celebrating');
    } else {
      audio.playWarningKlaxon();
      setOrbitMood('alarmed');
    }

    setGameScreen('result');
    speakText(choice.consequenceExplanation);
  };

  const handleNextChallenge = () => {
    // If there is a next challenge
    if (activeChallengeId < 6) {
      const nextId = activeChallengeId + 1;
      setActiveChallengeId(nextId);
      handleSelectChallenge(nextId);
    } else {
      // Victory ceremony!
      AudioEngine.getInstance().playSuccessChime();
      sceneManagerRef.current?.resetToOverview();
      setGameScreen('mission_complete');
      setOrbitMood('celebrating');
      const winMsg = "Congratulations, Commander! You completed all 6 rescue challenges and saved the Moon outpost!";
      setOrbitMessage(winMsg);
      speakText(winMsg);
    }
  };

  const handleRetryChallenge = () => {
    AudioEngine.getInstance().playFutureForkWhoosh();
    setResources(previousResources);
    setSubsystems(SimulationEngine.getSubsystems(previousResources));
    handleLaunchChallenge();
  };

  const handlePlayAgain = () => {
    const fresh = SimulationEngine.getInitialState();
    setResources(fresh);
    setPreviousResources(fresh);
    setSubsystems(SimulationEngine.getSubsystems(fresh));
    setCompletedChallengeIds([]);
    setStarsMap({});
    setTotalScore(0);
    setActiveChallengeId(1);
    sceneManagerRef.current?.setVisualMode('nominal');
    sceneManagerRef.current?.resetToOverview();
    setGameScreen('mission_map');
  };

  const handleFreeRoam = () => {
    sceneManagerRef.current?.resetToOverview();
    sceneManagerRef.current?.setVisualMode('nominal');
    setSelectedSubsystem(null);
    setGameScreen('free_roam');
    setOrbitMood('normal');
    const msg = "Free Roam Mode active. Touch or drag to orbit in 3D, and tap any module to inspect!";
    setOrbitMessage(msg);
  };

  const handleResetCamera = () => {
    setSelectedSubsystem(null);
    sceneManagerRef.current?.resetToOverview();
    AudioEngine.getInstance().playBeep(520, 0.08);
  };

  const handleToggleMute = () => {
    const muted = AudioEngine.getInstance().toggleMute();
    setIsMuted(muted);
    if (muted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  const totalStars = Object.values(starsMap).reduce((a, b) => a + b, 0);
  const unlockedBadgeCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black select-none font-sans">
      
      {/* Three.js 3D Canvas (Always mounted and active in the background!) */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Screen 1: Welcome Screen */}
      {gameScreen === 'welcome' && (
        <WelcomeScreen
          onStartAdventure={handleStartAdventure}
          onMeetCrew={() => setGameScreen('meet_crew')}
          onHowToPlay={() => setGameScreen('how_to_play')}
          onOpenCredits={() => setShowCredits(true)}
        />
      )}

      {/* Screen 2: Meet Your Crew */}
      {gameScreen === 'meet_crew' && (
        <MeetCrewModal
          crew={crew}
          onClose={() => setGameScreen('welcome')}
          onStartAdventure={handleStartAdventure}
          onSpeak={speakText}
        />
      )}

      {/* Screen 3: How to Play */}
      {gameScreen === 'how_to_play' && (
        <HowToPlayModal
          onClose={() => setGameScreen('welcome')}
          onStartAdventure={handleStartAdventure}
        />
      )}

      {/* Persistent HUD during Free Roam & Active Gameplay */}
      {gameScreen !== 'welcome' && gameScreen !== 'meet_crew' && gameScreen !== 'how_to_play' && gameScreen !== 'mission_map' && (
        <>
          <ResourceHud
            resources={resources}
            currentChallengeName={gameScreen === 'free_roam' ? 'Free Roam 3D Base' : currentChallenge.name}
            totalScore={totalScore}
            totalStars={totalStars}
            unlockedBadgeCount={unlockedBadgeCount}
            totalBadgeCount={badges.length}
            isMuted={isMuted}
            onOpenMap={() => setGameScreen('mission_map')}
            onOpenBadges={() => setShowBadges(true)}
            onOpenAskOrbit={() => setShowAskOrbit(true)}
            onToggleMute={handleToggleMute}
            onResetCamera={handleResetCamera}
          />

          {/* ORBIT Robotic Companion Widget */}
          <div className={selectedSubsystem ? 'hidden md:block' : 'block'}>
            <OrbitCompanionWidget
              message={orbitMessage}
              mood={orbitMood}
              onPlayVoice={() => speakText(orbitMessage)}
              hasVoice={true}
            />
          </div>

          {/* Quick Subsystem Selector Bar in Free Roam */}
          {gameScreen === 'free_roam' && (
            <div
              className={`
                ${selectedSubsystem ? 'hidden md:flex' : 'flex'}
                absolute bottom-2.5 left-2.5 right-2.5 sm:left-auto sm:bottom-6 sm:right-6 z-20
                pointer-events-auto items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar
                bg-slate-950/90 backdrop-blur-md border border-slate-700/70 rounded-2xl p-1 sm:p-1.5 shadow-2xl
              `}
            >
              {subsystems.map((sub) => {
                const isSelected = selectedSubsystem?.type === sub.type;
                const isScience = sub.type === SubsystemType.SCIENCE_LAB;
                return (
                  <button
                    key={sub.type}
                    onClick={() => handleSubsystemSelected(sub.type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 shrink-0 transition-all active:scale-95 ${
                      isScience
                        ? 'bg-gradient-to-r from-purple-600/40 to-pink-600/40 text-purple-200 border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-pulse font-bold'
                        : isSelected
                        ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent'
                    }`}
                  >
                    <span>{isScience ? '🚀' : sub.emoji}</span>
                    <span className="font-bold">{isScience ? '🔬 Science (Missions)' : sub.shortName}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Subsystem Inspector Card (only in Free Roam mode) */}
          {gameScreen === 'free_roam' && (
            <SubsystemInspector
              subsystem={selectedSubsystem}
              onClose={() => {
                setSelectedSubsystem(null);
                sceneManagerRef.current?.selectSubsystem(null);
              }}
              onFocus={() => {
                if (selectedSubsystem) {
                  sceneManagerRef.current?.selectSubsystem(selectedSubsystem.type);
                }
              }}
              onOpenChallenges={() => {
                setSelectedSubsystem(null);
                setGameScreen('mission_map');
              }}
            />
          )}
        </>
      )}

      {/* Screen 4: Mission Map Screen */}
      {gameScreen === 'mission_map' && (
        <MissionMapScreen
          challenges={challenges}
          completedIds={completedChallengeIds}
          starsMap={starsMap}
          totalScore={totalScore}
          unlockedBadgeCount={unlockedBadgeCount}
          totalBadgeCount={badges.length}
          onSelectChallenge={handleSelectChallenge}
          onOpenBadges={() => setShowBadges(true)}
          onMeetCrew={() => setGameScreen('meet_crew')}
          onOpenAskOrbit={() => setShowAskOrbit(true)}
          onFreeRoam={handleFreeRoam}
        />
      )}

      {/* Screen 5: Mission Briefing */}
      {gameScreen === 'briefing' && (
        <MissionBriefingModal
          challenge={currentChallenge}
          speaker={challengeSpeaker}
          onClose={() => setGameScreen('mission_map')}
          onLaunchChallenge={handleLaunchChallenge}
          onSpeak={speakText}
        />
      )}

      {/* Screen 6: Challenge Action Modal (Choose from 3 cards over 3D base!) */}
      {gameScreen === 'challenge_active' && (
        <ChallengeActionModal
          challenge={currentChallenge}
          onExecuteChoice={handleExecuteChoice}
          onTimeExpired={handleActionTimeout}
        />
      )}

      {/* Screen 7: Challenge Result & Consequence Sequence */}
      {gameScreen === 'result' && lastChoice && (
        <ChallengeResultModal
          challenge={currentChallenge}
          choice={lastChoice}
          previousResources={previousResources}
          updatedResources={resources}
          hasNextChallenge={activeChallengeId < 6}
          onNextChallenge={handleNextChallenge}
          onRetry={handleRetryChallenge}
          onSpeak={speakText}
        />
      )}

      {/* Screen 8: Grand Mission Complete Ceremony */}
      {gameScreen === 'mission_complete' && (
        <MissionCompleteModal
          totalScore={totalScore}
          totalStars={totalStars}
          finalResources={resources}
          badges={badges}
          onPlayAgain={handlePlayAgain}
          onFreeRoam={handleFreeRoam}
        />
      )}

      {/* Badges Case Modal */}
      {showBadges && (
        <JuniorBadgesModal
          badges={badges as any}
          onClose={() => setShowBadges(false)}
        />
      )}

      {/* Ask ORBIT Q&A Modal */}
      {showAskOrbit && (
        <AskOrbitModal
          questions={SimulationEngine.getAskOrbitQuestions()}
          onClose={() => setShowAskOrbit(false)}
          onSpeak={speakText}
        />
      )}

      {/* Credits & License Modal */}
      {showCredits && (
        <CreditsModal onClose={() => setShowCredits(false)} />
      )}

      {/* Full-Screen Nuclear Boom Blast Modal on Timeout */}
      {showNuclearBlast && (
        <NuclearBoomBlastModal
          onReturnToBase={handleBlastReturnToBase}
        />
      )}

      {/* Cursor Pet Companion */}
      <CursorPet mood={orbitMood} />

    </div>
  );
};
