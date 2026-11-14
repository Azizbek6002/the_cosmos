export interface ChemicalResource {
  number: number;
  symbol: string;
  mass?: string;
}

export interface PlanetaryHabitat {
  id: string;
  sectionNumber: string; // e.g. "_01", "_02", "03_", "_04", etc.
  name: string;
  race: string;
  tagline: string;
  coordinates: string;
  distance: string;
  gravityG: number;
  oxygenPct: number;
  pressureKpa: number;
  airflowCmS: number;
  imageSrc: string;
  themeColor: string;
  flamePhysicsCol1: string;
  flamePhysicsCol2: string;
  resources: ChemicalResource[];
  barcode: string;
  landscapeTitle: string;
  landscapeTag: string;
  landscapeBg: string;
  landscapeImg?: string;
  flameDetailed: string;
  materialRisks: string[];
  nasaExperiments: string[];
  evidenceGap: string | null;
  suppressionProtocol: string;
}
