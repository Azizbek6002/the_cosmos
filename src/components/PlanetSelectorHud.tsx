import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sun, Flame, Target, ArrowUpRight } from 'lucide-react';
import { PlanetaryHabitat } from '../types';

interface PlanetSelectorHudProps {
  onSelectPlanet: (planet: PlanetaryHabitat) => void;
  onOpenSimulator: () => void;
}

interface HudPlanet {
  id: string;
  name: string;
  subTitle: string;
  gravityG: number;
  solarDistanceAU: number;
  solarWaveTravelTime: string;
  solarFlux: string;
  thermalRange: string;
  imageSrc: string;
  themeColor: string;
  themeGlow: string;
  themeGradient: string;
  locLimit: string;
  oxygenPct: string;
  spreadRate: string;
  coHazard: string;
  primaryRiskMaterial: string;
  suppressionStrategy: string;
  compartments: { id: number; name: string; active?: boolean }[];
  targetCoords: string;
  actionQuestions: string[];
}

const HUD_PLANETS: HudPlanet[] = [
  {
    id: 'europa',
    name: 'EUROPA IX',
    subTitle: 'Jovian Cryo-Outpost',
    gravityG: 0.134,
    solarDistanceAU: 5.2,
    solarWaveTravelTime: '43m 12s',
    solarFlux: '50.3 W/m²',
    thermalRange: '-170°C to -140°C',
    imageSrc: '/planets/planet_europa.png',
    themeColor: '#2dd4bf',
    themeGlow: 'rgba(45, 212, 191, 0.65)',
    themeGradient: 'from-teal-400 to-cyan-600',
    locLimit: '12.4%',
    oxygenPct: '19.5%',
    spreadRate: '0.18 mm/s',
    coHazard: '68%',
    primaryRiskMaterial: 'Polymer cryo-insulation & glycol loops',
    suppressionStrategy: 'Depressurize and purge with cold nitrogen gas',
    targetCoords: 'LAT 12.4° N / LONG 84.1° W',
    compartments: [
      { id: 1, name: 'Cryo-Thermal Circulation Core' },
      { id: 2, name: 'Sub-Surface Ice Habitat Core', active: true },
      { id: 3, name: 'High-Pressure Ammonia Barrier' },
      { id: 4, name: 'Surface EVA Airlock Hub' },
      { id: 5, name: 'Avionics Power Converter' },
      { id: 6, name: 'Regolith Drilling Loop' },
      { id: 7, name: 'Auxiliary Life Support' },
      { id: 8, name: 'Emergency Escape Pod' },
    ],
    actionQuestions: [
      'How to suppress cryogenic habitat fires?',
      'Nitrogen sub-zero displacement protocol',
      'Avionics insulation thermal cutoff',
    ]
  },
  {
    id: 'devlaar',
    name: 'DEVLAAR // MARS',
    subTitle: 'Base Alpha Habitation',
    gravityG: 0.38,
    solarDistanceAU: 1.52,
    solarWaveTravelTime: '12m 38s',
    solarFlux: '589.2 W/m²',
    thermalRange: '-85°C to +20°C',
    imageSrc: '/planets/planet_mars.png',
    themeColor: '#f97316',
    themeGlow: 'rgba(249, 115, 22, 0.75)',
    themeGradient: 'from-orange-500 to-red-600',
    locLimit: '14.2%',
    oxygenPct: '28.0%',
    spreadRate: '0.45 mm/s',
    coHazard: '78%',
    primaryRiskMaterial: 'Crosslinked polyethylene cable jackets & battery banks',
    suppressionStrategy: 'Immediate HVAC shutdown; total-flood with CO2 within 45s',
    targetCoords: 'LAT 18.2° N / LONG 77.4° E',
    compartments: [
      { id: 1, name: 'Primary Life Support (ECLSS)' },
      { id: 2, name: 'Martian Habitation Dome Alpha', active: true },
      { id: 3, name: 'Lithium Battery Storage Vault' },
      { id: 4, name: 'Dust Filtration & Airlock Hub' },
      { id: 5, name: 'Avionics Distribution Bay' },
      { id: 6, name: 'Methane In-Situ Fuel Plant' },
      { id: 7, name: 'Greenhouse Botanical Pod' },
      { id: 8, name: 'Emergency Surface Rover Pad' },
    ],
    actionQuestions: [
      'How to suppress lateral 0.38g floor flames?',
      'CO2 rapid flood vs. low-pressure habitat mix',
      'Martian regolith dust smothering protocol',
    ]
  },
  {
    id: 'biturion',
    name: 'BITURION // MOON',
    subTitle: 'Artemis Lunar Outpost',
    gravityG: 0.166,
    solarDistanceAU: 1.0,
    solarWaveTravelTime: '8m 19s',
    solarFlux: '1,361.0 W/m²',
    thermalRange: '-130°C to +120°C',
    imageSrc: '/planets/planet_moon.png',
    themeColor: '#e2e8f0',
    themeGlow: 'rgba(226, 232, 240, 0.65)',
    themeGradient: 'from-slate-200 to-zinc-400',
    locLimit: '13.8%',
    oxygenPct: '21.0%',
    spreadRate: '0.28 mm/s',
    coHazard: '82%',
    primaryRiskMaterial: 'Nomex EVA suits & abrasive lunar regolith wear',
    suppressionStrategy: 'Smother with processed lunar regolith dust and inert nitrogen',
    targetCoords: 'LAT 89.9° S / SHACKLETON CRATER',
    compartments: [
      { id: 1, name: 'Lunar Crater Life Support Core' },
      { id: 2, name: 'Artemis Habitation Quarters', active: true },
      { id: 3, name: 'Avionics & High-Voltage Bus' },
      { id: 4, name: 'Regolith Smothering Dispenser' },
      { id: 5, name: 'EVA Suit Decontamination Room' },
      { id: 6, name: 'Cryogenic Oxygen Storage Tank' },
      { id: 7, name: 'Lander Ascent Interface' },
      { id: 8, name: 'Sub-Regolith Bunker' },
    ],
    actionQuestions: [
      'How to use lunar regolith as an in-situ fire suppressant?',
      'Low-gravity boundary layer smolder suppression',
      'Avionics nitrogen purge in 0.166g vacuum',
    ]
  },
  {
    id: 'sedna',
    name: 'SEDNA STATION',
    subTitle: 'Deep Space Gravity-Zero Lab',
    gravityG: 0.0,
    solarDistanceAU: 85.0,
    solarWaveTravelTime: '11h 46m',
    solarFlux: '0.19 W/m²',
    thermalRange: '-240°C to -215°C',
    imageSrc: '/planets/planet_sedna.png',
    themeColor: '#38bdf8',
    themeGlow: 'rgba(56, 189, 248, 0.75)',
    themeGradient: 'from-sky-400 to-cyan-600',
    locLimit: '11.5%',
    oxygenPct: '21.0%',
    spreadRate: '0.12 mm/s',
    coHazard: '95%',
    primaryRiskMaterial: 'Aerosol lab reagents & 3D printer polymers (PMMA, PEEK)',
    suppressionStrategy: 'Automated airlock vacuum isolation and dry aerosol dispersal',
    targetCoords: 'ORBIT 85.0 AU / HELIOPAUSE PERIMETER',
    compartments: [
      { id: 1, name: 'Zero-G Centrifuge Life Hub' },
      { id: 2, name: 'Deep Space Microgravity Lab', active: true },
      { id: 3, name: 'Combustion Integrated Rack (CIR)' },
      { id: 4, name: 'Emergency Vacuum Airlock Vent' },
      { id: 5, name: 'Radiation Shield Water Wall' },
      { id: 6, name: 'Catalytic CO Air Scrubber' },
      { id: 7, name: 'Deep Space Ion Thruster Bay' },
      { id: 8, name: 'Cryogenic Sleep Chamber' },
    ],
    actionQuestions: [
      'How to extinguish spherical zero-g cool flames?',
      'Why water mist fails in microgravity combustion',
      'Autonomous cabin depressurization to space vacuum',
    ]
  },
  {
    id: 'cetrion',
    name: 'CETRION // ISS',
    subTitle: 'Low Earth Orbit (LEO)',
    gravityG: 0.0,
    solarDistanceAU: 1.0,
    solarWaveTravelTime: '8m 20s',
    solarFlux: '1,361.5 W/m²',
    thermalRange: '-100°C to +120°C',
    imageSrc: '/planets/planet_earth.png',
    themeColor: '#60a5fa',
    themeGlow: 'rgba(96, 165, 250, 0.75)',
    themeGradient: 'from-blue-400 to-indigo-600',
    locLimit: '13.0%',
    oxygenPct: '21.0%',
    spreadRate: '0.22 mm/s',
    coHazard: '92%',
    primaryRiskMaterial: 'PMMA viewing ports, high-voltage wiring, O2 candle generator',
    suppressionStrategy: 'Shut down HVAC circulation; discharge portable CO2 extinguishers',
    targetCoords: 'ALT 408 KM / 51.6° INCLINATION LEO',
    compartments: [
      { id: 1, name: 'Node 1 Unity Habitat' },
      { id: 2, name: 'Destiny Laboratory Module', active: true },
      { id: 3, name: 'Columbus European Science Rack' },
      { id: 4, name: 'Kibo Japanese Experiment Module' },
      { id: 5, name: 'Zvezda Service Oxygen Generator' },
      { id: 6, name: 'Truss Solar Power Electronics' },
      { id: 7, name: 'Cupola Observation Windows' },
      { id: 8, name: 'Crew Return Vehicle Airlock' },
    ],
    actionQuestions: [
      'How does microgravity extinguish without ventilation?',
      'NASA FLEX discovery: The invisible cool flame danger',
      'Standard ISS fire emergency protocol (CO2 flood)',
    ]
  },
  {
    id: 'titan',
    name: 'TITAN COLONY',
    subTitle: 'Methane Atmosphere Sub-base',
    gravityG: 0.14,
    solarDistanceAU: 9.5,
    solarWaveTravelTime: '1h 19m',
    solarFlux: '15.1 W/m²',
    thermalRange: '-179°C',
    imageSrc: '/planets/planet_titan.png',
    themeColor: '#fbbf24',
    themeGlow: 'rgba(251, 191, 36, 0.75)',
    themeGradient: 'from-amber-400 to-orange-500',
    locLimit: '10.8%',
    oxygenPct: '21.0%',
    spreadRate: '0.15 mm/s',
    coHazard: '74%',
    primaryRiskMaterial: 'External airlock gaskets & cryogenic compressor bearings',
    suppressionStrategy: 'Maintain positive internal nitrogen overpressure',
    targetCoords: 'LAT 78.5° N / KRAKEN MARE COAST',
    compartments: [
      { id: 1, name: 'Atmospheric Nitrogen Overpressure' },
      { id: 2, name: 'Hydrocarbon Sea Research Hab', active: true },
      { id: 3, name: 'External Methane Gasket Barrier' },
      { id: 4, name: 'Cryogenic Heat Exchanger Core' },
      { id: 5, name: 'Aerostat Drone Docking Bay' },
      { id: 6, name: 'Radioisotope Thermal Generator' },
      { id: 7, name: 'Oxygen Electrolysis Plant' },
      { id: 8, name: 'Emergency Sub-Ice Shelter' },
    ],
    actionQuestions: [
      'How to prevent explosive oxygen-methane flare on Titan?',
      'Positive nitrogen overpressure barrier dynamics',
      'Cryogenic seal integrity under rapid temperature swings',
    ]
  },
  {
    id: 'jupiter',
    name: 'JOVIAN ORBIT',
    subTitle: 'Deep Radiation Post',
    gravityG: 2.528,
    solarDistanceAU: 5.2,
    solarWaveTravelTime: '43m 12s',
    solarFlux: '50.3 W/m²',
    thermalRange: '-145°C to +50°C',
    imageSrc: '/planets/planet_jupiter.png',
    themeColor: '#fb923c',
    themeGlow: 'rgba(251, 146, 60, 0.75)',
    themeGradient: 'from-orange-400 to-amber-600',
    locLimit: '16.0%',
    oxygenPct: '21.0%',
    spreadRate: '1.40 mm/s',
    coHazard: '45%',
    primaryRiskMaterial: 'Radiation shielding polymers & heavy conductor coils',
    suppressionStrategy: 'Deploy inert gaseous argon containment blanket',
    targetCoords: 'ALT 71,492 KM / RADIATION BELT CORE',
    compartments: [
      { id: 1, name: 'Heavy Radiation Shield Wall' },
      { id: 2, name: 'Orbital Magnetosphere Habitat', active: true },
      { id: 3, name: 'Hyper-Gravity Convection Rig' },
      { id: 4, name: 'Argon Gas Extinguisher Bank' },
      { id: 5, name: 'Plasma Arc Dissipation Cage' },
      { id: 6, name: 'Superconducting Magnet Bay' },
      { id: 7, name: 'Radiation Hardened Electronics' },
      { id: 8, name: 'Relay Telemetry Antenna' },
    ],
    actionQuestions: [
      'How hyper-gravity (2.5g) accelerates fire convection plumes',
      'Argon gas displacement under turbulent buoyant updraft',
      'Radiation-induced dielectric breakdown & electrical ignition',
    ]
  }
];

