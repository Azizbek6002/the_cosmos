import React, { useState } from 'react';
import { ShieldAlert, Flame, CheckCircle2, AlertTriangle, Wind, Gauge, Cpu, RotateCcw, Sliders } from 'lucide-react';
import { PageId } from '../components/Header';

interface SimulatorPageProps {
  onNavigate: (page: PageId) => void;
}

interface PlanetSafetyDossier {
  id: string;
  name: string;
  subTitle: string;
  gravityG: number;
  solarDistanceAU?: number;
  oxygenPct: number;
  pressureKpa: number;
  airflowCmS: number;
  imageSrc: string;
  themeColor: string;
  themeGlow: string;
  flameType: string;
  flameGeometrySummary: string;
  locThreshold: string;
  coHazardPct: number;
  burnRateMmS: string;
  // Left 4 Cards: Human Safety & Flame Behavior
  crewSurvivalActions: string[];
  flameCombustionMechanism: string[];
  toxicGasAndCoThreat: string[];
  criticalMaterialHazards: string[];
  // Right 3 Cards: Actions & Suppression Steps
  suppressionDirective: {
    agent: string;
    protocol: string;
    criticalTiming: string;
  };
  hvacVentilationLock: {
    rule: string;
    action: string;
    danger: string;
  };
  postFireClearance: {
    thermalScan: string;
    gasScrubbing: string;
    safeReentry: string;
  };
}

