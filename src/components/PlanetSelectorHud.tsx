import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sun,
  Flame,
  Target,
  ArrowUpRight,
  ShieldAlert,
  Gauge,
  Wind,
  Layers,
  Activity,
  FileText,
  Atom
} from 'lucide-react';
import { PlanetaryHabitat } from '../types';

interface PlanetSelectorHudProps {
  onSelectPlanet: (planet: PlanetaryHabitat) => void;
  onOpenSimulator: () => void;
}

export interface QuestionDossierItem {
  id: string;
  category: string;
  question: string;
  scientificBreakdown: string;
  threatLevel: 'CRITICAL' | 'ELEVATED' | 'HIGH' | 'EXTREME';
  boundaryMetrics: {
    label: string;
    value: string;
    subtext: string;
    gaugePct: number;
  }[];
  tacticalProtocols: {
    step: string;
    action: string;
    directive: string;
  }[];
  suppressionDirective: {
    agent: string;
    dwellTime: string;
    efficiencyRating: string;
    cautionNote: string;
  };
}

export interface PlanetaryCombustionMatrix {
  atmosphericComposition: {
    cabinPressureKpa: number;
    oxygenFractionPct: number;
    bufferGas: string;
    inertRatioPct: number;
    ambientLeakRisk: string;
  };
  convectionRegime: {
    buoyancyVector: string;
    flowVelocityCmS: number;
    flameProfileGeometry: string;
    rayleighNumberIndex: string;
  };
  nasaFlightEvidence: {
    missionCode: string;
    experimentTitle: string;
    flightPlatform: string;
    empiricalBreakdown: string;
    psiAccessionId: string;
  };
  agentEfficacy: {
    name: string;
    scorePct: number;
    status: 'OPTIMAL' | 'EFFECTIVE' | 'CAUTION' | 'PROHIBITED';
    notes: string;
  }[];
}

