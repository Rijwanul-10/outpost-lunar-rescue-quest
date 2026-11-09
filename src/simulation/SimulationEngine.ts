import {
  SubsystemType,
  CrewMember,
  QuestChoice,
  QuestChallenge,
  ResourceState,
  SubsystemState,
  QuestBadge,
  AskOrbitItem
} from './SimulationModels';

export class SimulationEngine {
  public static getCrewMembers(): CrewMember[] {
    return [
      {
        id: 'commander',
        name: 'Commander (You)',
        role: 'Mission Commander',
        title: 'Team Leader',
        avatar: '/images/logo.png',
        emoji: '🧑‍🚀',
        color: 'from-cyan-500 to-blue-600',
        responsibilities: 'Make all key decisions, balance resources, and keep the team safe!',
        catchphrase: 'Lead your crew, face the unknown!'
      },
      {
        id: 'alex',
        name: 'Alex',
        role: 'Chief Engineer',
        title: 'Power & Tech Specialist',
        avatar: '/images/logo.png',
        emoji: '⚡',
        color: 'from-amber-500 to-yellow-600',
        responsibilities: 'Maintains solar arrays, high-voltage battery storage, and lunar rover mechanics.',
        catchphrase: 'If it runs on power, I can fix it!'
      },
      {
        id: 'mia',
        name: 'Mia',
        role: 'Astro-Botanist & Scientist',
        title: 'Greenhouse & Science Lead',
        avatar: '/images/logo.png',
        emoji: '🌱',
        color: 'from-emerald-500 to-green-600',
        responsibilities: 'Grows delicious vegetables in the biodome and analyzes lunar crater ice.',
        catchphrase: 'Plants are the lungs of the Moon!'
      },
      {
        id: 'leo',
        name: 'Leo',
        role: 'Habitat Specialist',
        title: 'Life Support Guardian',
        avatar: '/images/logo.png',
        emoji: '🫁',
        color: 'from-blue-500 to-indigo-600',
        responsibilities: 'Guards clean drinking water, breathable oxygen, and air-pressure seals.',
        catchphrase: 'Clean air and water keep us flying!'
      },
      {
        id: 'orbit',
        name: 'ORBIT',
        role: 'AI Robot Companion',
        title: 'Junior Mission Guide',
        avatar: '/images/orbit_advisor.jpg',
        emoji: '🤖',
        color: 'from-purple-500 to-pink-600',
        responsibilities: 'Spots incoming space weather, calculates options, and cheers your victories!',
        catchphrase: 'Beep boop! Systems nominal, Commander!'
      }
    ];
  }

  public static getInitialState(): ResourceState {
    return {
      power: 85,
      battery: 85,
      water: 80,
      food: 85,
      oxygen: 95,
      crewHealth: 100,
      crewSafety: 100,
      scienceScore: 0
    };
  }

  public static getInitialBadges(): QuestBadge[] {
    return [
      {
        id: 'badge_solar',
        title: 'Solar Protector',
        emoji: '🛡️',
        description: 'Sheltered the crew from a high-energy solar radiation storm.',
        unlocked: false,
        challengeId: 1
      },
      {
        id: 'badge_meteor',
        title: 'Meteor Defender',
        emoji: '☄️',
        description: 'Protected the habitat and exterior gear from a lunar meteor shower.',
        unlocked: false,
        challengeId: 2
      },
      {
        id: 'badge_power',
        title: 'Power Hero',
        emoji: '🔋',
        description: 'Prioritized vital life support to survive a dark mountain shadow.',
        unlocked: false,
        challengeId: 3
      },
      {
        id: 'badge_water',
        title: 'Water Hero',
        emoji: '💧',
        description: 'Isolated and repaired a leaking greenhouse pipe to save water.',
        unlocked: false,
        challengeId: 4
      },
      {
        id: 'badge_oxygen',
        title: 'Life Support Guardian',
        emoji: '🫁',
        description: 'Activated emergency backup air during an oxygen system alert.',
        unlocked: false,
        challengeId: 5
      },
      {
        id: 'badge_greenhouse',
        title: 'Greenhouse Expert',
        emoji: '🌱',
        description: 'Restored wilting biodome crops with balanced water and lighting.',
        unlocked: false,
        challengeId: 6
      },
      {
        id: 'badge_master',
        title: 'Master Commander',
        emoji: '🏆',
        description: 'Completed all 6 lunar challenges and kept every astronaut safe!',
        unlocked: false
      }
    ];
  }