const PLANET_SAFETY_DATABASE: PlanetSafetyDossier[] = [
  {
    id: 'cetrion',
    name: 'CETRION // ISS ORBIT',
    subTitle: 'Low Earth Orbit (LEO) Microgravity',
    gravityG: 0.0,
    oxygenPct: 21.0,
    pressureKpa: 101.3,
    airflowCmS: 10.0,
    imageSrc: '/planets/planet_earth.png',
    themeColor: '#38bdf8',
    themeGlow: 'rgba(56, 189, 248, 0.7)',
    flameType: '0g Spherical Blue Diffusion Flame',
    flameGeometrySummary: 'Zero buoyant draft. Flame forms a quiescent spherical envelope governed strictly by molecular diffusion.',
    locThreshold: '13.0%',
    coHazardPct: 95,
    burnRateMmS: '0.22',
    crewSurvivalActions: [
      'Don emergency breathing hood immediately; do not rely on ceiling smoke detectors.',
      'Seal inter-module pressure hatches to prevent cabin-wide smoke migration.',
      'Prepare emergency Soyuz / Crew Dragon evacuation vehicle if toxic CO exceeds 50 ppm.',
      'Communicate emergency vector to Houston / TsUP mission control.'
    ],
    flameCombustionMechanism: [
      'Natural convection is 0; hot air does not rise. Flame burns as a spherical blue halo.',
      'Oxygen replenishment relies entirely on forced HVAC draft or molecular diffusion.',
      'If airflow is stopped, flame consumes boundary oxygen and self-extinguishes.'
    ],
    toxicGasAndCoThreat: [
      'NASA FLEX Discovery: Invisible "Cool Flames" persist at 500–750 K without visible glow.',
      'Incomplete oxidation generates massive concentrations of deadly Carbon Monoxide (CO).',
      'Chain-like soot aggregates remain suspended in zero-g indefinitely, blinding optical sensors.'
    ],
    criticalMaterialHazards: [
      'PMMA (Plexiglas): Viewing port polymer melts and droplets detach into cabin airflow.',
      'Nomex Flight Suits: Extinguishes in stagnant air, but sustains smolder if ventilation > 15 cm/s.',
      'Electrical Harnesses: Fluoropolymer insulation outgasses toxic hydrogen fluoride gas.'
    ],
    suppressionDirective: {
      agent: 'Portable CO2 Total-Flood Extinguishers',
      protocol: 'Discharge CO2 directly into the module. CO2 suppresses zero-g cool flames 68% faster than nitrogen or helium.',
      criticalTiming: 'Execute within 30 seconds of ignition confirmation.'
    },
    hvacVentilationLock: {
      rule: 'MANDATORY IMMEDIATE HVAC SHUTDOWN',
      action: 'Cut electrical power to all inter-module ventilation fans and close cabin circulation louvers.',
      danger: 'Any forced air velocity > 5 cm/s feeds fresh oxygen directly to the spherical flame front.'
    },
    postFireClearance: {
      thermalScan: 'Conduct 360° infrared thermal imaging sweep to detect invisible cool flame embers.',
      gasScrubbing: 'Engage high-capacity catalytic CO oxidizers and active charcoal filters for 4 hours.',
      safeReentry: 'Authorize mask removal only when CO level is certified < 10 ppm by electrochemical sensors.'
    }
  },
  {
    id: 'devlaar',
    name: 'DEVLAAR // MARS',
    subTitle: 'Base Alpha Habitation Outpost',
    gravityG: 0.38,
    oxygenPct: 28.0,
    pressureKpa: 56.0,
    airflowCmS: 8.0,
    imageSrc: '/planets/planet_mars.png',
    themeColor: '#f97316',
    themeGlow: 'rgba(249, 115, 22, 0.75)',
    flameType: '0.38g Low-Buoyancy Flattened Dome',
    flameGeometrySummary: 'Reduced buoyancy creates a broadened dome flame. Toxic gases spread laterally along cabin floor levels.',
    locThreshold: '14.2%',
    coHazardPct: 78,
    burnRateMmS: '0.45',
    crewSurvivalActions: [
      'EVACUATE FLOOR LEVELS: In 0.38g, toxic heavy gases do not rise; they pool along cabin floors!',
      'Don closed-circuit oxygen masks; move to elevated bunks or airlock shelters.',
      'Seal the affected habitat sector and verify positive pressure in crew living quarters.',
      'Arm automated Mars rover evacuation tether in case of habitat hull depressurization.'
    ],
    flameCombustionMechanism: [
      'Buoyant convection is 38% of Earth standard; flame forms a flattened spreading dome.',
      'Low habitat pressure (56 kPa with 28% O2) lowers polymer ignition energy thresholds.',
      'Flame spread across horizontal cable runs is 2.4x faster than in 1g terrestrial tests.'
    ],
    toxicGasAndCoThreat: [
      'Smoke and carbon monoxide migrate laterally across crew walking surfaces.',
      'Ceiling smoke detectors trigger with severe delays because buoyant plume velocity is weak.',
      'Regolith iron-oxide dust catalytic interactions accelerate polymer degradation into toxic volatiles.'
    ],
    criticalMaterialHazards: [
      'Crosslinked Polyethylene Cables: Dripping burning mass accelerates horizontal fire spread.',
      'Rover Li-Ion Batteries: Thermal runaway releases dense, unvented hydrogen and HF gases.',
      'Habitat Composite Shell: Low-pressure outgassing creates flammable gaseous pockets.'
    ],
    suppressionDirective: {
      agent: 'Total-Flood Clean CO2 & Fine Water Mist',
      protocol: 'Deploy fine water mist or clean gaseous CO2 to smother floor-level plume migration and quench glowing char.',
      criticalTiming: 'Deliver extinguishing agent within 45 seconds to prevent floor-level flashover.'
    },
    hvacVentilationLock: {
      rule: 'ISOLATE SECTOR AIR INTAKES',
      action: 'Trigger pyrotechnic dampers to lock down affected module HVAC loop and divert air through external scrubbers.',
      danger: 'Ventilation fans push dense toxic combustion layers directly into sleeping quarters.'
    },
    postFireClearance: {
      thermalScan: 'Scan sub-floor cable trays with FLIR thermal camera for hidden smoldering hot-spots.',
      gasScrubbing: 'Vent toxic floor-level gases to external Martian atmosphere through catalytic oxidizer.',
      safeReentry: 'Verify oxygen partial pressure is restored to nominal 15 kPa before airlock seal unlatch.'
    }
  },
  {
    id: 'biturion',
    name: 'BITURION // MOON',
    subTitle: 'Artemis Lunar Outpost (Shackleton Crater)',
    gravityG: 0.166,
    solarDistanceAU: 1.0,
    oxygenPct: 21.0,
    pressureKpa: 56.5,
    airflowCmS: 5.0,
    imageSrc: '/planets/planet_moon.png',
    themeColor: '#e2e8f0',
    themeGlow: 'rgba(226, 232, 240, 0.7)',
    flameType: '0.166g Thick Boundary Smoldering Flame',
    flameGeometrySummary: 'Nearly decoupled buoyancy creates silent, sluggish smoldering fronts with delayed detection and high soot.',
    locThreshold: '13.8%',
    coHazardPct: 82,
    burnRateMmS: '0.28',
    crewSurvivalActions: [
      'Lock EVA suit visors immediately; prepare for emergency transfer to Lunar Lander ascent stage.',
      'Evacuate to sub-regolith shielded habitat bunker; isolate surface modules.',
      'Verify Lunar regolith airlock seal integrity to prevent abrasive dust from entering oxygen regulators.',
      'Cut high-voltage DC bus to lunar solar array battery converter.'
    ],
    flameCombustionMechanism: [
      '1/6th gravity creates an intermediate regime between spherical diffusion and buoyancy.',
      'Boundary layer thickens dramatically, allowing unseen smoldering inside avionics bays.',
      'Flames propagate silently across porous multi-layer thermal insulation (MLI).'
    ],
    toxicGasAndCoThreat: [
      'Smoldering combustion yields dense carbon monoxide and hazardous hydrocarbon tars.',
      'Sub-atmospheric pressure (56.5 kPa) accelerates plasticizer evaporation.',
      'Regolith abrasive dust damages fire detector mirrors, causing blind detection zones.'
    ],
    criticalMaterialHazards: [
      'EVA Suit Fabrics: Multi-layer insulation (MLI) traps internal smoldering pockets.',
      'Avionics PTFE Wiring: Pyrolyzes at 300°C, releasing corrosive hydrofluoric acid vapor.',
      'Solar Array DC Harnesses: High-voltage DC arcing triggers persistent plasma burns.'
    ],
    suppressionDirective: {
      agent: 'Lunar Regolith Smothering Blanket + Nitrogen Gas',
      protocol: 'Smother equipment with processed, degassed lunar regolith powder (high thermal capacity) and purge with dry nitrogen.',
      criticalTiming: 'Deploy regolith smothering within 60 seconds to absorb thermal runaway energy.'
    },
    hvacVentilationLock: {
      rule: 'AVIONICS COMPARTMENT SEAL',
      action: 'Close airtight containment dampers and vent avionics compartment to lunar vacuum if necessary.',
      danger: 'Forced airflow through MLI blankets accelerates smoldering into open flame eruption.'
    },
    postFireClearance: {
      thermalScan: 'Inspect regolith powder blanket with radiometer to confirm core temperature is < 50°C.',
      gasScrubbing: 'Replace HEPA regolith filters and run active carbon beds to trap pyrolyzed fluorocarbons.',
      safeReentry: 'Re-pressurize avionics bays from surface nitrogen storage tank.'
    }
  },
  {
    id: 'sedna',
    name: 'SEDNA STATION',
    subTitle: 'Deep Space Heliopause Lab (85 AU)',
    gravityG: 0.0,
    oxygenPct: 21.0,
    pressureKpa: 101.3,
    airflowCmS: 8.0,
    imageSrc: '/planets/planet_biturion.png',
    themeColor: '#38bdf8',
    themeGlow: 'rgba(56, 189, 248, 0.75)',
    flameType: 'Zero-G Cryogenic Hull Flame',
    flameGeometrySummary: 'Microgravity flame in an isolated deep-space outpost surrounded by 30 Kelvin space vacuum.',
    locThreshold: '11.5%',
    coHazardPct: 95,
    burnRateMmS: '0.12',
    crewSurvivalActions: [
      'EVACUATE IMMEDIATELY to Central Centrifuge Habitat Hub; lock pressure bulkhead doors.',
      'Don closed-circuit emergency life support rebreathers (resupply is impossible at 85 AU).',
      'Authorize emergency automated venting of affected science wing to space vacuum.',
      'Isolate cryogenic sleep tanks from main electrical and environmental loops.'
    ],
    flameCombustionMechanism: [
      'Zero convection with cold hull radiation loss near -240°C triggers cool flame instabilities.',
      'Flames burn with zero soot luminosity (completely invisible blue or infrared emission).',
      'Combustion products expand spherically, pressurizing unvented storage lockers.'
    ],
    toxicGasAndCoThreat: [
      'Deadly Carbon Monoxide buildup (95% index); cool flames continue burning invisibly.',
      'Zero-g suspended soot clogs environmental life-support scrubbers within 120 seconds.',
      'Water mist extinguishment is prohibited: boiling droplets rupture composite electronics.'
    ],
    criticalMaterialHazards: [
      '3D Printing Polymers (PEEK, Ultem): Pyrolyze into volatile aromatic hydrocarbons.',
      'Laboratory Aerosol Reagents: Flash ignition creates expanding supersonic pressure waves.',
      'Radiant Water Wall Baffles: Overpressure steam hazards near heating conduits.'
    ],
    suppressionDirective: {
      agent: 'Automated Module Vacuum Venting Barrier',
      protocol: 'Blow explosive pyrotechnic hull vent to dump all oxygen in the affected module directly to space vacuum within 20 seconds.',
      criticalTiming: 'Execute venting before toxic soot breaches central centrifuge life hub.'
    },
    hvacVentilationLock: {
      rule: 'PYROTECHNIC SLAM VALVE ISOLATION',
      action: 'Trigger pyrotechnic guillotine dampers to physically sever all ductwork connecting to the burning lab.',
      danger: 'Any atmospheric backflow poisons the irreplaceable central closed-loop ecosystem.'
    },
    postFireClearance: {
      thermalScan: 'Verify outer hull boundary has frozen back to 30 Kelvin via external radiometric sensor.',
      gasScrubbing: 'Vent residual gases to vacuum; do not attempt filtration of deep-space toxic combustion tars.',
      safeReentry: 'Re-pressurize from emergency reserve gas tanks only after structural hull integrity scan.'
    }
  },
  {
    id: 'titan',
    name: 'TITAN COLONY',
    subTitle: 'Saturnian Dense Methane Outpost',
    gravityG: 0.14,
    oxygenPct: 21.0,
    pressureKpa: 146.7,
    airflowCmS: 7.0,
    imageSrc: '/planets/planet_titan.png',
    themeColor: '#fbbf24',
    themeGlow: 'rgba(251, 191, 36, 0.75)',
    flameType: 'Dense Hydrocarbon Dual-Atmosphere Flame',
    flameGeometrySummary: 'Internal habitat oxygen versus external dense cryogenic methane atmosphere (1.5 atm). Catastrophic explosion hazard.',
    locThreshold: '10.8%',
    coHazardPct: 74,
    burnRateMmS: '0.15',
    crewSurvivalActions: [
      'PREVENT HULL RUPTURE AT ALL COSTS: External methane ingress into internal O2 creates detonation!',
      'Don fireproof rebreathers; verify airlock positive nitrogen overpressure barrier is active.',
      'Evacuate to sub-ice emergency shelter if airlock pressure differential drops below 10 kPa.',
      'Verify methane detector sensors around perimeter gaskets.'
    ],
    flameCombustionMechanism: [
      'Dense atmosphere (147 kPa) provides high heat sinking, but increases gas phase reaction rates.',
      'Flames propagate along internal polymer surfaces with enhanced thermal conductivity.',
      'Extreme danger of dual-reactant boundary layer: an airlock leak acts as an industrial torch.'
    ],
    toxicGasAndCoThreat: [
      'Dense unburned hydrocarbon soot, polycyclic aromatic compounds, and carbon monoxide.',
      'Electrostatic spark discharges from cryogenic methane blizzards ignite venting oxygen.',
      'External seals face rapid thermal degradation, risking structural failure.'
    ],
    criticalMaterialHazards: [
      'Airlock Fluoroelastomer Gaskets: Hydrocarbon swelling makes rubber brittle and flammable.',
      'Electrolysis Units: Cryogenic methane ingress into oxygen separation manifolds.',
      'Aerostat Envelopes: Electrostatic charging during methane rainstorms triggers ignition.'
    ],
    suppressionDirective: {
      agent: 'High-Pressure Nitrogen Gas Overpressure Blanket',
      protocol: 'Flood compartment with pure gaseous nitrogen to create an inert barrier and maintain positive pressure against external methane.',
      criticalTiming: 'Inject nitrogen within 15 seconds to prevent flammable stoichiometry.'
    },
    hvacVentilationLock: {
      rule: 'EXTERNAL AIRLOCK DAMPER LOCK',
      action: 'Lock all external heat-exchanger intake dampers and engage internal nitrogen recirculation.',
      danger: 'Opening external relief valves draws in external methane, transforming fire into fuel-air bomb.'
    },
    postFireClearance: {
      thermalScan: 'Scan external airlock perimeter gaskets with infrared camera for micro-leaks.',
      gasScrubbing: 'Run mass spectrometer gas analysis to confirm zero hydrocarbon ppm inside habitat.',
      safeReentry: 'Maintain 10% nitrogen overpressure before opening internal crew hatches.'
    }
  },
  {
    id: 'jupiter',
    name: 'JOVIAN ORBIT',
    subTitle: 'Radiation Belt Hyper-Gravity Post',
    gravityG: 2.528,
    solarDistanceAU: 5.2,
    oxygenPct: 21.0,
    pressureKpa: 120.0,
    airflowCmS: 12.0,
    imageSrc: '/planets/planet_jupiter.png',
    themeColor: '#fb923c',
    themeGlow: 'rgba(251, 146, 60, 0.75)',
    flameType: '2.53g Hyper-Buoyant Turbulent Flame Jet',
    flameGeometrySummary: 'Extreme 2.53g gravity creates violent convective upward plumes. Ceiling flashover occurs in < 30 seconds.',
    locThreshold: '16.0%',
    coHazardPct: 45,
    burnRateMmS: '1.40',
    crewSurvivalActions: [
      'EVACUATE CEILING PROXIMITY IMMEDIATELY: Superheated plumes shoot upward at 4x terrestrial speed!',
      'Crawl along floor levels while fighting against 2.53g body weight to reach armored escape pod.',
      'Activate emergency radiation shield bulkhead to contain superheated plasma arcs.',
      'Don reinforced thermal protective fire hoods.'
    ],
    flameCombustionMechanism: [
      'Rayleigh-Bénard thermal convection is magnified by 2.5x; intense upward chimney draft.',
      'Flames form tight, violently flickering turbulent jets with extreme convective heat release.',
      'Molten polymer droplets tear loose and rain rapidly downward under heavy gravity.'
    ],
    toxicGasAndCoThreat: [
      'Superheated combustion plumes reach ceiling panels within 1.2 seconds.',
      'Flashover temperature (600°C) is reached 3 times faster than in Earth standard tests.',
      'Intense Jovian magnetosphere radiation accelerates dielectric breakdown of damaged wiring.'
    ],
    criticalMaterialHazards: [
      'Ceiling Wire Trays: Direct plume impingement triggers catastrophic structural wire fire.',
      'Superconducting Magnet Cryo-Loops: Quench arcing vaporizes insulation into flame jets.',
      'High-Pressure Hydraulic Actuators: Plume heat ruptures fluid lines at 200 bar pressure.'
    ],
    suppressionDirective: {
      agent: 'High-Pressure Argon Deluge + Active Water Curtain',
      protocol: 'Discharge dense gaseous argon from ceiling deluge nozzles and activate active water curtain to suppress turbulent updraft.',
      criticalTiming: 'Discharge within 10 seconds to stop convective flashover propagation.'
    },
    hvacVentilationLock: {
      rule: 'EMERGENCY POWER & CONVECTION CUT',
      action: 'Cut main high-voltage feed to superconducting coils and engage high-speed smoke exhaust turbines.',
      danger: 'Natural buoyancy is already violent; any additional fan draft creates a blowtorch effect.'
    },
    postFireClearance: {
      thermalScan: 'Verify superconducting magnet temperatures have not breached critical quench threshold.',
      gasScrubbing: 'Extract dense argon gas blanket and replenish breathable oxygen mixture.',
      safeReentry: 'Inspect ceiling structural trusses for thermal warping before authorizing pod re-dock.'
    }
  }
];

