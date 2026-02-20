import type { StandardState, NaturalOccurrence } from '@/types';

const RADIOACTIVE_SYMBOLS = new Set([
  'Ac',
  'Th',
  'Pa',
  'U',
  'Np',
  'Pu',
  'Am',
  'Cm',
  'Bk',
  'Cf',
  'Es',
  'Fm',
  'Md',
  'No',
  'Lr',
  'Rf',
  'Db',
  'Sg',
  'Bh',
  'Hs',
  'Mt',
  'Ds',
  'Rg',
  'Cn',
  'Nh',
  'Fl',
  'Mc',
  'Lv',
  'Ts',
  'Og',
  'Rn',
  'At',
  'Po',
  'Ra',
  'Fr',
]);

const GAS_SYMBOLS = new Set([
  'H',
  'N',
  'O',
  'F',
  'Ne',
  'He',
  'Cl',
  'Ar',
  'Kr',
  'Xe',
  'Rn',
]);

const LIQUID_SYMBOLS = new Set(['Hg', 'Fr', 'Br']);

export function getStandardState(symbol: string): StandardState {
  if (GAS_SYMBOLS.has(symbol)) return 'gas';
  if (LIQUID_SYMBOLS.has(symbol)) return 'liquid';
  return 'solid';
}

export function isRadioactive(symbol: string): boolean {
  return RADIOACTIVE_SYMBOLS.has(symbol);
}

const FROM_DECAY_SYMBOLS = new Set([
  'Tc',
  'Pm',
  'Po',
  'At',
  'Rn',
  'Fr',
  'Ra',
  'Ac',
  'Pa',
  'Np',
  'Pu',
  'Cm',
]);

const SYNTHETIC_SYMBOLS = new Set([
  'Am',
  'Bk',
  'Cf',
  'Es',
  'Fm',
  'Md',
  'No',
  'Lr',
  'Rf',
  'Db',
  'Sg',
  'Bh',
  'Hs',
  'Mt',
  'Ds',
  'Rg',
  'Cn',
  'Nh',
  'Fl',
  'Mc',
  'Lv',
  'Ts',
  'Og',
]);

export function getNaturalOccurrence(symbol: string): NaturalOccurrence {
  if (FROM_DECAY_SYMBOLS.has(symbol)) return 'from-decay';
  if (SYNTHETIC_SYMBOLS.has(symbol)) return 'synthetic';
  return 'primordial';
}
