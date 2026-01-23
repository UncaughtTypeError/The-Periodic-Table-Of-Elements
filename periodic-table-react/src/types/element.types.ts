export type ElementCategory =
  | 'other-nonmetals'
  | 'noble-gases'
  | 'halogens'
  | 'metalloids'
  | 'alkaline-earth-metals'
  | 'alkali-metals'
  | 'transition-metals'
  | 'post-transition-metals'
  | 'lanthanoids'
  | 'actinoids';

export type ThreatLevel = 'limited' | 'rising' | 'serious' | null;

export interface ElectronShells {
  K: number | null;
  L: number | null;
  M: number | null;
  N: number | null;
  O: number | null;
  P: number | null;
  Q: number | null;
}

export interface ElementSummary {
  atomicMass: string;
  boilingPoint: string | null;
  electronConfiguration: string;
  electronegativity: string | null;
  atomicRadius: string | null;
  ionRadius: string | null;
  vanDerWaalsRadius: string | null;
  ionizationEnergy: string | null;
  electronAffinity: string | null;
  oxidationStates: string | null;
  standardState: string | null;
  bondingType: string | null;
  meltingPoint: string | null;
  density: string | null;
  discovered: string | null;
  discoverer: string | null;
}

export interface ElementGeneral {
  appearance: string | null;
  group: string | null;
  block: string | null;
  period: string | null;
  elementCategory: string | null;
  electronConfiguration: string | null;
  perShell: string | null;
}

export interface ElementPhysical {
  color: string | null;
  phase: string | null;
  meltingPoint: string | null;
  boilingPoint: string | null;
  density: string | null;
}

export interface ElementHistory {
  discovery: string | null;
  namedBy: string | null;
  naming: string | null;
  firstIsolation: string | null;
}

export interface ElementDetail {
  description: string[];
  general: ElementGeneral;
  physical: ElementPhysical;
  history: ElementHistory;
}

export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  isSynthetic: boolean; // Synthetic elements have no stable isotopes, mass shown in [brackets]
  category: ElementCategory;
  threatLevel: ThreatLevel;
  period: number;
  group: number;
  electronShells: ElectronShells;
  summary: ElementSummary;
  detail: ElementDetail;
}

export interface CategoryDefinition {
  id: ElementCategory;
  name: string;
  color: string;
}

export interface ThreatDefinition {
  id: NonNullable<ThreatLevel>;
  name: string;
  description: string;
  color: string;
  iconCount: number;
}