  public static getChallenges(): QuestChallenge[] {
    return [
      /* Challenge 1: Solar Storm */
      {
        id: 1,
        name: "Solar Storm Warning",
        tagline: "Radiation flare approaching the Moon!",
        dangerLevel: 'HIGH',
        locationName: "Solar Station & Exterior Ground",
        subsystemType: SubsystemType.SOLAR_ARRAY,
        cameraSubsystem: SubsystemType.SOLAR_ARRAY,
        speakerId: 'alex',
        speakerQuote: "Commander! Our solar sensors detect a massive solar radiation flare heading straight for us!",
        storyIntro: "ORBIT announces: 'Commander! A powerful solar storm is approaching from the Sun. We must protect our astronaut team right now!'",
        visualProblem: "A bright coronal mass ejection erupts from the Sun, flooding the lunar surface with invisible radiation. The astronauts are outside inspecting equipment!",
        question: "How will you protect your crew?",
        bestActionId: 'A',
        learningObjective: "Understand that solar storms emit dangerous radiation. Sheltering inside thick habitat walls keeps astronauts safe.",
        educationalTakeaway: "Unlike Earth, the Moon has no atmosphere or global magnetic field to block radiation. Moving inside thick, water-shielded habitat walls protects astronauts from harmful solar particles.",
        reflectionQuestion: "Why is water or thick regolith shielding so important for human survival on the Moon?",
        choices: [
          {
            id: 'A',
            title: "Move Everyone Into Shielded Habitat",
            description: "Order all astronauts inside the radiation-proof core dome immediately.",
            icon: "🏠",
            isBest: true,
            score: 100,
            stars: 3,
            deltaPower: -5,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: 0,
            deltaCrew: 0,
            consequenceTitle: "Crew Sheltered Safely!",
            consequenceExplanation: "Alex, Mia, and Leo safely retreated into the habitat shelter. The thick walls absorbed the radiation, keeping all astronauts 100% healthy!",
            worldVisualEffect: 'balanced_conserve'
          },
          {
            id: 'B',
            title: "Continue Working Outside",
            description: "Tell astronauts to keep working on the surface to save time.",
            icon: "🧑‍🚀",
            isBest: false,
            score: 0,
            stars: 1,
            deltaPower: 0,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: -5,
            deltaCrew: -30,
            consequenceTitle: "Radiation Warning Triggered!",
            consequenceExplanation: "Spacesuits cannot stop high-energy solar protons! Crew safety dropped dangerously. Astronauts had to rush inside for medical treatment.",
            worldVisualEffect: 'emergency_dim'
          },
          {
            id: 'C',
            title: "Continue Science Experiment Outside",
            description: "Leave cameras and lab sensors running outside during the storm.",
            icon: "🔬",
            isBest: false,
            score: 50,
            stars: 2,
            deltaPower: -10,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: 0,
            deltaCrew: -15,
            consequenceTitle: "Instruments Damaged!",
            consequenceExplanation: "The scientific sensors gathered some storm data, but cosmic protons scrambled the electronics and crew safety took a hit.",
            worldVisualEffect: 'science_laser'
          }
        ]
      },

      /* Challenge 2: Meteor Shower */
      {
        id: 2,
        name: "Meteor Shower Inbound",
        tagline: "Tiny space rocks zooming toward the base!",
        dangerLevel: 'HIGH',
        locationName: "Shackleton Crater Surface",
        subsystemType: SubsystemType.HABITAT,
        cameraSubsystem: SubsystemType.HABITAT,
        speakerId: 'leo',
        speakerQuote: "Commander! Radar picked up a cloud of micrometeorites traveling at 40 miles per second!",
        storyIntro: "ORBIT announces: 'Commander! Tiny space rocks are zooming toward the outpost! We must protect our habitat and equipment!'",
        visualProblem: "Fast-moving micrometeorites streak across the dark space sky, heading toward the habitat domes and exterior rover bay.",
        question: "How should we protect our habitat?",
        bestActionId: 'A',
        learningObjective: "Understand that space rocks travel at hypersonic speeds. Closing blast shields and moving inside prevents punctures.",
        educationalTakeaway: "On Earth, small space rocks burn up in the air as shooting stars. But on the airless Moon, even a tiny pebble can punch through unreinforced equipment!",
        reflectionQuestion: "Why don't meteorites burn up before hitting the Moon like they do on Earth?",
        choices: [
          {
            id: 'A',
            title: "Move Crew Inside & Secure Structures",
            description: "Deploy steel blast shutters over windows and bring the rover into the hangar.",
            icon: "🛡️",
            isBest: true,
            score: 100,
            stars: 3,
            deltaPower: -5,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: 0,
            deltaCrew: 0,
            consequenceTitle: "Habitat Shielded Perfectly!",
            consequenceExplanation: "The blast shutters deflected the space rocks harmlessly. The habitat dome and rover survived with zero scratches!",
            worldVisualEffect: 'balanced_conserve'
          },
          {
            id: 'B',
            title: "Send Astronauts Outside During Event",
            description: "Ask astronauts to watch the meteor shower from the lunar surface.",
            icon: "☄️",
            isBest: false,
            score: 0,
            stars: 1,
            deltaPower: 0,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: -10,
            deltaCrew: -35,
            consequenceTitle: "Emergency Evacuation!",
            consequenceExplanation: "Space rocks travel faster than bullets! A rock punctured an exterior equipment cart, causing an emergency siren.",
            worldVisualEffect: 'emergency_dim'
          },
          {
            id: 'C',
            title: "Keep External Equipment Exposed",
            description: "Only protect the astronauts but leave the rover and panels open.",
            icon: "🚙",
            isBest: false,
            score: 50,
            stars: 2,
            deltaPower: -20,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: 0,
            deltaCrew: -5,
            consequenceTitle: "Equipment Scratched!",
            consequenceExplanation: "The crew stayed safe, but exposed solar glass was pitted by micro-rocks, reducing our electrical efficiency.",
            worldVisualEffect: 'science_laser'
          }
        ]
      },

      /* Challenge 3: Power Shortage */
      {
        id: 3,
        name: "Mountain Shadow Power Drop",
        tagline: "Sunlight blocked by lunar ridge!",
        dangerLevel: 'MODERATE',
        locationName: "Solar Array & Battery Bank",
        subsystemType: SubsystemType.BATTERY_STORAGE,
        cameraSubsystem: SubsystemType.BATTERY_STORAGE,
        speakerId: 'alex',
        speakerQuote: "Commander, a tall lunar mountain is casting a deep shadow over our solar panels. Power generation dropped by 70%!",
        storyIntro: "ORBIT announces: 'The outpost is entering a low-solar period. Our battery reserve is decreasing rapidly!'",
        visualProblem: "The pitch-black shadow of a jagged crater wall creeps over the solar wings. Solar electricity drops to nearly zero!",
        question: "How should we manage our battery power?",
        bestActionId: 'A',
        learningObjective: "Learn energy prioritization: protect life support and heating first while pausing non-essential experiments.",
        educationalTakeaway: "In space, electricity runs heating, water pumps, and oxygen scrubbers. Pausing high-powered science lasers protects battery reserves until sunlight returns.",
        reflectionQuestion: "If you were on the Moon, what is the single most important system that must never lose power?",
        choices: [
          {
            id: 'A',
            title: "Protect Life Support & Dim Non-Essentials",
            description: "Keep oxygen and heating running at 100%, but pause heavy lab lasers.",
            icon: "⚡",
            isBest: true,
            score: 100,
            stars: 3,
            deltaPower: 15,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: 0,
            deltaCrew: 0,
            consequenceTitle: "Power Grid Stabilized!",
            consequenceExplanation: "By pausing the lab spectrometer, our battery reserves stayed safely at 80% until the Sun cleared the mountain ridge!",
            worldVisualEffect: 'balanced_conserve'
          },
          {
            id: 'B',
            title: "Run All Equipment at Maximum Power",
            description: "Keep laser experiments, rover charging, and full lights running.",
            icon: "🔥",
            isBest: false,
            score: 0,
            stars: 1,
            deltaPower: -40,
            deltaWater: -5,
            deltaFood: 0,
            deltaOxygen: -10,
            deltaCrew: -20,
            consequenceTitle: "Total Battery Drain Alert!",
            consequenceExplanation: "Heavy lasers drained the batteries to 20% in just two hours! Emergency red lights flickered and heating grew cold.",
            worldVisualEffect: 'science_laser'
          },
          {
            id: 'C',
            title: "Shut Down Critical Habitat Systems",
            description: "Turn off habitat air heating and oxygen pumps to save batteries.",
            icon: "❄️",
            isBest: false,
            score: 50,
            stars: 2,
            deltaPower: 20,
            deltaWater: 0,
            deltaFood: -5,
            deltaOxygen: -20,
            deltaCrew: -25,
            consequenceTitle: "Habitat Freezing!",
            consequenceExplanation: "You saved electricity, but astronauts began shivering in the -150°C cold! Life support must always stay on.",
            worldVisualEffect: 'emergency_dim'
          }
        ]
      },

      /* Challenge 4: Water Leak */
      {
        id: 4,
        name: "Greenhouse Water Leak",
        tagline: "Water pipe cracked by sharp moon dust!",
        dangerLevel: 'MODERATE',
        locationName: "Greenhouse Supply Bay",
        subsystemType: SubsystemType.GREENHOUSE,
        cameraSubsystem: SubsystemType.GREENHOUSE,
        speakerId: 'mia',
        speakerQuote: "Commander! Water is leaking from the hydroponic pipe. We are losing clean water every minute!",
        storyIntro: "ORBIT announces: 'Commander! Water is leaking from the greenhouse supply line! Every drop of water on the Moon is precious!'",
        visualProblem: "Water droplets spray from a cracked seal near the hydroponic plant trays. The water storage bar is dropping fast!",
        question: "How will you stop the water leak?",
        bestActionId: 'A',
        learningObjective: "Understand closed-loop water systems: isolate leaks immediately to prevent wasting precious recycled water.",
        educationalTakeaway: "Water is recycled up to 98% on lunar bases. Closing the local valve isolates the leak while keeping the rest of the habitat safe.",
        reflectionQuestion: "Why is water so difficult to replace once it escapes into the airless lunar vacuum?",
        choices: [
          {
            id: 'A',
            title: "Isolate Leaking Pipe & Repair It",
            description: "Turn the emergency shutoff valve, wipe the pipe, and apply space sealant.",
            icon: "🔧",
            isBest: true,
            score: 100,
            stars: 3,
            deltaPower: 0,
            deltaWater: 15,
            deltaFood: 5,
            deltaOxygen: 0,
            deltaCrew: 0,
            consequenceTitle: "Water Leak Sealed!",
            consequenceExplanation: "Mia and Alex turned the safety valve and patched the leak with polymer tape. Water recycling is back to 98% efficiency!",
            worldVisualEffect: 'balanced_conserve'
          },
          {
            id: 'B',
            title: "Keep Water Running Normally",
            description: "Ignore the leak and hope the water evaporates safely.",
            icon: "💧",
            isBest: false,
            score: 0,
            stars: 1,
            deltaPower: -5,
            deltaWater: -35,
            deltaFood: -10,
            deltaOxygen: 0,
            deltaCrew: -15,
            consequenceTitle: "Precious Water Lost!",
            consequenceExplanation: "Water doesn't stay liquid in space — it boils into vacuum! We lost 35% of our clean drinking water reserves.",
            worldVisualEffect: 'emergency_dim'
          },
          {
            id: 'C',
            title: "Increase Greenhouse Water Usage",
            description: "Pump extra water to the plants hoping they drink it all.",
            icon: "🌱",
            isBest: false,
            score: 50,
            stars: 2,
            deltaPower: -10,
            deltaWater: -25,
            deltaFood: 10,
            deltaOxygen: 0,
            deltaCrew: -5,
            consequenceTitle: "Flooded Plant Trays!",
            consequenceExplanation: "The plants got flooded and the leak got worse because higher water pressure sprayed more water onto the floor.",
            worldVisualEffect: 'balanced_conserve'
          }
        ]
      },

      /* Challenge 5: Oxygen Emergency */
      {
        id: 5,
        name: "Oxygen Filter Malfunction",
        tagline: "Main air recycler needs immediate backup!",
        dangerLevel: 'CRITICAL',
        locationName: "Life Support Habitat Core",
        subsystemType: SubsystemType.HABITAT,
        cameraSubsystem: SubsystemType.HABITAT,
        speakerId: 'leo',
        speakerQuote: "Commander! The primary oxygen filtration motor jammed. Breathable air levels are falling in Habitat Dome 1!",
        storyIntro: "ORBIT announces: 'Warning! The main oxygen filtration system is not working properly! We need clean air for the crew!'",
        visualProblem: "Warning lights flash amber inside the habitat dome as the primary carbon dioxide scrubber motor stops spinning.",
        question: "How will you protect crew air?",
        bestActionId: 'A',
        learningObjective: "Learn about life-support redundancy: when a primary system fails, immediately activate backup units.",
        educationalTakeaway: "Space engineering always uses backup systems (called redundancy). If motor A jams, backup unit B can take over in seconds to keep astronauts breathing clean air.",
        reflectionQuestion: "Why do spaceships and space stations always have two or three backup copies of critical equipment?",
        choices: [
          {
            id: 'A',
            title: "Activate Backup Life Support Core",
            description: "Switch to redundant filter bank B and assemble the crew in Dome 2.",
            icon: "🫁",
            isBest: true,
            score: 100,
            stars: 3,
            deltaPower: -5,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: 15,
            deltaCrew: 0,
            consequenceTitle: "Backup Life Support Online!",
            consequenceExplanation: "Leo flipped the backup life-support switch. Fresh, crisp oxygen filled the dome, and the crew stayed 100% safe!",
            worldVisualEffect: 'balanced_conserve'
          },
          {
            id: 'B',
            title: "Turn Off Life Support Entirely",
            description: "Shut off the whole air system to inspect it in silence.",
            icon: "❌",
            isBest: false,
            score: 0,
            stars: 1,
            deltaPower: 10,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: -45,
            deltaCrew: -35,
            consequenceTitle: "Suffocation Risk Alert!",
            consequenceExplanation: "Carbon dioxide built up instantly! Astronauts felt dizzy and had to put on emergency spacesuit helmets.",
            worldVisualEffect: 'emergency_dim'
          },
          {
            id: 'C',
            title: "Ignore Warning & Continue Science",
            description: "Assume the warning sensor is broken and finish rock testing.",
            icon: "🔬",
            isBest: false,
            score: 50,
            stars: 2,
            deltaPower: 0,
            deltaWater: 0,
            deltaFood: 0,
            deltaOxygen: -25,
            deltaCrew: -20,
            consequenceTitle: "Air Quality Dropping!",
            consequenceExplanation: "The sensor was real! Air quality dropped steadily until ORBIT automated emergency oxygen pods.",
            worldVisualEffect: 'science_laser'
          }
        ]
      },

      /* Challenge 6: Save the Greenhouse */
      {
        id: 6,
        name: "Save the Lunar Biodome",
        tagline: "Hydroponic crops are wilting!",
        dangerLevel: 'MODERATE',
        locationName: "Lunar Biodome Greenhouse",
        subsystemType: SubsystemType.GREENHOUSE,
        cameraSubsystem: SubsystemType.GREENHOUSE,
        speakerId: 'mia',
        speakerQuote: "Commander! The microgreens and spirulina crops are wilting under improper lighting and water mix. Our food supply is at risk!",
        storyIntro: "ORBIT announces: 'Mia has discovered that our crops are becoming unhealthy! Fresh food is vital for crew nutrition and oxygen!'",
        visualProblem: "Inside the glass biodome dome, leafy greens droop. LED purple grow lights flicker under an unbalanced nutrient schedule.",
        question: "How will you restore the crops?",
        bestActionId: 'A',
        learningObjective: "Balance competing resources: healthy plants need exact amounts of water, light, and warmth without wasting reserves.",
        educationalTakeaway: "Plants are living systems. Giving them the balanced recipe of LED light and recycled nutrients restores photosynthesis, producing fresh food and clean oxygen for the team.",
        reflectionQuestion: "How do plants on the Moon help astronauts with both food and breathable air at the same time?",
        choices: [
          {
            id: 'A',
            title: "Balance Water & LED Lighting",
            description: "Calibrate nutrient flow to standard levels and set optimal grow lamps.",
            icon: "🌱",
            isBest: true,
            score: 100,
            stars: 3,
            deltaPower: -5,
            deltaWater: -5,
            deltaFood: 25,
            deltaOxygen: 10,
            deltaCrew: 5,
            consequenceTitle: "Bumper Harvest Restored!",
            consequenceExplanation: "The plants perked up with vibrant green leaves! Fresh crisp vegetables and natural oxygen are flowing into the habitat.",
            worldVisualEffect: 'balanced_conserve'
          },
          {
            id: 'B',
            title: "Use Maximum Water Without Checking",
            description: "Dump all water reserves into the soil to drown any plant illness.",
            icon: "🌊",
            isBest: false,
            score: 50,
            stars: 2,
            deltaPower: -10,
            deltaWater: -35,
            deltaFood: -5,
            deltaOxygen: 0,
            deltaCrew: -5,
            consequenceTitle: "Over-Watered Crops!",
            consequenceExplanation: "Plant roots drowned from lack of air! We wasted 35% of our precious water and the crops did not improve.",
            worldVisualEffect: 'emergency_dim'
          },
          {
            id: 'C',
            title: "Shut Down the Entire Greenhouse",
            description: "Give up on growing fresh plants and eat only canned rations.",
            icon: "🥫",
            isBest: false,
            score: 0,
            stars: 1,
            deltaPower: 15,
            deltaWater: 5,
            deltaFood: -40,
            deltaOxygen: -15,
            deltaCrew: -20,
            consequenceTitle: "Fresh Food Lost!",
            consequenceExplanation: "All living crops died. Astronauts lost their source of fresh vitamins and natural oxygen production was cut off.",
            worldVisualEffect: 'science_laser'
          }
        ]
      }
    ];
  }

