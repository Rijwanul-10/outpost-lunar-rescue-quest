export enum RadiationSeverity {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export enum FutureRiskStatus {
  SAFE = "SAFE",
  RISKY = "RISKY",
  FAIL = "FAIL"
}

export enum GreenhouseMode {
  SAVE_RESOURCES = "Conserve",
  BALANCED = "Standard",
  GROW_MORE = "Grow More"
}

export enum ScienceMode {
  PAUSED = "Paused",
  ACTIVE = "Standard",
  HIGH_OUTPUT = "Intensive"
}

export enum SubsystemType {
  SOLAR_ARRAY = "SOLAR_ARRAY",
  GREENHOUSE = "GREENHOUSE",
  HABITAT = "HABITAT",
  SCIENCE_LAB = "SCIENCE_LAB",
  BATTERY_STORAGE = "BATTERY_STORAGE",
  COMM_ARRAY = "COMM_ARRAY",
  ROVER = "ROVER",
  RADIATION_SHIELD = "RADIATION_SHIELD"
}

export type DifficultyMode = 'junior' | 'commander';

export interface ResourceState {
  power: number;         // 0..100 %
  battery: number;       // 0..100 %
  water: number;         // 0..100 %
  food: number;          // 0..100 %
  oxygen: number;        // 0..100 %
  crewHealth: number;    // 0..100 %
  crewSafety: number;    // 0..100 % alias
  scienceScore: number;  // points
  radiation?: RadiationSeverity;
  shieldingActive?: boolean;
  solarIrradiance?: number;
  greenhouseMode?: GreenhouseMode;
  scienceMode?: ScienceMode;
}

export interface SubsystemState {
  type: SubsystemType;
  title: string;
  emoji: string;
  shortName: string;
  health: number;
  active: boolean;
  powerConsumption?: number; // negative is generation
  statusText: string;
  kidExplanation: string;
  actionName?: string;
  position: [number, number, number]; // 3D coordinates in world
}

export interface CrewMember {
  id: 'commander' | 'alex' | 'mia' | 'leo' | 'orbit';
  name: string;
  role: string;
  title: string;
  avatar: string;
  emoji: string;
  color: string;
  responsibilities: string;
  catchphrase: string;
}

export interface QuestChoice {
  id: 'A' | 'B' | 'C';
  title: string;
  description: string;
  icon: string;
  isBest: boolean;
  score: number; // 100 for best, 50 for partial, 0 for unsafe
  stars: number; // 3 for best, 2 for partial, 1 for retry
  deltaPower: number;
  deltaWater: number;
  deltaFood: number;
  deltaOxygen: number;
  deltaCrew: number;
  consequenceTitle: string;
  consequenceExplanation: string;
  worldVisualEffect: 'science_laser' | 'balanced_conserve' | 'emergency_dim';
}

export interface QuestChallenge {
  id: number;
  name: string;
  tagline: string;
  dangerLevel: 'MILD' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  locationName: string;
  subsystemType: SubsystemType;
  storyIntro: string;
  speakerId: 'alex' | 'mia' | 'leo' | 'orbit';
  speakerQuote: string;
  visualProblem: string;
  question: string;
  choices: QuestChoice[];
  bestActionId: 'A' | 'B' | 'C';
  learningObjective: string;
  educationalTakeaway: string;
  reflectionQuestion: string;
  cameraSubsystem: SubsystemType;
}

export interface QuestBadge {
  id: string;
  title: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  challengeId?: number;
}

export interface JuniorBadge {
  id: string;
  title: string;
  emoji: string;
  description: string;
  unlocked: boolean;
  challengeId?: number;
}

export interface AskOrbitItem {
  id: string;
  question: string;
  shortAnswer: string;
  deepDive: string;
  emoji: string;
}

export interface DecisionOption {
  id: string;
  title: string;
  subtitle: string;
  kidTitle?: string;
  kidSummary?: string;
  icon: string;
  benefits: string[];
  costs: string[];
  risks: string[];
  kidPros?: string[];
  kidCons?: string[];
  deltaPower: number;
  deltaBattery: number;
  deltaWater: number;
  deltaFood: number;
  deltaOxygen: number;
  deltaCrew: number;
  deltaScience: number;
  causalChain: string[];
  kidLesson?: string;
  worldVisualEffect: 'science_laser' | 'balanced_conserve' | 'emergency_dim';
}

export interface CriticalEvent {
  id: string;
  triggerCycle: number;
  title: string;
  kidTitle?: string;
  icon: string;
  summary: string;
  kidSummary?: string;
  orbitWarning: string;
  whyExplanation: string;
  kidWhy?: string;
  options: DecisionOption[];
}

export interface TrajectoryPoint {
  hourLabel: string;
  healthValue: number;
}

export interface FutureOutcome {
  option: DecisionOption;
  simulatedEndState: ResourceState;
  riskStatus: FutureRiskStatus;
  trajectory: TrajectoryPoint[];
  forecastBadge: 'OPTIMISTIC' | 'EXPECTED' | 'PESSIMISTIC';
}

export interface MissionLogEntry {
  cycle: number;
  eventTitle: string;
  decisionChosen: string;
  batteryAtEnd: number;
  powerAtEnd: number;
  crewAtEnd: number;
  wasWarningSign: boolean;
  warningNote: string;
}

export interface AutopsyTimelineStep {
  stage: string;
  cycle: number;
  description: string;
  icon: string;
  metricHighlight: string;
}

export interface MissionAutopsyData {
  failedMetric: string;
  primaryCause: string;
  contributingFactors: string[];
  criticalMoment: string;
  missedWarning: string;
  earliestRecoveryPoint: string;
  alternativeDecision: string;
  lessonLearned: string;
  timeline: AutopsyTimelineStep[];
}

export interface MissionLevel {
  id: number;
  title: string;
  subtitle: string;
  totalCycles: number;
  description: string;
  keyConcepts: string[];
  difficulty?: 'Cadet Recruit' | 'Lunar Specialist' | 'Outpost Commander';
  emoji?: string;
}
