import type { CategoryDefinition, ThreatDefinition, ElementCategory, ThreatLevel } from '../types';

export const CATEGORIES: CategoryDefinition[] = [
  { id: 'other-nonmetals', name: 'Other Nonmetals', color: '#76FF03' },
  { id: 'noble-gases', name: 'Noble Gases', color: '#df5ff5' },
  { id: 'halogens', name: 'Halogens', color: '#18FFFF' },
  { id: 'metalloids', name: 'Metalloids', color: '#00E676' },
  { id: 'alkaline-earth-metals', name: 'Alkaline Earth Metals', color: '#eaea18' },
  { id: 'alkali-metals', name: 'Alkali Metals', color: '#f7a91d' },
  { id: 'transition-metals', name: 'Transition Metals', color: '#ff3e7f' },
  { id: 'post-transition-metals', name: 'Post Transition Metals', color: '#40C4FF' },
  { id: 'lanthanoids', name: 'Lanthanoids', color: '#fd6d3f' },
  { id: 'actinoids', name: 'Actinoids', color: '#ff1744' },
];

export const CATEGORY_COLORS: Record<ElementCategory, string> = {
  'other-nonmetals': '#76FF03',
  'noble-gases': '#df5ff5',
  'halogens': '#18FFFF',
  'metalloids': '#00E676',
  'alkaline-earth-metals': '#eaea18',
  'alkali-metals': '#f7a91d',
  'transition-metals': '#ff3e7f',
  'post-transition-metals': '#40C4FF',
  'lanthanoids': '#fd6d3f',
  'actinoids': '#ff1744',
};

export const THREATS: ThreatDefinition[] = [
  {
    id: 'limited',
    name: 'Limited Availability',
    description: 'Future risk to supply',
    color: '#ded014',
    iconCount: 1,
  },
  {
    id: 'rising',
    name: 'Rising Threat',
    description: 'From increased use',
    color: '#e27807',
    iconCount: 2,
  },
  {
    id: 'serious',
    name: 'Serious Threat',
    description: 'In the next 100 years',
    color: '#d00000',
    iconCount: 3,
  },
];

export const THREAT_COLORS: Record<NonNullable<ThreatLevel>, string> = {
  limited: '#ded014',
  rising: '#e27807',
  serious: '#d00000',
};