export const PlanetSelectorHud: React.FC<PlanetSelectorHudProps> = ({
  onSelectPlanet,
  onOpenSimulator,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(3); // Default to Sedna
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [isBadgeHovered, setIsBadgeHovered] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const currentPlanet = HUD_PLANETS[selectedIndex];

  // Safe navigation with animation trigger
  const changePlanet = (newIndex: number) => {
    if (newIndex === selectedIndex) return;
    setIsTransitioning(true);
    setSelectedIndex(newIndex);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 450);
  };

  const handlePrev = () => {
    const nextIdx = selectedIndex > 0 ? selectedIndex - 1 : HUD_PLANETS.length - 1;
    changePlanet(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = selectedIndex < HUD_PLANETS.length - 1 ? selectedIndex + 1 : 0;
    changePlanet(nextIdx);
  };

  // Convert to PlanetaryHabitat for modal view
  const openDossier = (planet: HudPlanet) => {
    const habitat: PlanetaryHabitat = {
      id: planet.id,
      sectionNumber: `_${planet.id.toUpperCase()}`,
      name: planet.name,
      race: `SECTOR: ${planet.subTitle.toUpperCase()}`,
      tagline: `${planet.gravityG}g · ${planet.locLimit} LOC · ${planet.thermalRange}`,
      coordinates: planet.targetCoords,
      distance: `${planet.solarDistanceAU} AU (${planet.solarWaveTravelTime})`,
      gravityG: planet.gravityG,
      oxygenPct: parseFloat(planet.oxygenPct),
      pressureKpa: planet.gravityG === 0 ? 101.3 : planet.gravityG * 100,
      airflowCmS: planet.gravityG === 0 ? 10 : 5,
      imageSrc: planet.imageSrc,
      themeColor: planet.themeColor,
      flamePhysicsCol1: `At ${planet.gravityG}g, flame spread front moves at ${planet.spreadRate}. Limiting Oxygen Concentration (LOC) is ${planet.locLimit}.`,
      flamePhysicsCol2: `Primary suppression directive: ${planet.suppressionStrategy}. High-risk material: ${planet.primaryRiskMaterial}.`,
      resources: [
        { number: 2, symbol: 'He', mass: '4.002' },
        { number: 8, symbol: 'O', mass: '15.999' },
        { number: 6, symbol: 'C', mass: '12.011' }
      ],
      barcode: `4 0 9 2 0 1`,
      landscapeTitle: `${planet.name} TELEMETRY`,
      landscapeTag: `${planet.gravityG}g ENVIRONMENT`,
      landscapeBg: 'radial-gradient(circle at center, #1e293b, #020617)',
      flameDetailed: `NASA Physical Sciences Informatics telemetry indicates incident solar radiation flux of ${planet.solarFlux} (arrival time: ${planet.solarWaveTravelTime}). In ${planet.gravityG}g gravity, combustion produces an estimated toxic CO accumulation rating of ${planet.coHazard}.`,
      materialRisks: [
        `${planet.primaryRiskMaterial} — high thermal outgassing sensitivity`,
        `LOC Quench Limit: ${planet.locLimit} to achieve complete extinction`,
        `Thermal Swings: ${planet.thermalRange} introduces polymer micro-fractures`,
        `Solar Wave Flux: ${planet.solarFlux} incident radiation adds thermal baseline`
      ],
      nasaExperiments: [
        'NASA BASS-II (Flame Spread in Microgravity)',
        'NASA FLEX-1/2 (Cool Flame Dynamics)',
        'NASA SAFFIRE Spacecraft Fire Safety',
        'NASA ACME Advanced Combustion Experiments'
      ],
      evidenceGap: null,
      suppressionProtocol: planet.suppressionStrategy
    };
    onSelectPlanet(habitat);
  };

  return (
    <div className="w-full text-white transition-colors duration-700">
      {/* =================================================================== */}
      {/* 1. TOP CAROUSEL: SOLAR RADIATION & THERMAL WAVE PROPAGATION         */}
      {/* Numbers indicator fully functional & responsive (< 01 / 07 >)       */}
      {/* =================================================================== */}
      <div className="mb-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '24s' }} />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white font-normal text-shadow-dark">
              SOLAR RADIATION & THERMAL WAVE PROPAGATION
            </span>
          </div>

          {/* Fully functional, responsive Left / Right Navigation Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 border border-white/20 hover:border-white/50 bg-black/60 hover:bg-white/10 text-white transition-all rounded-none cursor-pointer"
              title="Previous celestial body (Arrow Left)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {/* Real Synchronous Number Counter (e.g. 01 / 07) */}
            <span className="font-mono text-xs text-white px-2 tracking-widest text-shadow-dark font-medium min-w-[70px] text-center">
              0{selectedIndex + 1} / 0{HUD_PLANETS.length}
            </span>

            <button
              onClick={handleNext}
              className="p-1.5 border border-white/20 hover:border-white/50 bg-black/60 hover:bg-white/10 text-white transition-all rounded-none cursor-pointer"
              title="Next celestial body (Arrow Right)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Track with Left-to-Right and Right-to-Left Steps */}
        <div className="relative w-full py-3 border-y border-white/10 bg-gradient-to-r from-amber-500/10 via-transparent to-cyan-500/10 flex items-center justify-between px-3 sm:px-6 overflow-x-auto no-scrollbar gap-3">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-[pulse_2.5s_infinite] pointer-events-none" />

          {HUD_PLANETS.map((planet, idx) => {
            const isSelected = selectedIndex === idx;
            return (
              <button
                key={planet.id}
                onClick={() => changePlanet(idx)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-3 py-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-b-2 bg-white/[0.08] scale-105'
                    : 'opacity-50 hover:opacity-100 hover:bg-white/[0.03]'
                }`}
                style={{
                  borderBottomColor: isSelected ? planet.themeColor : 'transparent',
                }}
              >
                <span className="font-mono text-[9px] text-zinc-400">
                  0{idx + 1}
                </span>
                <img
                  src={planet.imageSrc}
                  alt={planet.name}
                  decoding="async"
                  loading="lazy"
                  className="w-5 h-5 rounded-full object-cover shadow-md"
                />
                <span className="font-mono text-[10px] tracking-wider uppercase text-white text-shadow-dark">
                  {planet.name.split(' ')[0]}
                </span>
                {isSelected && (
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-ping"
                    style={{ backgroundColor: planet.themeColor }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. MAIN STAGE: 1:1 WITH REFERENCE IMAGE 2 + NO BLACK GAP            */}
      {/* Dynamic leader line from top-right badge directly to planet edge!   */}
      {/* =================================================================== */}
      <div className="relative max-w-7xl mx-auto min-h-[640px] lg:min-h-[680px] flex flex-col justify-between overflow-hidden">
        
        {/* SVG LEADER LINE (Connects the Top-Right Callout Badge to the Planet Rim) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-25">
          <svg className="w-full h-full" viewBox="0 0 1200 640" fill="none">
            {/* Dynamic Angled Line: From Card Left edge (approx 840, 75) to Planet right rim (approx 660, 260) */}
            <path
              d="M 850 78 L 760 78 L 685 245"
              stroke={currentPlanet.themeColor}
              strokeWidth={isBadgeHovered ? "2.5" : "1"}
              strokeDasharray={isBadgeHovered ? "none" : "4 4"}
              className="transition-all duration-300"
              style={{
                opacity: isBadgeHovered ? 1 : 0.45,
                filter: isBadgeHovered ? `drop-shadow(0 0 10px ${currentPlanet.themeColor})` : 'none',
              }}
            />
            {/* Target Reticle Circle on the Planet Curvature Rim */}
            <circle
              cx="685"
              cy="245"
              r={isBadgeHovered ? "7" : "4"}
              stroke={currentPlanet.themeColor}
              strokeWidth="2"
              fill={isBadgeHovered ? currentPlanet.themeColor : "none"}
              className="transition-all duration-300"
              style={{
                filter: isBadgeHovered ? `drop-shadow(0 0 12px ${currentPlanet.themeColor})` : 'none',
              }}
            />
            {isBadgeHovered && (
              <circle
                cx="685"
                cy="245"
                r="14"
                stroke={currentPlanet.themeColor}
                strokeWidth="1"
                className="animate-ping"
                style={{ transformOrigin: '685px 245px' }}
              />
            )}
          </svg>
        </div>

        {/* Central Large 3D Photorealistic Globe (NO BLACK GAP TO AURA) */}
        <div className="relative z-10 w-full flex items-center justify-center my-4">
          <div
            className={`relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[460px] lg:h-[460px] flex items-center justify-center transition-all duration-500 ease-out ${
              isTransitioning ? 'scale-95 opacity-70 blur-[1px]' : 'scale-100 opacity-100 blur-0'
            }`}
          >
            {/* Top Atmospheric Corona Crest Light (Directly on the sphere edge, zero gap) */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-[340px] sm:w-[420px] lg:w-[470px] h-[75px] rounded-full blur-[24px] pointer-events-none transition-all duration-700"
              style={{
                background: `radial-gradient(ellipse at center, #ffffff 15%, ${currentPlanet.themeColor} 60%, transparent 85%)`,
                opacity: 0.85,
              }}
            />

            {/* 3D Planet Sphere: Atmospheric Rim Glow sits directly on sphere edge (NO BLACK GAP) */}
            <div
              onClick={() => openDossier(currentPlanet)}
              className="w-full h-full rounded-full relative cursor-pointer group transition-transform duration-700 hover:scale-[1.025]"
              style={{
                /* Tight atmospheric glow hugging the rim directly with zero dark moat */
                boxShadow: `
                  0 0 30px ${currentPlanet.themeColor},
                  0 0 75px ${currentPlanet.themeGlow}
                `,
              }}
            >
              {/* Photorealistic Texture Image (Full edge-to-edge spherical disc) */}
              <img
                src={currentPlanet.imageSrc}
                alt={currentPlanet.name}
                decoding="async"
                className="w-full h-full object-cover rounded-full select-none"
              />

              {/* Realistic Spherical Day/Night Terminator (Gentle natural falloff only towards lower right night side, ZERO circular black ring) */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 55%, rgba(0, 0, 0, 0.35) 80%, rgba(0, 0, 0, 0.75) 100%)',
                }}
              />

              {/* Seamless Atmospheric Edge Highlight hugging perimeter directly */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 16px ${currentPlanet.themeColor}, inset 0 2px 6px rgba(255,255,255,0.75)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Left & Right Scientific Panels Overlaying Left & Right of Globe (1:1 with Image 2) */}
        <div className="relative lg:absolute inset-0 pointer-events-none flex flex-col lg:flex-row justify-between items-start lg:items-center px-4 sm:px-6 py-4 z-20">
          
          {/* =================================================================== */}
          {/* LEFT PANEL: HABITAT PRIORITY COMPARTMENT LIST (1:1 with Image 2)    */}
          {/* =================================================================== */}
          <div className="pointer-events-auto w-full lg:w-80 space-y-4 mb-6 lg:mb-0">
            <div>
              <h2 className="font-sans text-xl sm:text-2xl font-light text-white tracking-wide uppercase text-shadow-dark">
                PLANETARY FIRE TELEMETRY
              </h2>
              <p className="font-mono text-xs text-zinc-300 font-light mt-1 text-shadow-dark">
                Critical habitat compartments & fire sensor monitoring
              </p>
            </div>

            {/* Numbered Compartment Ranking List (1 to 8) */}
            <div className="space-y-1.5 font-mono text-xs">
              {currentPlanet.compartments.map((comp) => {
                const isActive = comp.active;
                return (
                  <div
                    key={comp.id}
                    className={`flex items-center gap-3 py-1 transition-colors ${
                      isActive ? 'text-white font-normal' : 'text-zinc-400 font-light'
                    }`}
                  >
                    <span
                      className="w-4 text-right text-[10px]"
                      style={{ color: isActive ? currentPlanet.themeColor : '#71717a' }}
                    >
                      {comp.id}
                    </span>
                    <span
                      className="text-xs text-shadow-dark hover:text-white cursor-pointer"
                      style={{ color: isActive ? currentPlanet.themeColor : undefined }}
                    >
                      {comp.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Real Planet Gravity Acceleration Stat (e.g. 0.380g on Mars, 0.140g on Titan) */}
            <div className="pt-2">
              <div
                className="font-sans text-3xl sm:text-4xl font-light text-shadow-dark transition-colors duration-500"
                style={{ color: currentPlanet.themeColor }}
              >
                {currentPlanet.gravityG.toFixed(3)}g
              </div>
              <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest text-shadow-dark">
                GRAVITY ACCELERATION REGIME
              </div>
            </div>
          </div>

          {/* =================================================================== */}
          {/* RIGHT PANEL: PLANET HEADER + CALLOUT LINE + 4 METRIC CARDS          */}
          {/* Moved from on top of planet to above the right statistics!          */}
          {/* =================================================================== */}
          <div className="pointer-events-auto w-full lg:w-80 space-y-3">
            
            {/* PLANET CALLOUT BADGE (Connected to leader line; lights up on hover!) */}
            <div
              onMouseEnter={() => setIsBadgeHovered(true)}
              onMouseLeave={() => setIsBadgeHovered(false)}
              onClick={() => openDossier(currentPlanet)}
              className={`p-3 border transition-all duration-300 cursor-pointer ${
                isBadgeHovered
                  ? 'border-white/40 bg-white/[0.08] shadow-xl'
                  : 'border-white/10 bg-black/40 hover:border-white/20'
              }`}
              style={{
                borderColor: isBadgeHovered ? currentPlanet.themeColor : undefined,
                boxShadow: isBadgeHovered ? `0 0 20px ${currentPlanet.themeGlow}` : undefined,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase">
                  <Target className="w-3.5 h-3.5" style={{ color: currentPlanet.themeColor }} />
                  <span style={{ color: currentPlanet.themeColor }} className="font-medium">
                    ACTIVE TARGET
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[9px] font-mono text-zinc-400 group-hover:text-white">
                  <span>DOSSIER</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </div>

              <h3 className="font-sans text-lg font-normal text-white uppercase tracking-wider text-shadow-dark">
                {currentPlanet.name}
              </h3>
              <p className="font-mono text-[10px] text-zinc-300 mt-0.5 text-shadow-dark">
                {currentPlanet.subTitle} · {currentPlanet.gravityG}g
              </p>
              <div className="font-mono text-[8.5px] text-zinc-400 mt-1">
                {currentPlanet.targetCoords}
              </div>
            </div>

            {/* Card 1: LOC Quench Limit */}
            <div className="border-b border-white/10 pb-2.5 flex items-center justify-between">
              <div>
                <div
                  className="font-sans text-2xl font-light text-shadow-dark transition-colors"
                  style={{ color: currentPlanet.themeColor }}
                >
                  {currentPlanet.locLimit}
                </div>
                <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                  LOC QUENCH LIMIT (O2)
                </div>
              </div>
              <div className="w-24 h-7 flex items-center">
                <svg className="w-full h-full" viewBox="0 0 100 30" fill="none">
                  <path
                    d="M 0 25 Q 30 20 60 10 T 100 4"
                    stroke={currentPlanet.themeColor}
                    strokeWidth="2"
                  />
                  <path
                    d="M 0 25 Q 30 20 60 10 T 100 4 L 100 30 L 0 30 Z"
                    fill={currentPlanet.themeColor}
                    opacity="0.15"
                  />
                </svg>
              </div>
            </div>

            {/* Card 2: Cabin Oxygen Level */}
            <div className="border-b border-white/10 pb-2.5 flex items-center justify-between">
              <div>
                <div
                  className="font-sans text-2xl font-light text-shadow-dark transition-colors"
                  style={{ color: currentPlanet.themeColor }}
                >
                  {currentPlanet.oxygenPct}
                </div>
                <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                  CABIN OXYGEN FRACTION
                </div>
              </div>
              <div className="grid grid-cols-5 gap-1 w-16">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: i < 10 ? currentPlanet.themeColor : '#3f3f46',
                      opacity: i < 10 ? 0.9 : 0.3,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Card 3: Flame Spread Velocity */}
            <div className="border-b border-white/10 pb-2.5 flex items-center justify-between">
              <div>
                <div
                  className="font-sans text-2xl font-light text-shadow-dark transition-colors"
                  style={{ color: currentPlanet.themeColor }}
                >
                  {currentPlanet.spreadRate}
                </div>
                <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                  FLAME SPREAD VELOCITY
                </div>
              </div>
              <div className="w-24 h-7 flex items-center">
                <svg className="w-full h-full" viewBox="0 0 100 30" fill="none">
                  <path
                    d="M 0 15 Q 25 5 50 15 T 100 15"
                    stroke={currentPlanet.themeColor}
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>

            {/* Card 4: CO Toxic Hazard Index */}
            <div className="pb-1 flex items-center justify-between">
              <div>
                <div
                  className="font-sans text-2xl font-light text-shadow-dark transition-colors"
                  style={{ color: currentPlanet.themeColor }}
                >
                  {currentPlanet.coHazard}
                </div>
                <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
                  CO TOXIC ACCUMULATION
                </div>
              </div>
              <div className="relative w-9 h-9 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="14" stroke="#27272a" strokeWidth="3" fill="none" />
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    stroke={currentPlanet.themeColor}
                    strokeWidth="3"
                    strokeDasharray="88"
                    strokeDashoffset="20"
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-500"
                  />
                </svg>
              </div>
            </div>

            {/* Inspect NASA Dossier Button */}
            <button
              onClick={() => openDossier(currentPlanet)}
              className="w-full py-2 mt-1 bg-white text-black font-mono text-xs uppercase tracking-wider font-medium hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
            >
              INSPECT SCIENTIFIC DOSSIER →
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* BOTTOM PANEL: TACTICAL QUESTIONS & SAFETY PROTOCOLS                 */}
        {/* =================================================================== */}
        <div className="relative z-20 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            {currentPlanet.actionQuestions.map((q, idx) => {
              const isActive = activeQuestionIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveQuestionIndex(idx);
                    openDossier(currentPlanet);
                  }}
                  className={`relative py-1 text-left transition-colors text-shadow-dark cursor-pointer ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>{q}</span>
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] transition-colors"
                      style={{ backgroundColor: currentPlanet.themeColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={onOpenSimulator}
            className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-mono text-xs uppercase tracking-wider transition-colors text-shadow-dark cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>LAUNCH SIMULATOR WITH THIS REGIME →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