export interface HudPlanet {
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
  actionQuestionDossiers: QuestionDossierItem[];
  matrix: PlanetaryCombustionMatrix;
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
    suppressionStrategy: 'Depressurize and purge with heated nitrogen gas',
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
    ],
    actionQuestionDossiers: [
      {
        id: 'eur-q1',
        category: 'CRYO-THERMAL KINETICS',
        threatLevel: 'CRITICAL',
        question: 'How to suppress cryogenic habitat fires on Europa?',
        scientificBreakdown: 'At ambient external temperatures of -170°C, interior habitat walls experience severe thermal gradient stress. Combustion rapidly heats localized sub-ice structural polymers, creating high-pressure vapor outgassing pockets. Standard aqueous suppressants instantly freeze within delivery nozzles, while volatile glycol heat-transfer loops pose severe autoignition risks under 0.134g convection.',
        boundaryMetrics: [
          { label: 'Thermal Gradient Delta', value: '190°C', subtext: 'Sub-ice bulkhead differential', gaugePct: 85 },
          { label: 'Flame Spread Rate', value: '0.18 mm/s', subtext: 'Cryo-retarded front in 0.134g', gaugePct: 35 },
          { label: 'Freeze-Risk Quench Index', value: '94%', subtext: 'Liquid extinguisher freeze danger', gaugePct: 94 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Isolate Glycol Thermal Circuits', directive: 'Scram secondary sub-ice fluid heat exchangers within 4.5 seconds to halt flammable glycol migration.' },
          { step: '02', action: 'Deploy Heated Gaseous Nitrogen', directive: 'Discharge dry N2 pre-heated to +25°C to avoid nozzle frost clogging and disperse oxygen below 12.4%.' },
          { step: '03', action: 'Sub-Ice Bulkhead Thermal Isolation', directive: 'Engage cryogenic thermal chokes to prevent localized hull ice sublimation and catastrophic pressure breach.' },
        ],
        suppressionDirective: {
          agent: 'Heated Gaseous Nitrogen (N2)',
          dwellTime: '40 Seconds Continuous Flood',
          efficiencyRating: '92% Extinction Ratio',
          cautionNote: 'Aqueous water mist strictly forbidden; causes explosive ice fracturing on cryogenic bulkheads.'
        }
      },
      {
        id: 'eur-q2',
        category: 'ATMOSPHERIC INERTING',
        threatLevel: 'ELEVATED',
        question: 'Nitrogen sub-zero displacement protocol',
        scientificBreakdown: 'Sub-surface Jovian outpost modules rely on pressurized nitrogen blankets. When isolating combustion zones, injecting dry nitrogen displaces the oxygen boundary layer down to 11.8% within 28 seconds, starving hydrocarbon radicals while preserving electronics integrity.',
        boundaryMetrics: [
          { label: 'Target Inerting N2 Concentration', value: '88.2%', subtext: 'LOC extinction threshold', gaugePct: 88 },
          { label: 'Compartment Depressurization', value: '0.22 kPa/s', subtext: 'Prevents ice seal burst', gaugePct: 42 },
          { label: 'Radiative Heat Dissipation', value: '3.4 kW/m²', subtext: 'Passive cold sink dissipation', gaugePct: 55 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Engage Nitrogen Injection Manifold', directive: 'Open high-pressure solenoid ports directly above thermal heat dissipation bays.' },
          { step: '02', action: 'Activate Sub-Zero Circulation Fans', directive: 'Run low-velocity fans (< 5 cm/s) to distribute nitrogen evenly without feeding oxygen eddy currents.' },
          { step: '03', action: 'Monitor Galvanic Thermal Probes', directive: 'Verify core equipment temperature drops below 180°C before commencing atmosphere scrub.' },
        ],
        suppressionDirective: {
          agent: 'High-Purity Dry Nitrogen (N2)',
          dwellTime: '60 Seconds Dwell',
          efficiencyRating: '96% Inerting Efficacy',
          cautionNote: 'Ensure crew are donned in emergency SCBA breathing hoods before nitrogen discharge.'
        }
      },
      {
        id: 'eur-q3',
        category: 'ELECTRICAL SAFETY',
        threatLevel: 'HIGH',
        question: 'Avionics insulation thermal cutoff',
        scientificBreakdown: 'Sub-surface habitat electrical harnesses carry up to 400A DC to power active thermal life support. Under Europa sub-zero vibration and thermal contractions, Kapton/PTFE cable jackets become brittle, creating arc-tracking fire risks that can ignite adjacent polyurethane acoustic dampeners.',
        boundaryMetrics: [
          { label: 'Dielectric Breakdown Resistance', value: '18 kV/mm', subtext: 'Pre-conditioned harness rating', gaugePct: 72 },
          { label: 'Solid-State Trip Latency', value: '4.2 ms', subtext: 'Arc detection response speed', gaugePct: 95 },
          { label: 'Acoustic Foam Smolder Index', value: '68%', subtext: 'Smoldering toxic gas yield', gaugePct: 68 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Instant Millisecond Bus Scram', directive: 'Autonomous solid-state circuit interrupters sever power to the affected module rack in under 5 ms.' },
          { step: '02', action: 'Thermal Shunt Dissipation', directive: 'Redirect residual capacitive charge into external sub-surface ice grounding pins.' },
          { step: '03', action: 'Aerosol Particulate Sweep', directive: 'Deploy localized micro-capsule fluoroketone directly onto avionics backplane connectors.' },
        ],
        suppressionDirective: {
          agent: 'Fluoroketone (FK-5-1-12) Micro-Aerosol',
          dwellTime: '15 Seconds Instant Quench',
          efficiencyRating: '98% Arc Extinction',
          cautionNote: 'Zero electrical conductivity; leaves zero conductive residue on Jovian radio antennas.'
        }
      }
    ],
    matrix: {
      atmosphericComposition: {
        cabinPressureKpa: 95.0,
        oxygenFractionPct: 19.5,
        bufferGas: 'Nitrogen / Argon (80.5%)',
        inertRatioPct: 80.5,
        ambientLeakRisk: 'Sub-zero ice sublimation risk'
      },
      convectionRegime: {
        buoyancyVector: 'Weak 0.134g Plume',
        flowVelocityCmS: 2.4,
        flameProfileGeometry: 'Bulbous dome with subdued upward curl',
        rayleighNumberIndex: 'Ra ~ 1.4 × 10³'
      },
      nasaFlightEvidence: {
        missionCode: 'PSI-EXP-EUR-01',
        experimentTitle: 'Cryogenic Boundary Smolder Study',
        flightPlatform: 'NASA Glenn Drop Tower 5.18s',
        empiricalBreakdown: 'Demonstrated that polymer smolder propagation decelerates by 65% in sub-zero ambient nitrogen environments.',
        psiAccessionId: 'PSI-2024-EUR9'
      },
      agentEfficacy: [
        { name: 'Heated N2 Purge', scorePct: 96, status: 'OPTIMAL', notes: 'Thermal gradient safe' },
        { name: 'Dry CO2 Total-Flood', scorePct: 88, status: 'EFFECTIVE', notes: 'Requires warm diffuser' },
        { name: 'Argon Gas Blanket', scorePct: 82, status: 'EFFECTIVE', notes: 'Settles over lower decks' },
        { name: 'Water Mist Spray', scorePct: 0, status: 'PROHIBITED', notes: 'Freezes instantly at -170°C' },
        { name: 'Airlock Depressurization', scorePct: 94, status: 'OPTIMAL', notes: 'Starves flame to vacuum' }
      ]
    }
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
    ],
    actionQuestionDossiers: [
      {
        id: 'dev-q1',
        category: 'BUOYANCY DYNAMICS',
        threatLevel: 'CRITICAL',
        question: 'How to suppress lateral 0.38g floor flames on Mars?',
        scientificBreakdown: 'Martian gravity (0.38g) generates a buoyant updraft roughly 38% of Earth baseline. Heated combustion gases lack the vigor to rise straight up into ceiling exhaust ports; instead, they crawl laterally along floor channels, pre-heating synthetic floor carpets, habitat power trunks, and rover recharge umbilicals.',
        boundaryMetrics: [
          { label: 'Lateral Spread Velocity', value: '0.45 mm/s', subtext: 'Floor boundary layer creep', gaugePct: 58 },
          { label: 'Plume Froude Number', value: 'Fr = 0.42', subtext: 'Intermediate buoyancy regime', gaugePct: 42 },
          { label: 'Ceiling Smoke Stratification', value: 'Delayed 180s', subtext: 'Ceiling sensors fail early warning', gaugePct: 82 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'De-energize Underfloor Ductwork', directive: 'Immediately command floor-level HVAC dampers closed to eliminate horizontal air currents.' },
          { step: '02', action: 'Deploy Dense Floor-Level CO2 Flooding', directive: 'Discharge low-velocity carbon dioxide along perimeter floor nozzles, laying an inert blanket over carpeting.' },
          { step: '03', action: 'Pressurize Adjacent Inter-Dome Airlocks', directive: 'Create 5 kPa positive overpressure in safe domes to prevent lateral smoke migration.' },
        ],
        suppressionDirective: {
          agent: 'Perimeter High-Density CO2 Blanket',
          dwellTime: '45 Seconds Sustained Delivery',
          efficiencyRating: '94% Extinction Efficacy',
          cautionNote: 'Do not use high-velocity nozzles that kick up flammable debris across the floor.'
        }
      },
      {
        id: 'dev-q2',
        category: 'SUPPRESSION CHEMISTRY',
        threatLevel: 'ELEVATED',
        question: 'CO2 rapid flood vs. low-pressure habitat mix',
        scientificBreakdown: 'Mars habitats operate at reduced pressure (~56 kPa to 70 kPa) with oxygen enrichment up to 28% to support frequent EVA excursions. Injecting liquid or high-pressure CO2 into low atmospheric density causes violent adiabatic expansion and temperature drops to -65°C, causing severe dry-ice frost formation that blinds optical infrared fire sensors.',
        boundaryMetrics: [
          { label: 'Habitat Total Pressure', value: '56.0 kPa', subtext: 'Reduced barometric environment', gaugePct: 56 },
          { label: 'Oxygen Fraction', value: '28.0% O2', subtext: 'Elevated flammability index', gaugePct: 70 },
          { label: 'Adiabatic Temp Drop', value: '-48.5°C', subtext: 'Dry ice sensor frosting danger', gaugePct: 78 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Pre-heat CO2 Discharge Manifolds', directive: 'Engage inline electrical heating coils to deliver gaseous CO2 above 0°C.' },
          { step: '02', action: 'Modulate Partial Pressure Influx', directive: 'Regulate discharge to keep habitat total pressure between 55 kPa and 72 kPa.' },
          { step: '03', action: 'Cross-Verify with Electrochemical CO Probes', directive: 'Use gas concentration sensors instead of frost-vulnerable optical flame detectors.' },
        ],
        suppressionDirective: {
          agent: 'Modulated Heated CO2 Gas',
          dwellTime: '30 Seconds Intermittent Pulse',
          efficiencyRating: '91% Flame Quench',
          cautionNote: 'Never allow cabin pressure to drop below 50 kPa while crew occupies module.'
        }
      },
      {
        id: 'dev-q3',
        category: 'IN-SITU RESOURCE UTILIZATION',
        threatLevel: 'HIGH',
        question: 'Martian regolith dust smothering protocol',
        scientificBreakdown: 'Processed and baked Martian iron-oxide regolith (basaltic silt) contains zero volatile organics and possesses a remarkable volumetric heat capacity of 840 J/(kg·K). Dropping a 20 mm layer of sieved regolith over runaway lithium battery banks or rover power terminals conductively chokes combustion without requiring pressurized gas.',
        boundaryMetrics: [
          { label: 'Regolith Smothering Depth', value: '22 mm', subtext: 'Sufficient thermal barrier layer', gaugePct: 45 },
          { label: 'Battery Runaway Quench Temp', value: '< 140°C', subtext: 'Below thermal propagation point', gaugePct: 85 },
          { label: 'Abrasive Dust Filtration', value: 'HEPA 99.97%', subtext: 'Airlock decontamination rate', gaugePct: 99 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Release Overhead Regolith Hoppers', directive: 'Discharge gravity-fed regolith chutes directly onto the battery storage vault.' },
          { step: '02', action: 'Isolate Battery Enclosure Vent', directive: 'Seal exhaust dampers to trap thermal runaway gases inside the mineral bed.' },
          { step: '03', action: 'Electrostatic Dust Precipitation', directive: 'Energize electrostatic collector plates to sweep lingering airborne dust from room air.' },
        ],
        suppressionDirective: {
          agent: 'Sieved Desorbed Basaltic Regolith',
          dwellTime: 'Permanent Thermal Encapsulation',
          efficiencyRating: '97% Runaway Arrest',
          cautionNote: 'Regolith is abrasive; isolate airlock seals before crew re-entry.'
        }
      }
    ],
    matrix: {
      atmosphericComposition: {
        cabinPressureKpa: 56.0,
        oxygenFractionPct: 28.0,
        bufferGas: 'Nitrogen / Argon (72%)',
        inertRatioPct: 72.0,
        ambientLeakRisk: 'External ambient 0.6 kPa thin CO2'
      },
      convectionRegime: {
        buoyancyVector: 'Intermediate 0.38g Drift',
        flowVelocityCmS: 8.5,
        flameProfileGeometry: 'Tilted teardrop plume trailing along floor',
        rayleighNumberIndex: 'Ra ~ 4.2 × 10⁴'
      },
      nasaFlightEvidence: {
        missionCode: 'NASA-BASS-MARS',
        experimentTitle: 'Burning and Suppression of Solids (0.38g)',
        flightPlatform: 'NASA Zero-G Aircraft & ISS CIR',
        empiricalBreakdown: 'Confirmed that reduced gravity broadens the thermal quench zone by 2.4x, increasing smolder survival time.',
        psiAccessionId: 'PSI-2023-BASS88'
      },
      agentEfficacy: [
        { name: 'Basaltic Regolith Blanket', scorePct: 96, status: 'OPTIMAL', notes: 'Endothermic heat sink' },
        { name: 'Perimeter CO2 Total Flood', scorePct: 92, status: 'OPTIMAL', notes: 'Sinks to floor tracks' },
        { name: 'Nitrogen Inerting Purge', scorePct: 86, status: 'EFFECTIVE', notes: 'Low residue' },
        { name: 'Fine Water Mist Spray', scorePct: 35, status: 'CAUTION', notes: 'Low pressure boil-off' },
        { name: 'Cabin Vacuum Scram', scorePct: 98, status: 'OPTIMAL', notes: 'Extreme emergency only' }
      ]
    }
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
    ],
    actionQuestionDossiers: [
      {
        id: 'bit-q1',
        category: 'IN-SITU RESOURCES',
        threatLevel: 'CRITICAL',
        question: 'How to use lunar regolith as an in-situ fire suppressant?',
        scientificBreakdown: 'Lunar surface regolith is an anoxic, highly desiccated silicate powder with anorthosite minerals that absorb massive amounts of radiant energy. In 1/6th gravity, dispersed regolith settles slowly, forming a dense, suspended blanket that coats smoldering wire bundles and extinguishes both open flame and deep-seated smolders.',
        boundaryMetrics: [
          { label: 'Settling Rate in 0.166g', value: '1.4 m/s', subtext: '4x slower than Earth gravity', gaugePct: 28 },
          { label: 'Heat Absorption Capacity', value: '880 J/kg·K', subtext: 'Prevents thermal flashover', gaugePct: 82 },
          { label: 'Grain Size Fraction', value: '< 45 µm', subtext: 'Dense boundary seal powder', gaugePct: 90 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Pneumatic Regolith Cloud Dispersal', directive: 'Inject pressurized nitrogen-borne regolith dust into the burning avionics rack.' },
          { step: '02', action: 'Depower Sub-Floor Grid', directive: 'Cut high-voltage DC lines to eliminate continuous electrical spark sources.' },
          { step: '03', action: 'Magnetic & Electrostatic Dust Reclamation', directive: 'Deploy magnetic sweepers to capture paramagnetic metallic particles.' },
        ],
        suppressionDirective: {
          agent: 'Anorthositic Lunar Regolith Blanket',
          dwellTime: '120 Seconds Settling Phase',
          efficiencyRating: '95% Smolder Extinction',
          cautionNote: 'High abrasiveness; requires full airlock vacuum purge before crew visor removal.'
        }
      },
      {
        id: 'bit-q2',
        category: 'SMOLDERING KINETICS',
        threatLevel: 'ELEVATED',
        question: 'Low-gravity boundary layer smolder suppression',
        scientificBreakdown: 'In 0.166g, buoyant convection is too weak to supply sufficient oxygen for bright yellow flaming, causing materials like Nomex space suits and multilayer insulation (MLI) to smolder invisibly. Smoldering generates up to 5 times more Carbon Monoxide per gram of fuel than flaming combustion.',
        boundaryMetrics: [
          { label: 'CO Generation Rate', value: '0.18 g CO / g', subtext: 'Severe toxic gas accumulation', gaugePct: 88 },
          { label: 'Smolder Propagation Velocity', value: '0.08 mm/s', subtext: 'Deep stealth progression', gaugePct: 22 },
          { label: 'Visible Luminescence', value: '< 0.5 Lux', subtext: 'Undetectable to naked eye', gaugePct: 10 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Pinpoint Smolder with Thermal IR Camera', directive: 'Scan cable raceways for 120°C to 280°C hotspots hidden beneath insulation.' },
          { step: '02', action: 'Apply Direct Micro-Needle Nitrogen Inoculation', directive: 'Insert nitrogen delivery needles directly into the smoldering porous fabric core.' },
          { step: '03', action: 'Scrub Carbon Monoxide', directive: 'Switch ECLSS to high-throughput hopcalite catalytic oxidizers to convert CO into CO2.' },
        ],
        suppressionDirective: {
          agent: 'Penetrating Nitrogen Inoculation',
          dwellTime: '90 Seconds Deep Soak',
          efficiencyRating: '93% Core Smolder Arrest',
          cautionNote: 'Do not blast with high airflow fans; air blasts induce explosive transition to open flame.'
        }
      },
      {
        id: 'bit-q3',
        category: 'ELECTRICAL ISOLATION',
        threatLevel: 'HIGH',
        question: 'Avionics nitrogen purge in 0.166g vacuum',
        scientificBreakdown: 'The Moon possesses no atmosphere (hard vacuum of 10^-12 torr). Pressurized avionics equipment racks are engineered with rapid-evacuation blast ports. Opening these vents directly to the lunar surface drops compartment pressure to zero in 1.2 seconds, instantly annihilating any combustion without water or foam residue.',
        boundaryMetrics: [
          { label: 'Vent Evacuation Time', value: '1.2 Seconds', subtext: 'Supersonic acoustic blowdown', gaugePct: 96 },
          { label: 'Residual O2 Molecule Density', value: '0.00 ppm', subtext: 'Complete vacuum starvation', gaugePct: 100 },
          { label: 'Pressure Transducer Delta', value: '70.3 -> 0 kPa', subtext: 'Zero re-ignition potential', gaugePct: 98 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Isolate Avionics Enclosure Bulkhead', directive: 'Confirm hermetic isolation between electronics bay and crew habitat quarters.' },
          { step: '02', action: 'Trigger Explosive Squib Vent Valve', directive: 'Release vacuum dump valve into lunar space environment.' },
          { step: '03', action: 'Post-Vacuum Nitrogen Backfill', directive: 'Once thermal dissipation is complete, slowly re-pressurize with dry nitrogen.' },
        ],
        suppressionDirective: {
          agent: 'Hard Lunar Vacuum Evacuation',
          dwellTime: '10 Seconds Full Void',
          efficiencyRating: '100% Guaranteed Extinction',
          cautionNote: 'Requires reinforced bulkhead to withstand rapid pressure differential without structural fatigue.'
        }
      }
    ],
    matrix: {
      atmosphericComposition: {
        cabinPressureKpa: 70.3,
        oxygenFractionPct: 21.0,
        bufferGas: 'Nitrogen (79.0%)',
        inertRatioPct: 79.0,
        ambientLeakRisk: 'External ambient is 10⁻¹² torr hard vacuum'
      },
      convectionRegime: {
        buoyancyVector: 'Sub-Buoyant 0.166g Sluggish',
        flowVelocityCmS: 4.2,
        flameProfileGeometry: 'Broadened hemispherical flame shell',
        rayleighNumberIndex: 'Ra ~ 2.1 × 10³'
      },
      nasaFlightEvidence: {
        missionCode: 'NASA-SAFFIRE-LUNAR',
        experimentTitle: 'Spacecraft Fire Safety Demonstration',
        flightPlatform: 'Northrop Grumman Cygnus',
        empiricalBreakdown: 'Proved that micro-gravity smolders can persist at oxygen concentrations as low as 8.5% in porous fibrous matrices.',
        psiAccessionId: 'PSI-2025-SAF04'
      },
      agentEfficacy: [
        { name: 'Lunar Regolith Smothering', scorePct: 95, status: 'OPTIMAL', notes: 'Zero logistics cost' },
        { name: 'Hard Vacuum Outflow Vent', scorePct: 100, status: 'OPTIMAL', notes: 'Instant quench in 1.2s' },
        { name: 'Gaseous Nitrogen Purge', scorePct: 94, status: 'OPTIMAL', notes: 'Clean avionics safe' },
        { name: 'Portable CO2 Extinguisher', scorePct: 90, status: 'EFFECTIVE', notes: 'PFE rack standard' },
        { name: 'Water Mist Spray', scorePct: 40, status: 'CAUTION', notes: 'Short circuit risk' }
      ]
    }
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
    ],
    actionQuestionDossiers: [
      {
        id: 'sed-q1',
        category: 'MICROGRAVITY COMBUSTION',
        threatLevel: 'CRITICAL',
        question: 'How to extinguish spherical zero-g cool flames on Sedna?',
        scientificBreakdown: 'In true zero-g (0.000g), flames burn as perfect spherical, blue, soot-free halos. Once the visible flame appears to go out, alkane fuels and polymers enter a bizarre second-stage chemical regime: cool flames burning invisibly between 500 K and 750 K without emitting light, silently converting oxygen into lethal Carbon Monoxide.',
        boundaryMetrics: [
          { label: 'Cool Flame Core Temperature', value: '620 Kelvin', subtext: 'Low-temp invisible combustion', gaugePct: 52 },
          { label: 'Visible Light Output', value: '0.0 Lux', subtext: 'Invisible to human eye', gaugePct: 0 },
          { label: 'CO Toxicity Yield', value: '95% Hazard', subtext: 'Lethal accumulation rating', gaugePct: 95 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Continuous Long-Wave Infrared Radiometry', directive: 'Deploy 360° thermal imaging sensors to detect the 600K thermal emission sphere.' },
          { step: '02', action: 'Immediate Total-Flood CO2 Discharge', directive: 'Flood module to 36% concentration and hold for minimum 180 seconds until temperature < 340 K.' },
          { step: '03', action: 'Halt All Forced Air Circulation', directive: 'Shut down duct fans immediately; fan draft forces oxygen into the spherical reaction boundary.' },
        ],
        suppressionDirective: {
          agent: 'Total-Flood CO2 (High Dwell)',
          dwellTime: '180 Seconds Sustained Dwell',
          efficiencyRating: '97% Extinction Rate',
          cautionNote: 'Do not declare fire extinguished based on visual optics; verify with calibrated IR thermography.'
        }
      },
      {
        id: 'sed-q2',
        category: 'EXTINGUISHER HYDRODYNAMICS',
        threatLevel: 'HIGH',
        question: 'Why water mist fails in microgravity combustion',
        scientificBreakdown: 'On Earth, gravity pulls water droplets through flame plumes onto hot fuel surfaces. In 0g, water mist droplets encounter hot expanding steam that forms a high-pressure repulsive vapor cushion around the flame. The droplets deflect outward, drifting aimlessly into sensitive lab computers and causing massive electrical short circuits.',
        boundaryMetrics: [
          { label: 'Water Mist Penetration Depth', value: '< 3 mm', subtext: 'Repelled by expanding vapor cushion', gaugePct: 12 },
          { label: 'Suspended Droplet Residence', value: 'Permanent', subtext: 'Drifts indefinitely through cabin', gaugePct: 98 },
          { label: 'Secondary Short Circuit Risk', value: 'Critical', subtext: 'Avionics water damage', gaugePct: 92 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Strict Prohibition on Liquid Sprays', directive: 'Lock out aqueous extinguishers on zero-g microgravity research decks.' },
          { step: '02', action: 'Employ Dry Inert Gaseous Suppressants', directive: 'Use non-condensing gas agents like dry carbon dioxide or argon.' },
          { step: '03', action: 'Activate High-Efficiency Demisters', directive: 'If liquid droplets are released, run cyclonic moisture separators before powering back avionics.' },
        ],
        suppressionDirective: {
          agent: 'Non-Conductive Dry Inert Gas (CO2 / Ar)',
          dwellTime: '45 Seconds Rapid Discharge',
          efficiencyRating: '96% Electronics Safe',
          cautionNote: 'Water mist in microgravity causes massive secondary electrical failures without cooling the fuel bed.'
        }
      },
      {
        id: 'sed-q3',
        category: 'EXTREME PROTOCOLS',
        threatLevel: 'EXTREME',
        question: 'Autonomous cabin depressurization to space vacuum',
        scientificBreakdown: 'When deep-space fires involve high-energy polymer fuels (PEEK, PMMA) that resist gaseous flooding, the station autonomous fail-safe triggers cabin venting into deep space. Dropping internal pressure from 101.3 kPa to 0.1 kPa in under 16 seconds starves all chemical oxidation instantly.',
        boundaryMetrics: [
          { label: 'Cabin Depressurization Speed', value: '16.4 Seconds', subtext: 'Rapid vacuum evacuation', gaugePct: 95 },
          { label: 'Residual O2 Flammability Index', value: '0.00% LOC', subtext: 'Complete flame death', gaugePct: 100 },
          { label: 'Cryo-Oxygen Re-inflation Reserve', value: '12 Minutes', subtext: 'Emergency restoration cycle', gaugePct: 65 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Crew Evacuate to Storm Shelter', directive: 'Crew locks hermetic hatches inside the radiation-shielded return module.' },
          { step: '02', action: 'Command Deep-Space Vacuum Outflow Valves', directive: 'Autonomous fire system blows dual 300 mm titanium butterfly valves.' },
          { step: '03', action: 'Vacuum Bake-Out & Re-pressurization', directive: 'Hold at 0.05 kPa for 3 minutes to desiccate embers, then backfill with fresh N2/O2.' },
        ],
        suppressionDirective: {
          agent: 'Deep-Space Vacuum Scram',
          dwellTime: '180 Seconds Full Vacuum Hold',
          efficiencyRating: '100% Absolute Extinction',
          cautionNote: 'Irreversible loss of cabin breathing gas; requires full module re-pressurization from cryo-tanks.'
        }
      }
    ],
    matrix: {
      atmosphericComposition: {
        cabinPressureKpa: 101.3,
        oxygenFractionPct: 21.0,
        bufferGas: 'Nitrogen (79.0%)',
        inertRatioPct: 79.0,
        ambientLeakRisk: 'Deep space 85 AU vacuum exterior'
      },
      convectionRegime: {
        buoyancyVector: 'Zero Buoyancy 0.000g',
        flowVelocityCmS: 0.0,
        flameProfileGeometry: 'Perfect spherical blue diffusion envelope',
        rayleighNumberIndex: 'Ra = 0.00 (Pure Diffusion)'
      },
      nasaFlightEvidence: {
        missionCode: 'NASA-FLEX-SEDNA',
        experimentTitle: 'Flame Extinguishment Experiment (FLEX)',
        flightPlatform: 'Combustion Integrated Rack (CIR)',
        empiricalBreakdown: 'Discovered steady low-temperature cool flame burning regime for large n-alkane droplets without visible emissions.',
        psiAccessionId: 'PSI-2022-FLEX01'
      },
      agentEfficacy: [
        { name: 'Total-Flood CO2 (High Dwell)', scorePct: 97, status: 'OPTIMAL', notes: 'Quenches cool flame' },
        { name: 'Cabin Vacuum Dump', scorePct: 100, status: 'OPTIMAL', notes: 'Complete starvation' },
        { name: 'Nitrogen Inerting Purge', scorePct: 90, status: 'EFFECTIVE', notes: 'Safe for computers' },
        { name: 'Solid Chemical Powder', scorePct: 35, status: 'CAUTION', notes: 'Clogs air scrubbers' },
        { name: 'Water Mist Droplet Spray', scorePct: 10, status: 'PROHIBITED', notes: 'Steam repels droplets' }
      ]
    }
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
    ],
    actionQuestionDossiers: [
      {
        id: 'cet-q1',
        category: 'CONVECTION SHUTDOWN',
        threatLevel: 'CRITICAL',
        question: 'How does microgravity extinguish without ventilation on ISS?',
        scientificBreakdown: 'Without gravity, buoyancy is zero: hot carbon dioxide and combustion steam cannot rise. Instead, combustion products accumulate in a dense spherical blanket around the flame. If cabin ventilation fans are immediately shut down, this expanding shell of combustion exhaust chokes off incoming oxygen, causing the flame to self-extinguish within 15-25 seconds.',
        boundaryMetrics: [
          { label: 'Natural Convection Speed', value: '0.00 cm/s', subtext: 'Buoyancy is completely absent', gaugePct: 0 },
          { label: 'Self-Extinction Dwell Time', value: '18.5 Seconds', subtext: 'In stagnant cabin air', gaugePct: 35 },
          { label: 'Forced Draft Threshold', value: '< 5.0 cm/s', subtext: 'Ventilation limit to avoid feeding flame', gaugePct: 20 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Immediate Autonomous HVAC Lockdown', directive: 'Emergency fire sensor triggers total shutdown of all inter-module ventilation fans (< 5s).' },
          { step: '02', action: 'Close Inter-Module Fire Isolation Dampers', directive: 'Motorized butterfly valves seal Columbus, Destiny, and Kibo to prevent smoke migration.' },
          { step: '03', action: 'Crew Don Emergency Breathing Hoods (EBH)', directive: 'All astronauts don individual oxygen hoods within 60 seconds of caution klaxon.' },
        ],
        suppressionDirective: {
          agent: 'Stagnant Air Starvation (HVAC Scram)',
          dwellTime: 'Immediate & Sustained',
          efficiencyRating: '92% Self-Extinguishing',
          cautionNote: 'Crew must avoid rapid physical movements that could stir up artificial convection currents.'
        }
      },
      {
        id: 'cet-q2',
        category: 'NASA FLIGHT DISCOVERY',
        threatLevel: 'ELEVATED',
        question: 'NASA FLEX discovery: The invisible cool flame danger',
        scientificBreakdown: 'NASA historic Flame Extinguishment Experiment (FLEX) aboard the ISS discovered that hydrocarbon fuels continue burning at 600-750 K long after their bright yellow and blue flames disappear. These cool flames generate massive quantities of lethal Carbon Monoxide without visible soot, deceiving astronauts into believing the fire is out.',
        boundaryMetrics: [
          { label: 'Cool Flame Core Temp', value: '650 Kelvin', subtext: 'Low-temperature kinetic regime', gaugePct: 55 },
          { label: 'Carbon Monoxide Spike', value: '92% Hazard', subtext: 'Rapid cabin air poisoning index', gaugePct: 92 },
          { label: 'Detection Spectral Band', value: '7-14 µm IR', subtext: 'Requires IR spectral sensors', gaugePct: 85 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Deploy Handheld Thermal Imaging Cameras (TIC)', directive: 'Scan equipment racks across the 7-14 µm infrared band for lingering hot spots.' },
          { step: '02', action: 'Maintain PFE Extinguisher Discharge', directive: 'Continue gaseous suppression discharge for 45 seconds beyond visible flame extinction.' },
          { step: '03', action: 'Engage Trace Contaminant Control System (TCCS)', directive: 'Run high-capacity catalytic oxidizers to eliminate toxic CO and formaldehyde.' },
        ],
        suppressionDirective: {
          agent: 'Sustained Portable CO2 Extinguisher',
          dwellTime: '45 Seconds Post-Visible Extinction',
          efficiencyRating: '95% Thermal Arrest',
          cautionNote: 'Never rely on the naked eye or optical smoke detectors to confirm zero-g fire extinction.'
        }
      },
      {
        id: 'cet-q3',
        category: 'CREW FLIGHT DIRECTIVE',
        threatLevel: 'HIGH',
        question: 'Standard ISS fire emergency protocol (CO2 flood)',
        scientificBreakdown: 'The ISS fire response protocol is rigorously practiced: Crew immediately identifies the affected module using the caution and warning panel. A designated astronaut inserts the nozzle of a Portable Fire Extinguisher (PFE) directly into the rack dedicated fire port, discharging 2.5 kg of liquid carbon dioxide directly into the sealed avionics rack.',
        boundaryMetrics: [
          { label: 'PFE CO2 Discharge Mass', value: '2.5 kg', subtext: 'Targeted rack inundation', gaugePct: 62 },
          { label: 'Enclosure Oxygen Drop', value: '< 10.5% LOC', subtext: 'Rapid suppression concentration', gaugePct: 90 },
          { label: 'Cabin Scrubbing Time', value: '4 to 6 Hours', subtext: 'Full ECLSS air revitalization cycle', gaugePct: 45 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Locate Rack Fire Injection Port', directive: 'Align PFE wand with circular silicone diaphragm port on the front of the avionics rack.' },
          { step: '02', action: 'Discharge Full CO2 Cylinder', directive: 'Depress trigger fully, discharging gaseous CO2 without opening the rack front door.' },
          { step: '03', action: 'Verify Soyuz / Crew Dragon Escape Readiness', directive: 'Designated commander verifies hatch seals to escape spacecraft in case of breach.' },
        ],
        suppressionDirective: {
          agent: 'NASA-Standard Portable PFE CO2 Extinguisher',
          dwellTime: '60 Seconds In-Rack Dwell',
          efficiencyRating: '98% Rack Enclosure Suppression',
          cautionNote: 'Avoid discharging CO2 into open cabin without breathing masks; high CO2 causes crew asphyxiation.'
        }
      }
    ],
    matrix: {
      atmosphericComposition: {
        cabinPressureKpa: 101.3,
        oxygenFractionPct: 21.0,
        bufferGas: 'Nitrogen (78.0%) / Argon (1.0%)',
        inertRatioPct: 79.0,
        ambientLeakRisk: 'LEO 408 km high vacuum'
      },
      convectionRegime: {
        buoyancyVector: 'Zero Buoyancy 0.000g',
        flowVelocityCmS: 0.0,
        flameProfileGeometry: 'Spherical quiescent blue diffusion envelope',
        rayleighNumberIndex: 'Ra = 0.00 (Pure Diffusion)'
      },
      nasaFlightEvidence: {
        missionCode: 'NASA-ACME-CFI',
        experimentTitle: 'Advanced Combustion via Microgravity Experiments',
        flightPlatform: 'ISS Destiny Laboratory (CIR)',
        empiricalBreakdown: 'Quantified limiting oxygen concentrations and radiation-driven cool flame oscillations in zero gravity.',
        psiAccessionId: 'PSI-2023-ACME07'
      },
      agentEfficacy: [
        { name: 'NASA PFE CO2 Extinguisher', scorePct: 95, status: 'OPTIMAL', notes: 'ISS flight-proven' },
        { name: 'HVAC Stagnant Starvation', scorePct: 92, status: 'OPTIMAL', notes: 'Zero logistics cost' },
        { name: 'Russian PFE Fine Water Mist', scorePct: 70, status: 'EFFECTIVE', notes: 'Uses nitrogen propellant' },
        { name: 'Deep Space Module Venting', scorePct: 98, status: 'OPTIMAL', notes: 'Last resort protocol' },
        { name: 'Chemical Dry Powder', scorePct: 15, status: 'PROHIBITED', notes: 'Permanent ECLSS filter damage' }
      ]
    }
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
    ],
    actionQuestionDossiers: [
      {
        id: 'tit-q1',
        category: 'DUAL-ATMOSPHERE DANGER',
        threatLevel: 'CRITICAL',
        question: 'How to prevent explosive oxygen-methane flare on Titan?',
        scientificBreakdown: 'Titan presents the solar system ultimate inverted fire danger: On Earth, oxygen is outside and fuel is inside. On Titan, the habitat contains pressurized oxygen while the external world is a 1.5 bar ocean of cryogenic methane and nitrogen! Any puncture of the habitat hull causes oxygen to leak outward into an infinite sea of flammable gas, turning the puncture into an explosive jet burner.',
        boundaryMetrics: [
          { label: 'External Methane Atmosphere', value: '147.0 kPa', subtext: '95% N2 / 5% CH4 ambient', gaugePct: 95 },
          { label: 'Cabin Oxygen Partial Pressure', value: '21.3 kPa', subtext: 'Internal oxidizer payload', gaugePct: 70 },
          { label: 'Deflagration Wave Velocity', value: '380 m/s', subtext: 'Hull breach detonation risk', gaugePct: 90 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Never Vent Cabin Atmosphere Outward', directive: 'Exterior venting creates an instantaneous external diffusion torch at the exhaust nozzle.' },
          { step: '02', action: 'Isolate Damaged Compartment with Guillotine Gates', directive: 'Drop explosive guillotine shear-doors to isolate punctured modules in < 200 ms.' },
          { step: '03', action: 'Charge Inter-Wall Annulus with High-Pressure Nitrogen', directive: 'Pressurize double-hull buffer to 160 kPa to force inert gas both inward and outward.' },
        ],
        suppressionDirective: {
          agent: 'Dynamic Double-Hull Nitrogen Barrier',
          dwellTime: 'Permanent Active Overpressure',
          efficiencyRating: '99% Deflagration Prevention',
          cautionNote: 'Hull breaches on Titan must be sealed from inside immediately using fast-curing cryo-epoxy.'
        }
      },
      {
        id: 'tit-q2',
        category: 'PRESSURE EQUILIBRIUM',
        threatLevel: 'ELEVATED',
        question: 'Positive nitrogen overpressure barrier dynamics',
        scientificBreakdown: 'By maintaining a dedicated buffer space between the habitat inner pressurized living hull and outer cryogenic shell charged with pure nitrogen at 155 kPa (exceeding Titan 147 kPa external pressure and 101 kPa internal pressure), any hull breach leaks only harmless inert nitrogen gas, preventing oxygen and methane from ever mixing.',
        boundaryMetrics: [
          { label: 'Annulus Buffer Overpressure', value: '155.0 kPa', subtext: '+8 kPa over Titan atmosphere', gaugePct: 82 },
          { label: 'Nitrogen Reserve Capacity', value: '12,000 L', subtext: 'Sub-surface cryo-storage reserve', gaugePct: 88 },
          { label: 'Leak Equilibrium Time', value: '3.2 Seconds', subtext: 'Rapid outward barrier purge', gaugePct: 30 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Monitor Differential Pressure Transducers', directive: 'Dual redundant sensors watch the ΔP between the living module, buffer, and exterior.' },
          { step: '02', action: 'Engage Cryo-Nitrogen Vaporizers', directive: 'Automatically boil liquid nitrogen reserves into high-pressure gas on pressure drop.' },
          { step: '03', action: 'Lock Habitation Pressure Equalization Valves', directive: 'Prevent back-siphoning of external methane vapor into crew breathing loops.' },
        ],
        suppressionDirective: {
          agent: 'Inert Nitrogen Overpressure Buffer',
          dwellTime: 'Continuous Pneumatic Shield',
          efficiencyRating: '98% Barrier Efficacy',
          cautionNote: 'Maintain buffer gas temperature above -40°C to prevent seal embrittlement.'
        }
      },
      {
        id: 'tit-q3',
        category: 'MATERIAL CRYOGENICS',
        threatLevel: 'HIGH',
        question: 'Cryogenic seal integrity under rapid temperature swings',
        scientificBreakdown: 'Titan habitat outer gaskets must endure cryogenic temperatures of -179°C (94 K). If an internal fire breaks out, the interior side of the hull flange rapidly escalates to +500°C. This staggering 680°C thermal gradient across a 25 cm titanium bulkhead induces severe thermal expansion stresses that can shatter standard elastomeric seals.',
        boundaryMetrics: [
          { label: 'Thermal Gradient Across Flange', value: '679 K Delta', subtext: 'Extreme thermal shock across hull', gaugePct: 94 },
          { label: 'Gasket Warping Displacement', value: '2.4 mm', subtext: 'Seal failure threshold limit', gaugePct: 65 },
          { label: 'Active Cryo-Shunt Heat Flux', value: '8.4 kW/m²', subtext: 'Cooling loop heat absorption', gaugePct: 76 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Activate Flange Cryo-Heat Pipes', directive: 'Circulate liquid methane coolant through bulkhead jackets to absorb excess thermal flux.' },
          { step: '02', action: 'Engage Spring-Energized Metal C-Rings', directive: 'Mechanical spring cores maintain compression even if polymer coatings char.' },
          { step: '03', action: 'Command Fire Compartment Isolation', directive: 'Isolate electrical buses and starve internal flames before flange reaches 300°C.' },
        ],
        suppressionDirective: {
          agent: 'Flange Cryo-Jacket Heat Shunt',
          dwellTime: 'Active Throughout Fire Event',
          efficiencyRating: '94% Flange Integrity Survival',
          cautionNote: 'Do not douse hot titanium flanges with liquid nitrogen directly; rapid quenching induces brittle fractures.'
        }
      }
    ],
    matrix: {
      atmosphericComposition: {
        cabinPressureKpa: 101.3,
        oxygenFractionPct: 21.0,
        bufferGas: 'Nitrogen (79.0%)',
        inertRatioPct: 79.0,
        ambientLeakRisk: 'EXTREME: 147 kPa external methane/nitrogen atmosphere'
      },
      convectionRegime: {
        buoyancyVector: 'Sluggish 0.140g Cryo-Drift',
        flowVelocityCmS: 3.1,
        flameProfileGeometry: 'Broadened cool halo with potential counterflow flare',
        rayleighNumberIndex: 'Ra ~ 1.8 × 10³'
      },
      nasaFlightEvidence: {
        missionCode: 'NASA-CASSINI-PSI',
        experimentTitle: 'Cryogenic Hydrocarbon Combustion Limits',
        flightPlatform: 'NASA Cassini Huygens & PSI Test Cell',
        empiricalBreakdown: 'Quantified diffusion flame extinction limits of oxygen jets leaking into sub-zero dense methane mixtures.',
        psiAccessionId: 'PSI-2024-TIT02'
      },
      agentEfficacy: [
        { name: 'Nitrogen Overpressure Annulus', scorePct: 98, status: 'OPTIMAL', notes: 'Blocks methane counterflow' },
        { name: 'Total-Flood CO2 (Interior)', scorePct: 89, status: 'EFFECTIVE', notes: 'Quenches interior racks' },
        { name: 'Solid In-Situ Powder', scorePct: 65, status: 'CAUTION', notes: 'Requires dry storage' },
        { name: 'Exterior Vacuum Venting', scorePct: 0, status: 'PROHIBITED', notes: 'Pulls external methane into cabin!' },
        { name: 'Water Mist Droplet Spray', scorePct: 0, status: 'PROHIBITED', notes: 'Explosive freeze-expansion' }
      ]
    }
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
    ],
    actionQuestionDossiers: [
      {
        id: 'jup-q1',
        category: 'HYPER-CONVECTION',
        threatLevel: 'CRITICAL',
        question: 'How hyper-gravity (2.5g) accelerates fire convection plumes',
        scientificBreakdown: 'At 2.528 times Earth gravity, buoyant upward forces are tremendously amplified. Hot combustion gases accelerate upward at over 2.8 m/s, creating a ferocious chimney updraft that pulls fresh cabin oxygen into the base of the fire. Flame spread velocity increases by 350% compared to terrestrial rates, creating turbulent, blowtorch-like flames.',
        boundaryMetrics: [
          { label: 'Buoyant Plume Velocity', value: '2.85 m/s', subtext: '3.5x faster than 1g Earth', gaugePct: 95 },
          { label: 'Flame Spread Velocity', value: '1.40 mm/s', subtext: 'Hyper-accelerated front', gaugePct: 90 },
          { label: 'Turbulent Reynolds Number', value: 'Re = 4,800', subtext: 'Turbulent combustion regime', gaugePct: 82 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Deploy Ceiling Flame Deflectors', directive: 'Drop ceramic blast baffles to prevent the vertical blowtorch from cutting through ceiling wiring.' },
          { step: '02', action: 'Immediate High-Density Argon Flood', directive: 'Discharge heavy Argon gas (heavier than air) from ceiling nozzles to crush the rising plume.' },
          { step: '03', action: 'Isolate Vertical Cable Chases', directive: 'Seal vertical utility raceways to stop chimney-effect fire propagation across multi-deck levels.' },
        ],
        suppressionDirective: {
          agent: 'High-Pressure Heavy Argon Gas Blanket',
          dwellTime: '30 Seconds Intensive Pulse',
          efficiencyRating: '96% Convective Flame Quench',
          cautionNote: 'Nitrogen gas is ineffective in 2.5g; buoyant drafts sweep light gases away from the fuel surface.'
        }
      },
      {
        id: 'jup-q2',
        category: 'HEAVY GAS DYNAMICS',
        threatLevel: 'ELEVATED',
        question: 'Argon gas displacement under turbulent buoyant updraft',
        scientificBreakdown: 'In a 2.5g environment, light suppressants like nitrogen are violently swept upward by the intense thermal draft before reaching the base of the flame. Dense Argon gas (molecular weight 39.95 g/mol, significantly heavier than oxygen 32 and nitrogen 28) generates massive settling force, slicing down through the rising convection plume and coating the fuel.',
        boundaryMetrics: [
          { label: 'Argon Molecular Weight', value: '39.95 g/mol', subtext: 'Substantially heavier than air (28.97)', gaugePct: 75 },
          { label: 'Downward Settling Gravity Force', value: '2.5x Earth', subtext: 'Crushes rising convective updraft', gaugePct: 92 },
          { label: 'Extinction Oxygen Starvation', value: '< 9.5% LOC', subtext: 'Complete radical quenching', gaugePct: 88 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Trigger Ceiling Argon Dispersion Manifolds', directive: 'Release 120 bar pressurized argon directly above the thermal plume.' },
          { step: '02', action: 'Scram Floor Air Intakes', directive: 'Prevent the settled argon layer from being recirculated by underfloor ventilation fans.' },
          { step: '03', action: 'Monitor Acoustic Shock Sensors', directive: 'Verify flame acoustic roar diminishes as argon displaces the turbulent reaction zone.' },
        ],
        suppressionDirective: {
          agent: 'Ceiling-Discharged Argon (Ar)',
          dwellTime: '40 Seconds Continuous Blanket',
          efficiencyRating: '97% Plume Displacement',
          cautionNote: 'High argon concentration causes rapid crew hypoxia; personnel must wear SCBA masks.'
        }
      },
      {
        id: 'jup-q3',
        category: 'RADIATION RISKS',
        threatLevel: 'HIGH',
        question: 'Radiation-induced dielectric breakdown & electrical ignition',
        scientificBreakdown: 'Jupiter magnetic field creates the most ferocious radiation belts in the solar system. Relativistic electrons penetrate spacecraft hulls and deposit high-voltage charges inside plastic wire insulation. Once internal electric fields exceed 20 kV/mm, dielectric breakdown occurs, generating high-energy electrical arcs that ignite polymer cables.',
        boundaryMetrics: [
          { label: 'Incident Jovian Radiation Dose', value: '45 rad/hour', subtext: 'Severe ionizing environment', gaugePct: 88 },
          { label: 'Dielectric Electrostatic Charge', value: '> 22 kV', subtext: 'Arc flash breakdown threshold', gaugePct: 90 },
          { label: 'Arc Discharge Energy', value: '45 Joules', subtext: 'Instant polymer ignition energy', gaugePct: 78 },
        ],
        tacticalProtocols: [
          { step: '01', action: 'Grounded Carbon-Nanotube Shield Drain', directive: 'Continuously bleed electrostatic charges from cable harnesses into spacecraft hull ground.' },
          { step: '02', action: 'Deploy Solid-State Fast Arc Cutoffs', directive: 'Optical photodiode sensors detect arc flash in < 1 ms and cut circuit breaker current.' },
          { step: '03', action: 'Inert Cable Trays with Fluoroketone Gas', directive: 'Maintain an inert dielectric gas atmosphere inside enclosed high-voltage wire trunks.' },
        ],
        suppressionDirective: {
          agent: 'Inert Dielectric Gas Purge (FK-5-1-12)',
          dwellTime: 'Permanent Cable Trunk Inerting',
          efficiencyRating: '99% Arc Suppression',
          cautionNote: 'Radiation degrades polymer insulation over time; scheduled replacement of wiring is mandatory.'
        }
      }
    ],
    matrix: {
      atmosphericComposition: {
        cabinPressureKpa: 120.0,
        oxygenFractionPct: 21.0,
        bufferGas: 'Nitrogen / Argon (79.0%)',
        inertRatioPct: 79.0,
        ambientLeakRisk: 'Radiation-hardened high-strength hull'
      },
      convectionRegime: {
        buoyancyVector: 'Violent 2.528g Updraft',
        flowVelocityCmS: 285.0,
        flameProfileGeometry: 'Narrow, elongated turbulent blowtorch plume',
        rayleighNumberIndex: 'Ra ~ 8.9 × 10⁵ (Highly Turbulent)'
      },
      nasaFlightEvidence: {
        missionCode: 'NASA-CENTRIFUGE-HYPER-G',
        experimentTitle: 'High-G Combustion Acceleration Study',
        flightPlatform: 'NASA Large Centrifuge Facility',
        empiricalBreakdown: 'Demonstrated that flame spread speed scales with g^0.45 under strong buoyant convection regimes.',
        psiAccessionId: 'PSI-2023-JUP06'
      },
      agentEfficacy: [
        { name: 'Dense Ceiling-Fed Argon Gas', scorePct: 97, status: 'OPTIMAL', notes: 'Crushes 2.5g updraft' },
        { name: 'Cabin Depressurization Vent', scorePct: 92, status: 'OPTIMAL', notes: 'Cuts oxygen in seconds' },
        { name: 'High-Pressure CO2 Blast', scorePct: 72, status: 'CAUTION', notes: 'Partially swept by updraft' },
        { name: 'Gaseous Nitrogen Purge', scorePct: 58, status: 'CAUTION', notes: 'Too light; swept upward' },
        { name: 'Fine Water Mist Droplets', scorePct: 20, status: 'PROHIBITED', notes: 'Ineffective against torch flame' }
      ]
    }
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
  const activeDossier = currentPlanet.actionQuestionDossiers[activeQuestionIndex] || currentPlanet.actionQuestionDossiers[0];

  // Safe navigation with animation trigger
  const changePlanet = (newIndex: number) => {
    if (newIndex === selectedIndex) return;
    setIsTransitioning(true);
    setSelectedIndex(newIndex);
    setActiveQuestionIndex(0); // Reset question to first
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

  // Launch simulator with pre-configured celestial parameters
  const launchSimulatorWithPlanet = () => {
    sessionStorage.setItem('selected_simulator_planet', currentPlanet.id);
    onOpenSimulator();
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
      {/* 2. MAIN HUD SECTION: GLOBE + TELEMETRY + CONTINUATION DOSSIER       */}
      {/* =================================================================== */}
      <div className="relative border border-white/10 bg-black/40 backdrop-blur-md p-6 sm:p-10 max-w-7xl mx-auto shadow-2xl space-y-12">
        {/* Subtle top background blur gradient */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[300px] blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
          style={{ backgroundColor: currentPlanet.themeColor }}
        />

        {/* 3-Column Top HUD Layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]">
          {/* =============================================================== */}
          {/* LEFT COLUMN: Planetary Fire Telemetry & Compartment Monitoring */}
          {/* =============================================================== */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h2 className="font-sans text-xl sm:text-2xl font-normal tracking-wide text-white uppercase text-shadow-dark">
                PLANETARY FIRE
                <br />
                TELEMETRY
              </h2>
              <p className="font-mono text-[11px] text-zinc-400 mt-2 font-light leading-relaxed text-shadow-dark">
                Critical habitat compartments & fire sensor monitoring
              </p>
            </div>

            {/* Compartment Monitoring Checklist */}
            <div className="space-y-2 font-mono text-xs">
              {currentPlanet.compartments.map((comp) => (
                <div
                  key={comp.id}
                  className={`flex items-center gap-3 transition-colors ${
                    comp.active
                      ? 'text-white font-medium'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <span className="text-[10px] text-zinc-400">{comp.id}</span>
                  <span className="text-shadow-dark">{comp.name}</span>
                  {comp.active && (
                    <span
                      className="w-1.5 h-1.5 rounded-full ml-auto animate-pulse"
                      style={{ backgroundColor: currentPlanet.themeColor }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Gravity Acceleration Readout */}
            <div className="pt-4 border-t border-white/10">
              <div
                className="font-sans text-3xl font-light tracking-tight transition-colors duration-500 text-shadow-dark"
                style={{ color: currentPlanet.themeColor }}
              >
                {currentPlanet.gravityG.toFixed(3)}g
              </div>
              <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5">
                GRAVITY ACCELERATION REGIME
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* MIDDLE COLUMN: Ultra-Clean 3D Globe with Clean Atmosphere Glow   */}
          {/* =============================================================== */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[420px] sm:min-h-[460px]">
            {/* Smooth Planet Outer Glow */}
            <div
              className="absolute inset-0 rounded-full blur-[70px] pointer-events-none transition-all duration-700"
              style={{
                background: `radial-gradient(circle at center, ${currentPlanet.themeGlow} 0%, rgba(0,0,0,0) 72%)`,
                transform: 'scale(0.85)',
                opacity: 0.85
              }}
            />

            {/* Mathematical Circular Orbit Ring (clean, no box clipping) */}
            <div
              className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] rounded-full border border-dashed border-white/20 pointer-events-none animate-[spin_60s_linear_infinite]"
              style={{ opacity: 0.6 }}
            />

            {/* Interactive Reticle Target Line Pointer */}
            <div
              className={`absolute top-12 right-6 z-20 transition-all duration-300 pointer-events-auto cursor-pointer ${
                isBadgeHovered ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setIsBadgeHovered(true)}
              onMouseLeave={() => setIsBadgeHovered(false)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-[1px] transition-colors"
                  style={{ backgroundColor: currentPlanet.themeColor }}
                />
                <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-wider bg-black/70 px-2 py-0.5 border border-white/10 text-shadow-dark">
                  {currentPlanet.targetCoords}
                </span>
              </div>
            </div>

            {/* The Globe Graphic */}
            <div
              className={`relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] rounded-full flex items-center justify-center transition-all duration-700 cursor-pointer ${
                isTransitioning ? 'scale-95 opacity-50 blur-sm' : 'scale-100 opacity-100 blur-0'
              }`}
              onClick={() => openDossier(currentPlanet)}
              title="Click to view full scientific NASA dossier"
            >
              <img
                src={currentPlanet.imageSrc}
                alt={currentPlanet.name}
                decoding="async"
                className="w-full h-full object-cover rounded-full shadow-[0_0_60px_rgba(0,0,0,0.95)]"
                style={{
                  boxShadow: `0 0 50px -10px ${currentPlanet.themeGlow}`,
                }}
              />

              {/* Day / Night Atmospheric Shadow terminator */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 85%)',
                }}
              />

              {/* Subtle outer atmospheric rim shine */}
              <div
                className="absolute -inset-[3px] rounded-full pointer-events-none transition-all duration-700"
                style={{
                  boxShadow: `inset 0 0 15px ${currentPlanet.themeColor}, 0 0 25px ${currentPlanet.themeGlow}`,
                  opacity: 0.5,
                }}
              />
            </div>
          </div>

          {/* =============================================================== */}
          {/* RIGHT COLUMN: Active Target & 4 Quantitative Hazard Gauges      */}
          {/* =============================================================== */}
          <div className="lg:col-span-3 space-y-4">
            {/* Header: Active Target & Dossier Link */}
            <div className="border-b border-white/10 pb-3">
              <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <Target className="w-3 h-3" style={{ color: currentPlanet.themeColor }} />
                  <span className="uppercase tracking-widest text-shadow-dark">ACTIVE TARGET</span>
                </div>
                <button
                  onClick={() => openDossier(currentPlanet)}
                  className="text-zinc-400 hover:text-white transition-colors flex items-center gap-0.5 tracking-wider uppercase cursor-pointer"
                >
                  <span>DOSSIER</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              <div className="font-sans text-xl font-normal tracking-wide text-white uppercase text-shadow-dark">
                {currentPlanet.name}
              </div>
              <div className="font-mono text-[10px] text-zinc-400 mt-0.5">
                {currentPlanet.subTitle} · {currentPlanet.gravityG}g
              </div>
              <div className="font-mono text-[9px] text-zinc-500 mt-0.5">
                {currentPlanet.targetCoords}
              </div>
            </div>

            {/* Card 1: LOC Quench Limit */}
            <div className="pb-1 border-b border-white/5 flex items-center justify-between">
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
              <div className="w-16 h-6">
                <svg className="w-full h-full" viewBox="0 0 64 24">
                  <path
                    d="M 2 20 Q 24 18 42 8 T 62 4"
                    fill="none"
                    stroke={currentPlanet.themeColor}
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 2 20 Q 24 18 42 8 T 62 4 L 62 24 L 2 24 Z"
                    fill={currentPlanet.themeColor}
                    fillOpacity="0.12"
                  />
                </svg>
              </div>
            </div>

            {/* Card 2: Cabin Oxygen Fraction */}
            <div className="pb-1 border-b border-white/5 flex items-center justify-between">
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
              <div className="w-12 h-6 grid grid-cols-4 gap-1 items-center">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor: i < 7 ? currentPlanet.themeColor : '#27272a',
                      opacity: i < 7 ? 0.9 : 0.3,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Card 3: Flame Spread Velocity */}
            <div className="pb-1 border-b border-white/5 flex items-center justify-between">
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
              <div className="w-16 h-6">
                <svg className="w-full h-full" viewBox="0 0 64 24">
                  <path
                    d="M 2 12 C 16 4, 30 20, 44 12 C 52 8, 58 14, 62 12"
                    fill="none"
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
        {/* 3. CONTINUATION: SCIENTIFIC INVESTIGATION & HABITAT COMBUSTION DOSSIER */}
        {/* =================================================================== */}
        <div className="relative pt-10 border-t border-white/10 space-y-8">
          {/* Section Sub-Header */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.04] border border-white/15 font-mono text-[10px] tracking-widest text-zinc-200">
                <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentPlanet.themeColor }} />
                <span>SECTION 02.2 // SCIENTIFIC INVESTIGATION & HABITAT FLIGHT DOSSIER</span>
              </div>
              <span className="font-mono text-[11px] text-zinc-400 uppercase hidden md:inline">
                SECTOR: {currentPlanet.name} · {currentPlanet.gravityG}G GRAVITY REGIME
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400">
              <span className="text-zinc-500">DATABASE:</span>
              <span className="text-white">NASA PHYSICAL SCIENCES INFORMATICS (PSI)</span>
            </div>
          </div>

          {/* 3 Interactive Question Selector Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentPlanet.actionQuestionDossiers.map((qDossier, idx) => {
              const isActive = activeQuestionIndex === idx;
              return (
                <button
                  key={qDossier.id}
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`text-left p-4 border transition-all duration-300 relative group cursor-pointer ${
                    isActive
                      ? 'bg-white/[0.08] shadow-lg'
                      : 'bg-black/40 hover:bg-white/[0.04] border-white/10'
                  }`}
                  style={{
                    borderColor: isActive ? currentPlanet.themeColor : 'rgba(255,255,255,0.1)',
                    boxShadow: isActive ? `0 0 25px -8px ${currentPlanet.themeGlow}` : 'none'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-zinc-400">
                        [Q-0{idx + 1}]
                      </span>
                      <span
                        className="font-mono text-[9px] uppercase px-1.5 py-0.5 tracking-wider font-semibold"
                        style={{
                          backgroundColor: isActive ? `${currentPlanet.themeColor}25` : 'rgba(255,255,255,0.05)',
                          color: isActive ? currentPlanet.themeColor : '#a1a1aa'
                        }}
                      >
                        {qDossier.category}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 text-zinc-300 bg-white/5 border border-white/10">
                      {qDossier.threatLevel}
                    </span>
                  </div>
                  <div className="font-sans text-xs sm:text-sm font-medium text-white line-clamp-2 group-hover:text-zinc-200 transition-colors">
                    {qDossier.question}
                  </div>
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ backgroundColor: currentPlanet.themeColor }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Question Deep-Dive Scientific Dossier Card */}
          <div
            className="border border-white/15 bg-black/60 backdrop-blur-xl p-6 sm:p-8 relative overflow-hidden transition-all duration-500"
            style={{
              boxShadow: `inset 0 0 40px -15px ${currentPlanet.themeGlow}`
            }}
          >
            {/* Corner Crosshairs */}
            <div className="absolute top-2.5 left-3 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
              + [EXTRATERRESTRIAL SAFETY DIRECTIVE]
            </div>
            <div className="absolute top-2.5 right-3 font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
              NASA PSI // CERTIFIED PROTOCOL +
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
              {/* Left Sub-Column (7 cols): Scientific Mechanism & Physical Metrics */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 uppercase tracking-widest">
                  <Atom className="w-4 h-4" style={{ color: currentPlanet.themeColor }} />
                  <span>SCIENTIFIC COMBUSTION MECHANISM & NASA TELEMETRY</span>
                </div>

                <div>
                  <h3 className="font-sans text-xl sm:text-2xl font-light text-white tracking-wide mb-3">
                    {activeDossier.question}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                    {activeDossier.scientificBreakdown}
                  </p>
                </div>

                {/* 3 Boundary Metric Gauges */}
                <div className="pt-3 border-t border-white/10">
                  <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-3">
                    QUANTITATIVE FLUID & THERMAL BOUNDARIES:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeDossier.boundaryMetrics.map((metric, mIdx) => (
                      <div key={mIdx} className="bg-white/[0.03] border border-white/10 p-3">
                        <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider mb-1">
                          {metric.label}
                        </div>
                        <div
                          className="font-mono text-base font-semibold mb-1"
                          style={{ color: currentPlanet.themeColor }}
                        >
                          {metric.value}
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                          <div
                            className="h-full transition-all duration-700"
                            style={{
                              width: `${metric.gaugePct}%`,
                              backgroundColor: currentPlanet.themeColor
                            }}
                          />
                        </div>
                        <div className="font-mono text-[9px] text-zinc-400 leading-tight">
                          {metric.subtext}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Sub-Column (5 cols): Astronaut Tactical Protocol */}
              <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 uppercase tracking-widest">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  <span>ASTRONAUT TACTICAL RESPONSE DIRECTIVES</span>
                </div>

                {/* Numbered Steps */}
                <div className="space-y-3">
                  {activeDossier.tacticalProtocols.map((proto, pIdx) => (
                    <div key={pIdx} className="p-3 bg-white/[0.02] border border-white/10 flex gap-3 items-start">
                      <span
                        className="font-mono text-xs font-bold px-1.5 py-0.5 rounded-sm shrink-0"
                        style={{
                          backgroundColor: `${currentPlanet.themeColor}25`,
                          color: currentPlanet.themeColor
                        }}
                      >
                        0{pIdx + 1}
                      </span>
                      <div className="space-y-0.5">
                        <div className="font-sans text-xs font-medium text-white tracking-wide">
                          {proto.action}
                        </div>
                        <div className="font-sans text-[11px] text-zinc-300 font-light leading-snug">
                          {proto.directive}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Suppression Agent Directive Box */}
                <div className="p-4 border border-white/15 bg-white/[0.04] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">
                      PRIMARY SUPPRESSION AGENT:
                    </span>
                    <span
                      className="font-mono text-[9px] px-2 py-0.5 font-medium border"
                      style={{
                        borderColor: currentPlanet.themeColor,
                        color: currentPlanet.themeColor,
                        backgroundColor: `${currentPlanet.themeColor}15`
                      }}
                    >
                      {activeDossier.suppressionDirective.efficiencyRating}
                    </span>
                  </div>
                  <div className="font-mono text-sm font-semibold text-white tracking-wide">
                    {activeDossier.suppressionDirective.agent}
                  </div>
                  <div className="flex items-center gap-4 font-mono text-[10px] text-zinc-400 pt-1 border-t border-white/10">
                    <span>DWELL: {activeDossier.suppressionDirective.dwellTime}</span>
                    <span className="text-amber-400">STD: NASA-STD-3001</span>
                  </div>
                  <p className="font-sans text-[10px] text-zinc-400 italic">
                    CAUTION: {activeDossier.suppressionDirective.cautionNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 4. PLANETARY HABITAT ENVIRONMENTAL & COMBUSTION MATRIX           */}
          {/* =============================================================== */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-300 uppercase tracking-widest">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>PLANETARY HABITAT ENVIRONMENTAL & COMBUSTION MATRIX</span>
              </div>
              <span className="font-mono text-[10px] text-zinc-500">
                LIVE REGIME // {currentPlanet.name} ({currentPlanet.gravityG}G)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Tile 1: Atmospheric Profile */}
              <div className="p-4 border border-white/10 bg-black/40 space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                  <span>ATMOSPHERIC PROFILE</span>
                  <Gauge className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="font-mono text-xl font-medium text-white">
                  {currentPlanet.matrix.atmosphericComposition.cabinPressureKpa} <span className="text-xs text-zinc-400">kPa</span>
                </div>
                <div className="font-mono text-[11px] text-zinc-300">
                  O2 Fraction: <span className="text-white font-medium">{currentPlanet.matrix.atmosphericComposition.oxygenFractionPct}%</span>
                </div>
                <div className="font-mono text-[10px] text-zinc-400 leading-tight">
                  Buffer: {currentPlanet.matrix.atmosphericComposition.bufferGas}
                </div>
                <div className="pt-2 border-t border-white/5 font-mono text-[9px] text-zinc-500">
                  Risk: {currentPlanet.matrix.atmosphericComposition.ambientLeakRisk}
                </div>
              </div>

              {/* Tile 2: Convection & Buoyancy Regime */}
              <div className="p-4 border border-white/10 bg-black/40 space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                  <span>BUOYANCY & DRAFT</span>
                  <Wind className="w-3.5 h-3.5 text-teal-400" />
                </div>
                <div className="font-mono text-xl font-medium text-white">
                  {currentPlanet.matrix.convectionRegime.flowVelocityCmS} <span className="text-xs text-zinc-400">cm/s</span>
                </div>
                <div className="font-mono text-[11px] text-zinc-300">
                  Vector: <span className="text-white font-medium">{currentPlanet.matrix.convectionRegime.buoyancyVector}</span>
                </div>
                <div className="font-mono text-[10px] text-zinc-400 leading-tight">
                  Profile: {currentPlanet.matrix.convectionRegime.flameProfileGeometry}
                </div>
                <div className="pt-2 border-t border-white/5 font-mono text-[9px] text-zinc-500">
                  Regime: {currentPlanet.matrix.convectionRegime.rayleighNumberIndex}
                </div>
              </div>

              {/* Tile 3: NASA Flight Experiment Citations */}
              <div className="p-4 border border-white/10 bg-black/40 space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                  <span>NASA FLIGHT CITATION</span>
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="font-mono text-sm font-semibold text-white tracking-wide">
                  {currentPlanet.matrix.nasaFlightEvidence.missionCode}
                </div>
                <div className="font-mono text-[10px] text-amber-400 font-medium">
                  {currentPlanet.matrix.nasaFlightEvidence.experimentTitle}
                </div>
                <div className="font-sans text-[10px] text-zinc-300 leading-tight font-light">
                  {currentPlanet.matrix.nasaFlightEvidence.empiricalBreakdown}
                </div>
                <div className="pt-2 border-t border-white/5 font-mono text-[9px] text-zinc-500">
                  Accession: {currentPlanet.matrix.nasaFlightEvidence.psiAccessionId}
                </div>
              </div>

              {/* Tile 4: Agent Efficacy Matrix */}
              <div className="p-4 border border-white/10 bg-black/40 space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                  <span>SUPPRESSION EFFICACY</span>
                  <Activity className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="space-y-1.5 pt-1">
                  {currentPlanet.matrix.agentEfficacy.slice(0, 3).map((agent, aIdx) => (
                    <div key={aIdx} className="space-y-0.5">
                      <div className="flex items-center justify-between font-mono text-[9px]">
                        <span className="text-zinc-300 truncate max-w-[130px]">{agent.name}</span>
                        <span style={{ color: agent.scorePct >= 90 ? '#4ade80' : agent.scorePct >= 70 ? '#fbbf24' : '#f87171' }}>
                          {agent.scorePct}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${agent.scorePct}%`,
                            backgroundColor: agent.scorePct >= 90 ? '#4ade80' : agent.scorePct >= 70 ? '#fbbf24' : '#f87171'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-white/5 font-mono text-[9px] text-zinc-400">
                  Primary: {currentPlanet.suppressionStrategy.split(';')[0]}
                </div>
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* 5. ACTIONABLE COMMAND BAR: LAUNCHPAD & DOSSIER MODAL            */}
          {/* =============================================================== */}
          <div className="p-4 sm:p-5 border border-white/15 bg-gradient-to-r from-black/80 via-white/[0.04] to-black/80 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: currentPlanet.themeColor }} />
              <div>
                <div className="font-mono text-xs text-white font-medium tracking-wide">
                  READY TO RUN COMBUSTION SIMULATION FOR {currentPlanet.name}
                </div>
                <div className="font-mono text-[10px] text-zinc-400">
                  REGIME: {currentPlanet.gravityG}G · {currentPlanet.locLimit} LOC · {currentPlanet.thermalRange} · FLUID CODE PSI-2026
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => openDossier(currentPlanet)}
                className="flex-1 md:flex-none px-4 py-2.5 border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 font-mono text-xs text-white uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>VIEW FULL DOSSIER</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={launchSimulatorWithPlanet}
                className="flex-1 md:flex-none px-5 py-2.5 font-mono text-xs uppercase tracking-wider font-semibold text-black transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                style={{
                  backgroundColor: currentPlanet.themeColor,
                  boxShadow: `0 0 25px -5px ${currentPlanet.themeGlow}`
                }}
              >
                <Flame className="w-4 h-4 fill-black" />
                <span>LAUNCH 3D SIMULATOR WITH THIS REGIME →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