  public static getSubsystems(state: ResourceState): SubsystemState[] {
    return [
      {
        type: SubsystemType.HABITAT,
        title: "Main Crew Habitat",
        emoji: "🏠",
        shortName: "Habitat",
        health: 98,
        active: true,
        powerConsumption: 18,
        statusText: "Pressurized Living Quarters (1.0 ATM)",
        kidExplanation: "Where our astronaut team sleeps, eats, exercises, and stays safe from space radiation.",
        position: [0, 0, 0]
      },
      {
        type: SubsystemType.SOLAR_ARRAY,
        title: "Solar Power Station",
        emoji: "☀️",
        shortName: "Solar",
        health: 96,
        active: true,
        powerConsumption: -45,
        statusText: "Tracking Sunlight across Lunar Crater",
        kidExplanation: "Giant solar wings catch bright sunlight and turn it into clean electricity for the whole base.",
        position: [-14, 0, 8]
      },
      {
        type: SubsystemType.BATTERY_STORAGE,
        title: "Battery Storage Bank",
        emoji: "🔋",
        shortName: "Battery",
        health: 92,
        active: true,
        powerConsumption: 0,
        statusText: `${Math.round(state.power)}% Stored Capacity`,
        kidExplanation: "High-capacity lithium cells store electricity for when mountains block the Sun.",
        position: [-6, 0, 5]
      },
      {
        type: SubsystemType.GREENHOUSE,
        title: "Lunar Biodome Greenhouse",
        emoji: "🌱",
        shortName: "Greenhouse",
        health: 90,
        active: true,
        powerConsumption: 12,
        statusText: `Microgreens & Vegetables (${Math.round(state.food)}% Food)`,
        kidExplanation: "Hydroponic plants make crisp salads and naturally recycle astronaut CO₂ into sweet oxygen.",
        position: [8, 0, -4]
      },
      {
        type: SubsystemType.SCIENCE_LAB,
        title: "Science Laboratory",
        emoji: "🔬",
        shortName: "Science",
        health: 94,
        active: true,
        powerConsumption: 14,
        statusText: "Laser Spectrometer Core Analysis",
        kidExplanation: "Robotic microscopes analyze Moon rocks to find buried crater ice and rare minerals.",
        position: [6, 0, 6]
      },
      {
        type: SubsystemType.ROVER,
        title: "Lunar Exploration Rover",
        emoji: "🚙",
        shortName: "Rover",
        health: 88,
        active: true,
        powerConsumption: 8,
        statusText: "Ready for Surface Surveys",
        kidExplanation: "Six-wheeled robot explorer with a robotic arm that surveys distant craters.",
        position: [12, 0, 8]
      }
    ];
  }