export const SimulatorPage: React.FC<SimulatorPageProps> = ({ onNavigate: _onNavigate }) => {
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState<number>(0); // Default to Cetrion / ISS
  const [showCustomSliders, setShowCustomSliders] = useState<boolean>(false);

  // Custom simulator sliders state
  const [customGravity, setCustomGravity] = useState<number>(0.0);
  const [customOxygen, setCustomOxygen] = useState<number>(21.0);
  const [customPressure, setCustomPressure] = useState<number>(101.3);
  const [customAirflow, setCustomAirflow] = useState<number>(10.0);

  const currentPlanet = PLANET_SAFETY_DATABASE[selectedPlanetIndex];

  // Sync custom sliders when planet changes
  const selectPlanet = (index: number) => {
    setSelectedPlanetIndex(index);
    const p = PLANET_SAFETY_DATABASE[index];
    setCustomGravity(p.gravityG);
    setCustomOxygen(p.oxygenPct);
    setCustomPressure(p.pressureKpa);
    setCustomAirflow(p.airflowCmS);
  };

  return (
    <div className="min-h-screen bg-[#030408] pt-20 pb-16 px-4 sm:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* =================================================================== */}
        {/* 1. TOP HERO: PLANETARY SELECTION LINEUP (1:1 with Reference Image 1)*/}
        {/* "What's Hubble Looking at Right Now?" style celestial selector      */}
        {/* =================================================================== */}
        <div className="relative py-8 border-b border-white/10 overflow-hidden">
          {/* Subtle starry background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Clean Technical Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-[0.25em] text-shadow-cyan">
                NASA PHYSICAL SCIENCES INFORMATICS // TRAINING SECTION 04
              </span>
            </div>
            <div className="font-mono text-xs text-zinc-400">
              <span className="text-zinc-500">Wide Field Sensor · </span>
              <span className="text-white">Combustion Coordinates [01 52]</span>
            </div>
          </div>

          {/* Headline (1:1 with Image 1 style) */}
          <div className="mb-8">
            <h1 className="font-sans text-3xl sm:text-5xl font-light tracking-tight text-white uppercase text-shadow-glow">
              EXTRATERRESTRIAL FIRE DYNAMICS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-300 to-amber-200 font-normal">
                & CREW SAFETY PROTOCOLS
              </span>
            </h1>
            <p className="font-mono text-xs text-zinc-300 font-light mt-2 max-w-2xl leading-relaxed text-shadow-dark">
              Select any celestial habitat below to inspect how fire propagates under its gravity field, what crew actions are mandatory for survival, and the actionable NASA extinction directives.
            </p>
          </div>

          {/* Horizontal Planetary Orbit Line-up (1:1 with Image 1) */}
          <div className="relative flex items-center justify-between gap-4 sm:gap-8 py-6 px-4 overflow-x-auto no-scrollbar">
            {PLANET_SAFETY_DATABASE.map((planet, idx) => {
              const isSelected = selectedPlanetIndex === idx;
              return (
                <div
                  key={planet.id}
                  onClick={() => selectPlanet(idx)}
                  className={`group relative flex flex-col items-center flex-shrink-0 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'scale-115 z-30' : 'opacity-60 hover:opacity-100 scale-95'
                  }`}
                >
                  {/* Selected Planet HUD Orbit Rings (Image 1 style) */}
                  {isSelected && (
                    <div className="absolute inset-[-16px] pointer-events-none flex items-center justify-center">
                      <div
                        className="absolute inset-0 rounded-full border border-dashed animate-[spin_20s_linear_infinite]"
                        style={{ borderColor: `${planet.themeColor}` }}
                      />
                      <div
                        className="absolute inset-[-8px] rounded-full border opacity-40 rotate-45"
                        style={{ borderColor: `${planet.themeColor}` }}
                      />
                    </div>
                  )}

                  {/* Planet 3D Sphere */}
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full relative overflow-hidden shadow-2xl transition-all"
                    style={{
                      boxShadow: isSelected
                        ? `0 0 35px ${planet.themeGlow}, inset 0 2px 8px rgba(255,255,255,0.8)`
                        : `inset 0 0 10px rgba(0,0,0,0.8)`,
                    }}
                  >
                    <img
                      src={planet.imageSrc}
                      alt={planet.name}
                      className="w-full h-full object-cover rounded-full select-none"
                    />
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, transparent 55%, rgba(0, 0, 0, 0.35) 80%, rgba(0, 0, 0, 0.75) 100%)',
                      }}
                    />
                  </div>

                  {/* Planet Label */}
                  <span
                    className={`font-mono text-[9px] uppercase tracking-wider mt-2.5 transition-colors text-shadow-dark ${
                      isSelected ? 'text-white font-medium' : 'text-zinc-400 group-hover:text-white'
                    }`}
                    style={{ color: isSelected ? planet.themeColor : undefined }}
                  >
                    {planet.name.split(' ')[0]}
                  </span>
                  <span className="font-mono text-[8px] text-zinc-500">
                    {planet.gravityG}g
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. THE TACTICAL SAFETY & FIRE HUD TABLE (1:1 with Reference Image 2)*/}
        {/* Cybernetic Frame + Center Flame Reactor + 4 Left & 3 Right Panels  */}
        {/* =================================================================== */}
        <div className="relative w-full rounded-none overflow-hidden p-4 sm:p-8 bg-[#040814]/90 border border-[#00f0ff]/40 shadow-[0_0_50px_rgba(0,240,255,0.15)]">
          {/* Cybernetic Tech Frame Accents (Image 2 style) */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00f0ff] pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00f0ff] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00f0ff] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#00f0ff] pointer-events-none" />

          {/* Top Yellow Corner Dots (1:1 with Image 2) */}
          <div className="absolute top-3 left-10 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15] pointer-events-none" />
          <div className="absolute top-3 right-10 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15] pointer-events-none" />
          <div className="absolute bottom-3 left-10 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15] pointer-events-none" />
          <div className="absolute bottom-3 right-10 w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15] pointer-events-none" />

          {/* Top Ventilation Louver Trim */}
          <div className="w-full flex justify-center mb-6">
            <div className="h-1.5 w-64 bg-gradient-to-r from-transparent via-[#00f0ff]/60 to-transparent" />
          </div>

          {/* Main Grid: 4 Left Boxes, Center Holographic Flame Reactor, 3 Right Boxes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

            {/* =============================================================== */}
            {/* LEFT COLUMN: 4 TACTICAL CREW SAFETY & HAZARD BOXES (Image 2)     */}
            {/* =============================================================== */}
            <div className="lg:col-span-4 space-y-3">
              {/* Box 1: Crew Survival Actions */}
              <div className="p-3.5 bg-black/60 border border-[#00f0ff]/30 relative rounded-none hover:border-[#00f0ff]/70 transition-all">
                <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#00f0ff] tracking-wider uppercase">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>01 // CREW IMMEDIATE SURVIVAL ACTIONS</span>
                </div>
                <ul className="space-y-1 font-sans text-xs text-zinc-300 font-light leading-snug">
                  {currentPlanet.crewSurvivalActions.map((action, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400 mt-0.5">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 2: Flame Combustion Mechanism */}
              <div className="p-3.5 bg-black/60 border border-[#00f0ff]/30 relative rounded-none hover:border-[#00f0ff]/70 transition-all">
                <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-amber-400 tracking-wider uppercase">
                  <Flame className="w-3.5 h-3.5" />
                  <span>02 // FLAME COMBUSTION MECHANISM ({currentPlanet.gravityG}g)</span>
                </div>
                <ul className="space-y-1 font-sans text-xs text-zinc-300 font-light leading-snug">
                  {currentPlanet.flameCombustionMechanism.map((mech, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{mech}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 3: Toxic Gas & CO Threat */}
              <div className="p-3.5 bg-black/60 border border-[#00f0ff]/30 relative rounded-none hover:border-[#00f0ff]/70 transition-all">
                <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-red-400 tracking-wider uppercase">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>03 // TOXIC GASES & CO ACCUMULATION ({currentPlanet.coHazardPct}%)</span>
                </div>
                <ul className="space-y-1 font-sans text-xs text-zinc-300 font-light leading-snug">
                  {currentPlanet.toxicGasAndCoThreat.map((gas, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>{gas}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Box 4: Critical Material Hazards */}
              <div className="p-3.5 bg-black/60 border border-[#00f0ff]/30 relative rounded-none hover:border-[#00f0ff]/70 transition-all">
                <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-purple-400 tracking-wider uppercase">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>04 // HIGH-RISK HABITAT MATERIALS</span>
                </div>
                <ul className="space-y-1 font-sans text-xs text-zinc-300 font-light leading-snug">
                  {currentPlanet.criticalMaterialHazards.map((mat, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* =============================================================== */}
            {/* CENTER COLUMN: ROTATING HOLOGRAPHIC FLAME REACTOR (Image 2)     */}
            {/* =============================================================== */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center my-4">
              {/* Concentric Segmented Cybernetic Arc Ring (1:1 with Image 2) */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                
                {/* Outer Segmented White/Cyan Brackets Rotating (Image 2 style) */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00f0ff] border-r-white/80 border-b-[#00f0ff] animate-[spin_25s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-dashed border-[#00f0ff]/50 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-8 rounded-full border-2 border-transparent border-l-white border-b-cyan-400 animate-[spin_35s_linear_infinite]" />

                {/* Cybernetic Center HUD Simulation Core */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-black/85 border border-[#00f0ff]/60 flex flex-col items-center justify-center relative overflow-hidden shadow-[inset_0_0_30px_rgba(0,240,255,0.4)]">
                  
                  {/* Real-Time Simulated Dynamic Flame for this Planet */}
                  <div className="relative flex flex-col items-center justify-center">
                    {currentPlanet.gravityG === 0 ? (
                      /* Zero-G: Perfect Spherical Blue Diffusion Flame */
                      <div className="relative flex items-center justify-center">
                        <div
                          className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-400 to-transparent blur-[1px] shadow-[0_0_30px_#00f0ff] animate-pulse"
                        />
                        <div className="absolute w-4 h-4 rounded-full bg-white blur-[2px] opacity-80" />
                      </div>
                    ) : currentPlanet.gravityG < 0.4 ? (
                      /* Low-G (Moon / Mars): Low-buoyancy Dome Flame */
                      <div className="relative flex flex-col items-center">
                        <div
                          className="w-14 h-18 rounded-t-full bg-gradient-to-t from-orange-600 via-amber-400 to-blue-400 blur-[1px] shadow-[0_0_35px_#f59e0b]"
                        />
                      </div>
                    ) : (
                      /* Hyper-G (Jupiter / 1g): Violent Turbulent Upward Plume */
                      <div className="relative flex flex-col items-center">
                        <div
                          className="w-12 h-24 rounded-full bg-gradient-to-t from-blue-700 via-orange-500 to-yellow-200 blur-[1px] shadow-[0_0_40px_#ea580c] animate-[pulse_1s_infinite]"
                        />
                      </div>
                    )}

                    {/* Flame Summary Label */}
                    <div className="mt-2 text-center font-mono text-[9px] text-cyan-300 uppercase tracking-widest px-2">
                      {currentPlanet.flameType}
                    </div>
                  </div>

                  {/* Planet Telemetry Badges */}
                  <div className="absolute bottom-2 flex items-center gap-2 font-mono text-[9px] text-zinc-400">
                    <span>{currentPlanet.gravityG}g</span>
                    <span>·</span>
                    <span>{currentPlanet.oxygenPct}% O2</span>
                  </div>
                </div>
              </div>

              {/* Status Header below Ring */}
              <div className="mt-4 text-center">
                <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-[0.2em] font-medium">
                  {currentPlanet.name} // COMBUSTION PROFILE
                </div>
                <div className="font-sans text-xs text-zinc-400 font-light mt-0.5">
                  LOC Extinction Limit: <strong className="text-white">{currentPlanet.locThreshold}</strong> · Spread: <strong className="text-white">{currentPlanet.burnRateMmS} mm/s</strong>
                </div>

                {/* Toggle Custom Sliders Button */}
                <button
                  onClick={() => setShowCustomSliders(!showCustomSliders)}
                  className="mt-3 px-4 py-1.5 border border-[#00f0ff]/40 bg-black/60 hover:bg-[#00f0ff]/10 text-cyan-300 font-mono text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 mx-auto cursor-pointer"
                >
                  <Sliders className="w-3 h-3" />
                  <span>{showCustomSliders ? 'HIDE CUSTOM CONTROLS' : 'OPEN INTERACTIVE SLIDERS'}</span>
                </button>
              </div>
            </div>

            {/* =============================================================== */}
            {/* RIGHT COLUMN: 3 ACTIONABLE FIRE SUPPRESSION PANELS (Image 2)     */}
            {/* =============================================================== */}
            <div className="lg:col-span-4 space-y-3">
              {/* Panel 1: Primary Suppression Directive */}
              <div className="p-4 bg-black/60 border border-[#00f0ff]/30 relative rounded-none hover:border-[#00f0ff]/70 transition-all">
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-emerald-400 tracking-wider uppercase">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>STEP 1 // PRIMARY SUPPRESSION DIRECTIVE</span>
                </div>
                <div className="space-y-1.5 font-sans text-xs leading-snug">
                  <div>
                    <span className="font-mono text-[9px] text-zinc-400 uppercase block">AGENT:</span>
                    <strong className="text-white font-medium">{currentPlanet.suppressionDirective.agent}</strong>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-zinc-400 uppercase block">PROTOCOL:</span>
                    <p className="text-zinc-300 font-light">{currentPlanet.suppressionDirective.protocol}</p>
                  </div>
                  <div className="font-mono text-[10px] text-emerald-300 pt-1">
                    TARGET TIMING: {currentPlanet.suppressionDirective.criticalTiming}
                  </div>
                </div>
              </div>

              {/* Panel 2: HVAC Ventilation Emergency Lock */}
              <div className="p-4 bg-black/60 border border-[#00f0ff]/30 relative rounded-none hover:border-[#00f0ff]/70 transition-all">
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-amber-400 tracking-wider uppercase">
                  <Wind className="w-3.5 h-3.5" />
                  <span>STEP 2 // HVAC VENTILATION EMERGENCY LOCK</span>
                </div>
                <div className="space-y-1.5 font-sans text-xs leading-snug">
                  <div>
                    <span className="font-mono text-[9px] text-zinc-400 uppercase block">RULE:</span>
                    <strong className="text-amber-300 font-medium">{currentPlanet.hvacVentilationLock.rule}</strong>
                  </div>
                  <p className="text-zinc-300 font-light">{currentPlanet.hvacVentilationLock.action}</p>
                  <div className="font-mono text-[9px] text-red-300 pt-1">
                    HAZARD: {currentPlanet.hvacVentilationLock.danger}
                  </div>
                </div>
              </div>

              {/* Panel 3: Post-Fire Clearance & Reignition Scan */}
              <div className="p-4 bg-black/60 border border-[#00f0ff]/30 relative rounded-none hover:border-[#00f0ff]/70 transition-all">
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-cyan-400 tracking-wider uppercase">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>STEP 3 // POST-FIRE SCAN & REIGNITION CHECK</span>
                </div>
                <div className="space-y-1.5 font-sans text-xs leading-snug">
                  <div>
                    <span className="font-mono text-[9px] text-zinc-400 uppercase block">THERMAL SCAN:</span>
                    <p className="text-zinc-300 font-light">{currentPlanet.postFireClearance.thermalScan}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[9px] text-zinc-400 uppercase block">GAS RECLAMATION:</span>
                    <p className="text-zinc-300 font-light">{currentPlanet.postFireClearance.gasScrubbing}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Ventilation Louver Trim */}
          <div className="w-full flex justify-center mt-6">
            <div className="h-1.5 w-64 bg-gradient-to-r from-transparent via-[#00f0ff]/60 to-transparent" />
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. OPTIONAL EXPANDABLE CUSTOM LAB SLIDERS DRAWER                    */}
        {/* For deep interactive testing of Gravity, Oxygen, Pressure & Draft   */}
        {/* =================================================================== */}
        {showCustomSliders && (
          <div className="p-6 bg-black/80 border border-[#00f0ff]/40 space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                  CUSTOM LABORATORY PARAMETER EXPERIMENTATION
                </span>
              </div>
              <button
                onClick={() => selectPlanet(selectedPlanetIndex)}
                className="font-mono text-[10px] text-zinc-400 hover:text-white uppercase flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>RESET TO {currentPlanet.name.split(' ')[0]} DEFAULTS</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs">
              {/* Gravity */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-zinc-400">GRAVITY:</span>
                  <strong className="text-cyan-400">{customGravity.toFixed(3)}g</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2.5"
                  step="0.01"
                  value={customGravity}
                  onChange={(e) => setCustomGravity(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-zinc-800 h-1 cursor-pointer"
                />
              </div>

              {/* Oxygen */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-zinc-400">OXYGEN LEVEL:</span>
                  <strong className="text-amber-400">{customOxygen.toFixed(1)}% O2</strong>
                </div>
                <input
                  type="range"
                  min="10"
                  max="35"
                  step="0.5"
                  value={customOxygen}
                  onChange={(e) => setCustomOxygen(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 bg-zinc-800 h-1 cursor-pointer"
                />
              </div>

              {/* Pressure */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-zinc-400">CABIN PRESSURE:</span>
                  <strong className="text-emerald-400">{customPressure.toFixed(1)} kPa</strong>
                </div>
                <input
                  type="range"
                  min="40"
                  max="150"
                  step="1"
                  value={customPressure}
                  onChange={(e) => setCustomPressure(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 bg-zinc-800 h-1 cursor-pointer"
                />
              </div>

              {/* Airflow */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-zinc-400">VENTILATION DRAFT:</span>
                  <strong className="text-blue-400">{customAirflow.toFixed(1)} cm/s</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="0.5"
                  value={customAirflow}
                  onChange={(e) => setCustomAirflow(parseFloat(e.target.value))}
                  className="w-full accent-blue-400 bg-zinc-800 h-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
