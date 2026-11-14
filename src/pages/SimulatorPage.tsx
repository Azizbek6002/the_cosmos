import React, { useState, useEffect } from 'react';
import { ShieldAlert, RotateCcw, Sliders } from 'lucide-react';
import { PageId } from '../components/Header';

interface SimulatorPageProps {
  onNavigate: (page: PageId) => void;
}

interface SafetyGuideSection {
  id: number;
  sectionTag: string;
  title: string;
  shortSummary: string;
  badge: string;
  rules: string[];
  criticalDirective: string;
}

interface HabitatHazardItem {
  tag: string;
  title: string;
  image: string;
  description: string;
  countermeasure: string;
  badge: string;
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
  // Left 4 Cards: Interactive Step-by-Step Survival & Fire Prevention Handbook
  safetyHandbook: SafetyGuideSection[];
  // Right 3 Cards: Specific Problem Photos & Directives
  hazardCards: HabitatHazardItem[];
  // Telemetry details
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
    id: 'europa',
    name: 'EUROPA IX // CRYO OUTPOST',
    subTitle: 'Jovian Icy Moon Sub-Surface Core',
    gravityG: 0.134,
    oxygenPct: 19.5,
    pressureKpa: 95.0,
    airflowCmS: 5.0,
    imageSrc: '/planets/planet_europa.png',
    themeColor: '#2dd4bf',
    themeGlow: 'rgba(45, 212, 191, 0.7)',
    flameType: '0.134g Cryo-Dampened Flame',
    flameGeometrySummary: 'Sub-zero boundary conditions with weak buoyancy. Liquid suppressants freeze instantly.',
    locThreshold: '12.4%',
    coHazardPct: 68,
    burnRateMmS: '0.18',
    safetyHandbook: [
      {
        id: 1,
        sectionTag: '01 // ARRIVAL SURVIVAL PROTOCOL',
        title: 'Cryo-Habitat Life-Support & Thermal Stabilization',
        shortSummary: 'Maintain habitat wall heating; ensure glycol coolant loop integrity at -170°C.',
        badge: 'MANDATORY ON ARRIVAL',
        rules: [
          'Verify heated airlock seal integrity to prevent external ice crystal intrusion.',
          'Monitor glycol circulation lines for pressure drops or micro-fractures.',
          'Keep portable heated nitrogen fire packs charged and pre-warmed to +20°C.',
          'Never deploy aqueous extinguishers near cryogenic hull flanges.'
        ],
        criticalDirective: 'Standard water mist freezes instantly in delivery nozzles at -170°C, causing explosive line bursts.'
      },
      {
        id: 2,
        sectionTag: '02 // FIRE & O2 PREVENTION CONTROLS',
        title: 'Thermal Shunting & Volatile Glycol Containment',
        shortSummary: 'Isolate heat exchange loops from high-voltage DC heating power distribution.',
        badge: 'PREVENTIVE DIRECTIVE',
        rules: [
          'Maintain secondary containment around all sub-ice heat exchange circuits.',
          'Conduct weekly ultrasonic tests on titanium weld joints under thermal stress.',
          'Limit habitat oxygen concentration strictly below 19.5% LOC margin.',
          'Ensure avionics wire raceways are purged with inert gaseous nitrogen.'
        ],
        criticalDirective: 'Flammable glycol leaks onto hot electrical conductors cause rapid low-temperature smolder.'
      },
      {
        id: 3,
        sectionTag: '03 // ELECTRICAL BUS OVERHEAT CONTROLS',
        title: 'High-Amperage Habitat Heating Bus Protection',
        shortSummary: 'Solid-state circuit isolation for 400A sub-surface thermal power lines.',
        badge: 'ELECTRICAL HAZARD',
        rules: [
          'Install sub-millisecond solid-state arc fault circuit interrupters.',
          'Route redundant power feeds through separate cryo-insulated conduits.',
          'Automatic power shedding if heating bus temperature exceeds 65°C.',
          'Monitor insulation dielectric strength against Jovian magnetic radiation.'
        ],
        criticalDirective: 'Thermal contraction micro-fractures in cable insulation generate continuous arc tracking.'
      },
      {
        id: 4,
        sectionTag: '04 // EMERGENCY FLIGHT & EVACUATION',
        title: 'Surface Airlock & Ascender Pod Readiness',
        shortSummary: 'Immediate crew evacuation pathway to surface landing craft in case of hull breach.',
        badge: 'EVACUATION DIRECTIVE',
        rules: [
          'Lock intermediate sub-ice bulkhead hatches within 30 seconds of alarm.',
          'Verify autonomous ascender pod life support is pressurized and online.',
          'Don heated planetary survival suits before opening exterior pressure doors.',
          'Execute nitrogen flood sequence only after crew cabin compartment is hermetically sealed.'
        ],
        criticalDirective: 'Ice sublimation around compromised compartments can cause structural collapse of the habitat vault.'
      }
    ],
    hazardCards: [
      {
        tag: 'HAZARD 01 // CRYO-COOLANT LEAK',
        title: 'Glycol Heat Loop Autoignition Risk',
        image: '/hazards/europa_ice.jpg',
        description: 'Vaporized glycol coolant under low pressure can ignite when contacting 200°C electronics heat sinks.',
        countermeasure: 'FIX: Instant scram of glycol pumps; discharge heated nitrogen purge across heat sink.',
        badge: 'GLYCOL FLASH: 68% HAZARD'
      },
      {
        tag: 'HAZARD 02 // ICE WALL SUBLIMATION',
        title: 'Thermal Shock to Sub-Surface Ice Bulkhead',
        image: '/planets/PIA00502.jpg',
        description: 'High heat flux from internal flames melts surrounding bedrock ice, threatening habitat seal integrity.',
        countermeasure: 'FIX: Engage active cryogenic heat pipes to dissipate thermal spike into surrounding ice sink.',
        badge: 'BULKHEAD CRITICAL: 190°C DELTA'
      },
      {
        tag: 'HAZARD 03 // LINE FREEZE LOCKOUT',
        title: 'Extinguisher Nozzle Cryo-Freeze',
        image: '/planets/planet_europa.png',
        description: 'Moisture in standard fire extinguisher valves freezes instantaneously at -170°C, locking triggers.',
        countermeasure: 'FIX: Use heated nitrogen cylinders equipped with internal 28V DC PTC warming elements.',
        badge: 'EXTINGUISHER LOCK: -170°C'
      }
    ],
    suppressionDirective: {
      agent: 'Heated Gaseous Nitrogen (N2) Flood',
      protocol: 'Discharge pre-warmed N2 to displace oxygen below 12.4% without inducing thermal shock.',
      criticalTiming: 'Target: Reach LOC extinction in < 40 seconds to prevent ice sublimation.'
    },
    hvacVentilationLock: {
      rule: 'CRITICAL CRYO HVAC ISOLATION (< 4s)',
      action: 'Close motorized dampers and engage thermal shunts to contain smoke.',
      danger: 'Ventilation drafts carry hot gases toward vulnerable ice ceiling anchors.'
    },
    postFireClearance: {
      thermalScan: 'Scan sub-ice structural interface with thermal imager to verify temperatures < -40°C.',
      gasScrubbing: 'Vent nitrogen cloud through catalytic scrubbers and restore 19.5% O2 breathing mix.',
      safeReentry: 'Verify bulkhead ice thickness using ground-penetrating radar before unsealing airlocks.'
    }
  },
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
    safetyHandbook: [
      {
        id: 1,
        sectionTag: '01 // ARRIVAL SURVIVAL PROTOCOL',
        title: 'Zero-G Cabin Life-Support & Acclimatization',
        shortSummary: 'Cabin pressure 101.3 kPa; natural draft is 0; do not rely on ceiling smoke sensors.',
        badge: 'MANDATORY ON ARRIVAL',
        rules: [
          'Don emergency breathing hood within 10 seconds of master caution alarm.',
          'Move away from ventilation returns; in zero-g, smoke drifts with forced drafts.',
          'Verify airlock hatch seal integrity to isolate affected modules from living quarters.',
          'Pre-arm emergency crew return vehicle (Soyuz / Crew Dragon) if CO level breaches 50 ppm.'
        ],
        criticalDirective: 'Natural buoyant convection is zero; hot air and toxic gases will not rise to ceiling detectors.'
      },
      {
        id: 2,
        sectionTag: '02 // FIRE & O2 PREVENTION CONTROLS',
        title: 'Atmospheric Limiting & Volatiles Management',
        shortSummary: 'Maintain oxygen partial pressure ≤ 21.0 kPa; strict controls on acrylic and PMMA viewports.',
        badge: 'PREVENTIVE DIRECTIVE',
        rules: [
          'Prohibit unsealed polymers with limiting oxygen index < 25 near electronics racks.',
          'Conduct daily infrared leak inspections on high-pressure O2 candle generation manifolds.',
          'Install flame-retardant silicone sleeves on all umbilical wire harnesses.',
          'Never permit forced air draft velocity > 12 cm/s through equipment bays.'
        ],
        criticalDirective: 'Stagnant microgravity air self-extinguishes; fan drafts feed oxygen directly to the reaction.'
      },
      {
        id: 3,
        sectionTag: '03 // ELECTRICAL BUS OVERHEAT CONTROLS',
        title: '120V DC Avionics Bus & Thermal Runaway Shields',
        shortSummary: 'Thermal heat sink monitoring and hermetic Li-Ion battery containment.',
        badge: 'ELECTRICAL HAZARD',
        rules: [
          'Automatic circuit breaker disconnect if power draw spikes by > 8% above baseline.',
          'Enclose Li-Ion battery racks in sealed hermetic titanium containment boxes.',
          'Verify cold plate thermal heat-sink temperature is maintained at < 18°C.',
          'Maintain 360° infrared thermal scanning for invisible NASA FLEX cool flames.'
        ],
        criticalDirective: 'Cool flames persist invisibly at 500–750 K without visible glow while silently accumulating toxic CO.'
      },
      {
        id: 4,
        sectionTag: '04 // EMERGENCY SUPPRESSION ACTIONS',
        title: 'Automated Rapid Extinguishing Sequence',
        shortSummary: 'Immediate HVAC shutdown (<5s) and total-flood portable CO2 discharge.',
        badge: 'IMMEDIATE ACTION',
        rules: [
          'STEP 1: Execute immediate automated HVAC fan cut-off within 5 seconds.',
          'STEP 2: Discharge portable CO2 extinguisher directly at the spherical flame envelope.',
          'STEP 3: Maintain CO2 blanket for 15 minutes to starve invisible cool flame embers.',
          'STEP 4: Run catalytic CO oxidizers and active charcoal filters for 4 hours.'
        ],
        criticalDirective: 'Water mist is strictly prohibited: boiling droplets rupture composite avionics circuits.'
      }
    ],
    hazardCards: [
      {
        tag: 'HAZARD 01 // COOL FLAME ANOMALY',
        title: 'NASA FLEX Invisible Cool Flame Persistence',
        image: '/hazards/iss_fire.jpg',
        description: 'Following visible flame extinction, low-temperature cool flames continue burning invisibly at 500–750 K, generating massive Carbon Monoxide (CO).',
        countermeasure: 'Discharge total-flood CO2 extinguishers; sweep with 360° IR radiometer.',
        badge: 'CO DANGER: 95% ACCUMULATION'
      },
      {
        tag: 'HAZARD 02 // FORCED DRAFT REACTION',
        title: 'Ventilation-Driven Diffusion Boundary Breach',
        image: '/planets/landscape_cetrion.png',
        description: 'Without buoyant draft, flames self-extinguish in stagnant air. However, forced fan speeds > 5 cm/s feed fresh oxygen directly into the blue flame front.',
        countermeasure: 'Automated immediate HVAC lockdown (<5s); isolate module circulation dampers.',
        badge: 'DRAFT THREAT: >5 CM/S SUSTAINS SMOLDER'
      },
      {
        tag: 'HAZARD 03 // PARTICULATE INGRESS',
        title: 'Zero-G Suspended Soot Agglomerate Blindness',
        image: '/planets/planet_earth.png',
        description: 'In true zero-g, long chain-like soot particulates remain suspended indefinitely, blinding optical smoke detectors and clogging ECLSS life-support filters.',
        countermeasure: 'Engage catalytic CO oxidizers and active charcoal HEPA scrubbers for 4 hours.',
        badge: 'FILTER PURGE: 4H ACTIVE CYCLE'
      }
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
    safetyHandbook: [
      {
        id: 1,
        sectionTag: '01 // ARRIVAL SURVIVAL PROTOCOL',
        title: 'Partial-Gravity Plume Dynamics & Acclimatization',
        shortSummary: 'Sub-atmospheric 56 kPa pressure; toxic heavy gases pool along crew floor surfaces.',
        badge: 'MANDATORY ON ARRIVAL',
        rules: [
          'EVACUATE FLOOR LEVELS IMMEDIATELY: toxic CO and HCN settle at floor height.',
          'Climb to elevated bunk platforms or second-tier command mezzanine.',
          'Engage closed-circuit positive-pressure astronaut rebreathers.',
          'Arm automated surface rover evacuation umbilical in case of hull depressurization.'
        ],
        criticalDirective: 'In 0.38g buoyancy, smoke does not rise rapidly; floor level is the primary fatality zone.'
      },
      {
        id: 2,
        sectionTag: '02 // REGOLITH CATALYSIS CONTROLS',
        title: 'Iron-Oxide Regolith Dust Decontamination',
        shortSummary: 'Abrasive Martian regolith acts as an aggressive oxidation catalyst.',
        badge: 'DUST ISOLATION',
        rules: [
          'Decontaminate EVA suits in negative-pressure airlock before habitat ingress.',
          'Abrasive Fe2O3 dust accelerates polymer combustion by 240% if airborne.',
          'Maintain habitat humidity between 40-50% to prevent static spark buildup.',
          'Store extravehicular oxygen bottles in external underground regolith bunkers.'
        ],
        criticalDirective: 'Dust contamination on electrical relays triggers spontaneous arc ignition.'
      },
      {
        id: 3,
        sectionTag: '03 // LOW-PRESSURE VOLATILES SAFETY',
        title: 'Sub-Atmospheric 56 kPa Ignition Mitigation',
        shortSummary: '56 kPa pressure with 28% O2 lowers Limiting Oxygen Concentration (LOC).',
        badge: 'PRESSURE CONTROL',
        rules: [
          'Crosslinked polyethylene cables must be isolated inside sealed conduit channels.',
          'Rover battery recharge bays must be vented directly to external Martian ambient.',
          'Monitor outgassing volatiles with gas-chromatograph sensors every 12 hours.',
          'Prohibit open solder stations during high-solar-flux dust storm periods.'
        ],
        criticalDirective: 'Low atmospheric pressure increases plasticizer evaporation and flammability.'
      },
      {
        id: 4,
        sectionTag: '04 // EMERGENCY SUPPRESSION ACTIONS',
        title: 'Floor-Plume Quench & Total Flood',
        shortSummary: 'Deploy total-flood CO2 and processed dry regolith smothering blanket.',
        badge: 'IMMEDIATE ACTION',
        rules: [
          'STEP 1: Cease crew habitat air circulation to halt lateral floor plume spread.',
          'STEP 2: Deliver clean CO2 agent or fine water mist within 45 seconds.',
          'STEP 3: Dump burning rover battery locker atmosphere to exterior Martian vacuum.',
          'STEP 4: Scan sub-floor cable trays with FLIR thermal camera for hidden hot-spots.'
        ],
        criticalDirective: 'Extinguish floor-level plume before toxic gases reach life-support intakes.'
      }
    ],
    hazardCards: [
      {
        tag: 'HAZARD 01 // GRAVITY POOLING',
        title: '0.38g Floor-Level Toxic Combustion Gas Migration',
        image: '/hazards/mars_dust.jpg',
        description: 'Reduced Martian gravity creates weak buoyant draft. Lethal carbon monoxide and hydrogen cyanide pool along cabin floor decks instead of rising to ceiling vents.',
        countermeasure: 'Immediate crew evacuation to elevated bunks; don closed-circuit breathing hoods.',
        badge: 'FLOOR PLUME: 2.4x LATERAL SPREAD'
      },
      {
        tag: 'HAZARD 02 // DUST CATALYSIS',
        title: 'Iron-Oxide Regolith Dust Accelerated Oxidation',
        image: '/planets/landscape_devlaar.png',
        description: 'Fine abrasive Martian regolith contains high Fe2O3 content that acts as an aggressive oxidation catalyst, dramatically lowering polymer ignition thresholds.',
        countermeasure: 'Deploy dry regolith smothering blanket or high-pressure CO2 suppression blast.',
        badge: 'CATALYST: Fe2O3 DUST ACCELERATION'
      },
      {
        tag: 'HAZARD 03 // LOW-PRESSURE LOC',
        title: 'Sub-Atmospheric 56 kPa Volatiles Outgassing',
        image: '/planets/planet_mars.png',
        description: 'Habitat design (56.0 kPa with 28% O2) reduces airlock pre-breathe times but lowers the Limiting Oxygen Concentration (LOC), promoting fast horizontal flame spread.',
        countermeasure: 'Depressurize burning battery bay directly to external Martian ambient atmosphere.',
        badge: 'PRESSURE HAZARD: 56 kPa LOW LOC'
      }
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
    safetyHandbook: [
      {
        id: 1,
        sectionTag: '01 // ARRIVAL SURVIVAL PROTOCOL',
        title: 'Lunar Surface Arrival & Vacuum Airlock Safety',
        shortSummary: '0.166g gravity; airlock regolith barrier and MLI insulation check.',
        badge: 'MANDATORY ON ARRIVAL',
        rules: [
          'Lock EVA suit visors; prepare emergency transfer to Lunar Ascent Module.',
          'Retreat to subterranean sub-regolith shielded habitat shelter.',
          'Verify lunar dust airlock seals to prevent razor-sharp particulates from entering.',
          'Cut main 270V DC solar array bus converter if arcing is observed.'
        ],
        criticalDirective: 'Intermediate 1/6g gravity creates thick, silent smoldering boundary layers.'
      },
      {
        id: 2,
        sectionTag: '02 // REGOLITH EROSION MITIGATION',
        title: 'Oxygen Valve Seal & Ingress Protection',
        shortSummary: 'Stop abrasive dust from penetrating high-pressure oxygen manifolds.',
        badge: 'PREVENTIVE DIRECTIVE',
        rules: [
          'Inspect regolith-tight seals on all oxygen feed lines before re-pressurization.',
          'Keep multi-layer insulation (MLI) blankets under vacuum compression.',
          'Prevent ungrounded composite surfaces from accumulating electrostatic charges.',
          'Prohibit open PTFE fluoropolymer wiring in unventilated avionics bays.'
        ],
        criticalDirective: 'Regolith particles erode valve seats, creating invisible high-pressure O2 micro-jets.'
      },
      {
        id: 3,
        sectionTag: '03 // DC ARCING & THERMAL SHOCK',
        title: 'Solar Array Bus Bar Arc-Fault Protection',
        shortSummary: 'Extreme thermal swings (-130°C to +120°C) crack cable insulation.',
        badge: 'ELECTRICAL HAZARD',
        rules: [
          'Monitor solar array bus bar resistance for thermal fatigue cracking.',
          'Engage arc-fault circuit interrupters (AFCI) on all primary DC feeders.',
          'Isolate sub-surface battery storage vault during lunar noon peak heating.',
          'Purge avionics bays with surface nitrogen gas storage.'
        ],
        criticalDirective: 'High-voltage vacuum arcing sustains persistent plasma torches if unswitched.'
      },
      {
        id: 4,
        sectionTag: '04 // EMERGENCY SUPPRESSION ACTIONS',
        title: 'In-Situ Lunar Regolith Smothering Blanket',
        shortSummary: 'In-situ degassed lunar regolith powder smothering + nitrogen purge.',
        badge: 'IMMEDIATE ACTION',
        rules: [
          'STEP 1: Disperse micronized lunar regolith powder directly over burning equipment.',
          'STEP 2: Regolith acts as a massive thermal heat sink, absorbing runaway heat.',
          'STEP 3: Purge avionics compartment with inert dry nitrogen gas within 60 seconds.',
          'STEP 4: Radiometric confirmation that core equipment temperature is < 50°C.'
        ],
        criticalDirective: 'Do not use water: boiling steam creates instantaneous cabin overpressure.'
      }
    ],
    hazardCards: [
      {
        tag: 'HAZARD 01 // REGOLITH EROSION',
        title: 'Abrasive Lunar Regolith Valve Seal Compromise',
        image: '/hazards/moon_dust.jpg',
        description: 'Microscopic razor-sharp lunar regolith dust penetrates life-support valve seats, creating high-pressure oxygen micro-leaks into high-voltage avionics racks.',
        countermeasure: 'Deploy in-situ degassed lunar regolith powder as thermal smothering heat sink.',
        badge: 'ABRASIVE INGRESS: 0.166g MIGRATION'
      },
      {
        tag: 'HAZARD 02 // DEEP SMOLDER',
        title: 'Multi-Layer Insulation (MLI) Sub-Surface Smolder',
        image: '/planets/landscape_biturion.png',
        description: 'Under 1/6th gravity, thermal boundary layers thicken drastically, allowing silent, smoldering burn fronts inside porous EVA suit multi-layer fabrics.',
        countermeasure: 'Autonomous nitrogen chamber purge; depressurize airlock to lunar surface vacuum.',
        badge: 'SMOLDER SPREAD: 0.28 mm/s SILENT'
      },
      {
        tag: 'HAZARD 03 // VACUUM ARCING',
        title: 'Lunar High-Voltage Solar Array Bus Flashover',
        image: '/planets/planet_moon.png',
        description: 'Extreme lunar thermal swings (-130°C to +120°C) crack polymer cable shielding, triggering high-temperature plasma arcing across solar bus relays.',
        countermeasure: 'Instant electrical bus disconnect; isolate cryogenic oxygen storage tanks.',
        badge: 'THERMAL SWINGS: 250°C RANGE'
      }
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
    imageSrc: '/planets/planet_sedna.png',
    themeColor: '#38bdf8',
    themeGlow: 'rgba(56, 189, 248, 0.75)',
    flameType: 'Zero-G Cryogenic Hull Flame',
    flameGeometrySummary: 'Microgravity flame in an isolated deep-space outpost surrounded by 30 Kelvin space vacuum.',
    locThreshold: '11.5%',
    coHazardPct: 95,
    burnRateMmS: '0.12',
    safetyHandbook: [
      {
        id: 1,
        sectionTag: '01 // ARRIVAL SURVIVAL PROTOCOL',
        title: 'Heliopause Station Arrival & Centrifuge Life Hub',
        shortSummary: 'Zero resupply possible at 85 AU; 30 Kelvin exterior vacuum; immediate module lockdown.',
        badge: 'MANDATORY ON ARRIVAL',
        rules: [
          'EVACUATE TO CENTRAL CENTRIFUGE: Seal airtight bulkheads to preserve core life.',
          'Don self-contained cryogenic life-support rebreather apparatus.',
          'Verify outer composite hull integrity against thermal fracture shock.',
          'Prepare emergency orbital escape module in case of life-hub depressurization.'
        ],
        criticalDirective: 'Resupply is 85 AU away; module preservation takes precedence.'
      },
      {
        id: 2,
        sectionTag: '02 // CRYO-HULL FIRE PREVENTION',
        title: 'Polymer Storage & Laboratory Reagents',
        shortSummary: 'Radiant heat loss into deep-space cold causes unique cool flame traps.',
        badge: 'PREVENTIVE DIRECTIVE',
        rules: [
          'Store 3D printing PEEK and Ultem resins in vacuum-isolated storage bins.',
          'Prohibit liquid aerosol reagents in unventilated microgravity gloveboxes.',
          'Maintain radiant water-wall thermal baffles at steady 12°C.',
          'Perform ultrasonic structural scans of cryogenic composite joints weekly.'
        ],
        criticalDirective: 'At -240°C ambient, localized fires create immense catastrophic hull stresses.'
      },
      {
        id: 3,
        sectionTag: '03 // RADIATION & DIELECTRIC SAFETY',
        title: 'Cosmic Ray Flux & High-Voltage Bus Protection',
        shortSummary: 'Extreme space particle flux degrades wiring insulation into flammable gas.',
        badge: 'RADIATION HAZARD',
        rules: [
          'Shield high-voltage avionics with heavy boron-doped polyethylene matrices.',
          'Monitor dielectric breakdown voltage on all deep-space ion thruster buses.',
          'Isolate cryogenic sleep tanks from main electrical power conduits.',
          'Inspect secondary backup oxygen scrubbers before each shift.'
        ],
        criticalDirective: 'Radiation-damaged polymers outgas flammable hydrocarbons at room temperature.'
      },
      {
        id: 4,
        sectionTag: '04 // EMERGENCY SUPPRESSION ACTIONS',
        title: 'Automated Module Vacuum Venting Barrier',
        shortSummary: 'Automated pyrotechnic hull venting to space vacuum within 20 seconds.',
        badge: 'IMMEDIATE ACTION',
        rules: [
          'STEP 1: Trigger pyrotechnic slam-valves to physically sever lab ductwork.',
          'STEP 2: Blow explosive hull vent to dump lab atmosphere directly to space vacuum.',
          'STEP 3: Vacuum exposure terminates all combustion within 4 seconds.',
          'STEP 4: Radiometric scan confirms hull boundary has frozen back to 30 Kelvin.'
        ],
        criticalDirective: 'Do not attempt chemical filtration; space vacuum is the ultimate zero-loss extinguisher.'
      }
    ],
    hazardCards: [
      {
        tag: 'HAZARD 01 // CRYO FRACTURE',
        title: 'Cryogenic Ice Shelf Fracture & Seal Rupture',
        image: '/hazards/europa_ice.jpg',
        description: 'High ambient moisture from borehole ice walls creates a chilled boundary layer, trapping toxic hydrocarbon pyrolyzates in sub-surface modules.',
        countermeasure: 'Deploy liquid nitrogen boil-off vapor deluge; activate cold carbon reclamation bed.',
        badge: 'CRYO WALL: HIGH CHILL BOUNDARY'
      },
      {
        tag: 'HAZARD 02 // RADIATION STRESS',
        title: 'Jovian Magnetospheric Radiation Breakdown',
        image: '/planets/PIA00502.jpg',
        description: 'Intense Jovian magnetospheric particle radiation degrades wiring insulation polymers, creating spontaneous electrical arc discharge points.',
        countermeasure: 'Isolate high-voltage avionics bay; vent sub-module atmosphere to vacuum.',
        badge: 'RAD FLUX: POLYMER DIELECTRIC DEGRADE'
      },
      {
        tag: 'HAZARD 03 // ICE SEAL FAILURE',
        title: 'Ice Shelf Pressure Relief Seal Pyrolysis',
        image: '/planets/planet_europa.png',
        description: 'Thermal runaway from drilling power units pyrolyzes silicone ice gaskets, producing white silica soot that jams habitat emergency pressure valves.',
        countermeasure: 'Engage emergency sub-ice chill barrier; execute rapid chamber depressurization.',
        badge: 'ICE SEAL: 85 kPa CHILL LOSS'
      }
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
    safetyHandbook: [
      {
        id: 1,
        sectionTag: '01 // ARRIVAL SURVIVAL PROTOCOL',
        title: 'Dual-Atmosphere Boundary & Methane Alert',
        shortSummary: 'External dense methane (1.5 atm) vs internal oxygen; hull breach = explosion.',
        badge: 'MANDATORY ON ARRIVAL',
        rules: [
          'PREVENT HULL RUPTURE AT ALL COSTS: Methane ingress creates immediate detonation.',
          'Don fireproof positive-pressure rebreathers; retreat to sub-ice bunker.',
          'Verify positive nitrogen overpressure barrier is active across all airlocks.',
          'Check perimeter methane sensors for any exterior gas penetration.'
        ],
        criticalDirective: 'An internal fire that punctures the hull acts as a continuous fuel-air torch.'
      },
      {
        id: 2,
        sectionTag: '02 // METHANE & OXYGEN SEPARATION',
        title: 'Positive Nitrogen Curtain & Seal Integrity',
        shortSummary: 'Maintain internal habitat pressure higher than external 147 kPa at all times.',
        badge: 'PREVENTIVE DIRECTIVE',
        rules: [
          'Maintain internal habitat pressure higher than external 147 kPa at all times.',
          'Flush airlocks with pure nitrogen before opening external or internal doors.',
          'Prohibit any open electrical contacts within 10 meters of airlock vestibules.',
          'Inspect cryogenic heat exchanger core for methane-ice clogging every shift.'
        ],
        criticalDirective: 'Any pressure drop draws in atmospheric methane, creating explosive stoichiometry.'
      },
      {
        id: 3,
        sectionTag: '03 // CRYOGENIC EMBRITTLEMENT SAFETY',
        title: 'Extreme -179°C Gasket Heating & Seals',
        shortSummary: '-179°C exterior temperatures shatter rubber and fluoroelastomer seals.',
        badge: 'THERMAL SHOCK HAZARD',
        rules: [
          'Engage active heating coils along all perimeter airlock gasket frames.',
          'Replace fluoroelastomers showing signs of cryogenic hydrocarbon swelling.',
          'Isolate oxygen electrolysis manifolds from external atmospheric intakes.',
          'Inspect structural weld seams with acoustic emission sensors daily.'
        ],
        criticalDirective: 'Localized fire heat contrasting with -179°C cold causes explosive thermal shock.'
      },
      {
        id: 4,
        sectionTag: '04 // EMERGENCY SUPPRESSION ACTIONS',
        title: 'High-Pressure Pure Nitrogen Blanket Injection',
        shortSummary: 'High-pressure pure nitrogen blanket injection within 15 seconds.',
        badge: 'IMMEDIATE ACTION',
        rules: [
          'STEP 1: Trigger external intake slam dampers; cut all atmospheric draws.',
          'STEP 2: Inject high-pressure nitrogen gas to dilute oxygen below 10.8% LOC.',
          'STEP 3: Maintain nitrogen overpressure to keep external methane from penetrating.',
          'STEP 4: Run mass spectrometer gas analysis to confirm zero hydrocarbon ppm.'
        ],
        criticalDirective: 'Never vent to exterior Titan atmosphere; that draws in fuel!'
      }
    ],
    hazardCards: [
      {
        tag: 'HAZARD 01 // DUAL-ATMOSPHERE',
        title: 'Dense Methane vs Habitat Oxygen Explosion Hazard',
        image: '/hazards/titan_methane.jpg',
        description: 'Exterior world is dense cryogenic methane at 1.5 atm. Any hull rupture during a fire converts the module into an industrial diffusion torch.',
        countermeasure: 'Maintain strict positive internal nitrogen overpressure; activate nitrogen envelope curtain.',
        badge: 'EXPLOSION THREAT: 1.5 ATM DENSE CH4'
      },
      {
        tag: 'HAZARD 02 // EMBRITTLEMENT',
        title: 'Extreme -179°C Airlock Gasket Micro-Fractures',
        image: '/planets/PIA14602.jpg',
        description: 'Rapid temperature swings during localized fires shatter cryogenic polymer airlock gaskets, venting internal life-support oxygen outwards.',
        countermeasure: 'Deploy cryogenic heater coils; flood gasket seals with pre-chilled gaseous nitrogen.',
        badge: 'TEMP GRADIENT: -179°C TO +300°C'
      },
      {
        tag: 'HAZARD 03 // INGRESS FLASH',
        title: 'Hydrocarbon Ingress to High-Voltage Compressors',
        image: '/planets/planet_titan.png',
        description: 'Atmospheric liquid methane aerosol droplets sucked into HVAC intakes react violently with oxygen candle generators in life-support bays.',
        countermeasure: 'Autonomous intake flap seal lock; total deluge with inert Halon/argon replacement.',
        badge: 'HVAC THREAT: METHANE AEROSOL INGRESS'
      }
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
    safetyHandbook: [
      {
        id: 1,
        sectionTag: '01 // ARRIVAL SURVIVAL PROTOCOL',
        title: 'Hyper-Gravity Acclimatization & Ceiling Hazard',
        shortSummary: '2.53g gravity makes movement heavy; superheated plumes rise at 4x speed.',
        badge: 'MANDATORY ON ARRIVAL',
        rules: [
          'EVACUATE CEILING IMMEDIATELY: Hot plumes shoot upward to ceiling in < 1.2s.',
          'Crawl along floor against 2.53g heavy body weight to reach armored pod.',
          'Activate emergency radiation shield bulkhead to block plasma arcs.',
          'Don reinforced thermal fire hoods against intense convective flashover.'
        ],
        criticalDirective: 'Ceiling flashover (600°C) is reached 3x faster than on Earth.'
      },
      {
        id: 2,
        sectionTag: '02 // LIGHTNING & HYPERBARIC CONTROLS',
        title: 'Faraday Shielding & Pressure Isolation',
        shortSummary: 'Atmospheric mega-volt lightning strikes and hyperbaric pressure shear.',
        badge: 'PREVENTIVE DIRECTIVE',
        rules: [
          'Engage active Faraday magnetic deflection shield around aerostat hull.',
          'Maintain hyperbaric structural seals against turbulent Jovian convective shear.',
          'Inspect high-pressure hydraulic lines (200 bar) for thermal stress micro-cracks.',
          'Cut power to superconducting magnet coils if temperature rises above 4 Kelvin.'
        ],
        criticalDirective: 'Violent buoyant updrafts turn minor smolders into high-velocity fire jets.'
      },
      {
        id: 3,
        sectionTag: '03 // AEROSTAT BUOYANCY SAFEGUARDS',
        title: 'Hot-Gas Buoyant Envelope Integrity',
        shortSummary: 'Thermal radiation melting hot-gas cells causes catastrophic descent.',
        badge: 'BUOYANCY HAZARD',
        rules: [
          'Monitor buoyant gas envelope temperature across 360-degree sensor grid.',
          'Isolate high-voltage avionics trays from buoyant envelope suspension cables.',
          'Pre-arm emergency ascent solid-fuel escape boosters for immediate launch.',
          'Verify automatic ballast dump valves are calibrated for 2.53g.'
        ],
        criticalDirective: 'A fire in the buoyant envelope causes irreversible descent into Jupiter core.'
      },
      {
        id: 4,
        sectionTag: '04 // EMERGENCY SUPPRESSION ACTIONS',
        title: 'High-Pressure Argon Deluge + Active Water Curtain',
        shortSummary: 'High-pressure argon deluge + active water curtain within 10 seconds.',
        badge: 'IMMEDIATE ACTION',
        rules: [
          'STEP 1: Discharge dense gaseous argon deluge from ceiling-mounted nozzles.',
          'STEP 2: Activate active water curtain to cool ceiling trusses and break chimney draft.',
          'STEP 3: Cut main electrical bus to quench superconducting magnet arcing.',
          'STEP 4: Verify superconducting magnet temperature remains below quench limits.'
        ],
        criticalDirective: 'Discharge must occur in < 10 seconds to stop convective flashover propagation.'
      }
    ],
    hazardCards: [
      {
        tag: 'HAZARD 01 // LIGHTNING PLASMA',
        title: 'Super-Atmospheric Lightning Arc Ignition',
        image: '/hazards/jupiter_storm.jpg',
        description: 'Violent Jovian atmospheric storm vortices generate mega-volt electrostatic lightning discharges, igniting external floating aerostat hulls.',
        countermeasure: 'Activate Faraday magnetic deflection shield; dump internal oxygen to vacuum buffer.',
        badge: 'PLASMA STRIKE: MEGA-VOLT DISCHARGE'
      },
      {
        tag: 'HAZARD 02 // HYPERBARIC FRONT',
        title: 'Hyperbaric Hydrogen-Helium Convective Shear',
        image: '/planets/PIA02877.jpg',
        description: 'Massive exterior atmospheric pressure drives rapid turbulent mixing if habitat hull is breached, creating instantaneous high-velocity flame fronts.',
        countermeasure: 'Autonomous bulkhead pyrotechnic isolation; deploy high-pressure nitrogen barrier.',
        badge: 'EXTREME PRESSURE: HYPERBARIC SHEAR'
      },
      {
        tag: 'HAZARD 03 // BUOYANCY LOSS',
        title: 'Floating Aerostat Thermal Envelope Burnout',
        image: '/planets/planet_jupiter.png',
        description: 'External envelope thermal radiation melts hot-gas buoyant containment cells, sending habitat into irreversible atmospheric descent.',
        countermeasure: 'Fire emergency ascent solid boosters; evacuate crew to orbital return vehicle.',
        badge: 'BUOYANCY FAILURE: CRITICAL SINK RISK'
      }
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
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState<number>(0);
  const [isTransitioningPlanet, setIsTransitioningPlanet] = useState<boolean>(false);
  const [showCustomSliders, setShowCustomSliders] = useState<boolean>(false);

  // Custom simulator sliders state
  const [customGravity, setCustomGravity] = useState<number>(0.0);
  const [customOxygen, setCustomOxygen] = useState<number>(21.0);
  const [customPressure, setCustomPressure] = useState<number>(101.3);
  const [customAirflow, setCustomAirflow] = useState<number>(10.0);

  // Auto-sync requested planet from HUD if navigated via launch button
  useEffect(() => {
    const requestedPlanetId = sessionStorage.getItem('selected_simulator_planet');
    if (requestedPlanetId) {
      sessionStorage.removeItem('selected_simulator_planet');
      const foundIdx = PLANET_SAFETY_DATABASE.findIndex(p => p.id === requestedPlanetId);
      if (foundIdx !== -1) {
        setSelectedPlanetIndex(foundIdx);
        const p = PLANET_SAFETY_DATABASE[foundIdx];
        setCustomGravity(p.gravityG);
        setCustomOxygen(p.oxygenPct);
        setCustomPressure(p.pressureKpa);
        setCustomAirflow(p.airflowCmS);
      }
    }
  }, []);

  const currentPlanet = PLANET_SAFETY_DATABASE[selectedPlanetIndex];

  // Smooth transfer animation when selecting a planet from the top lineup
  const selectPlanet = (index: number) => {
    if (index === selectedPlanetIndex) return;
    setIsTransitioningPlanet(true);
    setSelectedPlanetIndex(index);
    const p = PLANET_SAFETY_DATABASE[index];
    setCustomGravity(p.gravityG);
    setCustomOxygen(p.oxygenPct);
    setCustomPressure(p.pressureKpa);
    setCustomAirflow(p.airflowCmS);

    setTimeout(() => {
      setIsTransitioningPlanet(false);
    }, 650);
  };

  return (
    <div className="min-h-screen bg-[#030408] pt-20 pb-16 px-4 sm:px-8 text-white">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* =================================================================== */}
        {/* 1. TOP HERO: PLANETARY SELECTION LINEUP (1:1 with Reference Image 1)*/}
        {/* Completely open, unconstrained, floating celestial bodies (NO FRAME)*/}
        {/* =================================================================== */}
        <div className="relative py-6">
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
          <div className="mb-10 text-center sm:text-left">
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

          {/* Free-Floating Wide Celestial Lineup (NO confining frames, NO scrollbars, generous breathing room) */}
          <div className="w-full flex flex-wrap lg:flex-nowrap items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 py-6 px-2">
            {PLANET_SAFETY_DATABASE.map((planet, idx) => {
              const isSelected = selectedPlanetIndex === idx;
              return (
                <div
                  key={planet.id}
                  onClick={() => selectPlanet(idx)}
                  className={`group relative flex flex-col items-center flex-shrink-0 cursor-pointer transition-all duration-300 ${
                    isSelected ? 'scale-110 z-30' : 'opacity-60 hover:opacity-100 scale-95'
                  }`}
                >
                  {/* Dedicated 1:1 Aspect-Ratio Planet Container with Perfect Concentric Orbits */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    
                    {/* Selected Planet HUD Orbit Rings (Centered with Pinpoint Mathematical Precision) */}
                    {isSelected && (
                      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        {/* 1. Outer Solid Crisp White Orbit Ring */}
                        <div
                          className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/60 pointer-events-none transition-all duration-500 shadow-[0_0_12px_rgba(255,255,255,0.25)]"
                          style={{
                            boxShadow: `0 0 15px ${planet.themeColor}40`,
                          }}
                        />

                        {/* 2. Inner Dashed Technical Reticle White Orbit Ring */}
                        <div
                          className="absolute w-[86px] h-[86px] sm:w-[102px] sm:h-[102px] rounded-full border border-dashed border-white/75 animate-[spin_35s_linear_infinite] pointer-events-none"
                        />

                        {/* 4 Precision HUD Crosshair Reticle Markers */}
                        <div className="absolute w-[94px] h-[94px] sm:w-[110px] sm:h-[110px] pointer-events-none">
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-[1px] bg-white/80" />
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-[1px] bg-white/80" />
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-[1px] bg-white/80" />
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-[1px] bg-white/80" />
                        </div>
                      </div>
                    )}

                    {/* Planet 3D Sphere */}
                    <div
                      className="w-full h-full rounded-full relative overflow-hidden shadow-2xl transition-all"
                      style={{
                        boxShadow: isSelected
                          ? `0 0 35px ${planet.themeGlow}, inset 0 2px 8px rgba(255,255,255,0.8)`
                          : `inset 0 0 10px rgba(0,0,0,0.8)`,
                      }}
                    >
                      <img
                        src={planet.imageSrc}
                        alt={planet.name}
                        decoding="async"
                        className="w-full h-full object-cover rounded-full select-none"
                      />
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, transparent 55%, rgba(0, 0, 0, 0.35) 80%, rgba(0, 0, 0, 0.75) 100%)',
                        }}
                      />
                    </div>
                  </div>

                  {/* Planet Label */}
                  <span
                    className={`font-mono text-[9px] uppercase tracking-wider mt-4 transition-colors text-shadow-dark ${
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
        {/* 2. THE TACTICAL SAFETY WORKSTATION (NO BACKGROUND CARD / SEAMLESS)  */}
        {/* 4 Interactive Guide Cards + Center 3D Globe + 3 Photo Problem Cards */}
        {/* =================================================================== */}
        <div className="relative w-full py-4">
          
          {/* Main Grid: 4 Left Interactive Cards, Center 3D Planet Globe, 3 Right Photo Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

            {/* =============================================================== */}
            {/* LEFT COLUMN: 4 INTERACTIVE SAFETY & FIRE PREVENTION HANDBOOK SECTIONS */}
            {/* Hover reveals the full rules, checklist, and critical directives */}
            {/* =============================================================== */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span className="font-mono text-[10px] text-zinc-300 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
                  SURVIVAL & FIRE GUIDE // {currentPlanet.name.split(' ')[0]}
                </span>
                <span className="font-mono text-[9px] text-zinc-500">
                  HOVER FOR RULES
                </span>
              </div>

              {currentPlanet.safetyHandbook.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-black/70 border border-white/10 rounded-none transition-all duration-300 group hover:border-cyan-400 hover:bg-black/95 cursor-pointer shadow-md"
                >
                  {/* Card Header in Default State */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[9px] text-cyan-400 tracking-wider uppercase group-hover:text-cyan-300">
                      {item.sectionTag}
                    </span>
                    <span className="font-mono text-[8px] px-1.5 py-0.5 bg-white/5 border border-white/10 text-zinc-400 group-hover:border-cyan-500/40 group-hover:text-cyan-300">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Short Summary (Always Visible) */}
                  <h4 className="font-sans text-xs font-medium text-white group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-sans text-[11px] text-zinc-400 font-light mt-0.5 leading-snug">
                    {item.shortSummary}
                  </p>

                  {/* Interactive Hover Indicator */}
                  <div className="flex items-center gap-1.5 font-mono text-[8px] text-zinc-500 mt-2 group-hover:hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 animate-pulse" />
                    <span>[ HOVER TO REVEAL MANDATORY RULES ]</span>
                  </div>

                  {/* Expanded Detailed Rules (Revealed smoothly on hover) */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-96 group-hover:opacity-100 transition-all duration-500 overflow-hidden pt-0 group-hover:pt-2.5 space-y-2 border-t border-transparent group-hover:border-white/10 mt-0 group-hover:mt-2">
                    <div className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider">
                      MANDATORY ACTIONABLE CHECKLIST:
                    </div>
                    <ul className="space-y-1 font-sans text-[11px] text-zinc-200 font-light leading-snug">
                      {item.rules.map((rule, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-1.5">
                          <span className="text-cyan-400 font-mono text-[9px] mt-0.5">{rIdx + 1}.</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="font-mono text-[9px] text-red-300 bg-red-950/40 border border-red-500/30 p-1.5 leading-tight">
                      <span className="font-bold text-red-400">CRITICAL: </span>
                      {item.criticalDirective}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* =============================================================== */}
            {/* CENTER COLUMN: 3D PHOTOREALISTIC PLANET COMMAND PEDESTAL       */}
            {/* Smooth transfer animation from top lineup to card center        */}
            {/* =============================================================== */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center my-4">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
                
                {/* Rotating Atmospheric Concentric Telemetry Ring */}
                <div
                  className="absolute inset-0 rounded-full border border-dashed animate-[spin_40s_linear_infinite] pointer-events-none"
                  style={{ borderColor: `${currentPlanet.themeColor}50` }}
                />
                <div
                  className="absolute inset-[-10px] rounded-full border border-white/10 pointer-events-none"
                />

                {/* Crosshair coordinate ticks */}
                <div className="absolute inset-[-14px] pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-[1px] bg-white/60" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[1px] bg-white/60" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-[1px] bg-white/60" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3 w-[1px] bg-white/60" />
                </div>

                {/* Atmospheric Corona Light Bloom hugging the planet */}
                <div
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-12 rounded-full blur-[20px] pointer-events-none transition-all duration-700"
                  style={{
                    background: `radial-gradient(ellipse at center, #ffffff 20%, ${currentPlanet.themeColor} 70%, transparent 90%)`,
                    opacity: 0.85,
                  }}
                />

                {/* Photorealistic 3D Planet Sphere (Animate smoothly when selected) */}
                <div
                  className={`relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden shadow-2xl transition-all duration-700 ease-out ${
                    isTransitioningPlanet ? 'scale-75 opacity-40 blur-[2px] -translate-y-6' : 'scale-100 opacity-100 blur-0 translate-y-0'
                  }`}
                  style={{
                    boxShadow: `0 0 35px ${currentPlanet.themeColor}, 0 0 65px ${currentPlanet.themeGlow}`,
                  }}
                >
                  <img
                    src={currentPlanet.imageSrc}
                    alt={currentPlanet.name}
                    decoding="async"
                    className="w-full h-full object-cover rounded-full select-none"
                  />

                  {/* Directional Day/Night Terminator */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, transparent 55%, rgba(0, 0, 0, 0.4) 80%, rgba(0, 0, 0, 0.75) 100%)',
                    }}
                  />

                  {/* Atmospheric Edge Limb Highlight */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 16px ${currentPlanet.themeColor}, inset 0 2px 6px rgba(255,255,255,0.7)`,
                    }}
                  />
                </div>
              </div>

              {/* Status Telemetry below Globe */}
              <div className="mt-4 text-center space-y-1">
                <div className="font-sans text-lg font-light text-white tracking-widest uppercase text-shadow-glow">
                  {currentPlanet.name}
                </div>
                <div className="font-mono text-xs text-cyan-400 font-light">
                  GRAVITY: <strong className="text-white">{currentPlanet.gravityG}g</strong> · PRESSURE: <strong className="text-white">{currentPlanet.pressureKpa} kPa</strong>
                </div>
                <div className="font-mono text-[10px] text-zinc-400">
                  FLAME: <span className="text-zinc-200">{currentPlanet.flameType}</span> · LOC: <span className="text-emerald-300">{currentPlanet.locThreshold}</span>
                </div>

                {/* Toggle Custom Sliders Button */}
                <button
                  onClick={() => setShowCustomSliders(!showCustomSliders)}
                  className="mt-3 px-4 py-1.5 border border-white/20 bg-black/60 hover:bg-white/10 text-cyan-300 font-mono text-[10px] uppercase tracking-wider transition-all flex items-center gap-1.5 mx-auto cursor-pointer"
                >
                  <Sliders className="w-3 h-3" />
                  <span>{showCustomSliders ? 'HIDE CUSTOM CONTROLS' : 'OPEN INTERACTIVE SLIDERS'}</span>
                </button>
              </div>
            </div>

            {/* =============================================================== */}
            {/* RIGHT COLUMN: 3 ACTIONABLE FIRE HAZARD & PROBLEM CARDS WITH PHOTOS (Hover reveals info) */}
            {/* =============================================================== */}
            <div className="lg:col-span-4 space-y-3.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  CRITICAL HABITAT HAZARDS // {currentPlanet.name.split(' ')[0]}
                </span>
                <span className="font-mono text-[9px] text-zinc-400">
                  HOVER TO REVEAL DETAILS
                </span>
              </div>

              {currentPlanet.hazardCards.map((hazard, hIdx) => (
                <div
                  key={hIdx}
                  className="relative h-32 sm:h-36 md:h-40 w-full border border-white/10 hover:border-cyan-400 transition-all duration-300 overflow-hidden group shadow-xl bg-black/40 cursor-pointer"
                >
                  {/* Problem Photo: Seen completely, clearly, and prominently */}
                  <img
                    src={hazard.image}
                    alt={hazard.title}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-100 select-none"
                  />

                  {/* Faint subtle scanline & vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none group-hover:from-black/95 group-hover:via-black/60 transition-colors duration-300" />

                  {/* Top Corner Minimal Threat Tag (always visible) */}
                  <div className="absolute top-2 left-2 z-10 pointer-events-none">
                    <span className="font-mono text-[8px] sm:text-[9px] px-2 py-0.5 bg-black/80 border border-white/20 text-cyan-300 backdrop-blur-md uppercase tracking-wider">
                      {hazard.tag.split('//')[0].trim()}
                    </span>
                  </div>

                  {/* Bottom Minimal Red Badge (always visible, fades on hover) */}
                  <div className="absolute bottom-2 right-2 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
                    <span className="px-1.5 py-0.5 bg-red-950/85 border border-red-500/50 font-mono text-[8px] text-red-300 tracking-wider">
                      {hazard.badge}
                    </span>
                  </div>

                  {/* Hover Overlay: Smoothly slides up revealing the brief title and countermeasure */}
                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-3.5 bg-gradient-to-t from-black via-black/95 to-black/30 backdrop-blur-md border-t border-cyan-400/30 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none space-y-1.5 z-20">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-cyan-400 tracking-widest uppercase">
                        {hazard.tag}
                      </span>
                      <span className="px-1.5 py-0.5 bg-red-950/90 border border-red-500/50 font-mono text-[8px] text-red-300 tracking-wider">
                        {hazard.badge}
                      </span>
                    </div>

                    <h4 className="font-sans text-xs sm:text-[13px] font-medium text-white tracking-wide leading-snug">
                      {hazard.title}
                    </h4>

                    <div className="font-mono text-[9px] text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 flex items-center gap-1.5">
                      <span className="text-zinc-400 font-semibold">ACTION:</span>
                      <span className="truncate">{hazard.countermeasure.replace('FIX: ', '')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. OPTIONAL EXPANDABLE CUSTOM LAB SLIDERS DRAWER                    */}
        {/* =================================================================== */}
        {showCustomSliders && (
          <div className="border border-white/10 bg-black/80 p-6 backdrop-blur-md animate-in fade-in duration-300 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                CUSTOM VARIABLE EXPERIMENTAL BENCH // NASA CIR PROTOCOL
              </span>
              <button
                onClick={() => {
                  setCustomGravity(currentPlanet.gravityG);
                  setCustomOxygen(currentPlanet.oxygenPct);
                  setCustomPressure(currentPlanet.pressureKpa);
                  setCustomAirflow(currentPlanet.airflowCmS);
                }}
                className="font-mono text-[10px] text-zinc-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                RESET TO {currentPlanet.name.split(' ')[0]} BASELINE
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
              {/* Gravity Slider */}
              <div className="space-y-2 p-3 border border-white/5 bg-white/[0.02]">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-[10px] uppercase">GRAVITATIONAL ACCEL</span>
                  <span className="text-white font-medium">{customGravity.toFixed(3)} g</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="2.53"
                  step="0.01"
                  value={customGravity}
                  onChange={(e) => setCustomGravity(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Oxygen Slider */}
              <div className="space-y-2 p-3 border border-white/5 bg-white/[0.02]">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-[10px] uppercase">O2 CONCENTRATION</span>
                  <span className="text-white font-medium">{customOxygen.toFixed(1)} %</span>
                </div>
                <input
                  type="range"
                  min="10.0"
                  max="35.0"
                  step="0.5"
                  value={customOxygen}
                  onChange={(e) => setCustomOxygen(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Pressure Slider */}
              <div className="space-y-2 p-3 border border-white/5 bg-white/[0.02]">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-[10px] uppercase">HABITAT PRESSURE</span>
                  <span className="text-white font-medium">{customPressure.toFixed(1)} kPa</span>
                </div>
                <input
                  type="range"
                  min="30.0"
                  max="150.0"
                  step="1.0"
                  value={customPressure}
                  onChange={(e) => setCustomPressure(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Airflow Slider */}
              <div className="space-y-2 p-3 border border-white/5 bg-white/[0.02]">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400 text-[10px] uppercase">HVAC FORCED AIRFLOW</span>
                  <span className="text-white font-medium">{customAirflow.toFixed(1)} cm/s</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="30.0"
                  step="0.5"
                  value={customAirflow}
                  onChange={(e) => setCustomAirflow(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
