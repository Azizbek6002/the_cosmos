import { PlanetaryHabitat } from '../types';

export const PLANETARY_HABITATS: PlanetaryHabitat[] = [
  {
    id: 'cetrion',
    sectionNumber: '_01',
    name: 'CETRION',
    race: 'SECTOR: TERRA & ISS ORBITAL COMPLEX',
    tagline: '1.0g / 0.0g · 101.3 kPa · 21.0% O2',
    coordinates: "2093°00' N, 1764° 300' E",
    distance: '6.7 BLN KM',
    gravityG: 0.0,
    oxygenPct: 21.0,
    pressureKpa: 101.3,
    airflowCmS: 10.0,
    imageSrc: '/planets/planet_earth.png',
    themeColor: '#60a5fa',
    flamePhysicsCol1:
      'Natural convection ceases in microgravity. Without buoyancy-driven hot air rising, flames transform into quiescent, spherical blue diffusion envelopes governed strictly by molecular diffusion.',
    flamePhysicsCol2:
      'NASA FLEX discovery: Following visible flame extinction, low-temperature "Cool Flames" persist invisibly at 500–750 K, continuously accumulating dangerous concentrations of carbon monoxide (CO).',
    resources: [
      { number: 2, symbol: 'He', mass: '4.002' },
      { number: 3, symbol: 'Li', mass: '6.941' },
      { number: 30, symbol: 'Zn', mass: '65.38' },
    ],
    barcode: '4 0 6 5 0 1 2',
    landscapeTitle: 'ORBITAL VIEW',
    landscapeTag: '0g MICROGRAVITY LEO',
    landscapeBg: 'radial-gradient(circle at center, #0077b6, #001233)',
    landscapeImg: '/planets/landscape_cetrion.png',
    flameDetailed:
      'In true microgravity (0g), buoyant draft is zero. Oxygen replenishment relies entirely on molecular diffusion or forced HVAC ventilation. Flames adopt a spherical geometry and can transition into quasi-steady cool flames, making traditional smoke detectors ineffective until dangerous soot agglomerates form.',
    materialRisks: [
      'PMMA (Acrylic): Polymer melt droplets detach and drift with ventilation currents.',
      'Nomex Aramid: Stagnant air extinguishes flame, but airflow >15 cm/s promotes sustained smolder.',
      'Smoke Particulates: Form elongated chain-like agglomerates, delaying ionization chamber triggers.',
      'Liquid Fuels: Exhibit second-stage invisible cool flame combustion with reignition hazard.'
    ],
    nasaExperiments: [
      'NASA BASS-II (Spherical Diffusion Burning)',
      'NASA FLEX-1/2 (Discovery of Quasi-Steady Cool Flames)',
      'NASA SAFFIRE-I–IV (Large Scale Cygnus Fire Safety)',
      'NASA ACME-BRE (Sootless Blue Methane Envelopes)'
    ],
    evidenceGap: null,
    suppressionProtocol:
      'Immediate HVAC shutdown to starve airflow. Execute rapid CO2 flooding (CO2 suppresses microgravity cool flames 68% faster than helium or nitrogen).'
  },
  {
    id: 'devlaar',
    sectionNumber: '_02',
    name: 'DEVLAAR',
    race: 'SECTOR: MARS HABITATION BASE ALPHA',
    tagline: '0.38g · 56.0 kPa · 28.0% O2',
    coordinates: "4065°01' N, 3094° 127' E",
    distance: '5.8 BLN KM',
    gravityG: 0.38,
    oxygenPct: 28.0,
    pressureKpa: 56.0,
    airflowCmS: 8.0,
    imageSrc: '/planets/planet_mars.png',
    themeColor: '#f97316',
    flamePhysicsCol1:
      'Partial Martian gravity (0.38g) creates weak buoyancy. Flames settle into flattened domes with broadened preheat zones, allowing toxic combustion gases to spread laterally through habitats.',
    flamePhysicsCol2:
      'Sub-atmospheric habitat design (8.2 psi / 56 kPa with 28% O2) reduces airlock pre-breathe times but lowers the Limiting Oxygen Concentration (LOC), accelerating polymer ignition thresholds.',
    resources: [
      { number: 2, symbol: 'He', mass: '4.002' },
      { number: 14, symbol: 'Si', mass: '28.08' },
      { number: 84, symbol: 'Po', mass: '209.0' },
    ],
    barcode: '5 8 9 4 0 2 1',
    landscapeTitle: 'SURFACE HAB',
    landscapeTag: '0.38g PARTIAL GRAVITY',
    landscapeBg: 'radial-gradient(circle at center, #9a3412, #1c0500)',
    landscapeImg: '/planets/landscape_devlaar.png',
    flameDetailed:
      'At 0.38g, natural convection is reduced to 38% of terrestrial levels. Smoke does not ascend rapidly to ceiling-mounted detectors; instead, toxic carbon monoxide and hydrogen cyanide migrate along crew floor levels. Material flame spread rates along cables exceed terrestrial rates by up to 2.4x under low-speed ventilation.',
    materialRisks: [
      'Polyethylene Cable Jackets: Dripping burning mass under partial gravity accelerates spread.',
      'Surface Regolith Dust: High iron-oxide catalyst dust accelerates polymer oxidation.',
      'Hab Pressure Shell: 56 kPa low-pressure environment accelerates volatiles outgassing.',
      'Rover Li-Ion Cells: Thermal runaway releases dense, unvented toxic hydrogen gas.'
    ],
    nasaExperiments: [
      'NASA FM-2 (Flame Spread in Partial Gravity)',
      'NASA SLICE (Structure & Extinction Limits in Low-g)',
      'NASA SAFFIRE-VI (High-Oxygen Habitat Materials)',
      'NASA CIR (Combustion Integrated Rack on ISS)'
    ],
    evidenceGap: null,
    suppressionProtocol:
      'Cease crew module ventilation immediately. Deploy fine water mist or clean CO2 agent within 45 seconds to suppress lateral floor-level plume migration.'
  },
  {
    id: 'biturion',
    sectionNumber: '03_',
    name: 'BITURION',
    race: 'SECTOR: LUNAR ARTEMIS BASE CAMP',
    tagline: '0.166g · 56.5 kPa · 21.0% O2',
    coordinates: "3049°01' N, 4568° 364' E",
    distance: '5.4 BLN KM',
    gravityG: 0.166,
    oxygenPct: 21.0,
    pressureKpa: 56.5,
    airflowCmS: 5.0,
    imageSrc: '/planets/planet_moon.png',
    themeColor: '#e2e8f0',
    flamePhysicsCol1:
      'Lunar gravity (0.166g) exhibits a critical combustion transition: buoyancy is nearly decoupled, producing wide smoldering fronts with delayed flame detection and substantial soot accumulation.',
    flamePhysicsCol2:
      'Lunar regolith offers unique in-situ fire mitigation: dry regolith powder serves as a high-density thermal heat sink and smothering agent for electrical equipment and lander fires.',
    resources: [
      { number: 2, symbol: 'He', mass: '4.002' },
      { number: 14, symbol: 'Si', mass: '28.08' },
      { number: 82, symbol: 'Pb', mass: '207.2' },
    ],
    barcode: '7 4 0 5 9 1 3',
    landscapeTitle: 'CRATER OUTPOST',
    landscapeTag: '0.166g LUNAR SURFACE',
    landscapeBg: 'radial-gradient(circle at center, #475569, #020617)',
    landscapeImg: '/planets/landscape_biturion.png',
    flameDetailed:
      'On the Moon (1/6th g), flames occupy an intermediate regime between spherical microgravity diffusion and buoyant convection. The boundary layer thickens significantly, causing insulation materials to smolder undetected inside avionics bays. Regolith contamination in air filters exacerbates overheating risks.',
    materialRisks: [
      'EVA Suit Fabrics: Multi-layer insulation (MLI) traps internal smoldering pockets.',
      'Aft Avionics Wiring: PTFE fluoropolymer pyrolyzes at 300°C, releasing corrosive HF acid.',
      'Regolith Abrasives: Erodes valve seals, generating micro-leaks in oxygen storage lines.',
      'Solar Array Harnesses: Low-pressure arcing triggers localized high-temperature plasma burn.'
    ],
    nasaExperiments: [
      'NASA ACME (Advanced Combustion via Microgravity)',
      'NASA LUCI (Lunar Combustion Investigation Protocol)',
      'NASA BASS-I (Polymer Sample Extinction in 0.16g)',
      'NASA SPICE (Smoke Propagation & Sensor Response)'
    ],
    evidenceGap: 'Full-duration combustion data on actual lunar surface regolith currently pending Artemis III.',
    suppressionProtocol:
      'Activate avionics nitrogen purge, isolate oxygen feedlines, and deploy lunar-rated micronized smothering agents.'
  },
  {
    id: 'sedna',
    sectionNumber: '_04',
    name: 'SEDNA',
    race: 'SECTOR: DEEP SPACE HELIOPAUSE STATION',
    tagline: '0.0g · 101.3 kPa · 21.0% O2 · 85 AU',
    coordinates: "8520°00' N, 9140° 120' E",
    distance: '12.8 BLN KM',
    gravityG: 0.0,
    oxygenPct: 21.0,
    pressureKpa: 101.3,
    airflowCmS: 8.0,
    imageSrc: '/planets/planet_sedna.png',
    themeColor: '#38bdf8',
    flamePhysicsCol1:
      'Extreme heliopause laboratory conditions: zero buoyant convection with thermal ambient backgrounds near -240°C. Cold wall radiant loss causes unique low-temperature cool flame instabilities.',
    flamePhysicsCol2:
      'Total isolation emergency directive: in deep space habitats where resupply is impossible, fires must be extinguished using zero-loss gaseous reclamation loops or vacuum venting barriers.',
    resources: [
      { number: 2, symbol: 'He', mass: '4.002' },
      { number: 6, symbol: 'C', mass: '12.011' },
      { number: 78, symbol: 'Pt', mass: '195.08' },
    ],
    barcode: '8 5 2 0 4 1 9',
    landscapeTitle: 'DEEP SPACE POST',
    landscapeTag: '0g ISOLATED STATION',
    landscapeBg: 'radial-gradient(circle at center, #0284c7, #082f49)',
    landscapeImg: '/planets/landscape_cetrion.png',
    flameDetailed:
      'At 85 AU from the Sun, solar radiation flux is less than 0.2 W/m². External hull temperatures drop to 30 Kelvin. A fire in internal habitats creates immense thermal gradients across the composite pressure hull. Without buoyancy, soot agglomerates remain suspended indefinitely, clogging environmental life-support scrubbers within minutes.',
    materialRisks: [
      'Aerosol Reagents: Flash ignition in zero-g creates expanding spherical flame shells.',
      '3D Printing Resins: Thermoset polymers degrade into toxic volatile aromatic hydrocarbons.',
      'Water Wall Baffles: Boiling inside radiant water shields generates overpressure hazards.',
      'Composite Hull Liners: Internal epoxy matrix undergoes silent sub-surface smolder.'
    ],
    nasaExperiments: [
      'NASA CIR (Combustion Integrated Rack Deep Space Testing)',
      'NASA FLEX-2 (Multi-droplet Cool Flame Interactions)',
      'NASA BRE (Burning Rate Emulator in 0g)',
      'NASA Cool Flames Investigation (CFI-2)'
    ],
    evidenceGap: 'Cryogenic hull boundary combustion under long-duration zero solar flux.',
    suppressionProtocol:
      'Execute automated airlock vacuum isolation; vent burning module to space vacuum within 20 seconds while retaining central core atmosphere.'
  },
  {
    id: 'europa',
    sectionNumber: '_05',
    name: 'EUROPA',
    race: 'SECTOR: JOVIAN CRYO-OCEAN HABITAT',
    tagline: '0.134g · 85.0 kPa · 19.5% O2',
    coordinates: "5240°18' N, 3120° 400' E",
    distance: '628 MLN KM',
    gravityG: 0.134,
    oxygenPct: 19.5,
    pressureKpa: 85.0,
    airflowCmS: 6.0,
    imageSrc: '/planets/planet_europa.png',
    themeColor: '#2dd4bf',
    flamePhysicsCol1:
      'Sub-surface ice shelf habitation operates under 0.134g gravity. High cryogenic cooling from surrounding ice walls suppresses radiant heat loss but promotes deep internal smoldering.',
    flamePhysicsCol2:
      'Cryogenic nitrogen reservoir advantage: liquid nitrogen boil-off gas provides instantaneous thermal chilling and oxygen dilution to suppress electrical bay ignition.',
    resources: [
      { number: 1, symbol: 'H', mass: '1.008' },
      { number: 8, symbol: 'O', mass: '15.999' },
      { number: 16, symbol: 'S', mass: '32.06' },
    ],
    barcode: '5 2 4 0 1 8 5',
    landscapeTitle: 'CRYO SHELF',
    landscapeTag: '0.134g ICE HABITAT',
    landscapeBg: 'radial-gradient(circle at center, #0d9488, #042f2e)',
    landscapeImg: '/planets/landscape_biturion.png',
    flameDetailed:
      'On Europa, sub-surface drill habitats exist in high Jovian magnetospheric radiation. Wiring harnesses shielded by heavy boron polymers face dielectric breakdown. In 0.134g, smoke forms a sluggish, dense fog layer that fails to trigger optical beam detectors mounted on ceilings.',
    materialRisks: [
      'Glycol Thermal Fluids: Spray leaks on hot avionics ignite into high-pressure vapor plumes.',
      'Silicone Ice Seals: Pyrolyze into white silica soot that jams airlock pressure relief valves.',
      'Cryogenic Polyurethane: Outgasses flammable cyclopentane blowing agent under low pressure.',
      'Sub-ice Drilling Cables: High-amperage electrical arcing in moisture-rich environments.'
    ],
    nasaExperiments: [
      'NASA SLICE (Cryogenic Environment Combustion Limits)',
      'NASA BASS-II (Low-Convection Droplet Extinction)',
      'NASA SPICE (Smoke Particulate Dynamics in Low-g)',
      'NASA SAFFIRE-V (Material Flammability Under Chilled Boundary)'
    ],
    evidenceGap: 'Interaction between cryogenic ice wall moisture condensation and active flame fronts.',
    suppressionProtocol:
      'Deploy liquid nitrogen vapor deluge; depressurize avionics compartment and divert life-support air through redundant chilled carbon bed.'
  },
  {
    id: 'titan',
    sectionNumber: '_06',
    name: 'TITAN',
    race: 'SECTOR: SATURNIAN METHANE COLONY',
    tagline: '0.140g · 146.7 kPa · 21.0% O2',
    coordinates: "9514°32' N, 1420° 800' E",
    distance: '1.4 BLN KM',
    gravityG: 0.140,
    oxygenPct: 21.0,
    pressureKpa: 146.7,
    airflowCmS: 7.0,
    imageSrc: '/planets/planet_titan.png',
    themeColor: '#fbbf24',
    flamePhysicsCol1:
      'Titan presents the ultimate dual-atmosphere hazard: habitats carry internal oxygen, while the external world consists of dense, cryogenic methane and nitrogen at 1.5 atmospheres.',
    flamePhysicsCol2:
      'Any hull puncture during an internal fire risks transforming the module into an explosive diffusion burner. Suppression requires strict positive internal nitrogen overpressure.',
    resources: [
      { number: 6, symbol: 'C', mass: '12.011' },
      { number: 7, symbol: 'N', mass: '14.007' },
      { number: 18, symbol: 'Ar', mass: '39.948' },
    ],
    barcode: '9 5 1 4 0 6 2',
    landscapeTitle: 'METHANE SEA',
    landscapeTag: '0.140g DENSE ATMOSPHERE',
    landscapeBg: 'radial-gradient(circle at center, #d97706, #451a03)',
    landscapeImg: '/planets/landscape_devlaar.png',
    flameDetailed:
      'The dense 147 kPa external atmosphere of Titan provides immense heat sinking outside, but inside crew habitats, higher gas density increases thermal conductivity and flame spread rate along polymer surfaces. The primary catastrophic hazard is airlock seal rupture allowing external hydrocarbon vapors into oxygen-rich zones.',
    materialRisks: [
      'External Airlock Gaskets: Hydrocarbon swelling makes fluoroelastomers brittle and flammable.',
      'Electrolysis Generators: Methane ingress into O2 separation lines creates detonation risk.',
      'Aerostat Envelopes: Electrostatic charging during methane rainstorms triggers ignition.',
      'Surface Suits: Methane liquid contamination ignites when re-entering warm pressurized airlocks.'
    ],
    nasaExperiments: [
      'NASA ACME (High-Pressure Hydrocarbon Diffusion Flames)',
      'NASA CIR (Dense Atmosphere Convection Modelling)',
      'NASA FM-2 (Opposed-Flow Flame Spread Across Dense Media)',
      'NASA SAFFIRE-VI (Multi-Atmosphere Rupture Dynamics)'
    ],
    evidenceGap: 'Combustion kinetics of dual-reactant boundary under nitrogen dilution.',
    suppressionProtocol:
      'Flood with pure nitrogen overpressure barrier; seal external airlock dampers and isolate oxygen generation cells within 15 seconds.'
  },
  {
    id: 'jupiter',
    sectionNumber: '07_',
    name: 'JOVIAN',
    race: 'SECTOR: MAGNETOSPHERIC RADIATION OUTPOST',
    tagline: '2.528g · 120.0 kPa · 21.0% O2',
    coordinates: "7149°00' N, 8820° 300' E",
    distance: '778 MLN KM',
    gravityG: 2.528,
    oxygenPct: 21.0,
    pressureKpa: 120.0,
    airflowCmS: 12.0,
    imageSrc: '/planets/planet_jupiter.png',
    themeColor: '#fb923c',
    flamePhysicsCol1:
      'Hyper-gravity (2.53g) regime: Natural buoyancy is 2.5 times stronger than on Earth. Flames form tight, violently flickering turbulent jets with extreme convective upward heat transfer.',
    flamePhysicsCol2:
      'Rapid ceiling thermal loading: hot combustion plumes reach ceiling detectors within 1.2 seconds, requiring ultra-rapid response gaseous argon suppression barriers.',
    resources: [
      { number: 1, symbol: 'H', mass: '1.008' },
      { number: 2, symbol: 'He', mass: '4.002' },
      { number: 10, symbol: 'Ne', mass: '20.180' },
    ],
    barcode: '7 1 4 9 0 7 8',
    landscapeTitle: 'RADIATION BELT',
    landscapeTag: '2.53g HYPER-GRAVITY',
    landscapeBg: 'radial-gradient(circle at center, #ea580c, #431407)',
    landscapeImg: '/planets/landscape_devlaar.png',
    flameDetailed:
      'In a 2.53g gravity field, Rayleigh-Bénard thermal instabilities are magnified. Droplets of melting polymers drip rapidly downward, while flame plumes shoot vertically toward ceiling panels with 3.8x terrestrial convective heat release rates. Standard terrestrial fire suppression flow rates are insufficient to counter the intense buoyant draft.',
    materialRisks: [
      'Ceiling Wire Trays: Superheated plume causes flashover within 30 seconds of ignition.',
      'Molten Polymer Droplets: High gravitational pull accelerates fire spread to floor levels.',
      'Superconducting Magnets: Quench discharge arcs ignite surrounding structural polymers.',
      'High-Pressure Hydraulic Loops: Intense buoyant convection ruptures pressurized lines.'
    ],
    nasaExperiments: [
      'NASA Centrifuge Combustion Testing (1g to 3g High-G Flight)',
      'NASA CIR (Buoyancy Acceleration Dynamics)',
      'NASA ACME (Turbulent Jet Diffusion at High Rayleigh Numbers)',
      'NASA SAFFIRE (High Convection Suppression Protocols)'
    ],
    evidenceGap: 'Superconducting magnet quench arc containment under 2.5g turbulent buoyant flame.',
    suppressionProtocol:
      'Deploy pressurized gaseous argon deluge immediately; ceiling-mounted active water-curtain thermal barriers to prevent structural composite flashover.'
  }
];