  public static getAskOrbitQuestions(): AskOrbitItem[] {
    return [
      {
        id: 'q_solar_storm',
        question: 'What is a Solar Storm and is it fire?',
        emoji: '☀️',
        shortAnswer: 'It is invisible high-speed radiation, not fire!',
        deepDive: 'The Sun shoots giant flares of invisible charged particles through space at millions of miles per hour. Thick habitat walls or water barriers absorb the energy so astronauts stay healthy.'
      },
      {
        id: 'q_meteors',
        question: 'Why don\'t space rocks burn up on the Moon?',
        emoji: '☄️',
        shortAnswer: 'The Moon has no air, so there is no friction to burn them!',
        deepDive: 'On Earth, our thick atmosphere creates friction that burns up tiny space pebbles as glowing shooting stars. On the Moon, there is zero air, so rocks hit the surface at bullet speeds!'
      },
      {
        id: 'q_water_recycle',
        question: 'How do astronauts recycle water on the Moon?',
        emoji: '💧',
        shortAnswer: 'Special filters clean sweat, moisture, and shower water back into pure water!',
        deepDive: 'Water is very heavy to rocket from Earth. Our outpost filters and distills water over and over. NASA astronauts on the Space Station drink recycled water every day — it is purer than tap water on Earth!'
      },
      {
        id: 'q_plants_air',
        question: 'How do plants give astronauts oxygen to breathe?',
        emoji: '🌱',
        shortAnswer: 'Plants breathe in astronaut CO₂ and breathe out fresh O₂!',
        deepDive: 'Using LED grow lights and recycled water, hydroponic plants turn the carbon dioxide astronauts exhale into fresh oxygen and delicious vegetables.'
      },
      {
        id: 'q_redundancy',
        question: 'What is "Backup Life Support" (Redundancy)?',
        emoji: '🫁',
        shortAnswer: 'Always having a spare copy of critical machines ready!',
        deepDive: 'NASA engineers never build a spacecraft with just one oxygen pump or one computer. If unit A ever jams, unit B turns on in a heartbeat so astronauts never lose air.'
      }
    ];
  }
}
